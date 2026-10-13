// src/lib/ground.ts
//
// The ground beneath the publications table: a shaded relief of the Llano
// Estacado and its edges, lit by the sun - or the moon - where it actually
// stands over Lubbock right now.
//
// Three parts:
//   1. Where the sun and moon are (after V. Agafonkin's SunCalc, BSD).
//   2. The view: which piece of land fills the table, and where any
//      latitude/longitude falls on it (the cards' flags use the same view).
//   3. The renderer: reads the elevation model, shades it for the light,
//      casts shadows (the Caprock throws a long one at dusk), and letters a
//      few names on it. One canvas, redrawn a few times an hour.
//
// The elevations are USGS 3DEP data (see DEM below), shaded by
// ground-shade.ts in a Web Worker (ground-worker.ts) so the page never
// stalls while the land is drawn.
import { localRelief, shade, type ShadeJob } from './ground-shade';

/* ================= 1. Sun and moon ================= */

const RAD = Math.PI / 180;
const DAY_MS = 86400000;
const J1970 = 2440588;
const J2000 = 2451545;
const OBLIQUITY = RAD * 23.4397;

const toDays = (d: Date) => d.valueOf() / DAY_MS - 0.5 + J1970 - J2000;
const rightAscension = (l: number, b: number) =>
  Math.atan2(Math.sin(l) * Math.cos(OBLIQUITY) - Math.tan(b) * Math.sin(OBLIQUITY), Math.cos(l));
const declination = (l: number, b: number) =>
  Math.asin(Math.sin(b) * Math.cos(OBLIQUITY) + Math.cos(b) * Math.sin(OBLIQUITY) * Math.sin(l));
const siderealTime = (d: number, lw: number) => RAD * (280.16 + 360.9856235 * d) - lw;

const sunCoords = (d: number) => {
  const M = RAD * (357.5291 + 0.98560028 * d);
  const C = RAD * (1.9148 * Math.sin(M) + 0.02 * Math.sin(2 * M) + 0.0003 * Math.sin(3 * M));
  const L = M + C + RAD * 102.9372 + Math.PI;
  return { dec: declination(L, 0), ra: rightAscension(L, 0) };
};
const moonCoords = (d: number) => {
  const L = RAD * (218.316 + 13.176396 * d);
  const M = RAD * (134.963 + 13.064993 * d);
  const F = RAD * (93.272 + 13.22935 * d);
  const l = L + RAD * 6.289 * Math.sin(M);
  const b = RAD * 5.128 * Math.sin(F);
  return { ra: rightAscension(l, b), dec: declination(l, b), dist: 385001 - 20905 * Math.cos(M) };
};

/** A body in the sky: compass bearing (radians, from north, clockwise) and altitude. */
export type SkyPos = { bearing: number; altitude: number };
const place = (date: Date, lat: number, lon: number, c: { ra: number; dec: number }): SkyPos => {
  const lw = RAD * -lon;
  const phi = RAD * lat;
  const H = siderealTime(toDays(date), lw) - c.ra;
  const az = Math.atan2(Math.sin(H), Math.cos(H) * Math.sin(phi) - Math.tan(c.dec) * Math.cos(phi));
  const alt = Math.asin(Math.sin(phi) * Math.sin(c.dec) + Math.cos(phi) * Math.cos(c.dec) * Math.cos(H));
  return { bearing: az + Math.PI, altitude: alt };
};
export const sunAt = (date: Date, lat: number, lon: number) => place(date, lat, lon, sunCoords(toDays(date)));
export const moonAt = (date: Date, lat: number, lon: number) => place(date, lat, lon, moonCoords(toDays(date)));
/** Lit fraction of the moon's disc, 0 (new) to 1 (full). */
export const moonFraction = (date: Date) => {
  const d = toDays(date);
  const s = sunCoords(d);
  const m = moonCoords(d);
  const sdist = 149598000;
  const phi = Math.acos(Math.sin(s.dec) * Math.sin(m.dec) + Math.cos(s.dec) * Math.cos(m.dec) * Math.cos(s.ra - m.ra));
  const inc = Math.atan2(sdist * Math.sin(phi), m.dist - sdist * Math.cos(phi));
  return (1 + Math.cos(inc)) / 2;
};

/* ================= the light on the land ================= */

type RGB = [number, number, number];
export type Light = {
  /** What is doing the lighting, for the page's own use (shadows, ink colour). */
  phase: 'day' | 'twilight' | 'night';
  /** Toward the light: compass bearing and altitude (radians). */
  bearing: number;
  altitude: number;
  /** Direct light: colour and strength; 0 when the source is below the horizon. */
  direct: RGB;
  directI: number;
  /** Light from the whole sky. */
  ambient: RGB;
  ambientI: number;
  /** How much the relief shows through the page colour (0 none, 1 full). */
  strength: number;
  /** The colour the land is laid over: the page by day, the dark by night. */
  under: RGB;
  /** How strongly the Llano is tinted as a tableland. */
  tint: number;
};

