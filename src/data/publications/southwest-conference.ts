// src/data/publications/southwest-conference.ts
// A magazine feature. Same shape as comfortably-lodged.ts.

import type { Citation, FigureSet } from '../../lib/citation';
import {
  citeChicago as chicago,
  citeMla as mla,
  citeBibtex as bibtex,
} from '../../lib/citation';

export const CITATION: Citation = {
  title:
    'The Remnants of the Southwest Conference: The Story of a Landmark Archival Collection',
  displayTitle: 'The Remnants of the Southwest Conference',
  subtitle: 'The Story of a Landmark Archival Collection',
  authors: ['Austin Allison'],
  orcid: 'https://orcid.org/0000-0001-6787-9636',
  status: 'feature',
  journal: 'Authentic Texas',
  dateLabel: 'Winter 2024',
  year: 2024,
  language: 'en',
  canonicalPath: '/publications/southwest_conference',
  versions: [],
};

export const citeChicago = (): string => chicago(CITATION);
export const citeMla = (): string => mla(CITATION);
export const citeBibtex = (): string => bibtex(CITATION, 'allison2024swc');

/**
 * Two photographs, both unnumbered — the prose points at neither. `dir` is
 * empty because both images sit directly in /images/ rather than a
 * per-article folder. `alt` values are Austin's own.
 */
export const FIGURES: FigureSet = {
  dir: '',
  entries: [
    {
      id: 'swc-library-aerial',
      plates: [
        {
          file: 'southwest_collection1.jpg',
          alt: 'Aerial image of the Southwest Collection/Special Collections Library',
        },
      ],
      caption: 'Southwest Collection/Special Collections Library &mdash; Lubbock, Texas',
      credit: 'Photograph by Austin Allison',
      size: '3xl',
    },
    {
      id: 'swc-exhibit',
      plates: [
        {
          file: 'southwest_conference1.jpg',
          alt: 'Image of Southwest Conference exhibit',
        },
      ],
      caption:
        'Southwest Conference exhibit at the Southwest Collection/Special Collections Library &mdash; Lubbock, Texas',
      credit: 'Photograph by Austin Allison',
      size: '3xl',
    },
  ],
};