// src/data/collections/images.ts
//
// Turns a Surrogate's bare file name into real, optimised sources.
//
// NOTHING IS AUTHORED, AND AS OF THE IIIF MOVE NOTHING IS GENERATED AT BUILD
// EITHER. scripts/iiif-tiles.mjs (`npm run iiif`) cuts every image once, on
// your machine, uploads it to R2 at iiif.austinlallison.com, and records what
// it made in iiif-images.json beside this file. This module only reads that
// record and writes URLs. That is why the family photographs no longer cost
// the Cloudflare build anything.
//
// Workflow for a new scan: put it in the scans folder (SCANS_DIR in .env),
// run `npm run iiif`, write the record, build.
//
// RUNGS - decided by the script, obeyed here. Index and view each ship TWO
// kinds of file with DIFFERENT KINDS of descriptor, and the difference is not
// cosmetic:
//
//   index   340 + 680      DENSITY descriptors (1x, 2x). The inventory
//                          thumbnail sits in a box of a FIXED css width, so
//                          the browser only needs the screen's pixel ratio.
//                          `sizes` would be ignored here, so it is not set.
//   view    800/1200/1900  WIDTH descriptors (w) + `sizes`. The plate on the
//                          record page is in a fluid grid column, so its css
//                          width changes with the viewport and only `sizes`
//                          can tell the browser what it will be.
//   detail  2600           what Examine OPENS with. LONG EDGE.
//   study   5000           fetched only past 1.5x zoom. LONG EDGE.
//
// Index and view are keyed on WIDTH because they feed a srcset the browser
// resolves against a css layout width. Detail and study are keyed on the LONG
// EDGE because they feed a viewer that fits by both dimensions, where what
// matters is how many pixels the photograph has. Keying every rung on width
// once gave a portrait tintype a detail file twice the size of a landscape
// item's and a study file almost no sharper than it. Do not simplify that back.
//
// The study rung is skipped unless it is at least 1.3x the detail rung - a
// second file has to earn itself. The script applies that rule; here a missing
// study rung simply means `study` equals `detail`.
//
// Page images are WebP. Every size also exists as default.jpg, which is what
// IIIF viewers ask for; the WebP files sit beside them for this site only.
//
// FULL RESOLUTION lives in the tiles, not in any single file. An 8000px scan
// decoded whole costs a browser something near 200 MB, which is a crash on
// Firefox Android, so no page ever asks for one. `iiif` below is the service
// address a tiled viewer uses to reach full resolution a few tiles at a time.

import manifest from './iiif-images.json';

type Size = { width: number; height: number };

type Entry = {
  v: number;
  /** IIIF Image API 3 service id; add /info.json to fetch its description. */
  id: string;
  width: number;
  height: number;
  sizes: Size[];
  rungs: { index: number[]; view: number[]; detail: number; study: number | null };
  hash: string;
};

const IIIF = manifest as Record<string, Entry>;

/** The manifest version this file understands. Must match the script's VERSION. */
const EXPECTED_VERSION = 2;

// A case-insensitive index of the manifest. Windows is case-insensitive and
// object keys are not, so a file that plainly exists can still miss an exact
// lookup. Resolve on case with a warning, as the glob version did.
const byLowerKey = new Map(Object.keys(IIIF).map((k) => [k.toLowerCase(), k]));

const inCollection = (collection: string) =>
  Object.keys(IIIF)
    .filter((k) => k.startsWith(`${collection}/`))
    .map((k) => k.slice(collection.length + 1));

export type Rendered = {
  /** Fixed-box thumbnail. Pair with indexSrcset; do not set `sizes`. */
  index: string;
  indexSrcset: string;
  /** Fluid plate. Pair with viewSrcset AND a `sizes` attribute. */
  view: string;
  viewSrcset: string;
  /** What Examine opens with. */
  detail: string;
  /** Width of `detail`. The rung is set on the long edge; this is what came out. */
  detailWidth: number;
  /** The on-demand large copy. Equal to `detail` when the source is small. */
  study: string;
  /** Width of `study`. The viewer clamps its zoom ceiling to this. */
  studyWidth: number;
  /** Pixel size of the scan itself. */
  width: number;
  height: number;
  /** IIIF Image service id, for a tiled viewer and for manifests. */
  iiif: string;
};

/**
 * The manifest entry for a collection file: exact match, then a match on case
 * alone (with a warning), then a loud failure that names what IS recorded.
 */
function resolveEntry(collection: string, file: string): Entry {
  const key = `${collection}/${file}`;
  let entry = IIIF[key];

  if (!entry) {
    const near = byLowerKey.get(key.toLowerCase());
    if (near) {
      entry = IIIF[near];
      console.warn(
        `[collections] ${file} matched only on case: the data says "${file}", ` +
          `the scan is "${near.slice(collection.length + 1)}". Rename one so ` +
          `they agree - this resolves today and may not after a rename.`
      );
    }
  }

  if (!entry) {
    // LOUD, on purpose. A missing image should stop the build and name the
    // file, not ship a page that quietly looks wrong.
    const present = inCollection(collection);
    const hint = present.length
      ? `Recorded for that collection: ${present.join(', ')}.`
      : `Nothing at all is recorded for "${collection}".`;
    throw new Error(
      `[collections] No image for "${file}" in collection "${collection}".\n` +
        `Looked for "${key}" in src/data/collections/iiif-images.json.\n${hint}\n` +
        `If the scan is new, put it in the scans folder and run: npm run iiif\n` +
        `Otherwise the name in the data file must match the scan exactly, ` +
        `extension included.`
    );
  }

  if (entry.v !== EXPECTED_VERSION) {
    throw new Error(
      `[collections] "${key}" was processed by an older version of the tiling ` +
        `script. Run: npm run iiif`
    );
  }

  return entry;
}

/** URL of one pre-made full image at a given width. */
function sized(entry: Entry, width: number, format: 'webp' | 'jpg' = 'webp'): string {
  const size = entry.sizes.find((s) => s.width === width);
  if (!size) {
    throw new Error(
      `[collections] ${entry.id} has no ${width}px image. Run: npm run iiif -- --force`
    );
  }
  return `${entry.id}/full/${size.width},${size.height}/0/default.${format}`;
}

/**
 * `collection` is the collection slug, `file` the Surrogate's file name.
 * THROWS when the file is not in the manifest.
 *
 * Still async so no caller has to change; there is simply nothing to await now.
 */
export async function plate(
  collection: string,
  file: string,
  _fallback?: { width?: number; height?: number }
): Promise<Rendered> {
  const e = resolveEntry(collection, file);
  const { index, view, detail, study } = e.rungs;

  return {
    index: sized(e, index[0]),
    indexSrcset: index.map((w, i) => `${sized(e, w)} ${i + 1}x`).join(', '),
    view: sized(e, view[view.length - 1]),
    viewSrcset: view.map((w) => `${sized(e, w)} ${w}w`).join(', '),
    detail: sized(e, detail),
    detailWidth: detail,
    study: sized(e, study ?? detail),
    studyWidth: study ?? detail,
    width: e.width,
    height: e.height,
    iiif: e.id,
  };
}
