// src/pages/collections/faces/[face].webp.ts
//
// FACE CROPS, cut at build time. One small file per face at 1x and 2x:
// /collections/faces/<id>.webp and <id>@2x.webp.
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
// WHERE THE PIXELS COME FROM. Since the IIIF move the scans are no longer in
// the repository, so the crop is assembled from the R2 tiles - the same
// full-resolution tiles a IIIF viewer uses. For each face:
//
//   1. read the image's info.json (once per image, however many faces it has)
//   2. pick the SMALLEST tiles that still hold enough pixels for the 2x crop -
//      a face that fills half a portrait needs a few low-resolution tiles, a
//      face that is 3% of a group photograph needs full-resolution ones
//   3. fetch only the tiles the crop touches, stitch them, cut, resize
//
// A static (level 0) IIIF server cannot cut an arbitrary region on request,
// which is why the stitching happens here rather than by asking R2 for it.
//
// The tiles are already upright - the tiling script applies EXIF rotation -
// so there is no orientation step. They are JPEG at quality 85, one
// generation after the scan; at face-crop sizes that is not visible.
//
// NETWORK AT BUILD. Every build fetches these tiles from iiif.austinlallison.com.
// That is a few small files per face, not the scans. If R2 is unreachable the
// build fails and names the tile, rather than shipping a blank face.

import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { FACES, FACE_W, FACE_H, faceById } from '../../../data/collections/index';
import { plate } from '../../../data/collections/images';

export function getStaticPaths() {
  return FACES.flatMap((f) => [
    { params: { face: f.id }, props: { id: f.id, density: 1 } },
    { params: { face: `${f.id}@2x` }, props: { id: f.id, density: 2 } },
  ]);
}

/** How much larger than the recorded region the crop is. */
const MARGIN = 1.45;
const QUALITY = 84;
/** Fetches in flight at once, across the whole build. */
const MAX_FETCHES = 8;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/* ------------------------------------------------------------------ *
 * Fetching, politely
 * ------------------------------------------------------------------ */
let inFlight = 0;
const waiting: (() => void)[] = [];
async function slot<T>(fn: () => Promise<T>): Promise<T> {
  if (inFlight >= MAX_FETCHES) await new Promise<void>((r) => waiting.push(r));
  inFlight++;
  try {
    return await fn();
  } finally {
    inFlight--;
    waiting.shift()?.();
  }
}

async function fetchBytes(url: string): Promise<ArrayBuffer> {
  return slot(async () => {
    for (let attempt = 1; ; attempt++) {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.arrayBuffer();
      } catch (err) {
        if (attempt >= 3) {
          throw new Error(
            `[faces] Could not fetch ${url} (${(err as Error).message}). ` +
              `Is the scan uploaded? Run: npm run iiif`
          );
        }
        await new Promise((r) => setTimeout(r, 400 * attempt));
      }
    }
  });
}

type Info = { width: number; height: number; tiles: { width: number; height?: number; scaleFactors: number[] }[] };
const infos = new Map<string, Promise<Info>>();
function info(service: string): Promise<Info> {
  let p = infos.get(service);
  if (!p) {
    p = fetchBytes(`${service}/info.json`).then((b) => JSON.parse(new TextDecoder().decode(b)) as Info);
    infos.set(service, p);
  }
  return p;
}

/**
 * The pixels of one full-resolution rectangle, at 1/s scale, assembled from
 * the level-0 tiles. Tile addresses follow the Image API: region in full-size
 * pixels, then the size that region was scaled to, rounded up.
 */
