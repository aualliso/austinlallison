// src/lib/scatter.ts
//
// Deals cards at random onto a table of fixed size - a different layout for
// every seed - under three rules:
//
//   1. A card may overlap another card's PICTURE, never its TEXT. Each card
//      declares how much of its height, from the bottom, is text; that band
//      (plus a margin) is kept clear of every card stacked above it.
//   2. The cards above a card never hide more than a set share of its
//      picture, together, so every picture stays recognisable.
//   3. Pinned cards (the page's title placard) are kept clear altogether.
//   4. Raised cards (the most important ones) are never covered by anything:
//      they lie on top, and only ever rest on other cards' pictures.
//   5. Tethered cards stay within reach of a point - their place on a map -
//      and lean toward it; pinned points (the flags) are never covered.
//
// Cards are dealt one at a time, largest first, each new card landing on top
// of those already down. For each card many random spots are tried; of the
// spots that keep the rules, the one farthest from the cards already down is
// taken, so the deal is random but spreads over the whole table instead of
// piling up. If a card finds no lawful spot, the deal starts again with a new
// shuffle; the caller can shrink the cards and call again if every try fails.
//
// Pure arithmetic, no DOM: the page calls it at build time (seeded, so the
// no-JavaScript layout is stable) and again in the browser with the cards'
// real, measured sizes and a fresh seed.

export type CardSpec = {
  /** Relative area weight: 1 for the largest kind of card. */
  weight: number;
  /** Card height as a multiple of its width, before text is measured. */
  aspect: number;
  /** Height of the protected text band, in px, at the card's final width. */
  textHeight?: (width: number) => number;
  /** Pinned cards keep their position, sit on top and are never overlapped. */
  pin?: { x: number; y: number };
  /** Raised cards are dealt first but lie above every unpinned card, so no
      card ever covers them; they may rest on other cards' pictures. */
  raised?: boolean;
  /** Tethered cards must lie within `reach` px of this point (their flag),
      and are drawn toward it. */
  anchor?: { x: number; y: number; reach: number };
  /** Pinned only: clear space kept around it, px (default: the margin). */
  clear?: number;
  /** Exact width in px; overrides weight-based sizing. */
  width?: number;
  /** Exact height in px, when it has been measured. */
  height?: number;
};

export type Placed = { x: number; y: number; w: number; h: number; rot: number; z: number };
/** `ok` is false when no deal that keeps every rule was found. */
export type Scatter = { placed: Placed[]; ok: boolean };

/** Small, fast, seedable PRNG (mulberry32). */
export const rng = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

type Rect = { x: number; y: number; w: number; h: number };
/** Overlap of two boxes given as numbers: no objects made, so the deal's
    inner loop allocates nothing. */
const ov = (ax: number, ay: number, aw: number, ah: number, bx: number, by: number, bw: number, bh: number) => {
  const w = Math.min(ax + aw, bx + bw) - Math.max(ax, bx);
  if (w <= 0) return 0;
  const h = Math.min(ay + ah, by + bh) - Math.max(ay, by);
  return h > 0 ? w * h : 0;
};
const overlapArea = (a: Rect, b: Rect) => {
  const w = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
  const h = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
  return w > 0 && h > 0 ? w * h : 0;
};

export type ScatterOptions = {
  /** Share of the table the cards' combined area should fill (weight sizing only). */
  density?: number;
  /** Largest share of a card's picture the cards above it may cover, together. */
  maxCover?: number;
  /** Clear space around protected text and pinned cards, px. */
  margin?: number;
  /** Largest tilt, degrees; big cards tilt less. */
  maxTilt?: number;
  /** Fresh shuffles to try before giving up. */
  attempts?: number;
  /** 'snug' tucks each card against the others (fits more on the table);
      'spread' keeps them as far apart as the table allows. */
  pack?: 'snug' | 'spread';
  /** Snug only: how strongly cards are drawn toward the table's edges. */
  edgePull?: number;
  /** Snug only: randomness added to each spot's score. */
  jitter?: number;
  /** Tethered cards: how strongly they lean toward their flag. */
  anchorPull?: number;
  /** Lawful spots to compare for each card. */
  candidates?: number;
};

