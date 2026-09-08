// src/data/publications/ja_cattle_company.ts
// A contribution to the "Notes, Documents, and Sundries" department of the
// West Texas Historical Association Year Book. Not peer-reviewed scholarship,
// so status is 'feature' rather than 'record'.
//
// BUT: unlike the Avalanche-Journal columns, this one appeared in a numbered
// annual volume with real page numbers, so `volume`, `firstPage` and
// `lastPage` are set below instead of a `dateLabel`. All three are optional
// fields on Citation, so setting them is type-safe either way. If the
// rendered citation line and CiteThis come out WITHOUT "Vol. 88" and
// "pp. 173-175", then citation.ts's 'feature' branch doesn't read them yet —
// see the fallback comment at the bottom of CITATION.

import type { Citation, FigureSet } from '../../lib/citation';
import {
  citeChicago as chicago,
  citeMla as mla,
  citeBibtex as bibtex,
} from '../../lib/citation';

export const CITATION: Citation = {
  title: 'JA Cattle Company',
  authors: ['Austin Allison'],
  orcid: 'https://orcid.org/0000-0001-6787-9636',
  status: 'feature',
  journal: 'West Texas Historical Association Year Book',
  volume: '88',
  year: 2012,
  firstPage: 173,
  lastPage: 175,
  language: 'en',
  canonicalPath: '/publications/ja_cattle_company',
  versions: [],

  // FALLBACK, one line, no library change: if the 'feature' branch ignores
  // volume and pages and you would rather show something than nothing, delete
  // `volume`, `firstPage` and `lastPage` above and uncomment this.
  // dateLabel: 'Vol. 88 (2012)',
};

export const citeChicago = (): string => chicago(CITATION);
export const citeMla = (): string => mla(CITATION);
export const citeBibtex = (): string => bibtex(CITATION, 'allison2012jacattle');

/**
 * ONE figure, two plates: the two pages of a single warranty deed, which the
 * Year Book printed across pp. 174-175. They are one document making one
 * point, so they take one number and one caption rather than being stacked as
 * two separate figures. Unnumbered, per the short-piece pattern.
 *
 * The `alt` values describe what is visible on each sheet; the caption carries
 * what the document IS, and the credit carries the repository.
 */
export const FIGURES: FigureSet = {
  dir: 'ja_cattle_company',
  entries: [
    {
      id: 'goodnight-adair-deed',
      plates: [
        {
          file: 'ja_deed_p1.jpg',
          label: 'First page',
          alt: 'A printed warranty deed form completed in ink, naming Charles Goodnight of Armstrong County as grantor and Cornelia Adair, sole devisee of the estate of John G. Adair of Rathdaire, County Queens, Ireland, as grantee, followed by a handwritten description of the tract conveyed.',
        },
        {
          file: 'ja_deed_p2.jpg',
          label: 'Second page',
          alt: "The second sheet of the deed, carrying the close of the property description, the printed habendum and warranty clauses, Charles Goodnight's signature, and a notary's acknowledgment taken in Armstrong County.",
        },
      ],
      caption:
        'Warranty deed from Charles Goodnight to Cornelia Adair, executed at Palo Duro and acknowledged before R. B. Stephens, notary public, Armstrong County, March 15, 1886.',
      credit:
        'JA Cattle Company Records, Southwest Collection/Special Collections Library, Texas Tech University.',
      size: '3xl',
    },
  ],
};
