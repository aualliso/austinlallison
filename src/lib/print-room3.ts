// src/lib/print-room.ts
//
// THE PRINT ROOM. Lights the dark band at the head of a collection page by
// the sun over Lubbock at the moment the visitor arrives: a window's light
// laid across the desk, long and amber when the sun is low, short and white
// when it is high, with the print's shadow cut out of it. After sunset a
// blue twilight fades to a warm lamp, with moonlight when the moon is up.
//
// HARD RULE (the same as the album's solar desk): THE LIGHT TOUCHES THE DESK
// ONLY. It is drawn on a canvas BEHIND the print and is never laid over the
// photograph.
//
// COST. One canvas, drawn once on arrival, again on resize, and every five
// minutes while the page stays open. No CSS or SVG filter anywhere - the
// blur is the canvas's own shadow, a one-off raster, not a live filter graph
// (the class of thing that made the home page slow on Firefox Android).
// Nothing animates.
//
// SEAMLESS EDGES. The band's ground reaches the window edges by a
// border-image outset the canvas cannot cover, so the canvas is TRANSPARENT
// and adds light only, feathered to nothing at its left and right edges:
// wherever the canvas ends, the ground beneath is the same flat colour.
//
// TWO WAYS IN. drawRoom lights the band round ONE print (a collection's
// frontispiece, an item's plate). drawDesk lights a desk of SEVERAL - the
// guide's table - where every print cuts its own shadow from the one beam,
// turned as the print is turned. Both are the same room: drawRoom is the
// desk with a single unturned print on it, and draws exactly as it did.
//
// The sun and moon are computed here, low-precision (well inside a degree,
// far finer than a shaft of light can show). The sun matches solar.ts; this
// module keeps its own copy so the page script carries no build-time data.

const RAD = Math.PI / 180;
const LAT = 33.5779;
const LON = -101.8552;

type RGB = [number, number, number];
type Body = { alt: number; az: number; ra: number; dec: number };
type Shaft = { az: number; alt: number; colour: RGB; strength: number; kind: 'sun' | 'moon' };
export type Light = {
  sun: Body;
  moon: Body & { lit: number };
  shafts: Shaft[];
  lamp: number;
  ambient: RGB;
  ambientLift: number;
  phase: string;
};

/* ------------------------------------------------------------------ *
 * Sun and moon
 * ------------------------------------------------------------------ */
const days = (ms: number) => ms / 864e5 + 2440587.5 - 2451545;

function toAltAz(n: number, ra: number, dec: number): Body {
  const gmst = (280.46061837 + 360.98564736629 * n) % 360;
  const H = (gmst + LON) * RAD - ra;
  const phi = LAT * RAD;
  const alt = Math.asin(Math.sin(phi) * Math.sin(dec) + Math.cos(phi) * Math.cos(dec) * Math.cos(H));
  const az = Math.atan2(
    -Math.cos(dec) * Math.sin(H),
    Math.sin(dec) * Math.cos(phi) - Math.cos(dec) * Math.sin(phi) * Math.cos(H)
  );
  return { alt: alt / RAD, az: (az / RAD + 360) % 360, ra, dec };
}

export function sunAt(ms: number): Body {
  const n = days(ms);
  const L = (280.46 + 0.9856474 * n) % 360;
  const g = (357.528 + 0.9856003 * n) * RAD;
  const lam = (L + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g)) * RAD;
  const eps = (23.439 - 4e-7 * n) * RAD;
  return toAltAz(n, Math.atan2(Math.cos(eps) * Math.sin(lam), Math.cos(lam)), Math.asin(Math.sin(eps) * Math.sin(lam)));
}

export function moonAt(ms: number, sun: Body): Body & { lit: number } {
  const n = days(ms);
  const e = 23.4397 * RAD;
  const L = (218.316 + 13.176396 * n) * RAD;
  const M = (134.963 + 13.064993 * n) * RAD;
  const F = (93.272 + 13.22935 * n) * RAD;
  const lon = L + 6.289 * RAD * Math.sin(M);
  const lat = 5.128 * RAD * Math.sin(F);
  const ra = Math.atan2(Math.sin(lon) * Math.cos(e) - Math.tan(lat) * Math.sin(e), Math.cos(lon));
  const dec = Math.asin(Math.sin(lat) * Math.cos(e) + Math.cos(lat) * Math.sin(e) * Math.sin(lon));
  const m = toAltAz(n, ra, dec);
  const cosPsi = Math.sin(sun.dec) * Math.sin(dec) + Math.cos(sun.dec) * Math.cos(dec) * Math.cos(sun.ra - ra);
  return { ...m, lit: (1 - cosPsi) / 2 };
}

