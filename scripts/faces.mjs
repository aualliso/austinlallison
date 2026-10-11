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
//
// PRIVATE FACES (2026-10). The face of a living person, and any face on a
// private photograph, is not a file in this project at all: it is cut the
// same way and uploaded to the PRIVATE bucket (faces/<id>.webp), where
// functions/collections/[[path]].js serves it to signed-in family. Which
// faces those are is decided in src/data/collections/index.ts (`store` on a
// face) and only followed here. Three things come of that:
//   - a face that BECOMES private is cut, uploaded, and its files deleted
//     from public/collections/faces/ by the tidy at the end - commit that;
//   - a face that becomes public again is cut into the folder as before;
//   - a dead person's face on a private photograph may be published on its
//     own when no living person is inside the crop (`fromWithheld`). Its
//     file has a name that does not contain the photograph's slug.
// The key gained a seventh part, pub or priv, so a move is seen as stale
// like any other change. An older six-part key is read as pub.
// Uploading needs the R2 settings in .env, R2_PRIVATE_BUCKET among them.
//
// --check NEVER FAILS OVER A PRIVATE FACE. A face marked private and not yet
// moved is left out of the site by the build itself (scripts/family.mjs
// takes its file out of dist/), so marking someone living and pushing always
// deploys - the crop just is not there for family until this has been run.

import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// ── Settings ──────────────────────────────────────────────────────────────
const GENERATOR = 1;
// How much larger than the recorded region the crop is: FACE_MARGIN in
// src/data/collections/index.ts, read below with the faces. It lives there
// because that file also has to know exactly what a crop takes in.
const QUALITY = 84;
/** Where private crops go in the private bucket. */
const PRIVATE_PREFIX = 'faces';

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

const filesOf = (stem) => [`${stem}.webp`, `${stem}@2x.webp`];

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
      // EVERY face, private ones included, each saying where its file goes
      // (`store`) and what it is called (`crop`: the id, except for a face
      // published from a private photograph).
      faces: data.PRIVACY.faces,
      FACE_W: data.FACE_W,
      FACE_H: data.FACE_H,
      MARGIN: data.FACE_MARGIN,
      // The crop rectangle. The same function the data file checks with.
      rectOf: data.faceCropRect,
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
  'it moved between the public folder and the private bucket',
];
const storePart = (face) => (face.store === 'private' ? 'priv' : 'pub');
/** A key from before the seventh part existed was a public crop. */
const whole = (key) => (key.split('|').length === 6 ? `${key}|pub` : key);

const keyOf = (face, entry, FACE_W, FACE_H) =>
  [
    `g${GENERATOR}`,
    entry.hash.slice(0, 16),
    [face.region.x, face.region.y, face.region.w, face.region.h].join(','),
    `m${MARGIN}`,
    `${FACE_W}x${FACE_H}`,
    `q${QUALITY}`,
    storePart(face),
  ].join('|');

function whyStale(was, now) {
  const a = was.split('|');
  const b = now.split('|');
  const changed = PARTS.filter((_, i) => a[i] !== b[i]);
  return changed.length ? changed.join(', ') : 'its record is unreadable';
}

// ── Plan ──────────────────────────────────────────────────────────────────
const { faces, FACE_W, FACE_H, MARGIN, rectOf } = await loadFaces();
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
  const had = manifest[face.id] ? whole(manifest[face.id]) : null;
  let reason = null;
  if (!had) reason = 'new';
  else if (had !== key) reason = whyStale(had, key);
  // Only a public crop is a file here; a private one is in the bucket.
  else if (face.store !== 'private' && !filesOf(face.crop).every((n) => existsSync(join(OUT_DIR, n)))) reason = 'file missing';
  else if (FORCE) reason = 'forced';
  return { face, scan, key, had, reason };
});