export function scatter(
  cards: CardSpec[],
  W: number,
  H: number,
  seed: number,
  opts: ScatterOptions = {}
): Scatter {
  const density = opts.density ?? 0.9;
  const maxCover = opts.maxCover ?? 0.35;
  const margin = opts.margin ?? 10;
  const maxTilt = opts.maxTilt ?? 3.5;
  const attempts = opts.attempts ?? 10;
  const pack = opts.pack ?? 'snug';
  const edgePull = opts.edgePull ?? 1;
  const jitter = opts.jitter ?? 0.05;
  const tries = opts.candidates ?? 24;

  // Unit size so the weight-sized cards fill `density` of the table.
  const sizedWeight = cards.reduce((s, c) => s + (c.width ? 0 : c.weight * c.aspect), 0);
  const fixedArea = cards.reduce((s, c) => s + (c.width ? c.width * (c.height ?? c.width * c.aspect) : 0), 0);
  let scale = Math.sqrt(Math.max(1, density * W * H - fixedArea) / Math.max(sizedWeight, 1e-6));
  const allFixed = sizedWeight === 0;

  let best: Placed[] = [];
  for (let attempt = 0; attempt < attempts; attempt++) {
    const rand = rng(seed + attempt * 7919);
    const placed: Placed[] = cards.map((c) => {
      const w = c.width ?? Math.sqrt(c.weight) * scale;
      const h = c.height ?? w * c.aspect;
      return { w, h, x: c.pin?.x ?? 0, y: c.pin?.y ?? 0, rot: 0, z: 0 };
    });
    const maxW = Math.max(...placed.map((p) => p.w));
    const textH = (i: number) => {
      const p = placed[i];
      return Math.min(p.h, cards[i].textHeight?.(p.w) ?? p.h * 0.4);
    };
    /** Distance from a point to a card, px (0 when the point is under it). */
    const reachOf = (a: { x: number; y: number }, x: number, y: number, w: number, h: number) =>
      Math.hypot(Math.max(x - a.x, 0, a.x - (x + w)), Math.max(y - a.y, 0, a.y - (y + h)));

    // Deal order: largest first (so small cards land on big cards' pictures),
    // shuffled a little so it is not rigid. Pinned cards are simply there.
    const pinned = cards.map((c, i) => (c.pin ? i : -1)).filter((i) => i >= 0);
    const order = cards
      .map((c, i) => ({ i, key: -(placed[i].w * placed[i].h) * (0.8 + rand() * 0.4) - (c.raised ? 1e12 : 0) }))
      .filter(({ i }) => !cards[i].pin)
      .sort((a, b) => a.key - b.key)
      .map((o) => o.i);
    const down: number[] = [];
    const covered = placed.map(() => 0);

    const raisedArr = cards.map((c) => !!c.raised);
    const raised = (i: number) => raisedArr[i];
    // sizes are fixed for this attempt: work out text bands and picture areas once
    const th = placed.map((_, i) => textH(i));
    const pic = placed.map((p, i) => Math.max(1, p.w * (p.h - th[i])));
    // the pinned cards' kept-clear boxes, as flat numbers
    const pinBox = pinned.map((j) => {
      const c = cards[j].clear ?? margin;
      const q = placed[j];
      return [q.x - c, q.y - c, q.w + 2 * c, q.h + 2 * c];
    });
    const lawful = (i: number, x: number, y: number) => {
      const w = placed[i].w;
      const h = placed[i].h;
      for (let k = 0; k < pinBox.length; k++) {
        const b = pinBox[k];
        if (ov(b[0], b[1], b[2], b[3], x, y, w, h)) return false;
      }
      const an = cards[i].anchor;
      if (an && reachOf(an, x, y, w, h) > an.reach) return false;
      const ri = raisedArr[i];
      // my own text band at this spot
      const myBx = x - margin;
      const myBy = y + h - th[i] - margin;
      const myBw = w + 2 * margin;
      const myBh = th[i] + 2 * margin;
      let mine = 0; // how much of my picture the raised cards above me hide
      for (let k = 0; k < down.length; k++) {
        const j = down[k];
        const p = placed[j];
        if (ri && raisedArr[j]) {
          // raised cards never touch one another
          if (ov(p.x - margin, p.y - margin, p.w + 2 * margin, p.h + 2 * margin, x, y, w, h)) return false;
        } else if (raisedArr[j]) {
          // j lies above me: it must keep off my text
          if (ov(p.x, p.y, p.w, p.h, myBx, myBy, myBw, myBh)) return false;
          mine += ov(x, y, w, h, p.x, p.y, p.w, p.h);
        } else {
          // I land on top of j: keep off its text, and leave most of its
          // picture showing, counting every card above it
          if (ov(x, y, w, h, p.x - margin, p.y + p.h - th[j] - margin, p.w + 2 * margin, th[j] + 2 * margin)) return false;
          const o = ov(x, y, w, h, p.x, p.y, p.w, p.h);
          if (o && (covered[j] + o) / pic[j] > maxCover) return false;
        }
      }
      return mine / pic[i] <= maxCover;
    };

    let ok = true;
    for (const i of order) {
      const p = placed[i];
      const spanX = Math.max(0, W - p.w);
      const spanY = Math.max(0, H - p.h);
      let bx = -1, by = -1, bScore = -Infinity, found = 0;
      for (let t = 0; t < 1200 && found < tries; t++) {
        // tethered cards look near their flag; the rest anywhere
        const an = cards[i].anchor;
        const x = an
          ? Math.min(spanX, Math.max(0, an.x - p.w / 2 + (rand() * 2 - 1) * (an.reach + p.w / 2)))
          : rand() * spanX;
        const y = an
          ? Math.min(spanY, Math.max(0, an.y - p.h / 2 + (rand() * 2 - 1) * (an.reach + p.h / 2)))
          : rand() * spanY;
        if (!lawful(i, x, y)) continue;
        found++;
        const cx = x + p.w / 2, cy = y + p.h / 2;
        let score: number;
        if (pack === 'spread') {
          // farthest from the cards already down (Mitchell's best candidate)
          score = Infinity;
          for (const j of [...pinned, ...down]) {
            const q = placed[j];
            const d = Math.hypot(cx - (q.x + q.w / 2), cy - (q.y + q.h / 2)) / Math.sqrt(p.w * p.h + q.w * q.h);
            if (d < score) score = d;
          }
        } else {
          // snug: tuck in against the cards already down and the table's edges,
          // leaving open table for the cards still to come
          let o = 0;
          for (let k = 0; k < down.length; k++) {
            const q = placed[down[k]];
            o += ov(x, y, p.w, p.h, q.x, q.y, q.w, q.h);
          }
          for (let k = 0; k < pinned.length; k++) {
            const q = placed[pinned[k]];
            o += ov(x - 3 * margin, y - 3 * margin, p.w + 6 * margin, p.h + 6 * margin, q.x, q.y, q.w, q.h) * 0.5;
          }
          const edge = Math.min(x, W - x - p.w) / W + Math.min(y, H - y - p.h) / H;
          score = o / (p.w * p.h) - edge * edgePull + rand() * jitter;
          const an = cards[i].anchor;
          if (an) score -= (reachOf(an, x, y, p.w, p.h) / an.reach) * (opts.anchorPull ?? 1);
        }
        if (score > bScore) { bScore = score; bx = x; by = y; }
      }
      if (bx < 0) { ok = false; break; }
      p.x = bx;
      p.y = by;
      for (const j of down) {
        if (raised(j) && !raised(i)) covered[i] += overlapArea(p, placed[j]);
        else if (!raised(j)) covered[j] += overlapArea(p, placed[j]);
      }
      p.rot = (rand() * 2 - 1) * maxTilt * (p.w > maxW * 0.85 ? 0.55 : 1);
      down.push(i);
    }

    // stacking: deal order, raised cards above the rest, pinned above all
    const stack = [...down.filter((i) => !raised(i)), ...down.filter(raised), ...pinned];
    stack.forEach((i, k) => (placed[i].z = k + 1));
    best = placed;
    if (ok) return { placed, ok: true };
    if (!allFixed) scale *= 0.95;
  }
  return { placed: best, ok: false };
}
