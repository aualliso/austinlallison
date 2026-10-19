// src/lib/water.ts
//
// The water on the land: every named stream, draw, canyon, lake, reservoir,
// spring and fall inside the map's frame, from the USGS Geographic Names
// Information System (GNIS) - 559 features in Texas and New Mexico. Courses
// were traced over the same elevations the land is drawn from, source to
// mouth; lakes were outlined from their basins (scripts/build_water.py writes
// public/ground/water.json).
//
// Nothing is shown until it is asked for. Pointing at a course, a lake or a
// spring draws it in a fine line and sets its name beside it, then lets it
// go again. Where two named features share one channel (a canyon and the
// river in it) both are named. With the cards cleared away ("View the
// land"), the larger courses and lakes are drawn faintly and named wherever
// a name fits, and the rest still answer to the pointer.
//
// Lettering never goes under a card, over the page's title, over the land's
// own name or down into the fade at the foot of the table. A name runs along
// a gently curved line laid over the straightest open stretch of its course;
// where no stretch is long enough, it is set level beside the pointer.
//
// Desktop only; the page does not load it on a phone.
import { DEM, type View } from './ground';

export type Box = { x0: number; y0: number; x1: number; y1: number };

type Kind = 'l' | 'a' | 'p' | 's' | 'f';
/** As stored: name, kind (line, area, pond, spring, falls), tier, weight,
    then the points as x, y pairs in tenths of an elevation cell. */
type Raw = [string, Kind, number, number, number[]];

type Feature = {
  name: string;
  kind: Kind;
  /** 1 and 2 are drawn and named when the land is viewed bare; 3 on hover only. */
  tier: number;
  /** Which name gets the room first: longer courses and larger lakes. */
  weight: number;
  /** Points as lon/lat pairs. */
  pts: Float64Array;
  /* ---- on the screen, for the current layout ---- */
  xy: number[];
  box: Box;
  g: SVGGElement | null;
  /** The label of the bare-land view, if one fitted, and the room it takes. */
  allLabel: SVGElement | null;
  allBox: Box | null;
};

const NS = 'http://www.w3.org/2000/svg';
/** How near the pointer must come to a course or a mark, px. */
const REACH = 8;
const GRID = 32;
/** In the bare-land view, tier-2 water is named only from this weight up:
    a course of about 15 km, or a lake of about half a square kilometre. */
const NAMED_WEIGHT = 15;

const el = <K extends keyof SVGElementTagNameMap>(name: K, attrs: Record<string, string | number> = {}) => {
  const e = document.createElementNS(NS, name);
  for (const k in attrs) e.setAttribute(k, String(attrs[k]));
  return e;
};
const pathOf = (xy: number[], close = false) => {
  let d = '';
  for (let i = 0; i < xy.length; i += 2) d += (i ? 'L' : 'M') + xy[i].toFixed(1) + ',' + xy[i + 1].toFixed(1);
  return close ? d + 'Z' : d;
};

/** Points every `step` px along a polyline. */
const densify = (xy: number[], step: number) => {
  const out = [xy[0], xy[1]];
  for (let i = 2; i < xy.length; i += 2) {
    const x0 = xy[i - 2], y0 = xy[i - 1], x1 = xy[i], y1 = xy[i + 1];
    const n = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0) / step));
    for (let j = 1; j <= n; j++) out.push(x0 + ((x1 - x0) * j) / n, y0 + ((y1 - y0) * j) / n);
  }
  return out;
};
/** A running average over k points either side. */
const smooth = (xy: number[], k: number) => {
  const n = xy.length / 2;
  const out = new Array<number>(xy.length);
  for (let i = 0; i < n; i++) {
    let x = 0, y = 0, c = 0;
    for (let j = Math.max(0, i - k); j <= Math.min(n - 1, i + k); j++) { x += xy[2 * j]; y += xy[2 * j + 1]; c++; }
    out[2 * i] = x / c;
    out[2 * i + 1] = y / c;
  }
  return out;
};
/** Distance from a point to a segment, px. */
const segDist = (px: number, py: number, x0: number, y0: number, x1: number, y1: number) => {
  const dx = x1 - x0, dy = y1 - y0;
  const t = dx || dy ? Math.max(0, Math.min(1, ((px - x0) * dx + (py - y0) * dy) / (dx * dx + dy * dy))) : 0;
  return Math.hypot(px - x0 - t * dx, py - y0 - t * dy);
};
const inside = (px: number, py: number, xy: number[]) => {
  let r = false;
  for (let i = 0, j = xy.length - 2; i < xy.length; j = i, i += 2) {
    if (xy[i + 1] > py !== xy[j + 1] > py && px < ((xy[j] - xy[i]) * (py - xy[i + 1])) / (xy[j + 1] - xy[i + 1]) + xy[i]) r = !r;
  }
  return r;
};

