// src/data/publications/unusual-annotations.ts
// Southwestern Archivist is the Society of Southwest Archivists' quarterly.
// status 'feature' matches the original page's "Magazine Feature" label, so
// no citation_* journal tags are emitted. If you consider SWA a scholarly
// venue, changing status to 'record' is the only edit needed.

import type { Citation, FigureSet } from '../../lib/citation';
import {
  citeChicago as chicago,
  citeMla as mla,
  citeBibtex as bibtex,
} from '../../lib/citation';

export const CITATION: Citation = {
  title:
    'Unusual Annotations in Stephen F. Austin\u2019s 1835 Map of Texas Tell Early Texas History',
  authors: ['Austin Allison'],
  orcid: 'https://orcid.org/0000-0001-6787-9636',
  status: 'feature',
  journal: 'Southwestern Archivist',
  volume: '42',
  issue: '1',
  monthYear: 'February 2019',
  year: 2019,
  // No page range and no DOI — omitted rather than guessed.
  language: 'en',
  canonicalPath: '/publications/unusual_annotations',
  versions: [],
};

/** The digitized map itself, linked from the masthead. */
export const MAP_URL = 'https://hdl.handle.net/10605/351491';

export const citeChicago = (): string => chicago(CITATION);
export const citeMla = (): string => mla(CITATION);
export const citeBibtex = (): string => bibtex(CITATION, 'allison2019annotations');

/**
 * Two details from the map, both unnumbered — the prose describes them in
 * passing rather than referring to them by number. `alt` values are Austin's
 * own, carried over from the original page.
 */
export const FIGURES: FigureSet = {
  dir: 'unusual_annotations',
  entries: [
    {
      id: 'nueces-mission-edit',
      plates: [
        {
          file: 'unusual_annotations1.png',
          alt: 'Hand drawn edit to Nueces with Mission',
        },
      ],
      caption: 'Hand drawn edit to Nueces with Mission, 1835',
      credit: 'Southwest Collection/Special Collections Library, Texas Tech University',
      size: '3xl',
    },
    {
      id: 'labadie-detail',
      plates: [
        { file: 'unusual_annotations2.png', alt: 'Image showing Labadie' },
      ],
      caption: 'Image showing Labadie, 1835',
      credit: 'Southwest Collection/Special Collections Library, Texas Tech University',
      size: '3xl',
    },
  ],
};