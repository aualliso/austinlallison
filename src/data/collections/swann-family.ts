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
      title: 'The Old Malcom Swann Gin - at the home place',
      titleSource: 'inscribed',
      series: '',
      format: 'mounted photograph',
      photographer: {
        name: 'Unknown',
        confidence: 'unidentified',
        basis: 'No studio imprint.',
      },
      date: {
        display: '[after 1885]',
        earliest: 1885,
        latest: 1900,
        basis: [
          'The verso reads "Built ab[out] 1885" - which dates THE GIN, not the photograph. The photograph can only be later.',
          'The gin is described as "old" by the person who wrote the caption, but that inscription is undated and may be much later than the exposure.',
          'Malcom Swann and Austin Swann are visible in this photograph. Austin Swann got married around 1886, but he looks older here than in his wedding picture.'
        ],
        confidence: 'possible',
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
        },
        {
          person: 'swann-austin',
          confidence: 'certain',
          basis:
            'A figure matching Austin Swann sits two spots to the right of Malcom.',
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
        },
        {
          person: 'swann-nannie-thomas',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
          position: 'Standing on right.',
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
        },
        {
          person: 'adair-fletcher-absalom',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
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
        },
        { 
          as: 'Mae McCoy',
          confidence: 'certain',
          basis: 'No authority record yet. May be the only photo of her.'
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
        },
        {
          person: 'swann-nancy-atkinson',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
        },
        {
          person: 'swann-austin',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
        },
        {
          person: 'girdner-lizzie-swann',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
        },
        {
          person: 'swann-john-milton',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
        },
        {
          person: 'bouknight-phebe-swann',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso.',
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
        },
        {
          person: 'swann-annie',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on note.',
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
        },
        {
          person: 'mckinstry-minnie-swann',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso. She is the girl on the right with the \'x\'',
        },
        {
          person: 'mckinstry-loveta-swann',  // an id in people.ts. Build throws if unknown.
          confidence: 'certain',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Named on verso She is the girl on the left with the \'x\'.',
        },
        {
          person: 'swann-nancy-atkinson',  // an id in people.ts. Build throws if unknown.
          confidence: 'probable',  // REQUIRED on every depiction
          // Omit to inherit identificationBasis. If neither exists, the
          // build throws - a name with no grounds is the one thing this
          // schema will not store.
          basis: 'Nancy C. Atkinson Swann may be the woman in the bottom left frame with an unknown boy.',
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
        },
        {
          as: 'Fannie Bledsoe Atkinson',
          confidence: 'possible',
          basis: 'Seated woman. This possibly would be the second wife of David Atkinson, Nancy Atkinson Swann\'s father.',
        },
        {
          as: 'Artemissia Atkinson',
          confidence: 'possible',
          basis: 'Artemissia is one of the siblings of Nancy Atkinson Swann. The identify of this woman cannot be ascertained, but it is a possibility.',
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
  ],
};
