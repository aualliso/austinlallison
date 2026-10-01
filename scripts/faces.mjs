// scripts/faces.mjs
//
// FACE CROPS, cut once on your machine instead of on every build.
//
//   npm run faces                    cut every crop that is new or stale
//   npm run faces -- --force         recut every crop
//   npm run faces -- --check         verify only; exit 1 if anything is wrong
//   npm run faces -- --check --warn  verify and report, never fail
//
// `npm run build` runs --check first, so Cloudflare refuses to deploy a missing
// or stale crop. `npm run dev` runs --check --warn, so you hear about one at
// startup without being stopped. `npm run iiif` runs this script itself after
// it has processed any scan, so a replaced scan gets fresh crops straight away.
//
// WHAT A CROP IS. The recorded region, grown by MARGIN so the face has some
// head and shoulders around it, widened or heightened to the 4:5 box, and slid
// back inside the picture if it would run off an edge. It is never retouched,
// sharpened or enhanced: it is the scan, cut. Two files per face:
//   public/collections/faces/<id>.webp      FACE_W x FACE_H
//   public/collections/faces/<id>@2x.webp   twice that
// Those are the same URLs the old build-time endpoint served, so no page
// changes. That folder belongs to this script: files in it that match no face
// are deleted on the next run.
//
// WHERE THE PIXELS COME FROM. The edited JPEG in SCANS_DIR - the same file
// `npm run iiif` tiles - decoded ONCE per scan however many faces it holds,
// oriented exactly as the tiles are, so a region drawn on the site lands on
// the same pixels here.
//
// HOW STALENESS IS CAUGHT. Every crop is recorded in faces.manifest.json under
// a KEY that spells out everything that decides its pixels:
//
//   g1 | <scan hash> | <x,y,w,h> | m1.45 | 240x300 | q84
//
// generator version, the scan's content hash (from iiif-images.json, which is
// committed, so Cloudflare can check it without the scans), the face box, and
// the crop settings. Change any of them and the key no longer matches, so the
// crop is recut - and --check says which part changed. The key is a plain
// string rather than a hash of one so a diff of the manifest is readable.
//
// Bump GENERATOR when the cutting itself changes in a way the key cannot see
// (a different resize kernel, a new sharp with visibly different output).
// Every crop is then stale, and the next `npm run faces` recuts them all.

import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// ── Settings ──────────────────────────────────────────────────────────────
const GENERATOR = 1;
/** How much larger than the recorded region the crop is. */
const MARGIN = 1.45;
const QUALITY = 84;

const OUT_DIR = 'public/collections/faces';
const MANIFEST_PATH = 'src/data/collections/faces.manifest.json';
const IIIF_PATH = 'src/data/collections/iiif-images.json';
const DATA_MODULE = '/src/data/collections/index.ts';
const LIST_LIMIT = 25;

const args = process.argv.slice(2);
const CHECK = args.includes('--check');
const WARN = args.includes('--warn');
const FORCE = args.includes('--force');

// ── Helpers ───────────────────────────────────────────────────────────────
const readJson = (path, fallback) =>
  existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) : fallback;

function saveManifest(manifest) {
  const sorted = Object.fromEntries(
    Object.keys(manifest).sort().map((k) => [k, manifest[k]]),
  );
  writeFileSync(MANIFEST_PATH, JSON.stringify(sorted, null, 2) + '\n');
}

const filesOf = (id) => [`${id}.webp`, `${id}@2x.webp`];
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

/**
 * The faces, straight from src/data/collections/index.ts - the same list the
 * site builds its pages from, so this script can never disagree with them
 * about which faces exist. Loaded through Vite (it ships with Astro) because
 * index.ts is TypeScript and reads its transcriptions with import.meta.glob,
 * which plain Node cannot run. Astro's own config is NOT loaded; none of it is
 * needed to read data.
 */
async function loadFaces() {
  let createServer;
  try {
    ({ createServer } = await import('vite'));
  } catch {
    console.error('[faces] Could not load Vite, which comes with Astro. Run: npm install');
    process.exit(1);
  }
  const server = await createServer({
    configFile: false,
    root: process.cwd(),
    logLevel: 'error',
    appType: 'custom',
    server: { middlewareMode: true, hmr: false, ws: false, watch: null },
    optimizeDeps: { noDiscovery: true, include: [] },
  });
  try {
    const data = await server.ssrLoadModule(DATA_MODULE);
    return {
      faces: data.FACES.map((f) => ({
        id: f.id,
        item: f.item.slug,
        collection: f.collection,
        file: f.file,
        region: f.region,
      })),
      FACE_W: data.FACE_W,
      FACE_H: data.FACE_H,
    };
  } finally {
    await server.close();
  }
}

