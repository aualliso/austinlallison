/**
 * sample-covers.mjs — derive the album chrome's ink and halo from each cover.
 *
 *   node scripts/sample-covers.mjs "src/assets/photography/covers/*.jpg"
 *
 * Writes a JSON map to stdout, keyed by file stem. Paste it into the matching
 * SERIES entry's `chrome` field in src/data/photography.ts.
 *
 * Requires sharp, which Astro already installs.
 *
 * WHY PER REGION, NOT PER IMAGE:
 * A single average over an escarpment plate — bright sky, dark foreground —
 * lands on a mid grey that is wrong at both ends. Each piece of chrome is
 * sampled over the patch of picture it actually sits on.
 *
 * WHY THE HALO ABSORBS FAILURES:
 * When contrast falls short, this widens the halo rather than moving the ink.
 * Moving the ink is the road back to per-image hand-tuning, which is what the
 * opaque slip exists to avoid.
 */

import sharp from 'sharp';
import { basename, extname } from 'node:path';

/**
 * Where each piece of chrome sits, as fractions of the SOURCE image.
 *
 * These are wider than the elements themselves, on purpose. The cover is
 * `object-fit: cover`, so which part of the source ends up under the rail
 * depends on the viewport's aspect ratio. A 3:2 plate on a wide desktop is
 * cropped top and bottom and shows its full width, putting the rail at about
 * x = 0.97. The same plate on a phone is cropped hard at the sides and shows
 * only the middle third, putting the rail at about x = 0.67.
 *
 * So each region spans the whole range the element can land in across
 * viewports, and the halo strength rises with how much the picture varies
 * inside it. Sampling a narrow strip would tune the chrome for one screen.
 */
const REGIONS = {
  rail: { left: 0.6, top: 0.22, width: 0.4, height: 0.56 },
  catchword: { left: 0.22, top: 0.8, width: 0.56, height: 0.2 },
  /* Sampled but not currently used: the plate label lives inside the slip,
     which is opaque and needs no halo. Here for the day it moves out. */
  plateline: { left: 0.5, top: 0.0, width: 0.5, height: 0.18 },
};

/** Contrast floor for chrome against its own patch of picture. */
const TARGET_CONTRAST = 4.0;

/* ------------------------------------------------------------- colour ops */

const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);

const srgbToLinear = (c) => {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
};

function relativeLuminance([r, g, b]) {
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
}

function contrastRatio(a, b) {
  const la = relativeLuminance(a), lb = relativeLuminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

const hex = ([r, g, b]) =>
  '#' + [r, g, b].map((v) => clamp(Math.round(v), 0, 255).toString(16).padStart(2, '0')).join('');

/* HSL, so that setting a target lightness leaves the hue alone.
   Scaling the RGB channels toward white — which is what the first version of
   this did — crushes the differences between them, so every cover came out
   the same near-neutral off-white and the point of sampling was lost. */
function rgbToHsl([r, g, b]) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return { h, s, l };
}

