// src/data/collections/thomas-family.ts
//
// PROVISIONAL, same caveat as the Swann file: these are separated only
// because they carry no c.1.n.n number. If they came out of the same box,
// merge the two files.
//
// None of these three carries a control number, so none is given one. The
// slug is the identity; a number can be added later without changing a URL,
// a cross-reference or anything else.

import type { Collection } from './types';

export const COLLECTION: Collection = {
  slug: 'thomas-family',
  title: 'Thomas Family Photographs',
  custody: 'Various origins.',
  scope:
    'Photographs of the Benjamin and Minerva Thomas family and relatives. Their daughter, Nannie, married Austin Swann. They moved to Scurry County, Texas in 1890, where Minerva was one of the first postmasters for the small community they settled.',
  lines: ['Thomas', 'Hunter', 'Swann', 'Patterson', 'Miller'],
  places: ['Texas'],
  defaults: {
    rights: { status: 'public-domain' },
  },
  series: [
    { id: 'portraits', title: 'Portraits' },
    { id: 'snapshots', title: 'Snapshots' },
  ],

  items: [
    /* ---------------------------------------------------------------- */
    {
      slug: 'benjamin-b-thomas-portrait',
      title: '[Benjamin B. Thomas]',
      titleSource: 'supplied',
      
      // The soft graphite modelling of the face against flat wash in the coat
      // is characteristic of a CRAYON ENLARGEMENT - a photographic enlargement
      // worked over by hand, sold door to door from about 1880 to 1910. But it
      // could also be a drawing made after a photograph, and the difference
      // matters: one is a photograph and one is not. Determine it from the
      // original, not from a scan.
      format: 'crayon enlargement',
      photographer: {
        name: 'Unknown',
        confidence: 'unidentified',
        basis: 'No imprint or signature visible in the surrogate.',
      },
      date: {
        display: '[undated]',
        basis: ['Nothing on the object dates it.'],
        confidence: 'unidentified',
      },
      recto: {
        file: 'thomas-benjamin-b-recto.jpg',
        width: 1650,
        height: 2552,
        capture: 'scan, 300 ppi',
        note:
          'Lower resolution than the mounted photographs, and it is not clear whether this was taken from the original or from a copy. See needsWork.',
      },
      verso: {
        file: 'thomas-benjamin-b-verso.jpg',
        width: 1650,
        height: 2552,
        capture: 'scan, 300 ppi',
      },
      description:
        'Half-length portrait of an older man facing the viewer. He is bald across the crown with long hair swept back over the ears and a full chin beard, greying at the edges, the upper lip shaved. He wears a dark coat with wide notched lapels over a white shirt with a small stud. The face is modelled in fine graphite; the coat is laid in as flat wash. The background is left blank, and a ruled border runs down the right edge and across the foot.',
      inscriptions: [
        {
          location: 'verso',
          medium: 'ink',
          text: 'Benjamin Thomas\nChildren were\nN. B. Thomas (Bud)\nJohn Thomas\nRocket Thomas Patterson\nNan Thomas Swann\n    (married Austin Swann)\nEmma Thomas Miller',
          note:
            'The three daughters are entered under married surnames with the maiden name kept in the middle - Nan Thomas Swann, Emma Thomas Miller, Rocket Thomas Patterson - which is why each has her own person record rather than being folded into her husband\u2019s.',
        },
      ],
      depicts: [
        {
          person: 'thomas-benjamin-b',
          confidence: 'probable',
          basis:
            'The verso names Benjamin Thomas and lists his children. It does not explicitly say the portrait is of him - but a name at the head of the back of a portrait normally identifies the sitter.',
        },
      ],
      related: [
        { slug: 'minerva-hunter-thomas-portrait', relation: 'Companion portrait, matching size and treatment' },
        {
          slug: 'boyd-naylor-thomas-band',
          relation: 'His son M. B. ("Bud") Thomas is named among the sitters',
        },
      ],
      needsWork: [
        'Photograph or drawing? Look at the original under magnification for a photographic image beneath the handwork.',
        'The size of the original. If it is a crayon enlargement it is probably 16 x 20 in. or larger, and a 300 ppi file of a 5 1/2 x 8 1/2 sheet suggests this was scanned from a copy print rather than from the object.',
        'Whose hand wrote the children\u2019s list, and when.',
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      slug: 'minerva-hunter-thomas-portrait',
      title: '[Minerva Hunter Thomas]',
      titleSource: 'supplied',
      
      format: 'crayon enlargement',
      photographer: {
        name: 'Unknown',
        confidence: 'unidentified',
        basis: 'No imprint or signature visible in the surrogate.',
      },
      date: {
        display: '[undated]',
        basis: ['Nothing on the object dates it.'],
        confidence: 'unidentified',
      },
      recto: {
        file: 'thomas-minerva-hunter-recto.jpg',
      },
       verso: {
        file: 'thomas-minerva-hunter-verso.jpg',
      },
      description:
        'Half-length portrait of an older woman facing the viewer. Her hair is parted at the centre and drawn back close to the head. She wears small oval wire-rimmed spectacles, a wide white collar with a scalloped edge, and a dark bodice buttoned to the throat with five pale buttons, a round faceted brooch at the collar. Modelled in graphite over flat wash, on a blank ground, with a ruled border at the right and foot - the same treatment and sheet size as the portrait of Benjamin B. Thomas.',
      depicts: [
        {
          person: 'thomas-minerva-hunter',
          confidence: 'certain',
          basis:
            'The name of Minerva Hunter Thomas is on the verso.',
        },
      ],
      related: [
        { slug: 'benjamin-b-thomas-portrait', relation: 'Companion portrait, matching size and treatment' },
      ],
      needsWork: [
        '',
      ],
    },

    {
      slug: 'thomas-ben-family',
      title: '[Ben Thomas and Family]',
      titleSource: 'supplied',
      
      format: 'mounted photograph',
      photographer: {
        name: 'Unknown',
        confidence: 'unidentified',
        basis: 'No imprint or signature visible in the surrogate.',
      },
      date: {
        display: '[before 1909]',
        basis: ['Nothing on the object dates it. This must be before Benjamin B. Thomas died in 1909.'],
        confidence: 'unidentified',
      },
      recto: {
        file: 'thomas-ben-minerva-matt-recto.jpg',
      },
       verso: {
        file: 'thomas-ben-minerva-matt-verso.jpg',
      },
      description:
        'A photograph of the Ben and Minerva Thomas family in front of a structure with other unidentified people. \'Aunt Matt\' is supposed to be in this picture, but she is not identified. Two other women are present, as well as four unidentified children. One of the children may be Loveta Swann, a granddaughter of Ben and Minerva.',
      depicts: [
        {
          person: 'thomas-minerva-hunter',
          confidence: 'certain',
          basis:
            'The name of Minerva Hunter Thomas is on the verso.',
        },
        {
          person: 'thomas-benjamin-b',
          confidence: 'certain',
          basis:
            'The name of Ben Thomas is on the verso.',
        },
        {
          person: 'darby-mattie-thomas',
          confidence: 'certain',
          basis:
            'The name of Aunt Matt is on the verso.',
        },
        {
          person: 'mckinstry-loveta-swann',
          confidence: 'probable',
          basis:
            'A child that looks similar to Loveta is at the left of the photograph',
        }
      ],
    },
    {
      slug: 'grandmas-grandpa-thomas',
      title: '[Grandma and Grandpa Thomas]',
      titleSource: 'supplied',
      
      format: 'mounted photograph',
      photographer: {
        name: 'Unknown',
        confidence: 'unidentified',
        basis: 'No imprint or signature visible in the surrogate.',
      },
      date: {
        display: '[before 1909]',
        basis: ['Nothing on the object dates it. This must be before Benjamin B. Thomas died in 1909.'],
        confidence: 'unidentified',
      },
      recto: {
        file: 'grandma-grandpa-thomas-recto.jpg',
      },
       verso: {
        file: 'grandma-grandpa-thomas-verso.jpg',
      },
      description:
        'A photograph of the Ben and Minerva Thomas possibly in front of their house in Scurry County.',
      depicts: [
        {
          person: 'thomas-minerva-hunter',
          confidence: 'certain',
          basis:
            'The name of Minerva Hunter Thomas is on the verso.',
        },
        {
          person: 'thomas-benjamin-b',
          confidence: 'certain',
          basis:
            'The name of Ben Thomas is on the verso.',
        },
      ],
    },
    {
      slug: 'thomas-grandpa-jackie-frances',
      title: '[Grandpa Thomas, Aunt Jackie Thomas, Frances next to her mother]',
      titleSource: 'supplied',
      controlNumber: 'c.1.8.1',
      format: 'mounted photograph',
      photographer: {
        name: 'Unknown',
        confidence: 'unidentified',
        basis: 'No imprint or signature visible in the surrogate.',
      },
      date: {
        display: '[1904-1906]',
        earliest: 1904,
        latest: 1906,
        basis: ['Nothing on the object dates it. This must be before Benjamin B. Thomas died in 1909, but Frances (the child immediately right of Benjamin is likely 3 to 5 years old. She was born in 1901.).'],
        confidence: 'unidentified',
      },
      recto: {
        file: 'thomas-grandpa-jackie-frances-recto.jpg',
      },
       verso: {
        file: 'thomas-grandpa-jackie-frances-verso.jpg',
      },
      description:
        'A photograph depicting Benjamin B. Thomas, Jackie Thomas, and Frances Thomas. Jackie and Frances Thomas are not family members I am familiar with.',
      depicts: [
        {
          person: 'thomas-benjamin-b',
          confidence: 'certain',
          basis:
            'The name of Grandpa Thomas, better known as Benjamin, is on the verso.',
        },
        {
          person: 'thomas-sallie-foster',
          confidence: 'probable',
          basis:
            '"Sackie" from the verso is likely Sallie Thomas Foster.',
        },
        {
          person: 'sheram-frances-thomas',
          confidence: 'probable',
          basis:
            'Frances, the daughter of John and Sallie Thomas is likely the child mentioned.',
        },
      ],
      inscriptions: [
        {
          location: 'verso',
          medium: 'ink',
          text: 'Grandpa Thomas, Aunt Sackie Thomas, Frances next to her mother',
          note: 'It is presumed that "Sackie" is Sallie Foster Thomas, since her daughter is Frances.'
        },
      ],
    },
    {
      slug: 'darby-mattie-thomas',
      title: '[Aunt Matt Thomas Darby]',
      titleSource: 'supplied',
      
      format: 'mounted photograph',
      photographer: {
        name: 'Unknown',
        confidence: 'unidentified',
        basis: 'No imprint or signature visible in the surrogate.',
      },
      date: {
        display: '[late 19th century]',
        basis: ['Nothing on the object dates it. This photograph shows a young Mattie Thomas Darby. She was born in 1875, so a proposed late 19th century date is plausible'],
        confidence: 'unidentified',
      },
      recto: {
        file: 'darby-mattie-thomas-recto.jpg',
      },
       verso: {
        file: 'darby-mattie-thomas-verso.jpg',
      },
      description:
        'This is an undated photograph of Mattie Thomas Darby from roughly the late 19th century.',
      depicts: [
        {
          person: 'darby-mattie-thomas',
          confidence: 'certain',
          basis:
            'The name of Mattie Thomas Darby is on the verso.',
        },
      ],
    },
    {
      slug: 'patterson-rockett-thomas',
      title: '[Rockett Thomas Patterson]',
      titleSource: 'supplied',
      format: 'mounted photograph',
      photographer: {
        name: 'Miller & Barrett',
        confidence: 'certain',
        basis: 'Photograph has Miller & Barrett name on bottom. That studio was in Cooper, Texas.',
      },
      date: {
        display: '[late 19th century]',
        basis: ['Nothing on the object dates it. This photograph shows a young Mattie Thomas Darby. She was born in 1875, so a proposed late 19th century date is plausible'],
        confidence: 'unidentified',
      },
      recto: {
        file: 'patterson-rockett-thomas-recto.jpg',
      },
       verso: {
        file: 'patterson-rockett-thomas-verso.jpg',
      },
      description:
        'This is an undated photograph of Rockett Thomas Patterson from roughly the late 19th century.',
      depicts: [
        {
          person: 'patterson-rockett-thomas',
          confidence: 'certain',
          basis:
            'The name of Rockett Thomas Patterson is on the verso.',
        },
      ],
      inscriptions: [
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'Rocket Thomas Patterson, mama\'s sister.',
          hand: 'Potentially Loveta Swann McKinstry.',   // whose hand, when you can say
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    
    {
      slug: 'boyd-naylor-thomas-band',
      controlNumber: 'c.1.15.1',
      title: '[Ewing Boyd, Charley Naylor and Bud Thomas with instruments]',
      titleSource: 'supplied',
      series: '',
      format: 'cabinet card',
      photographer: {
        name: 'Unknown',
        confidence: 'unidentified',
        basis: 'No studio imprint visible on the recto.',
      },
      date: {
        display: '[undated]',
        basis: [
          'No date on the object.',
          'ASSESSMENT, NOT ESTABLISHED - the cabinet-card format was current from the late 1860s to the early 1900s; the mount, the painted backdrop and the clothing would narrow it, but I would want the verso and the mount edge before printing a range.',
        ],
        confidence: 'unidentified',
      },
      recto: {
        file: 'boyd-naylor-thomas-band-recto.jpg',
      },
      verso: {
        file: 'boyd-naylor-thomas-band-verso.jpg',
      },
      description:
        'Three young men posed against a painted studio backdrop with a prop rock and grass. At left, a man in a light broad-brimmed hat and dark sack coat sits holding a violin upright by the neck, the bow across his knee. At centre, a man in a dark bowler and a patterned neck scarf stands leaning against the rock, holding a cornet by the valves, a watch chain at his waistcoat. At right, a moustached man in a pale hat sits with a guitar across his lap, one hand on the strings. Albumen or similar warm-toned print on a card mount with rounded corners; the mount is abraded at the corners and along the lower edge, with a pale stain at the left margin.',
      inscriptions: [],
      depicts: [
        {
          person: 'boyd-ewing',
          confidence: 'probable',
          basis:
            'Supplied with the item; the source of the names is not recorded on the object.',
        },
        {
          person: 'naylor-charley',
          confidence: 'probable',
          basis: 'Supplied with the item; source not recorded on the object.',
        },
        {
          person: 'thomas-norphlet-bud',
          confidence: 'probable',
          basis:
            'Supplied with the item as "Bud Thomas". Identified with N. B. ("Bud") Thomas, named as a son of Benjamin Thomas on the verso of the Benjamin B. Thomas portrait - same nickname within a family group represented across this material, which is grounds for a link but not proof of one.',
        },
      ],
      related: [
        {
          slug: 'benjamin-b-thomas-portrait',
          relation:
            'Verso names M. B. ("Bud") Thomas among Benjamin Thomas\u2019s children',
        },
      ],
      needsWork: [
        'WHICH MAN IS WHICH. Three names, three figures, no stated order - the names are listed but not positioned, and guessing would be inventing a record.',
        'Image the verso: a cabinet card usually carries a studio imprint, which would give a place and often a date range.',
      ],
    },
        {
      slug: 'thomas-matt',
      controlNumber: 'c.1.19.3',
      title: '[Aunt Matt Thomas Darby]',
      titleSource: 'supplied',
      format: 'cabinet card',
      photographer: {
        name: 'Knight & Hardgrave',
        confidence: 'certain',
        basis: 'Verso shows Knight & Hardgrave Studio name from Greenville, Texas',
      },
      date: {
        display: '[1882-1887]',
        earliest: 1882,
        latest: 1887,
        basis: ['Photograph depicts a girl said to be Mattie Thomas Darby between the ages of 7 and 12'],
        confidence: 'unidentified',
      },
      recto: {
        file: 'darby-matt-thomas-recto.jpg',
      },
       verso: {
        file: 'darby-matt-thomas-verso.jpg',
      },
      description:
        'This is an undated photograph of Mattie Thomas Darby from the late 19th century.',
      depicts: [
        {
          person: 'darby-mattie-thomas',
          confidence: 'certain',
          basis:
            'The name of Mattie Thomas Darby is on the verso.',
        },
      ],
      inscriptions: [
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'Aunt Matt Thomas Darby',
          hand: 'Potentially Loveta Swann McKinstry.',   // whose hand, when you can say
        },
      ],

    },
  ],
};
