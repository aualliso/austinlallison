// src/data/publications/comfortably-lodged.ts
// A magazine feature. Same shape as lipscomb-county-courthouse.ts.

import type { Citation, FigureSet } from '../../lib/citation';
import {
  citeChicago as chicago,
  citeMla as mla,
  citeBibtex as bibtex,
} from '../../lib/citation';

export const CITATION: Citation = {
  title:
    'Comfortably Lodged: Transforming historic county jails into silos for historical and cultural heritage',
  displayTitle: 'Comfortably Lodged',
  subtitle:
    'Transforming historic county jails into silos for historical and cultural heritage',
  authors: ['Austin Allison'],
  orcid: 'https://orcid.org/0000-0001-6787-9636',
  status: 'feature',
  journal: 'Authentic Texas',
  dateLabel: 'Fall 2021',
  year: 2021,
  language: 'en',
  canonicalPath: '/publications/comfortably_lodged',
  versions: [],
};

export const citeChicago = (): string => chicago(CITATION);
export const citeMla = (): string => mla(CITATION);
export const citeBibtex = (): string => bibtex(CITATION, 'allison2021lodged');

/**
 * Three photographs, all called with numbered={false} — the prose points at
 * none of them. `alt` values are Austin's own, carried over from the
 * original page. Photo credits split out of the captions.
 */
export const FIGURES: FigureSet = {
  dir: 'comfortably_lodged',
  entries: [
    {
      id: 'sutton-cell',
      plates: [
        {
          file: 'comfortably_lodged2.jpg',
          alt: 'Inside a cell at the historic Sutton County Jail',
        },
      ],
      caption: 'Jail cell at the historic Sutton County Jail, 2021 &mdash; Sonora, Texas',
      credit: 'Photograph by Austin Allison',
      size: '3xl',
    },
    {
      id: 'sutton-exterior',
      plates: [
        { file: 'comfortably_lodged1.jpg', alt: 'The historic Sutton County Jail' },
      ],
      caption: 'Historic Sutton County Jail, 2021 &mdash; Sonora, Texas',
      credit: 'Photograph by Austin Allison',
      size: '3xl',
    },
    {
      id: 'sutton-escape-hole',
      plates: [
        {
          file: 'comfortably_lodged3.jpg',
          alt: 'Escape hole at the Sutton County Jail',
        },
      ],
      caption:
        'Escape hole at the Sutton County Jail, later repaired, 2021 &mdash; Sonora, Texas',
      credit: 'Photograph by Austin Allison, and Devil&rsquo;s River News, 1969',
      size: '3xl',
    },
  ],
};