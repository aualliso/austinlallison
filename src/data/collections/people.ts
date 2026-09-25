// src/data/collections/people.ts
//
// THE NAME AUTHORITY FILE.
//
// One record per person: an established heading, every variant form that
// person is found under, and the sources the heading rests on. Items point at
// these by id and never restate a name, so a person is a controlled access
// point rather than however the name happened to be typed on any one object.
//
// `status: 'provisional'` means the heading rests only on this collection's
// own objects. Nothing below is established yet, because nothing below has
// been checked against a census, a headstone, a published record or an
// existing authority. Say so rather than implying otherwise.
//
// EVERY relation comes off the back of an object. Nothing here is from a
// family tree or from my own inference. When you add relations from research,
// put the source in `basis` and add the citation to `sources`.

import type { Person } from './types';
export { heading, headingDates } from './types';

// DATES were added 2026-09-10 from Find a Grave memorials supplied by you.
//
// VERIFICATION IS UNEVEN AND EACH RECORD SAYS SO. Three memorials were read
// in full - B B Thomas (82115849), Malcom Swann (8153610) and Austin Swann
// (7284582). The remaining years come from the FAMILY LISTINGS on those three
// pages, which print each relative's dates beside the link. Same database,
// but the memorial page itself has not been read, and the source line for
// each of those says as much. Read them and tighten the citation when you
// get a chance.
//
// The shape, for anything you add later:
//
//   { birth: '1834', death: '1912' }                  -> Swann, Malcom, 1834-1912
//   { birth: '1861', dateType: 'approximate' }        -> Thomas, M. B., approximately 1861-
//   { birth: '1885', death: '1901', dateType: 'active' } -> Naylor, Charley, active 1885-1901
//   { qualifier: 'cotton ginner' }                    -> Swann, John, cotton ginner
//
// And add the citation to `sources`: a date is a claim like any other, and a
// headstone photograph, a census line or an obituary is what makes it one.



