// src/data/publications/tahoka-lake.ts
//
// A chapter in an edited scholarly book — the first of its kind on the site.
// status 'chapter' cites it as "in <Book Title>" and emits
// citation_inbook_title rather than citation_journal_title.
//
// TODO (Austin): four fields are omitted because I don't have them and won't
// guess. Filling any of them improves the citation automatically:
//   editors   the book's editor(s)
//   publisher the press
//   place     place of publication, e.g. 'Lubbock, Tex.'
//   firstPage / lastPage   the chapter's page range
//   isbn      if you want it in the metadata

import type { Citation, FigureSet } from '../../lib/citation';
import {
  citeChicago as chicago,
  citeMla as mla,
  citeBibtex as bibtex,
} from '../../lib/citation';

export const CITATION: Citation = {
  title: 'Tahoka Lake',
  authors: ['Austin Allison'],
  orcid: 'https://orcid.org/0000-0001-6787-9636',
  status: 'chapter',
  bookTitle: 'Caprock Chronicles: More Tales of the Llano Estacado',
  editors: ['David J. Murrah', 'John T. (Jack) Becker'],
  publisher: 'The History Press',
  place: 'Charleston, South Carolina',
  firstPage: 55,
  lastPage: 56,
  isbn: '9781467150804',
  year: 2021,
  language: 'en',
  canonicalPath: '/publications/tahoka_lake',
  versions: [],
};

export const citeChicago = (): string => chicago(CITATION);
export const citeMla = (): string => mla(CITATION);
export const citeBibtex = (): string => bibtex(CITATION, 'allison2021tahoka');

/**
 * One photograph, unnumbered. `dir` is empty because the image sits directly
 * in /images/ rather than a per-article folder.
 */
export const FIGURES: FigureSet = {
  dir: '',
  entries: [
    {
      id: 'tahoka-lake-aerial',
      plates: [
        { file: 'tahoka_lake.jpg', alt: 'Aerial photograph of Tahoka Lake' },
      ],
      caption: 'Tahoka Lake, 2016 &mdash; Lynn County, Texas',
      credit: 'Photograph by Austin Allison',
      size: '3xl',
    },
  ],
};