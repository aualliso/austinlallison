// src/data/publications/newspapers_oil_and_railroad_land.ts
// A "Notes, Documents, and Sundries" contribution, same department as
// [ja_cattle_company] but two volumes later — note the journal had been
// renamed by then: Vol. 88 (2012) ran as the WTHA Year Book, Vol. 90 (2014)
// as the West Texas Historical Review. The name below is the one printed on
// the running head of these pages.
//
// Three separate notes under one title, divided in print by a row of eight
// asterisks: the Darrouzett News, the Eastland/Callahan/Coleman oil
// newspapers, and the Southern Pacific land pamphlets.
//
// Same 'feature' + volume/pages arrangement as ja_cattle_company. If the
// citation line comes out without "Vol. 90" and "pp. 129-135", see the
// fallback comment at the bottom of CITATION.

import type { Citation, FigureSet } from '../../lib/citation';
import {
  citeChicago as chicago,
  citeMla as mla,
  citeBibtex as bibtex,
} from '../../lib/citation';

export const CITATION: Citation = {
  title: 'Newspapers, Oil, and Railroad Land',
  authors: ['Austin Allison'],
  orcid: 'https://orcid.org/0000-0001-6787-9636',
  status: 'feature',
  journal: 'West Texas Historical Review',
  volume: '90',
  year: 2014,
  firstPage: 129,
  lastPage: 135,
  language: 'en',
  canonicalPath: '/publications/newspapers_oil_and_railroad_land',
  versions: [],

  // FALLBACK, one line, no library change: if the 'feature' branch ignores
  // volume and pages, delete `volume`, `firstPage` and `lastPage` above and
  // uncomment this.
  // dateLabel: 'Vol. 90 (2014)',
};

export const citeChicago = (): string => chicago(CITATION);
export const citeMla = (): string => mla(CITATION);
export const citeBibtex = (): string => bibtex(CITATION, 'allison2014newspapersoil');

/**
 * Six figures, all unnumbered, in the order the Review printed them.
 *
 * CAPTIONS: only the Darrouzett front page and the two oil clippings carried
 * printed captions, so only those have `caption`/`label` text here. The other
 * four ran uncaptioned and stay uncaptioned — Figure skips the whole
 * <figcaption> when there is no caption, credit or number, and their `alt`
 * carries the description instead. Nothing here is invented.
 *
 * The two clippings on p. 132 ran side by side under separate captions, so
 * they are ONE figure with two labelled plates rather than two figures.
 */
export const FIGURES: FigureSet = {
  dir: 'newspapers_oil_railroad_land',
  entries: [
    {
      id: 'darrouzett-front-page',
      plates: [
        {
          file: 'darrouzett_news_1931_09_17.jpg',
          alt: 'The full front page of a small-format weekly newspaper, seven columns of dense type under a wide nameplate reading THE DARROUZETT NEWS, with a cartoon at the top centre and a boxed poem at the foot of the third column.',
        },
      ],
      caption: 'Darrouzett News, September 17, 1931',
      size: '2xl',
    },
    {
      id: 'cross-plains-masthead',
      plates: [
        {
          file: 'cross_plains_review_1922_04_28.jpg',
          alt: 'A newspaper nameplate clipping reading The Cross Plains Review, dated Cross Plains, Texas, Friday, April 28, 1922, above a full-width banner headline in spaced capitals: ANOTHER BIG GUSHER ENLIVENS LOCAL FIELD.',
        },
      ],
      size: '3xl',
    },
    {
      id: 'oil-clippings',
      plates: [
        {
          file: 'baird_star_1924_04_28.jpg',
          label: 'Baird Star, April 28, 1924',
          alt: 'A single-column newspaper clipping headed BOOST IN OIL PRICES, followed by a week-by-week field report listing operators, farms and drilling depths across Callahan County.',
        },
        {
          file: 'santa_anna_news_1918_09_18.jpg',
          label: 'Santa Anna News, September 18, 1918',
          alt: 'A single-column newspaper clipping headed TRICKHAM OIL WELL DAMAGED BY FIRE, giving an account of a gas explosion at the Robertson well and the response of the local gas company manager.',
        },
      ],
      size: '3xl',
    },
    {
      id: 'pecos-pamphlet-cover',
      plates: [
        {
          file: 'west_texas_beyond_the_pecos_cover.jpg',
          alt: 'The cover of a promotional pamphlet, ruled in heavy borders with a column of fleur-de-lis ornament, titled WEST TEXAS BEYOND THE PECOS above the line HER HEALTH GIVING QUALITIES, and imprinted Published by Passenger Department, Sunset Route, Houston, Texas.',
        },
      ],
      size: '2xl',
    },
    {
      id: 'high-bridge',
      plates: [
        {
          file: 'high_bridge_pecos_canon.jpg',
          alt: 'A halftone photograph of a long steel trestle carried on tall latticed towers across a rocky canyon, with a road or track running along the canyon floor beneath it. Printed beneath the image: HIGH BRIDGE, PECOS CANON, TEXAS, SUNSET ROUTE.',
        },
      ],
      size: '3xl',
    },
    {
      id: 'rio-grande-bluffs',
      plates: [
        {
          file: 'rio_grande_bluffs.jpg',
          alt: 'A halftone photograph of a river bending between low scrub-covered banks on the left and a high stratified bluff on the right. Printed beneath the image: RIO GRANDE BLUFFS, TEXAS, SUNSET ROUTE.',
        },
      ],
      size: '3xl',
    },
  ],
};
