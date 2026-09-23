// src/data/collections/swann-family.ts
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
  slug: 'swann-family',
  title: 'Swann Family Photographs',
  // NOTE: this collection holds both b.n and c.n control numbers. That is
  // fine - the letters are internal bookkeeping, not a fact about custody,
  // and they are stored as `controlNumber` rather than used as keys.
  custody: 'Various sources',
  scope:
    'Photographs of the Swann family. Malcom and Nancy Swann are the most distant members of the Swann line photographed.',
  arrangement: 'By series, below. The control numbers are not an arrangement.',
  lines: ['Swann', 'Girdner', 'Thomas', 'McKinstry'],
  places: ['Texas', 'Mississippi', 'Oklahoma'],
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
      slug: 'swann-girdner-swann-thresher',
      controlNumber: 'c.1.1.1',
      title: 'Swann, Girdner & Swann thresher',
      titleSource: 'inscribed',
      series: '',
      format: 'mounted photograph',
      photographer: {
        name: 'Austin Swann',
        confidence: 'probable',
        basis: 'Austin Swann took many photographs throughout the years. He does not appear to be in this photograph, so he may have taken it. Other photos from this trip mention he took pictures.',
      },
      place: 'Oklahoma',
      date: {
        display: '[1900-1901]',
        basis: [
          'Nothing on the object dates it.',
          'Other photographs of the threshing trip to Oklahoma mention dates of 1900 and 1901.',
        ],
        confidence: 'probable',
      },
      recto: {
        file: 'swann-girdner-swann-thresher-1-recto.jpg',
      },
      verso: {
        file: 'swann-girdner-swann-thresher-1-verso.jpg',
      },
      description:
        'A threshing outfit at work in a stubble field. At left a steam traction engine under steam, its stack smoking, a man standing at the flywheel; a long belt runs to a separator at right, which is blowing straw onto a stack. Between them stand four or five bundle wagons loaded high with sheaves, each with a man or two on top pitching. Roughly twenty men are visible on the loads, on the machinery and on the ground; a team stands hitched at right. Cut stubble and shocked grain fill the foreground. The print is mounted on a dark grey card with a wide margin; the mount is torn away at the right edge and chipped along the top.',
      inscriptions: [
        {
          location: 'verso',
          medium: 'ink',
          text: 'Swann Girdner & Swann\nThrasher - Engine in Okla.\nThey carried their crew and\nfamilies except John Swann\'s\nThey had their cook for cooking their meals',
          note: '"Thrasher" as written. The first line is underscored.',
        },
        {
          location: 'verso',
          medium: 'pencil',
          text: 'c.1.1.1',
          note: 'Modern control number, written vertically at the right edge.',
        },
      ],
      depicts: [
        {
          person: 'swann-john-milton',
          confidence: 'unidentified',
          basis:
            'Named in the verso inscription as a member of the outfit, but the inscription does not say which figure he is - or whether he is in the frame at all.',
          region: { face: 'recto', x: 47.3, y: 55.4, w: 0.9, h: 1.9 },
          },
      ],
      related :[
        {
          slug: 'swann-girdner-swann-cooking-1',
          relation: ''
        },
        {
          slug: 'malcom-swann-in-oklahoma',
          relation: ''
        },
      ],
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
      needsWork: [
        'Which of the three names in the firm are in the photograph, and where.',
        'Where in Oklahoma, and in what years the outfit operated.',
        'Whether "Girdner" connects to a line you can place.',
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      slug: 'old-malcom-swann-gin',
      controlNumber: 'c.1.4.1',
      title: 'Old Malcom Swann Gin',
      titleSource: 'inscribed',
      series: '',
      place: 'Jacobia, Texas',
      format: 'mounted photograph',
      photographer: {
        name: 'Unknown',
        confidence: 'unidentified',
        basis: 'No studio imprint.',
      },
      date: {
        display: '[1885-1900]',
        earliest: 1885,
        latest: 1900,
        basis: [
          'The verso reads "Built ab[out] 1885" - which dates THE GIN, not the photograph. The photograph can only be later.',
          'The gin is described as "old" by the person who wrote the caption, but that inscription is undated and may be much later than the exposure.',
          'Malcom Swann and Austin Swann are visible in this photograph. Austin Swann got married around 1886, but he looks older here than in his wedding picture.'
        ],
        confidence: 'probable',
      },
      recto: {
        file: 'malcom-swann-gin-recto.jpg',
      },
      verso: {
        file: 'malcom-swann-gin-verso.jpg',
      },
      description:
        'A wooden cotton gin complex photographed from across a wire fence. The two-storey gin house stands at centre right with a tall metal stack beside it and an elevated water tank on a timber frame; a long open shed on posts runs off to the left, with a smaller gabled building beyond it and a horse and buggy at the far left. Two men stand in the upper doorway of the gin house at the head of a plank stair. Baled cotton is stacked in the foreground, one bale stencilled 345, with about a dozen men and boys posed on and around the bales - an older bearded man in a light shirt and dark vest seated at centre. Rough grass and cut timber in front of the fence. The mount is chipped and foxed, with a notch cut from the upper right corner and a scatter of dark spots along the lower margin.',
      inscriptions: [
        {
          location: 'verso',
          medium: 'ink',
          text: 'The Old Malcom Swann\nGin - at the home place',
        },
        {
          location: 'verso',
          medium: 'pencil',
          text: 'early\nBuilt ab[out] 1885',
          note: 'Upper left, in a different hand and medium from the ink caption. Partly obscured by a tape residue.',
          datesSubjectNotObject: true,
        },
        { location: 'verso', medium: 'pencil', text: 'c.1.4.1' },
      ],
      depicts: [
        {
          person: 'swann-malcom',
          confidence: 'certain',
          basis:
            'The gin carries his name and an older man sits prominently at the center of the group. Nothing specifically identifies Malcom, but the figure sitting in the center matches what Malcom looked like.',
          region: { face: 'recto', x: 50.7, y: 61.4, w: 2.9, h: 4.3 },
          },
        {
          person: 'swann-austin',
          confidence: 'certain',
          basis:
            'A figure matching Austin Swann sits two spots to the right of Malcom.',
          region: { face: 'recto', x: 62.4, y: 62.8, w: 2.5, h: 3.5 },
          },
      ],
      needsWork: [
        'Where "the home place" is.',
        'Whether the bearded man at centre is Malcom Swann.',
        'Whether the gin appears in any county or fire-insurance record that would date the photograph itself.',
      ],
    },
  

    /* ---------------------------------------------------------------- */
    {
      slug: 'malcom-swann-in-oklahoma',
      controlNumber: 'b.1.26.1',
      title: '[Malcom Swann in Oklahoma]',
      titleSource: 'supplied',
      series: '',
      format: 'mounted photograph',
      photographer: {
        name: 'Austin Swann',
        confidence: 'probable',
        basis: 'Austin Swann took many photos on this threshing trip.',
      },
      place: 'Oklahoma',
      date: {
        display: '[1900-1901]',
        basis: [
          'Nothing on the object dates it.',
          'Other photographs from this trip have these dates',
        ],
        confidence: 'probable',
      },
      recto: {
        file: 'malcom-swann-in-oklahoma-1-recto.jpg',
      },
      verso : {
        file: 'malcom-swann-in-oklahoma-1-verso.jpg'
      },
      description:
        'An elderly man with a full white beard sits in profile on a ladder-back chair in a camp on open prairie. He wears a dark coat and trousers and a broad-brimmed hat, and holds his hands up in front of him around something small that cannot be made out. Behind him a canvas wall tent stands with its flap thrown back. To the right a covered wagon is drawn up with its bows and cover in place; a figure in light-coloured clothing stands at the tailgate among boxes and gear, and canvas or bedding is spread on the ground beside it. Cut grass, scattered sticks and a low fence rail lie in the foreground; the horizon is flat and empty. The print is roughly square, mounted on a cream card with a blind-embossed scalloped border inside two ruled lines; the mount is torn away at the upper right corner.',
      inscriptions: [
        {
          location: 'verso',
          medium: 'ink',
          text: 'Grandpa Swann in Oklahoma. He went with Austin and John Swann, Mr. and Mrs. D.R. Girdner families spent several weeks in Okla. threshing grain for the farmers. Uncle Austin daughters Eva, Minnie and Loveta all drove from Greenville, Tex. to Okla. - eastern section of Okla.',
        }
      ],
      depicts: [
        {
          person: 'swann-malcom',
          confidence: 'certain',
          basis:
            'Supplied with the item; the source of the name is not recorded on the object.',
          region: { face: 'recto', x: 35, y: 33.2, w: 12.2, h: 12.9 },
        },
      ],
      related: [
        {
          slug: 'old-malcom-swann-gin',
          relation:
            'The bearded man seated at the centre of the gin group may be the same person - comparison not yet made',
        },
        {
          slug: 'swann-girdner-swann-thresher',
          relation:
            'Another photograph from threshing in Oklahoma during this period.',
        },
        {
          slug: 'swann-girdner-swann-cooking-1',
          relation: ''
        },
      ],
      needsWork: [
        'RESCAN. This is a phone photograph of the object, and the second figure cannot be resolved from it.',
        'Compare this face with the bearded man at the centre of c.1.4.1. If they are the same man, the gin identification moves from possible to probable and the two objects start to corroborate each other.',
        'Who is at the wagon.',
        'Where in Oklahoma, and why they were camped rather than settled.',
      ],
    },
    {
      slug: 'swann-girdner-swann-cooking-1',
      controlNumber: 'c.1.3.1',
      title: '[Swann, Girdner & Swann Cooking Tent]',
      titleSource: 'supplied',
      series: '',
      format: 'mounted photograph',
      photographer: {
        name: 'Austin Swann',
        confidence: 'probable',
        basis: 'Austin Swann took many photos on this threshing trip.',
      },
      place: 'Oklahoma',
      date: {
        display: '[1900-1901]',
        basis: [
          'Nothing on the object dates it.',
          'Other photographs from this trip have these dates',
        ],
        confidence: 'probable',
      },
      recto: {
        file: 'swann-girdner-swann-cooking-recto.jpg',
      },
      verso : {
        file: 'swann-girdner-swann-cooking-verso.jpg'
      },
      description:
        'The Swann, Girdner & Swann cooking outfit. The tent contains a stove, pots, pans, and other cooking utensils. Although not noted, John Swann stands holding a pan.',
      inscriptions: [
        {
          location: 'verso',
          medium: 'ink',
          text: 'Swann, Girdner & Swann',
        }
      ],
      depicts: [
        {
          person: 'swann-john-milton',
          confidence: 'possible',
          basis:
            'Matches John Swann\'s appearance.',
          region: { face: 'recto', x: 56.7, y: 48.6, w: 2.8, h: 4.2 },
        },
      ],
      related: [
        {
          slug: 'malcom-swann-in-oklahoma',
          relation:
            'Malcom Swann on the same trip',
        },
        {
          slug: 'swann-girdner-swann-thresher',
          relation:
            'Another photograph from threshing in Oklahoma during this period.',
        },
      ],
      needsWork: [
        'RESCAN. This is a phone photograph of the object, and the second figure cannot be resolved from it.',
        'Compare this face with the bearded man at the centre of c.1.4.1. If they are the same man, the gin identification moves from possible to probable and the two objects start to corroborate each other.',
        'Who is at the wagon.',
        'Where in Oklahoma, and why they were camped rather than settled.',
      ],
    },
    {
      slug: 'swann-austin-nannie-wedding',
      controlNumber: 'c.1.5.1',
      title: '[Austin and Nannie Swann wedding photo]',
      titleSource: 'supplied',
      place: 'Hunt County, Texas',
       date: {
        // What prints. Square brackets mark an assessment.
        display: '[April 1885]',
        earliest: 1885,           // optional, numbers not strings
        latest: 1885,             // optional
        // One line per piece of evidence. Prints as a bulleted list under
        // the date on the record page. An empty array is honest and fine.
        basis: [
          'The verso reads "about 1885." Austin and Nannie Swann were married April 16, 1885 in Hunt County, so this date can be corrobrated.',
        ],
        confidence: 'certain',
      },
      inscriptions: [
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'Papa and Mama taken about 1885. Wedding picture. Nannie (called Nan) Thomas Swann. Austin Swann.',
        },
      ],
      depicts: [
        {
          person: 'swann-austin',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
          position: 'Seated on left.',
          region: { face: 'recto', x: 25, y: 25.9, w: 16.9, h: 17.9 },
        },
        {
          person: 'swann-nannie-thomas',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
          position: 'Standing on right.',
          region: { face: 'recto', x: 55.9, y: 7.3, w: 14.7, h: 16.2 },
        }
      ],
      format: 'mounted photograph',
      recto: { file: 'swann-austin-nannie-wedding-recto.jpg' },
      verso: { file: 'swann-austin-nannie-wedding-verso.jpg' },
      description: 'The wedding photo of Austin and Nannie Swann from about April 1885.',
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'paddock-adair',
      controlNumber: 'c.1.9.1',
      title: '[D.A. Paddock, F.A. Adair]',
      titleSource: 'supplied',
      place: 'Chaves County, New Mexico',
       date: {
        // What prints. Square brackets mark an assessment.
        display: '[1909-1912]',
        earliest: 1909,           // optional, numbers not strings
        latest: 1912,             // optional
        // One line per piece of evidence. Prints as a bulleted list under
        // the date on the record page. An empty array is honest and fine.
        basis: [
          'The is no date, but these men were like school teachers or officials at Hagerman when Loveta Swann McKinstry was in school there. She graduated in 1911.',
        ],
        confidence: 'probable',
      },
      inscriptions: [
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'D.A. Paddock (Supt.), F.A. Adair',
        },
      ],
      depicts: [
        {
          person: 'paddock-delbert-adam',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
          region: { face: 'recto', x: 22.8, y: 33.6, w: 17.3, h: 23.9 },
        },
        {
          person: 'adair-fletcher-absalom',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
          region: { face: 'recto', x: 35.7, y: 32, w: 14.7, h: 27.3 },
        }
      ],
      format: 'mounted photograph',
      recto: { file: 'paddock-adair-recto.jpg' },
      verso: { file: 'paddock-adair-verso.jpg' },
      description: 'This photograph depicts two men next to a river. One of the men is standing on his head with the other man assisting the maneuver. The back of the photograph names D.A. Paddock and F.A. Adair. After research, it was found that these men were teachers at Hagerman in the early 1900s. This may be the Felix River near Hagerman.',
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'swann-mccoy',
      controlNumber: 'c.1.11.1',
      title: '[Loveta Swann and Mae McCoy]',
      titleSource: 'supplied',
      place: 'Hagerman, Chaves County, New Mexico',
       date: {
        // What prints. Square brackets mark an assessment.
        display: '1910',
        basis: [
          'The date of 1910 is in ink on the verso.',
        ],
        confidence: 'certain',
      },
      inscriptions: [
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'Loveta Swann left',
        },
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'Mae (Jack) McCoy',
        },
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'When only girls going to Hagerman, N.M. school',
        },
      ],
      depicts: [
        {
          person: 'mckinstry-loveta-swann',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
          region: { face: 'recto', x: 28.8, y: 25.3, w: 11.6, h: 7.5 },
        },
        { 
          as: 'Mae McCoy',
          confidence: 'certain',
          basis: 'No authority record yet. May be the only photo of her.',
          region: { face: 'recto', x: 60.3, y: 23.4, w: 13.6, h: 9.5 },
        },
      ],
      format: 'mounted photograph',
      recto: { file: 'swann-loveta-mccoy-mae-recto.jpg' },
      verso: { file: 'swann-loveta-mccoy-mae-verso.jpg' },
      description: 'The photograph depicts Loveta Swann (left) and Mae McCoy (right) riding horses in Hagerman, New Mexico.',
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'swann-austin-grave',
      controlNumber: 'c.1.12.1',
      title: '[Austin Swann\'s grave]',
      titleSource: 'supplied',
      place: 'Jacobia, Hunt County, Texas',
       date: {
        // What prints. Square brackets mark an assessment.
        display: '[1931]',
        basis: [
          'Photo is likely taken shortly after the death of Austin Swann in 1931',
        ],
        confidence: 'probable',
      },
      inscriptions: [
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'Austin Swann\'s grave',
        },
      ],
      depicts: [
        {
          person: 'swann-austin',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
        },
      ],
      format: 'mounted photograph',
      recto: { file: 'swann-austin-grave-recto.jpg' },
      verso: { file: 'swann-austin-grave-verso.jpg' },
      description: 'This photograph shows the grave of Austin Swann in the cemetery at Jacobia in Hunt County, Texas.',
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'swann-minnie-naughty-six',
      controlNumber: 'c.1.17.1',
      title: '[The Naughty Six at Jacobia School]',
      titleSource: 'supplied',
      place: 'Jacobia, Hunt County, Texas',
      date: {
        // What prints. Square brackets mark an assessment.
        display: '[1907-1908]',
        earliest: 1907,
        latest: 1908,
        basis: [
          'Photo is likely from Minnie\'s time in school, which would be roughly between 1907 and 1908. Verso mentions that this photo is from just before they moved to New Mexico, which was in 1907 or 1908.',
        ],
        confidence: 'probable',
      },
      inscriptions: [
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'Ethel Brooks left, Eura Kitchens next, then Jewell Brooks, Sue McGaughey, Zera Girdner, Minnie Swann sitting down',
        },
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'Just before we moved to New Mexico',
        },
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: '(The Naughty Six) at Jacobia School',
        },
      ],
      depicts: [
        {
          person: 'mckinstry-minnie-swann',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
          region: { face: 'recto', x: 55, y: 41, w: 6.2, h: 11.9 },
        },
        { 
          as: 'Ethel Brooks',
          confidence: 'certain',
          basis: 'No authority record yet. May be the only photo of her.'
        },
        { 
          as: 'Eura Kitchens',
          confidence: 'certain',
          basis: 'No authority record yet. May be the only photo of her.'
        },
        { 
          as: 'Jewell Brooks',
          confidence: 'certain',
          basis: 'No authority record yet. May be the only photo of her.'
        },
        { 
          as: 'Zera Girdner',
          confidence: 'certain',
          basis: 'No authority record yet. May be the only photo of her.'
        },
        { 
          as: 'Sue McGaughey',
          confidence: 'certain',
          basis: 'No authority record yet. May be the only photo of her.'
        },
      ],
      format: 'mounted photograph',
      recto: { file: 'swann-minnie-naughty-six-recto.jpg' },
      verso: { file: 'swann-minnie-naughty-six-verso.jpg' },
      description: 'The photo depicts Minnie Swann sitting down in front of five of her friends. This group was known as the "Naughty Six." ',
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'girdner-lizzie-swann-1',
      controlNumber: 'd.1.19.4',
      title: '[Lizzie Swann Girdner]',
      titleSource: 'supplied',
      place: 'Greenville, Hunt County, Texas',
      date: {
        // What prints. Square brackets mark an assessment.
        display: '[1882-1888]',
        earliest: 1882,
        latest: 1888,
        basis: [
          'Lizzie Swann Girdner was born in 1864 according to the family Bible. This photograph shows a woman in her late teens or early twenties.',
        ],
        confidence: 'probable',
      },
      inscriptions: [
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'Aunt Lizzie Girdner',
        },
      ],
      depicts: [
        {
          person: 'girdner-lizzie-swann',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
          region: { face: 'recto', x: 33.7, y: 10.2, w: 26.4, h: 22.9 },
        },
      ],
      format: 'cabinet card',
      recto: { file: 'girdner-lizzie-swann-recto.jpg' },
      verso: { file: 'girdner-lizzie-swann-verso.jpg' },
      description: 'The photograph depicts Lizzie Swann Girdner',
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'swann-malcom-family',
      title: '[Malcom Swann family 1870s]',
      titleSource: 'supplied',
      place: 'Hunt County, Texas',
      date: {
        // What prints. Square brackets mark an assessment.
        display: '[1875-1878]',
        earliest: 1875,
        latest: 1878,
        basis: [
          'This photograph shows the living children of Malcom and Nancy Swann, Austin, Lizzie, John, and Phebe. Nannie is not present, so this must be from before 1878.',
        ],
        confidence: 'probable',
      },
      inscriptions: [
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'Grandpa Swann',
        },
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'Grandma Swann',
        },
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'Austin Swann',
        },
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'Lizzie Swann',
        },
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'John Swann',
        },
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'Phebe Swann',
        },
      ],
      depicts: [
        {
          person: 'swann-malcom',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
          region: { face: 'recto', x: 27.7, y: 26.2, w: 15.1, h: 11.5 },
        },
        {
          person: 'swann-nancy-atkinson',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
          region: { face: 'recto', x: 62.1, y: 26.6, w: 18.2, h: 12.1 },
        },
        {
          person: 'swann-austin',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
          region: { face: 'recto', x: 51.7, y: 11.2, w: 17.6, h: 10.8 },
        },
        {
          person: 'girdner-lizzie-swann',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
          region: { face: 'recto', x: 74.3, y: 15.3, w: 16.4, h: 13.4 },
        },
        {
          person: 'swann-john-milton',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
          region: { face: 'recto', x: 12.3, y: 23, w: 17.1, h: 11.1 },
        },
        {
          person: 'bouknight-phebe-swann',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
          region: { face: 'recto', x: 41.4, y: 26.9, w: 17.1, h: 12.5 },
        },
      ],
      format: 'tintype',
      recto: { file: 'swann-malcom-family-recto.jpg' },
      verso: { file: 'swann-malcom-family-verso.jpg' },
      description: 'This photograph depicts Malcom and Nancy Swann and their children Austin, Lizzie, John, and Phebe. Nannie Swann is not visible here, so this photograph must be from before 1878.',
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'swann-nancy-annie',
      title: '[Nancy Swann and Annie Swann]',
      titleSource: 'supplied',
      place: 'Noxubee County, Mississippi',
      date: {
        // What prints. Square brackets mark an assessment.
        display: '[1859]',
        basis: [
          'Annie Swann was born on February 24, 1859 and she died on January 3, 1860. This photograph must be from 1859.',
        ],
        confidence: 'certain',
      },
      inscriptions: [
        {
          location: 'note',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'Nancy Atkinson Swann oldest daughter Annie died one year old.',
        },
      ],
      depicts: [
        {
          person: 'swann-nancy-atkinson',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on note.',
          region: { face: 'recto', x: 37.7, y: 30.1, w: 25.1, h: 24 },
        },
        {
          person: 'swann-annie',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on note.',
          region: { face: 'recto', x: 26.6, y: 54.5, w: 18.2, h: 19.5 },
        },
      ],
      format: 'ambrotype',
      recto: { file: 'swann-nancy-annie-recto.jpg' },
      views : [
        { file: 'swann-nancy-annie-cover.jpg', label: 'Case, closed'},
        { file: 'swann-nancy-close.jpg', label: 'Nancy, close up'},
        { file: 'swann-annie-close.jpg', label: 'Annie, close up'},
        { file: 'swann-nancy-annie-note.jpg', label: 'Note'},
      ],
      description: 'This is the only known photograph of Annie Swann who died at just over 10 months old in January 1860. She is seen here with her mother, Nancy C. Atkinson Swann. This photograph was likely taken in Mississippi prior to the Swann family moving to Texas.',
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'swann-collage',
      title: '[Swann collage showing several Swann family members]',
      controlNumber: 'b.1.2.1',
      titleSource: 'supplied',
      place: 'Kerrville, Texas',
      date: {
        // What prints. Square brackets mark an assessment.
        display: '[1895-1896]',
        earliest: 1895,
        latest: 1896,
        basis: [
          'This photograph collage shows four different photographs, at least three of which are in the same vicinity near Kerrville, Texas. Nannie Thomas Swann died in 1896, so this photograph must be from before then. Loveta Swann is shown here as being a two or three year old child suggesting this photo may be from 1895 or 1896.',
        ],
        confidence: 'probable',
      },
      inscriptions: [
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'Nannie Swann, Loveta, Minnie',
        },
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'Our mother at Kerrville, Texas where she was sick',
        },
      ],
      depicts: [
        {
          person: 'swann-nannie-thomas',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso. She is the older woman seated in the upper right frame.',
          region: { face: 'recto', x: 67.7, y: 11.8, w: 7.3, h: 7.5 },
        },
        {
          person: 'mckinstry-minnie-swann',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso. She is the girl on the right with the \'x\'',
          region: { face: 'recto', x: 86.3, y: 16.9, w: 7.6, h: 8.8 },
        },
        {
          person: 'mckinstry-loveta-swann',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso She is the girl on the left with the \'x\'.',
          region: { face: 'recto', x: 62.8, y: 19.3, w: 8.7, h: 9.6 },
        },
        {
          person: 'swann-nancy-atkinson',  // an id in people.ts. Build throws if unknown.
          confidence: 'probable',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Nancy C. Atkinson Swann may be the woman in the bottom left frame with an unknown boy.',
          region: { face: 'recto', x: 18.8, y: 58.8, w: 11.3, h: 10.7 },
        },
      ],
      format: 'mounted photograph',
      recto: { file: 'swann-collage-recto.jpg' },
      verso: { file: 'swann-collage-verso.jpg'},
      views : [
        { file: 'swann-collage-corrected-recto.jpg', label: 'Color enhanced version'},
      ],
      description: 'This collage shows four photogrpahs. The upper left photograph depicts two unknown children. The upper right photograph depicts Nannie Thomas Swann (seated) and Loveta and Minnie Swann each denoted by an \'x\'. The lower left photograph shows a seated woman who I believe is Nancy C. Atkinson Swann and an unknown boy. The lower right photograph shows two men with a shot and hung deer.',
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'atkinson-women',
      title: '[Three unidentified women, potentially Nancy Atkinson Swann on right]',
      controlNumber: 'a.1.6.4',
      titleSource: 'supplied',
      place: 'Texas or Mississippi',
      date: {
        // What prints. Square brackets mark an assessment.
        display: '[1865-1875]',
        earliest: 1865,
        latest: 1875,
        basis: [
          'There is no solid way to date this photograph. I believe the woman standing on the right is Nancy C. Atkinson Swann. This photograph looks to be from after the birth of Annie, because she looks older here.',
        ],
        confidence: 'probable',
      },
      depicts: [
        {
          person: 'swann-nancy-atkinson',  // an id in people.ts. Build throws if unknown.
          confidence: 'probable',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Nancy C. Atkinson Swann may be the woman standing on the right.',
          region: { face: 'recto', x: 60.1, y: 24.7, w: 10.9, h: 10.5 },
        },
        {
          as: 'Fannie Bledsoe Atkinson',
          confidence: 'possible',
          basis: 'Seated woman. This possibly would be the second wife of David Atkinson, Nancy Atkinson Swann\'s father.',
          region: { face: 'recto', x: 41.2, y: 38.4, w: 10.9, h: 10.2 },
        },
        {
          as: 'Artemissia Atkinson',
          confidence: 'possible',
          basis: 'Artemissia is one of the siblings of Nancy Atkinson Swann. The identify of this woman cannot be ascertained, but it is a possibility.',
          region: { face: 'recto', x: 25.7, y: 26.8, w: 11.6, h: 10.1 },
        },
      ],
      format: 'tintype',
      recto: { file: 'atkinson-women.jpg' },
      description: 'This photograph shows three women, two standing and one sitting. The woman on the right may be Nancy C. Atkinson Swann. Her appearance matches other photographs of Nancy that are available. The other two women cannot be identified with certainty. They may be relatives of Nancy, potentially her stepmother Fannie Bledsoe Atkinson and her sister Artemissia.',
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'swann-austin-portrait',
      title: 'Portrait of Austin Swann',
      controlNumber: 'a.1.1.1',
      titleSource: 'supplied',
      place: 'Texas',
      date: {
        // What prints. Square brackets mark an assessment.
        display: '[1890-1895]',
        earliest: 1890,
        latest: 1895,
        basis: [
          'There is nothing on this photograph to pinpoint a certain date. Austin Swann appears older in this photograph than the wedding photoraph from 1886. There is a complementary portrait of Nannie Swann likely taken at the same time as this one. She died in 1896, so these photos must be from before then.',
        ],
        confidence: 'probable',
      },
      depicts: [
        {
          person: 'swann-austin',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Can confirm the identity.',
          region: { face: 'recto', x: 19.4, y: 19.8, w: 47.3, h: 51.1 },
        },
      ],
      format: 'tintype',
      recto: { file: 'swann-austin-portrait-recto.jpg' },
      views : [
        { file: 'swann-austin-portrait-recto-enhanced.jpg', label: 'Color enhanced version'},
      ],
      description: 'This is a portrait of Austin Swann likely dating from between 1890 and 1895. ',
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'swann-loveta-and-mable-swann',
      title: '[Loveta Swann and Mable Swann]',
      controlNumber: 'a.1.1.2',
      titleSource: 'supplied',
      place: 'Texas',
      date: {
        // What prints. Square brackets mark an assessment.
        display: '[1903-1907]',
        earliest: 1903,
        latest: 1907,
        basis: [
          'Loveta appears to be between 10 and 14 years old, which would place this photograph between 1903 and 1907.',
        ],
        confidence: 'probable',
      },
      inscriptions: [
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'Mable left & Loveta',
        },
      ],
      depicts: [
        {
          person: 'mckinstry-loveta-swann',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 53.2, y: 38.9, w: 27.6, h: 32.2 },
        },
        {
          person: 'waddle-mable-swann',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 17, y: 24.5, w: 30, h: 36.3 },
        },
      ],
      format: 'snapshot',
      recto: { file: 'swann-loveta-and-mable-recto.jpg' },
      verso: { file: 'swann-loveta-and-mable-verso.jpg' },
      description: 'This is a candid snapshot of Loveta Swann and Mable Swann, who was the daughter of John Milton Swann and Gussie Cody Swann. Both are wearing sombrero-style hats.',
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
      related :[
        {
          slug: 'waddle-arthur-1',
          relation: 'Appears to be from the same session. Photographs are the same, small size.'
        },
        {
          slug: 'waddle-arthur-2',
          relation: 'Appears to be from the same session. Photographs are the same, small size.'
        },
      ]
    },
    {
      slug: 'waddle-arthur-1',
      title: 'Arthur Waddle',
      controlNumber: 'a.1.1.3',
      titleSource: 'supplied',
      place: 'Texas',
      date: {
        // What prints. Square brackets mark an assessment.
        display: '[1901-1905]',
        earliest: 1901,
        latest: 1905,
        basis: [
          'This photograph appears to be from the same session as the photograph that contains Loveta and Mable Swann.',
        ],
        confidence: 'probable',
      },
      inscriptions: [
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'Arthur Waddle',
        },
      ],
      depicts: [
        {
          person: 'waddle-william-arthur',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 28.8, y: 7.3, w: 43.8, h: 56.3 },
        },
      ],
      format: 'snapshot',
      recto: { file: 'waddle-arthur-portrait-recto.jpg' },
      verso: { file: 'waddle-arthur-portrait-verso.jpg' },
      description: 'This is a candid snapshot of Arthur Waddle. This photograph appears to be from the same session as others in this series. Arthur Waddle and Mable Swann later married.',
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
      related :[
        {
          slug: 'swann-loveta-and-mable-swann',
          relation: 'Appears to be from the same session. Photographs are the same, small size.'
        },
        {
          slug: 'waddle-arthur-2',
          relation: 'Appears to be from the same session. Photographs are the same, small size.'
        },
      ],
    },
    {
      slug: 'waddle-arthur-2',
      title: '[Arthur Waddle and unnamed friend]',
      controlNumber: 'a.1.1.4',
      titleSource: 'supplied',
      place: 'Texas',
      date: {
        // What prints. Square brackets mark an assessment.
        display: '[1901-1905]',
        earliest: 1901,
        latest: 1905,
        basis: [
          'This photograph appears to be from the same session as the photograph that contains Loveta and Mable Swann and the photograph of only Arthur Waddle.',
        ],
        confidence: 'probable',
      },
      depicts: [
        {
          person: 'waddle-william-arthur',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 49.7, y: 33.9, w: 34, h: 38.3 },
        },
        {
          as: 'unidentified male',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Not identified on verso.',
        },
      ],
      format: 'snapshot',
      recto: { file: 'waddle-arthur-portrait-2-recto.jpg' },
      verso: { file: 'waddle-arthur-portrait-2-verso.jpg' },
      description: 'This is a candid snapshot of Arthur Waddle and another unidentified male. This photograph appears to be from the same session as others in this series. Arthur Waddle and Mable Swann later married.',
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
      related :[
        {
          slug: 'swann-loveta-and-mable-swann',
          relation: 'Appears to be from the same session. Photographs are the same, small size.'
        },
        {
          slug: 'waddle-arthur-1',
          relation: 'Appears to be from the same session. Photographs are the same, small size.'
        },
      ],
    },
    {
      slug: 'jacobia-flooding',
      title: '[Flooding at Jacobia, Texas]',
      controlNumber: 'a.1.3.4',
      titleSource: 'supplied',
      place: 'Jacobia, Texas',
      date: {
        // What prints. Square brackets mark an assessment.
        display: '[1922-1926]',
        earliest: 1922,
        latest: 1926,
        basis: [
          'There is no solid way to date this photograph. The verso suggests this was before the Austin Swann family moved west to New Mexico in the late 1900s, but the hairstyle of the child suggests 1920s. It may have been taken on a trip that the McKinstrys took to east Texas.',
        ],
        confidence: 'possible',
      },
       inscriptions: [
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'After a flood when we still lived at Jacobia. This picture was teaken in flood waters north of the big pool.',
        },
      ],
      format: 'snapshot',
      recto: { file: 'jacobia-flooding-recto.jpg' },
      verso: { file: 'jacobia-flooding-verso.jpg' },
      depicts: [
        {
          person: 'mckinstry-samuel-small',  // an id in people.ts. Build throws if unknown.
          confidence: 'possible',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'No identification available.',
          region: { face: 'recto', x: 35.9, y: 31.6, w: 4.2, h: 5.7 },
        },
        {
          person: 'mckinstry-loveta-swann',  // an id in people.ts. Build throws if unknown.
          confidence: 'possible',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'No identification available.',
          region: { face: 'recto', x: 55, y: 31.9, w: 3.3, h: 4.1 },
        },
        {
          person: 'allison-sammy-nan-mckinstry',  // an id in people.ts. Build throws if unknown.
          confidence: 'possible',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'No identification available.',
          region: { face: 'recto', x: 43.2, y: 36, w: 3.1, h: 4.4 },
        },
      ],
      description: 'This is a photograph of three people in a boat during a flood at Jacobia. The inscription on the verso does not offer a potential date or potential figures in the boat. The hairstyle matches that of Sammy and Jean McKinstry in the early to mid 1920s, but they never lived at Jacobia. Such hairstyles would not have been on children when the Swanns lived at Jacobia. I believe this is from a later flood. This photograph may depict Sam, Loveta, and Sammy McKinstry.',
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'girdner-c-e-1',
      title: 'C.E. Girdner, 1953',
      controlNumber: 'a.1.4.1',
      titleSource: 'inscribed',
      place: 'Hagerman, New Mexico',
      date: {
        // What prints. Square brackets mark an assessment.
        display: '[1953-1954]',
        earliest: 1953,
        latest: 1954,
        basis: [
          'The verso of this photograph has a statement that indicates it was printed in 1954. The photograph itself shows an older C.E. Girdner. He died in October 1954, so it must be from before that date. A 1953 date is likely.',
        ],
        confidence: 'probable',
      },
       inscriptions: [
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'C.E. Girdner',
        },
      ],
      format: 'snapshot',
      recto: { file: 'girdner-c-e-1-recto.jpg' },
      verso: { file: 'girdner-c-e-1-verso.jpg' },
      views : [
        { file: 'girdner-c-e-1-recto-enhanced.jpg', label: 'Color enhanced version'},
      ],

      depicts: [
        {
          person: 'girdner-charles-edgar',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 17.8, y: 29.4, w: 14, h: 14.9 },
        },
      ],
      description: 'This is a photograph of a seated C.E. Girdner at the home of Sam and Loveta McKinstry. The photograph shows the interior of their home. This was likely taken in 1953.',
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'swann-zirkle-major-1',
      title: 'Minnie, Loveta, Glenn Zirkle, Eva, Mrs. Major',
      controlNumber: 'a.1.4.3',
      titleSource: 'supplied',
      place: 'Dallas, Texas',
      date: {
        // What prints. Square brackets mark an assessment.
        display: '[1940-1945]',
        earliest: 1940,
        latest: 1945,
        basis: [
          'This is an estimated date, since it shows Loveta, Minnie, and Eva later in life. A date past 1945 is possible, but it is impossible to ascertain.',
        ],
        confidence: 'probable',
      },
       inscriptions: [
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'left to right: Minnie, Loveta, Glenn Zirkle, Eva, and Mrs. Major.',
        },
      ],
      format: 'snapshot',
      recto: { file: 'swann-zirkle-major-1-recto.jpg' },
      verso: { file: 'swann-zirkle-major-1-verso.jpg' },
      depicts: [
        {
          person: 'mckinstry-minnie-swann',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 31, y: 27.7, w: 7.3, h: 12.4 },
        },
        {
          person: 'mckinstry-loveta-swann',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 40.2, y: 27, w: 6.3, h: 9.8 },
        },
        {
          person: 'west-eva-swann-powell',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 47.9, y: 27.4, w: 5.6, h: 9.2 },
        },
        {
          as: 'Glenn Zirkle',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 45.7, y: 19.3, w: 3.9, h: 8.3 },
        },
        {
          as: 'Gertrude Major (Mrs. Major)',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 54.4, y: 24.1, w: 5.7, h: 10.7 },
        },
      ],
      description: 'This is a photograph of Minnie McKinstry Swann, Loveta McKinstry Swann, Glenn Zirkle, Eva West, and Mrs. Major. Another photograph from this trip suggests it was taken in Dallas, Texas.',
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'baptism-in-pool',
      title: '[Baptism in pool]',
      controlNumber: 'a.1.4.4',
      titleSource: 'supplied',
      place: 'Jacobia, Texas',
      date: {
        // What prints. Square brackets mark an assessment.
        display: '[1907-1909]',
        earliest: 1907,
        latest: 1909,
        basis: [
          'This is an estimated date. The Swanns moved from Jacobia to New Mexico before 1909. This photograph is not certainly from Jacobia, but it matches the time frame. Certain features of the verso hint at a 1907 to 1909 date range.',
        ],
        confidence: 'probable',
      },
      format: 'snapshot',
      recto: { file: 'baptism-in-pool-recto.jpg' },
      verso: { file: 'baptism-in-pool-verso.jpg' },
      description: 'This photograph depicts a baptism in a pool likely in Jacobia, Texas. There are three main figures in the center of the image and then several people at the top and at the bottom of the picture. No one is identified.',
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'swann-mable-girdner-eula',
      title: '[Mable Swann and Eula Girdner]',
      controlNumber: 'a.1.5.1',
      titleSource: 'supplied',
      place: 'Jacobia, Texas',
      date: {
        // What prints. Square brackets mark an assessment.
        display: '[1909-1911]',
        earliest: 1909,
        latest: 1911,
        basis: [
          'This is an estimated date. Based on the ages of those depicts, the date has been estimated to be between 1909 and 1911',
        ],
        confidence: 'probable',
      },
      depicts: [
        {
          person: 'waddle-mable-swann',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 62.3, y: 15.5, w: 18.4, h: 20.5 },
        },
        {
          person: 'smith-eula-belle-girdner',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 16.3, y: 6, w: 23.6, h: 26.5 },
        },
      ],
      format: 'snapshot',
      recto: { file: 'swann-mable-girner-eula-recto.jpg' },
      verso: { file: 'swann-mable-girner-eula-verso.jpg' },
      description: 'This photograph depicts Mable Swann and Eula Girdner.',
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
      related: [
        {
          slug: 'eula-girdner-loveta-swann-ila-hancock',
          relation:
            'Photographs appear to be taken at the same time.',
        },
      ]
    },
    {
      slug: 'girdner-c-e-2',
      title: 'Uncle Charley about 1930 at Sam McKinstry home',
      controlNumber: 'a.1.5.4',
      titleSource: 'inscribed',
      place: 'Hagerman, New Mexico',
      date: {
        // What prints. Square brackets mark an assessment.
        display: '[1930]',
        basis: [
          'Verso identifies a possible date.',
        ],
        confidence: 'probable',
      },
       inscriptions: [
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'Uncle Charley abt. 1930 at Sam McKinstry home.',
        },
      ],
      format: 'snapshot',
      recto: { file: 'girdner-c-e-2-recto.jpg' },
      verso: { file: 'girdner-c-e-2-verso.jpg' },
      depicts: [
        {
          person: 'girdner-charles-edgar',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 20.6, y: 49.6, w: 12.9, h: 19 },
        },
      ],
      description: 'This is a photograph of a seated C.E. Girdner at the home of Sam and Loveta McKinstry. The photograph shows the interior of their home. This was likely taken around 1930.',
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'swann-loveta-and-mable-swann-2',
      title: '[Loveta Swann and Mable Swann]',
      controlNumber: 'a.1.6.1',
      titleSource: 'supplied',
      place: 'Texas',
      date: {
        // What prints. Square brackets mark an assessment.
        display: '[1910]',
        basis: [
          'Verso identifies 1910 as the date',
        ],
        confidence: 'probable',
      },
      inscriptions: [
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'Mabel and Loveta (Swan)',
        },
      ],
      depicts: [
        {
          person: 'mckinstry-loveta-swann',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 41.7, y: 44.2, w: 27.1, h: 21.3 },
        },
        {
          person: 'waddle-mable-swann',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 27.4, y: 25.7, w: 23.8, h: 20.5 },
        },
      ],
      format: 'mounted photograph',
      recto: { file: 'swann-loveta-and-mable-swann-2-recto.jpg' },
      verso: { file: 'swann-loveta-and-mable-swann-2-verso.jpg' },
      description: 'This is a portrait-style mounted photograph of Loveta and Mable Swann taken around 1910.',
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'swann-zirkle-major-2',
      title: 'Minnie McKinstry, Eva West, Mrs. Major, Eva Major, Loveta McKinstry',
      controlNumber: 'a.1.6.3',
      titleSource: 'supplied',
      place: 'Dallas, Texas',
      date: {
        // What prints. Square brackets mark an assessment.
        display: '[1940-1945]',
        earliest: 1940,
        latest: 1945,
        basis: [
          'This is an estimated date, since it shows Loveta, Minnie, and Eva later in life. A date past 1945 is possible, but it is impossible to ascertain.',
        ],
        confidence: 'probable',
      },
       inscriptions: [
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'Minnie, Eva, Major, Eva + Loveta. Taken in Dallas at Eva + Glenn Zirkle home.',
        },
      ],
      format: 'snapshot',
      recto: { file: 'swann-zirkle-major-2-recto.jpg' },
      verso: { file: 'swann-zirkle-major-2-verso.jpg' },
      depicts: [
        {
          person: 'mckinstry-minnie-swann',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 28.3, y: 17.1, w: 9.6, h: 13.7 },
        },
        {
          person: 'mckinstry-loveta-swann',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 61.9, y: 18, w: 8.7, h: 15 },
        },
        {
          person: 'west-eva-swann-powell',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 35.9, y: 20.5, w: 8.7, h: 11.5 },
        },
        {
          as: 'Eva Major Zirkle',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 51.2, y: 18, w: 9.6, h: 14 },
        },
        {
          as: 'Gertrude Major (Mrs. Major)',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 45.4, y: 21.8, w: 8, h: 10.9 },
        },
      ],
      description: 'This is a photograph of Minnie McKinstry Swann, Loveta McKinstry Swann, Eva Major Zirkle, Eva West, and Mrs. Major. This photo was taken at the home of Eva and Glenn Zirkle.',
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'two-unknown-women',
      title: '[Unknown women in stream]',
      controlNumber: 'a.1.7.1',
      titleSource: 'supplied',
      place: 'Not identified',
      date: {
        // What prints. Square brackets mark an assessment.
        display: '[1920-1925]',
        earliest: 1920,
        latest: 1925,
        basis: [
          'There is no date on this photograph. Minnie Swann McKinstry may be the woman on the right, but that is not certain. An early 1920s date is possible.',
        ],
        confidence: 'possible',
      },
      format: 'snapshot',
      recto: { file: 'two-unknown-women-recto.jpg' },
      verso: { file: 'two-unknown-women-verso.jpg' },
      description: 'This photograph depicts two women standing in a stream. The woman on the right may be Minnie Swann McKinstry, but the photo is too blurry to definitively know.',
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'west-eva-swann-portrait',
      title: 'Eva Swann West',
      controlNumber: 'a.1.7.4',
      titleSource: 'inscribed',
      place: 'Jacobia, Texas',
      date: {
        // What prints. Square brackets mark an assessment.
        display: '[1900-1904]',
        earliest: 1900,
        latest: 1904,
        basis: [
          'Eva Swann appears to be between 14 and 18 in this portrait. This would date the photograph between 1900 and 1904.',
        ],
        confidence: 'probable',
      },
      format: 'mounted photograph',
      recto: { file: 'west-eva-swann-portrait-recto.jpg' },
      verso: { file: 'west-eva-swann-portrait-verso.jpg' },
      depicts: [
        {
          person: 'west-eva-swann-powell',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 36.1, y: 25.4, w: 30.4, h: 26.7 },
        },
      ],
      inscriptions : [
        { location: 'verso',
          medium: 'ink',
          text: 'Eva Swann West',
        }
      ],
      description: 'This photograph depicts Eva Swann between the ages of 14 and 18, which would place this photograph between 1900 and 1904 while the family still resided in Jacobia, Texas.',
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'swann-minnie-eva-loveta-annie-miller',
      title: '[Minnie, Eva, and Loveta Swann and Annie Miller]',
      controlNumber: 'a.1.8.1',
      titleSource: 'supplied',
      place: 'Jacobia, Texas',
      date: {
        // What prints. Square brackets mark an assessment.
        display: '[1910]',
        basis: [
          'Text on the verso suggests a date of about 1910. This seems likely.',
        ],
        confidence: 'probable',
      },
      format: 'real photo postcard',
      recto: { file: 'swann-minnie-eva-loveta-annie-miller-recto.jpg' },
      verso: { file: 'swann-minnie-eva-loveta-annie-miller-verso.jpg' },
      depicts: [
        {
          person: 'west-eva-swann-powell',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 61.7, y: 22.5, w: 11.8, h: 22.1 },
        },
        {
          person: 'mckinstry-minnie-swann',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 36.6, y: 22.8, w: 12.2, h: 20.4 },
        },
        {
          person: 'mckinstry-loveta-swann',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 74.8, y: 26.2, w: 11.1, h: 19.4 },
        },
        {
          as: 'Annie Miller',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 49.7, y: 23.9, w: 12.9, h: 21.5 },
        },
      ],
      inscriptions : [
        { location: 'verso',
          medium: 'ink',
          text: 'Loveta Swann, Eva ", Minnie ", Annie Miller (cousin)',
        }
      ],
      description: 'This photograph depicts sisters Minnie, Eva, and Loveta Swann and a cousin Annie Miller. A date on the verso suggests this photograph was taken about 1910. Nothing disputes that.',
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'jacobia-picnic-1901',
      title: 'Picnic in 1901 at Jacobia',
      controlNumber: 'a.1.8.3',
      titleSource: 'inscribed',
      place: 'Jacobia, Texas',
      date: {
        // What prints. Square brackets mark an assessment.
        display: '1901',
        basis: [
          'Text on verso identifies date.',
        ],
        confidence: 'certain',
      },
      format: 'snapshot',
      recto: { file: 'jacobia-picnic-1901-recto.jpg' },
      verso: { file: 'jacobia-picnic-1901-verso.jpg' },
      inscriptions : [
        { location: 'verso',
          medium: 'ink',
          text: 'Picnic in 1901 at Jacobia',
        }
      ],
      description: 'This photograph depicts a picnic in Jacobia in 1901. Individuals cannot be identified from the picture.',
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'eula-girdner-loveta-swann-ila-hancock',
      title: '[Eula Girdner, Loveta Swann, Ila Hancock]',
      controlNumber: 'a.1.9.1',
      titleSource: 'supplied',
      place: 'Jacobia, Texas',
      date: {
        // What prints. Square brackets mark an assessment.
        display: '[1909-1911]',
        earliest: 1909,
        latest: 1911,
        basis: [
          'This is an estimated date. Based on the ages of those depicts, the date has been estimated to be between 1909 and 1911.',
        ],
        confidence: 'probable',
      },
      format: 'snapshot',
      recto: { file: 'eula-girdner-loveta-swann-ila-hancock-recto.jpg' },
      verso: { file: 'eula-girdner-loveta-swann-ila-hancock-verso.jpg' },
      inscriptions : [
        { location: 'verso',
          medium: 'ink',
          text: 'Top row left to right: Eula Girdner, Loveta Swann, Eula Girdner, Ila Hancock.',
        }
      ],
      description: 'This photograph depicts Eula Girdner, Loveta Swann, and Ila Hancock between the dates of 1909 and 1911.',
      depicts: [
        {
          person: 'mckinstry-loveta-swann',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 30.6, y: 17.9, w: 16.2, h: 18.1 },
        },
        {
          person: 'smith-eula-belle-girdner',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 12.8, y: 18.6, w: 16.9, h: 17.7 },
        },
        {
          as: 'Ila Hancock',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 15.2, y: 67.1, w: 12.7, h: 18.8 },
        },
      ],
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
      related: [
        {
          slug: 'swann-mable-girdner-eula',
          relation:
            'Photographs appear to be taken at the same time.',
        },
      ],
    },
    {
      slug: 'swann-loveta-baccalaureate',
      title: 'Loveta\'s baccalaureate dress and hat',
      controlNumber: 'a.1.9.2',
      titleSource: 'inscribed',
      place: 'Hagerman, New Mexico',
      date: {
        // What prints. Square brackets mark an assessment.
        display: '1910',
        basis: [
          'The date is inscribed on the verso',
        ],
        confidence: 'certain',
      },
      format: 'real photo postcard',
      recto: { file: 'swann-loveta-baccalaureate-dress-recto.jpg' },
      verso: { file: 'swann-loveta-baccalaureate-dress-verso.jpg' },
      inscriptions : [
        { location: 'verso',
          medium: 'ink',
          text: 'Loveta\'s baccalaureate dress + hat. 17 yrs old. 1910',
        }
      ],
      description: 'This photograph depicts Loveta Swann in her baccalaureate dress and hat in 1910. The family had moved to New Mexico by this date, so it was likely taken in New Mexico.',
      depicts: [
        {
          person: 'mckinstry-loveta-swann',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 44.1, y: 6.2, w: 12.2, h: 12.4 },
        },
      ],
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'girdner-c-e-child',
      title: '[C.E. Girdner as a child]',
      titleSource: 'supplied',
      place: 'Hunt County, Texas',
      date: {
        // What prints. Square brackets mark an assessment.
        display: '1883-1887',
        basis: [
          'C.E. Girdner is estimated to be between 8 and 12 in this photograph, which would place it between 1883 and 1887.',
        ],
        confidence: 'probable',
      },
      format: 'tintype',
      recto: { file: 'girdner-c-e-young-recto.jpg' },
      description: 'This is a photograph of a young C.E. Girdner. His age is estimated to be between 8 and 12 years old. This tintype is in a dual folding frame with a photograph of a young Nannie Swann, whom he would later marry.',
      depicts: [
        {
          person: 'girdner-charles-edgar',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Matches likeness in other photographs.',
          region: { face: 'recto', x: 33.7, y: 25.1, w: 17.8, h: 13.7 },
        },
      ],
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'girdner-nannie-swann-young',
      title: '[Nannie Swann]',
      titleSource: 'supplied',
      place: 'Hunt County, Texas',
      date: {
        // What prints. Square brackets mark an assessment.
        display: '1885-1888',
        basis: [
          'Nannie Swann is estimated to be between 7 and 10 years old here. That would date this photograph to between 1885 and 1888.',
        ],
        confidence: 'probable',
      },
      format: 'tintype',
      recto: { file: 'girdner-nannie-swann-young.jpg' },
      description: 'This is a photograph of a young Nannie Swann. Her age is estimated to be between 7 and 10 years old. This tintype is in a dual folding frame with a photograph of a young C.E. Girdner, whom she would later marry.',
      depicts: [
        {
          person: 'girdner-nannie-atkinson-swann',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Matches likeness in other photographs.',
          region: { face: 'recto', x: 33, y: 11.9, w: 20.9, h: 16 },
        },
      ],
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'unknown-group',
      title: '[Unknown group of four]',
      controlNumber: 'a.1.9.3',
      titleSource: 'supplied',
      place: 'Not identified',
      date: {
        // What prints. Square brackets mark an assessment.
        display: '[1914-1920]',
        earliest: 1914,
        latest: 1920,
        basis: [
          'Clothing styles seem to suggest a timeframe of 1914 to 1920. No identifiable people are in this photo to compare.',
        ],
        confidence: 'possible',
      },
      format: 'snapshot',
      recto: { file: 'unknown-group-recto.jpg' },
      verso: { file: 'unknown-group-verso.jpg' },
      description: 'This photograph depicts two women and two men playing croquet in a mountain environment. This photograph may be related to another one taken in similar settings.',
      related :[
        {
          slug: 'two-unknown-women',
          relation: ''
        },
      ],
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'swann-minnie-young',
      title: '[Minnie Swann as a child]',
      controlNumber: 'a.1.9.4',
      titleSource: 'inscribed',
      place: 'Hunt County, Texas',
      date: {
        // What prints. Square brackets mark an assessment.
        display: '[1897-1900]',
        earliest: 1897,
        latest: 1900,
        basis: [
          'Minnie Swann appears to be between the ages of 7 and 10, which would place this photograph between the dates of 1897 and 1900.',
        ],
        confidence: 'probable',
      },
      format: 'mounted photograph',
      recto: { file: 'swann-minnie-young-recto.jpg' },
      verso: { file: 'swann-minnie-young-verso.jpg' },
      description: 'This photograph depicts Minnie Swann as a child. She appears to be between the ages of 7 and 10, which would likely place this photograph between the dates of 1897 and 1900. The family still lived in Jacobia at this time.',
      depicts: [
        {
          person: 'mckinstry-minnie-swann',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Minnie Swann is identified on the verso.',
          region: { face: 'recto', x: 37.9, y: 28, w: 28.9, h: 27 },
        },
      ],
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'girdner-nannie-swann-greenville-centennial',
      title: 'Nannie Girdner at Greenville Centennial',
      controlNumber: 'a.1.10.2',
      titleSource: 'inscribed',
      place: 'Greenville, Hunt County, Texas',
      date: {
        // What prints. Square brackets mark an assessment.
        display: '1950',
        basis: [
          'The city of Greenville, Texas celebrated its centennial in May of 1950. This photograph must have been taken then.',
        ],
        confidence: 'certain',
      },
      format: 'snapshot',
      recto: { file: 'girdner-nannie-swann-greenville-centennial-recto.jpg' },
      verso: { file: 'girdner-nannie-swann-greenville-centennial-verso.jpg' },
      description: 'This photograph shows Nannie Swann Girdner at the centennial celebration in Greenville, Texas in 1950.',
      depicts: [
        {
          person: 'girdner-nannie-atkinson-swann',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Nannie Girdner is identified on the verso.',
          region: { face: 'recto', x: 47, y: 23, w: 11.8, h: 10.1 },
        },
      ],
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'girls-in-wagon',
      title: '[Group of six girls in a wagon]',
      controlNumber: 'a.1.10.3',
      titleSource: 'supplied',
      place: 'Hagerman, New Mexico',
      date: {
        // What prints. Square brackets mark an assessment.
        display: '1909',
        basis: [
          'The verso of this photograph identifies a 1909 date.',
        ],
        confidence: 'certain',
      },
      format: 'snapshot',
      recto: { file: 'girls-in-wagon-recto.jpg' },
      verso: { file: 'girls-in-wagon-verso.jpg' },
      description: 'This photograph depicts six girls on top of hay in a wagon. The verso of this photograph identifies some one as "me," but it is unclear if this would be Loveta Swann or Mable Swann. Mable\'s name is at the top, but other information suggests this may be Loveta. The verso inscription also says "Tere are only a few of the N.M. toughs." By this time the Austin Swann family had moved to New Mexico, so I believe this photograph was taken there, making it more likely that this photograph depicts Loveta.',
      depicts: [
        {
          person: 'mckinstry-loveta-swann',  // an id in people.ts. Build throws if unknown.
          confidence: 'probable',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Someone is identified as "me" on the verso. I believe it to be Loveta Swann.',
          region: { face: 'recto', x: 42.2, y: 13.8, w: 5.4, h: 8.3 },
        },
        {
          as: '"Evilee"',  // an id in people.ts. Build throws if unknown.
          confidence: 'probable',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Someone is identified as "me" on the verso. I believe it to be Loveta Swann.',
          region: { face: 'recto', x: 47.7, y: 15.4, w: 3.5, h: 6 },
        },
        {
          as: 'Bernice',  // an id in people.ts. Build throws if unknown.
          confidence: 'probable',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Someone is identified as "me" on the verso. I believe it to be Loveta Swann.',
          region: { face: 'recto', x: 52, y: 15.8, w: 3.4, h: 6 },
        },
        {
          as: 'Edith',  // an id in people.ts. Build throws if unknown.
          confidence: 'probable',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Someone is identified as "me" on the verso. I believe it to be Loveta Swann.',
          region: { face: 'recto', x: 56.7, y: 14.9, w: 2.8, h: 4.8 },
        },
        {
          as: '"Mince"',  // an id in people.ts. Build throws if unknown.
          confidence: 'probable',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Someone is identified as "me" on the verso. I believe it to be Loveta Swann.',
          region: { face: 'recto', x: 61.3, y: 15.1, w: 2.2, h: 4.2 },
        },
        {
          as: 'Ada W."',  // an id in people.ts. Build throws if unknown.
          confidence: 'probable',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Someone is identified as "me" on the verso. I believe it to be Loveta Swann.',
          region: { face: 'recto', x: 61.3, y: 15.1, w: 2.2, h: 4.2 },
        },
      ],
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'swann-austin-in-field',
      title: '[Austin Swann in field]',
      controlNumber: 'a.1.10.4',
      titleSource: 'supplied',
      place: 'Hagerman, New Mexico',
      date: {
        // What prints. Square brackets mark an assessment.
        display: '1910-1920',
        earliest: 1910,
        latest: 1920,
        basis: [
          'This photograph depicts Austin Swann later in life. It is estimated he is between 50 and 60 years old, which would place this photograph between 1910 and 1920.',
        ],
        confidence: 'certain',
      },
      format: 'real photo postcard',
      recto: { file: 'swann-austin-in-field-recto.jpg' },
      verso: { file: 'swann-austin-in-field-recto.jpg' },
      description: 'This photograph depicts Austin Swann standing in the middle of a sorghum field. He appears to be 50 or 60 years old in this image, which would place it between 1910 and 1920 after the Swanns moved to New Mexico.',
      depicts: [
        {
          person: 'swann-austin',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Austin Swann is identified on the verso.',
          region: { face: 'recto', x: 24.1, y: 37.2, w: 7.6, h: 5.4 },
        },
      ],
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'swann-zirkle-2',
      title: '[Minnie Swann McKinstry, Loveta Swann McKinstry, Glenn Zirkle, Eva Swann West]',
      controlNumber: 'a.1.12.3',
      titleSource: 'supplied',
      place: 'Dallas, Texas',
      date: {
        // What prints. Square brackets mark an assessment.
        display: '[1940-1945]',
        earliest: 1940,
        latest: 1945,
        basis: [
          'This is an estimated date, since it shows Loveta, Minnie, and Eva later in life. A date past 1945 is possible, but it is impossible to ascertain.',
        ],
        confidence: 'probable',
      },
       inscriptions: [
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'left to right: \n Minnie, Loveta \n Glenn Zirkle \n Eva. \n\n 1930.',
        },
      ],
      format: 'snapshot',
      recto: { file: 'swann-zirkle-2-recto.jpg' },
      verso: { file: 'swann-zirkle-2-verso.jpg' },
      depicts: [
        {
          person: 'mckinstry-minnie-swann',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 28.8, y: 20.3, w: 6.7, h: 11 },
        },
        {
          person: 'mckinstry-loveta-swann',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 36.4, y: 19.8, w: 6.6, h: 12.8 },
        },
        {
          person: 'west-eva-swann-powell',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 54.6, y: 19.4, w: 7.1, h: 11.2 },
        },
        {
          as: 'Glenn Zirkle',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Identified on verso.',
          region: { face: 'recto', x: 45.7, y: 14.2, w: 5.9, h: 10.3 },
        },
      ],
      description: 'This is a photograph of Minnie McKinstry Swann, Loveta McKinstry Swann, Glenn Zirkle, Eva West, and Mrs. Major. Another photograph from this trip suggests it was taken in Dallas, Texas.',
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'concord-church-1968',
      title: '[Concord Church at Jacobia, 1928]',
      controlNumber: 'a.1.25.1',
      titleSource: 'supplied',
      place: 'Jacobia, Texas',
      date: {
        // What prints. Square brackets mark an assessment.
        display: '[1968]',
        basis: [
          'There is no definitive date associated with this photograph. A date of 1968 is attached since the verso suggests this picture was taken just before the structure was torn down.',
        ],
        confidence: 'probable',
      },
       inscriptions: [
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'Concord Church \n just before it \n was torned down \n in 1968.',
        },
      ],
      format: 'snapshot',
      recto: { file: 'concord-church-1968-recto.jpg' },
      verso: { file: 'concord-church-1968-verso.jpg' },
      description: 'This photograph depicts the Concord Church at Jacobia just before it was torn down in 1968. ',
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'swann-austin-jim-mckinstry-edmund-mckinstry',
      title: '[Austin Swann with Jim McKinstry and Edmund McKinstry]',
      controlNumber: 'a.1.28.2',
      titleSource: 'supplied',
      place: 'Hagerman, New Mexico',
      date: {
        display: '[1920-1925]',
        earliest: 1920,
        latest: 1925,
        basis: [
          'There is no way to assign a specific date to this photograph. A date of 1920 to 1925 is presumed based on Austin Swann\'s age.',
        ],
        confidence: 'certain',
      },
      format: 'snapshot',
      recto: { file: 'swann-austin-jim-mckinstry-edmund-mckinstry-recto.jpg' },
      verso: { file: 'swann-austin-jim-mckinstry-edmund-mckinstry-verso.jpg' },
      description: 'This photograph depicts Austin Swann sitting on a porch. Jim McKinstry is left and Edmund McKinstry is in the back.',
      inscriptions: [
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'Papa Swann sitting \n down, Jim left \n and Edmon McK.',
        },
      ],
      depicts: [
        {
          person: 'swann-austin',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          basis: 'Austin Swann is identified on the verso.',
          region: { face: 'recto', x: 50.5, y: 42.7, w: 8, h: 14.3 },
        },
        {
          person: 'mckinstry-james-daubin',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          basis: 'Austin Swann is identified on the verso.',
          region: { face: 'recto', x: 18.5, y: 10, w: 24.1, h: 79.8 },
        },
        {
          as: 'Edmund McKinstry',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          basis: 'Edmund McKinstry is the son of Thomas and Camille McKinstry.',
          region: { face: 'recto', x: 52.3, y: 26.3, w: 7, h: 9.6 },
        },
      ],
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'girdner-charlie-next-to-barn',
      title: '[Charlie Girdner with horses and car next to a barn]',
      controlNumber: 'b.1.1.2',
      titleSource: 'supplied',
      place: 'Jacobia, Texas',
      date: {
        display: '[1911]',
        basis: [
          'A date of 1911 is on the inscription on the recto. Nothing objects to this date.',
        ],
        confidence: 'certain',
      },
      format: 'real photo postcard',
      recto: { file: 'girdner-charlie-next-to-barn-recto.jpg' },
      verso: { file: 'girdner-charlie-next-to-barn-verso.jpg' },
      description: 'This photograph depicts Charlie Girdner standing in front of a barn. A car is to the left. Three horses are also visible. There is another figure behind a horse. The verso identifies them as "Jute (Doc) Girdner.',
      inscriptions: [
        {
          location: 'recto',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'Charlie Girdner \n in front of barn \n with first car \n about 1911.',
        },
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'Shetland pony \n who was bought by Mack Swann \n in Indian Territory. \n Cousin Jule (Doc) Girdner \n with his Shetland "Madge."',
        },
      ],
      depicts: [
        {
          person: 'girdner-charles-edgar',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          basis: 'Identified on photogoraph',
          region: { face: 'recto', x: 52.6, y: 31.5, w: 2.2, h: 1.5 },
        },
        {
          as: 'Jute Girdner',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          basis: 'Identified on photogoraph',
          region: { face: 'recto', x: 73.3, y: 32.3, w: 4.4, h: 9.2 },
        },
      ],
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'picnic-crowd-at-jacobia',
      title: 'Picnic crowd at Jacobia',
      controlNumber: 'b.1.2.2',
      titleSource: 'inscribed',
      place: 'Jacobia, Texas',
      date: {
        display: '[1904-1908]',
        basis: [
          'There is no date associated with this photograph, but the real photo postcard details on the back suggest a date between 1904 and 1908.',
        ],
        confidence: 'probable',
      },
      format: 'real photo postcard',
      recto: { file: 'picnic-crowd-at-jacobia-recto.jpg' },
      verso: { file: 'picnic-crowd-at-jacobia-verso.jpg' },
      description: 'This photograph depicts a picnic crowd at Jacobia, Texas. It is likely several members of the Swann family are present here, but none are personally identifiable.',
      inscriptions: [
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'Picnic crowd at \n Jacobia, Texas.',
        },
      ],
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'swann-austin-first-house-hagerman',
      title: '[First home of Austin Swann in Hagerman, New Mexico]',
      controlNumber: 'b.1.3.1',
      titleSource: 'supplied',
      place: 'Hagerman, New Mexico',
      date: {
        display: '[1908]',
        basis: [
          'A date of December 8th, 1908 is on the verso. Nothing objects to this date.',
        ],
        confidence: 'certain',
      },
      format: 'snapshot',
      recto: { file: 'swann-austin-first-house-hagerman-recto.jpg' },
      verso: { file: 'swann-austin-first-house-hagerman-verso.jpg' },
      description: 'This photograph depicts the first house of Austin Swann and his three girls as it looked in 1908 when they came to Hagerman. There are two women on the front porch of this house, but the resolution of the photograph prevents certain identification.',
      inscriptions: [
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'Dec. 8, 1908 \n  The first house \n Austin Swann and \n daughters (Eva, Minnie, \n and Loveta) lived in \n when they came \n to Hagerman, N.M.',
        },
      ],
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'girdner-c-e-3',
      title: 'C.E. Girdner, 1911',
      controlNumber: 'b.1.3.2',
      titleSource: 'inscribed',
      place: 'Jacobia, Texas',
      date: {
        display: '[1911]',
        basis: [
          'A date of 1911 is on the inscription on the recto. Nothing objects to this date.',
        ],
        confidence: 'certain',
      },
      format: 'real photo postcard',
      recto: { file: 'girdner-c-e-3-recto.jpg' },
      verso: { file: 'girdner-c-e-3-verso.jpg' },
      description: 'This photograph depicts C.E. Girdner on a horse next to a barn in 1911.',
      inscriptions: [
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'C.E. Girdner \n 1911.',
        },
      ],
      depicts: [
        {
          person: 'girdner-charles-edgar',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          basis: 'Identified on photogoraph',
          region: { face: 'recto', x: 44.5, y: 20.7, w: 8.7, h: 7.6 },
        },
      ],
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'swann-loveta-and-friend',
      title: 'Loveta and a friend',
      controlNumber: 'b.1.4.2',
      titleSource: 'inscribed',
      place: 'Jacobia, Texas',
      date: {
        display: '[1906-1908]',
        basis: [
          'There is no date on this photograph, but a date of 1906 to 1908 is probable. This photograph appears to be from before the Swanns moved to Hagerman, New Mexico.',
        ],
        confidence: 'certain',
      },
      format: 'mounted photograph',
      recto: { file: 'swann-loveta-and-friend-recto.jpg' },
      verso: { file: 'swann-loveta-and-friend-verso.jpg' },
      description: 'This photograph depicts C.E. Girdner on a horse next to a barn in 1911.',
      inscriptions: [
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'Loveta and a friend.',
        },
      ],
      depicts: [
        {
          person: 'mckinstry-loveta-swann',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          basis: 'Identified on photogoraph',
          region: { face: 'recto', x: 50.7, y: 43.4, w: 8.6, h: 7.3 },
        },
      ],
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'swann-all-three-girls',
      title: 'All three girls',
      controlNumber: 'b.1.5.1',
      titleSource: 'inscribed',
      place: 'Hagerman, New Mexico',
      date: {
        display: '[1909-1911]',
        basis: [
          'There is no date on this photograph, but it was taken at the Hagerman, New Mexico home of Austin Swann, which places this photograph after 1908.',
        ],
        confidence: 'probable',
      },
      format: 'snapshot',
      recto: { file: 'swann-all-three-girls-recto.jpg' },
      verso: { file: 'swann-all-three-girls-verso.jpg' },
      description: 'This photograph depicts Eva Swann, Minnie Swann, and Loveta Swann on the porch of their Hagerman, New Mexico home. No specific identifications are possible.',
      inscriptions: [
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'All 3 girls.',
        },
      ],
      depicts: [
        {
          person: 'mckinstry-loveta-swann',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          basis: 'Identified on photogoraph',
          region: { face: 'recto', x: 59.7, y: 34, w: 3.9, h: 6.8 },
        },
        {
          person: 'mckinstry-minnie-swann',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          basis: 'Identified on photogoraph',
          region: { face: 'recto', x: 71.1, y: 22, w: 4.1, h: 9.2 },
        },
        {
          person: 'west-eva-swann-powell',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          basis: 'Identified on photogoraph',
          region: { face: 'recto', x: 55.1, y: 21, w: 4.4, h: 8.1 },
        },
      ],
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'papa-swanns-funeral',
      title: 'Papa Swann\'s funeral',
      controlNumber: 'b.1.5.2',
      titleSource: 'inscribed',
      place: 'Jacobia, Texas',
      date: {
        display: '1931',
        basis: [
          'Austin Swann died in 1931, so a 1931 date is certain.',
        ],
        confidence: 'certain',
      },
      format: 'snapshot',
      recto: { file: 'papa-swanns-funeral-recto.jpg' },
      verso: { file: 'papa-swanns-funeral-verso.jpg' },
      description: 'This photograph depicts the grave of Austin Swann at the cemetery in Jacobia, Texas. ',
      inscriptions: [
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'Papa Swann\'s funeral.',
        },
      ],
      depicts: [
        {
          person: 'swann-austin',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          basis: 'Identified on photogoraph',
          region: { face: 'recto', x: 13.4, y: 21.3, w: 18.7, h: 37.1 },
        },
      ],
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'swann-minnie-loveta-in-boat',
      title: '[Minnie and Loveta Swann in a boat]',
      controlNumber: 'b.1.6.1',
      titleSource: 'supplied',
      place: 'New Mexico',
      date: {
        display: '[1909-1911]',
        basis: [
          'There is no date on this photograph. It appears Minnie and Loveta are rowing a boat on a lake where the surround terrain is treeless, suggesting it was taken in New Mexico rather than East Texas. A date after 1908 is probable.',
        ],
        confidence: 'probable',
      },
      format: 'snapshot',
      recto: { file: 'swann-minnie-loveta-in-boat-recto.jpg' },
      verso: { file: 'swann-minnie-loveta-in-boat-verso.jpg' },
      description: 'This photograph depicts Minnie and Loveta Swann rowing a boat on a lake in New Mexico.',
      inscriptions: [
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'Loveta left \n and Minnie.',
        },
      ],
      depicts: [
        {
          person: 'mckinstry-loveta-swann',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          basis: 'Identified on photogoraph',
          region: { face: 'recto', x: 25.4, y: 37.1, w: 3.6, h: 2.7 },
        },
        {
          person: 'mckinstry-minnie-swann',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          basis: 'Identified on photogoraph',
          region: { face: 'recto', x: 41.2, y: 36.7, w: 4, h: 2.7 },
        },
      ],
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'swann-austin-eva-car',
      title: '[Austin Swann in a car with Eva Swann and others next to the car]',
      controlNumber: 'b.1.6.2',
      titleSource: 'supplied',
      place: 'Hagerman, New Mexico',
      date: {
        display: '[1917-1920]',
        basis: [
          'There is no date on this photograph. Based on the car model and ages of those known in the photograph, a 1917 to 1920 date is probable.',
        ],
        confidence: 'probable',
      },
      format: 'snapshot',
      recto: { file: 'swann-austin-eva-car-recto.jpg' },
      verso: { file: 'swann-austin-eva-car-verso.jpg' },
      description: 'This photograph depicts Austin Swann sitting in a car, Eva Swann standing in the gate, a Mr. Will Lane next to the gate, and Mr. Fay Irwin standing in front of the car.',
      inscriptions: [
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'Eva or Minnie \n Mr. Will Lane in gate \n Pap Swann in car \n Mr. Fay Irwin right.',
        },
      ],
      depicts: [
        {
          person: 'swann-austin',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          basis: 'Identified on photogoraph',
          region: { face: 'recto', x: 62.1, y: 36.2, w: 3.1, h: 5 },
        },
        {
          person: 'west-eva-swann-powell',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          basis: 'Identified on photogoraph',
          region: { face: 'recto', x: 32.2, y: 36.6, w: 2.7, h: 5.5 },
        },
        {
          as: 'Will Lane',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          basis: 'Identified on photogoraph',
          region: { face: 'recto', x: 42.8, y: 38.4, w: 3.2, h: 5.2 },
        },
        {
          as: 'Fay Irwin',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          basis: 'Identified on photogoraph',
          region: { face: 'recto', x: 71, y: 36.2, w: 3.9, h: 6.3 },
        },
      ],
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'swann-loveta-in-field',
      title: '[Loveta Swann in a field near Tyler, Texas]',
      controlNumber: 'b.1.7.2',
      titleSource: 'supplied',
      place: 'Tyler, Texas',
      date: {
        display: '[1915-1920]',
        basis: [
          'There is no date on this photograph, but Loveta appears to be in her early or mid 20s here.',
        ],
        confidence: 'probable',
      },
      photographer: {
        name: 'Bud Thomas',
        confidence: 'certain',
        basis: 'Identified as photographer on verso.',
      },
      format: 'snapshot',
      recto: { file: 'swann-loveta-in-field-recto.jpg' },
      verso: { file: 'swann-loveta-in-field-verso.jpg' },
      description: 'This photograph depicts Loveta Swann McKinstry standing in a rose field near Tyler, Texas. Her uncle Norphlet "Bud" Thomas took this photograph.',
      inscriptions: [
        {
          location: 'verso',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'Uncle Bud Thomas \n took this picture of me in a \n rose field near Tyler, Texas.',
        },
      ],
      depicts: [
        {
          person: 'mckinstry-loveta-swann',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          basis: 'Identified on photogoraph',
          region: { face: 'recto', x: 36.5, y: 37, w: 2.7, h: 5.7 },
        },
      ],
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
    {
      slug: 'swann-eva-portrait',
      title: '[Eva Swann about the time she married Elza Powell]',
      controlNumber: 'b.1.9.1',
      titleSource: 'supplied',
      place: 'Hagerman, New Mexico',
      date: {
        display: '[1920]',
        basis: [
          'The date of 1920 is supplied with this photograph. Nothing objects to it.',
        ],
        confidence: 'probable',
      },
      format: 'mounted photograph',
      recto: { file: 'swann-eva-portrait-recto.jpg' },
      verso: { file: 'swann-eva-portrait-verso.jpg' },
      description: 'This photograph depicts Eva Swann around the time she married her first husband, Elza Powell.',
      inscriptions: [
        {
          location: 'sleeve',   // 'recto' | 'verso' | 'mount' | 'sleeve'
          medium: 'ink',       // 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other'
          // Transcribe AS WRITTEN, spelling included. \n for line breaks.
          text: 'Eva Swann \n about the time she \n married Elza Powell \n 1920.',
        },
      ],
      depicts: [
        {
          person: 'west-eva-swann-powell',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          basis: 'Identified on photogoraph',
          region: { face: 'recto', x: 39.6, y: 27.5, w: 32.5, h: 27 },
        },
      ],
      rights: {
        status: 'public-domain',
        note: 'Photographer unidentified; unpublished.',
      },
    },
  ],
};
