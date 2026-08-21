// src/lib/citation.ts
// Shared across every publication page. Article-specific data files import
// this, bind it to their own CITATION, and re-export thin wrappers so the
// pages themselves keep calling pageRange() / doiUrl() with no argument.

/**
 * 'record'     published version of record — full Scholar metadata
 * 'manuscript' submitted/preprint — thin metadata, points at the record
 * 'chapter'    a chapter in an edited scholarly book. Cited in chapter form
 *              ("in <Book Title>, ed. ..."), and emits citation_inbook_title
 *              rather than citation_journal_title.
 * 'feature'    published, but NOT scholarship: magazine feature, newsletter
 *              column, encyclopedia entry. Citable, and cited in magazine
 *              form, but emits no citation_* journal tags — telling Scholar
 *              to index a general-interest feature as a peer-reviewed
 *              article degrades how the real articles look there.
 * 'draft'      unpublished. Title and author only.
 */
export type PublicationStatus =
  | 'record'
  | 'manuscript'
  | 'chapter'
  | 'feature'
  | 'draft';

export interface Citation {
  /** Full title, subtitle included. Used for metadata and every citation. */
  title: string;
  /** Optional short form for the masthead h1, when a long title reads badly. */
  displayTitle?: string;
  /** Optional deck, set under the h1. Not repeated in metadata. */
  subtitle?: string;
  authors: string[];
  orcid?: string;

  /** 'record' = published version of record; 'manuscript' = submitted/preprint. */
  status: PublicationStatus;

  /** Journal fields. Present only when status === 'record'. */
  journal?: string;
  /** Book fields. Present only when status === 'chapter'. */
  bookTitle?: string;
  editors?: string[];
  /** Place of publication, e.g. 'Lubbock, Tex.' */
  place?: string;
  isbn?: string;
  journalAbbrev?: string;
  publisher?: string;
  volume?: string;
  issue?: string;
  monthYear?: string;
  /**
   * An issue designation that isn't volume/issue numbering — 'Summer 2025',
   * 'Fall/Winter 2024'. Magazines label issues this way. When set, it is what
   * the citation line and the formatters print instead of volume and pages.
   */
  dateLabel?: string;
  firstPage?: number;
  lastPage?: number;
  doi?: string;
  issn?: string;

  /** Year of this artifact (submission year for a manuscript). */
  year: number;

  /**
   * For a manuscript: the published version readers should cite instead.
   * For a record: undefined.
   */
  publishedAs?: {
    title: string;
    journal: string;
    volume: string;
    issue: string;
    monthYear: string;
    year: number;
    firstPage: number;
    lastPage: number;
    doi: string;
    url: string;
  };

  rights?: string;
  language: string;
  canonicalPath: string;
  /** Sibling versions, for the masthead version switcher. */
  versions: { label: string; path: string }[];
}

const EN_DASH = '\u2013';

export const pages = (first?: number, last?: number): string =>
  first != null && last != null ? `${first}${EN_DASH}${last}` : '';

export const doiLink = (doi?: string): string =>
  doi ? `https://doi.org/${doi}` : '';

/**
 * The citation a reader should copy. For a manuscript this deliberately
 * describes the PUBLISHED version — nobody should be citing a preprint when
 * a version of record exists — with a note that this page is the manuscript.
 */
interface Citable {
  authors: string[];
  title: string;
  /** Journal name, or — for a chapter — the containing book's title. */
  journal: string;
  /** Set for a chapter, so the formatters switch to "in <Book>" form. */
  isChapter?: boolean;
  editors?: string[];
  place?: string;
  publisher?: string;
  year: number;
  volume?: string;
  issue?: string;
  monthYear?: string;
  dateLabel?: string;
  firstPage?: number;
  lastPage?: number;
  doi?: string;
}

