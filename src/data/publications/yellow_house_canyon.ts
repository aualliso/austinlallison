// src/data/publications/yellow-house-canyon.ts
// A newspaper column — part of the Caprock Chronicles series in the Lubbock
// Avalanche-Journal, edited by Paul Carlson. Same citation shape as the other
// Avalanche-Journal pieces; the series name is carried by the page's eyebrow.

import type { Citation, FigureSet } from '../../lib/citation';
import {
  citeChicago as chicago,
  citeMla as mla,
  citeBibtex as bibtex,
} from '../../lib/citation';

export const CITATION: Citation = {
  title: 'Accounts Vary on Location of 1877 Battle of Yellow House Canyon',
  authors: ['Austin Allison'],
  orcid: 'https://orcid.org/0000-0001-6787-9636',
  status: 'feature',
  journal: 'Lubbock Avalanche-Journal',
  dateLabel: 'September 2, 2017',
  year: 2017,
  language: 'en',
  canonicalPath: '/publications/yellow_house_canyon',
  versions: [],
};

export const citeChicago = (): string => chicago(CITATION);
export const citeMla = (): string => mla(CITATION);
export const citeBibtex = (): string => bibtex(CITATION, 'allison2017yellowhouse');

/**
 * Two plates, both unnumbered. The second has NO caption in the original and
 * keeps none here — its `alt` carries the description instead, since there is
 * no figcaption to serve as the text alternative. `alt` values are Austin's own.
 */
export const FIGURES: FigureSet = {
  dir: 'yellow_house_canyon',
  entries: [
    {
      id: 'canyon-location-map',
      plates: [
        {
          file: 'yellow_house_canyon_map.jpg',
          alt: "Map of Lubbock County showing Yellow House Draw, Blackwater Draw, Thompson's Canyon, and Yellow House Canyon, with the shaded area encompassing Mackenzie Park and the locations described by Cook, Collinson, and Glenn",
        },
      ],
      caption:
        'Shaded area encompasses Mackenzie Park and locations described by Cook, Collinson, and Glenn.',
      size: '3xl',
    },
    {
      id: 'battle-illustration',
      plates: [
        {
          file: 'cook_image.jpg',
          alt: '19th-century illustration depicting mounted riflemen engaged in the battle of Yellow House Canyon',
        },
      ],
      // No caption and no credit in the original — the figure renders with
      caption: 'Illustration to accompany account of the battle of Yellow House Canyon. Drawn by Bert Judia. 1911',
      size: '3xl',
    },
  ],
};