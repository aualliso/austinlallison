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
          region: { face: 'recto', x: 19.7, y: 8.8, w: 11.8, h: 17.9 },
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
          region: { face: 'recto', x: 15.9, y: 23.8, w: 11.8, h: 15.5 },
        },
        {
          person: 'mckinstry-adeline',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
          position: 'Standing, second from left.',
          region: { face: 'recto', x: 30.3, y: 21, w: 10.7, h: 15.2 },
        },
        {
          person: 'mckinstry-james-daubin',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
          position: 'Standing, third from left.',
          region: { face: 'recto', x: 40.3, y: 31.2, w: 10, h: 14.4 },
        },
        {
          person: 'mckinstry-william-boyd',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
          position: 'Standing, fourth from left.',
          region: { face: 'recto', x: 48.8, y: 22.1, w: 12, h: 15.2 },
        },
        {
          person: 'mckinstry-samuel-small',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
          position: 'Standing, fifth from left.',
          region: { face: 'recto', x: 64.1, y: 28.5, w: 12, h: 14.9 },
        },
        {
          person: 'cole-elizabeth-mckinstry',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
          position: 'Standing, sixth from left.',
          region: { face: 'recto', x: 74.8, y: 24.9, w: 11.1, h: 16.3 },
        },
        {
          person: 'mckinstry-john-henry',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
          position: 'Standing, seventh from left.',
          region: { face: 'recto', x: 85.4, y: 31.2, w: 11.6, h: 14.9 },
        },
        {
          person: 'mckinstry-harrison-lee',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
          position: 'Sitting, first from left.',
          region: { face: 'recto', x: 5.7, y: 48.7, w: 13.3, h: 17.1 },
        },
        {
          person: 'mckinstry-sarah-boyd',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
          position: 'Sitting, second from left.',
          region: { face: 'recto', x: 24.3, y: 50.9, w: 12.2, h: 18.8 },
        },
        {
          person: 'west-edith-mary-mckinstry',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
          position: 'Sitting, third from left.',
          region: { face: 'recto', x: 41.9, y: 58.6, w: 11.3, h: 18.2 },
        },
        {
          person: 'mckinstry-james',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
          position: 'Sitting, fourth from left.',
          region: { face: 'recto', x: 59.9, y: 51.1, w: 12.2, h: 19.1 },
        },
        {
          person: 'mckinstry-thomas',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
          position: 'Sitting, fifth from left.',
          region: { face: 'recto', x: 83.4, y: 52, w: 13.6, h: 19.4 },
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
          region: { face: 'color-enhanced-version', x: 40.5, y: 26, w: 5.4, h: 7.8 },
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
          confidence: 'possible',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 54.3, y: 39.6, w: 16.2, h: 32.9 },
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
      inscriptions : [
        { location: 'verso',
          medium: 'ink',
          text: 'Sam McKinstry\'s Palomina',
        }
      ],
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
    {
      slug: 'mckinstry-loveta-minnie-edith-thomas',
      title: '[Loveta Swann McKinstry, Edith Thomas, Minnie Swann McKinstry]',
      titleSource: 'supplied',
      controlNumber: 'a.1.4.2',
      format: 'copy print',
      place: 'New Mexico',
      date: {
        display: '[1920-1925]',
        earliest: 1920,
        latest: 1925,
        basis: [
          'The date of 1913 on the verso is likely incorrect. This photograph shows Loveta and Minnie after their marriage to McKinstry brothers Sam and Jim, respectively. I date this photograph between 1920 and 1925.',
        ],
        confidence: 'probable',
      },
      recto: { file: 'mckinstry-loveta-minnie-edith-thomas-recto.jpg', },
      verso: { file: 'mckinstry-loveta-minnie-edith-thomas-verso.jpg' },
      description:
        'This photograph depicts Loveta Swann McKinstry, Edith Thomas (Bowles), and Minnie McKinstry in front of a tree and house.',
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
      depicts: [
        {
          person: 'mckinstry-loveta-swann',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 20.1, y: 32.7, w: 12.9, h: 9.6 },
        },
        {
          person: 'mckinstry-minnie-swann',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 49.4, y: 31.7, w: 10.9, h: 9.6 },
        },
        {
          as: 'Edith Thomas Bowles',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 37.9, y: 29.6, w: 11.8, h: 10.5 },
        },
      ]
    },
    {
      slug: 'mckinstry-minnie-and-others',
      title: '[Minnie Swann McKinstry and others]',
      titleSource: 'supplied',
      controlNumber: 'a.1.5.2',
      format: 'copy print',
      place: 'New Mexico',
      date: {
        display: '[1920-1925]',
        earliest: 1920,
        latest: 1925,
        basis: [
          'The date of this photograph is difficult to ascertain. Minnie Swann McKinstry appears to be between 30 and 35 years old, so dates of 1920 through 1925 are possible.',
        ],
        confidence: 'possible',
      },
      recto: { file: 'mckinstry-minnie-and-others-recto.jpg', },
      verso: { file: 'mckinstry-minnie-and-others-recto.jpg' },
      description:
        'This photograph depicts Minnie Swann McKinstry with four other unidentified individuals.',
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
      depicts: [
        {
          person: 'mckinstry-minnie-swann',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 63.2, y: 20.6, w: 6.4, h: 10 },
        },
      ]
    },
    {
      slug: 'mckinstry-sam-portrait',
      title: 'Sam McKinstry',
      titleSource: 'supplied',
      controlNumber: 'a.1.7.2',
      format: 'mounted photograph',
      place: 'Illinois',
      date: {
        display: '[1898-1903]',
        earliest: 1898,
        latest: 1903,
        basis: [
          'There is no date on this photograph, but Sam McKinstry appears to be between 20 and 25 years old here.',
        ],
        confidence: 'probable',
      },
      recto: { file: 'mckinstry-sam-portrait-recto.jpg', },
      verso: { file: 'mckinstry-sam-portrait-verso.jpg' },
      description:
        'This is a formal oval vignette portrait of Sam McKinstry from between 1898 and 1903.',
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
      inscriptions: [
        { location: 'verso',
          medium: 'ink',
          text: 'Sam McKinstry',
          hand: 'Austin Allison',
        },
      ],
      depicts: [
        {
          person: 'mckinstry-samuel-small',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 28.1, y: 25, w: 38.4, h: 30.7 },
        },
      ]
    },
    {
      slug: 'mckinstry-adeline-portrait',
      title: 'Adeline McKinstry',
      titleSource: 'inscribed',
      controlNumber: 'b.1.17.2',
      format: 'mounted photograph',
      studio: 'L.L. Hall',
      place: 'Piper City, Illinois',
      date: {
        display: '[1901-1905]',
        earliest: 1901,
        latest: 1905,
        basis: [
          'Adeline appears to be between the ages of 18 and 22 here. That would place this between the years of 1901 and 1905.',
        ],
        confidence: 'probable',
      },
      recto: { file: 'mckinstry-adeline-portrait-recto.jpg', },
      verso: { file: 'mckinstry-adeline-portrait-verso.jpg' },
      views: [
        { file: 'mckinstry-adeline-portrait-recto-close.jpg', label: 'Closer view of portrait'}
      ],
      description:
        'This is a formal oval vignette portrait of Adeline McKinstry from between 1901 and 1905.',
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
      inscriptions: [
        { location: 'verso',
          medium: 'ink',
          text: 'Adeline McKinstry',
          hand: 'unknown',
        },
        { location: 'verso',
          medium: 'ink',
          text: 'Sam\'s sister',
          hand: 'unknown',
        }
      ],
      depicts: [
        {
          person: 'mckinstry-adeline',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 34.6, y: 32.7, w: 29.3, h: 26 },
        },
      ]
    },
    {
      slug: 'minnie-loveta-eva-sammy',
      title: '[Minnie McKinstry, Loveta McKinstry, Eva West, Sammy McKinstry]',
      titleSource: 'inscribed',
      controlNumber: 'a.1.8.4',
      format: 'snapshot',
      place: 'Hagerman, New Mexico',
      date: {
        display: '1922',
        basis: [
          'The verso inscription suggests Loveta was pregnant in this image. This would place the image squarely in 1922 when Loveta was pregnant with Jean. The verso has a date of 1924, but this is incorrect.',
        ],
        confidence: 'certain',
      },
      recto: { file: 'minnie-loveta-eva-sammy-recto.jpg', },
      verso: { file: 'minnie-loveta-eva-sammy-verso.jpg' },
      description:
        'This is a snapshot depicting Minnie McKinstry, Loveta McKinstry, Eva West, and Sammy McKinstry. This photograph was likely taken in Hagerman, New Mexico in 1922.',
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
      inscriptions: [
        { location: 'verso',
          medium: 'ink',
          text: 'Minnie left, Loveta center (pregnant), Eva and Sammy.',
          hand: 'unknown',
        },
      ],
      depicts: [
        {
          person: 'mckinstry-minnie-swann',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 21.7, y: 25, w: 12.2, h: 10.4 },
        },
        {
          person: 'mckinstry-loveta-swann',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 40.6, y: 26.1, w: 13.3, h: 10.5 },
        },
        {
          person: 'west-eva-swann-powell',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 62.6, y: 25.2, w: 12.7, h: 12.3 },
        },
        {
          person: 'allison-sammy-nan-mckinstry',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 62.1, y: 49.7, w: 15.1, h: 12.3 },
        },
      ]
    },
    {
      slug: 'mckinstry-sammy-and-jean-1',
      title: '[Sammy and Jean, 1922]',
      titleSource: 'inscribed',
      controlNumber: 'a.1.11.1',
      format: 'snapshot',
      place: 'Hagerman, New Mexico',
      date: {
        display: '1922',
        basis: [
          'The verso dates this photograph in 1922',
        ],
        confidence: 'certain',
      },
      recto: { file: 'mckinstry-sammy-and-jean-1-recto.jpg', },
      verso: { file: 'mckinstry-sammy-and-jean-1-verso.jpg' },
      description:
        'This is a photograph of Sammy and Jean McKinstry in 1922 at the home of Sam and Loveta McKinstry.',
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
      inscriptions: [
        { location: 'verso',
          medium: 'ink',
          text: 'Sammy and Jean, 1922.',
          hand: 'unknown',
        },
      ],
      depicts: [
        {
          person: 'allison-sammy-nan-mckinstry',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 44, y: 45.7, w: 6.2, h: 9.6 },
        },
        {
          person: 'allison-veta-jean-mckinstry',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 52, y: 49.4, w: 6, h: 7.4 },
        },
      ]
    },
    {
      slug: 'mckinstry-jean-swann-austin-1',
      title: '[Jean McKinstry and Austin Swann]',
      titleSource: 'supplied',
      controlNumber: 'a.1.11.2',
      format: 'snapshot',
      place: 'Hagerman, New Mexico',
      date: {
        display: '1924',
        basis: [
          'Jean appears to be no more than two years old in this image. This would place the image in 1924.',
        ],
        confidence: 'certain',
      },
      recto: { file: 'mckinstry-jean-swann-austin-1-recto.jpg', },
      verso: { file: 'mckinstry-jean-swann-austin-1-verso.jpg' },
      description:
        'This is a photograph of Veta Jean McKinstry and Austin Swann. Jean is wearing the baby dress of Austin Swann in this image.',
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
      inscriptions: [
        { location: 'verso',
          medium: 'ink',
          text: 'Papa\'s dress.',
          hand: 'unknown',
        },
        { location: 'verso',
          medium: 'ink',
          text: 'Papa Swann and Jean McKinstry in Papa\'s baby dress..',
          hand: 'unknown',
        }
      ],
      depicts: [
        {
          person: 'allison-veta-jean-mckinstry',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 39.4, y: 30.4, w: 11.6, h: 8.7 },
        },
        {
          person: 'swann-austin',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 50.1, y: 28.6, w: 13.8, h: 11.7 },
        },
      ]
    },
    {
      slug: 'mckinstry-sammy-and-jean-with-flowers',
      title: '[Sammy and Jean Mckinstry with flowers]',
      titleSource: 'supplied',
      controlNumber: 'a.1.11.3',
      format: 'snapshot',
      place: 'Hagerman, New Mexico',
      date: {
        display: '[1925-1926]',
        basis: [
          'Jean appears to be three or four years old in this image, which places it between 1925 and 1926.',
        ],
        confidence: 'probable',
      },
      recto: { file: 'mckinstry-sammy-and-jean-with-flowers-recto.jpg', },
      verso: { file: 'mckinstry-sammy-and-jean-with-flowers-verso.jpg' },
      description:
        'This photograph depicts Sammy and Jean McKinstry in front of flowers.',
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
      inscriptions: [
        { location: 'verso',
          medium: 'ink',
          text: 'Sammy and Jean.',
          hand: 'unknown',
        },
      ],
      depicts: [
        {
          person: 'allison-sammy-nan-mckinstry',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 64.3, y: 19.1, w: 6.8, h: 11 },
        },
        {
          person: 'allison-veta-jean-mckinstry',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 35.8, y: 28.1, w: 6.6, h: 10.9 },
        },
      ]
    },
    {
      slug: 'mckinstry-christmas-1',
      title: '[Christmas at the McKinstry home in Hagerman]',
      titleSource: 'supplied',
      controlNumber: 'a.1.11.4',
      format: 'snapshot',
      place: 'Hagerman, New Mexico',
      date: {
        display: '[1920-1925]',
        basis: [
          'There is no way to solidly date this photograph. There is a child\'s chair in the background, which suggests the McKinstrys had at least one child by that time. I assigned this a date of 1920 through 1925.',
        ],
        confidence: 'probable',
      },
      recto: { file: 'mckinstry-christmas-1-recto.jpg', },
      verso: { file: 'mckinstry-christmas-1-verso.jpg' },
      description:
        'This photograph depicts a Christmas scene at the McKinstry home in Hagerman, New Mexico during the first half of the 1920s.',
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
      inscriptions: [
        { location: 'verso',
          medium: 'ink',
          text: 'Christmas in our home on the farm at Hagerman, N.M.',
          hand: 'unknown',
        },
      ],
    },
  ],
};
