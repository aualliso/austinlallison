// src/data/publications/albert-pike.ts
// A newspaper feature. Same shape as lipscomb-county-courthouse.ts:
// status 'feature' means citable and cited in newspaper/magazine form, but
// no citation_* journal tags.

import type { Citation, FigureSet } from '../../lib/citation';
import {
  citeChicago as chicago,
  citeMla as mla,
  citeBibtex as bibtex,
} from '../../lib/citation';

export const CITATION: Citation = {
  title: 'Albert Pike and His Journey to Ransom Canyon',
  authors: ['Austin Allison'],
  orcid: 'https://orcid.org/0000-0001-6787-9636',
  status: 'feature',
  journal: 'Lubbock Avalanche-Journal',
  // A newspaper is dated, not numbered — no volume, issue, pages or DOI.
  dateLabel: 'November 29, 2024',
  year: 2024,
  language: 'en',
  canonicalPath: '/publications/albert_pike',
  versions: [],
};

export const citeChicago = (): string => chicago(CITATION);
export const citeMla = (): string => mla(CITATION);
export const citeBibtex = (): string => bibtex(CITATION, 'allison2024pike');

/**
 * Two images, both called with numbered={false} — the prose never points at
 * either one, so figure numbers would be apparatus with nothing to reference
 * them. `alt` values are Austin's own, carried over from the original page.
 */
export const FIGURES: FigureSet = {
  dir: 'albert_pike',
  entries: [
    {
      id: 'pike-portrait',
      plates: [{ file: 'albert_pike.jpg', alt: 'Portrait of Albert Pike' }],
      caption: 'Albert Pike, undated portrait',
      credit: '',
      size: '3xl',
    },
    {
      id: 'pike-route-map',
      plates: [
        {
          file: 'albert_pike_map.jpg',
          alt: "Map of Albert Pike's route from the Pecos River to Lubbock",
        },
      ],
      caption:
        'Pike&rsquo;s route from the Pecos River across the Llano Estacado toward modern Lubbock',
      credit: '',
      size: '3xl',
    },
  ],
};