/* ------------------------------------------------------------------ *
 * The light in the room at a moment. THE DIALS are the numbers in here:
 * SUN_ALPHA is the brightest the beam may lay on the desk. It is capped so
 * the light type of the title page still reads where the evening beam
 * crosses it; raise it for more glare, at that cost.
 * ------------------------------------------------------------------ */
const SUN_ALPHA = 0.42;
const MOON_ALPHA = 0.2;
const LAMP_ALPHA = 0.42;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const SUN_COLOUR: [number, RGB][] = [
  [0, [255, 138, 64]],
  [4, [255, 165, 92]],
  [10, [255, 196, 138]],
  [22, [255, 226, 186]],
  [40, [255, 242, 224]],
  [70, [252, 249, 242]],
];
function sunColour(alt: number): RGB {
  if (alt <= SUN_COLOUR[0][0]) return SUN_COLOUR[0][1];
  for (let i = 1; i < SUN_COLOUR.length; i++) {
    if (alt <= SUN_COLOUR[i][0]) {
      const [x0, c0] = SUN_COLOUR[i - 1];
      const [x1, c1] = SUN_COLOUR[i];
      const t = (alt - x0) / (x1 - x0);
      return c0.map((v, k) => lerp(v, c1[k], t)) as RGB;
    }
  }
  return SUN_COLOUR[SUN_COLOUR.length - 1][1];
}

export function lightAt(ms: number): Light {
  const sun = sunAt(ms);
  const moon = moonAt(ms, sun);
  const L: Light = { sun, moon, shafts: [], lamp: 0, ambient: [0, 0, 0], ambientLift: 0, phase: '' };
  if (sun.alt > -0.8) {
    // A beam on a horizontal desk: weak and long at a low sun, strong and short high.
    const up = Math.min(1, (sun.alt + 0.8) / 2.8);
    const strength = up * SUN_ALPHA * Math.pow(Math.max(0.02, Math.sin(Math.max(sun.alt, 0.5) * RAD)), 0.45);
    L.shafts.push({ az: sun.az, alt: Math.max(sun.alt, 1.2), colour: sunColour(sun.alt), strength, kind: 'sun' });
    L.ambientLift = 0.1 + 0.18 * Math.min(1, sun.alt / 30);
    L.ambient = [255, 236, 210];
    L.phase = sun.alt < 6 ? (sun.az < 180 ? 'sunrise' : 'sunset') : sun.alt < 15 ? 'golden hour' : 'day';
  } else if (sun.alt > -12) {
    // Twilight: no beam, a blue lift that fades as the lamp comes up.
    const t = (sun.alt + 12) / 11.2;
    L.ambientLift = 0.1 * t;
    L.ambient = [120, 150, 215];
    L.lamp = 1 - t;
    L.phase = 'twilight';
  } else {
    L.lamp = 1;
    L.phase = 'night';
  }
  if (sun.alt < -2 && moon.alt > 0 && moon.lit > 0.08) {
    const strength =
      MOON_ALPHA * Math.pow(moon.lit, 1.3) * Math.min(1, moon.alt / 12) * Math.min(1, (-2 - sun.alt) / 6);
    if (strength > 0.01) {
      L.shafts.push({ az: moon.az, alt: Math.max(moon.alt, 2), colour: [178, 196, 236], strength, kind: 'moon' });
    }
  }
  return L;
}

/* ------------------------------------------------------------------ *
 * Drawing
 * ------------------------------------------------------------------ */
const BIG = 20000;

