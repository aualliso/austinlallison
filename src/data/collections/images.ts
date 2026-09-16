// src/data/collections/images.ts
//
// Turns a Surrogate's bare file name into real, optimised sources.
//
// Same idea as the ladder in src/data/photography.ts: NOTHING IS AUTHORED.
// Astro's getImage() generates every rung at build time from one original, so
// you scan once at 600 ppi, drop the file in src/assets/collections/<slug>/,
// and the thumbnail, the plate and the examine-resolution copy all exist.
//
// RUNGS. Note that index and view each ship TWO files, with DIFFERENT KINDS
// of descriptor, and the difference is not cosmetic:
//
//   index   340 + 680    DENSITY descriptors (1x, 2x). The inventory
//                        thumbnail sits in a box of a FIXED css width, so the
//                        browser only needs to know the screen's pixel ratio.
//                        `sizes` would be ignored here, so it is not set.
//   view    800/1200/1900  WIDTH descriptors (w) + `sizes`. The plate on the
//                        record page is in a fluid grid column, so its css
//                        width changes with the viewport and only `sizes` can
//                        tell the browser what it will be.
//   detail  2600         what "Examine" OPENS with, one file. LONG EDGE.
//   study   5000         fetched only if someone zooms past 1.5x. LONG EDGE.
//
// INDEX AND VIEW ARE KEYED ON WIDTH. DETAIL AND STUDY ARE KEYED ON THE LONG
// EDGE, and the split is not arbitrary. Index and view feed a srcset that the
// browser resolves against a css LAYOUT WIDTH - `sizes` is written in widths,
// density descriptors describe a fixed-width box - so a width is the only
// thing the browser can reason about. Detail and study feed a viewer that
// fits the picture in a box by both dimensions and then lets you zoom, where
// what matters is simply how many pixels the photograph has.
//
// Getting those two backwards is a real bug and an easy one - density
// descriptors cannot see a layout, and `w` descriptors are useless without
// `sizes`.
//
// The photography section caps detail near 1800 because those are sellable
// prints. These are family photographs from before 1950 and the entire point
// of the zoom is reading a pencil inscription on a verso, so the cap is
// higher here on purpose.
//
// WHY A SECOND LARGE RUNG RATHER THAN ONE BIGGER ONE, AND WHY NOT THE MASTER.
// At 2600 the viewer runs out of pixels around 2x on a normal stage, so zoom
// past that was showing interpolation - a zoom that keeps going after the
// detail stops implies there is something left to see, and in a collection
// whose claim is that its identifications are traceable, that is a small lie.
//
// The master is the wrong fix. An 8000px 48-bit scan costs the browser
// something near 200 MB to decode whatever size it is displayed at, which is
// a crash on Firefox Android and several seconds of blank stage on any phone.
// So: open at 2600 and it is instant, fetch 5000 only when someone actually
// leans in. Most visitors look and close and never pay for it.
//
// A source with no room above the detail rung emits NO study file at all - the
// two rungs collapse and the second getImage() is skipped, so a small phone
// snapshot does not cost a build a pointless duplicate.
//
// THE ORIENTATION BUG THIS FIXES, because it will be tempting to simplify this
// back one day. Keying every rung on width means a rung number describes a
// different amount of picture depending on which way up the photograph is. A
// portrait tintype scanned at 3178 x 4688 got a detail file of 2600 x 3834 -
// ten megapixels, twice what a landscape item gets at the same rung - and then
// a study file that could only reach the native 3178, a 1.22x gain over the
// detail. The upgrade fired and delivered a picture nobody could tell apart
// from the one it replaced. On the long edge the same scan gets detail at 1763
// wide and study at the full 3178: a 1.8x gain, and a smaller opening file.
//
// STUDY_MIN_GAIN exists for the other half of that. A second encode and a
// second deployed file have to earn themselves; below about a third again as
// many pixels, nobody can see the difference and the study rung is skipped.

import path from 'node:path';
import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

const sources = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/collections/**/*.{jpg,jpeg,png,webp,avif,tif,tiff,JPG,JPEG,PNG,TIF,TIFF}',
  { eager: true }
);

// A case-insensitive index of everything the glob found. Windows filesystems
// are case-insensitive and Vite's glob keys are not, so a file that plainly
// exists on disk can still miss an exact lookup - which is precisely the kind
// of failure that used to fall through to the raw original and just look bad.
const byLowerKey = new Map(
  Object.keys(sources).map((k) => [k.toLowerCase(), k])
);

const inCollection = (collection: string) =>
  Object.keys(sources)
    .filter((k) => k.startsWith(`/src/assets/collections/${collection}/`))
    .map((k) => k.split('/').pop() as string);

export type Rendered = {
  /** Fixed-box thumbnail. Pair with indexSrcset; do not set `sizes`. */
  index: string;
  indexSrcset: string;
  /** Fluid plate. Pair with viewSrcset AND a `sizes` attribute. */
  view: string;
  viewSrcset: string;
  /** What Examine opens with. */
  detail: string;
  /** Emitted WIDTH of `detail`. The rung is set on the long edge; this is what
   *  came out, and it is a width because the viewer compares it to offsetWidth. */
  detailWidth: number;
  /** The on-demand large copy. Equal to `detail` when the source is small. */
  study: string;
  /** Emitted width of `study`. The viewer clamps its zoom ceiling to this. */
  studyWidth: number;
  width: number;
  height: number;
};

