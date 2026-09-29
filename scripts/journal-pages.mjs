// scripts/journal-pages.mjs
//
// Writes the `pages` list for a journal, a letter of several leaves, any
// paged item - so seventy page entries are never typed by hand.
//
//   node --env-file=.env scripts/journal-pages.mjs swann-family/midway-grange-journal
//   node --env-file=.env scripts/journal-pages.mjs swann-family/midway-grange-journal --slug midway-grange-journal
//
// The argument is the folder under SCANS_DIR: the collection's own folder,
// then the journal's folder inside it. The script:
//
//   1. lists the images in that folder in NATURAL order, so page-2 comes
//      before page-10 whatever the zero-padding;
//   2. prints the lines to paste into the item - kind, recto (the first
//      image, which is normally the cover) and pages - with each file named
//      as the site looks it up: relative to the collection folder;
//   3. says which of those files `npm run iiif` has not tiled yet, from
//      src/data/collections/iiif-images.json, so a missing upload shows up
//      here rather than as a build error later;
//   4. with --slug, writes src/data/collections/transcriptions/<slug>.md
//      with a heading for every page, ready to type under. It never
//      overwrites a file that is already there.
//
// It changes nothing else. Paste the printed lines into the item yourself,
// then add a `label` to any page whose name is not "Page n" - the covers,
// and the volume's own page numbers where they differ from image order.

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';

const SOURCE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.tif', '.tiff']);
const IIIF_JSON = 'src/data/collections/iiif-images.json';
const TX_DIR = 'src/data/collections/transcriptions';

const args = process.argv.slice(2);
const target = args.find((a) => !a.startsWith('--'));
const slugAt = args.indexOf('--slug');
const slug = slugAt >= 0 ? args[slugAt + 1] : null;

if (!target || !target.includes('/')) {
  console.error('Give the folder as <collection>/<journal folder>, e.g. swann-family/midway-grange-journal');
  process.exit(1);
}
const scans = process.env.SCANS_DIR;
if (!scans) {
  console.error('SCANS_DIR is not set. Run with: node --env-file=.env scripts/journal-pages.mjs ...');
  process.exit(1);
}

const [collection, ...rest] = target.replace(/\\/g, '/').replace(/\/+$/, '').split('/');
const folder = rest.join('/');
const dir = resolve(scans, collection, folder);
if (!existsSync(dir)) {
  console.error(`No folder at ${dir}`);
  process.exit(1);
}

const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
const files = readdirSync(dir, { withFileTypes: true })
  .filter((e) => e.isFile() && !e.name.startsWith('.') && SOURCE_EXTS.has(extname(e.name).toLowerCase()))
  .map((e) => e.name)
  .sort(collator.compare);

if (files.length === 0) {
  console.error(`No images in ${dir}`);
  process.exit(1);
}

const rel = (name) => `${folder}/${name}`;
const q = (s) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

console.log(`// ${files.length} pages from ${collection}/${folder}. Paste into the item:\n`);
console.log(`    kind: 'journal',`);
console.log(`    recto: { file: ${q(rel(files[0]))} },`);
console.log(`    pages: [`);
files.forEach((f, n) => {
  console.log(`      { file: ${q(rel(f))} },${n === 0 ? " // p1 - give it a label, e.g. label: 'Front cover'" : ''}`);
});
console.log(`    ],\n`);

// Which of these the tiler has not seen yet.
if (existsSync(IIIF_JSON)) {
  const tiled = JSON.parse(readFileSync(IIIF_JSON, 'utf8'));
  const missing = files.filter((f) => !tiled[`${collection}/${rel(f)}`]);
  if (missing.length === 0) {
    console.log(`All ${files.length} pages are tiled.`);
  } else {
    console.log(
      `${missing.length} of ${files.length} pages are not tiled yet - run: npm run iiif -- --only ${folder}`
    );
  }
} else {
  console.log(`(No ${IIIF_JSON} found - run this from the project's root folder.)`);
}

// The transcription file, one heading per page.
if (slug) {
  const path = join(TX_DIR, `${slug}.md`);
  if (existsSync(path)) {
    console.log(`\n${path} already exists - left as it is.`);
  } else {
    mkdirSync(TX_DIR, { recursive: true });
    const head = [
      `Transcription of ${slug}. Nothing above the first heading is shown.`,
      `Each heading is the page's IMAGE POSITION (p1 is 1); anything after the`,
      `number is a note to yourself. Type under a heading; leave it empty until`,
      `the page is done. Line breaks are kept; spelling as written.`,
      ``,
    ];
    const body = files.map((f, n) => `## ${n + 1}  (${f})\n\n`);
    writeFileSync(path, head.join('\n') + '\n' + body.join(''));
    console.log(`\nWrote ${path} with ${files.length} page headings.`);
  }
}