// Fill rectangles blurred by `blur` device px using the shadow-offset trick:
// the shapes are drawn far off the canvas and only their shadows land. Works
// in every browser and under any transform, since the offset is solved in
// device space.
function softRects(
  c: CanvasRenderingContext2D,
  rects: [number, number, number, number][],
  colour: string,
  blur: number,
  t: [number, number, number, number, number, number]
) {
  c.save();
  const [a, b, cc, d, e, f] = t;
  c.setTransform(a, b, cc, d, e, f);
  const det = a * d - b * cc;
  const lx = (d * -BIG) / det;
  const ly = (b * BIG) / det;
  c.shadowColor = colour;
  c.shadowBlur = blur;
  c.shadowOffsetX = BIG;
  c.shadowOffsetY = 0;
  c.fillStyle = '#000';
  c.beginPath();
  for (const [x, y, w, h] of rects) c.rect(x + lx, y + ly, w, h);
  c.fill();
  c.restore();
}

const parseHex = (v: string, fallback: RGB): RGB => {
  const m = /^#?([0-9a-f]{6})$/i.exec(v.trim());
  if (!m) return fallback;
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

/* ------------------------------------------------------------------ *
 * What stands on the desk. A box is in CSS px from the canvas's top left,
 * at its own UNTURNED size; `rot` turns it about its centre, in degrees
 * (clockwise, as CSS rotate does).
 * ------------------------------------------------------------------ */
export type Box = { x: number; y: number; w: number; h: number; rot?: number };
/** The box-shadows one object carries for a light: lying, and lifted. */
export type Cast = { rest: string; lift: string };

// A box-shadow is drawn in its element's own frame and turns with it, so
// an offset meant for the SCREEN is counter-turned for a turned print.
const BASE_SHADOW = '0 1px 2px rgb(0 0 0 / 0.5)';
const layer = (ox: number, oy: number, blur: number, alpha: number, rot = 0) => {
  if (rot) {
    const c = Math.cos(rot * RAD);
    const s = Math.sin(rot * RAD);
    [ox, oy] = [ox * c + oy * s, -ox * s + oy * c];
  }
  return `, ${ox.toFixed(1)}px ${oy.toFixed(1)}px ${blur.toFixed(1)}px rgb(0 0 0 / ${alpha.toFixed(2)})`;
};
// How much further a lifted print throws its shadow than one lying flat.
const LIFT = 2.4;

/**
 * The room itself. `A` is what the light is laid out around - the window's
 * beam is sized and placed from it - and `casts` are the objects standing
 * in that light, each cutting its own shadow from the beam.
 */
function render(
  canvas: HTMLCanvasElement,
  A: Box,
  casts: Box[],
  tint: string,
  L: Light,
  work?: HTMLCanvasElement,
  wide = false
): Cast[] | null {
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  // The light is soft: a modest pixel density is indistinguishable and
  // keeps the two canvases small on a phone.
  const dpr = Math.min(1.25, window.devicePixelRatio || 1);
  const W = canvas.clientWidth;
  const H = canvas.clientHeight;
  if (!W || !H) return null;
  const cw = Math.round(W * dpr);
  const ch = Math.round(H * dpr);
  const w2 = work ?? document.createElement('canvas');
  for (const cv of [canvas, w2]) {
    if (cv.width !== cw || cv.height !== ch) {
      cv.width = cw;
      cv.height = ch;
    }
  }
  const wctx = w2.getContext('2d');
  if (!wctx) return null;

  const P = A;
  const pc = { x: P.x + P.w / 2, y: P.y + P.h / 2 };
  const desk = parseHex(tint, [245, 243, 237]).map((v) => (v / 255) * 0.86) as RGB;
  const out: Cast[] = casts.map(() => ({ rest: BASE_SHADOW, lift: BASE_SHADOW }));

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 1;
  ctx.clearRect(0, 0, cw, ch);

  // Light in the room at large, strongest around the print.
  if (L.ambientLift > 0) {
    const rg = ctx.createRadialGradient(pc.x * dpr, pc.y * dpr, 0, pc.x * dpr, pc.y * dpr, Math.max(W, H) * 0.85 * dpr);
    rg.addColorStop(0, `rgba(${L.ambient.join(',')},${(L.ambientLift * 0.16).toFixed(3)})`);
    rg.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = rg;
    ctx.fillRect(0, 0, cw, ch);
  }

  // The lamp: a warm pool from off the upper left.
  if (L.lamp > 0) {
    const lx = -0.04 * W;
    const ly = -0.12 * H;
    const lamp = [255, 172, 96].map((v, k) => Math.round(v * desk[k]));
    const rg = ctx.createRadialGradient(lx * dpr, ly * dpr, 0, lx * dpr, ly * dpr, Math.hypot(W, H) * 0.75 * dpr);
    rg.addColorStop(0, `rgba(${lamp.join(',')},${(LAMP_ALPHA * L.lamp).toFixed(3)})`);
    rg.addColorStop(0.45, `rgba(${lamp.join(',')},${(0.12 * L.lamp).toFixed(3)})`);
    rg.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = rg;
    ctx.fillRect(0, 0, cw, ch);
    casts.forEach((b, i) => {
      const dx = b.x + b.w / 2 - lx;
      const dy = b.y + b.h / 2 - ly;
      const dl = Math.hypot(dx, dy) || 1;
      const len = b.h * 0.045 * L.lamp;
      const a = 0.55 * L.lamp;
      out[i].rest += layer((dx / dl) * len, (dy / dl) * len, len * 1.6 + 6, a, b.rot);
      out[i].lift += layer((dx / dl) * len * LIFT, (dy / dl) * len * LIFT, len * 3.4 + 10, a * 0.85);
    });
  }

  // The shafts: a window's light laid on the desk.
  for (const s of L.shafts) {
    // Screen up is north; light travels toward the anti-solar bearing.
    const th = (s.az + 180) * RAD;
    const u = { x: Math.sin(th), y: -Math.cos(th) };
    const tanAlt = Math.tan(s.alt * RAD);
    const len = P.h * Math.min(6, Math.max(1.3, 1.15 / tanAlt)); // along the light
    const wid = Math.max(P.w * 1.9, H * 0.5); // across it
    const start = { x: pc.x - u.x * P.h * 0.9, y: pc.y - u.y * P.h * 0.9 }; // the window end
    const blur = (0.012 * H + 0.03 * len) * dpr;

    wctx.setTransform(1, 0, 0, 1, 0, 0);
    wctx.globalCompositeOperation = 'source-over';
    wctx.clearRect(0, 0, cw, ch);
    // Local frame: x along the light, y across it, origin at the window end.
    const ang = Math.atan2(u.y, u.x);
    const ca = Math.cos(ang);
    const sa = Math.sin(ang);
    const T: [number, number, number, number, number, number] = [dpr * ca, dpr * sa, -dpr * sa, dpr * ca, start.x * dpr, start.y * dpr];
    // Two lights across, three down: the window's panes, stretched by a low sun.
    const m = wid * 0.035;
    const mr = len * 0.035;
    const cols = 2;
    const rows = 3;
    const pw = (wid - m * (cols - 1)) / cols;
    const ph = (len - mr * (rows - 1)) / rows;
    const panes: [number, number, number, number][] = [];
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) panes.push([r * (ph + mr), -wid / 2 + c * (pw + m), ph, pw]);
    const col = s.colour.map((v, k) => Math.round(v * desk[k]));
    softRects(wctx, panes, `rgb(${col.join(',')})`, blur, T);

    // Brightest by the window, falling off along the beam.
    wctx.setTransform(1, 0, 0, 1, 0, 0);
    wctx.globalCompositeOperation = 'destination-in';
    const fall = wctx.createLinearGradient(start.x * dpr, start.y * dpr, (start.x + u.x * len) * dpr, (start.y + u.y * len) * dpr);
    fall.addColorStop(0, 'rgba(0,0,0,1)');
    fall.addColorStop(1, 'rgba(0,0,0,0.42)');
    wctx.fillStyle = fall;
    wctx.fillRect(0, 0, cw, ch);

    // Each object stands in the beam: its shadow is light that never arrives.
    const throws = s.kind === 'sun' || L.shafts.length === 1;
    wctx.globalCompositeOperation = 'destination-out';
    casts.forEach((b, i) => {
      const lift = b.h * 0.035;
      const sl = Math.min(b.h * 0.28, lift / tanAlt);
      const soft = (4 + sl * 0.5) * dpr;
      if (b.rot) {
        const c = Math.cos(b.rot * RAD) * dpr;
        const sn = Math.sin(b.rot * RAD) * dpr;
        const cx = (b.x + b.w / 2 + u.x * sl) * dpr;
        const cy = (b.y + b.h / 2 + u.y * sl) * dpr;
        softRects(wctx, [[-b.w / 2, -b.h / 2, b.w, b.h]], 'rgba(0,0,0,0.92)', soft, [c, sn, -sn, c, cx, cy]);
      } else {
        softRects(wctx, [[b.x + u.x * sl, b.y + u.y * sl, b.w, b.h]], 'rgba(0,0,0,0.92)', soft, [dpr, 0, 0, dpr, 0, 0]);
      }
      if (throws) {
        const a = Math.min(0.6, 0.25 + s.strength * 1.1);
        out[i].rest += layer(u.x * sl, u.y * sl, 5 + sl * 0.6, a, b.rot);
        out[i].lift += layer(u.x * sl * LIFT, u.y * sl * LIFT, 9 + sl * 1.3, a * 0.85);
      }
    });
    wctx.globalCompositeOperation = 'source-over';

    ctx.globalAlpha = Math.min(1, s.strength);
    ctx.drawImage(w2, 0, 0);
    ctx.globalAlpha = 1;
  }

  // Feather the light to nothing at the canvas's left and right edges, so it
  // meets the flat ground of the band's outset without a seam.
  ctx.globalCompositeOperation = 'destination-in';
  const fe = ctx.createLinearGradient(0, 0, cw, 0);
  if (wide) {
    // A desk of prints reaches nearly to the band's edge, so its light is
    // let go over a longer run and eased at both ends: a straight ramp
    // this close to a print reads as a stripe.
    const edge = Math.min(0.2, 240 / W);
    const ease = [0, 0.1, 0.35, 0.65, 0.9, 1];
    ease.forEach((a, k) => {
      const t = (k / (ease.length - 1)) * edge;
      fe.addColorStop(t, `rgba(0,0,0,${a})`);
      fe.addColorStop(1 - t, `rgba(0,0,0,${a})`);
    });
  } else {
    const edge = Math.min(0.08, 96 / W);
    fe.addColorStop(0, 'rgba(0,0,0,0)');
    fe.addColorStop(edge, 'rgba(0,0,0,1)');
    fe.addColorStop(1 - edge, 'rgba(0,0,0,1)');
    fe.addColorStop(1, 'rgba(0,0,0,0)');
  }
  ctx.fillStyle = fe;
  ctx.fillRect(0, 0, cw, ch);
  ctx.globalCompositeOperation = 'source-over';

  return out;
}

