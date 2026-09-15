// src/data/collections/mckinstry-family.ts
//
// PROVISIONAL. I split these from the Thomas portraits on ONE piece of
// evidence: these three carry a c.1.n.n number written on the object and the
// others do not. That is a guess about custody, and custody is the one thing
// only you know. If all six came out of the same box, merge these two files -
// it is a copy and paste, and the item ids do not change.
//
// TODO, and it matters more than anything else in this file: `custody` below
// is a placeholder. Who held these before you, and how did they reach you?
// Everything else here can be reconstructed later. That cannot.

import type { Collection } from './types';

export const COLLECTION: Collection = {
  slug: 'mckinstry-family',
  title: 'McKinstry Family Photographs',
  // NOTE: this collection holds both b.n and c.n control numbers. That is
  // fine - the letters are internal bookkeeping, not a fact about custody,
  // and they are stored as `controlNumber` rather than used as keys.
  custody: 'Various sources',
  scope:
    'Photographs of the McKinstry family. James and Sarah McKinstry are the most distant family members photographed. The bulk of these photographs revolve around Sam and Loveta McKinstry and their children.',
  arrangement: 'By series, below. The control numbers are not an arrangement.',
  lines: ['McKinstry', 'Swann', 'Allison', 'Osborn'],
  places: ['New Mexico', 'Illinois'],
  defaults: {
    capture: 'flatbed, high resolution',
    rights: { status: 'public-domain' },
  },
  series: [
    {
      id: 'enterprises',
      title: 'Farms, gins and threshing outfits',
      scope: 'Photographs of family businesses and the crews that worked them.',
    },
    { id: 'portraits', title: 'Portraits and groups' },
    { id: 'camps', title: 'Camps and travel' },
  ],

  items: [
    /* ---------------------------------------------------------------- */
    {
      slug: 'mckinstry-sam-cattle',
      title: '[Sam McKinstry and cattle]',
      titleSource: 'supplied',
      series: '',
      format: 'copy print',
      place: 'Texas',
      date: {
        display: '[1951-1955]',
        basis: [
          'Nothing on the object dates it.',
          'Photograph appears to show Sam McKinstry later in life after he and his wife moved to the Muleshoe area.',
        ],
        confidence: 'probable',
      },
      recto: {
        file: 'mckinstry-sam-cattle.jpg',
      },
      description:
        'This photograph shows Sam McKinstry with a pail new some cattle troughs.',
      depicts: [
        {
          person: 'mckinstry-samuel-small',
          confidence: 'certain',
          basis:
            'Matches Sam McKinstry',
        },
      ],
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'mckinstry-james-family',
      title: '[James McKinstry family]',
      format: 'copy print',
      place: 'Illinois',
      date: {
        // What prints. Square brackets mark an assessment.
        display: '[1903-1906]',
        earliest: 1903,           // optional, numbers not strings
        latest: 1906,             // optional
        // One line per piece of evidence. Prints as a bulleted list under
        // the date on the record page. An empty array is honest and fine.
        basis: [
          'This photograph appears to be from just before the family moved to New Mexico. Edith, the youngest daughter of James and Sarah, appears to be 13 to 15 years old, which would date this photograph between 1903 and 1905.',
        ],
        confidence: 'probable',
      },
      titleSource: 'supplied',
      recto: { file: 'mckinstry-james-family-recto.jpg' },
      verso : { file: 'mckinstry-james-family-verso.jpg'},
      description: 'This photograph shows the entire James McKinstry family including his wife Sarah, and their ten children: Thomas, Elizabeth, William Boyd, John Henry, James Daubin, Samuel Small, Harrison Lee, Adeline, Robert Frederick, and Edith. This photograph was likely taken just before the family moved from Illinois to New Mexico around 1905 or 1906.',
      inscriptions: [
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'Front Row L. to R.: Harrison Lee, Sarah (mother), Edith, James (father), Thomas.',
          hand: 'Unattributed.',   // whose hand, when you can say
        },
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: '2nd Row: Fred, James Daubin, Samuel Small, John.',
          hand: 'Unattributed.',   // whose hand, when you can say
        },
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'Back row: Adeline, William Boyd, Elizabeth.',
          hand: 'Unattributed.',   // whose hand, when you can say
        },
      ],
      depicts: [
        {
          person: 'mckinstry-robert-frederick',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
          position: 'Standing, first from left.',
        },
        {
          person: 'mckinstry-adeline',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
          position: 'Standing, second from left.',
        },
        {
          person: 'mckinstry-james-daubin',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
          position: 'Standing, third from left.',
        },
        {
          person: 'mckinstry-william-boyd',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
          position: 'Standing, fourth from left.',
        },
        {
          person: 'mckinstry-samuel-small',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
          position: 'Standing, fifth from left.',
        },
        {
          person: 'cole-elizabeth-mckinstry',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
          position: 'Standing, sixth from left.',
        },
        {
          person: 'mckinstry-john-henry',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
          position: 'Standing, seventh from left.',
        },
        {
          person: 'mckinstry-harrison-lee',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
          position: 'Sitting, first from left.',
        },
        {
          person: 'mckinstry-sarah-boyd',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
          position: 'Sitting, second from left.',
        },
        {
          person: 'west-edith-mary-mckinstry',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
          position: 'Sitting, third from left.',
        },
        {
          person: 'mckinstry-james',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
          position: 'Sitting, fourth from left.',
        },
        {
          person: 'mckinstry-thomas',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
          position: 'Sitting, fifth from left.',
        },
      ],
    },
    {
      slug: 'three-men-and-horse',
      title: '[Three unidentified men and a horse]',
      titleSource: 'supplied',
      controlNumber: 'a.1.2.1',
      format: 'copy print',
      place: 'New Mexico',
      date: {
        display: '[1910-1920]',
        earliest: 1910,
        latest: 1920,
        basis: [
          'Photo is undated and there are no identifiable people. It is presumed this photograph was taken from the McKinstry side, but that may not be true.',
        ],
        confidence: 'possible',
      },
      recto: { file: 'three-men-and-horse-recto.jpg', },
      verso: { file: 'three-men-and-horse-verso.jpg' },
      description:
        'This photograph shows three unidentified men with a horse.',
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'two-boys-donkey',
      title: '[Two boys on a donkey]',
      titleSource: 'supplied',
      controlNumber: 'a.1.2.2',
      format: 'copy print',
      place: 'New Mexico',
      date: {
        display: '[1910-1920]',
        earliest: 1910,
        latest: 1920,
        basis: [
          'Photo is undated and there are no identifiable people. It is presumed this photograph was taken from the McKinstry side, but that may not be true.',
        ],
        confidence: 'possible',
      },
      recto: { file: 'two-boys-donkey-recto.jpg', },
      verso: { file: 'two-boys-donkey-recto.jpg' },
      description:
        'This photograph shows two unidentified boys on a donkey.',
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'mckinstry-cattle-branding',
      title: '[Sam McKinstry cattle branding]',
      titleSource: 'supplied',
      controlNumber: 'a.1.2.3',
      format: 'copy print',
      place: 'New Mexico',
      date: {
        display: '[1910-1920]',
        earliest: 1910,
        latest: 1920,
        basis: [
          'Photo is undated and there are no identifiable people. I believe Sam McKinstry may be the man kneeling on the cattle being branded. This cannot be confirmed.',
        ],
        confidence: 'possible',
      },
      recto: { file: 'cattle-branding-recto.jpg', },
      verso: { file: 'cattle-branding-verso.jpg' },
      views : [
        { file: 'cattle-branding-recto-enhanced.jpg', label: 'Color enhanced version'},
      ],
      depicts: [
        {
          person: 'mckinstry-samuel-small',  // an id in people.ts. Build throws if unknown.
          confidence: 'possible',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'It is supposed the man kneeling on the cow may be Sam McKinstry.',
        },
      ],
      description:
        'This photograph depicts five men participating in a cattle branding. None of the men are identified, but it is supposed that one of them, them man kneeling on the cow being branded, may be Sam McKinstry.',
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'mckinstry-sam-horse',
      title: '[Sam McKinstry and horse]',
      titleSource: 'supplied',
      controlNumber: 'a.1.3.2',
      format: 'copy print',
      place: 'New Mexico',
      date: {
        display: '[1910-1920]',
        earliest: 1910,
        latest: 1920,
        basis: [
          'This photograph is undated, but shows Sam McKinstry with a horse. Sam McKinstry\'s age cannot be ascertained. This is a rough date estimation.',
        ],
        confidence: 'possible',
      },
      recto: { file: 'mckinstry-sam-horse-recto.jpg', },
      verso: { file: 'mckinstry-sam-horse-recto.jpg' },
      depicts: [
        {
          person: 'mckinstry-samuel-small',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
        },
      ],
      description:
        'This photograph depicts an unidentified man standing behind a horse. The verso of this image has Sam McKinstry\'s name.',
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
      related :[
        {
          slug: 'mckinstry-sam-palomina',
          relation: 'The horses in each picture appears to be the same.'
        },
      ]
    },
    {
      slug: 'mckinstry-sam-palomina',
      title: '[Sam McKinstry\'s Palomina]',
      titleSource: 'supplied',
      controlNumber: 'a.1.3.3',
      format: 'copy print',
      place: 'New Mexico',
      date: {
        display: '[1910-1920]',
        earliest: 1910,
        latest: 1920,
        basis: [
          'This photograph is undated, but shows Sam McKinstry\'s palomina horse. This is a rough date estimation.',
        ],
        confidence: 'possible',
      },
      recto: { file: 'mckinstry-sam-palomina-recto.jpg', },
      verso: { file: 'mckinstry-sam-palomina-verso.jpg' },
      description:
        'This photograph depicts Sam McKinstry\'s palomina horse.',
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
      related :[
        {
          slug: 'mckinstry-sam-horse',
          relation: 'The horses in each picture appears to be the same.'
        },
      ]
    },
  ],
};
