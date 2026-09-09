// src/data/publications/index.ts
//
// The index the publications system has never had.
//
// It does NOT restate any citation. It reads the CITATION every article data
// file already exports, so the one list of what exists is the set of files in
// this folder. Add an article the normal way (data file + page) and it appears
// on /publications with no second edit; delete one and its card goes with it.
// An article page that exists but is unreachable from the index becomes
// impossible by construction - which is how ja_cattle_company and
// newspapers_oil_and_railroad_land went missing from the hand-written page.
//
// Consumed by src/pages/publications.astro. cv.astro and the home-page
// Publications leaf can move onto it next.

import type { Citation } from '../../lib/citation';

/* ------------------------------------------------------------------ *
 * 1. Read every article data module in this folder.
 * ------------------------------------------------------------------ */

type Mod = { CITATION?: Citation; default?: Citation };

// Vite resolves this at build time. Files starting with an underscore are
// conventionally non-routable in Astro, and _template.ts is not an article.
const modules = import.meta.glob<Mod>('./*.ts', { eager: true });

const slugOf = (path: string) => path.replace(/^\.\//, '').replace(/\.ts$/, '');

/* ------------------------------------------------------------------ *
 * 2. Presentation data that is NOT citation metadata.
 *
 * A thumbnail is not a bibliographic fact, so it does not belong in
 * Citation. It belongs here, in one table, keyed by slug. Every value
 * below was carried over verbatim from the hand-written page.
 *
 * The keys are checked against the modules above at build time: a typo
 * or a renamed data file throws instead of silently dropping an image.
 * ------------------------------------------------------------------ */

export type Extra = {
  /** Path under /public. */
  thumb?: string;
  /** Real description of what is VISIBLE. Empty string = decorative. */
  alt?: string;
  /** Override the derived section. Leave unset unless the rule is wrong. */
  section?: SectionId;
};

const EXTRAS: Record<string, Extra> = {
  capitol_land_shq: {
    thumb: '/images/wiley_notes.jpg',
    alt: "H.A. Wiley's field notes",
  },
  opportunity_knocking: {
    thumb: '/images/vaughan_land_company.jpg',
    alt: 'Advertisement for the Vaughan Land Company',
  },
  spring_sprung_it: {
    thumb: '/images/spring_sprung_it.jpg',
    alt: 'The headwaters of the Missouri River',
  },
  maps_and_newspapers: {
    thumb: '/images/maps_and_newspapers/der_texas.jpg',
    alt: 'Front page of Der Texas Demokrat',
  },
  lipscomb_county_courthouse: {
    thumb: '/images/lipscomb_county.jpg',
    alt: 'The Lipscomb County courthouse',
  },
  southwest_conference: {
    thumb: '/images/southwest_conference2.jpg',
    alt: 'Southwest Conference archival memorabilia',
  },
  tumbleweed_smith: {
    thumb: '/images/tumbleweed_smith.jpg',
    alt: 'Tumbleweed Smith recording audio in Texas',
  },
  comfortably_lodged: {
    thumb: '/images/comfortably_lodged/comfortably_lodged2.jpg',
    alt: 'A historic Texas county jail converted to a museum',
  },
  unusual_annotations: {
    thumb: '/images/unusual_annotations/unusual_annotations2.png',
    alt: "Detail of the annotations on Stephen F. Austin's 1835 map of Texas",
  },
  sharps_rifle: {
    thumb: '/images/judia_buffalo_stand.jpg',
    alt: 'A buffalo hunter\u2019s stand on the South Plains',
  },
  yellow_house_canyon: {
    thumb: '/images/yellow_house_canyon/cook_image.jpg',
    alt: 'Map of Lubbock County showing Yellow House Draw, Blackwater Draw, and the site of the 1877 battle',
  },
  albert_pike: {
    thumb: '/images/albert_pike/albert_pike_crop.jpg',
    // TODO: the old page had this image carrying Yellow House Canyon's alt
    // text, which described a map it is not. I cannot see the crop, so it is
    // marked decorative until you describe it - a screen reader skipping an
    // image is a smaller failure than one being told the wrong thing.
    alt: '',
  },
  // TODO: no thumbnail yet. The cards render fine without one.
  tahoka_lake: {},
  ja_cattle_company: {},
  newspapers_oil_and_railroad_land: {},
};

/* ------------------------------------------------------------------ *
 * 3. Sections, derived from status rather than declared by hand.
 * ------------------------------------------------------------------ */

export type SectionId = 'articles' | 'notes' | 'magazines' | 'columns' | 'chapters';

export const SECTIONS: { id: SectionId; title: string }[] = [
  { id: 'articles', title: 'Peer-Reviewed and Journal Articles' },
  { id: 'notes', title: 'Notes and Shorter Contributions' },
  { id: 'magazines', title: 'Magazines and Trade Publications' },
  // These are columns BY him. The old heading, "Press & Newspaper Coverage",
  // reads as coverage OF him.
  { id: 'columns', title: 'Newspaper Columns' },
  { id: 'chapters', title: 'Book Chapters' },
];

/** Periodicals that are newspapers rather than magazines. */
const NEWSPAPER_TITLES = new Set(['Lubbock Avalanche-Journal']);

const sectionOf = (c: Citation): SectionId => {
  if (c.status === 'chapter') return 'chapters';
  if (c.status === 'record') return 'articles';
  // status 'feature': a department note in a scholarly journal carries a
  // volume and a page range; a magazine piece carries neither.
  if (c.journal && NEWSPAPER_TITLES.has(c.journal)) return 'columns';
  if (c.volume && c.firstPage != null) return 'notes';
  return 'magazines';
};

/* ------------------------------------------------------------------ *
 * 4. The list.
 * ------------------------------------------------------------------ */

export type Entry = {
  slug: string;
  citation: Citation;
  section: SectionId;
  thumb?: string;
  alt?: string;
  /** Sibling versions other than this page's own. */
  otherVersions: { label: string; path: string }[];
};

const collected: Entry[] = [];

for (const [path, mod] of Object.entries(modules)) {
  const slug = slugOf(path);
  if (slug === 'index' || slug.startsWith('_')) continue;

  const citation = mod.CITATION ?? mod.default;
  if (!citation) {
    throw new Error(
      `src/data/publications/${slug}.ts exports no CITATION. Every article ` +
        `data file must \`export const CITATION: Citation = {...}\` so the ` +
        `publications index can see it.`
    );
  }

  // A manuscript or draft is a version of something, not a separate work. It
  // reaches the reader through the version switcher on its parent's card.
  if (citation.status === 'manuscript' || citation.status === 'draft') continue;

  const extra = EXTRAS[slug] ?? {};
  collected.push({
    slug,
    citation,
    section: extra.section ?? sectionOf(citation),
    thumb: extra.thumb,
    alt: extra.alt,
    otherVersions: (citation.versions ?? []).filter(
      (v) => v.path !== citation.canonicalPath
    ),
  });
}

// Catch a stale EXTRAS key rather than losing an image quietly.
for (const key of Object.keys(EXTRAS)) {
  if (!(`./${key}.ts` in modules)) {
    throw new Error(
      `EXTRAS in src/data/publications/index.ts has an entry for "${key}", ` +
        `but there is no ${key}.ts in that folder. Rename or remove it.`
    );
  }
}

export const PUBLICATIONS: Entry[] = collected.sort(
  (a, b) =>
    b.citation.year - a.citation.year ||
    a.citation.title.localeCompare(b.citation.title)
);

export const bySection = (id: SectionId): Entry[] =>
  PUBLICATIONS.filter((e) => e.section === id);

/* ------------------------------------------------------------------ *
 * 5. The source line for a card.
 *
 * NOT a citation - a card shows where a piece appeared, and the reader
 * already knows who wrote it. citation.ts's formatters all lead with the
 * author, which is why this lives here rather than there. It follows the
 * same field logic as citeChicago so the two can never disagree about
 * what a magazine looks like.
 * ------------------------------------------------------------------ */

export const sourceLine = (c: Citation): string => {
  const where = c.status === 'chapter' ? c.bookTitle : c.journal;
  if (!where) return String(c.year);

  if (c.status === 'chapter') {
    return [where, c.publisher, String(c.year)].filter(Boolean).join(', ');
  }

  // Magazine shape: no volume, no page range, so the issue designation is
  // the whole locator.
  if (!c.volume && c.firstPage == null) {
    return `${where}, ${c.dateLabel ?? c.monthYear ?? c.year}`;
  }

  const vol = c.volume ? ` ${c.volume}` : '';
  const iss = c.issue ? `, no. ${c.issue}` : '';
  const when = ` (${c.monthYear ?? c.year})`;
  const pp =
    c.firstPage != null && c.lastPage != null
      ? `: ${c.firstPage}\u2013${c.lastPage}`
      : '';
  return `${where}${vol}${iss}${when}${pp}`;
};
