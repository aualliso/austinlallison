// src/lib/ground-shade.ts
//
// The arithmetic that turns elevations into a lit picture of the land.
// Pure: no DOM, so it runs in a Web Worker (ground-worker.ts) and, where a
// browser has no module workers, on the page itself.

export type ShadeJob = {
  id: number;
  /** The elevation grid's size. */
  gw: number;
  gh: number;
  /** The window of the grid to shade, inclusive. */
  gx0: number;
  gx1: number;
  gy0: number;
  gy1: number;
  /** Ground distance between grid points, metres. */
  cellX: number;
  cellY: number;
  /** Toward the light: compass bearing and altitude, radians. */
  bearing: number;
  altitude: number;
  direct: [number, number, number];
  directI: number;
  ambient: [number, number, number];
  ambientI: number;
  strength: number;
  under: [number, number, number];
  /** How strongly the Llano is tinted as a tableland, 0-1, whatever the light. */
  tint: number;
  phase: 'day' | 'twilight' | 'night';
  /** Longitude of grid column 0 and degrees per column: lets the shader
      quiet the far west (the Pecos and the New Mexico mountains). */
  lon0: number;
  dLon: number;
  /** Grid density relative to the 0.00667-degree grid the shading was tuned on. */
  kk: number;
};

/** How much taller than life the relief is drawn - the Llano is very
    flat - for the shading, and (less) for the shadows. */
const VE = 3.6;
const VE_SHADOW = 2.2;
const MAX_STEPS = 140;

/**
 * Local relief: each cell's height above (or below) the average of the
 * ground around it, about 6 km each way. Positive on rims and spurs,
 * strongly negative in canyons and below the escarpment. Worked out once
 * when the elevations arrive; it is what gives the canyons their depth.
 */
export function localRelief(e: Float32Array, gw: number, gh: number, r = 9): Float32Array {
  const tmp = new Float32Array(e.length);
  const out = new Float32Array(e.length);
  // separable box blur, rows then columns, with running sums
  for (let y = 0; y < gh; y++) {
    let sum = 0;
    const row = y * gw;
    for (let x = -r; x <= r; x++) sum += e[row + Math.min(gw - 1, Math.max(0, x))];
    for (let x = 0; x < gw; x++) {
      tmp[row + x] = sum / (2 * r + 1);
      sum += e[row + Math.min(gw - 1, x + r + 1)] - e[row + Math.max(0, x - r)];
    }
  }
  for (let x = 0; x < gw; x++) {
    let sum = 0;
    for (let y = -r; y <= r; y++) sum += tmp[Math.min(gh - 1, Math.max(0, y)) * gw + x];
    for (let y = 0; y < gh; y++) {
      out[y * gw + x] = e[y * gw + x] - sum / (2 * r + 1);
      sum += tmp[Math.min(gh - 1, y + r + 1) * gw + x] - tmp[Math.max(0, y - r) * gw + x];
    }
  }
  return out;
}

/** A fixed light from the north-west, as on a printed relief map. Mixed in
    with the real sun so the land keeps its modelling at every hour. */
const CARTO = (() => {
  const b = (315 * Math.PI) / 180;
  const a = (40 * Math.PI) / 180;
  return { x: Math.sin(b) * Math.cos(a), y: Math.cos(b) * Math.cos(a), z: Math.sin(a) };
})();

/**
 * `focus` (0-255 per cell) marks the Llano Estacado and the Caprock breaks
 * around it. The relief is drawn in full there and fades to a whisper
 * beyond - the Pecos country, the New Mexico mountains, the Rolling Plains -
 * so the Staked Plains stand out as the subject of the table.
 */
