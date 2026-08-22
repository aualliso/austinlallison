// src/data/register-features.ts
//
// The rotating contents of the Register's Photography leaf (03) and
// Publications leaf (05).
//
// NOTHING HERE IS ON A TIMER. index.astro reselects from these lists
// at the START of a page turn, while the incoming leaf is still fully
// covered by the outgoing one — so a reader arriving at Photography
// gets a different plate than last time, but a plate never changes
// while they are looking at it. A book doesn't rearrange itself while
// you read it, and an auto-advancing panel would also drag in WCAG
// 2.2.2 (anything that updates on its own past five seconds needs a
// visible pause control), which is a button the ledger has no
// vocabulary for.
//
// The FIRST entry in each list is what gets server-rendered into the
// HTML, so it is also the only one a reader with JavaScript off will
// ever see. That is why the opening plate is pinned by name below
// rather than left to whatever order the galleries happen to be in.
 
import { getGalleries, plateLine } from './photography';
 
/* ── Photography (leaf 03) ───────────────────────────────────────
 *
 * Derived from src/data/photography.ts rather than kept as a second
 * hand-maintained list. A plate described once is described
 * everywhere — the same principle that file already runs on. Add a
 * plate to a gallery and it becomes eligible for the home page with
 * no edit here.
 *
 * This reuses the BOARD derivatives (700w, plus 1400w at 2x) the
 * light table already builds, and getGalleries() is memoized, so the
 * home page adds nothing to build time.
 *
 * NOTE ON alt: a plate has no dedicated alt field, but its `caption`
 * IS real visual description in your own words, so that's what goes
 * in alt. The short overlay strip on the leaf gets plateLine() — the
 * name, not the description — so the two never duplicate each other.
 */
 
/** Pinned by `file`. Server-rendered, and the only plate a reader
 *  with JS off ever sees. Must be a plate in a built gallery. */
const OPENING_PLATE = 'escarpments/escarpment5.jpg';
 
/** Restrict the rotation to these plates, in this order — `file`
 *  values, e.g. 'water/water3.jpg'. Leave EMPTY to rotate over every
 *  finished plate in every built gallery (currently 32). Fill it in
 *  when you'd rather the home page showed only the strongest work
 *  instead of the whole catalog. */
const ROTATION: string[] = [];
 
export interface PhotoFeature {
  src: string;
  /** density descriptors (`… 1x, … 2x`), so the <img> takes no `sizes` */
  srcset?: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}
 
export async function photoFeatures(): Promise<PhotoFeature[]> {
  const plates = (await getGalleries()).flatMap((g) => g.plates).filter((p) => !p.draft);
 
  // A plate still living in /public resolves to the UNOPTIMIZED
  // original — see IMAGE MIGRATION at the top of photography.ts. That
  // is survivable on a gallery a reader chose to open; it is not
  // survivable on the home page, which every visitor loads and which
  // now preloads a second plate on top of the first. So unmigrated
  // plates are excluded rather than silently shipped full-size.
  const usable = plates.filter((p) => p.img.optimized);
 
  if (!usable.length) {
    throw new Error(
      'register-features.ts: no optimized plates available, so leaf 03 would serve full-size ' +
        "originals from /public on the site's busiest page. Run the IMAGE MIGRATION at the top " +
        'of src/data/photography.ts:\n' +
        '  mkdir -p src/assets/photography\n' +
        '  git mv public/images/escarpments src/assets/photography/escarpments\n' +
        '  git mv public/images/water       src/assets/photography/water'
    );
  }
 
  const byFile = new Map(usable.map((p) => [p.file, p]));
 
  const opening = byFile.get(OPENING_PLATE);
  if (!opening) {
    throw new Error(
      `register-features.ts: OPENING_PLATE "${OPENING_PLATE}" is not a finished, optimized plate ` +
        `in a built gallery. Available: ${[...byFile.keys()].join(', ')}`
    );
  }
 
  const ordered = ROTATION.length
    ? ROTATION.map((file) => {
        const p = byFile.get(file);
        if (!p) {
          throw new Error(
            `register-features.ts: ROTATION lists "${file}", which is not a finished, optimized ` +
              `plate in a built gallery.`
          );
        }
        return p;
      })
    : usable;
 
  return [opening, ...ordered.filter((p) => p.file !== opening.file)].map((p) => ({
    src: p.img.board,
    srcset: p.img.boardSrcset,
    width: p.img.width,
    height: p.img.height,
    alt: p.caption || plateLine(p),
    caption: plateLine(p),
  }));
}

