// src/data/publications/sharps-rifle.ts
// A newspaper feature. Same shape as albert-pike.ts.

import type { Citation, FigureSet } from '../../lib/citation';
import {
  citeChicago as chicago,
  citeMla as mla,
  citeBibtex as bibtex,
} from '../../lib/citation';

export const CITATION: Citation = {
  title: 'The Sharps Rifle, Buffalo Hunting, and the South Plains',
  authors: ['Austin Allison'],
  orcid: 'https://orcid.org/0000-0001-6787-9636',
  status: 'feature',
  journal: 'Lubbock Avalanche-Journal',
  dateLabel: 'January 28, 2024',
  year: 2024,
  language: 'en',
  canonicalPath: '/publications/sharps_rifle',
  versions: [],
};

export const citeChicago = (): string => chicago(CITATION);
export const citeMla = (): string => mla(CITATION);
export const citeBibtex = (): string => bibtex(CITATION, 'allison2024sharps');

/**
 * One illustration, called with numbered={false}. `dir` is empty because this
 * image sits directly in /images/ rather than a per-article folder.
 */
export const FIGURES: FigureSet = {
  dir: '',
  entries: [
    {
      id: 'buffalo-stand',
      plates: [
        {
          file: 'judia_buffalo_stand.jpg',
          alt: 'Illustration of a buffalo stand by Bert Judia',
        },
      ],
      caption: '1911 illustration of a buffalo stand',
      credit: 'Bert Judia',
      size: '3xl',
    },
  ],
};