export const citable = (c: Citation): Citable | null => {
  if (c.publishedAs) {
    return { authors: c.authors, ...c.publishedAs };
  }
  // A journal name and a year are the minimum. Volume, issue, page range and
  // DOI are all optional — not every journal issues a DOI, and the formatters
  // below simply omit whatever is missing rather than printing a gap.
  if (c.status === 'chapter' && c.bookTitle) {
    return {
      authors: c.authors,
      title: c.title,
      journal: c.bookTitle,
      isChapter: true,
      editors: c.editors,
      place: c.place,
      publisher: c.publisher,
      year: c.year,
      firstPage: c.firstPage,
      lastPage: c.lastPage,
      doi: c.doi,
    };
  }
  if ((c.status === 'record' || c.status === 'feature') && c.journal) {
    return {
      authors: c.authors,
      title: c.title,
      journal: c.journal,
      year: c.year,
      volume: c.volume,
      issue: c.issue,
      monthYear: c.monthYear,
      dateLabel: c.dateLabel,
      firstPage: c.firstPage,
      lastPage: c.lastPage,
      doi: c.doi,
    };
  }
  return null;
};

/**
 * A periodical with no volume and no page range is cited in magazine form:
 * no volume, no colon, no pages — just the issue designation.
 */
const isMagazine = (k: Citable): boolean => !k.volume && k.firstPage == null;

/**
 * Chicago for a chapter:
 *   Author, "Chapter," in Book Title, ed. Editors (Place: Publisher, Year), pp.
 * Each parenthetical part is dropped when absent rather than left as a gap,
 * so an incomplete record still produces a well-formed citation.
 */
const chapterImprint = (k: Citable): string => {
  const inner = [k.place && k.publisher ? `${k.place}: ${k.publisher}` : k.place || k.publisher, String(k.year)]
    .filter(Boolean)
    .join(', ');
  return inner ? ` (${inner})` : '';
};

export const citeChicago = (c: Citation): string => {
  const k = citable(c);
  if (!k) return '';
  if (k.isChapter) {
    const eds = k.editors?.length ? `, ed. ${k.editors.join(' and ')}` : '';
    const pp = pages(k.firstPage, k.lastPage);
    const at = pp ? `, ${pp}` : '';
    return `${k.authors.join(', ')}, \u201c${k.title},\u201d in ${k.journal}${eds}${chapterImprint(k)}${at}.`;
  }
  if (isMagazine(k)) {
    return `${k.authors.join(', ')}, \u201c${k.title},\u201d ${k.journal}, ${k.dateLabel ?? k.monthYear ?? k.year}.`;
  }
  const vol = k.volume ? ` ${k.volume}` : '';
  const iss = k.issue ? `, no. ${k.issue}` : '';
  const when = ` (${k.monthYear ?? k.year})`;
  const pp = pages(k.firstPage, k.lastPage);
  const at = pp ? `: ${pp}` : '';
  const doi = k.doi ? `, https://doi.org/${k.doi}` : '';
  return `${k.authors.join(', ')}, \u201c${k.title},\u201d ${k.journal}${vol}${iss}${when}${at}${doi}.`;
};

export const citeMla = (c: Citation): string => {
  const k = citable(c);
  if (!k) return '';
  if (k.isChapter) {
    const eds = k.editors?.length ? `, edited by ${k.editors.join(' and ')}` : '';
    const pub = k.publisher ? `, ${k.publisher}` : '';
    const pp = pages(k.firstPage, k.lastPage);
    const at = pp ? `, pp. ${pp}` : '';
    return `${k.authors.join(', ')}. \u201c${k.title}.\u201d ${k.journal}${eds}${pub}, ${k.year}${at}.`;
  }
  if (isMagazine(k)) {
    return `${k.authors.join(', ')}. \u201c${k.title}.\u201d ${k.journal}, ${k.dateLabel ?? k.monthYear ?? k.year}.`;
  }
  const vol = k.volume ? `, vol. ${k.volume}` : '';
  const iss = k.issue ? `, no. ${k.issue}` : '';
  const pp = pages(k.firstPage, k.lastPage);
  const at = pp ? `, pp. ${pp}` : '';
  const doi = k.doi ? `, https://doi.org/${k.doi}` : '';
  return `${k.authors.join(', ')}. \u201c${k.title}.\u201d ${k.journal}${vol}${iss}, ${k.year}${at}${doi}.`;
};

