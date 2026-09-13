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
    death: '1901',
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
    id: 'bouknight-phebe-swann',
    authorized: 'Bouknight, Phebe Swann',
    surname: 'Bouknight',
    given: 'Phebe Swann',
    birth: '1871',
    death: '1935',
    status: 'established',
    relations: [
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
    id: 'girdner-nannie-atkinson-swann',
    authorized: 'Girdner, Nannie Atkinson Swann',
    surname: 'Girdner',
    given: 'Nannie Atkinson Swann',
    birth: '1878',
    death: '1971',
    status: 'established',
    relations: [
      { type: 'spouse', person: 'girdner-charles-edgar', basis: 'Established relationship', confidence: 'certain' },
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
  },
  {
    id: 'mckinstry-samuel-small',
    authorized: 'McKinstry, Samuel Small',
    surname: 'McKinstry',
    given: 'Samuel Small',
    variants: ['McKinstry, Sam'],
    status: 'established',
    scopeNote:
      'The "Mrs. Sam McKinestry" of Austin Swann\'s obituary is one of his daughters, so this is very likely her husband - but nothing consulted states it, and the relation is not entered.',
    // TODO: memorial 52656978 could not be read (rate-limited). Dates are
    // still unknown; this is the one record in the batch with none.
    sources: [
      'Find a Grave memorial 52656978, supplied by you; not yet read',
    ],
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
  // TODO: 'Jean' and 'Sammy' are given names only, with no surname on the
  // object. They stay as `as:` strings on the item until a heading can be
  // established - an authority record for a bare given name is not one.
];

export const personById = new Map(PEOPLE.map((p) => [p.id, p]));

/** Every form a person can be found under, for search and reconciliation. */
export const NAME_INDEX: { form: string; id: string; authorized: boolean }[] =
  PEOPLE.flatMap((p) => [
    { form: p.authorized, id: p.id, authorized: true },
    ...(p.variants ?? []).map((v) => ({ form: v, id: p.id, authorized: false })),
  ]).sort((a, b) => a.form.localeCompare(b.form));