const LUBBOCK = { lat: 33.58, lon: -101.85 };
const mixc = (a: RGB, b: RGB, t: number): RGB => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const PAPER: RGB = [241 / 255, 236 / 255, 225 / 255];
const NIGHT: RGB = [0.115, 0.125, 0.155];

export function lightAt(date: Date): Light {
  const sun = sunAt(date, LUBBOCK.lat, LUBBOCK.lon);
  const alt = sun.altitude / RAD;
  if (alt > 0) {
    // day: warm and low at the ends of the day, nearly white at noon
    const warm = clamp01(1 - alt / 22);
    // the last degrees before sunset: the sky, not the sun, lights the land
    const low = clamp01(1 - alt / 8);
    return {
      phase: 'day',
      bearing: sun.bearing,
      altitude: sun.altitude,
      direct: mixc([1, 0.97, 0.92], [1, 0.74, 0.5], warm),
      directI: (0.78 + 0.1 * (1 - warm)) * (1 - 0.45 * low),
      ambient: mixc([0.66, 0.72, 0.82], [0.72, 0.62, 0.62], warm),
      ambientI: 0.34 + 0.4 * low,
      strength: 0.6 + 0.18 * warm,
      tint: 1,
      under: mixc(PAPER, [0.95, 0.86, 0.76], warm * 0.6),
    };
  }
  const moon = moonAt(date, LUBBOCK.lat, LUBBOCK.lon);
  const frac = moonFraction(date);
  const moonUp = moon.altitude > 0;
  // twilight: the sun just under the horizon; the land fades from dusk to night
  const dusk = clamp01((alt + 12) / 12); // 1 at sunset, 0 at nautical dusk
  const moonI = moonUp ? 0.46 * frac * clamp01(moon.altitude / (8 * RAD)) : 0;
  const night: Light = {
    phase: dusk > 0 ? 'twilight' : 'night',
    bearing: moonUp ? moon.bearing : sun.bearing,
    altitude: moonUp ? moon.altitude : 0.3,
    direct: [0.66, 0.74, 0.9],
    directI: moonI,
    ambient: [0.28, 0.34, 0.5],
    ambientI: 0.1 + 0.03 * frac,
    strength: 1,
    tint: 0.45,
    under: NIGHT,
  };
  if (dusk <= 0) return night;
  return {
    ...night,
    ambient: mixc(night.ambient, [0.72, 0.6, 0.66], dusk),
    ambientI: night.ambientI + 0.55 * dusk,
    strength: 1 - 0.3 * dusk,
    tint: 0.45 + 0.4 * dusk,
    under: mixc(NIGHT, [0.8, 0.72, 0.7], dusk),
  };
}

/* ================= 2. The view ================= */

/** The elevation grid: USGS 3DEP, exported for the heart of the Llano -
    Yellow House and Blanco canyons and the Caprock east of Lubbock, west
    across the plain to just past the New Mexico line, Tahoka Lake to
    Muleshoe - and resampled to a regular grid of 3466 x 2000 cells (about
    84 m east-west, 83 m north-south). Elevations in quarter-metres, 16 bits:
    red = high byte, green = low byte. Blue holds two things: 0-200 is how
    much depth to draw (full on the Llano, falling away across the breaks
    below the Caprock); 200-255 is the tableland itself - traced from the
    elevations, so it follows the real rim and the canyons are cut out of
    it. Built by scripts/build_dem.py, which prints the frame below. The
    bounds are the CENTRES of the edge cells. */
const FRAME = { lon0: -103.66328, lon1: -100.53672, lat0: 33.0, lat1: 34.5, w: 3466, h: 2000 };
const CELL_LON = (FRAME.lon1 - FRAME.lon0) / FRAME.w;
const CELL_LAT = (FRAME.lat1 - FRAME.lat0) / FRAME.h;
export const DEM = {
  // The ?v= names this version of the file: a browser holding an older copy
  // in its cache fetches this one fresh instead.
  url: '/ground/llano-dem.webp?v=heart-3466',
  w: FRAME.w,
  h: FRAME.h,
  lon0: FRAME.lon0 + CELL_LON / 2,
  lon1: FRAME.lon1 - CELL_LON / 2,
  lat0: FRAME.lat0 + CELL_LAT / 2,
  lat1: FRAME.lat1 - CELL_LAT / 2,
};
/** Grid density relative to the 0.00667-degree grid the shading was tuned on. */
export const GRID_SCALE = (11.2 / 1680) / CELL_LON;