// The folder holds the PUBLIC crops and nothing else. A crop that has become
// private, or changed its name, is a stray like any other and is removed.
const wanted = new Set(faces.filter((f) => f.store !== 'private').flatMap((f) => filesOf(f.crop)));
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
  const stale = plan.filter((p) => p.reason && p.reason !== 'forced');
  // Never a reason to stop a deploy: see the header.
  const soft = stale.filter((p) => p.face.store === 'private' || p.face.fromWithheld);
  const bad = stale.filter((p) => !soft.includes(p));
  if (soft.length) {
    console.warn(
      `[faces] ${soft.length} face crop(s) belong to private photographs and have not been ` +
        `cut or moved yet. They are left out of the site until you run: npm run faces`,
    );
  }
  if (strayFiles.length) {
    // A build log is no place for the name of a private photograph, and a
    // crop's file name is made of one: those are counted, not listed.
    const hush = new Set(faces.filter((f) => f.store === 'private' || f.crop !== f.id).flatMap((f) => filesOf(f.id)));
    const named = strayFiles.filter((n) => !hush.has(n));
    console.warn(
      `[faces] ${strayFiles.length} crop file(s) match no face and will be removed ` +
        `by the next \`npm run faces\`` +
        (named.length ? `: ${named.slice(0, 5).join(', ')}${named.length > 5 ? ', ...' : ''}` : '.'),
    );
  }
  if (!bad.length) {
    console.log(`[faces] ${faces.length - soft.length} face crops up to date.`);
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
let movedIn = 0;
let failed = unresolved.length;
let bucket = null;
const NO_BUCKET =
  'this face is private and the private bucket is not set up in .env ' +
  '(R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_PRIVATE_BUCKET)';

// The private bucket, or null when .env does not describe one. Asked for
// only when a private face has to be written or removed.
async function privateBucket() {
  const need = ['R2_ACCOUNT_ID', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_PRIVATE_BUCKET'];
  if (need.some((k) => !process.env[k])) return null;
  const { S3Client, PutObjectCommand, DeleteObjectsCommand } = await import('@aws-sdk/client-s3');
  const s3 = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT || `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    forcePathStyle: !!process.env.R2_ENDPOINT,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });
  const Bucket = process.env.R2_PRIVATE_BUCKET;
  return {
    put: (Key, Body) => s3.send(new PutObjectCommand({ Bucket, Key, Body, ContentType: 'image/webp' })),
    // Best effort: a crop left behind in the private bucket harms nothing.
    remove: (keys) =>
      s3
        .send(new DeleteObjectsCommand({ Bucket, Delete: { Objects: keys.map((Key) => ({ Key })), Quiet: true } }))
        .catch(() => {}),
  };
}
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
  bucket = cuttable.some((p) => p.face.store === 'private' || p.had?.endsWith('|priv'))
    ? await privateBucket()
    : null;

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
        const rect = rectOf(p.face.region, info.width, info.height);
        const cut = sharp(data, raw).extract(rect);
        const [one, two] = filesOf(p.face.crop);
        const sized = (w, h) =>
          cut.clone().resize(w, h, { fit: 'fill', kernel: 'lanczos3' }).webp({ quality: QUALITY });
        if (p.face.store === 'private') {
          // To the private bucket, never to disk.
          if (!bucket) throw new Error(NO_BUCKET);
          await Promise.all([
            bucket.put(`${PRIVATE_PREFIX}/${one}`, await sized(FACE_W, FACE_H).toBuffer()),
            bucket.put(`${PRIVATE_PREFIX}/${two}`, await sized(FACE_W * 2, FACE_H * 2).toBuffer()),
          ]);
          movedIn++;
        } else {
          await Promise.all([
            sized(FACE_W, FACE_H).toFile(join(OUT_DIR, one)),
            sized(FACE_W * 2, FACE_H * 2).toFile(join(OUT_DIR, two)),
          ]);
          // It was private until now: its copies in the bucket are no use.
          if (p.had?.endsWith('|priv') && bucket) await bucket.remove(filesOf(p.face.id).map((n) => `${PRIVATE_PREFIX}/${n}`));
        }
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

// Tidy: crops and records for faces that no longer exist - and the files of
// faces that have just become private, which are now in the bucket instead.
for (const n of strayFiles) rmSync(join(OUT_DIR, n), { force: true });
for (const id of strayRecords) {
  if (whole(manifest[id]).endsWith('|priv')) {
    bucket ??= await privateBucket();
    if (bucket) await bucket.remove(filesOf(id).map((n) => `${PRIVATE_PREFIX}/${n}`));
  }
  delete manifest[id];
}
if (made || strayRecords.length || !existsSync(MANIFEST_PATH)) saveManifest(manifest);

const removed = strayFiles.length
  ? `, ${strayFiles.length} stray file(s) removed`
  : '';
console.log(
  `[faces] ${made} cut${movedIn ? ` (${movedIn} to the private bucket)` : ''}, ` +
    `${faces.length - todo.length} unchanged, ${failed} failed${removed}`,
);
if (movedIn || (strayFiles.length && faces.some((f) => f.store === 'private'))) {
  console.log('[faces] Commit public/collections/faces/ and faces.manifest.json so the site follows.');
}
if (failed) process.exit(1);
