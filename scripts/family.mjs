// scripts/family.mjs
//
// THE FAMILY SIDE OF THE BUILD. Runs after `astro build`, as part of
// `npm run build` (so on Cloudflare too), and on its own for two reports.
//
//   node scripts/family.mjs               the build step (see below)
//   npm run private                       what is private, and why
//   npm run private -- --all              the same, with no list cut short
//   npm run dev:public                    the dev server, showing the PUBLIC site
//
// WHAT THE BUILD STEP DOES
//   `astro build` has just made the public site in dist/: no private
//   photograph, no living person. This script then
//
//   1. builds the collections pages AGAIN, for family, into a scratch folder
//      (COLLECTIONS_AUDIENCE=family; about ten seconds, the images are
//      already made);
//   2. compares the two. Most pages are the same for family as for anyone,
//      and those are left alone. A page that DIFFERS - it lists a private
//      photograph, or it is one - is ENCRYPTED and put in dist/_family/;
//   3. writes an encrypted list of which addresses those are, for
//      functions/collections/[[path]].js, which decrypts them for a
//      signed-in relative;
//   4. checks the public site once more for anything private (the address
//      of a private item, a living person's page, a private scan or face
//      crop) and STOPS THE BUILD if it finds one;
//   5. deletes the scratch folder.
//
//   So what is deployed is the public site plus some files nobody can read
//   without FAMILY_KEY. Nothing private is ever a plain file there.
//
// FAMILY_KEY is the key. It is a secret on the Cloudflare Pages project (the
// function needs the same one) and the build must be able to see it. Put it
// in .env as well if you ever run `npm run build` on your own machine and
// want the family pages made; without it a local build makes the public
// site only, and says so. On Cloudflare a missing key stops the build.
//
// WHEN NOTHING IS PRIVATE the script does nothing at all.

import { spawnSync } from 'node:child_process';
import { createCipheriv, createHash, createHmac } from 'node:crypto';
import {
  copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync,
} from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, extname, join, relative, sep } from 'node:path';

const DIST = 'dist';
const SCRATCH = '.family-dist';
const SEALED = join(DIST, '_family');
const DATA_MODULE = '/src/data/collections/index.ts';
const IIIF_PATH = 'src/data/collections/iiif-images.json';
// How many lines of any one list are printed. `npm run private -- --all`
// prints every line.
const LIST_LIMIT = process.argv.includes('--all') ? Infinity : 40;

// The environment as this script was given it, kept before anything below
// can change it: loading the records goes through Vite, and Vite sets
// NODE_ENV to "development" for the whole process. The family build is
// started from this copy, so it is built exactly as the public one was -
// which is what lets the two be compared file for file.
const ENV_AT_START = { ...process.env };

const args = process.argv.slice(2);
const REPORT = args.includes('--report');
const DEV_PUBLIC = args.includes('--dev-public');
const ON_CLOUDFLARE = !!process.env.CF_PAGES;

const astroBin = () => {
  const require = createRequire(import.meta.url);
  const pkg = require.resolve('astro/package.json');
  return join(dirname(pkg), JSON.parse(readFileSync(pkg, 'utf8')).bin.astro);
};

// ── The dev server, as the public see the site ────────────────────────────
if (DEV_PUBLIC) {
  const run = spawnSync(process.execPath, [astroBin(), 'dev'], {
    stdio: 'inherit',
    env: { ...ENV_AT_START, COLLECTIONS_AUDIENCE: 'public' },
  });
  process.exit(run.status ?? 0);
}

// ── What is private ───────────────────────────────────────────────────────
// Straight from src/data/collections/index.ts, loaded through Vite exactly
// as scripts/faces.mjs loads it (see the note there).
async function loadPrivacy() {
  let createServer;
  try {
    ({ createServer } = await import('vite'));
  } catch {
    console.error('[family] Could not load Vite, which comes with Astro. Run: npm install');
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
    return { privacy: data.PRIVACY, named: REPORT ? data.livingNamedInPublic() : [], years: data.LIVING_YEARS };
  } finally {
    await server.close();
  }
}