export const PEOPLE: Person[] = [
  { 
    id: 'paddock-delbert-adam',
    authorized: 'D.A. Paddock',
    surname: 'Paddock',
    given: 'Delbert Adam',
    variants: ['Delbert Adam Paddock'],
    birth: '1883',
    death: '1959',
    status: 'established',
    sources: ['Found references to D.A. Paddock in Roswell, New Mexico newspapers from the 1900s and early 1910s. He was a teacher in Hagerman',
      'findagrave.com index number: 16507579',
      'Paddock may have been the superintendent of schools at Hagerman'
    ],
  },
  { 
    id: 'adair-fletcher-absalom',
    authorized: 'F.A. Adair',
    surname: 'Adair',
    given: 'Fletcher Absalom',
    variants: ['Fletcher Absalom Adair'],
    birth: '1879',
    death: '1962',
    status: 'established',
    sources: ['Found references to F.A. Adair in Roswell, New Mexico newspapers from the 1900s and early 1910s. He was a teacher in Hagerman',
      'findagrave.com index number: 6308153.',
      'Adair may have been the principal at the Hagerman schools.'
    ],
  },
  {
    id: 'thomas-benjamin-b',
    authorized: 'Thomas, Benjamin B.',
    surname: 'Thomas',
    given: 'Benjamin B.',
    variants: ['Thomas, Benjamin', 'Thomas, B. B.'],
    birth: '1827',
    death: '1909',
    status: 'established',
    sources: [
      'Supplied with the portrait as "Thomas, Benjamin B."',
      'Find a Grave memorial 82115849, read in full: "B B Thomas", 14 Nov 1827 - 5 Oct 1909, Hermleigh Cemetery, Hermleigh, Scurry County, Tex.; accessed 10 Sep 2026',
    ],
    scopeNote:
      'Father of the five children named on the verso of his portrait. His memorial is headed "B B Thomas", which supports the initials; it lists only two of the five children the verso names, so the verso remains the fuller source for the family.',
    relations: [
      { type: 'spouse', person: 'thomas-minerva-hunter', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'patterson-rockett-thomas', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'swann-nannie-thomas', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'miller-emma-thomas', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'thomas-norphlet-bud', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'thomas-john', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'darby-mattie-thomas', basis: 'Established relationship', confidence: 'certain' },
    ],
  },
  {
    id: 'thomas-minerva-hunter',
    authorized: 'Thomas, Minerva Hunter',
    surname: 'Thomas',
    given: 'Minerva',
    birth: '1836',
    death: '1925',
    variants: ['Hunter, Minerva'],
    status: 'established',
    sources: [
      'Supplied with the portrait as "Thomas, Minerva Hunter"; source unrecorded, and nothing on the object identifies the sitter',
    ],
     relations: [
      { type: 'spouse', person: 'thomas-benjamin-b', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'patterson-rockett-thomas', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'swann-nannie-thomas', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'miller-emma-thomas', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'thomas-norphlet-bud', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'thomas-john', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'darby-mattie-thomas', basis: 'Established relationship', confidence: 'certain' },
    ],
    // TODO: the two portraits are a matched pair, but NOTHING on either object
    // states a marriage. Add the relation when you have a source for it.
  },
  {
    id: 'patterson-rockett-thomas',
    authorized: 'Patterson, Rockett Thomas',
    surname: 'Patterson',
    given: 'Rockett',
    variants: ['Thomas, Rockett', 'Patterson, Rockett Ann', 'Thomas, Rockett Ann'],
    birth: '1858',
    death: '1946',
    status: 'established',
    sources: [
      'Find a Grave memorial 83870981, as linked from B B Thomas\'s memorial (82115849): "Rocket Ann Thomas Patterson 1858-1946"; the memorial page itself not yet read',
    ],
    relations: [
      { type: 'parent', person: 'thomas-benjamin-b', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'thomas-minerva-hunter', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'swann-nannie-thomas', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'miller-emma-thomas', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'thomas-norphlet-bud', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'thomas-john', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'darby-mattie-thomas', basis: 'Established relationship', confidence: 'certain' },

    ],
    scopeNote:
      'Given name transcribed as written on the verso; the unusual name is confirmed by her memorial, which gives it as "Rocket Ann".',
   },
  {
    id: 'swann-nannie-thomas',
    authorized: 'Swann, Nannie Thomas',
    surname: 'Swann',
    given: 'Nannie',
    variants: ['Thomas, Nan', 'Swann, Nannie G.', 'Thomas, Nannie G.'],
    birth: '1864',
    death: '1896',
    status: 'established',
    sources: [
      'Find a Grave memorial 7284581, as linked from Austin Swann\'s memorial (7284582): "Nannie G. Thomas Swann 1864-1896"; the memorial page itself not yet read',
      'Hunt County, Texas, Marriages 1846-1911, p. 471: married Austin Swann 16 Apr 1885; died 17 Apr 1896 per his obituary (both transcribed on memorial 7284582)',
    ],
    // TODO: the heading follows the verso ("Nan"); Find a Grave and the county
    // marriage record both read "Nannie G." Worth deciding which form is
    // authoritative - both are entered as variants either way.
    relations: [
      {
        type: 'spouse',
        person: 'swann-austin',
        basis:
          'Established relationship',
        confidence: 'certain',
      },
      {
        type: 'parent',
        person: 'thomas-benjamin-b',
        confidence: 'certain',
        basis: 'Established Relationship'
      },
      {
        type: 'parent',
        person: 'thomas-minerva-hunter',
        confidence: 'certain',
        basis: 'Established Relationship'
      },
      { type: 'child', person: 'west-eva-swann-powell', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'mckinstry-minnie-swann', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'mckinstry-loveta-swann', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'patterson-rockett-thomas', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'miller-emma-thomas', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'thomas-norphlet-bud', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'thomas-john', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'darby-mattie-thomas', basis: 'Established relationship', confidence: 'certain' },

    ],
  },
   {
    id: 'miller-emma-thomas',
    authorized: 'Miller, Emma Thomas',
    surname: 'Miller',
    given: 'Emma',
    birth: '1867',
    variants: ['Thomas, Emma'],
    status: 'established',
    relations: [
      { type: 'parent', person: 'thomas-benjamin-b', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'thomas-minerva-hunter', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'patterson-rockett-thomas', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'swann-nannie-thomas', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'thomas-norphlet-bud', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'thomas-john', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'darby-mattie-thomas', basis: 'Established relationship', confidence: 'certain' },

    ],
  },
  {
    id: 'thomas-norphlet-bud',
    authorized: 'Thomas, Norphlet B.',
    surname: 'Thomas',
    given: 'Norphlet. B.',
    birth: '1870',
    death: '1933',
    variants: ['Thomas, Bud', 'Bud Thomas'],
    status: 'established',
    sources: [
      'Supplied with the musicians cabinet card as "Bud Thomas"',
    ],
    scopeNote: 'Son of Benjamin B. Thomas. The two forms are treated as one person on the strength of the nickname within a single family group; see the basis on the cabinet card.',
    relations: [
      { type: 'parent', person: 'thomas-benjamin-b', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'thomas-minerva-hunter', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'patterson-rockett-thomas', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'swann-nannie-thomas', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'miller-emma-thomas', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'thomas-john', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'darby-mattie-thomas', basis: 'Established relationship', confidence: 'certain' },

    ],
  },
  {
    id: 'thomas-john',
    authorized: 'Thomas, John',
    surname: 'Thomas',
    given: 'John',
    birth: '1872',
    death: '1955',
    status: 'established',
    relations: [
      { type: 'spouse', person: 'thomas-sallie-foster', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'thomas-benjamin-b', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'thomas-minerva-hunter', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'sheram-frances-thomas', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'patterson-rockett-thomas', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'swann-nannie-thomas', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'miller-emma-thomas', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'thomas-norphlet-bud', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'darby-mattie-thomas', basis: 'Established relationship', confidence: 'certain' },
    ],
  },
  {
    id: 'thomas-sallie-foster',
    authorized: 'Thomas, Sallie Foster',
    surname: 'Thomas',
    given: 'Sallie Foster',
    birth: '1875',
    death: '1934',
    status: 'established',
    relations: [
      { type: 'spouse', person: 'thomas-john', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'sheram-frances-thomas', basis: 'Established relationship', confidence: 'certain' },
    ],
  },
  {
    id: 'sheram-frances-thomas',
    authorized: 'Sheram, Frances Thomas',
    surname: 'Sheram',
    given: 'Frances Thomas',
    birth: '1901',
    death: '1990',
    status: 'established',
    relations: [
      { type: 'parent', person: 'thomas-john', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'thomas-sallie-foster', basis: 'Established relationship', confidence: 'certain' },
    ],
  },
  {
    id: 'darby-mattie-thomas',
    authorized: 'Darby, Mattie Thomas',
    surname: 'Darby',
    given: 'Mattie',
    birth: '1875',
    death: '1972',
    variants: ['Thomas, Mattie'],
    status: 'established',
    relations: [
      { type: 'parent', person: 'thomas-benjamin-b', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'thomas-minerva-hunter', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'patterson-rockett-thomas', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'swann-nannie-thomas', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'miller-emma-thomas', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'thomas-norphlet-bud', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'thomas-john', basis: 'Established relationship', confidence: 'certain' },

    ],
  },
  {
    id: 'swann-malcom',
    authorized: 'Swann, Malcom',
    surname: 'Swann',
    given: 'Malcom',
    variants: ['Swann, Malcolm'],
    birth: '1828',
    death: '1910',
    status: 'established',
    sources: [
      'Verso of the gin photograph, in ink, as "Malcom Swann"',
      'Supplied with the Oklahoma camp photograph as "Malcom Swann"',
      'Find a Grave memorial 8153610, read in full: "Malcom Swann", 22 Jan 1828 - 15 Apr 1910, Concord Cemetery, Jacobia, Hunt County, Tex.; accessed 10 Sep 2026. The memorial spells the given name "Malcom", agreeing with the verso.',
    ],
    scopeNote:
      'Heading follows the spelling on the verso of the gin photograph; "Malcolm" is entered as a variant.',
    relations: [
      { type: 'spouse', person: 'swann-nancy-atkinson', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'swann-annie', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'swann-austin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'girdner-lizzie-swann', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'swann-john-milton', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'bouknight-phebe-swann', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'girdner-nannie-atkinson-swann', basis: 'Established relationship', confidence: 'certain' },
    ],
  },
  
  /* ---------------------------------------------------------------- *
   * Added 2026-09-10 from the Find a Grave list. None of these people
   * appears in a photograph yet - they are here because they are named
   * in the sources for people who do, and because a heading is worth
   * establishing once rather than twice.
   * ---------------------------------------------------------------- */
  {
    id: 'swann-nancy-atkinson',
    authorized: 'Swann, Nancy C. Atkinson',
    surname: 'Swann',
    given: 'Nancy C.',
    variants: ['Atkinson, Nancy C.', 'Swann, Nancy', 'Swann, Nancy California Atkinson'],
    birth: '1836',
    death: '1899',
    status: 'established',
    scopeNote: 'Wife of Malcom Swann; mother of Austin Swann. Some records indicate that her middle name is "California." ',
    sources: [
      'Find a Grave memorial 8153613, as linked from Malcom Swann\'s memorial (8153610) as his spouse: "Nancy C Atkinson Swann 1836-1899"; the memorial page itself not yet read',
    ],
    relations: [
      { type: 'spouse', person: 'swann-malcom', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'swann-annie', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'swann-austin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'girdner-lizzie-swann', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'swann-john-milton', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'bouknight-phebe-swann', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'girdner-nannie-atkinson-swann', basis: 'Established relationship', confidence: 'certain' },
    ],
  },
  {
    id: 'swann-annie',
    authorized: 'Swann, Annie',
    surname: 'Swann',
    given: 'Annie',
    birth: '1859',
    death: '1860',
    status: 'established',
    scopeNote: 
    'Eldest daughter of Malcom and Nancy C. Swann. Born 1859 and died in 1860.',
    sources: ['Handwritten note included with photograph. Swann family genealogy sheet'],
    relations: [
      { type: 'parent', person: 'swann-malcom', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'swann-nancy-atkinson', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'swann-annie', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'swann-austin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'girdner-lizzie-swann', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'swann-john-milton', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'bouknight-phebe-swann', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'girdner-nannie-atkinson-swann', basis: 'Established relationship', confidence: 'certain' },
    ],
  },
  {
    id: 'swann-austin',
    authorized: 'Swann, Austin',
    surname: 'Swann',
    given: 'Austin',
    birth: '1860',
    death: '1931',
    status: 'established',
    scopeNote:
      'Born near Macon, Mississippi; came to Hunt County, Texas as a child; removed to Hagerman, New Mexico in 1908 and died there.',
    sources: [
      'Find a Grave memorial 7284582, read in full: "Austin Swann", 30 Dec 1860 (Mississippi) - 30 May 1931 (Hagerman, Chaves County, N.M.), buried Concord Cemetery, Jacobia, Hunt County, Tex.; accessed 10 Sep 2026',
      'Hunt County, Texas, Marriages 1846-1911, p. 471, vol. E p. 12: Austin Swann and Nannie G. Thomas, married 16 Apr 1885 (transcribed on the memorial above)',
      'Obituary, Greenville (Tex.) Evening Banner, 1 and 3 Jun 1931, p. 8 (transcribed on the memorial above)',
    ],
    relations: [
      {
        type: 'spouse',
        person: 'swann-nannie-thomas',
        basis: 'Established relationship',
        confidence: 'certain',
      },
      { type: 'parent', person: 'swann-malcom', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'swann-nancy-atkinson', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'west-eva-swann-powell', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'mckinstry-minnie-swann', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'mckinstry-loveta-swann', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'swann-annie', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'girdner-lizzie-swann', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'swann-john-milton', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'bouknight-phebe-swann', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'girdner-nannie-atkinson-swann', basis: 'Established relationship', confidence: 'certain' },
    ],
  },
  {
    id: 'girdner-lizzie-swann',
    authorized: 'Girdner, Lizzie Swann',
    surname: 'Girdner',
    given: 'Lizzie Swann',
    birth: '1864',
    death: '1956',
    status: 'established',
    sources: [
      'Find a Grave memorial 8155600',
    ],
    relations: [
      { type: 'parent', person: 'swann-malcom', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'swann-nancy-atkinson', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'swann-annie', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'swann-austin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'swann-john-milton', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'bouknight-phebe-swann', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'girdner-nannie-atkinson-swann', basis: 'Established relationship', confidence: 'certain' },
    ],
  },
  {
    id: 'swann-john-milton',
    authorized: 'Swann, John',
    surname: 'Swann',
    given: 'John',
    birth: '1867',
    death: '1941',
    status: 'established',
    sources: [
      'Verso of the Swann, Girdner & Swann thresher photograph, in ink, as "John Swann"',
    ],
    scopeNote:
      'Named as the one member of the threshing crew whose family did not travel with the outfit.',
    relations: [
      { type: 'spouse', person: 'swann-gussie-cody', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'swann-malcom', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'swann-nancy-atkinson', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'swann-annie', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'swann-austin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'girdner-lizzie-swann', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'bouknight-phebe-swann', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'girdner-nannie-atkinson-swann', basis: 'Established relationship', confidence: 'certain' },
    ],
  },
  {
    id: 'swann-gussie-cody',
    authorized: 'Swann, Gussie Cody',
    surname: 'Swann',
    given: 'Gussie Cody',
    birth: '1875',
    death: '1974',
    status: 'established',
    sources: [
      'Findagrave record number 8153617',
    ],
    relations: [
      { type: 'spouse', person: 'swann-john-milton', basis: 'Established relationship', confidence: 'certain' },
    ],
  },
  {
    id: 'waddle-mable-swann',
    authorized: 'Waddle, Mable Swann',
    surname: 'Waddle',
    given: 'Mable Swann',
    birth: '1895',
    death: '1983',
    status: 'established',
    sources: [
      'Findagrave record number 8137055',
    ],
    relations: [
      { type: 'parent', person: 'swann-john-milton', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'swann-gussie-cody', basis: 'Established relationship', confidence: 'certain' },
    ],
  },
  {
    id: 'waddle-william-arthur',
    authorized: 'Waddle, William Arthur',
    surname: 'Waddle',
    given: 'William Arthur',
    birth: '1891',
    death: '1951',
    status: 'established',
    sources: [
      'Findagrave record number 8137049',
    ],
    relations: [
      { type: 'spouse', person: 'waddle-mable-swann', basis: 'Established relationship', confidence: 'certain' },
    ],
  },
  {
    id: 'bouknight-phebe-swann',
    authorized: 'Bouknight, Phebe Swann',
    surname: 'Bouknight',
    given: 'Phebe Swann',
    birth: '1871',
    death: '1935',
    status: 'established',
    relations: [
      { type: 'spouse', person: 'bouknight-paul-alexander', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'swann-malcom', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'swann-nancy-atkinson', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'swann-annie', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'swann-austin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'girdner-lizzie-swann', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'swann-john-milton', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'girdner-nannie-atkinson-swann', basis: 'Established relationship', confidence: 'certain' },
    ],
  },
  {
    id: 'bouknight-paul-alexander',
    authorized: 'Bouknight, Paul Alexander',
    surname: 'Bouknight',
    given: 'Paul Alexander',
    birth: '1859',
    death: '1918',
    status: 'established',
    relations: [
      { type: 'spouse', person: 'bouknight-phebe-swann', basis: 'Established relationship', confidence: 'certain' },
    ],
  },
  {
    id: 'harrison-juanita-bouknight',
    authorized: 'Harrison, Juanita Bouknight',
    surname: 'Harrison',
    given: 'Juanita Bouknight',
    birth: '1891',
    death: '1941',
    status: 'established',
    relations: [
      { type: 'parent', person: 'bouknight-paul-alexander', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'bouknight-phebe-swann', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'bouknight-raymond-ardre', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'bouknight-thurman-alexander', basis: 'Established relationship', confidence: 'certain' },
    ],
  },
  {
    id: 'bouknight-raymond-ardre',
    authorized: 'Bouknight, Raymond Ardre',
    surname: 'Bouknight',
    given: 'Raymond Ardre',
    birth: '1894',
    death: '1951',
    status: 'established',
    relations: [
      { type: 'parent', person: 'bouknight-paul-alexander', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'bouknight-phebe-swann', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'harrison-juanita-bouknight', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'bouknight-thurman-alexander', basis: 'Established relationship', confidence: 'certain' },
    ],
  },
  {
    id: 'bouknight-thurman-alexander',
    authorized: 'Bouknight, Thurman Alexander',
    surname: 'Bouknight',
    given: 'Thurman Alexander',
    birth: '1896',
    death: '1966',
    status: 'established',
    relations: [
      { type: 'parent', person: 'bouknight-paul-alexander', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'bouknight-phebe-swann', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'bouknight-raymond-ardre', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'bouknight-thurman-alexander', basis: 'Established relationship', confidence: 'certain' },
    ],
  },
  {
    id: 'girdner-nannie-atkinson-swann',
    authorized: 'Girdner, Nannie Atkinson Swann',
    surname: 'Girdner',
    given: 'Nannie Atkinson Swann',
    birth: '1878',
    death: '1971',
    status: 'established',
    relations: [
      { type: 'spouse', person: 'girdner-charles-edgar', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'girdner-vena', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'swann-malcom', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'swann-nancy-atkinson', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'swann-annie', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'swann-austin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'girdner-lizzie-swann', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'swann-john-milton', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'bouknight-phebe-swann', basis: 'Established relationship', confidence: 'certain' },
    ],
  },
  {
    id: 'girdner-charles-edgar',
    authorized: 'Girdner, Charles "Charlie" Edgar (C.E.)',
    surname: 'Girdner',
    given: 'Charles Edgar',
    variants: ['Girdner, Charlie', 'Girdner, Charles', 'Girdner, C.E.'],
    birth: '1875',
    death: '1954',
    status: 'established',
    relations: [
      { type: 'spouse', person: 'girdner-nannie-atkinson-swann', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'girdner-vena', basis: 'Established relationship', confidence: 'certain' },
    ],
  },
  {
    id: 'girdner-vena',
    authorized: 'Girdner, Vena',
    surname: 'Girdner',
    given: 'Vena',
    variants: ['Girdner, Vena', 'Vena Girdner'],
    birth: '1900',
    death: '1905',
    status: 'established',
    relations: [
      { type: 'parent', person: 'girdner-charles-edgar', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'girdner-nannie-atkinson-swann', basis: 'Established relationship', confidence: 'certain' },
    ],
  },
  {
    id: 'west-eva-swann-powell',
    authorized: 'West, Eva Swann',
    surname: 'West',
    given: 'Eva Swann Powell',
    variants: ['Swann, Eva Swann Powell'],
    birth: '1886',
    death: '1979',
    status: 'established',
    scopeNote:
      'Eldest daughter of Austin Swann and Nannie Thomas Swann. Of Hagerman, New Mexico; the "Mrs. B.J. West" of her father\'s obituary.',
    sources: [
      'Find a Grave memorial 52583012, as linked from Austin Swann\'s memorial (7284582) as his child: "Eva Powell Swann West 1886-1979"; the memorial page itself not yet read',
      'Named as a surviving daughter in Austin Swann\'s obituary, Greenville (Tex.) Evening Banner, 1 and 3 Jun 1931',
    ],
    relations: [
      { type: 'spouse', person: 'west-benjamin-jackson', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'swann-austin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'swann-nannie-thomas', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-minnie-swann', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-loveta-swann', basis: 'Established relationship', confidence: 'certain' },
    ],
  },
  {
    id: 'west-benjamin-jackson',
    authorized: 'West, Benjamin Jackson',
    surname: 'West',
    given: 'Benjamin Jackson',
    variants: ['West, Ben Jack', 'Benjamin Jackson West', 'Ben West', 'West, Ben'],
    birth: '1872',
    death: '1947',
    status: 'established',
    scopeNote:
      'The second husband of Eva Swann. They married in 1922',
    sources: [
      'Find a Grave memorial 52583010,'
    ],
    relations: [
      { type: 'spouse', person: 'west-eva-swann-powell', basis: 'Established relationship', confidence: 'certain' },
    ],
  },
  {
    id: 'mckinstry-minnie-swann',
    authorized: 'McKinstry, Minnie Swann',
    surname: 'McKinstry',
    given: 'Minnie',
    variants: ['Swann, Minnie'],
    birth: '1890',
    death: '1964',
    status: 'established',
    scopeNote:
      'Daughter of Austin Swann and Nan Thomas Swann. One of the two "Mrs. McKinstry" daughters of Hagerman, New Mexico named in her father\'s obituary.',
    sources: [
      'Find a Grave memorial 52582949, as linked from Austin Swann\'s memorial (7284582) as his child: "Minnie Swann McKinstry 1890-1964"; the memorial page itself not yet read',
    ],
    relations: [
      { type: 'spouse', person: 'mckinstry-james-daubin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'smith-peggy-mckinstry', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'swann-austin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'swann-nannie-thomas', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'west-eva-swann-powell', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-loveta-swann', basis: 'Established relationship', confidence: 'certain' },
    ],
  },
  {
    id: 'smith-peggy-mckinstry',
    authorized: 'Smith, Peggy McKinstry',
    surname: 'Smith',
    given: 'Peggy McKinstry',
    variants: ['McKinstry, Peggy', 'Peggy McKinstry', 'Peggy Smith'],
    birth: '1926',
    death: '1981',
    status: 'established',
    scopeNote:
      'Daughter of James Daubin McKinstry and Minnie Swann McKinstry',
    sources: [
      'Find a Grave memorial 52582986.',
    ],
    relations: [
      { type: 'parent', person: 'mckinstry-james-daubin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'mckinstry-minnie-swann', basis: 'Established relationship', confidence: 'certain' },
    ],
  },
  {
    id: 'mckinstry-loveta-swann',
    authorized: 'McKinstry, Loveta Swann',
    surname: 'McKinstry',
    given: 'Loveta',
    variants: ['Swann, Loveta', 'Cumpsten, Loveta Swann', 'McKinstry-Cumpsten, Loveta'],
    birth: '1893',
    death: '1988',
    status: 'established',
    scopeNote:
      'Youngest surviving daughter of Austin Swann and Nannie Thomas Swann. Her memorial is headed "McKinstry-Cumpsten", showing her second marriage to Robert (Bob) Cumpsten; the heading here takes the form under which she appears in the family record.',
    sources: [
      'Find a Grave memorial 52656923, as linked from Austin Swann\'s memorial (7284582) as his child: "Loveta Swann McKinstry-Cumpsten 1893-1988"; the memorial page itself not yet read',
    ],
    relations: [
      { type: 'spouse', person: 'mckinstry-samuel-small', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'allison-sammy-nan-mckinstry', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'allison-veta-jean-mckinstry', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'osborn-mildred-adeline-mckinstry', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'swann-austin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'swann-nannie-thomas', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'west-eva-swann-powell', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-minnie-swann', basis: 'Established relationship', confidence: 'certain' },
    ],
  },
  {
    id: 'mckinstry-samuel-small',
    authorized: 'McKinstry, Samuel Small',
    surname: 'McKinstry',
    given: 'Samuel Small',
    birth: '1878',
    death: '1955',
    variants: ['McKinstry, Sam'],
    status: 'established',
    scopeNote:
      'The "Mrs. Sam McKinstry" of Austin Swann\'s obituary is one of his daughters, so this is very likely her husband - but nothing consulted states it, and the relation is not entered.',
    // TODO: memorial 52656978 could not be read (rate-limited). Dates are
    // still unknown; this is the one record in the batch with none.
    sources: [
      'Find a Grave memorial 52656978, supplied by you; not yet read',
    ],
    relations: [
      { type: 'spouse', person: 'mckinstry-loveta-swann', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'allison-sammy-nan-mckinstry', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'allison-veta-jean-mckinstry', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'osborn-mildred-adeline-mckinstry', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'mckinstry-james', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'mckinstry-sarah-boyd', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-thomas', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'cole-elizabeth-mckinstry', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-william-boyd', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-john-henry', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-james-daubin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-harrison-lee', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-adeline', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-robert-frederick', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'west-edith-mary-mckinstry', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'allison-sammy-nan-mckinstry',
    authorized: 'Allison, Sammy Nan McKinstry',
    surname: 'Allison',
    given: 'Sammy Nan McKinstry',
    birth: '1920',
    death: '2009',
    variants: ['McKinstry, Sammy', 'Hewatt, Sammy', 'Sammy Allison', 'Allison, Sammy', 'Sammy McKinstry'],
    status: 'established',
    scopeNote:
      'Sammy Nan McKinstry Allison was born on February 20, 1920 in Hagerman, New Mexico. She died on December 22, 2009 in Amarillo, Texas. She is buried in Muleshoe.',
    // TODO: memorial 52656978 could not be read (rate-limited). Dates are
    // still unknown; this is the one record in the batch with none.
    sources: [
      'Find a Grave memorial 45723671',
    ],
    relations: [
      { type: 'parent', person: 'mckinstry-samuel-small', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'mckinstry-loveta-swann', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-veta-jean-mckinstry', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'osborn-mildred-adeline-mckinstry', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'allison-veta-jean-mckinstry',
    authorized: 'Allison, Veta Jean McKinstry',
    surname: 'Allison',
    given: 'Veta Jean McKinstry',
    birth: '1922',
    death: '2020',
    variants: ['McKinstry, Jean', 'Allison, Jean', 'Jean Allison', 'Veta Jean McKinstry', 'Jean McKinstry', 'Veta Jean Allison'],
    status: 'established',
    scopeNote:
      'Veta Jean McKinstry Allison was born on November 8, 1922 in Hagerman, New Mexico. She died on June 20, 2020 in San Antonio, Texas. She is buried in Muleshoe.',
    // TODO: memorial 52656978 could not be read (rate-limited). Dates are
    // still unknown; this is the one record in the batch with none.
    sources: [
      'Find a Grave memorial 211790000',
    ],
    relations: [
      { type: 'spouse', person: 'allison-harold-lamar', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'mckinstry-samuel-small', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'mckinstry-loveta-swann', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-sammy-nan-mckinstry', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'osborn-mildred-adeline-mckinstry', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'osborn-mildred-adeline-mckinstry',
    authorized: 'Osborn, Mildred Adeline McKinstry',
    surname: 'Osborn',
    given: 'Mildred Adeline McKinstry',
    birth: '1927',
    death: '2012',
    variants: ['McKinstry, Mildred', 'Osborn, Mildred', 'Mildred Osborn', 'Mildred Adeline McKinstry', 'Mildred McKinstry', 'Mildred Adeline Osborn'],
    status: 'established',
    scopeNote:
      'Mildred Adeline McKinstry Osborn was born on December 17, 1927 in Hagerman, New Mexico. She died on September 2, 2012 in Lubbock, Texas. She is buried in Lovington, New Mexico.',
    // TODO: memorial 52656978 could not be read (rate-limited). Dates are
    // still unknown; this is the one record in the batch with none.
    sources: [
      'Find a Grave memorial 96413628',
    ],
    relations: [
      { type: 'parent', person: 'mckinstry-samuel-small', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'mckinstry-loveta-swann', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-sammy-nan-mckinstry', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-veta-jean-mckinstry', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'mckinstry-james',
    authorized: 'McKinstry, James',
    surname: 'McKinstry',
    given: 'James',
    birth: '1830',
    death: '1912',
    variants: ['McKinstry, James', 'James McKinstry, Sr.'],
    status: 'established',
    sources: [
      'Find a Grave memorial 52215508.',
    ],
    relations: [
      { type: 'spouse', person: 'mckinstry-sarah-boyd', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'mckinstry-thomas', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'cole-elizabeth-mckinstry', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'mckinstry-william-boyd', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'mckinstry-john-henry', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'mckinstry-james-daubin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'mckinstry-samuel-small', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'mckinstry-harrison-lee', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'mckinstry-adeline', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'mckinstry-robert-frederick', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'west-edith-mary-mckinstry', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'mckinstry-sarah-boyd',
    authorized: 'McKinstry, Sarah Boyd',
    surname: 'McKinstry',
    given: 'Sarah Boyd',
    birth: '1848',
    death: '1917',
    variants: ['McKinstry, Sarah', 'Sarah Boyd McKinstry'],
    status: 'established',
    sources: [
      'Find a Grave memorial 80117545.',
    ],
    relations: [
      { type: 'spouse', person: 'mckinstry-james', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'cole-elizabeth-mckinstry', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'mckinstry-william-boyd', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'mckinstry-john-henry', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'mckinstry-james-daubin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'mckinstry-samuel-small', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'mckinstry-harrison-lee', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'mckinstry-adeline', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'mckinstry-robert-frederick', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'west-edith-mary-mckinstry', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'mckinstry-thomas',
    authorized: 'McKinstry, Thomas',
    surname: 'McKinstry',
    given: 'Thomas',
    birth: '1869',
    death: '1940',
    variants: ['McKinstry, Thomas', 'Thomas McKinstry'],
    status: 'established',
    sources: [
      'Find a Grave memorial 80117546.',
    ],
    relations: [
      { type: 'parent', person: 'mckinstry-james', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'mckinstry-sarah-boyd', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'cole-elizabeth-mckinstry', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-william-boyd', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-john-henry', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-james-daubin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-samuel-small', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-harrison-lee', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-adeline', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-robert-frederick', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'west-edith-mary-mckinstry', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'cole-elizabeth-mckinstry',
    authorized: 'Cole, Elizabeth McKinstry',
    surname: 'Cole',
    given: 'Elizabeth McKinstry',
    birth: '1891',
    death: '1949',
    variants: ['McKinstry, Elizabeth', 'Elizabeth McKinstry', 'Elizabeth McKinstry Cole'],
    status: 'established',
    sources: [
      'Find a Grave memorial 80118562.',
    ],
    relations: [
      { type: 'parent', person: 'mckinstry-james', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'mckinstry-sarah-boyd', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-thomas', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-william-boyd', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-john-henry', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-james-daubin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-samuel-small', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-harrison-lee', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-adeline', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-robert-frederick', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'west-edith-mary-mckinstry', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'mckinstry-william-boyd',
    authorized: 'McKinstry, William Boyd',
    surname: 'McKinstry',
    given: 'William Boyd',
    birth: '1872',
    death: '1954',
    variants: ['McKinstry, William', 'William Boyd McKinstry'],
    status: 'established',
    sources: [
      'Find a Grave memorial 263770694.',
    ],
    relations: [
      { type: 'parent', person: 'mckinstry-james', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'mckinstry-sarah-boyd', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-thomas', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'cole-elizabeth-mckinstry', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-john-henry', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-james-daubin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-samuel-small', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-harrison-lee', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-adeline', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-robert-frederick', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'west-edith-mary-mckinstry', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'mckinstry-john-henry',
    authorized: 'McKinstry, John Henry',
    surname: 'McKinstry',
    given: 'John Henry',
    birth: '1874',
    death: '1918',
    variants: ['McKinstry, John', 'John Henry McKinstry'],
    status: 'established',
    sources: [
      'Find a Grave memorial 45983008.',
    ],
    relations: [
      { type: 'parent', person: 'mckinstry-james', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'mckinstry-sarah-boyd', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-thomas', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'cole-elizabeth-mckinstry', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-william-boyd', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-james-daubin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-samuel-small', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-harrison-lee', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-adeline', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-robert-frederick', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'west-edith-mary-mckinstry', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'mckinstry-james-daubin',
    authorized: 'McKinstry, James Daubin',
    surname: 'McKinstry',
    given: 'James Daubin',
    birth: '1876',
    death: '1963',
    variants: ['McKinstry, James', 'James Daubin McKinstry', 'Jim McKinstry'],
    status: 'established',
    sources: [
      'Find a Grave memorial 52582948.',
    ],
    relations: [
      { type: 'spouse', person: 'mckinstry-minnie-swann', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'smith-peggy-mckinstry', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'mckinstry-james', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'mckinstry-sarah-boyd', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-thomas', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'cole-elizabeth-mckinstry', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-william-boyd', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-john-henry', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-samuel-small', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-harrison-lee', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-adeline', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-robert-frederick', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'west-edith-mary-mckinstry', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'mckinstry-harrison-lee',
    authorized: 'McKinstry, Harrison Lee',
    surname: 'McKinstry',
    given: 'Harrison Lee',
    birth: '1881',
    death: '1967',
    variants: ['McKinstry, Harrison', 'Harrison Lee McKinstry', 'Harrison McKinstry'],
    status: 'established',
    sources: [
      'Find a Grave memorial 84127068.',
    ],
    relations: [
      { type: 'parent', person: 'mckinstry-james', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'mckinstry-sarah-boyd', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-thomas', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'cole-elizabeth-mckinstry', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-william-boyd', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-john-henry', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-james-daubin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-samuel-small', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-adeline', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-robert-frederick', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'west-edith-mary-mckinstry', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'mckinstry-adeline',
    authorized: 'McKinstry, Adeline',
    surname: 'McKinstry',
    given: 'Adeline',
    birth: '1883',
    death: '1908',
    variants: ['McKinstry, Adeline', 'Adeline McKinstry'],
    status: 'established',
    sources: [
      'Find a Grave memorial 80117541.',
    ],
    relations: [
      { type: 'parent', person: 'mckinstry-james', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'mckinstry-sarah-boyd', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-thomas', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'cole-elizabeth-mckinstry', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-william-boyd', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-john-henry', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-james-daubin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-samuel-small', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-harrison-lee', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-robert-frederick', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'west-edith-mary-mckinstry', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'mckinstry-robert-frederick',
    authorized: 'McKinstry, Robert Frederick',
    surname: 'McKinstry',
    given: 'Robert Frederick',
    birth: '1886',
    death: '1961',
    variants: ['McKinstry, Robert Frederick', 'Robert Frederick McKinstry', 'Fred McKinstry'],
    status: 'established',
    sources: [
      'Find a Grave memorial 3660425.',
    ],
    relations: [
      { type: 'parent', person: 'mckinstry-james', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'mckinstry-sarah-boyd', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-thomas', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'cole-elizabeth-mckinstry', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-william-boyd', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-john-henry', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-james-daubin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-samuel-small', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-harrison-lee', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-adeline', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'west-edith-mary-mckinstry', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'west-edith-mary-mckinstry',
    authorized: 'West, Edith Mary Mckinstry',
    surname: 'West',
    given: 'Edith Mary McKinstry',
    birth: '1890',
    death: '1973',
    variants: ['McKinstry, Edith Mary', 'Edith McKinstry', 'Edith West', 'West, Edith'],
    status: 'established',
    sources: [
      'Find a Grave memorial 46419250.',
    ],
    relations: [
      { type: 'spouse', person: 'west-john-tolliver', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'hearn-loveta-west', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'wakeman-sara-beth-west', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'mckinstry-james', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'mckinstry-sarah-boyd', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-thomas', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'cole-elizabeth-mckinstry', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-william-boyd', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-john-henry', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-james-daubin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-samuel-small', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-harrison-lee', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-adeline', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'mckinstry-robert-frederick', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'west-john-tolliver',
    authorized: 'West, John Tolliver',
    surname: 'West',
    given: 'John Tolliver',
    birth: '1884',
    death: '1952',
    variants: ['West, John', 'Tollie West', 'West, Tollie'],
    status: 'established',
    sources: [
      'Find a Grave memorial 46419199.',
    ],
    relations: [
      { type: 'spouse', person: 'west-edith-mary-mckinstry', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'hearn-loveta-west', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'wakeman-sara-beth-west', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'hearn-loveta-west',
    authorized: 'Hearn, Loveta West',
    surname: 'Hearn',
    given: 'Loveta',
    birth: '1910',
    death: '1987',
    variants: ['Hearn, Loveta West', 'Loveta West', 'West, Loveta', 'Loveta West Hearn'],
    status: 'established',
    sources: [
      'Find a Grave memorial 232035054.',
    ],
    relations: [
      { type: 'parent', person: 'west-john-tolliver', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'west-edith-mary-mckinstry', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'wakeman-sara-beth-west', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'wakeman-sara-beth-west',
    authorized: 'Wakeman, Sara Beth West',
    surname: 'Wakeman',
    given: 'Sara Beth West',
    birth: '1919',
    death: '1990',
    variants: ['West, Sara Beth', 'Sara Beth West', 'West, Sara', 'Sara Beth Wakeman'],
    status: 'established',
    sources: [
      'Find a Grave memorial 46419277.',
    ],
    relations: [
      { type: 'parent', person: 'west-john-tolliver', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'west-edith-mary-mckinstry', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'hearn-loveta-west', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
      id: 'boyd-ewing',
      authorized: 'Boyd, Ewing',
      surname: 'Boyd',
      given: 'Ewing',
      status: 'provisional',
      sources: ['Supplied with the musicians cabinet card; source unrecorded'],
    },
    {
      id: 'naylor-charley',
      authorized: 'Naylor, Charley',
      surname: 'Naylor',
      given: 'Charley',
      variants: ['Naylor, Charlie'],
      status: 'provisional',
      sources: ['Supplied with the musicians cabinet card; source unrecorded'],
    },
    {
    id: 'smith-eula-belle-girdner',
    authorized: 'Smith, Eula Belle Girdner',
    surname: 'Smith',
    given: 'Eula Belle Girdner',
    birth: '1890',
    death: '1964',
    status: 'established',
    sources: [
      'Findagrave record number 21144508',
    ],
  },
  {
    id: 'allison-redmon',
    authorized: 'Allison, Redmon',
    surname: 'Allison',
    given: 'Redmon',
    birth: '1848',
    death: '1937',
    variants: ['Redmon Allison', 'Red Allison', 'Allison, Redmon', 'Grandpa Red'],
    status: 'established',
    scopeNote:
      'Redmon Allison lived from 1848 to 1937',
    // TODO: memorial 52656978 could not be read (rate-limited). Dates are
    // still unknown; this is the one record in the batch with none.
    sources: [
      'Find a Grave memorial 48431435.',
    ],
    relations: [
    ]
  },
  {
    id: 'allison-mary-elizabeth-stirman',
    authorized: 'Allison, Mary Elizabeth Stirman',
    surname: 'Allison',
    given: 'Mary Elizabeth Stirman',
    birth: '1854',
    death: '1943',
    variants: ['Betty Allison', 'Mary Allison', 'Betty Stirman', 'Mary Stirman', 'Grandma Red', 'Stirman, Betty', 'Stirman, Mary'],
    status: 'established',
    scopeNote:
      'Redmon Allison lived from 1854 to 1943',
    // TODO: memorial 52656978 could not be read (rate-limited). Dates are
    // still unknown; this is the one record in the batch with none.
    sources: [
      'Find a Grave memorial 48431529.',
    ],
    relations: [
    ]
  },
  {
    id: 'allison-william-irvin',
    authorized: 'Allison, William Irvin',
    surname: 'Allison',
    given: 'William Irvin',
    birth: '1875',
    death: '1948',
    variants: ['Irvin Allison', 'William Allison', 'Allison, Irvin', 'Allison, William'],
    status: 'established',
    scopeNote:
      'William Irvin Allison lived from 1875 to 1948',
    sources: [
      'Find a Grave memorial 48431435.',
    ],
    relations: [
      { type: 'spouse', person: 'allison-sophronia-emma-baker', basis: 'Established relationship', confidence: 'certain' },
      { type: 'spouse', person: 'allison-amanda-wardlow', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'swan-mary-alice-allison', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'allison-redmon', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'allison-mary-elizabeth-stirman', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'dingler-sarah-estella-allison', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'gilbert-ella-georgia-allison', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-parker-stirman', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-joseph-carroll', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-oscar-simmon', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-annie-wheeler', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-david-edwin', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'allison-sophronia-emma-baker',
    authorized: 'Allison, Sophronia Emma Baker',
    surname: 'Allison',
    given: 'Sophronia Emma Baker',
    birth: '1881',
    death: '1912',
    variants: ['Sophronia Allison', 'Sophronia Emma Allison', 'Baker, Sophronia', 'Allison, Sophronia'],
    status: 'established',
    scopeNote:
      'Sophronia Emma Baker Allison lived from 1881 to 1912',
    sources: [
      'Find a Grave memorial 39499033.',
    ],
    relations: [
      { type: 'spouse', person: 'allison-william-irvin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'swan-mary-alice-allison', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'allison-amanda-wardlow',
    authorized: 'Allison, Amanda Wardlow',
    surname: 'Allison',
    given: 'Amanda Wardlow',
    birth: '1872',
    death: '1972',
    variants: ['Amanda Allison', 'Amanda Wardlow', 'Wardlow, Amanda', 'Allison, Amanda'],
    status: 'established',
    scopeNote:
      'Amanda Wardlow Allison lived from 1872 to 1972. She was the second wife of William Irvin Allison',
    sources: [
      'Find a Grave memorial 14518916.',
    ],
    relations: [
      { type: 'spouse', person: 'allison-william-irvin', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'swan-mary-alice-allison',
    authorized: 'Swan, Mary Alice Allison',
    surname: 'Swan',
    given: 'Mary Alice Allison',
    birth: '1909',
    death: '1987',
    variants: ['Mary Alice Allison', 'Mary Alice Swan', 'Swan, Mary Alice', 'Allison, Mary Alice'],
    status: 'established',
    scopeNote:
      'Mary Alice Allison Swan lived from 1909 to 1987',
    sources: [
      'Find a Grave memorial 35356222.',
    ],
    relations: [
      { type: 'parent', person: 'allison-william-irvin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'allison-sophronia-emma-baker', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'dingler-sarah-estella-allison',
    authorized: 'Dingler, Sarah Estella Allison',
    surname: 'Dingler',
    given: 'Sarah Estella Allison',
    birth: '1877',
    death: '1954',
    variants: ['Sarah Estella Allison', 'Stella Allison', 'Estella Allison', 'Dingler, Sarah', 'Dingler, Stella'],
    status: 'established',
    scopeNote:
      'Sarah Estella Allison Dingler lived from 1877 to 1954',
    sources: [
      'Find a Grave memorial 28197445.',
    ],
    relations: [
      { type: 'spouse', person: 'dingler-willie-oliver', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'allison-redmon', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'allison-mary-elizabeth-stirman', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'dingler-willie-elgin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'dingler-marlin-oliver', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'locke-betty-amanda-dingler', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'dingler-ovel-estell', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'lawless-rossa-novella-dingler', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'dingler-isaac-allison', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-william-irvin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'gilbert-ella-georgia-allison', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-parker-stirman', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-joseph-carroll', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-oscar-simmon', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-annie-wheeler', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-david-edwin', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'dingler-willie-oliver',
    authorized: 'Dingler, Willie Oliver',
    surname: 'Dingler',
    given: 'Willie Oliver',
    birth: '1876',
    death: '1919',
    variants: ['Bud Dingler', 'Willie Oliver Dingler', 'Willie Dingler', 'Dingler, Willie', 'Dingler, Bud'],
    status: 'established',
    scopeNote:
      'Willie Oliver "Bud" Dingler lived from 1876 to 1919',
    sources: [
      'Find a Grave memorial 28197405.',
    ],
    relations: [
      { type: 'spouse', person: 'dingler-sarah-estella-allison', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'dingler-willie-elgin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'dingler-marlin-oliver', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'locke-betty-amanda-dingler', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'dingler-ovel-estell', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'lawless-rossa-novella-dingler', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'dingler-isaac-allison', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'dingler-willie-elgin',
    authorized: 'Dingler, Willie Elgin',
    surname: 'Dingler',
    given: 'Willie Elgin',
    birth: '1904',
    death: '1983',
    variants: ['Willie Elgin Dingler', 'Willie Dingler', 'Dingler, Willie Elgin'],
    status: 'established',
    scopeNote:
      'Willie Elgin Dingler lived from 1904 to 1983',
    sources: [
      'Find a Grave memorial 71493554.',
    ],
    relations: [
      { type: 'parent', person: 'dingler-willie-oliver', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'dingler-sarah-estella-allison', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'dingler-marlin-oliver', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'locke-betty-amanda-dingler', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'dingler-ovel-estell', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'lawless-rossa-novella-dingler', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'dingler-isaac-allison', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'dingler-marlin-oliver',
    authorized: 'Dingler, Marlin Oliver',
    surname: 'Dingler',
    given: 'Marlin Oliver',
    birth: '1906',
    death: '1975',
    variants: ['Marlin Oliver Dingler', 'Marlin Dingler', 'Dingler, Marlin'],
    status: 'established',
    scopeNote:
      'Marlin Oliver Dingler lived from 1906 to 1975',
    sources: [
      'Find a Grave memorial 66565579.',
    ],
    relations: [
      { type: 'parent', person: 'dingler-willie-oliver', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'dingler-sarah-estella-allison', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'dingler-willie-elgin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'locke-betty-amanda-dingler', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'dingler-ovel-estell', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'lawless-rossa-novella-dingler', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'dingler-isaac-allison', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'locke-betty-amanda-dingler',
    authorized: 'Locke, Betty Amanda Dingler',
    surname: 'Locke',
    given: 'Betty Amanda',
    birth: '1910',
    death: '1947',
    variants: ['Betty Amanda Dingler Locke', 'Betty Dingler', 'Betty Locke'],
    status: 'established',
    scopeNote:
      'Betty Amanda Dingler Locke lived from 1910 to 1947',
    sources: [
      'Find a Grave memorial 49045290.',
    ],
    relations: [
      { type: 'parent', person: 'dingler-willie-oliver', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'dingler-sarah-estella-allison', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'dingler-willie-elgin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'dingler-marlin-oliver', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'dingler-ovel-estell', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'lawless-rossa-novella-dingler', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'dingler-isaac-allison', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'dingler-ovel-estell',
    authorized: 'Dingler, Ovel Estell',
    surname: 'Dingler',
    given: 'Ovel Estell',
    birth: '1911',
    death: '1987',
    variants: ['Ovel Dingler', 'Dingler, Ovel', 'Ovel Estell Dingler'],
    status: 'established',
    scopeNote:
      'Ovel Estell Dingler lived from 1911 to 1987',
    sources: [
      'Find a Grave memorial 44260554.',
    ],
    relations: [
      { type: 'parent', person: 'dingler-willie-oliver', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'dingler-sarah-estella-allison', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'dingler-willie-elgin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'dingler-marlin-oliver', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'locke-betty-amanda-dingler', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'lawless-rossa-novella-dingler', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'dingler-isaac-allison', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'lawless-rossa-novella-dingler',
    authorized: 'Lawless, Rossa Novella Dingler',
    surname: 'Lawless',
    given: 'Rossa Novella Dingler',
    birth: '1914',
    death: '2002',
    variants: ['Rossa Dingler', 'Rossa Lawless', 'Novella Dingler', 'Novella Lawless', 'Dingler, Rossa', 'Dingler, Novella', 'Lawless, Novella'],
    status: 'established',
    scopeNote:
      'Rossa Novella Dingler Lawless lived from 1914 to 2002',
    sources: [
      'Find a Grave memorial 76422110.',
    ],
    relations: [
      { type: 'parent', person: 'dingler-willie-oliver', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'dingler-sarah-estella-allison', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'dingler-willie-elgin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'dingler-marlin-oliver', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'locke-betty-amanda-dingler', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'dingler-ovel-estell', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'dingler-isaac-allison', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'dingler-isaac-allison',
    authorized: 'Dingler, Isaac Allison',
    surname: 'Dingler',
    given: 'Isaac Allison',
    birth: '1916',
    death: '1994',
    variants: ['Isaac Dingler', 'Dingler, Isaac', 'Dingler, Isaac Allison'],
    status: 'established',
    scopeNote:
      'Isaac Allison lived from 1916 to 1994',
    sources: [
      'Find a Grave memorial 125462846.',
    ],
    relations: [
      { type: 'parent', person: 'dingler-willie-oliver', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'dingler-sarah-estella-allison', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'dingler-willie-elgin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'dingler-marlin-oliver', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'locke-betty-amanda-dingler', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'dingler-ovel-estell', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'lawless-rossa-novella-dingler', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'gilbert-ella-georgia-allison',
    authorized: 'Gilbert, Ella Georgia Allison',
    surname: 'Gilbert',
    given: 'Ella Georgia Allison',
    birth: '1879',
    death: '1942',
    variants: ['Ella Georgia Allison', 'Ella Allison', 'Georgia Allison', 'Gilbert, Ella Georgia', 'Gilbert, Ella'],
    status: 'established',
    scopeNote:
      'Ella Georgia Allison Gilbert lived from 1879 to 1942',
    sources: [
      'Find a Grave memorial 52160574.',
    ],
    relations: [
      { type: 'spouse', person: 'gilbert-hilliard-reason', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'gilbert-seth-parker', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'trimble-velma-mary-gilbert', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'gooch-verda-lilla-gilbert', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'gilbert-jack-clifford', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'allison-redmon', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'allison-mary-elizabeth-stirman', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-william-irvin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'dingler-sarah-estella-allison', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-parker-stirman', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-joseph-carroll', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-oscar-simmon', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-annie-wheeler', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-david-edwin', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'gilbert-hilliard-reason',
    authorized: 'Gilbert, Hilliard Reason',
    surname: 'Gilbert',
    given: 'Hilliard Reason',
    birth: '1875',
    death: '1963',
    variants: ['Gilbert, Hilliard', 'Hilliard Gilbert', 'Gilbert, Hilliard Reason', 'Hilliard Reason Gilbert'],
    status: 'established',
    scopeNote:
      'Hilliard Reason Gilbert lived from 1875 to 1963',
    sources: [
      'Find a Grave memorial 52160403.',
    ],
    relations: [
      { type: 'spouse', person: 'gilbert-ella-georgia-allison', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'gilbert-seth-parker', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'trimble-velma-mary-gilbert', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'gooch-verda-lilla-gilbert', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'gilbert-jack-clifford', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'gilbert-seth-parker',
    authorized: 'Gilbert, Seth Parker',
    surname: 'Gilbert',
    given: 'Seth Parker',
    birth: '1904',
    death: '1980',
    variants: ['Seth Parker Gilbert', 'Gilbert, Seth', 'Seth Gilbert', 'Gilbert, Seth Parker', 'Gilbert, Seth'],
    status: 'established',
    scopeNote:
      'Ella Georgia Allison Gilbert lived from 1904 to 1980',
    sources: [
      'Find a Grave memorial 140308904.',
    ],
    relations: [
      { type: 'parent', person: 'gilbert-hilliard-reason', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'gilbert-ella-georgia-allison', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'trimble-velma-mary-gilbert', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'gooch-verda-lilla-gilbert', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'gilbert-jack-clifford', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'trimble-velma-mary-gilbert',
    authorized: 'Trimble, Velma Mary Gilbert',
    surname: 'Trimble',
    given: 'Velma Mary Gilbert',
    birth: '1906',
    death: '1967',
    variants: ['Velma Mary Gilbert', 'Gilbert, Velma Mary', 'Velma Trimble', 'Trimble, Velma', 'Gilbert, Velma'],
    status: 'established',
    scopeNote:
      'Velma Mary Gilbert Trimble lived from 1906 to 1967',
    sources: [
      'Find a Grave memorial 40443365.',
    ],
    relations: [
      { type: 'parent', person: 'gilbert-hilliard-reason', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'gilbert-ella-georgia-allison', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'gilbert-seth-parker', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'gooch-verda-lilla-gilbert', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'gilbert-jack-clifford', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'gooch-verda-lilla-gilbert',
    authorized: 'Gooch, Verda Lilla Gilbert',
    surname: 'Gooch',
    given: 'Verda Lilla Gilbert',
    birth: '1908',
    death: '2000',
    variants: ['Verda Gooch', 'Verda Lilla Gooch', 'Verda Allison', 'Verda Lilla Allison', 'Gooch, Verda', 'Gooch, Verda Lilla'],
    status: 'established',
    scopeNote:
      'Verda Lilla Gilbert Gooch lived from 1908 to 2000',
    sources: [
      'Find a Grave memorial 44876803.',
    ],
    relations: [
      { type: 'parent', person: 'gilbert-hilliard-reason', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'gilbert-ella-georgia-allison', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'gilbert-seth-parker', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'trimble-velma-mary-gilbert', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'gilbert-jack-clifford', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'gilbert-jack-clifford',
    authorized: 'Gilbert, Jack Clifford',
    surname: 'Gilbert',
    given: 'Jack Clifford',
    birth: '1917',
    death: '1961',
    variants: ['Jack Gilbert', 'Gilbert, Jack', 'Jack Clifford Gilbert'],
    status: 'established',
    scopeNote:
      'Jack Clifford Gilbert lived from 1917 to 1961',
    sources: [
      'Find a Grave memorial 3348236.',
    ],
    relations: [
      { type: 'parent', person: 'gilbert-hilliard-reason', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'gilbert-ella-georgia-allison', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'gilbert-seth-parker', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'trimble-velma-mary-gilbert', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'gooch-verda-lilla-gilbert', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'allison-parker-stirman',
    authorized: 'Allison, Parker Stirman',
    surname: 'Allison',
    given: 'Parker Stirman',
    birth: '1881',
    death: '1904',
    variants: ['Parker Stirman Allison', 'Parker Allison', 'Stirman Allison', 'Allison, Parker Stirman'],
    status: 'established',
    scopeNote:
      'Parker Stirman Allison lived from 1881 to 1904',
    sources: [
      'Find a Grave memorial 48431604.',
    ],
    relations: [
      { type: 'parent', person: 'allison-redmon', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'allison-mary-elizabeth-stirman', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-william-irvin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'dingler-sarah-estella-allison', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'gilbert-ella-georgia-allison', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-joseph-carroll', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-oscar-simmon', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-annie-wheeler', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-david-edwin', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'allison-joseph-carroll',
    authorized: 'Allison, Joseph Carroll',
    surname: 'Allison',
    given: 'Joseph Carroll',
    birth: '1882',
    death: '1979',
    variants: ['Joseph Carroll Allison', 'Carroll Allison', 'Allison, Joseph', 'Allison, Carroll'],
    status: 'established',
    scopeNote:
      'Joseph Carroll Allison lived from 1882 to 1979',
    sources: [
      'Find a Grave memorial 49866819.',
    ],
    relations: [
      { type: 'spouse', person: 'allison-sarah-edna-adkins', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'allison-carroll-redmon', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'allison-joe-winston', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'allison-redmon', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'allison-mary-elizabeth-stirman', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-william-irvin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'dingler-sarah-estella-allison', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'gilbert-ella-georgia-allison', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-parker-stirman', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-oscar-simmon', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-annie-wheeler', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-david-edwin', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'allison-sarah-edna-adkins',
    authorized: 'Allison, Sarah Edna Adkins',
    surname: 'Allison',
    given: 'Sarah Edna Adkins',
    birth: '1888',
    death: '1920',
    variants: ['Sarah Allison', 'Edna Allison', 'Allison, Sarah', 'Allison, Edna', 'Sarah Edna Adkins', 'Adkins, Sarah'],
    status: 'established',
    scopeNote:
      'Sarah Edna Adkins Allison lived from 1888 to 1920',
    sources: [
      'Find a Grave memorial 49866557.',
    ],
    relations: [
      { type: 'spouse', person: 'allison-joseph-carroll', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'allison-carroll-redmon', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'allison-joe-winston', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'allison-carroll-redmon',
    authorized: 'Allison, Carroll Redmon',
    surname: 'Allison',
    given: 'Carroll Redmon',
    birth: '1914',
    death: '1963',
    variants: ['Carrol R. Allison', 'Carrol Redmon Allison', 'Allison, Carroll', 'Allison, Carroll Redmon'],
    status: 'established',
    scopeNote:
      'Carroll Redman Allison lived from 1914 to 1963',
    sources: [
      'Find a Grave memorial 102002752.',
    ],
    relations: [
      { type: 'parent', person: 'allison-joseph-carroll', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'allison-sarah-edna-adkins', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-joe-winston', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'allison-joe-winston',
    authorized: 'Allison, Joe Winston',
    surname: 'Allison',
    given: 'Joe Winston',
    birth: '1916',
    death: '1966',
    variants: ['Joe Allison', 'Joe Winston Allison', 'Allison, Joe Winston'],
    status: 'established',
    scopeNote:
      'Joe Winston Allison lived from 1916 to 1966',
    sources: [
      'Find a Grave memorial 52910917.',
    ],
    relations: [
      { type: 'parent', person: 'allison-joseph-carroll', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'allison-sarah-edna-adkins', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-carroll-redmon', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'allison-annie-wheeler',
    authorized: 'Allison, Annie Wheeler',
    surname: 'Allison',
    given: 'Annie Wheeler',
    birth: '1887',
    death: '1975',
    variants: ['Annie Allison', 'Annie Wheeler Allison', 'Allison, Annie'],
    status: 'established',
    scopeNote:
      'Annie Wheeler Allison lived from 1887 to 1975',
    sources: [
      'Find a Grave memorial 48431741.',
    ],
    relations: [
      { type: 'parent', person: 'allison-redmon', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'allison-mary-elizabeth-stirman', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-william-irvin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'dingler-sarah-estella-allison', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'gilbert-ella-georgia-allison', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-parker-stirman', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-joseph-carroll', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-oscar-simmon', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-david-edwin', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'allison-david-edwin',
    authorized: 'Allison, David Edwin',
    surname: 'Allison',
    given: 'David Edwin',
    birth: '1889',
    death: '1973',
    variants: ['David Allison', 'David Edwin Allison', 'Allison, Edwin', 'Allison, David', 'Edwin Allison'],
    status: 'established',
    scopeNote:
      'David Edwin Allison lived from 1889 to 1973',
    sources: [
      'Find a Grave memorial 48431799.',
    ],
    relations: [
      { type: 'spouse', person: 'allison-precilla-isabell-barton', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'allison-euell-edwin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'allison-redmon', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'allison-mary-elizabeth-stirman', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-william-irvin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'dingler-sarah-estella-allison', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'gilbert-ella-georgia-allison', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-parker-stirman', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-joseph-carroll', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-oscar-simmon', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-annie-wheeler', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'allison-precilla-isabell-barton',
    authorized: 'Allison, Precilla Isabell Barton',
    surname: 'Allison',
    given: 'Precilla Isabell Barton',
    birth: '1896',
    death: '1940',
    variants: ['Precilla Allison', 'Precilla Isabell Allison', 'Allison, Precilla', 'Barton, Precilla', 'Precilla Barton'],
    status: 'established',
    scopeNote:
      'Precilla Isabell Barton Allison lived from 1896 to 1940',
    sources: [
      'Find a Grave memorial 48510505.',
    ],
    relations: [
      { type: 'spouse', person: 'allison-david-edwin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'allison-euell-edwin', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'allison-euell-edwin',
    authorized: 'Allison, Euell Edwin',
    surname: 'Allison',
    given: 'Euell Edwin',
    birth: '1920',
    death: '2007',
    variants: ['Euell Edwin Allison', 'Euell Allison', 'Allison, Euell'],
    status: 'established',
    scopeNote:
      'Euell Edwin Allison lived from 1920 to 2007',
    sources: [
      'Find a Grave memorial 20653554.',
    ],
    relations: [
      { type: 'parent', person: 'allison-david-edwin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'allison-precilla-isabell-barton', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'allison-oscar-simmon',
    authorized: 'Allison, Oscar Simmon',
    surname: 'Allison',
    given: 'Oscar Simmon',
    birth: '1884',
    death: '1920',
    variants: ['Oscar Allison', 'Oscar Simmon Allison', 'Allison, Oscar'],
    status: 'established',
    scopeNote:
      'Oscar Simmon Allison lived from 1884 to 1920',
    sources: [
      'Find a Grave memorial 28322691.',
    ],
    relations: [
      { type: 'spouse', person: 'grizzle-ollie-blanche-ingle-allison', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'allison-gerald-parker', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'allison-harold-lamar', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'allison-oscar-ingle', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'allison-redmon', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'allison-mary-elizabeth-stirman', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-william-irvin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'dingler-sarah-estella-allison', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'gilbert-ella-georgia-allison', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-parker-stirman', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-joseph-carroll', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-annie-wheeler', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-david-edwin', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'grizzle-ollie-blanche-ingle-allison',
    authorized: 'Grizzle, Ollie Blanche Ingle Allison',
    surname: 'Grizzle',
    given: 'Ollie Blanche Ingle Allison',
    birth: '1892',
    death: '1976',
    variants: ['Ollie Allison', 'Ollie Ingle', 'Ollie Grizzle'],
    status: 'established',
    scopeNote:
      'Ollie Blanche Ingle Allison Grizzle lived from 1892 to 1976. She married Oscar Simmon Allison in 1911. He died in 1920 and she remarried Wiley Grizzle in 1923.',
    // TODO: memorial 52656978 could not be read (rate-limited). Dates are
    // still unknown; this is the one record in the batch with none.
    sources: [
      'Find a Grave memorial 132669875.',
    ],
    relations: [
      { type: 'spouse', person: 'allison-oscar-simmon', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'allison-gerald-parker', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'allison-harold-lamar', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'allison-oscar-ingle', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'ingle-minnie-joan-coleman',
    authorized: 'Ingle, Minnie Joan Coleman',
    surname: 'Ingle',
    given: 'Minnie Joan Coleman',
    birth: '1875',
    death: '1918',
    variants: ['Ingle, Minnie', 'Minnie Ingle', 'Ingle, Minnie Joan', 'Coleman, Minnie', 'Minnie Coleman'],
    status: 'established',
    scopeNote:
      'Minnie Joan Coleman Ingle lived from 1875 to 1918.',
    sources: [
      'Find a Grave memorial 206297882.',
    ],
    relations: [
      { type: 'spouse', person: 'ingle-james', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'grizzle-ollie-blanche-ingle-allison', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'ingle-james',
    authorized: 'Ingle, James',
    surname: 'Ingle',
    given: 'James',
    birth: '1860',
    death: '1938',
    variants: ['Ingle, James', 'James Ingle', 'Ingle, James L.', 'James L. Ingle'],
    status: 'established',
    scopeNote:
      'James Ingle lived from 1860 to 1938.',
    sources: [
      'Find a Grave memorial 29757328.',
    ],
    relations: [
      { type: 'spouse', person: 'ingle-minnie-joan-coleman', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'grizzle-ollie-blanche-ingle-allison', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'grizzle-wiley',
    authorized: 'Grizzle, Wiley',
    surname: 'Grizzle',
    given: 'Wiley',
    birth: '1895',
    death: '1973',
    variants: ['Wiley Grizzle', 'Grizzle, Wiley'],
    status: 'established',
    scopeNote:
      'Wiley Grizzle married Ollie Blanche Ingle Allison in 1923.',
    // TODO: memorial 52656978 could not be read (rate-limited). Dates are
    // still unknown; this is the one record in the batch with none.
    sources: [
      'Find a Grave memorial 132669877.',
    ],
    relations: [
      { type: 'spouse', person: 'grizzle-ollie-blanche-ingle-allison', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'grizzle-wiley-jr', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'allison-gerald-parker',
    authorized: 'Allison, Gerald Parker',
    surname: 'Allison',
    given: 'Gerald Parker',
    birth: '1913',
    death: '1982',
    variants: ['Gerald Allison', 'Gerald Parker Allison', 'Allison, Gerald'],
    status: 'established',
    scopeNote:
      'Gerald Allison lived from 1913 to 1982',
    // TODO: memorial 52656978 could not be read (rate-limited). Dates are
    // still unknown; this is the one record in the batch with none.
    sources: [
      'Find a Grave memorial 13773914.',
    ],
    relations: [
      { type: 'spouse', person: 'allison-lanora-ethel-wells', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'allison-james-oscar', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'allison-winston-irvin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'bainbridge-sherry-lynn-allison', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'allison-oscar-simmon', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'grizzle-ollie-blanche-ingle-allison', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-harold-lamar', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-oscar-ingle', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'allison-lanora-ethel-wells',
    authorized: 'Allison, Lanora Ethel Wells',
    surname: 'Allison',
    given: 'Lanora Ethel Wells',
    birth: '1917',
    death: '2008',
    variants: ['Ethel Allison', 'Lanora Ethel Allison', 'Wells, Lanora Ethel', 'Ethel Wells', 'Wells, Ethel'],
    status: 'established',
    scopeNote:
      'Ethel Allison lived from 1917 to 2008',
    // TODO: memorial 52656978 could not be read (rate-limited). Dates are
    // still unknown; this is the one record in the batch with none.
    sources: [
      'Find a Grave memorial 26227837.',
    ],
    relations: [
      { type: 'spouse', person: 'allison-gerald-parker', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'allison-james-oscar', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'allison-winston-irvin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'child', person: 'bainbridge-sherry-lynn-allison', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'allison-james-oscar',
    authorized: 'Allison, James Oscar',
    surname: 'Allison',
    given: 'James Oscar',
    birth: '1937',
    death: '2012',
    variants: ['James Oscar Allison', 'Jim O. Allison', 'Allison, Jimmy', 'Jimmy Allison', 'James Allison'],
    status: 'established',
    scopeNote:
      'James Oscar Allison lived from 1937 to 2012',
    sources: [
      'No Find a Grave memorial.',
    ],
    relations: [
      { type: 'parent', person: 'allison-gerald-parker', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'allison-lanora-ethel-wells', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-winston-irvin', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'bainbridge-sherry-lynn-allison', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'allison-winston-irvin',
    authorized: 'Allison, Winston Irvin',
    surname: 'Allison',
    given: 'Winston Irvin',
    birth: '1938',
    death: '2016',
    variants: ['Winston Irvin Allison', 'Winston Allison', 'Allison, Winston'],
    status: 'established',
    scopeNote:
      'Winston Irvin Allison lived from 1938 to 2016',
    sources: [
      'Find a Grave memorial 169503745.',
    ],
    relations: [
      { type: 'parent', person: 'allison-gerald-parker', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'allison-lanora-ethel-wells', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-james-oscar', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'bainbridge-sherry-lynn-allison', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'bainbridge-sherry-lynn-allison',
    authorized: 'Bainbridge, Sherry Lynn Allison',
    surname: 'Bainbridge',
    given: 'Sherry Lynn Allison',
    birth: '1938',
    death: '2016',
    variants: ['Sherry Allison', 'Sherry Bainbridge'],
    status: 'established',
    scopeNote:
      'Sherry Lynn Allison Bainbridge lived from 1939 to 2014',
    sources: [
      'Find a Grave memorial 126992596.',
    ],
    relations: [
      { type: 'parent', person: 'allison-gerald-parker', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'allison-lanora-ethel-wells', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-james-oscar', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-winston-irvin', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'allison-harold-lamar',
    authorized: 'Allison, Harold Lamar',
    surname: 'Allison',
    given: 'Harold Lamar',
    birth: '1917',
    death: '1991',
    variants: ['Harold Allison', 'Harold Lamar Allison'],
    status: 'established',
    scopeNote:
      'Allison died at 12:04 a.m. Tuesday in the Methodist Hospital in Lubbock. Born Feb. 26, 1917 in Roswell, N .M ., Allison had been a resident of Earth since 1948, moving there from Roswell. He married Veta Jean McKinstry on March 26, 1944, in Hagerman, N.M.',
    // TODO: memorial 52656978 could not be read (rate-limited). Dates are
    // still unknown; this is the one record in the batch with none.
    sources: [
      'Find a Grave memorial 53568158.',
    ],
    relations: [
      { type: 'spouse', person: 'allison-veta-jean-mckinstry', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'allison-oscar-simmon', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'grizzle-ollie-blanche-ingle-allison', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-gerald-parker', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-oscar-ingle', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'allison-oscar-ingle',
    authorized: 'Allison, Oscar Ingle',
    surname: 'Allison',
    given: 'Oscar Ingle',
    birth: '1919',
    death: '1982',
    variants: ['Oscar Allison', 'Oscar Ingle Allison'],
    status: 'established',
    scopeNote:
      '',
    // TODO: memorial 52656978 could not be read (rate-limited). Dates are
    // still unknown; this is the one record in the batch with none.
    sources: [
      'Find a Grave memorial 51564541.',
    ],
    relations: [
      { type: 'spouse', person: 'allison-sammy-nan-mckinstry', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'allison-oscar-simmon', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'grizzle-ollie-blanche-ingle-allison', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-gerald-parker', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-harold-lamar', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
  {
    id: 'grizzle-wiley-jr',
    authorized: 'Grizzle Jr., Wiley',
    surname: 'Grizzle',
    given: 'Wiley Jr.',
    birth: '1924',
    death: '1945',
    variants: ['Junior Grizzle', 'Grizzle, Junior', 'Wiley Grizzle, Jr.'],
    status: 'established',
    scopeNote:
      '',
    // TODO: memorial 52656978 could not be read (rate-limited). Dates are
    // still unknown; this is the one record in the batch with none.
    sources: [
      'Find a Grave memorial 132669877.',
    ],
    relations: [
      { type: 'parent', person: 'grizzle-wiley', basis: 'Established relationship', confidence: 'certain' },
      { type: 'parent', person: 'grizzle-ollie-blanche-ingle-allison', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-gerald-parker', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-harold-lamar', basis: 'Established relationship', confidence: 'certain' },
      { type: 'sibling', person: 'allison-oscar-ingle', basis: 'Established relationship', confidence: 'certain' },
    ]
  },
];

export const personById = new Map(PEOPLE.map((p) => [p.id, p]));

/** Every form a person can be found under, for search and reconciliation. */
export const NAME_INDEX: { form: string; id: string; authorized: boolean }[] =
  PEOPLE.flatMap((p) => [
    { form: p.authorized, id: p.id, authorized: true },
    ...(p.variants ?? []).map((v) => ({ form: v, id: p.id, authorized: false })),
  ]).sort((a, b) => a.form.localeCompare(b.form));