const INDEX_RUNGS = [340, 680] as const;
const VIEW_RUNGS = [800, 1200, 1900] as const;
const DETAIL = 2600;
const STUDY = 5000;
/** How much bigger the study rung must be before it is worth a second file. */
const STUDY_MIN_GAIN = 1.3;

/**
 * The glob key for a collection file: exact match, then a match on case alone
 * (with a warning), then a loud failure that names what the folder DOES hold.
 * Shared by plate() and sourcePath() so both find files the same way.
 */
function resolveKey(collection: string, file: string): string {
  const key = `/src/assets/collections/${collection}/${file}`;
  let mod = sources[key];
  let found = key;

  // Second chance on case alone, so a build on Windows and a build on Linux
  // resolve the same file.
  if (!mod) {
    const near = byLowerKey.get(key.toLowerCase());
    if (near) {
      mod = sources[near];
      found = near;
      console.warn(
        `[collections] ${file} matched only on case: the data says "${file}", ` +
          `the file on disk is "${near.split('/').pop()}". Rename one so they ` +
          `agree - this resolves today and will not on a case-sensitive host.`
      );
    }
  }

  if (!mod) {
    // LOUD, because the old behaviour was to fall back silently and hand the
    // browser an 8000px original to squeeze into a thumbnail - which does not
    // look like an error, it just looks bad. If your build gets past this
    // line, the files ARE being found and any remaining ugliness is
    // somewhere else.
    const present = inCollection(collection);
    const hint = present.length
      ? `That folder currently holds: ${present.join(', ')}.`
      : `Nothing at all was found under /src/assets/collections/${collection}/. ` +
        `The whole glob found ${Object.keys(sources).length} file(s).`;
    throw new Error(
      `[collections] No image for "${file}" in collection "${collection}".\n` +
        `Looked for: ${key}\n${hint}\n` +
        `The name in the data file must match the file on disk exactly, ` +
        `extension included.`
    );
  }

  return found;
}

/**
 * `collection` is the collection slug, `file` the Surrogate's file name.
 *
 * THROWS when the file is not found. It used to fall back to /public, and
 * that was a mistake: the fallback served the untouched original, so a
 * mistyped file name produced a page that built cleanly and looked terrible,
 * with the only clue a console line in dev. A build that stops and names the
 * file is worth more than one that quietly ships an 8000px scan.
 */
export async function plate(
  collection: string,
  file: string,
  _fallback?: { width?: number; height?: number }
): Promise<Rendered> {
  const mod = sources[resolveKey(collection, file)];
  const src = mod.default;
  // cap() prevents upscaling: a small original silently yields smaller rungs
  // rather than a blurry large one. Duplicates are dropped so a small source
  // does not emit the same file twice in one srcset.
  const cap = (w: number) => Math.min(w, src.width);
  const ladder = (rungs: readonly number[]) => [...new Set(rungs.map(cap))];

  const idx = ladder(INDEX_RUNGS);
  const vw = ladder(VIEW_RUNGS);
  // Long edge in, width out: getImage() only takes a width, so a long-edge
  // target is converted through the source's own aspect ratio. Math.min keeps
  // the no-upscale rule that cap() enforces for the other two ladders.
  const longEdge = Math.max(src.width, src.height);
  const widthForLong = (target: number) =>
    Math.max(1, Math.round((src.width * Math.min(target, longEdge)) / longEdge));

  const detailW = widthForLong(DETAIL);
  const studyW = widthForLong(STUDY);
  const wantsStudy = studyW >= detailW * STUDY_MIN_GAIN;

  // Quality is higher on the small rungs than you might expect. A heavy
  // downscale of a grainy print concentrates detail into every pixel, so a
  // thumbnail compresses WORSE than the plate it came from, not better.
  // Quality holds at 80 on the study rung rather than dropping. It is fetched
  // by someone who came to read an inscription, and compression artefacts in
  // a pencil stroke are exactly what they came to look past.
  const [indexFiles, viewFiles, detail, study] = await Promise.all([
    Promise.all(idx.map((w) => getImage({ src, width: w, quality: 82, format: 'webp' }))),
    Promise.all(vw.map((w) => getImage({ src, width: w, quality: 80, format: 'webp' }))),
    getImage({ src, width: detailW, quality: 82, format: 'webp' }),
    wantsStudy
      ? getImage({ src, width: studyW, quality: 80, format: 'webp' })
      : Promise.resolve(null),
  ]);

  return {
    index: indexFiles[0].src,
    indexSrcset: indexFiles.map((f, i) => `${f.src} ${i + 1}x`).join(', '),
    view: viewFiles[viewFiles.length - 1].src,
    viewSrcset: viewFiles.map((f, i) => `${f.src} ${vw[i]}w`).join(', '),
    detail: detail.src,
    detailWidth: detailW,
    study: study ? study.src : detail.src,
    studyWidth: study ? studyW : detailW,
    width: src.width,
    height: src.height,
  };
}

/**
 * The source scan's path on disk, for build-time work that reads the original
 * directly - the face crops in /collections/faces/ are cut from it with sharp.
 * BUILD ONLY: it resolves against the project root the build runs in.
 */
export const sourcePath = (collection: string, file: string): string =>
  path.join(process.cwd(), resolveKey(collection, file));