const { privacy, named, years } = await loadPrivacy();
const readJson = (path, fallback) => (existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) : fallback);
const iiif = readJson(IIIF_PATH, {});
const plural = (n, one, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

// ── The report ────────────────────────────────────────────────────────────
if (REPORT) {
  const list = (rows, line) => {
    for (const r of rows.slice(0, LIST_LIMIT)) console.log(`  ${line(r)}`);
    if (rows.length > LIST_LIMIT) console.log(`  ...and ${rows.length - LIST_LIMIT} more`);
  };
  const marked = privacy.living.filter((p) => p.why.startsWith('marked'));
  const presumed = privacy.living.filter((p) => !p.why.startsWith('marked'));
  const whole = privacy.items.filter((i) => i.whole);
  const paged = privacy.items.filter((i) => !i.whole);

  console.log(`\nLIVING PEOPLE  ${privacy.living.length}`);
  if (marked.length) {
    console.log(` Marked living: true (${marked.length})`);
    list(marked, (p) => p.name);
  }
  if (presumed.length) {
    console.log(` Presumed living (${presumed.length}) - no death year, and nothing shows a birth more than ${years} years ago.`);
    console.log(`  If one of these has died, enter the death year, or living: false if you do not have it.`);
    list(presumed, (p) => `${p.name}  [${p.why.replace(/^presumed: /, '')}]`);
  }
  if (!privacy.living.length) console.log('  none');

  console.log(`\nPRIVATE ITEMS  ${whole.length}`);
  list(whole, (i) => `${i.collection}/${i.slug}  -  ${i.why.join('; ')}`);
  if (!whole.length) console.log('  none');

  if (paged.length) {
    console.log(`\nITEMS WITH PRIVATE PAGES  ${paged.length}`);
    list(paged, (i) => `${i.collection}/${i.slug}  -  ${i.pages.join(', ')}  -  ${i.why.join('; ')}`);
  }

  const fromWithheld = privacy.faces.filter((f) => f.fromWithheld);
  console.log(`\nFACES`);
  console.log(`  ${privacy.faces.filter((f) => f.store === 'private').length} private (served to family only)`);
  console.log(`  ${fromWithheld.length} of people who have died, published from private photographs`);
  if (privacy.heldFaces.length) {
    console.log(` Kept private though the person has died (${privacy.heldFaces.length}):`);
    list(privacy.heldFaces, (f) => `${f.id}  -  ${f.why}`);
  }

  const lower = new Map(Object.keys(iiif).map((k) => [k.toLowerCase(), k]));
  const toMove = privacy.scans.filter((k) => lower.has(k) && iiif[lower.get(k)].store !== 'private');
  const toReturn = Object.keys(iiif).filter((k) => iiif[k].store === 'private' && !privacy.scans.includes(k.toLowerCase()));
  const stillPublic = Object.keys(iiif).filter((k) => iiif[k].publicCopy || iiif[k].publicStale?.length);
  console.log(`\nSCANS  ${privacy.scans.length} private`);
  if (toMove.length) console.log(`  ${plural(toMove.length, 'scan')} to move to the private bucket      ->  npm run iiif`);
  if (toReturn.length) console.log(`  ${plural(toReturn.length, 'scan')} to move back to the public bucket   ->  npm run iiif`);
  if (stillPublic.length) console.log(`  ${plural(stillPublic.length, 'private scan')} with a copy still in the public bucket  ->  npm run iiif -- --purge  (once the new site is live)`);
  if (!toMove.length && !toReturn.length && !stillPublic.length) console.log('  every scan is in the right bucket');

  console.log(`\nLIVING PEOPLE NAMED IN PUBLIC RECORDS  ${named.length}`);
  if (named.length) {
    console.log('  These records are public, and the words are yours: they are published as written.');
    list(named, (n) => `${n.where}  -  "${n.found}"`);
  } else {
    console.log('  none found');
  }
  console.log('');
  process.exit(0);
}

// ── The build step ────────────────────────────────────────────────────────
// Scans in the wrong bucket. A private scan still in the public bucket only
// means `npm run iiif` has not been run: the pages already leave it out, so
// the build goes on. A PUBLIC scan whose tiles are in the private bucket
// would be a broken picture on the public site, so that one stops it.
{
  const want = new Set(privacy.scans);
  const late = [];
  const wrong = [];
  for (const [rel, e] of Object.entries(iiif)) {
    const isPrivate = want.has(rel.toLowerCase());
    if (isPrivate && e.store !== 'private') late.push(rel);
    if (!isPrivate && e.store === 'private') wrong.push(rel);
  }
  if (late.length) {
    console.warn(
      `[family] ${plural(late.length, 'private scan')} still in the public bucket only. They are off the ` +
        `public pages already; to take the files themselves out, run: npm run iiif`
    );
  }
  if (wrong.length) {
    console.error(
      `[family] ${plural(wrong.length, 'scan')} should be public again, but the tiles are in the private ` +
        `bucket:\n${wrong.slice(0, LIST_LIMIT).map((r) => `  ${r}`).join('\n')}\nRun: npm run iiif   then build again.`
    );
    process.exit(1);
  }
}

const anything = privacy.living.length || privacy.items.length;
rmSync(SEALED, { recursive: true, force: true });
if (!anything) {
  console.log('[family] Nothing is private. The site is the same for everyone.');
  process.exit(0);
}
if (!existsSync(join(DIST, 'collections'))) {
  console.error('[family] dist/collections is not there. This runs after `astro build`.');
  process.exit(1);
}

// Whatever happens below, a private face crop is never deployed as a plain
// file. `npm run faces` moves them out of public/collections/faces/; until
// it has been run they would still be copied into dist/, so they are taken
// out here.
{
  let removed = 0;
  for (const f of privacy.faces) {
    // A private face; or one published from a private photograph, whose old
    // file is named after that photograph and whose new one is not.
    if (f.store !== 'private' && f.crop === f.id) continue;
    for (const name of [`${f.id}.webp`, `${f.id}@2x.webp`]) {
      const path = join(DIST, 'collections', 'faces', name);
      if (existsSync(path)) {
        rmSync(path);
        removed++;
      }
    }
  }
  if (removed) {
    console.warn(
      `[family] ${plural(removed, 'private face crop')} left out of the site. ` +
        `They are still in public/collections/faces/; run: npm run faces`
    );
  }
}

const KEY = (process.env.FAMILY_KEY ?? '').trim();
if (!KEY) {
  if (ON_CLOUDFLARE) {
    console.error(
      '[family] FAMILY_KEY is not set for this build, and there are private items.\n' +
        'Add it to the Pages project (Settings > Variables and Secrets), for Production and Preview.\n' +
        'If it is there as a secret and the build still cannot see it, add it as plain text instead:\n' +
        'the build can only use what it is given.'
    );
    process.exit(1);
  }
  console.warn(
    '[family] No FAMILY_KEY, so the family pages were not made. dist/ holds the public site only, ' +
      'which is complete. To make them here too, put FAMILY_KEY in .env.'
  );
  process.exit(0);
}

// 1. The family build.
rmSync(SCRATCH, { recursive: true, force: true });
console.log('[family] Building the family pages...');
{
  const run = spawnSync(process.execPath, [astroBin(), 'build', '--outDir', SCRATCH], {
    env: { ...ENV_AT_START, COLLECTIONS_AUDIENCE: 'family' },
    encoding: 'utf8',
    maxBuffer: 256 * 1024 * 1024,
  });
  if (run.status !== 0) {
    console.error(run.stdout?.slice(-4000) ?? '');
    console.error(run.stderr?.slice(-4000) ?? '');
    console.error('[family] The family build failed (above). Nothing was published from it.');
    rmSync(SCRATCH, { recursive: true, force: true });
    process.exit(1);
  }
}

// 2. Compare, and seal what differs.
function walk(dir) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(path));
    else out.push(path);
  }
  return out;
}
const toPosix = (p) => p.split(sep).join('/');