async function region(
  service: string,
  inf: Info,
  s: number,
  rect: { left: number; top: number; width: number; height: number }
) {
  const tw = inf.tiles[0].width;
  const th = inf.tiles[0].height ?? tw;
  const spanX = tw * s;
  const spanY = th * s;
  const W = inf.width;
  const H = inf.height;

  const tx0 = Math.floor(rect.left / spanX);
  const tx1 = Math.floor((rect.left + rect.width - 1) / spanX);
  const ty0 = Math.floor(rect.top / spanY);
  const ty1 = Math.floor((rect.top + rect.height - 1) / spanY);

  const pieces: { input: Buffer; left: number; top: number }[] = [];
  let canvasW = 0;
  let canvasH = 0;
  const jobs: Promise<void>[] = [];

  for (let ty = ty0; ty <= ty1; ty++) {
    for (let tx = tx0; tx <= tx1; tx++) {
      const x = tx * spanX;
      const y = ty * spanY;
      const rw = Math.min(spanX, W - x);
      const rh = Math.min(spanY, H - y);
      const sw = Math.ceil(rw / s);
      const sh = Math.ceil(rh / s);
      const left = (tx - tx0) * tw;
      const top = (ty - ty0) * th;
      canvasW = Math.max(canvasW, left + sw);
      canvasH = Math.max(canvasH, top + sh);
      // Level 0 names a region covering the whole scan "full".
      const reg = x === 0 && y === 0 && rw === W && rh === H ? 'full' : `${x},${y},${rw},${rh}`;
      const url = `${service}/${reg}/${sw},${sh}/0/default.jpg`;
      jobs.push(fetchBytes(url).then((b) => void pieces.push({ input: Buffer.from(b), left, top })));
    }
  }
  await Promise.all(jobs);

  const stitched = await sharp({
    create: { width: canvasW, height: canvasH, channels: 3, background: '#ffffff' },
  })
    .composite(pieces)
    .png()
    .toBuffer();

  // The crop, in the stitched canvas's scaled coordinates.
  const ox = tx0 * spanX;
  const oy = ty0 * spanY;
  const l = clamp(Math.round((rect.left - ox) / s), 0, canvasW - 1);
  const t = clamp(Math.round((rect.top - oy) / s), 0, canvasH - 1);
  return sharp(stitched).extract({
    left: l,
    top: t,
    width: Math.max(1, Math.min(canvasW - l, Math.round(rect.width / s))),
    height: Math.max(1, Math.min(canvasH - t, Math.round(rect.height / s))),
  });
}

/* ------------------------------------------------------------------ *
 * The crop
 * ------------------------------------------------------------------ */
// A plain Uint8Array means Uint8Array<ArrayBufferLike> since TypeScript 5.7,
// which Response will not accept as a body (the buffer could be shared).
// `new Uint8Array(buffer)` copies into a fresh ArrayBuffer, so say so.
type Bytes = Uint8Array<ArrayBuffer>;

// Both densities come from one assembly. Keyed by face id; the build asks for
// <id> and <id>@2x separately and the second finds this waiting.
const made = new Map<string, Promise<[Bytes, Bytes]>>();

function cut(id: string): Promise<[Bytes, Bytes]> {
  const cached = made.get(id);
  if (cached) return cached;

  const job = (async () => {
    const f = faceById.get(id);
    if (!f) throw new Error(`[faces] No face "${id}".`);
    const img = await plate(f.collection, f.file);
    const inf = await info(img.iiif);
    const W = inf.width;
    const H = inf.height;

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

    // The coarsest tile level that still gives the 2x crop its full pixels.
    // Scale factors are listed small to large; 1 is full resolution.
    const need = FACE_W * 2;
    const s = [...inf.tiles[0].scaleFactors]
      .sort((a, b) => a - b)
      .filter((k) => width / k >= need)
      .pop() ?? 1;

    const base = await region(img.iiif, inf, s, { left, top, width, height });

    const [one, two] = await Promise.all(
      [1, 2].map((d) =>
        base
          .clone()
          .resize(FACE_W * d, FACE_H * d, { fit: 'fill', kernel: 'lanczos3' })
          .webp({ quality: QUALITY })
          .toBuffer()
      )
    );
    return [new Uint8Array(one), new Uint8Array(two)] as [Bytes, Bytes];
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