// src/pages/collections/faces/[face].webp.ts
//
// FACE CROPS, cut from the source scans at build time. One small file per
// face at 1x and 2x: /collections/faces/<id>.webp and <id>@2x.webp.
//
// WHY A FILE AND NOT A CSS CROP. A face is often a few percent of a group
// photograph, so showing it sharply with CSS alone means loading a 1900-2600px
// plate and scaling it up inside a small box. A person page with a dozen faces
// would then decode a dozen full plates - hundreds of megabytes on a phone.
// Cutting the crop here means the page loads a dozen images of about 30 KB.
//
// WHAT THE CROP IS. The recorded region, grown by MARGIN so the face has
// some head and shoulders around it, widened or heightened to the 4:5 box,
// and slid back inside the picture if it would run off an edge. It is never
// retouched, sharpened or enhanced: it is the scan, cut.
//
// Requires sharp, which Astro's image service already uses. If a build ever
// reports that sharp cannot be found, `npm i sharp` makes it a direct
// dependency.

import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { FACES, FACE_W, FACE_H, faceById } from '../../../data/collections/index';
import { sourcePath } from '../../../data/collections/images';

export function getStaticPaths() {
  return FACES.flatMap((f) => [
    { params: { face: f.id }, props: { id: f.id, density: 1 } },
    { params: { face: `${f.id}@2x` }, props: { id: f.id, density: 2 } },
  ]);
}

/** How much larger than the recorded region the crop is. */
const MARGIN = 1.45;
const QUALITY = 84;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

// Both densities come from one decode of the scan. Keyed by face id; the build
// asks for <id> and <id>@2x separately and the second finds this waiting.
const made = new Map<string, Promise<[Uint8Array, Uint8Array]>>();

function cut(id: string): Promise<[Uint8Array, Uint8Array]> {
  const cached = made.get(id);
  if (cached) return cached;

  const job = (async () => {
    const f = faceById.get(id);
    if (!f) throw new Error(`[faces] No face "${id}".`);
    const file = sourcePath(f.collection, f.file);

    // Regions are drawn on the picture as displayed, so measure it the same
    // way: an EXIF rotation of 90 or 270 degrees swaps width and height.
    const meta = await sharp(file, { limitInputPixels: false }).metadata();
    const turned = (meta.orientation ?? 1) >= 5;
    const W = (turned ? meta.height : meta.width) ?? 0;
    const H = (turned ? meta.width : meta.height) ?? 0;
    if (!W || !H) throw new Error(`[faces] Could not read the size of ${file}.`);

    const r = f.region;
    const aspect = FACE_W / FACE_H;
    const cx = ((r.x + r.w / 2) / 100) * W;
    const cy = ((r.y + r.h / 2) / 100) * H;
    let cw = (r.w / 100) * W * MARGIN;
    let ch = (r.h / 100) * H * MARGIN;
    if (cw / ch > aspect) ch = cw / aspect;
    else cw = ch * aspect;
    if (cw > W) {
      cw = W;
      ch = cw / aspect;
    }
    if (ch > H) {
      ch = H;
      cw = ch * aspect;
    }
    const left = Math.round(clamp(cx - cw / 2, 0, W - cw));
    const top = Math.round(clamp(cy - ch / 2, 0, H - ch));
    const width = Math.max(1, Math.min(W - left, Math.round(cw)));
    const height = Math.max(1, Math.min(H - top, Math.round(ch)));

    // rotate() before extract(): the crop is taken from the upright picture.
    const base = sharp(file, { limitInputPixels: false })
      .rotate()
      .extract({ left, top, width, height });

    const [one, two] = await Promise.all(
      [1, 2].map((d) =>
        base
          .clone()
          .resize(FACE_W * d, FACE_H * d, { fit: 'fill', kernel: 'lanczos3' })
          .webp({ quality: QUALITY })
          .toBuffer()
      )
    );
    return [new Uint8Array(one), new Uint8Array(two)] as [Uint8Array, Uint8Array];
  })();

  made.set(id, job);
  return job;
}

export const GET: APIRoute = async ({ props }) => {
  const { id, density } = props as { id: string; density: 1 | 2 };
  const [one, two] = await cut(id);
  return new Response(density === 2 ? two : one, {
    headers: { 'Content-Type': 'image/webp' },
  });
};