export type View = {
  W: number;
  H: number;
  lonL: number;
  lonR: number;
  latT: number;
  latB: number;
  /** Where a latitude/longitude falls on the table, px. */
  toXY: (lat: number, lon: number) => { x: number; y: number };
};

/** The land that fills a W x H table: as much of the frame as the table's
    shape allows, centred on it. `margin` is the share of the frame kept in
    reserve each way, because the drawing reaches past the felt to the
    table's edges. */
export function makeView(W: number, H: number, margin = 0.05): View {
  const cosLat = Math.cos(((DEM.lat0 + DEM.lat1) / 2) * RAD);
  const maxLon = (DEM.lon1 - DEM.lon0) * (1 - 2 * margin);
  const maxLat = (DEM.lat1 - DEM.lat0) * (1 - 2 * margin);
  let lonSpan = maxLon;
  let latSpan = (lonSpan * cosLat * H) / W;
  if (latSpan > maxLat) {
    latSpan = maxLat;
    lonSpan = (latSpan * W) / (H * cosLat);
  }
  const lonL = (DEM.lon0 + DEM.lon1) / 2 - lonSpan / 2;
  const latT = (DEM.lat0 + DEM.lat1) / 2 + latSpan / 2;
  return {
    W,
    H,
    lonL,
    lonR: lonL + lonSpan,
    latT,
    latB: latT - latSpan,
    toXY: (lat, lon) => ({ x: ((lon - lonL) / lonSpan) * W, y: ((latT - lat) / latSpan) * H }),
  };
}

/* ================= 3. The renderer ================= */

/** The only lettering on the land: its name, set across the plain. */
const NAME = { text: 'LLANO ESTACADO', lat: 33.9, lon: -102.55, size: 34, rot: -4, spacing: 0.5 };

export class Ground {
  private elev: Float32Array | null = null;
  private focus: Uint8Array | null = null;
  private relief: Float32Array | null = null;
  private canvas: HTMLCanvasElement;
  private worker: Worker | null = null;
  private jobId = 0;
  private waiting = new Map<number, (px: Uint8ClampedArray) => void>();
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  async load(url = DEM.url) {
    const img = new Image();
    img.decoding = 'async';
    img.src = url;
    await img.decode();
    // The grid size is fixed in DEM above. A file of any other size (an
    // older copy left in public/ground, or one built for a different grid)
    // would be read as the wrong place entirely, so it is refused outright.
    if (img.naturalWidth !== DEM.w || img.naturalHeight !== DEM.h) {
      console.warn(`[ground] ${url} is ${img.naturalWidth} x ${img.naturalHeight}; expected ${DEM.w} x ${DEM.h}. The land is not drawn.`);
      throw new Error('elevation file has the wrong size');
    }
    const c = document.createElement('canvas');
    c.width = DEM.w;
    c.height = DEM.h;
    const g = c.getContext('2d', { willReadFrequently: true })!;
    g.drawImage(img, 0, 0);
    const px = g.getImageData(0, 0, DEM.w, DEM.h).data;
    const e = new Float32Array(DEM.w * DEM.h);
    const f = new Uint8Array(DEM.w * DEM.h);
    for (let i = 0, j = 0; i < e.length; i++, j += 4) {
      e[i] = ((px[j] << 8) | px[j + 1]) / 4;
      f[i] = px[j + 2];
    }
    this.elev = e;
    this.focus = f;
    // Shade in a worker where the browser allows; otherwise on the page.
    try {
      const w = new Worker(new URL('./ground-worker.ts', import.meta.url), { type: 'module' });
      w.onmessage = (ev: MessageEvent) => {
        const done = this.waiting.get(ev.data.id);
        this.waiting.delete(ev.data.id);
        done?.(ev.data.pixels);
      };
      w.onerror = () => { this.worker = null; };
      const copy = e.slice();
      const fcopy = f.slice();
      w.postMessage({ type: 'elev', buffer: copy.buffer, focus: fcopy.buffer, w: DEM.w, h: DEM.h, r: Math.round(9 * GRID_SCALE) }, [copy.buffer, fcopy.buffer]);
      this.worker = w;
    } catch {
      this.worker = null;
    }
  }

  get ready() {
    return !!this.elev;
  }

  private shadeJob(job: ShadeJob): Promise<Uint8ClampedArray> {
    if (this.worker) {
      return new Promise((resolve) => {
        this.waiting.set(job.id, resolve);
        this.worker!.postMessage({ type: 'job', job });
      });
    }
    this.relief ??= localRelief(this.elev!, DEM.w, DEM.h, Math.round(9 * GRID_SCALE));
    return Promise.resolve(shade(job, this.elev!, this.focus!, this.relief));
  }

