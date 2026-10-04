// scripts/iiif-tiles.mjs
//
// Cuts static IIIF Image API 3.0 (level 0) tiles from the collection scans
// and uploads them to R2. Writes src/data/collections/iiif-images.json,
// which images.ts reads. The tiles never enter Git; that JSON file does.
//
//   npm run iiif                       process new or changed scans
//   npm run iiif -- --dry-run          tile locally, upload nothing, write nothing
//   npm run iiif -- --only swann       only scans whose path contains "swann"
//   npm run iiif -- --force            redo scans even if unchanged
//
// Only scans that are new, changed, or from an older VERSION are processed.
//
// Every face gets:
//   - 512px tiles at every zoom level, up to FULL resolution
//   - the site's own rungs under full/{w},{h}/0/, as default.jpg (IIIF) AND
//     default.webp (what the site's pages actually load):
//       index 340/680 and view 800/1200/1900, keyed on WIDTH
//       detail 2600 and study 5000, keyed on the LONG EDGE
//     These mirror the rules images.ts used to apply with getImage(): never
//     upscale, and skip the study rung unless it is 1.3x the detail rung.
//   - an info.json whose `sizes` lists every pre-made full image
//   - DOWNLOADS, under download/: the whole scan as one JPEG, and a smaller
//     sharing copy when the scan is big enough for the difference to matter.
//     These are uploaded with Content-Disposition: attachment. The site and
//     the image host are different origins, and a browser ignores a link's
//     `download` attribute across origins - without that header the link
//     would open the picture in a tab instead of saving it.
//
// A scan that was tiled before downloads existed is NOT re-tiled: the next
// run cuts and uploads its downloads only, and adds them to its entry.
//
// The chosen rungs are written into iiif-images.json, so images.ts reads them
// rather than recomputing them - one place decides, the other obeys.
//
// VERSION is stored on every entry. Bumping it makes the next run redo every
// scan without --force, which is how a change to the rungs rolls out.
//
// The content hash is part of each image's address, so replacing a scan gives
// it a new address; old tiles can never be served from a stale cache. That is
// also why uploads can be marked immutable.
//
// Output is sRGB JPEG with ALL metadata stripped (sharp's default), so GPS and
// camera EXIF never reach the web. The downloads are re-encoded for the same
// reason - the scan's own bytes are never uploaded - and carry one line of
// EXIF written here, DOWNLOAD_NOTE, so a copy that leaves the site still says
// where it came from.

import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import {
  existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, dirname, extname, join, relative, sep } from 'node:path';
import sharp from 'sharp';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

// ── Settings ──────────────────────────────────────────────────────────────
const MANIFEST_PATH = 'src/data/collections/iiif-images.json';
const TILE = 512;
const VERSION = 2;
const TILE_QUALITY = 85;
const JPG_QUALITY = 82;
const INDEX_RUNGS = [340, 680];
const VIEW_RUNGS = [800, 1200, 1900];
const DETAIL_LONG = 2600;
const STUDY_LONG = 5000;
const STUDY_MIN_GAIN = 1.3;
// WebP quality per rung, as images.ts had it: the study rung holds at 80
// because compression in a pencil stroke is exactly what it exists to avoid.
const WEBP_QUALITY = { index: 82, view: 80, detail: 82, study: 80 };
// Downloads. The full copy is the scan at its own size; the sharing copy is
// DETAIL_LONG on its long edge, and is skipped unless the scan is at least
// SHARE_MIN_GAIN times that - two files of nearly the same size are one file.
const DOWNLOAD_DIR = 'download';
const DOWNLOAD_QUALITY = 90;
const SHARE_QUALITY = 88;
const SHARE_LONG = DETAIL_LONG;
const SHARE_MIN_GAIN = 1.3;
// Written into each download's EXIF ImageDescription, followed by the scan's
// path. Plain ASCII: EXIF text fields are not reliably anything else.
const DOWNLOAD_NOTE = 'From the family collections at austinlallison.com/collections';
const UPLOAD_CONCURRENCY = 16;
const SOURCE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.tif', '.tiff']);

// ── Environment ───────────────────────────────────────────────────────────
function env(key) {
  const value = process.env[key];
  if (!value) {
    console.error(`Missing ${key} in .env`);
    process.exit(1);
  }
  return value;
}