export function shade(job: ShadeJob, e: Float32Array, focus: Uint8Array, lr: Float32Array): Uint8ClampedArray {
  const { gw, gx0, gx1, gy0, gy1, cellX, cellY } = job;
  const ww = gx1 - gx0 + 1;
  const wh = gy1 - gy0 + 1;
  const o = new Uint8ClampedArray(ww * wh * 4);
  // grid density relative to the 0.00667-degree grid the constants were tuned on
  const kk = job.kk;
  // shadow rays step a couple of cells at a time, fine enough for canyon walls
  const stride = Math.max(1, kk / 3);

  // the highest ground in reach: a shadow ray that climbs past it is free
  let maxE = 0;
  const pad = Math.round(160 * kk);
  for (let y = Math.max(1, gy0 - pad); y <= Math.min(job.gh - 2, gy1 + pad); y += 2) {
    for (let x = Math.max(1, gx0 - pad); x <= Math.min(gw - 2, gx1 + pad); x += 2) {
      const v = e[y * gw + x];
      if (v > maxE) maxE = v;
    }
  }

  const sb = Math.sin(job.bearing);
  const cb = Math.cos(job.bearing);
  const ca = Math.cos(job.altitude);
  const lx = sb * ca;
  const ly = cb * ca;
  const lz = Math.sin(job.altitude);
  // a level field's lighting: relief is shaded relative to it, so it still
  // reads at noon when the light is overhead
  const flat = Math.max(lz, 0.1);
  const noonGain = Math.max(0, lz - 0.35) * 1.6;
  // with the sun right on the horizon nearly everything is in some shadow;
  // keep those shadows soft so the plain does not go muddy at sunset
  const shadowK = 0.2 + 0.4 * Math.min(1, Math.max(0, 1 - (job.altitude * 180) / Math.PI / 3));
  const lit = job.directI > 0.001;
  const stepLen = Math.hypot(sb * cellX, cb * cellY);
  const rise = (Math.tan(Math.max(job.altitude, 0.6 * Math.PI / 180)) * stepLen * Math.max(1, kk / 3)) / VE_SHADOW;

  const amb0 = job.ambient[0] * job.ambientI;
  const amb1 = job.ambient[1] * job.ambientI;
  const amb2 = job.ambient[2] * job.ambientI;
  const dir0 = job.direct[0] * job.directI;
  const dir1 = job.direct[1] * job.directI;
  const dir2 = job.direct[2] * job.directI;
  const st = job.strength;
  const [u0, u1, u2] = job.under;
  // how much of the map-maker's light to mix in: more by day, a little at night
  const cartoW = job.phase === 'night' ? 0.32 : 0.58;
  // The tableland stands up off the plains: it throws a shadow onto the
  // country below its rim, away from the light (from the north-west when the
  // light is overhead or absent), a few cells long - longer when the light
  // is low.
  const lowSun = job.directI > 0.02 ? Math.min(1, Math.max(0, 1 - lz / 0.8)) : 0;
  const useSun = job.directI > 0.02 && lz < 0.75;
  const tb = useSun ? job.bearing : (315 * Math.PI) / 180;
  const tdx = Math.sin(tb);
  const tdy = -Math.cos(tb);
  const tableReach = (3 + 7 * lowSun) * kk;
  const tableAt = (xx: number, yy: number) => {
    const ix = Math.round(xx);
    const iy = Math.round(yy);
    if (ix < 0 || iy < 0 || ix >= gw || iy >= job.gh) return 0;
    return Math.max(0, (focus[iy * gw + ix] - 200) / 55);
  };

  // Cast shadows are soft at this scale, so they are worked out on every
  // other cell and shared - a quarter of the work for the costliest part.
  const sw = (ww + 1) >> 1;
  const sh = (wh + 1) >> 1;
  const shadowed = new Uint8Array(sw * sh);
  if (lit) {
    for (let cy = 0; cy < sh; cy++) {
      for (let cx = 0; cx < sw; cx++) {
        const x0 = gx0 + cx * 2;
        const y0 = gy0 + cy * 2;
        let sx = x0;
        let sy = y0;
        let rayH = e[y0 * gw + x0];
        for (let k = 0; k < MAX_STEPS * 3; k++) {
          sx += sb * stride;
          sy -= cb * stride;
          rayH += rise;
          if (rayH > maxE) break;
          const ix = sx | 0;
          const iy = sy | 0;
          if (ix < 1 || iy < 1 || ix >= gw - 1 || iy >= job.gh - 1) break;
          if (e[iy * gw + ix] > rayH + 3) {
            shadowed[cy * sw + cx] = 1;
            break;
          }
        }
      }
    }
  }

  for (let y = gy0; y <= gy1; y++) {
    for (let x = gx0; x <= gx1; x++) {
      const i = y * gw + x;
      const h0 = e[i];
      // f: 1 on the Llano, falling away across the breaks and canyon lands
      // below the Caprock (depth is drawn over all of that); tf: the Llano
      // proper, which alone carries the tableland tint.
      // (blue channel: 0-200 = depth, 200-255 = how surely this is the tableland)
      const fb = focus[i];
      const f = Math.min(1, fb / 200);
      const tf = Math.max(0, (fb - 200) / 55);
      // The country around the Llano is drawn in full, a step quieter: softer
      // contrast and muted colour. The mountains and the far west are quieter
      // still, so they never pull the eye from the Staked Plains.
      const lon = job.lon0 + x * job.dLon;
      const westQ = 1 - Math.min(1, Math.max(0, (lon + 105.1) / 0.8));
      const mtnQ = Math.min(1, Math.max(0, (h0 - 1500) / 400));
      const outside = 0.74 - 0.24 * Math.max(mtnQ, 0.6 * westQ);
      const presence = Math.max(f, outside);
      // the Llano and its breaks are drawn taller than the country beyond
      // (most of all across the breaks and canyons; the flat top needs less)
      // (the flat top needs less, the finer the grid: playas would turn to pimples)
      const ve = VE * (1.25 + 1.4 * f * (1 - 0.45 * tf)) * (1 - tf * Math.min(0.5, 0.08 * kk));
      const dzdx = ((e[i + 1] - e[i - 1]) / (2 * cellX)) * ve;
      const dzdy = ((e[i - gw] - e[i + gw]) / (2 * cellY)) * ve; // northward
      const inv = 1 / Math.sqrt(dzdx * dzdx + dzdy * dzdy + 1);
      const nx = -dzdx * inv;
      const ny = -dzdy * inv;
      const nz = inv;

      // the ground itself: pale grass on the plains, red rock where it is
      // steep, darker and greener in the mountains of New Mexico
      const steep = Math.min(1, Math.max(0, (1 - nz - 0.05) / 0.28));
      // the plateau tops read pale - the staked plains - and the country
      // below the Caprock a little darker and greener
      const mtn = Math.min(1, Math.max(0, (h0 - 1700) / 900));
      const top = Math.min(1, Math.max(0, (h0 - 640) / 360));
      let ar = 0.79 + 0.08 * top - 0.12 * mtn;
      let ag = 0.77 + 0.05 * top - 0.07 * mtn;
      let ab = 0.64 + 0.08 * top - 0.1 * mtn;
      ar += (0.71 - ar) * steep;
      ag += (0.45 - ag) * steep;
      ab += (0.32 - ab) * steep;
      // the canyon lands below the rim: ochre and red, not pale plain
      const breaks = f * (1 - tf) * 0.62;
      ar += (0.8 - ar) * breaks;
      ag += (0.63 - ag) * breaks;
      ab += (0.49 - ab) * breaks;
      // down in the canyons and the breaks: the red of the Caprock country
      const deep = Math.min(1, Math.max(0, -lr[i] / 55)) * f;
      ar += (0.68 - ar) * deep * 0.75;
      ag += (0.4 - ag) * deep * 0.75;
      ab += (0.29 - ab) * deep * 0.75;

      let s = 0;
      if (lit) {
        const lambert = nx * lx + ny * ly + nz * lz;
        s = lambert > 0 ? Math.min(1.7, lambert / flat) : 0;
        // cast shadow (from the shared pass above)
        if (s > 0 && shadowed[((y - gy0) >> 1) * sw + ((x - gx0) >> 1)]) s *= shadowK;
      }
      // beyond the Llano: flatter light, and mostly the colour underneath
      // On the Llano the relief is pushed harder when the sun is high, so the
      // Caprock and the canyons still show at noon; beyond it, the light is
      // flattened away.
      if (lit) {
        if (s < 0.35 && lz < 0.06) s = 0.35 + (s - 0.35) * 0.5; // sunset: lift the darkest
        s = 1 + (s - 1) * (0.12 + 0.88 * presence) * (1 + noonGain * f);
      }
      // Depth: the map-maker's north-west light, and the canyons' own
      // shadow - ground below its surroundings is darker, rims lighter.
      const lc = nx * CARTO.x + ny * CARTO.y + nz * CARTO.z;
      let m = 1 + (Math.max(0, lc) / CARTO.z - 1) * cartoW * (0.25 + 0.75 * presence);
      const rel = Math.max(-1, Math.min(1, lr[i] / 80));
      m *= 1 + (rel < 0 ? 0.46 : 0.2) * rel * Math.max(f, 0.45);
      // under the rim: the tableland's own shadow on the plains below
      if (tf < 0.5 && f > 0.6) {
        let cover = 0;
        for (let k = 1; k <= 3; k++) {
          const dd = (tableReach * k) / 3;
          cover = Math.max(cover, tableAt(x + tdx * dd, y + tdy * dd) * (1 - (k - 1) * 0.22));
        }
        m *= 1 - 0.3 * cover * (1 - tf);
      }
      // the Llano and its breaks are drawn at (nearly) full strength by day,
      // so their modelling is not washed out by the page colour
      const sl = Math.min(1, st + 0.32 * f + 0.22 * (1 - f)) * (0.22 + 0.78 * presence);
      const j = ((y - gy0) * ww + (x - gx0)) * 4;
      let r = u0 + (ar * (amb0 + dir0 * s) * m - u0) * sl;
      let g = u1 + (ag * (amb1 + dir1 * s) * m - u1) * sl;
      let b = u2 + (ab * (amb2 + dir2 * s) * m - u2) * sl;
      // The tableland tint: the Llano reads as a warm, raised plain at every
      // hour, the country around it as pale paper.
      // muted colour beyond the Llano
      const mute = 0.38 * (1 - f);
      const lum = 0.3 * r + 0.59 * g + 0.11 * b;
      r += (lum - r) * mute;
      g += (lum - g) * mute;
      b += (lum - b) * mute;
      const t = tf * job.tint;
      r *= 1 - 0.07 * t;
      g *= 1 - 0.15 * t;
      b *= 1 - 0.28 * t;
      o[j] = 255 * r;
      o[j + 1] = 255 * g;
      o[j + 2] = 255 * b;
      o[j + 3] = 255;
    }
  }
  return o;
}
