// src/data/publications/index.ts
//
// The index the publications system has never had.
//
// It does NOT restate any citation. It reads the CITATION every article data
// file already exports, so the one list of what exists is the set of files in
// this folder. Add an article the normal way (data file + page) and it appears
// on /publications with no second edit; delete one and its entry goes with it.
// An article page that exists but is unreachable from the index becomes
// impossible by construction - which is how ja_cattle_company and
// newspapers_oil_and_railroad_land went missing from the hand-written page.
//
// REVISED 2026-10-12 for the catalogue redesign of /publications. Each entry
// can now carry a SHOW block: which "form" it appears in on the page
// (feature spread, newspaper, magazine, archive, book), its opening line, and
// which images to show. Images are named by FILE and resolved against the
// article's own FIGURES register, so captions, credits and alt text are read
// from the data file that already holds them - never typed twice. A piece
// with no SHOW block still appears: its form is derived from its section and
// its first figure is used, so a new article is never invisible.
//
// Consumed by src/pages/publications.astro. cv.astro and the home-page
// Publications leaf can move onto it next.

import type { Citation, FigureSet } from '../../lib/citation';

/* ------------------------------------------------------------------ *
 * 1. Read every article data module in this folder.
 * ------------------------------------------------------------------ */

type Mod = {
  CITATION?: Citation;
  default?: Citation;
  FIGURES?: FigureSet;
  NOTES?: unknown[];
};

// Vite resolves this at build time. Files starting with an underscore are
// conventionally non-routable in Astro, and _template.ts is not an article.
const modules = import.meta.glob<Mod>('./*.ts', { eager: true });

