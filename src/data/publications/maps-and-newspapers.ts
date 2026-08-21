// src/data/publications/maps-and-newspapers.ts
//
// NOTE ON `status`: the original page labelled this "Peer-Reviewed Article",
// so it is set to 'record' and emits the full citation_* set. If Archivation
// Exploration is an institutional publication rather than a peer-reviewed
// journal, change status to 'feature' — that is the only edit needed, and it
// switches off the Scholar metadata while leaving everything else intact.

import type { Citation, FigureSet } from '../../lib/citation';
import {
  pages,
  citeChicago as chicago,
  citeMla as mla,
  citeBibtex as bibtex,
} from '../../lib/citation';

export const CITATION: Citation = {
  title: 'Maps and Newspapers in the Southwest Collection',
  authors: ['Austin Allison'],
  orcid: 'https://orcid.org/0000-0001-6787-9636',
  status: 'record',
  journal: 'Archivation Exploration',
  volume: '3',
  issue: '2',
  year: 2018,
  // No page range and no DOI — both omitted rather than guessed. The
  // citation line and all three formats handle their absence.
  language: 'en',
  canonicalPath: '/publications/maps_and_newspapers',
  versions: [],
};

export const pageRange = (): string => pages(CITATION.firstPage, CITATION.lastPage);
export const citeChicago = (): string => chicago(CITATION);
export const citeMla = (): string => mla(CITATION);
export const citeBibtex = (): string => bibtex(CITATION, 'allison2018maps');

/**
 * Two plates, each illustrating its own section. Called with numbered={false}
 * — the prose refers to them by name ("This 1836 map", "This newspaper")
 * rather than by number, and the section headings already identify them.
 * `alt` values are Austin's own, carried over from the original page.
 */
export const FIGURES: FigureSet = {
  dir: 'maps_and_newspapers',
  entries: [
    {
      id: 'land-grant-map-1836',
      plates: [
        { file: 'land_grant_map_1836.jpg', alt: 'Land Grant Map of Texas (1836)' },
      ],
      caption: 'Land Grant Map of Texas (1836)',
      credit: 'Southwest Collection/Special Collections Library, Texas Tech University',
      size: '3xl',
    },
    {
      id: 'der-texas-1864',
      plates: [
        { file: 'der_texas.jpg', alt: 'German-Texas Civil War Newspaper (1864)' },
      ],
      caption: 'German-Texas Civil War Newspaper (1864)',
      credit: 'Southwest Collection/Special Collections Library, Texas Tech University',
      size: '3xl',
    },
  ],
};