/** A file under <root>/collections as the address it is served at. */
function addressOf(root, file) {
  const rel = toPosix(relative(root, file));
  if (rel.endsWith('/index.html')) return { key: `/${rel.slice(0, -'/index.html'.length)}`, dir: true };
  if (rel === 'index.html') return { key: '/', dir: true };
  return { key: `/${rel}`, dir: false };
}

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
};

// The same key the function makes: SHA-256 of this label and FAMILY_KEY.
const pagesKey = createHash('sha256').update(`family-pages\n${KEY}`).digest();
const nameFor = (address) => createHmac('sha256', pagesKey).update(`name\n${address}`).digest('hex').slice(0, 32);
/**
 * AES-256-GCM. The nonce is made from the content and the address rather
 * than drawn at random, so a page that has not changed seals to the same
 * bytes on every build and Cloudflare does not upload it again. Two
 * different contents never share a nonce.
 */
function seal(address, plain) {
  const iv = createHmac('sha256', pagesKey).update(`nonce\n${address}\n`).update(plain).digest().subarray(0, 12);
  const cipher = createCipheriv('aes-256-gcm', pagesKey, iv);
  return Buffer.concat([iv, cipher.update(plain), cipher.final(), cipher.getAuthTag()]);
}

const publicFiles = walk(join(DIST, 'collections'));
const familyFiles = walk(join(SCRATCH, 'collections'));
const index = { v: 1, public: publicFiles.map((f) => addressOf(DIST, f).key), family: {} };