const slugOf = (path: string) => path.replace(/^\.\//, '').replace(/\.ts$/, '');

/* ------------------------------------------------------------------ *
 * 2. Presentation data that is NOT citation metadata.
 *
 * A thumbnail or an opening line is not a bibliographic fact, so it does
 * not belong in Citation. It belongs here, in one table, keyed by slug.
 *
 * The keys are checked against the modules above at build time: a typo
 * or a renamed data file throws instead of silently dropping an entry.
 * ------------------------------------------------------------------ */

/** Where a piece appears on /publications. */
export type Form = 'feature' | 'newspaper' | 'magazine' | 'archive' | 'book';

/** The three layouts a feature spread can take. */
export type Layout = 'portrait' | 'shelf' | 'panorama';

/**
 * One image to show. Name it by `file` - the same file name used in the
 * article's FIGURES - and its caption, credit and alt come from there.
 * Use `src` instead (a path under /public) only for an image the article's
 * figure register does not contain; then supply alt/caption/credit here.
 * Any field given here overrides the register.
 */
export type ShowImage = {
  file?: string;
  src?: string;
  alt?: string;
  caption?: string;
  credit?: string;
  /** Short line for tight spots (archive slips); falls back to caption. */
  label?: string;
  /** CSS object-position for cropped frames, e.g. '40% 50%'. */
  position?: string;
};

export type Show = {
  form: Form;
  /** Order within its form. Lower comes first. */
  order: number;
  /** Feature spreads only. */
  layout?: Layout;
  /** The piece's opening line, verbatim from the printed text. */
  lead?: string;
  images?: ShowImage[];
};

export type Extra = {
  /** Path under /public. Kept for the home-page leaf and the CV. */
  thumb?: string;
  /** Real description of what is VISIBLE. Empty string = decorative. */
  alt?: string;
  /** Override the derived section. Leave unset unless the rule is wrong. */
  section?: SectionId;
  /** How the piece appears on /publications. */
  show?: Show;
};

const EXTRAS: Record<string, Extra> = {
  /* ---- The three feature spreads ---------------------------------- */
  capitol_land_shq: {
    thumb: '/images/wiley_notes.jpg',
    alt: "H.A. Wiley's field notes",
    show: {
      form: 'feature',
      order: 1,
      layout: 'portrait',
      lead:
        'During the closing years of the 1870s, vast areas of public lands owned by the State of Texas remained underutilized and their value unrealized as the state exited the Reconstruction period.',
      images: [
        {
          // The colour photograph of the notebook, not the grey scan in
          // FIGURES, so its caption and credit are given here.
          src: '/images/wiley_notes.jpg',
          alt: "The first page of H. A. Wiley's field notes, handwritten in ink on a worn, stained notebook page.",
          caption: 'Page one of field notes of work done by H. A. Wiley, compass man for J.T. Munson.',
          credit: 'Courtesy of the Texas State Library and Archives Commission',
        },
        {
          file: '03-munson-portrait.png',
          alt: 'Studio portrait of J.T. Munson, bearded, in a dark coat and bow tie.',
        },
      ],
    },
  },
  opportunity_knocking: {
    thumb: '/images/vaughan_land_company.jpg',
    alt: 'Advertisement for the Vaughan Land Company',
    show: {
      form: 'feature',
      order: 2,
      layout: 'shelf',
      lead:
        'The settlement of the Llano Estacado during the closing decades of the 1800s and first decades of the 1900s entails the narrative of many facets of contemporary American life.',
      images: [
        { file: 'vaughan_land_company_ad_1911.jpg' },
        { file: 'texas_steer_pamphlet_1907.jpg' },
        { file: 'monument_lake_ranch_ad_1908.jpg' },
        { file: 'vaughan_cars_portales.jpg' },
      ],
    },
  },
  spring_sprung_it: {
    thumb: '/images/spring_sprung_it.jpg',
    alt: 'The headwaters of the Missouri River',
    show: {
      form: 'feature',
      order: 3,
      layout: 'panorama',
      // Chosen by the author: not the article's first sentence, which reads
      // as an abstract.
      lead:
        'North America\u2019s longest river emanates from an elevated canyon nestled in the Centennial Mountains and Centennial Valley of southwestern Montana and meanders through miles of mountains, forests, and plains to discharge ultimately into the Gulf of Mexico more than 3,700 miles downstream.',
      images: [
        { file: 'utmost_spring_closeup.jpg' },
        { file: 'brower_hole_in_mountains.jpg' },
      ],
    },
  },

  /* ---- In the newspaper ------------------------------------------- */
  yellow_house_canyon: {
    thumb: '/images/yellow_house_canyon/cook_image.jpg',
    alt: 'Map of Lubbock County showing Yellow House Draw, Blackwater Draw, and the site of the 1877 battle',
    show: {
      form: 'newspaper',
      order: 1,
      lead: 'Precisely locating the 1877 battle of Yellow House Canyon remains a puzzle.',
      images: [{ file: 'cook_image.jpg' }],
    },
  },
  albert_pike: {
    thumb: '/images/albert_pike/albert_pike_crop.jpg',
    alt: 'Albert Pike in Masonic regalia',
    show: {
      form: 'newspaper',
      order: 2,
      lead: 'Pre-Civil War depictions of the Llano Estacado are rare, with pre-Texas Revolution versions even more scarce.',
      images: [{ file: 'albert_pike.jpg', position: '50% 20%' }],
    },
  },
  sharps_rifle: {
    thumb: '/images/judia_buffalo_stand.jpg',
    alt: 'A buffalo hunter\u2019s stand on the South Plains',
    show: {
      form: 'newspaper',
      order: 3,
      lead:
        'Dating to 1848, the Sharps rifle and its patented breech-loading, falling block design was a go-to firearm for snipers and long-distance shooters due to its accuracy and ease of use.',
      images: [{ file: 'judia_buffalo_stand.jpg' }],
    },
  },

  /* ---- In the magazine -------------------------------------------- */
  southwest_conference: {
    thumb: '/images/southwest_conference2.jpg',
    alt: 'Southwest Conference archival memorabilia',
    show: {
      form: 'magazine',
      order: 1,
      lead:
        'Conference realignment. It is the periodic buzzword that makes the rounds of college athletics for the past three or more decades as schools and conferences aim to sweeten their television contracts.',
      images: [{ file: 'southwest_collection1.jpg' }],
    },
  },
  lipscomb_county_courthouse: {
    thumb: '/images/lipscomb_county.jpg',
    alt: 'The Lipscomb County courthouse',
    show: {
      form: 'magazine',
      order: 2,
      images: [{ file: 'lipscomb_county.jpg', position: '36% 50%' }],
    },
  },
  comfortably_lodged: {
    thumb: '/images/comfortably_lodged/comfortably_lodged2.jpg',
    alt: 'A historic Texas county jail converted to a museum',
    show: {
      form: 'magazine',
      order: 3,
      images: [{ file: 'comfortably_lodged2.jpg' }],
    },
  },
  tumbleweed_smith: {
    thumb: '/images/tumbleweed_smith.jpg',
    alt: 'Tumbleweed Smith recording audio in Texas',
    // Set in type alone: its only image is the programme's emblem.
    show: { form: 'magazine', order: 4, images: [] },
  },

  /* ---- From the archive ------------------------------------------- */
  maps_and_newspapers: {
    thumb: '/images/maps_and_newspapers/der_texas.jpg',
    alt: 'Front page of Der Texas Demokrat',
    show: {
      form: 'archive',
      order: 1,
      images: [{ file: 'der_texas.jpg', label: 'German-Texas Civil War newspaper, 1864' }],
    },
  },
  ja_cattle_company: {
    show: {
      form: 'archive',
      order: 2,
      images: [
        {
          file: 'ja_deed_p1.jpg',
          label: 'Warranty deed, Charles Goodnight to Cornelia Adair, 1886',
        },
      ],
    },
  },
  unusual_annotations: {
    thumb: '/images/unusual_annotations/unusual_annotations2.png',
    alt: "Detail of the annotations on Stephen F. Austin's 1835 map of Texas",
    show: {
      form: 'archive',
      order: 3,
      images: [{ file: 'unusual_annotations1.png' }],
    },
  },
  newspapers_oil_and_railroad_land: {
    show: {
      form: 'archive',
      order: 4,
      images: [
        {
          file: 'high_bridge_pecos_canon.jpg',
          label: 'High Bridge, Pecos Ca\u00f1on, Texas, Sunset Route',
        },
      ],
    },
  },

  /* ---- In a book -------------------------------------------------- */
  tahoka_lake: {
    show: {
      form: 'book',
      order: 1,
      images: [{ file: 'tahoka_lake.jpg' }],
    },
  },
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

/**
 * The form a piece takes when its entry gives none. Deliberately NOT
 * 'feature': a spread is an editorial choice, so a new article lands in the
 * shorter pieces until you promote it.
 */
const FORM_OF_SECTION: Record<SectionId, Form> = {
  articles: 'archive',
  notes: 'archive',
  magazines: 'magazine',
  columns: 'newspaper',
  chapters: 'book',
};

/* ------------------------------------------------------------------ *
 * 4. Images, resolved against each article's own FIGURES.
 * ------------------------------------------------------------------ */

export type ResolvedImage = {
  /** Path under /public, e.g. /images/spring_sprung_it/utmost_spring_closeup.jpg */
  src: string;
  alt: string;
  /** HTML as stored in the data file (may hold entities or <em>). */
  caption?: string;
  credit?: string;
  label?: string;
  position?: string;
};

const pathFor = (dir: string, file: string) => `/images/${dir ? `${dir}/` : ''}${file}`;

const resolveImage = (slug: string, spec: ShowImage, figs?: FigureSet): ResolvedImage => {
  if (spec.src) {
    return {
      src: spec.src,
      alt: spec.alt ?? '',
      caption: spec.caption,
      credit: spec.credit,
      label: spec.label,
      position: spec.position,
    };
  }
  if (!spec.file) {
    throw new Error(`An image in the SHOW block for "${slug}" names neither a file nor a src.`);
  }
  for (const entry of figs?.entries ?? []) {
    const plate = entry.plates.find((p) => p.file === spec.file);
    if (plate) {
      return {
        src: pathFor(figs!.dir, plate.file),
        alt: spec.alt ?? plate.alt ?? '',
        caption: spec.caption ?? entry.caption,
        credit: spec.credit ?? entry.credit,
        label: spec.label,
        position: spec.position,
      };
    }
  }
  throw new Error(
    `The SHOW block for "${slug}" names ${spec.file}, but ${slug}.ts has no ` +
      `figure with that file. Check the spelling, or give a src with alt and caption.`
  );
};

/** First plate of the first figure: the default image for an entry with no SHOW. */
const firstFigure = (figs?: FigureSet): ShowImage[] => {
  const plate = figs?.entries[0]?.plates[0];
  return plate ? [{ file: plate.file }] : [];
};

/* ------------------------------------------------------------------ *
 * 5. The list.
 * ------------------------------------------------------------------ */

export type Entry = {
  slug: string;
  citation: Citation;
  section: SectionId;
  thumb?: string;
  alt?: string;
  /** Sibling versions other than this page's own. */
  otherVersions: { label: string; path: string }[];
  /** How the piece appears on /publications - always present. */
  form: Form;
  order: number;
  layout?: Layout;
  lead?: string;
  images: ResolvedImage[];
  /** Length of the article's NOTES, if it has endnotes. */
  noteCount?: number;
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
  // reaches the reader through the version links on its parent's entry.
  if (citation.status === 'manuscript' || citation.status === 'draft') continue;

  const extra = EXTRAS[slug] ?? {};
  const section = extra.section ?? sectionOf(citation);
  const show = extra.show;
  const specs = show?.images ?? firstFigure(mod.FIGURES);

  collected.push({
    slug,
    citation,
    section,
    thumb: extra.thumb,
    alt: extra.alt,
    otherVersions: (citation.versions ?? []).filter(
      (v) => v.path !== citation.canonicalPath
    ),
    form: show?.form ?? FORM_OF_SECTION[section],
    // Unlisted pieces sort after listed ones, newest first among themselves.
    order: show?.order ?? 1000 - citation.year / 10000,
    layout: show?.layout,
    lead: show?.lead,
    images: specs.map((s) => resolveImage(slug, s, mod.FIGURES)),
    noteCount: Array.isArray(mod.NOTES) && mod.NOTES.length ? mod.NOTES.length : undefined,
  });
}

// Catch a stale EXTRAS key rather than losing an entry quietly.
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

/** Entries in one form, in their SHOW order. */
export const byForm = (form: Form): Entry[] =>
  PUBLICATIONS.filter((e) => e.form === form).sort((a, b) => a.order - b.order);

/* ------------------------------------------------------------------ *
 * 6. The source line for a card.
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