const args = process.argv.slice(2);
const DRY = args.includes('--dry-run');
const FORCE = args.includes('--force');
const onlyAt = args.indexOf('--only');
const ONLY = onlyAt >= 0 ? args[onlyAt + 1] : null;

const SCANS_DIR = env('SCANS_DIR');
const IIIF_BASE = env('IIIF_BASE').replace(/\/+$/, '');
const BUCKET = DRY ? null : env('R2_BUCKET');

const s3 = DRY ? null : new S3Client({
  region: 'auto',
  endpoint: `https://${env('R2_ACCOUNT_ID')}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env('R2_ACCESS_KEY_ID'),
    secretAccessKey: env('R2_SECRET_ACCESS_KEY'),
  },
});

sharp.cache(false); // large scans one after another; don't hold them in memory

// ── Helpers ───────────────────────────────────────────────────────────────
function walk(dir, keep = () => true) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(path, keep));
    else if (keep(entry.name)) out.push(path);
  }
  return out;
}

const toPosix = (p) => p.split(sep).join('/');

// Keeps URLs safe: letters, digits, dot, dash, underscore. Accents folded.
function slugPart(s) {
  return s
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Za-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// "swann/1923 portrait.jpg" + hash → iiif/3/swann/1923-portrait-<hash10>
function addressFor(rel, hash) {
  const parts = rel.split('/');
  const file = parts.pop();
  const stem = slugPart(file.slice(0, file.length - extname(file).length));
  return {
    prefix: ['iiif', '3', ...parts.map(slugPart)].join('/'),
    name: `${stem}-${hash.slice(0, 10)}`,
    stem,
  };
}

// The oriented, flattened, sRGB pipeline every output is cut from.
// rotate() honours camera orientation; flatten() is a no-op without alpha.
const pipelineFor = (src) =>
  sharp(src, { limitInputPixels: false })
    .rotate()
    .flatten({ background: '#ffffff' })
    .toColourspace('srgb');

const CONTENT_TYPES = { '.jpg': 'image/jpeg', '.webp': 'image/webp', '.json': 'application/json' };

// Anything under download/ is saved, not shown: see the header.
const isDownload = (key) => key.split('/').at(-2) === DOWNLOAD_DIR;

async function upload(key, file) {
  for (let attempt = 1; ; attempt++) {
    try {
      await s3.send(new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: readFileSync(file),
        ContentType: CONTENT_TYPES[extname(file)] ?? 'application/octet-stream',
        CacheControl: 'public, max-age=31536000, immutable',
        ...(isDownload(key)
          ? { ContentDisposition: `attachment; filename="${basename(key)}"` }
          : {}),
      }));
      return;
    } catch (err) {
      if (attempt >= 4) throw err;
      await new Promise((r) => setTimeout(r, 500 * 2 ** attempt));
    }
  }
}

async function pool(items, limit, fn) {
  let next = 0;
  const worker = async () => {
    while (next < items.length) await fn(items[next++]);
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
}

function saveManifest(manifest) {
  const sorted = Object.fromEntries(
    Object.keys(manifest).sort().map((k) => [k, manifest[k]]),
  );
  mkdirSync(dirname(MANIFEST_PATH), { recursive: true });
  writeFileSync(MANIFEST_PATH, JSON.stringify(sorted, null, 2) + '\n');
}

// ── Downloads ─────────────────────────────────────────────────────────────
// Cuts the download files for one scan into <root>/download and returns what
// goes in the manifest. File names are the scan's own name, so what lands in
// someone's Downloads folder says what it is.
async function cutDownloads(base, root, rel, stem, W, H) {
  const dir = join(root, DOWNLOAD_DIR);
  mkdirSync(dir, { recursive: true });

  const stamp = (img) =>
    typeof img.withExif === 'function'
      ? img.withExif({ IFD0: { ImageDescription: `${DOWNLOAD_NOTE}. File: ${rel}` } })
      : img; // an older sharp: the copy is simply unmarked

  const write = async (img, file, quality, width, height) => {
    const out = await stamp(img).jpeg({ quality }).toFile(join(dir, file));
    return { file, width, height, bytes: out.size };
  };

  const full = await write(base.clone(), `${stem}.jpg`, DOWNLOAD_QUALITY, W, H);

  const longEdge = Math.max(W, H);
  let share = null;
  if (longEdge >= SHARE_LONG * SHARE_MIN_GAIN) {
    const w = Math.max(1, Math.round((W * SHARE_LONG) / longEdge));
    const h = Math.max(1, Math.round((H * SHARE_LONG) / longEdge));
    share = await write(
      base.clone().resize(w, h, { fit: 'fill' }),
      `${stem}-${SHARE_LONG}px.jpg`, SHARE_QUALITY, w, h,
    );
  }
  return { full, share };
}

// A scan tiled before downloads existed: cut and upload those alone.
async function addDownloads(src, rel, hash, entry) {
  const { prefix, name, stem } = addressFor(rel, hash);
  const work = join(tmpdir(), `iiif-${process.pid}-${hash.slice(0, 10)}-dl`);
  rmSync(work, { recursive: true, force: true });
  mkdirSync(work, { recursive: true });
  try {
    const download = await cutDownloads(pipelineFor(src), work, rel, stem, entry.width, entry.height);
    const files = walk(work);
    if (!DRY) {
      await pool(files, UPLOAD_CONCURRENCY, (f) =>
        upload(`${prefix}/${name}/${toPosix(relative(work, f))}`, f));
    }
    return download;
  } finally {
    rmSync(work, { recursive: true, force: true });
  }
}

// ── One face ──────────────────────────────────────────────────────────────
async function processImage(src, rel, hash) {
  const { prefix, name, stem } = addressFor(rel, hash);
  const serviceId = `${IIIF_BASE}/${prefix}/${name}`;
  const work = join(tmpdir(), `iiif-${process.pid}-${hash.slice(0, 10)}`);
  rmSync(work, { recursive: true, force: true });
  mkdirSync(work, { recursive: true });

  try {
    const base = pipelineFor(src);

    // Tiles at every zoom level, up to full resolution.
    await base.clone()
      .jpeg({ quality: TILE_QUALITY })
      .tile({ size: TILE, overlap: 0, layout: 'iiif3', id: `${IIIF_BASE}/${prefix}` })
      .toFile(join(work, name));

    const root = join(work, name);
    const infoPath = join(root, 'info.json');
    const info = JSON.parse(readFileSync(infoPath, 'utf8'));
    const { width: W, height: H } = info; // oriented pixel size, from libvips

    // The site's rungs. Never upscale; duplicates collapse.
    const unique = (ws) => [...new Set(ws)];
    const longEdge = Math.max(W, H);
    const widthForLong = (target) =>
      Math.max(1, Math.round((W * Math.min(target, longEdge)) / longEdge));
    const detail = widthForLong(DETAIL_LONG);
    const studyW = widthForLong(STUDY_LONG);
    const rungs = {
      index: unique(INDEX_RUNGS.map((w) => Math.min(w, W))),
      view: unique(VIEW_RUNGS.map((w) => Math.min(w, W))),
      detail,
      study: studyW >= detail * STUDY_MIN_GAIN ? studyW : null,
    };

    // Width -> webp quality. Set in rising order of importance so a width that
    // serves two rungs gets the later rung's setting.
    const quality = new Map();
    for (const w of rungs.index) quality.set(w, WEBP_QUALITY.index);
    for (const w of rungs.view) quality.set(w, WEBP_QUALITY.view);
    quality.set(rungs.detail, WEBP_QUALITY.detail);
    if (rungs.study) quality.set(rungs.study, WEBP_QUALITY.study);

    for (const [w, q] of quality) {
      const h = Math.max(1, Math.round((H * w) / W));
      const dir = join(root, 'full', `${w},${h}`, '0');
      mkdirSync(dir, { recursive: true });
      const sized = base.clone().resize(w, h, { fit: 'fill' });
      await sized.clone().jpeg({ quality: JPG_QUALITY }).toFile(join(dir, 'default.jpg'));
      await sized.clone().webp({ quality: q }).toFile(join(dir, 'default.webp'));
    }

    // List every pre-made full image (libvips writes one small one of its own)
    // so level-0 viewers only ask for sizes that exist.
    const fullDir = join(root, 'full');
    const sizes = existsSync(fullDir)
      ? readdirSync(fullDir)
          .map((d) => d.match(/^(\d+),(\d+)$/))
          .filter(Boolean)
          .map(([, w, h]) => ({ width: Number(w), height: Number(h) }))
          .sort((a, b) => a.width - b.width)
      : [];

    Object.assign(info, {
      '@context': 'http://iiif.io/api/image/3/context.json',
      id: serviceId,
      type: 'ImageService3',
      protocol: 'http://iiif.io/api/image',
      profile: 'level0',
      width: W,
      height: H,
      sizes,
    });
    writeFileSync(infoPath, JSON.stringify(info, null, 2));

    // After `sizes` is read, so the downloads are not listed as IIIF sizes.
    const download = await cutDownloads(base, root, rel, stem, W, H);

    const files = walk(root);
    if (!DRY) {
      await pool(files, UPLOAD_CONCURRENCY, (f) =>
        upload(`${prefix}/${name}/${toPosix(relative(root, f))}`, f));
    }

    return {
      entry: { v: VERSION, id: serviceId, width: W, height: H, sizes, rungs, hash, download },
      files: files.length,
    };
  } finally {
    rmSync(work, { recursive: true, force: true });
  }
}

// ── Run ───────────────────────────────────────────────────────────────────
const manifest = existsSync(MANIFEST_PATH)
  ? JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'))
  : {};

const all = walk(SCANS_DIR, (n) => SOURCE_EXTS.has(extname(n).toLowerCase()));
const sources = all.filter((p) => !ONLY || toPosix(relative(SCANS_DIR, p)).includes(ONLY));

console.log(`${sources.length} scan(s) in ${SCANS_DIR}${DRY ? '  (dry run: nothing uploaded)' : ''}`);

let done = 0, skipped = 0, failed = 0, tiles = 0, topped = 0;
const started = Date.now();

for (const src of sources) {
  const rel = toPosix(relative(SCANS_DIR, src));
  const hash = createHash('sha256').update(readFileSync(src)).digest('hex');

  if (!FORCE && manifest[rel]?.hash === hash && manifest[rel]?.v === VERSION) {
    if (manifest[rel].download) {
      skipped++;
      continue;
    }
    // Tiled already, but from before downloads: add those and nothing else.
    const t0 = Date.now();
    try {
      const download = await addDownloads(src, rel, hash, manifest[rel]);
      topped++;
      if (!DRY) {
        manifest[rel].download = download;
        saveManifest(manifest);
      }
      const secs = ((Date.now() - t0) / 1000).toFixed(1);
      const mb = (download.full.bytes / 1e6).toFixed(1);
      console.log(`+ ${rel}  downloads added  ${mb} MB${download.share ? ' + sharing copy' : ''}  ${secs}s`);
    } catch (err) {
      failed++;
      console.error(`✗ ${rel}: ${err.message}`);
    }
    continue;
  }

  const t0 = Date.now();
  try {
    const { entry, files } = await processImage(src, rel, hash);
    tiles += files;
    done++;
    if (!DRY) {
      manifest[rel] = entry;
      saveManifest(manifest); // after every image, so an interrupted run resumes
    }
    const secs = ((Date.now() - t0) / 1000).toFixed(1);
    console.log(`✓ ${rel}  ${entry.width}×${entry.height}  ${files} files  ${secs}s`);
    console.log(`    ${entry.id}/info.json`);
  } catch (err) {
    failed++;
    console.error(`✗ ${rel}: ${err.message}`);
  }
}

// Records whose scan has gone missing. Their tiles stay in R2; nothing is deleted.
if (!ONLY) {
  const present = new Set(all.map((p) => toPosix(relative(SCANS_DIR, p))));
  const orphans = Object.keys(manifest).filter((k) => !present.has(k));
  if (orphans.length) {
    console.warn(`\n${orphans.length} manifest entr${orphans.length === 1 ? 'y has' : 'ies have'} no scan:`);
    for (const o of orphans) console.warn(`  ${o}`);
  }
}

const mins = ((Date.now() - started) / 60000).toFixed(1);
console.log(`\n${done} processed, ${topped} given downloads, ${skipped} unchanged, ${failed} failed, ${tiles} files, ${mins} min`);

// Face crops are cut from these same scans, so any face on a scan processed
// above is now stale. Recut them while the scans are at hand. The child
// inherits SCANS_DIR from this process's environment.
if (!DRY && done) {
  console.log('\nUpdating face crops...');
  const faces = spawnSync(process.execPath, ['scripts/faces.mjs'], { stdio: 'inherit' });
  if (faces.status !== 0) {
    console.error('Face crops did not finish. Fix the problem above, then run: npm run faces');
    process.exit(1);
  }
}

if (failed) process.exit(1);