// ── The key ───────────────────────────────────────────────────────────────
const PARTS = [
  'the generator changed',
  'the scan was replaced',
  'the face box moved',
  'the margin changed',
  'the crop size changed',
  'the quality changed',
];

const keyOf = (face, entry, FACE_W, FACE_H) =>
  [
    `g${GENERATOR}`,
    entry.hash.slice(0, 16),
    [face.region.x, face.region.y, face.region.w, face.region.h].join(','),
    `m${MARGIN}`,
    `${FACE_W}x${FACE_H}`,
    `q${QUALITY}`,
  ].join('|');

function whyStale(was, now) {
  const a = was.split('|');
  const b = now.split('|');
  const changed = PARTS.filter((_, i) => a[i] !== b[i]);
  return changed.length ? changed.join(', ') : 'its record is unreadable';
}

// ── The crop rectangle (unchanged from the old endpoint) ──────────────────
function rectOf(region, W, H, FACE_W, FACE_H) {
  const aspect = FACE_W / FACE_H;
  const cx = ((region.x + region.w / 2) / 100) * W;
  const cy = ((region.y + region.h / 2) / 100) * H;
  let cw = (region.w / 100) * W * MARGIN;
  let ch = (region.h / 100) * H * MARGIN;
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
  return {
    left,
    top,
    width: Math.max(1, Math.min(W - left, Math.round(cw))),
    height: Math.max(1, Math.min(H - top, Math.round(ch))),
  };
}

// ── Plan ──────────────────────────────────────────────────────────────────
const { faces, FACE_W, FACE_H } = await loadFaces();
const iiif = readJson(IIIF_PATH, {});
const manifest = readJson(MANIFEST_PATH, {});

// Same lookup as plate() in images.ts: exact, then on case alone.
const byLower = new Map(Object.keys(iiif).map((k) => [k.toLowerCase(), k]));
function scanOf(face) {
  const want = `${face.collection}/${face.file}`;
  const key = iiif[want] ? want : byLower.get(want.toLowerCase());
  return key ? { rel: key, entry: iiif[key] } : null;
}

const plan = faces.map((face) => {
  const scan = scanOf(face);
  if (!scan) {
    return { face, reason: `no scan recorded for ${face.collection}/${face.file}; run: npm run iiif` };
  }
  const key = keyOf(face, scan.entry, FACE_W, FACE_H);
  const had = manifest[face.id];
  let reason = null;
  if (!had) reason = 'new';
  else if (had !== key) reason = whyStale(had, key);
  else if (!filesOf(face.id).every((n) => existsSync(join(OUT_DIR, n)))) reason = 'file missing';
  else if (FORCE) reason = 'forced';
  return { face, scan, key, reason };
});

const wanted = new Set(faces.flatMap((f) => filesOf(f.id)));
const strayFiles = existsSync(OUT_DIR)
  ? readdirSync(OUT_DIR).filter((n) => n.endsWith('.webp') && !wanted.has(n))
  : [];
const faceIds = new Set(faces.map((f) => f.id));
const strayRecords = Object.keys(manifest).filter((id) => !faceIds.has(id));

function list(rows, say = console.log) {
  for (const r of rows.slice(0, LIST_LIMIT)) {
    say(`  ${r.face.id}  (${r.face.item}): ${r.reason}`);
  }
  if (rows.length > LIST_LIMIT) say(`  ...and ${rows.length - LIST_LIMIT} more`);
}

// ── Check ─────────────────────────────────────────────────────────────────
if (CHECK) {
  const bad = plan.filter((p) => p.reason && p.reason !== 'forced');
  if (strayFiles.length) {
    console.warn(
      `[faces] ${strayFiles.length} crop file(s) match no face and will be removed ` +
        `by the next \`npm run faces\`: ${strayFiles.slice(0, 5).join(', ')}` +
        (strayFiles.length > 5 ? ', ...' : ''),
    );
  }
  if (!bad.length) {
    console.log(`[faces] ${faces.length} face crops up to date.`);
    process.exit(0);
  }
  const say = WARN ? console.warn : console.error;
  say(`\n[faces] ${bad.length} of ${faces.length} face crops are missing or out of date:`);
  list(bad, say);
  say(`\nRun: npm run faces   (on the machine that has the scans)\n`);
  process.exit(WARN ? 0 : 1);
}

