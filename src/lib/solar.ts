/**
 * solar.ts — build-time solar model for plate exposures.
 *
 * Given where and when a plate was made, returns the light that was on the
 * ground at that moment, expressed as CSS custom properties for the desk.
 *
 * Pure and synchronous. No DOM, no fetch, no clock — it never reads the
 * current time, only the exposure's. Runs once per plate at build.
 *
 * Sign conventions:
 *   azimuth        degrees clockwise from true north (0 = N, 90 = E, 180 = S)
 *   shadowBearing  azimuth + 180, i.e. the direction a shadow is thrown
 *   screenBearing  shadowBearing as drawn on the desk (see cameraBearingDeg)
 *
 * The light produced here touches the DESK ONLY — paper, mount caption,
 * cast shadows. It must never be applied to a photograph.
 */

/* ------------------------------------------------------------------ types */

export interface PlateExposure {
  /** decimal degrees, north positive */
  lat: number;
  /** decimal degrees, EAST positive — western longitudes are negative */
  lon: number;
  /** IANA zone, e.g. "America/Chicago". Never a numeric offset: camera clocks
   *  record local wall time, so the offset depends on the date. */
  timeZone: string;
  /** local wall time as written by the camera, "YYYY-MM-DDTHH:MM:SS".
   *  This is EXIF DateTimeOriginal verbatim, with the colons in the date
   *  turned into dashes and a T inserted. No zone suffix. */
  taken: string;
  /** EXIF GPSImgDirection, if present. Enables frame-relative lighting. */
  cameraBearingDeg?: number;
}

export interface SolarOptions {
  /** how far the print sits off the desk, in CSS px. Sets shadow length. */
  liftPx?: number;
  /** shadow length ceiling, so a 2° sun doesn't throw one off the page. */
  maxShadowPx?: number;
  /** light the desk relative to the camera's heading rather than to north.
   *  Requires cameraBearingDeg; silently falls back to north-up without it. */
  orientToFrame?: boolean;
}

export interface PlateLight {
  altitudeDeg: number;        // apparent (refracted)
  trueAltitudeDeg: number;    // geometric, for thresholds
  azimuthDeg: number;
  shadowBearingDeg: number;
  screenBearingDeg: number;
  shadowLengthPx: number;
  /** 0–1 share of illumination arriving as a direct beam, after extinction */
  directShare: number;
  /** 0 = full day, 1 = full night. Same curve as the header's nightness(). */
  nightness: number;
  /** true when the sun was below the horizon at the recorded time — almost
   *  always a wrong camera clock or a wrong zone, not a real night exposure. */
  belowHorizon: boolean;
  /** ready to spread onto a style attribute */
  vars: Record<string, string>;
}

/* -------------------------------------------------------------- constants */

const DEG = Math.PI / 180;
const RAD = 180 / Math.PI;

const DEFAULT_LIFT_PX = 13;
const DEFAULT_MAX_SHADOW_PX = 190;

/** Sunlight colour by altitude. Mixed pairwise in oklab, never oklch: these
 *  run from near-neutral to saturated, and a near-neutral's meaningless hue
 *  drags the result around an oklch hue arc. (The distant ridge went olive
 *  this way.) */
const LIGHT_RAMP: Array<[number, string]> = [
  [-8, '#6E6382'],
  [-3, '#96574F'],
  [-0.8, '#C2593A'],
  [2, '#DE7A3E'],
  [6, '#EC9F5E'],
  [12, '#F4C98E'],
  [20, '#F9E0BC'],
  [35, '#FDF2DD'],
  [60, '#FFFBF2'],
  [90, '#FFFDF8'],
];

/** Shadows on a sunlit surface are lit by sky, so they run blue. */
const SKY_TINT = '#33465E';
const SHADOW_BASE = '#191410';

/* --------------------------------------------------------- time and zone */

interface WallTime {
  year: number; month: number; day: number;
  hour: number; minute: number; second: number;
}

function parseWall(taken: string): WallTime {
  const m = /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})(?::(\d{2}))?$/.exec(taken.trim());
  if (!m) {
    throw new Error(
      `solar: unparseable exposure time "${taken}". Expected "YYYY-MM-DDTHH:MM:SS" ` +
      `(EXIF DateTimeOriginal with dashes in the date), with no zone suffix.`
    );
  }
  return {
    year: +m[1], month: +m[2], day: +m[3],
    hour: +m[4], minute: +m[5], second: m[6] ? +m[6] : 0,
  };
}