/**
 * Draw the room's light for a moment, round ONE print (a collection's
 * frontispiece, an item's plate).
 * @param canvas  the transparent canvas behind the band's content
 * @param print   the frontispiece <img>; its shadow is cut from the beam
 * @param tint    the desk colour where light falls ('#rrggbb'; the mount tint)
 * @returns the box-shadow the print should carry for this light
 */
export function drawRoom(canvas: HTMLCanvasElement, print: HTMLElement, tint: string, L: Light, work?: HTMLCanvasElement): string {
  const cr = canvas.getBoundingClientRect();
  const pr = print.getBoundingClientRect();
  const P: Box = { x: pr.left - cr.left, y: pr.top - cr.top, w: pr.width, h: pr.height };
  return render(canvas, P, [P], tint, L, work)?.[0].rest ?? '';
}

/**
 * Draw the room's light over a DESK OF SEVERAL PRINTS (the guide's table).
 * The beam is laid out round `area` - the table as a whole - and every box
 * in `prints` cuts its own shadow from it, turned as the print is turned.
 * The caller measures: a print in the middle of a transition or an
 * animation must be given where it RESTS, which only the page knows.
 * @returns one pair of box-shadows per print, in order; [] if nothing drew
 */
export function drawDesk(
  canvas: HTMLCanvasElement,
  area: Box,
  prints: Box[],
  tint: string,
  L: Light,
  work?: HTMLCanvasElement
): Cast[] {
  return render(canvas, area, prints, tint, L, work, true) ?? [];
}