function hslToRgb({ h, s, l }) {
  if (s === 0) return [l * 255, l * 255, l * 255];
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hue = (t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [hue(h + 1 / 3) * 255, hue(h) * 255, hue(h - 1 / 3) * 255];
}

/* ------------------------------------------------------------- sampling */

/**
 * Mean and per-channel spread over one region.
 *
 * The pixels are read from a raw buffer rather than from sharp's stats().
 * stats() reports on the INPUT image and ignores everything in the pipeline
 * before it, so `.extract(region).stats()` silently returns whole-image
 * numbers — which is exactly the bug this replaces. Every region came back
 * byte-identical and every cover was classified the same way.
 */
async function sampleRegion(pipeline, dims, region) {
  const left = clamp(Math.round(region.left * dims.width), 0, dims.width - 1);
  const top = clamp(Math.round(region.top * dims.height), 0, dims.height - 1);
  const width = clamp(Math.round(region.width * dims.width), 1, dims.width - left);
  const height = clamp(Math.round(region.height * dims.height), 1, dims.height - top);

  const { data, info } = await pipeline
    .clone()
    .extract({ left, top, width, height })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const ch = info.channels;
  const n = data.length / ch;
  const sum = [0, 0, 0];
  const sumSq = [0, 0, 0];

  for (let i = 0; i < data.length; i += ch) {
    for (let c = 0; c < 3; c++) {
      const v = data[i + c];
      sum[c] += v;
      sumSq[c] += v * v;
    }
  }

  const mean = sum.map((s) => s / n);
  const spread =
    mean.reduce((acc, m, c) => acc + Math.sqrt(Math.max(0, sumSq[c] / n - m * m)), 0) / 3;

  return { mean, spread };
}

function chooseChrome({ mean, spread }) {
  const base = rgbToHsl(mean);

  /* Keep the plate's hue, but pull saturation into a usable band: a flat grey
     patch would otherwise give colourless chrome, and a violently saturated
     one would give chrome that shouts. */
  const sat = clamp(base.s, 0.12, 0.42);

  const lightInk = hslToRgb({ h: base.h, s: sat * 0.5, l: 0.91 });
  const darkInk = hslToRgb({ h: base.h, s: sat * 0.85, l: 0.15 });

  /* No brightness threshold. Score both polarities against this region and
     take the winner — the crossover point falls out of the contrast maths
     itself rather than being a number someone guessed. (The first version
     used a fixed 0.34 cutoff in linear-light luminance, where an ordinary
     photograph sits near 0.2, so everything was classified the same way even
     once the region sampling was fixed.) */
  const lightRatio = contrastRatio(lightInk, mean);
  const darkRatio = contrastRatio(darkInk, mean);
  const goLight = lightRatio >= darkRatio;

  const ink = goLight ? lightInk : darkInk;
  const ratio = goLight ? lightRatio : darkRatio;
  const halo = goLight
    ? hslToRgb({ h: base.h, s: sat * 0.45, l: 0.05 })
    : hslToRgb({ h: base.h, s: sat * 0.3, l: 0.97 });

  /* Spend a shortfall on the halo: more of it, more opaque, wider blur.
     0 = a whisper, 1 = the halo is doing all the work. */
  let haloStrength = 0.35;
  if (ratio < TARGET_CONTRAST) {
    haloStrength = 0.35 + ((TARGET_CONTRAST - ratio) / TARGET_CONTRAST) * 0.65;
  }
  /* A busy region needs a stronger halo whatever the mean says: the chrome
     has to survive the extremes it crosses, not just the average. */
  haloStrength = clamp(haloStrength + Math.max(0, (spread - 30) / 110), 0, 1);

  return {
    ink: hex(ink),
    halo: hex(halo),
    haloStrength: Number(haloStrength.toFixed(3)),
    polarity: goLight ? 'light-ink' : 'dark-ink',
    contrast: Number(ratio.toFixed(2)),
    spread: Number(spread.toFixed(1)),
    meanHex: hex(mean),
  };
}

/* ------------------------------------------------------------------ main */

async function sampleCover(file) {
  /* .rotate() with no argument applies the EXIF orientation tag. Without it,
     a portrait frame written by the camera as a rotated landscape would be
     sampled in the wrong corners. */
  const pipeline = sharp(file).rotate();
  const meta = await sharp(file).metadata();

  /* metadata() reports the stored dimensions, which are swapped relative to
     the rotated pipeline for orientations 5-8. */
  const swapped = (meta.orientation ?? 1) >= 5;
  const dims = swapped
    ? { width: meta.height, height: meta.width }
    : { width: meta.width, height: meta.height };

  const out = {};
  for (const [name, region] of Object.entries(REGIONS)) {
    out[name] = chooseChrome(await sampleRegion(pipeline, dims, region));
  }
  return out;
}

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error('usage: node scripts/sample-covers.mjs <cover files...>');
  process.exit(1);
}

const result = {};
for (const file of files) {
  const key = basename(file, extname(file));
  try {
    result[key] = await sampleCover(file);
  } catch (err) {
    console.error(`sample-covers: ${file}: ${err.message}`);
    process.exitCode = 1;
  }
}
process.stdout.write(JSON.stringify(result, null, 2) + '\n');