/** Offset of `timeZone` from UTC, in minutes, at a given UTC instant. */
function zoneOffsetMinutesAt(utcMs: number, timeZone: string): number {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
  const parts = dtf.formatToParts(new Date(utcMs));
  const get = (t: string) => Number(parts.find((p) => p.type === t)!.value);
  const asUTC = Date.UTC(
    get('year'), get('month') - 1, get('day'),
    get('hour'), get('minute'), get('second')
  );
  return Math.round((asUTC - utcMs) / 60000);
}

/**
 * Offset in minutes for a LOCAL wall time in `timeZone`.
 *
 * Wall time → UTC is not a direct conversion: the offset depends on the
 * instant, and the instant is what we're solving for. Guess, measure, correct,
 * measure again. Two passes settle every case except the ambiguous hour at a
 * fall-back transition, where we take the first (pre-transition) offset —
 * a one-hour error confined to that hour, and no plate should land there.
 */
function zoneOffsetForWall(w: WallTime, timeZone: string): number {
  const naive = Date.UTC(w.year, w.month - 1, w.day, w.hour, w.minute, w.second);
  const first = zoneOffsetMinutesAt(naive, timeZone);
  const second = zoneOffsetMinutesAt(naive - first * 60000, timeZone);
  return second;
}

function dayOfYear(w: WallTime): number {
  const start = Date.UTC(w.year, 0, 1);
  const here = Date.UTC(w.year, w.month - 1, w.day);
  return Math.round((here - start) / 86400000) + 1;
}

/* ------------------------------------------------------- solar position */

/** Solar declination, degrees. The leading minus is not optional: without it
 *  the whole model runs six months out of phase, and summer and winter swap. */
function declinationDeg(n: number): number {
  const inner = (0.98565 * (n + 10) + 1.914 * Math.sin(0.98565 * (n - 2) * DEG)) * DEG;
  return -Math.asin(0.39779 * Math.cos(inner)) * RAD;
}

/** Equation of time, minutes. */
function equationOfTimeMin(n: number): number {
  const b = (360 * (n - 81)) / 365 * DEG;
  return 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b);
}

/** Bennett's refraction, degrees. Position only — never thresholds. */
function refractionDeg(trueAltDeg: number): number {
  if (trueAltDeg < -2) return 0;
  return (1 / Math.tan((trueAltDeg + 7.31 / (trueAltDeg + 4.4)) * DEG)) / 60;
}

