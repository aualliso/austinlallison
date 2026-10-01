// src/data/collections/mount.ts
//
// THE MOUNT TONE. Each collection takes its colour from its own key print:
// the paper, card or mat around the photograph, sampled once at build time.
// From that one sampled colour this module derives the few tokens the pages
// use, so no collection page is the same cream as every other.
//
//   tone    the sampled colour itself, as measured
//   ground  a very dark ground in the tone's hue (the frontispiece band)
//   ink     near-white text in the tone's hue (the epigraph on the ground)
//   quiet   a mid tone for small text on the ground (crumb, attribution)
//   rule    the tone made legible on the dark ground (the epigraph's rule)
//   tint    a pale band in the tone's hue (the desk bands on the page)
//   mark    the tone made legible on the pale page (the guide's numbers)
//
// HOW IT IS SAMPLED. The print's smallest rendered rung is fetched and
// shrunk to 48 x 48. Only the outer ring of pixels is read - the mount, or
// on a tightly cropped scan the edge of the print - and of those, only the
// middle half by lightness is averaged, so a dark corner of the photograph
// or a bright speck of the scanner bed cannot pull the colour off.
//
// WHY THE TOKENS ARE MADE IN OKLCH. The tokens fix LIGHTNESS and only borrow
// the hue and a capped share of the chroma. In OKLCH equal lightness looks
// equally light whatever the hue, so a yellow card and a grey-brown mat give
// bands of the same visual weight. In HSL they would not.
//
// NEVER BREAKS A BUILD. Any failure - no network, a relative URL that is not
// served during the build, sharp not resolvable - returns null with a
// warning, and the page falls back to the site palette. To make a tone
// permanent (or to overrule a sample you dislike), set `mount: '#rrggbb'` on
// the collection; a set value is used as is and nothing is fetched. The build
// log prints every sampled value in exactly that form, ready to paste.
//
// COST. One small image per collection per build, cached for the rest of the
// build, so the guide and the collection pages share it.

export type MountTokens = {
  tone: string;
  ground: string;
  ink: string;
  quiet: string;
  rule: string;
  tint: string;
  mark: string;
  sampled: boolean;
};

/* ---------------------------------------------------------------- *
 * Colour: sRGB <-> OKLab <-> OKLCH
 * ---------------------------------------------------------------- */
type RGB = [number, number, number]; // 0..1, gamma-encoded sRGB
type LCH = [number, number, number]; // L 0..1, C, h degrees

const toLin = (v: number) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
const toGam = (v: number) => (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055);

function rgbToLch([r0, g0, b0]: RGB): LCH {
  const r = toLin(r0);
  const g = toLin(g0);
  const b = toLin(b0);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  const C = Math.hypot(A, B);
  const h = ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360;
  return [L, C, h];
}