mkdirSync(SEALED, { recursive: true });
let sealedCount = 0;
let sealedBytes = 0;
for (const file of familyFiles) {
  const rel = relative(SCRATCH, file);
  const twin = join(DIST, rel);
  const plain = readFileSync(file);
  if (existsSync(twin) && statSync(twin).size === plain.length && readFileSync(twin).equals(plain)) continue;
  const { key, dir } = addressOf(SCRATCH, file);
  const name = nameFor(key);
  writeFileSync(join(SEALED, `${name}.bin`), seal(key, plain));
  index.family[key] = { file: name, type: TYPES[extname(file).toLowerCase()] ?? 'application/octet-stream', dir };
  sealedCount++;
  sealedBytes += plain.length;
}
writeFileSync(join(SEALED, 'index.bin'), seal('index', Buffer.from(JSON.stringify(index))));

// The family pages use the same stylesheets and scripts as the public ones,
// under the same names, because both builds come from the same source. If
// one ever is named differently, it is copied across so the family pages
// still have it: these files are code, never content.
let copied = 0;
if (sealedCount) {
  for (const from of walk(join(SCRATCH, '_astro'))) {
    if (!['.js', '.css', '.mjs'].includes(extname(from).toLowerCase())) continue;
    const to = join(DIST, relative(SCRATCH, from));
    if (existsSync(to)) continue;
    mkdirSync(dirname(to), { recursive: true });
    copyFileSync(from, to);
    copied++;
  }
}

rmSync(SCRATCH, { recursive: true, force: true });

// 4. Look once more: nothing private in the public site.
{
  const paths = new Set(privacy.paths);
  const lower = new Map(Object.keys(iiif).map((k) => [k.toLowerCase(), k]));
  const scans = new Set(
    privacy.scans.filter((k) => lower.has(k)).map((k) => new URL(iiif[lower.get(k)].id).pathname.replace(/^\/+/, ''))
  );
  // File names that give something away: a private face's, and the old
  // name of a face now published under a name without the item's slug.
  const crops = new Set(privacy.faces.filter((f) => f.store === 'private' || f.crop !== f.id).map((f) => f.id));
  const TEXT = new Set(['.html', '.json', '.xml', '.txt', '.js', '.css', '.svg', '.webmanifest']);
  const found = [];
  for (const file of walk(DIST)) {
    const rel = toPosix(relative(DIST, file));
    if (rel.startsWith('_family/') || rel.startsWith('pagefind/')) continue;
    if (rel.startsWith('collections/faces/')) {
      const stem = rel.slice('collections/faces/'.length).replace(/(@2x)?\.webp$/, '');
      if (crops.has(stem)) found.push(`${rel}: a private face crop`);
      continue;
    }
    if (!TEXT.has(extname(file).toLowerCase())) continue;
    const text = readFileSync(file, 'utf8');
    for (const m of text.matchAll(/\/collections\/[A-Za-z0-9._~%-]+\/[A-Za-z0-9._~%-]+/g)) {
      if (paths.has(m[0])) found.push(`${rel}: links to ${m[0]}`);
    }
    for (const m of text.matchAll(/iiif\/3\/[A-Za-z0-9._/-]+?-[0-9a-f]{10}(?![0-9a-f])/g)) {
      if (scans.has(m[0])) found.push(`${rel}: holds the address of a private scan`);
    }
    for (const m of text.matchAll(/collections\/(?:-\/)?faces\/([A-Za-z0-9._-]+?)(?:@2x)?\.webp/g)) {
      if (crops.has(m[1])) found.push(`${rel}: holds the address of a private face crop`);
    }
  }
  if (found.length) {
    const unique = [...new Set(found)];
    console.error(
      `[family] STOPPED: something private is in the public site (${unique.length}).\n` +
        unique.slice(0, LIST_LIMIT).map((l) => `  ${l}`).join('\n') +
        (unique.length > LIST_LIMIT ? `\n  ...and ${unique.length - LIST_LIMIT} more` : '') +
        '\nNothing was changed in your records. This is a fault in the pages, not in what you entered.'
    );
    rmSync(SEALED, { recursive: true, force: true });
    process.exit(1);
  }
}

console.log(
  `[family] ${plural(sealedCount, 'family page')} sealed (${(sealedBytes / 1e6).toFixed(1)} MB)` +
    `${copied ? `, ${plural(copied, 'asset')} copied` : ''}; ` +
    `${familyFiles.length - sealedCount} are the same for everyone. Public site checked: nothing private in it.`
);