  /** Draw the land for this view and light, CSS size W x H. Resolves once
      drawn; a newer call supersedes one still being shaded. */
  async render(view: View, light: Light) {
    if (!this.elev) return;
    const id = ++this.jobId;
    const gx0 = Math.max(1, Math.floor(((view.lonL - DEM.lon0) / (DEM.lon1 - DEM.lon0)) * (DEM.w - 1)));
    const gx1 = Math.min(DEM.w - 2, Math.ceil(((view.lonR - DEM.lon0) / (DEM.lon1 - DEM.lon0)) * (DEM.w - 1)));
    const gy0 = Math.max(1, Math.floor(((DEM.lat1 - view.latT) / (DEM.lat1 - DEM.lat0)) * (DEM.h - 1)));
    const gy1 = Math.min(DEM.h - 2, Math.ceil(((DEM.lat1 - view.latB) / (DEM.lat1 - DEM.lat0)) * (DEM.h - 1)));
    const latMid = (view.latT + view.latB) / 2;
    const job: ShadeJob = {
      id,
      gw: DEM.w,
      gh: DEM.h,
      gx0, gx1, gy0, gy1,
      cellX: 111320 * Math.cos(latMid * RAD) * ((DEM.lon1 - DEM.lon0) / (DEM.w - 1)),
      cellY: 111320 * ((DEM.lat1 - DEM.lat0) / (DEM.h - 1)),
      bearing: light.bearing,
      altitude: light.altitude,
      direct: light.direct,
      directI: light.directI,
      ambient: light.ambient,
      ambientI: light.ambientI,
      strength: light.strength,
      under: light.under,
      tint: light.tint,
      phase: light.phase,
      lon0: DEM.lon0,
      dLon: (DEM.lon1 - DEM.lon0) / (DEM.w - 1),
      kk: GRID_SCALE,
    };
    const pixels = await this.shadeJob(job);
    if (id !== this.jobId) return; // a newer render has been asked for

    const ww = gx1 - gx0 + 1;
    const wh = gy1 - gy0 + 1;
    const tmp = document.createElement('canvas');
    tmp.width = ww;
    tmp.height = wh;
    tmp.getContext('2d')!.putImageData(new ImageData(new Uint8ClampedArray(pixels), ww, wh), 0, 0);

    const { W, H } = view;
    // full density on high-resolution screens, so the relief stays crisp
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw = Math.round(W * dpr);
    const ch = Math.round(H * dpr);
    if (this.canvas.width !== cw || this.canvas.height !== ch) {
      this.canvas.width = cw;
      this.canvas.height = ch;
    }
    const ctx = this.canvas.getContext('2d')!;
    const lonPer = (DEM.lon1 - DEM.lon0) / (DEM.w - 1);
    const latPer = (DEM.lat1 - DEM.lat0) / (DEM.h - 1);
    // each cell is drawn centred on its own point
    const a = view.toXY(DEM.lat1 - (gy0 - 0.5) * latPer, DEM.lon0 + (gx0 - 0.5) * lonPer);
    const b = view.toXY(DEM.lat1 - (gy1 + 0.5) * latPer, DEM.lon0 + (gx1 + 0.5) * lonPer);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = `rgb(${light.under.map((c) => Math.round(c * 255)).join(' ')})`;
    ctx.fillRect(0, 0, W, H);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(tmp, a.x, a.y, b.x - a.x, b.y - a.y);
    this.letter(ctx, view, light);
  }

  /** The land's name, in ink by day and pale when the light is low. */
  private letter(ctx: CanvasRenderingContext2D, view: View, light: Light) {
    // dark ink on the sunlit plain; pale ink once the plain goes dark
    const pale = light.phase !== 'day' || light.altitude < 12 * RAD;
    const ink = pale ? 'rgba(250, 242, 228, 0.42)' : 'rgba(62, 48, 34, 0.32)';
    const serif = getComputedStyle(this.canvas).fontFamily || 'Georgia, serif';
    const p = view.toXY(NAME.lat, NAME.lon);
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(NAME.rot * RAD);
    ctx.font = `${NAME.size}px ${serif}`;
    ctx.fillStyle = ink;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // letterspacing by hand: canvas letterSpacing is not everywhere yet
    const gap = NAME.size * NAME.spacing;
    const chars = [...NAME.text];
    const widths = chars.map((ch) => ctx.measureText(ch).width);
    let cx = -(widths.reduce((sum, w) => sum + w, 0) + gap * (chars.length - 1)) / 2;
    chars.forEach((ch, k) => {
      ctx.fillText(ch, cx + widths[k] / 2, 0);
      cx += widths[k] + gap;
    });
    ctx.restore();
  }
}