export const citeBibtex = (c: Citation, key: string): string => {
  const k = citable(c);
  if (!k) return '';
  if (k.isChapter) {
    const rows = [
      `  author    = {${k.authors.join(' and ')}},`,
      `  title     = {${k.title}},`,
      `  booktitle = {${k.journal}},`,
    ];
    if (k.editors?.length) rows.push(`  editor    = {${k.editors.join(' and ')}},`);
    if (k.publisher) rows.push(`  publisher = {${k.publisher}},`);
    if (k.place) rows.push(`  address   = {${k.place}},`);
    if (k.firstPage != null && k.lastPage != null)
      rows.push(`  pages     = {${k.firstPage}--${k.lastPage}},`);
    rows.push(`  year      = {${k.year}}`);
    return [`@incollection{${key},`, ...rows, '}'].join('\n');
  }
  const rows = [
    `  author  = {${k.authors.join(' and ')}},`,
    `  title   = {${k.title}},`,
    `  journal = {${k.journal}},`,
  ];
  if (k.dateLabel) rows.push(`  month   = {${k.dateLabel}},`);
  if (k.volume) rows.push(`  volume  = {${k.volume}},`);
  if (k.issue) rows.push(`  number  = {${k.issue}},`);
  if (k.firstPage != null && k.lastPage != null)
    rows.push(`  pages   = {${k.firstPage}--${k.lastPage}},`);
  rows.push(`  year    = {${k.year}}${k.doi ? ',' : ''}`);
  if (k.doi) rows.push(`  doi     = {${k.doi}}`);
  return [`@article{${key},`, ...rows, '}'].join('\n');
};

/* ------------------------------------------------------------------ */
/* Endnotes                                                            */
/* ------------------------------------------------------------------ */

export interface Note {
  n: number;
  /** HTML fragment, as printed. Rendered with set:html. */
  html: string;
}

/* ------------------------------------------------------------------ */
/* Figures                                                             */
/* ------------------------------------------------------------------ */

export interface FigurePlate {
  file: string;
  label?: string;
  /** Describe what is VISIBLE. Empty means the figcaption is the alternative. */
  alt?: string;
}

export interface FigureEntry {
  id: string;
  plates: FigurePlate[];
  /**
   * Caption WITHOUT the "Fig. N." prefix — the component adds that.
   * Optional: an illustration that needs no caption renders with none at
   * all rather than an empty italic line. Give such a plate real `alt`,
   * since there is then no figcaption to serve as the text alternative.
   */
  caption?: string;
  credit?: string;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

/**
 * A per-article figure register. `dir` is the folder name used under BOTH
 * src/assets/publications/<dir>/ and /public/images/<dir>/, so one article's
 * images resolve the same way whichever place they live in.
 * Order of `entries` determines figure numbering.
 */
export interface FigureSet {
  dir: string;
  entries: FigureEntry[];
}

/**
 * Guard with a message that names the actual mistake. Without this, a missing
 * `set` prop or a data file still exporting FIGURES as a plain array surfaces
 * as "Cannot read properties of undefined (reading 'entries')" pointing here,
 * which tells you nothing about which page is wrong.
 */
const assertSet = (set: FigureSet | undefined, id: string): FigureSet => {
  if (!set) {
    throw new Error(
      `<Figure|FigRef id="${id}"> was called without a \`set\` prop. ` +
        `Pass the article's figure register, e.g. set={FIGURES}.`
    );
  }
  if (!Array.isArray(set.entries)) {
    throw new Error(
      `The figure set passed for id="${id}" has no \`entries\` array. ` +
        `FIGURES must be a FigureSet — { dir: '<folder>', entries: [...] } — ` +
        `not a bare array of figures.`
    );
  }
  return set;
};

export const figureNumber = (set: FigureSet, id: string): number => {
  const s = assertSet(set, id);
  const i = s.entries.findIndex((f) => f.id === id);
  if (i === -1) throw new Error(`Unknown figure id: ${id} (in ${s.dir})`);
  return i + 1;
};

export const figure = (set: FigureSet, id: string): FigureEntry => {
  const s = assertSet(set, id);
  const f = s.entries.find((f) => f.id === id);
  if (!f) throw new Error(`Unknown figure id: ${id} (in ${s.dir})`);
  return f;
};