/** Kasten–Young relative air mass. */
function airMass(altDeg: number): number {
  if (altDeg <= 0) return 40;
  return 1 / (Math.sin(altDeg * DEG) + 0.50572 * Math.pow(altDeg + 6.07995, -1.6364));
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smoothstep = (x: number) => { const t = clamp01(x); return t * t * (3 - 2 * t); };
const wrap360 = (d: number) => ((d % 360) + 360) % 360;

/* ------------------------------------------------------------- colouring */

/** A CSS colour for direct sunlight at this altitude, interpolated in oklab. */
function lightColorCss(altDeg: number): string {
  if (altDeg <= LIGHT_RAMP[0][0]) return LIGHT_RAMP[0][1];
  for (let i = 1; i < LIGHT_RAMP.length; i++) {
    const [hi, hiHex] = LIGHT_RAMP[i];
    if (altDeg <= hi) {
      const [lo, loHex] = LIGHT_RAMP[i - 1];
      const t = (altDeg - lo) / (hi - lo);
      return `color-mix(in oklab, ${hiHex} ${(t * 100).toFixed(1)}%, ${loHex})`;
    }
  }
  return LIGHT_RAMP[LIGHT_RAMP.length - 1][1];
}

/* ------------------------------------------------------------------ main */

export function plateLight(exposure: PlateExposure, options: SolarOptions = {}): PlateLight {
  const liftPx = options.liftPx ?? DEFAULT_LIFT_PX;
  const maxShadowPx = options.maxShadowPx ?? DEFAULT_MAX_SHADOW_PX;

  const wall = parseWall(exposure.taken);
  const offsetMin = zoneOffsetForWall(wall, exposure.timeZone);
  const n = dayOfYear(wall);

  const localMinutes = wall.hour * 60 + wall.minute + wall.second / 60;
  const dec = declinationDeg(n);

  // Local clock → apparent solar time. The longitude term is relative to the
  // zone's own standard meridian, which is why the offset must be the one in
  // force on this date rather than a stored number.
  const solarMinutes =
    localMinutes + 4 * (exposure.lon - 15 * (offsetMin / 60)) + equationOfTimeMin(n);

  // Normalised to −180…180 first: a large longitude correction can push
  // solarMinutes outside the day, and the afternoon test below depends on
  // the sign being meaningful.
  const hourAngle = wrap360(15 * (solarMinutes / 60 - 12) + 180) - 180;

  const sinAlt =
    Math.sin(exposure.lat * DEG) * Math.sin(dec * DEG) +
    Math.cos(exposure.lat * DEG) * Math.cos(dec * DEG) * Math.cos(hourAngle * DEG);
  const trueAlt = Math.asin(Math.max(-1, Math.min(1, sinAlt))) * RAD;
  const alt = trueAlt + refractionDeg(trueAlt);

  let cosAz =
    (Math.sin(dec * DEG) - sinAlt * Math.sin(exposure.lat * DEG)) /
    (Math.cos(trueAlt * DEG) * Math.cos(exposure.lat * DEG));
  cosAz = Math.max(-1, Math.min(1, cosAz));
  let az = Math.acos(cosAz) * RAD;            // 0–180, measured from north
  if (hourAngle > 0) az = 360 - az;           // afternoon: sun is west of south
  az = wrap360(az);

  const shadowBearing = wrap360(az + 180);

  const useFrame = !!options.orientToFrame && typeof exposure.cameraBearingDeg === 'number';
  const screenBearing = useFrame
    ? wrap360(shadowBearing - (exposure.cameraBearingDeg as number))
    : shadowBearing;

  // A flat print lifted `liftPx` above the desk casts a same-size copy,
  // translated along the shadow bearing by lift / tan(altitude).
  const altForLength = Math.max(alt, 2.2);
  const length = Math.min(maxShadowPx, liftPx / Math.tan(altForLength * DEG));

  const dx = length * Math.sin(screenBearing * DEG);
  const dy = -length * Math.cos(screenBearing * DEG);   // screen y runs down

  const directShare =
    alt > -0.5 ? clamp01((Math.exp(-0.1 * airMass(alt)) - 0.2) / 0.62) : 0;
  const nightness = smoothstep((3 - alt) / 13);

  // A low sun is filtered through a long atmospheric path: its shadow is long,
  // soft and WEAK. A high sun gives a short, hard, dark one. That inverse
  // relationship is what makes this read as light rather than as a drop-shadow.
  const alpha = 0.06 + 0.3 * directShare;
  const blur = 5 + length * 0.1 + 12 * (1 - directShare);

  const light = lightColorCss(alt);
  const skyBlue = clamp01(alt / 42);
  const shadow =
    `color-mix(in oklab, ${SKY_TINT} ${(30 + 42 * skyBlue).toFixed(0)}%, ${SHADOW_BASE})`;

  const litPaper =
    `color-mix(in oklab, ${light} ${(9 + 22 * directShare).toFixed(1)}%, var(--color-desk, #F5F3ED))`;
  // Skip the outer mix entirely in daylight rather than emitting a
  // three-deep nest with a 0% term. Every plate is a daytime exposure, so
  // this is the normal path, and what lands in devtools should be readable.
  const deskLit =
    nightness < 0.005
      ? litPaper
      : `color-mix(in oklab, #141A22 ${(nightness * 74).toFixed(1)}%, ${litPaper})`;

  // CSS gradient angles run clockwise from "to top". The wash must END at the
  // sun, so the angle points away from the shadow.
  const washAngle = wrap360(screenBearing + 180);

  return {
    altitudeDeg: alt,
    trueAltitudeDeg: trueAlt,
    azimuthDeg: az,
    shadowBearingDeg: shadowBearing,
    screenBearingDeg: screenBearing,
    shadowLengthPx: length,
    directShare,
    nightness,
    belowHorizon: trueAlt < -0.833,
    vars: {
      '--plate-light': light,
      '--plate-shadow': shadow,
      '--plate-desk': deskLit,
      '--plate-sh-dx': `${dx.toFixed(1)}px`,
      '--plate-sh-dy': `${dy.toFixed(1)}px`,
      '--plate-sh-blur': `${blur.toFixed(1)}px`,
      '--plate-sh-alpha': alpha.toFixed(3),
      '--plate-wash-angle': `${washAngle.toFixed(1)}deg`,
      '--plate-wash': (0.05 + 0.2 * directShare).toFixed(3),
    },
  };
}

/**
 * Correctness check to run over the whole set at build.
 *
 * A sun below the horizon at the recorded exposure time is nearly always a
 * camera clock never reset after a drive north, or a body still on a previous
 * owner's zone. It catches almost every time or zone error in one pass; a
 * plate that passes is almost certainly right.
 */
export function auditExposures(
  plates: Array<{ id: string } & PlateExposure>
): Array<{ id: string; altitudeDeg: number; localTime: string }> {
  const bad: Array<{ id: string; altitudeDeg: number; localTime: string }> = [];
  for (const p of plates) {
    const light = plateLight(p);
    if (light.belowHorizon) {
      bad.push({ id: p.id, altitudeDeg: light.trueAltitudeDeg, localTime: p.taken });
    }
  }
  return bad;
}