export class Water {
  private table: HTMLElement;
  private svg: SVGSVGElement;
  private feats: Feature[] = [];
  private view: View | null = null;
  private grid = new Map<number, number[]>();
  private all = false;
  private shown: Feature[] = [];
  private hoverTags: SVGElement[] = [];
  private frame = 0;
  private uid = 0;
  /** Boxes lettering keeps out of, besides the cards: the title, the land's name. */
  private fixed: Box[] = [];
  /** Below this, lettering would sink into the fade at the foot of the table. */
  private floor = 0;
  ready = false;

  constructor(table: HTMLElement) {
    this.table = table;
    this.svg = el('svg', { class: 'pc-water', 'aria-hidden': 'true', focusable: 'false' });
    // between the land and the cards
    table.insertBefore(this.svg, table.querySelector('.pc-felt'));
    table.addEventListener('pointermove', (ev) => this.onMove(ev));
    table.addEventListener('pointerleave', () => this.show([]));
  }

  async load(url: string) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`water: ${res.status}`);
    const data = (await res.json()) as { v: number; f: Raw[] };
    const lonPer = (DEM.lon1 - DEM.lon0) / (DEM.w - 1) / 10;
    const latPer = (DEM.lat1 - DEM.lat0) / (DEM.h - 1) / 10;
    this.feats = data.f.map(([name, kind, tier, weight, c]) => {
      const pts = new Float64Array(c.length);
      for (let i = 0; i < c.length; i += 2) {
        pts[i] = DEM.lon0 + c[i] * lonPer;
        pts[i + 1] = DEM.lat1 - c[i + 1] * latPer;
      }
      return { name, kind, tier, weight, pts, xy: [], box: { x0: 0, y0: 0, x1: 0, y1: 0 }, g: null, allLabel: null, allBox: null };
    });
    this.ready = true;
  }

  /** Lay the water over the land as it is now drawn on the table. */
  layout(view: View, fixed: Box[]) {
    if (!this.ready) return;
    this.view = view;
    this.fixed = fixed;
    const W = view.W, H = view.H;
    this.floor = H - Math.min(120, Math.max(72, innerHeight * 0.12)) * 0.75;
    this.svg.setAttribute('width', String(W));
    this.svg.setAttribute('height', String(H));
    this.svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    this.svg.replaceChildren();
    this.shown = [];
    this.hoverTags = [];
    this.grid.clear();
    this.feats.forEach((f, k) => {
      const raw: number[] = [];
      for (let i = 0; i < f.pts.length; i += 2) {
        const p = view.toXY(f.pts[i + 1], f.pts[i]);
        raw.push(p.x, p.y);
      }
      f.xy = f.kind === 'l' ? smooth(densify(raw, 3), 1) : f.kind === 'a' ? smooth(raw, 1) : raw;
      let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
      for (let i = 0; i < f.xy.length; i += 2) {
        x0 = Math.min(x0, f.xy[i]); x1 = Math.max(x1, f.xy[i]);
        y0 = Math.min(y0, f.xy[i + 1]); y1 = Math.max(y1, f.xy[i + 1]);
      }
      f.box = { x0, y0, x1, y1 };
      f.g = null;
      f.allLabel = null;
      f.allBox = null;
      // index each piece of the feature in a coarse grid, for the pointer
      const add = (gx: number, gy: number) => {
        const key = gy * 4096 + gx;
        const list = this.grid.get(key);
        if (!list) this.grid.set(key, [k]);
        else if (list[list.length - 1] !== k) list.push(k);
      };
      if (f.kind === 'l' || f.kind === 'a') {
        const last = f.kind === 'a' ? f.xy.length : f.xy.length - 2;
        for (let i = 0; i < Math.max(2, last); i += 2) {
          const ax = f.xy[i], ay = f.xy[i + 1];
          const j = (i + 2) % f.xy.length;
          const bx = f.xy[j], by = f.xy[j + 1];
          for (let gy = Math.floor((Math.min(ay, by) - REACH) / GRID); gy <= Math.floor((Math.max(ay, by) + REACH) / GRID); gy++)
            for (let gx = Math.floor((Math.min(ax, bx) - REACH) / GRID); gx <= Math.floor((Math.max(ax, bx) + REACH) / GRID); gx++) add(gx, gy);
        }
        if (f.kind === 'a') {
          for (let gy = Math.floor(y0 / GRID); gy <= Math.floor(y1 / GRID); gy++)
            for (let gx = Math.floor(x0 / GRID); gx <= Math.floor(x1 / GRID); gx++) add(gx, gy);
        }
      } else {
        for (let gy = Math.floor((f.xy[1] - REACH) / GRID); gy <= Math.floor((f.xy[1] + REACH) / GRID); gy++)
          for (let gx = Math.floor((f.xy[0] - REACH) / GRID); gx <= Math.floor((f.xy[0] + REACH) / GRID); gx++) add(gx, gy);
      }
    });
    if (this.all) this.drawAll();
  }

  /** The bare-land view: the larger water drawn faintly and named where it fits. */
  setAll(on: boolean) {
    if (on === this.all) return;
    this.all = on;
    this.show([]);
    if (on) this.drawAll();
    else {
      for (const f of this.feats) {
        if (!f.g) continue;
        f.g.classList.remove('is-faint');
        f.allLabel?.remove();
        f.allLabel = null;
        f.allBox = null;
      }
    }
    this.svg.classList.toggle('is-all', on);
  }

  private drawAll() {
    if (!this.view) return;
    const placed: Box[] = [...this.fixed];
    const order = this.feats.filter((f) => f.tier <= 2).sort((a, b) => a.tier - b.tier || b.weight - a.weight);
    for (const f of order) {
      const g = this.group(f);
      g.classList.add('is-faint');
      f.allLabel?.remove();
      f.allLabel = null;
      f.allBox = null;
      // only the larger water is named, and the names are kept well apart,
      // so the land still reads as land; the rest answer to the pointer
      if (f.tier === 1 || f.weight >= NAMED_WEIGHT) {
        f.allLabel = this.label(f, placed, null, 14);
        if (f.allLabel) f.allBox = placed[placed.length - 1];
      }
      if (f.allLabel) {
        f.allLabel.classList.add('wf-all');
        g.append(f.allLabel);
      }
    }
  }

  /** The feature's line or mark, made on first use. */
  private group(f: Feature) {
    if (f.g) return f.g;
    const g = el('g', { class: `wf wf-${f.kind} wf-t${f.tier}` });
    if (f.kind === 'l' || f.kind === 'a') {
      const d = pathOf(f.xy, f.kind === 'a');
      g.append(el('path', { class: 'wf-halo', d }), el('path', { class: 'wf-ink', d }));
    } else {
      const [x, y] = f.xy;
      const r = f.kind === 'p' ? 2.4 : 2.8;
      g.append(el('circle', { class: 'wf-halo', cx: x, cy: y, r: r + 1.6 }), el('circle', { class: 'wf-ink', cx: x, cy: y, r }));
    }
    this.svg.append(g);
    f.g = g;
    return g;
  }

  /** Set a name for f where it fits clear of `placed`, which it then joins.
      `at` is the pointer, for a name that cannot run along its course. */
  private label(f: Feature, placed: Box[], at: { x: number; y: number } | null, room = 0): SVGElement | null {
    const W = this.view!.W;
    // `room`: the extra clearance one name keeps from the next
    const free = (b: Box) => b.x0 > 6 && b.x1 < W - 6 && b.y0 > 8 && b.y1 < this.floor &&
      !placed.some((q) => b.x0 - room < q.x1 && b.x1 + room > q.x0 && b.y0 - room < q.y1 && b.y1 + room > q.y0);
    const t = el('text', { class: `wf-name wf-name-${f.tier}` });
    t.textContent = f.name;
    // measured where it will be drawn, so the font and size are the real ones
    this.svg.append(t);
    const tw = t.getComputedTextLength();
    t.remove();

    if (f.kind === 'l') {
      const lp = smooth(smooth(densify(f.xy, 4), 10), 5);
      // arc length along the label line
      const n = lp.length / 2;
      const acc = new Float64Array(n);
      for (let i = 1; i < n; i++) acc[i] = acc[i - 1] + Math.hypot(lp[2 * i] - lp[2 * i - 2], lp[2 * i + 1] - lp[2 * i - 1]);
      const len = acc[n - 1];
      const L = tw + 12;
      const at_ = (s: number) => {
        let lo = 0, hi = n - 1;
        while (hi - lo > 1) { const m = (lo + hi) >> 1; if (acc[m] < s) lo = m; else hi = m; }
        const u = acc[hi] > acc[lo] ? (s - acc[lo]) / (acc[hi] - acc[lo]) : 0;
        return { x: lp[2 * lo] + (lp[2 * hi] - lp[2 * lo]) * u, y: lp[2 * lo + 1] + (lp[2 * hi + 1] - lp[2 * lo + 1]) * u };
      };
      let best: { score: number; smp: { x: number; y: number }[]; box: Box } | null = null;
      for (let s = 0; s + L <= len; s += 5) {
        const smp: { x: number; y: number }[] = [];
        for (let i = 0; i <= 12; i++) smp.push(at_(s + (L * i) / 12));
        const a0 = smp[0], a1 = smp[12];
        const chord = Math.hypot(a1.x - a0.x, a1.y - a0.y);
        if (chord < L * 0.82) continue;
        // never steeper than about seventy degrees, so it reads without a tilt of the head
        if (Math.abs(a1.y - a0.y) > chord * 0.94) continue;
        let dev = 0;
        for (const p of smp) dev = Math.max(dev, Math.abs((a1.x - a0.x) * (p.y - a0.y) - (a1.y - a0.y) * (p.x - a0.x)) / chord);
        if (dev > L * 0.12) continue;
        let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
        for (const p of smp) { x0 = Math.min(x0, p.x); x1 = Math.max(x1, p.x); y0 = Math.min(y0, p.y); y1 = Math.max(y1, p.y); }
        const box = { x0: x0 - 4, y0: y0 - 18, x1: x1 + 4, y1: y1 + 4 };
        if (!free(box)) continue;
        // the straightest stretch, near the middle of the course - or near the pointer
        const mid = at ? Math.hypot((x0 + x1) / 2 - at.x, (y0 + y1) / 2 - at.y) / 400 : Math.abs((s + L / 2) / len - 0.5);
        const score = (dev / L) * 3 + mid;
        if (!best || score < best.score) best = { score, smp, box };
      }
      if (best) {
        let p0 = best.smp[0], p2 = best.smp[12];
        const pm = best.smp[6];
        if (p2.x < p0.x) [p0, p2] = [p2, p0];
        const cx = 2 * pm.x - (p0.x + p2.x) / 2;
        const cy = 2 * pm.y - (p0.y + p2.y) / 2;
        const id = `wf-${++this.uid}`;
        const g = el('g', { class: 'wf-label' });
        g.append(el('path', { id, d: `M${p0.x.toFixed(1)},${p0.y.toFixed(1)}Q${cx.toFixed(1)},${cy.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`, fill: 'none' }));
        const tp = el('textPath', { href: `#${id}`, startOffset: '50%', 'text-anchor': 'middle' });
        tp.textContent = f.name;
        t.textContent = '';
        t.setAttribute('dy', '-5');
        t.append(tp);
        g.append(t);
        placed.push(best.box);
        return g;
      }
      if (!at) return null;
    }

    // a lake, a mark, or a course with no open stretch long enough: level type
    const near = (x0: number, y0: number, x1: number, y1: number): [number, number, string][] => {
      const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
      return [
        [x1 + 6, cy + 4, 'start'], [x0 - 6, cy + 4, 'end'], [cx, y0 - 6, 'middle'], [cx, y1 + 15, 'middle'],
        [x1 + 5, y0 - 3, 'start'], [x1 + 5, y1 + 13, 'start'], [x0 - 5, y0 - 3, 'end'], [x0 - 5, y1 + 13, 'end'],
      ];
    };
    const base = f.kind === 'l' && at ? { x0: at.x - 10, y0: at.y - 10, x1: at.x + 10, y1: at.y + 10 } : f.box;
    const spots = near(base.x0, base.y0, base.x1, base.y1);
    // On hover, if all of those are covered, further out in widening rings -
    // the nearest open spot, read level, its near end toward the feature.
    // (Names on the bare land stay right beside their feature or are left off.)
    const cx = (base.x0 + base.x1) / 2, cy = (base.y0 + base.y1) / 2;
    const rx = (base.x1 - base.x0) / 2, ry = (base.y1 - base.y0) / 2;
    for (const r of at ? [18, 34, 56, 84, 120, 160, 210, 270] : []) {
      for (let k = 0; k < 16; k++) {
        const a = (k / 16) * Math.PI * 2;
        const dx = Math.cos(a), dy = Math.sin(a);
        const x = cx + dx * (rx + r), y = cy + dy * (ry + r) + 4;
        spots.push([x, y, dx > 0.3 ? 'start' : dx < -0.3 ? 'end' : 'middle']);
      }
    }
    for (const [x, y, anchor] of spots) {
      const left = anchor === 'start' ? x : anchor === 'end' ? x - tw : x - tw / 2;
      const box = { x0: left - 2, y0: y - 13, x1: left + tw + 2, y1: y + 4 };
      if (!free(box)) continue;
      t.setAttribute('x', x.toFixed(1));
      t.setAttribute('y', y.toFixed(1));
      t.setAttribute('text-anchor', anchor);
      placed.push(box);
      return t;
    }
    return null;
  }

  /* ---------------- the pointer ---------------- */

  private onMove(ev: PointerEvent) {
    if (!this.ready || !this.view || ev.pointerType === 'touch') return;
    const target = ev.target as Element;
    // over a card, the title or its control: the water stays quiet
    if (target.closest('.pc-card, .pc-label')) { this.show([]); return; }
    const r = this.table.getBoundingClientRect();
    const x = ev.clientX - r.left;
    const y = ev.clientY - r.top;
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => this.show(this.find(x, y), { x, y }));
  }

  /** What lies under the pointer: a lake it is over, or whatever passes
      nearest - and anything else sharing that same channel. */
  private find(x: number, y: number): Feature[] {
    const list = this.grid.get(Math.floor(y / GRID) * 4096 + Math.floor(x / GRID));
    if (!list) return [];
    const found: { f: Feature; d: number }[] = [];
    for (const k of list) {
      const f = this.feats[k];
      let d = Infinity;
      if (f.kind === 'l' || f.kind === 'a') {
        if (f.kind === 'a' && inside(x, y, f.xy)) d = 0;
        else for (let i = 2; i < f.xy.length; i += 2) d = Math.min(d, segDist(x, y, f.xy[i - 2], f.xy[i - 1], f.xy[i], f.xy[i + 1]));
      } else d = Math.hypot(x - f.xy[0], y - f.xy[1]);
      if (d <= REACH) found.push({ f, d });
    }
    if (!found.length) return [];
    found.sort((a, b) => a.d - b.d || b.f.weight - a.f.weight);
    const d0 = found[0].d;
    return found.filter((h) => h.d <= d0 + 2).slice(0, 3).map((h) => h.f);
  }

  /** Show these features, and only these, named. */
  private show(fs: Feature[], at: { x: number; y: number } | null = null) {
    const same = fs.length === this.shown.length && fs.every((f, i) => f === this.shown[i]);
    if (same) return;
    for (const f of this.shown) f.g?.classList.remove('is-on');
    for (const t of this.hoverTags) t.remove();
    this.hoverTags = [];
    this.shown = fs;
    if (!fs.length || !this.view) return;
    // lettering keeps off the cards as they lie now, the title and the land's name
    const tr = this.table.getBoundingClientRect();
    const placed: Box[] = [...this.fixed];
    if (!this.table.classList.contains('pc-bare')) {
      this.table.querySelectorAll<HTMLElement>('.pc-card').forEach((c) => {
        const r = c.getBoundingClientRect();
        placed.push({ x0: r.left - tr.left - 6, y0: r.top - tr.top - 6, x1: r.right - tr.left + 6, y1: r.bottom - tr.top + 6 });
      });
    }
    // in the bare view, the faint names already on the land
    if (this.all) for (const f of this.feats) if (f.allBox && !fs.includes(f)) placed.push(f.allBox);
    for (const f of fs) {
      const g = this.group(f);
      g.classList.add('is-on');
      // raise it above the faint ones
      this.svg.append(g);
      if (f.allLabel) continue;
      const t = this.label(f, placed, at);
      if (t) { t.classList.add('wf-hover'); g.append(t); this.hoverTags.push(t); }
    }
  }
}