// Linear-light result, possibly out of gamut.
function lchToLin([L, C, h]: LCH): RGB {
  const A = C * Math.cos((h * Math.PI) / 180);
  const B = C * Math.sin((h * Math.PI) / 180);
  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
  const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
  const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

const inGamut = (c: RGB) => c.every((v) => v >= -1e-4 && v <= 1 + 1e-4);

// Into sRGB by giving up chroma, never lightness or hue.
function lchToHex([L, C, h]: LCH): string {
  let lo = 0;
  let hi = C;
  let lin = lchToLin([L, C, h]);
  if (!inGamut(lin)) {
    for (let k = 0; k < 24; k++) {
      const mid = (lo + hi) / 2;
      if (inGamut(lchToLin([L, mid, h]))) lo = mid;
      else hi = mid;
    }
    lin = lchToLin([L, lo, h]);
  }
  return (
    '#' +
    lin
      .map((v) => Math.round(Math.min(1, Math.max(0, toGam(Math.min(1, Math.max(0, v))))) * 255))
      .map((v) => v.toString(16).padStart(2, '0'))
      .join('')
  );
}

const hexToRgb = (hex: string): RGB | null => {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

/* ---------------------------------------------------------------- *
 * Tokens. The dials: each token's lightness, and the most chroma it may
 * borrow. Raise a C cap for more colour, lower it for more restraint.
 * ---------------------------------------------------------------- */
const DIALS = {
  ground: { L: 0.235, share: 0.45, max: 0.028 },
  ink: { L: 0.93, share: 0.5, max: 0.03 },
  quiet: { L: 0.73, share: 0.6, max: 0.04 },
  rule: { L: 0.7, share: 1, max: 0.09 },
  tint: { L: 0.935, share: 0.55, max: 0.026 },
  mark: { L: 0.62, share: 1, max: 0.085 },
};

export function tokensFrom(hex: string, sampled = true): MountTokens | null {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  const [, C, h] = rgbToLch(rgb);
  const make = (d: { L: number; share: number; max: number }) => lchToHex([d.L, Math.min(C * d.share, d.max), h]);
  return {
    tone: lchToHex(rgbToLch(rgb)),
    ground: make(DIALS.ground),
    ink: make(DIALS.ink),
    quiet: make(DIALS.quiet),
    rule: make(DIALS.rule),
    tint: make(DIALS.tint),
    mark: make(DIALS.mark),
    sampled,
  };
}

/* The custom properties a page sets from the tokens. */
export const mountStyle = (t: MountTokens | null) =>
  t
    ? [
        `--m-tone:${t.tone}`,
        `--m-ground:${t.ground}`,
        `--m-ink:${t.ink}`,
        `--m-quiet:${t.quiet}`,
        `--m-rule:${t.rule}`,
        `--m-tint:${t.tint}`,
        `--m-mark:${t.mark}`,
      ].join(';')
    : undefined;

/* ---------------------------------------------------------------- *
 * Sampling
 * ---------------------------------------------------------------- */
const SIZE = 48;
const RING = 5; // pixels in from each edge, at 48 x 48: about a tenth

async function sampleHex(url: string): Promise<string> {
  const { default: sharp } = await import('sharp');
  const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const { data, info } = await sharp(buf)
    .removeAlpha()
    .resize(SIZE, SIZE, { fit: 'fill' })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const ch = info.channels;
  const ring: RGB[] = [];
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      if (x >= RING && x < SIZE - RING && y >= RING && y < SIZE - RING) continue;
      const k = (y * SIZE + x) * ch;
      ring.push(ch >= 3 ? [data[k] / 255, data[k + 1] / 255, data[k + 2] / 255] : [data[k] / 255, data[k] / 255, data[k] / 255]);
    }
  }
  // The middle half by lightness.
  const lum = (c: RGB) => 0.2126 * toLin(c[0]) + 0.7152 * toLin(c[1]) + 0.0722 * toLin(c[2]);
  ring.sort((a, b) => lum(a) - lum(b));
  const mid = ring.slice(Math.floor(ring.length * 0.25), Math.ceil(ring.length * 0.75));
  // Averaged in linear light, which is how light mixes.
  const avg = [0, 1, 2].map((n) => toGam(mid.reduce((s, c) => s + toLin(c[n]), 0) / mid.length)) as RGB;
  return '#' + avg.map((v) => Math.round(v * 255).toString(16).padStart(2, '0')).join('');
}

const cache = new Map<string, Promise<MountTokens | null>>();

/**
 * The tokens for a collection.
 * @param slug      the collection's slug (cache key, and named in warnings)
 * @param set       a `mount` value set on the collection, used as is
 * @param imageUrl  any rendered rung of its key print; the smallest is best
 * @param base      the site URL, to resolve a root-relative image URL
 */
export function mountTokens(
  slug: string,
  set: string | undefined,
  imageUrl: string | undefined,
  base?: URL | string
): Promise<MountTokens | null> {
  const hit = cache.get(slug);
  if (hit) return hit;
  const job = (async () => {
    if (set) {
      const t = tokensFrom(set, false);
      if (!t) console.warn(`[mount] ${slug}: mount '${set}' is not a #rrggbb colour; using the site palette.`);
      return t;
    }
    if (!imageUrl) return null;
    let url: string;
    try {
      url = new URL(imageUrl, base).href;
    } catch {
      console.warn(`[mount] ${slug}: cannot resolve '${imageUrl}' to a URL; using the site palette.`);
      return null;
    }
    try {
      const hex = await sampleHex(url);
      console.info(`[mount] ${slug}: sampled ${hex}  (to pin it: mount: '${hex}')`);
      return tokensFrom(hex, true);
    } catch (e) {
      console.warn(`[mount] ${slug}: could not sample ${url} (${(e as Error).message}); using the site palette.`);
      return null;
    }
  })();
  cache.set(slug, job);
  return job;
}
