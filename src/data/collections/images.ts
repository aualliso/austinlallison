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
//   detail  2600         what "Examine" loads, one file.
//
// Getting those two backwards is a real bug and an easy one - density
// descriptors cannot see a layout, and `w` descriptors are useless without
// `sizes`.
//
// The detail rung is deliberately larger than the plates in
// src/data/photography.ts, which cap near 1800 because those are sellable
// prints. These are family photographs from before 1950 and the point of the
// zoom is reading a pencil inscription.
// The photography section caps detail near 1800 because those are sellable
// prints. These are family photographs from before 1950 and the entire point
// of the zoom is reading a pencil inscription on a verso, so the cap is
// higher here on purpose.

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
  detail: string;
  width: number;
  height: number;
};

const INDEX_RUNGS = [340, 680] as const;
const VIEW_RUNGS = [800, 1200, 1900] as const;
const DETAIL = 2600;

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
  const key = `/src/assets/collections/${collection}/${file}`;
  let mod = sources[key];

  // Second chance on case alone, so a build on Windows and a build on Linux
  // resolve the same file.
  if (!mod) {
    const near = byLowerKey.get(key.toLowerCase());
    if (near) {
      mod = sources[near];
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

  const src = mod.default;
  // cap() prevents upscaling: a small original silently yields smaller rungs
  // rather than a blurry large one. Duplicates are dropped so a small source
  // does not emit the same file twice in one srcset.
  const cap = (w: number) => Math.min(w, src.width);
  const ladder = (rungs: readonly number[]) => [...new Set(rungs.map(cap))];

  const idx = ladder(INDEX_RUNGS);
  const vw = ladder(VIEW_RUNGS);

  // Quality is higher on the small rungs than you might expect. A heavy
  // downscale of a grainy print concentrates detail into every pixel, so a
  // thumbnail compresses WORSE than the plate it came from, not better.
  const [indexFiles, viewFiles, detail] = await Promise.all([
    Promise.all(idx.map((w) => getImage({ src, width: w, quality: 82, format: 'webp' }))),
    Promise.all(vw.map((w) => getImage({ src, width: w, quality: 80, format: 'webp' }))),
    getImage({ src, width: cap(DETAIL), quality: 82, format: 'webp' }),
  ]);

  return {
    index: indexFiles[0].src,
    indexSrcset: indexFiles.map((f, i) => `${f.src} ${i + 1}x`).join(', '),
    view: viewFiles[viewFiles.length - 1].src,
    viewSrcset: viewFiles.map((f, i) => `${f.src} ${vw[i]}w`).join(', '),
    detail: detail.src,
    width: src.width,
    height: src.height,
  };
}
