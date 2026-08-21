// src/data/publications/tumbleweed-smith.ts
// A magazine feature with NO images — so there is no FIGURES export here and
// the page imports neither Figure nor FigRef. Nothing else changes.

import type { Citation } from '../../lib/citation';
import {
  citeChicago as chicago,
  citeMla as mla,
  citeBibtex as bibtex,
} from '../../lib/citation';

export const CITATION: Citation = {
  title: 'Tumbleweed Smith and the Sounds of Texas',
  authors: ['Austin Allison'],
  orcid: 'https://orcid.org/0000-0001-6787-9636',
  status: 'feature',
  journal: 'Authentic Texas',
  dateLabel: 'Spring 2023',
  year: 2023,
  language: 'en',
  canonicalPath: '/publications/tumbleweed_smith',
  versions: [],
};

export const citeChicago = (): string => chicago(CITATION);
export const citeMla = (): string => mla(CITATION);
export const citeBibtex = (): string => bibtex(CITATION, 'allison2023tumbleweed');