export interface PublicationFeature {
  /** Full title as published. Kept under ~110 chars — see note above. */
  title: string;
  /** The single citation line under the title. Journal • year, etc. */
  cite: string;
  /** Where "Read the Full Text" goes. */
  href: string;
  /** A /public/ path, e.g. '/images/vaughan_land_company.jpg'. */
  image: string;
  alt: string;
}

export const PUBLICATION_FEATURES: PublicationFeature[] = [
  {
    title:
      "'Opportunity Knocking': The Vaughan Land Company and Early Bailey County Development",
    cite: 'Panhandle-Plains Historical Review \u2022 2025',
    href: '/publications/opportunity_knocking',
    image: '/images/vaughan_land_company.jpg',
    alt: 'Vaughan Land Company development archival photo',
  },

  // Sketched from articles already on the site — the images are the
  // only thing missing, since I don't know which plate you'd want
  // fronting each one. Fill in `image` and `alt` and uncomment.
  //
  {
     title:
       'A Spring Sprung It: Tracing and Understanding the True Genesis of North America\u2019s Longest River',
     cite: 'Journal of the West \u2022 2019',
    href: '/publications/spring_sprung_it',
     image: '/images/spring_sprung_it/utmost_spring_closeup.jpg',
     alt: 'Image of the Utmost Spring, the headwaters of the Missouri River',
   },
   {
     title: 'Lipscomb County Courthouse',
     cite: 'Authentic Texas \u2022 Summer 2025',
     href: '/publications/lipscomb_county_courthouse',
     image: '/images/lipscomb_county.jpg',
     alt: 'Lipscomb County Courthouse',
   },
   {
     title: 'Surveying the Capitol Land Reservation in Texas.',
     cite: 'Southwestern Historical Quarterly 129, no.3 \u2022 January 2026',
     href: '/publications/capitol_land_shq',
     image: '/images/capitol_land_shq/02-wiley-field-notes-p1.png',
     alt: 'Image of field notes from the survey of the Capitol Land Reservation in Texas',
   },
   {
     title: 'Tahoka Lake',
     cite: 'Caprock Chronicles: More Tales of the Llano Estacado, edited by John T. (Jack) Becker and David J Murrah, 55-56. Charleston, South Carolina: The History Press, 2021.',
     href: '/publications/tahoka_lake',
     image: '/images/tahoka_lake.jpg',
     alt: 'Tahoka Lake',
   },
   {
     title: 'Albert Pike and His Journey to Ransom Canyon',
     cite: 'Lubbock Avalanche-Journal, November 29, 2024.',
     href: '/publications/albert_pike',
     image: '/images/albert_pike/albert_pike.jpg',
     alt: 'Black and white portrait of Albert Pike',
   },
   {
     title: 'The Remnants of the Southwest Conference: the Story of a Landmark Archival Collection',
     cite: 'Authentic Texas \u2022 Winter 2024.',
     href: '/publications/southwest_conference',
     image: '/images/southwest_conference2.jpg',
     alt: 'Image of Southwest Conference exhibit',
   },
   {
     title: 'The Sharps rifle, buffalo hunting, and the South Plains',
     cite: 'Lubbock Avalanche-Journal, January 28, 2024.',
     href: '/publications/sharps_rifle',
     image: '/images/judia_buffalo_stand.jpg',
     alt: 'Image of a buffalo stand by Bert Judia',
   },
   {
     title: 'Tumbleweed Smith and the Sounds of Texas',
     cite: 'Authentic Texas \u2022 Spring 2023',
     href: '/publications/tumbleweed_smith',
     image: '/images/tumbleweed_smith.jpg',
     alt: 'Graphic for Tumbleweed Smith Article',
   },
   {
     title: 'Comfortably Lodged: Transforming historic county jails into silos for historical and cultural heritage',
     cite: 'Authentic Texas \u2022 Spring 2021',
     href: '/publications/comfortably_lodged',
     image: '/images/comfortably_lodged/comfortably_lodged2.jpg',
     alt: 'Image of Sutton County Jail Cell in Sonora, Texas',
   },
   {
     title: 'Unusual Annotations in Stephen F. Austin’s 1835 Map of Texas Tell Early Texas History',
     cite: 'Southwestern Archivist 42, No.1 \u2022 February 2019',
     href: '/publications/unusual_annotations',
     image: '/images/unusual_annotations/unusual_annotations2.png',
     alt: 'Image of Stephen F. Austin’s 1835 Map of Texas with annotations',
   }
];