// ── Cut ───────────────────────────────────────────────────────────────────
const todo = plan.filter((p) => p.reason);
const unresolved = todo.filter((p) => !p.scan);
const cuttable = todo.filter((p) => p.scan);

let made = 0;
let failed = unresolved.length;
if (unresolved.length) {
  console.error(`[faces] ${unresolved.length} face(s) have no scan to cut from:`);
  list(unresolved, console.error);
}

if (cuttable.length) {
  const SCANS_DIR = process.env.SCANS_DIR;
  if (!SCANS_DIR) {
    console.error('[faces] Missing SCANS_DIR in .env - cutting crops needs the scans.');
    process.exit(1);
  }
  const { default: sharp } = await import('sharp');
  sharp.cache(false); // large scans one after another; don't hold them in memory
  mkdirSync(OUT_DIR, { recursive: true });

  // One decode per scan, however many faces are on it.
  const byScan = new Map();
  for (const p of cuttable) {
    if (!byScan.has(p.scan.rel)) byScan.set(p.scan.rel, []);
    byScan.get(p.scan.rel).push(p);
  }
  console.log(`[faces] cutting ${cuttable.length} crop(s) from ${byScan.size} scan(s)`);

  for (const [rel, group] of byScan) {
    const { entry } = group[0].scan;
    const src = join(SCANS_DIR, ...rel.split('/'));
    const t0 = Date.now();
    try {
      if (!existsSync(src)) throw new Error(`scan not found at ${src}`);
      // The tiles were cut from a file with this hash. Cutting faces from a
      // DIFFERENT file would make them disagree with what Examine shows.
      const hash = createHash('sha256').update(readFileSync(src)).digest('hex');
      if (hash !== entry.hash) {
        throw new Error('the scan has changed since it was tiled; run npm run iiif first');
      }

      // Oriented, flattened and in sRGB exactly as iiif-tiles.mjs prepares
      // it, so region percentages land on the same pixels as on the site.
      const { data, info } = await sharp(src, { limitInputPixels: false })
        .rotate()
        .flatten({ background: '#ffffff' })
        .toColourspace('srgb')
        .raw()
        .toBuffer({ resolveWithObject: true });
      if (info.width !== entry.width || info.height !== entry.height) {
        throw new Error(
          `decoded at ${info.width}x${info.height} but tiled at ${entry.width}x${entry.height}; ` +
            'run npm run iiif -- --force --only ' + rel,
        );
      }
      const raw = { raw: { width: info.width, height: info.height, channels: info.channels } };

      for (const p of group) {
        const rect = rectOf(p.face.region, info.width, info.height, FACE_W, FACE_H);
        const cut = sharp(data, raw).extract(rect);
        const [one, two] = filesOf(p.face.id);
        await Promise.all([
          cut.clone()
            .resize(FACE_W, FACE_H, { fit: 'fill', kernel: 'lanczos3' })
            .webp({ quality: QUALITY })
            .toFile(join(OUT_DIR, one)),
          cut.clone()
            .resize(FACE_W * 2, FACE_H * 2, { fit: 'fill', kernel: 'lanczos3' })
            .webp({ quality: QUALITY })
            .toFile(join(OUT_DIR, two)),
        ]);
        manifest[p.face.id] = p.key;
        made++;
      }
      saveManifest(manifest); // after every scan, so an interrupted run resumes
      const secs = ((Date.now() - t0) / 1000).toFixed(1);
      console.log(`  \u2713 ${rel}  ${group.length} face(s)  ${secs}s`);
    } catch (err) {
      failed += group.length;
      console.error(`  \u2717 ${rel}: ${err.message}`);
      for (const p of group) console.error(`      ${p.face.id}`);
    }
  }
}

// Tidy: crops and records for faces that no longer exist.
for (const n of strayFiles) rmSync(join(OUT_DIR, n), { force: true });
for (const id of strayRecords) delete manifest[id];
if (made || strayRecords.length || !existsSync(MANIFEST_PATH)) saveManifest(manifest);

const removed = strayFiles.length
  ? `, ${strayFiles.length} stray file(s) removed`
  : '';
console.log(
  `[faces] ${made} cut, ${faces.length - todo.length} unchanged, ${failed} failed${removed}`,
);
if (failed) process.exit(1);
