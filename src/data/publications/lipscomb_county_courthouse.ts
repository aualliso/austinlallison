// src/data/publications/lipscomb-county-courthouse.ts
// A magazine feature, NOT scholarship. status: 'feature' means it is citable
// and cited in magazine form, but emits no citation_* journal tags — see the
// note on PublicationStatus in src/lib/citation.ts.

import type { Citation, FigureSet } from '../../lib/citation';
import {
  citeChicago as chicago,
  citeMla as mla,
  citeBibtex as bibtex,
} from '../../lib/citation';

export const CITATION: Citation = {
  title: 'Lipscomb County Courthouse: A Prairie Landmark with Enduring Presence',
  displayTitle: 'Lipscomb County Courthouse',
  subtitle: 'A Prairie Landmark with Enduring Presence',
  authors: ['Austin Allison'],
  orcid: 'https://orcid.org/0000-0001-6787-9636',
  status: 'feature',
  journal: 'Authentic Texas',
  // No volume, issue, page range or DOI — a magazine issue is designated
  // this way instead, and dateLabel is what the citation line prints.
  dateLabel: 'Summer 2025',
  year: 2025,
  language: 'en',
  canonicalPath: '/publications/lipscomb_county_courthouse',
  versions: [],
};

export const citeChicago = (): string => chicago(CITATION);
export const citeMla = (): string => mla(CITATION);
export const citeBibtex = (): string => bibtex(CITATION, 'allison2025lipscomb');

/**
 * One photograph, so numbering is switched off at the call site with
 * numbered={false}. `dir` is empty because this image sits directly in
 * /images/ rather than a per-article folder.
 */
export const FIGURES: FigureSet = {
  dir: '',
  entries: [
    {
      id: 'courthouse-facade',
      plates: [
        {
          file: 'lipscomb_county.jpg',
          alt: 'The Classical Revival facade of the Lipscomb County Courthouse',
        },
      ],
      caption: 'Lipscomb County Courthouse &mdash; Lipscomb, Texas',
      credit: 'Photograph by Austin Allison',
      size: '3xl',
    },
  ],
};