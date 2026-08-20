// src/data/publications/_template.ts
//
// TEMPLATE — copy to src/data/publications/<slug>.ts and edit.
// This file is never imported by a page; it exists to be copied.
// See src/data/publications/README.txt for the full procedure.
//
// Rule of thumb: OMIT a field you don't have. Do not put in a placeholder,
// an empty string, or a guess. Every optional field below is skipped by the
// citation formatters and by ScholarlyMeta when it is absent, and a wrong
// DOI or ISSN is worse than none at all.

import type { Citation, Note, FigureSet } from '../../lib/citation';
import {
  pages,
  doiLink,
  citeChicago as chicago,
  citeMla as mla,
  citeBibtex as bibtex,
} from '../../lib/citation';

export const CITATION: Citation = {
  /* ---- required ------------------------------------------------------ */

  // Full title, subtitle included. Used for metadata and every citation.
  title: 'TODO Full Title of the Article',

  authors: ['Austin Allison'],

  // 'record'     = published version of record (emits full Scholar metadata)
  // 'manuscript' = submitted/preprint (emits thin metadata — see publishedAs)
  // 'draft'      = anything else: newsletter piece, encyclopedia entry, blog.
  //                Emits title and author only. USE THIS for anything that is
  //                not a journal article — telling Scholar to index a
  //                newsletter column as a journal article is worse than
  //                telling it nothing.
  status: 'record',

  // Year of THIS artifact. For a manuscript, the submission year.
  year: 2026,

  language: 'en',

  // The URL path this page lives at. Must match the .astro filename.
  canonicalPath: '/publications/TODO-slug',

  // Sibling versions of the same article, for the masthead switcher.
  // Leave as [] when there is only one version — the nav then doesn't render.
  // When there are two, list BOTH here and in the other version's data file,
  // with paths that match each file's canonicalPath exactly.
  versions: [],

  /* ---- optional: identity -------------------------------------------- */

  orcid: 'https://orcid.org/0000-0001-6787-9636',

  // Use these two together when the full title reads badly as a headline.
  // `title` above stays complete; these only change what the masthead shows.
  // displayTitle: 'A Spring Sprung It',
  // subtitle: 'Tracing and Understanding the True Genesis of ...',

  /* ---- optional: journal (only meaningful when status is 'record') ---- */

  journal: 'TODO Journal Name',
  journalAbbrev: 'TODO',                 // omit if the journal has no standard abbrev
  publisher: 'TODO Publishing Society',  // omit if unknown
  volume: 'TODO',
  // issue: '3',                         // omit for journals with one annual volume
  // monthYear: 'January 2026',          // omit if the issue carries only a year
  firstPage: 0,
  lastPage: 0,
  // doi: '10.0000/example',             // OMIT ENTIRELY if the journal issues none
  // issn: '',                           // omit unless you have verified it
  // rights: 'Republished with permission from ...',

  /* ---- optional: for status 'manuscript' only ------------------------- */
  //
  // The published version readers should cite instead. Setting this makes
  // CiteThis show the PUBLISHED citation with a note not to cite the
  // manuscript, and makes ScholarlyMeta point at the record rather than
  // competing with it.
  //
  // publishedAs: {
  //   title: 'Published Title',
  //   journal: 'Journal Name',
  //   volume: 'CXXIX',
  //   issue: '3',
  //   monthYear: 'January 2026',
  //   year: 2026,
  //   firstPage: 335,
  //   lastPage: 364,
  //   doi: '10.0000/example',
  //   url: '/publications/other-version',
  // },
};

/* -------------------------------------------------------------------- */
/* Bound wrappers — keep these. They are what let the page call          */
/* pageRange() and citeChicago() with no arguments.                      */
/* -------------------------------------------------------------------- */

export const pageRange = (): string => pages(CITATION.firstPage, CITATION.lastPage);
export const doiUrl = (): string => doiLink(CITATION.doi);
export const citeChicago = (): string => chicago(CITATION);
export const citeMla = (): string => mla(CITATION);
export const citeBibtex = (): string => bibtex(CITATION, 'TODO-bibtex-key');

/* -------------------------------------------------------------------- */
/* Figures — DELETE this whole block if the article has none.            */
/* -------------------------------------------------------------------- */

export const FIGURES: FigureSet = {
  // Folder name, used under BOTH /public/images/<dir>/ and
  // src/assets/publications/<dir>/. Put the images in either one; files found
  // under src/assets go through astro:assets (srcset, intrinsic dimensions),
  // and anything else falls back to the /public path.
  dir: 'TODO-folder-name',

  // ORDER HERE IS THE FIGURE NUMBERING. Reorder this array and every caption
  // and cross-reference follows automatically.
  entries: [
    {
      // Referenced as <Figure set={FIGURES} id="..." /> and
      // <FigRef set={FIGURES} id="..." />. A typo throws at build time.
      id: 'TODO-figure-id',
      plates: [
        {
          file: 'TODO-filename.jpg',
          // Describe what is VISIBLE in the image. Leave absent and the
          // figcaption serves as the text alternative — which is better than
          // alt text that just restates the caption word for word.
          // alt: 'Hand-drawn survey map showing league boundaries',
        },
      ],
      // Caption WITHOUT a "Fig. N." prefix — the component adds that.
      // Rendered as HTML, so <em> for book titles works.
      caption: 'TODO caption.',
      // Rendered as HTML too. Use '' if there is no separate credit.
      credit: 'Courtesy of TODO',
      // Max width: xs sm md lg xl 2xl 3xl
      size: '3xl',
    },

    // A COMPARISON FIGURE: two or three plates, one number, one caption.
    // Use this when the images make a point together — three maps of the
    // same county across three decades, a before/after pair. Stacked
    // separately they read as repetition; side by side they read as evidence.
    // {
    //   id: 'TODO-comparison-id',
    //   plates: [
    //     { file: 'a.jpg', label: '1884' },
    //     { file: 'b.jpg', label: '1891' },
    //     { file: 'c.jpg', label: '1913' },
    //   ],
    //   caption: 'TODO one caption covering all three plates.',
    //   credit: 'Courtesy of TODO',
    //   size: '3xl',
    // },
  ],
};

/* -------------------------------------------------------------------- */
/* Endnotes — DELETE this whole block if the article has none.           */
/* -------------------------------------------------------------------- */
//
// Numbering must be contiguous from 1, with no gaps, and every <Fn n={N} />
// on the page needs a matching entry here. A marker with no note gets a dead
// link and no hover preview, and nothing warns you.
//
// The html is a template literal, so THREE characters will break the file if
// they appear in note text: a backtick, a dollar-brace `${`, and a backslash.
// Curly quotes and HTML entities (&ldquo; &amp; &ndash;) are fine and are how
// the existing notes are written. <em> and <a href> work.

export const NOTES: Note[] = [
  { n: 1, html: `TODO first note.` },
  { n: 2, html: `TODO second note.` },
];

export const note = (n: number): Note | undefined => NOTES.find((x) => x.n === n);
