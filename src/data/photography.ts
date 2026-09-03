/**
 * src/data/photography.ts — the catalog record
 *
 * Everything about the photography section lives here: the series
 * registry, the galleries, the plates, and the image pipeline. Three
 * routes read from it —
 *
 *   /photography/[slug]           the light table
 *   /photography/plates           the plate index
 *   /photography/[slug]/[plate]   the single-plate record
 *
 * — plus /photography, the album, which reads SERIES for its covers and
 * ledes. A plate described once is described everywhere. This used to
 * live inside getStaticPaths in [slug].astro, which meant nothing else
 * could see it; getStaticPaths runs in an isolated scope but CAN see
 * imports, so moving it here costs that page nothing.
 *
 * ── SCHEMA NOTES ──────────────────────────────────────────────────
 *
 *  title  the name of the photograph, on its own. No location.
 *  place  'Toole County, Montana'. Kept separate so the index can
 *         group and sort by county or state, and so the two can be
 *         set in different type on the plate pages.
 *  lat/lng  real numbers, not a formatted string. coordLabel() makes
 *         the display form; geoUrl() makes a map link; the plate page
 *         emits them as schema.org GeoCoordinates. Range-checked at
 *         module load — a coordinate off the globe fails the build.
 *  x/y    position on the light table sheet. BOTH OPTIONAL — omit them
 *         and the auto-flow places the plate. See THE LAYOUT below.
 *  w      printed width, also optional; omit for a seeded default.
 *  after  place this plate directly beneath another, by filename, for
 *         pairs that have to be read together.
 *
 * Height is never authored: it comes from the real image's aspect ratio.
 *
 * A plate with an empty `title` is treated as unfinished everywhere:
 * it shows as "in preparation" and is never offered for sale.
 *
 * ── IMAGE MIGRATION ───────────────────────────────────────────────
 *
 *   mkdir -p src/assets/photography
 *   git mv public/images/escarpments src/assets/photography/escarpments
 *   git mv public/images/water       src/assets/photography/water
 *
 * Until you do, `file` paths resolve to the unoptimized originals in
 * /public and you get a dev warning per plate.
 */
import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

/* The sheet is no longer a fixed 3200x2200 — each gallery's boardW and
   boardH are derived from whatever the layout produced, so a 40-plate
   series and a 6-plate series each get a desk that fits. */

/** caption row under each print — counted in the layout and the bounds */
export const CAPTION_H = 22;
export const LICENSE_EMAIL = 'hello@austinlallison.com';
export const PHOTOGRAPHER = 'Austin Allison';

/* ── types ──────────────────────────────────────────────────────── */

/** Where and when a cover was exposed, for series whose cover is NOT a
 *  plate — an unbuilt series has no gallery, so there is nothing to read
 *  lat/lng off. Built series should leave this alone: the plate is the
 *  source of truth and duplicating it here is how the two drift apart. */
export type CoverExposure = {
  lat: number;
  /** EAST positive. Western longitudes are negative. */
  lon: number;
  /** IANA zone, e.g. 'America/Denver'. NEVER a numeric offset: a camera
   *  clock records local wall time, so the offset depends on the date and
   *  a stored number is an hour wrong on the far side of a DST boundary. */
  timeZone: string;
  /** EXIF DateTimeOriginal as local wall time, 'YYYY-MM-DDTHH:MM:SS'.
   *  No zone suffix — the zone above supplies it. */
  taken: string;
  /** EXIF GPSImgDirection, if the body wrote one. Only needed for
   *  frame-relative lighting, which is off by default. */
  bearing?: number;
};

/** Chrome colours sampled from a cover by scripts/sample-covers.mjs.
 *  Paste its output here. Absent means the rail and catchword keep the
 *  white-with-a-shadow treatment, which is a correct fallback, not a
 *  broken state. */
export type CoverChromeRegion = {
  ink: string;
  halo: string;
  haloStrength: number;
};

export type CoverChrome = {
  rail: CoverChromeRegion;
  catchword: CoverChromeRegion;
  /** Sampled but not yet used: the plate label lives inside the slip,
   *  which is opaque and needs no halo. Here for the day it moves out. */
  plateline?: CoverChromeRegion;
};

export type SeriesEntry = {
  slug: string;
  number: string;
  title: string;
  built: boolean;
  /** two or three sentences for the album page — the pitch for entering
   *  the series. Lives here rather than on the gallery so an unbuilt
   *  series can still describe itself. */
  lede: string;
  /** cover image, relative to src/assets/photography */
  cover: string;
  coverLabel: string;
  /** Describes the PICTURE for a reader who cannot see it. The album
   *  falls back to `title — coverLabel`, which is a citation, not a
   *  description, and it is the accessible name of the link that wraps
   *  the cover. */
  coverAlt?: string;
  /** Only for a cover that is not a plate. See CoverExposure. */
  exposure?: CoverExposure;
  /** Output of scripts/sample-covers.mjs for this cover. */
  chrome?: CoverChrome;
};

export type PlateInput = {
  file: string;
  title: string;
  place: string;
  lat: number;
  lng: number;
  specs: string;
  /** Top-left corner on the sheet. Omit BOTH to let the auto-flow place
   *  this plate. Hand-place only where the position is doing
   *  curatorial work. */
  x?: number;
  y?: number;
  /** Printed width. Omit for a seeded default (300-450) that varies
   *  plate to plate but never changes between builds. */
  w?: number;
  /** Place this plate directly beneath another, by that plate's `file`.
   *  For pairs that have to be read together — a summer and winter of
   *  the same view — without pinning either to absolute coordinates. */
  after?: string;
  caption?: string;
  /** EXIF DateTimeOriginal as local wall time, 'YYYY-MM-DDTHH:MM:SS'.
   *  Drives the desk light on the album. Omit and that plate's desk
   *  falls back to neutral light — nothing breaks, nothing lights. */
  taken?: string;
  /** IANA zone for `taken`. Required alongside it; see CoverExposure
   *  for why this is a zone name and not a number. */
  timeZone?: string;
  /** EXIF GPSImgDirection. Optional, frame-relative lighting only. */
  bearing?: number;
  /** Fulfillment checkout URL — a Stripe Payment Link tied to a
   *  Prodigi print product. Empty means no Order a print button. */
  printLink?: string;
};

export type GalleryInput = {
  slug: string;
  /** false hides both the print and licensing controls for every plate
   *  in the gallery — use it for a series that is built but not ready
   *  to be sold. */
  sellable: boolean;
  region: string;
  /** The opening view on desktop. Omit to open on the centre of
   *  whatever the layout produced. */
  centerX?: number;
  centerY?: number;
  plates: PlateInput[];
};

/* ── PARKED ────────────────────────────────────────────────────────
 * The long-form American Escarpments essay used to render inside the
 * light table's HUD, where nobody read it — wrong posture, wrong
 * measure. The album page now carries the shorter `lede` below. Kept
 * here in case it wants a home later (a series preface on the plate
 * index, or an About page):
 *
 * From the rugged Permian red beds of the Southern Plains to the
 * ancient volcanic chasms of the Pacific Northwest and the dramatic
 * glacial coulees of Montana's Big Sky country, this photo set
 * captures the breathtaking geological fractures that define the
 * American West. These landscapes are a masterclass in geomorphology,
 * visually documenting the diverse forces of water, wind, and ancient
 * cataclysms that have sculpted the continent's vast interior
 * tablelands. By showcasing the abrupt transitions where endless high
 * prairies drop away into hidden canyons, valleys, and river floors,
 * the collection highlights both the immense isolation and the
 * unexpected productivity of the Western terrain. Ultimately, the
 * images serve as a striking testament to human adaptation, where
 * ancient natural fortresses and challenging migratory barriers have
 * seamlessly transformed into modern landscapes of recreation and
 * massive agricultural abundance.
 */

/* ── the registry ───────────────────────────────────────────────── */

export const SERIES: SeriesEntry[] = [
  {
    slug: 'escarpments',
    number: 'I',
    title: 'American Escarpments',
    built: true,
    lede: "A gallery of the precipitous escarpments outlining the edges of our country's plateaus. This collection captures the sudden and jarring drops of these areas under natural light.",
    cover: 'escarpments/escarpment20.jpg',
    coverLabel: 'Plate 1.20 \u00B7 Buckley Coulee',
    chrome: {
      rail: { ink: '#1d1911', halo: '#f8f8f7', haloStrength: 0.504 },       // 7.21:1
      catchword: { ink: '#edece3', halo: '#0f0f0a', haloStrength: 0.511 },  // 7.34:1
      plateline: { ink: '#0f191f', halo: '#f6f8f8', haloStrength: 0.35 },   // 5.66:1
    }, 
  },
  {
    slug: 'water_of_the_llano_estacado',
    number: 'II',
    title: 'Water of the Llano Estacado',
    built: true,
    lede: 'A documentary index featuring the diminutive water sources on and near the Llano Estacado.',
    cover: 'water/water1.jpg',
    coverLabel: 'Plate 2.01 · Tule Creek',
    chrome: {
      rail: { ink: '#1c1a11', halo: '#f8f8f7', haloStrength: 0.464 },       // 4.64:1
      catchword: { ink: '#1d1b11', halo: '#f8f8f7', haloStrength: 0.475 },  // 4.67:1
      plateline: { ink: '#1c1912', halo: '#f8f8f7', haloStrength: 0.455 },  // 4.20:1
    },
  },
  {
    slug: 'cotton_gins',
    number: 'III',
    title: 'Cotton Gins of the High Plains',
    built: true,
    lede: 'An intentional survey of the remnant legacy cotton gins in Texas. Most no longer in use, these sentinels of the plains register stories of economic prosperity dating back more than a century.',
    cover: 'cotton_gins/dumont.jpg',
    coverLabel: 'Plate 3.02 \u00B7 Dumont',
    chrome: {
      rail: { ink: '#e9e8e7', halo: '#0d0d0c', haloStrength: 0.524 },       // 6.90:1
      catchword: { ink: '#ede8e3', halo: '#0f0d0a', haloStrength: 0.405 },  // 5.10:1
      plateline: { ink: '#191515', halo: '#f8f7f7', haloStrength: 0.35 },   // 4.23:1
    },
  },
  {
    slug: 'courthouses',
    number: 'IV',
    title: 'The County Courthouse',
    built: false,
    lede: 'An in-depth photographic account of courthouses of the Great Plains from Texas to Montana.',
    cover: 'courthouses/teton-cover.jpg',
    coverLabel: 'Plate 4.01 \u00B7 Teton County, Montana',
    chrome: {
      rail: { ink: '#191915', halo: '#f8f8f7', haloStrength: 0.531 },       // 5.86:1
      catchword: { ink: '#e9eae6', halo: '#0d0e0c', haloStrength: 0.51 },   // 5.15:1
      plateline: { ink: '#11171d', halo: '#f7f7f8', haloStrength: 0.35 },   // 7.45:1
    },
  },
];

const galleryData: GalleryInput[] = [
  {
    slug: 'escarpments',
    sellable: true,
    region: 'Texas | Montana | Washington',
    centerX: 1550,
    centerY: 920,
    plates: [
      {
        file: 'escarpments/escarpment1.jpg',
        title: 'Buckley Coulee',
        place: 'Toole County, Montana',
        lat: 48.968683, lng: -111.982261,
        specs: '12mm \u00B7 \u0192/8 \u00B7 1/320s',
        x: 890, y: 320, w: 350,
        caption: 'Overlooking Buckley Coulee near Sunburst and Sweet Grass, Montana. This dramatic 200-foot drop reveals incredible rugged rock formations. A small piece of "Little Jerusalem" and its hoodoos can be seen in the foreground.',
        printLink: '', // TODO: Stripe Payment Link
      },
      {
        file: 'escarpments/escarpment2.jpg',
        title: 'Blooming Stratification',
        place: 'Garza County, Texas',
        lat: 33.090300, lng: -101.500369,
        specs: '14mm \u00B7 \u0192/8 \u00B7 1/320s',
        x: 1640, y: 290, w: 400,
        caption: 'Terra cotta soil, pale caliche cliffs, bright yellow wildflowers, and deep green mesquite. Watching the high plains of the Llano Estacado drop off into the Double Mountain Fork Brazos River basin in Garza County.',
      },
      {
        file: 'escarpments/escarpment3.jpg',
        title: 'Palouse Canyon Basalt',
        // VERIFY: this was the one plate whose title carried no county.
        // 46.6626 / -118.2276 falls in Franklin County, just across the
        // line from Whitman — worth confirming before it goes live.
        place: 'Franklin County, Washington',
        lat: 46.662612, lng: -118.227612,
        specs: '14mm \u00B7 \u0192/8 \u00B7 1/100s',
        x: 1040, y: 580, w: 250,
        caption: 'Looking down into the canyon near Palouse Falls, Washington. The dark, tiered basalt cliffs drop nearly 200 feet into the gorge, where the river winds through steep talus slopes, pale sagebrush, and golden summer grasses. A striking reminder of the power of the ancient Missoula Floods that shaped the Pacific Northwest landscape.',
      },
      {
        file: 'escarpments/escarpment4.jpg',
        title: 'The Sea of Red and Cedar',
        place: 'Briscoe County, Texas',
        lat: 34.465959, lng: -101.098786,
        specs: '12mm \u00B7 \u0192/2.8 \u00B7 1/2000s',
        x: 1275, y: 330, w: 350,
        caption: 'An aerial look over the North Prong Little Red River country in Briscoe County, Texas. The vivid red clay and sandstone canyon walls contrast against a sea of vibrant green juniper and mesquite, showing off the wild, rugged beauty carved along the edge of the Caprock.',
      },
      {
        file: 'escarpments/escarpment5.jpg',
        title: 'Little Jerusalem Hoodoos',
        place: 'Toole County, Montana',
        lat: 48.968683, lng: -111.982261,
        specs: '12mm \u00B7 \u0192/3.5 \u00B7 1/1250s',
        x: 1310, y: 790, w: 340,
        caption: 'A closer look at the remarkable rock spires and caprock formations lining Buckley Coulee near Sunburst, Montana. Sculpted over centuries by wind and water, these sandstone hoodoos stand guard right where the flat prairie plunges down into the valley floor.',
      },
      {
        file: 'escarpments/escarpment6.jpg',
        title: 'Upper Yellow House Draw Canyon',
        place: 'Bailey County, Texas',
        lat: 33.851419, lng: -102.700752,
        specs: '12mm \u00B7 \u0192/2.8 \u00B7 1/2000s',
        x: 1720, y: 480, w: 300,
        caption: 'An aerial perspective of the Upper Yellow House Draw in Bailey County, Texas. Unlike the near-vertical cliffs further east, this escarpment shows a gentler break in the Llano Estacado, a shallow valley carved into the tableland where caliche ledges, winter native grasses, and a quiet stock pond break up the endless, flat horizon.',
      },
      {
        file: 'escarpments/escarpment7.jpg',
        title: 'Little Jerusalem with Sweetgrass Hills',
        place: 'Toole County, Montana',
        lat: 48.966829, lng: -111.965596,
        specs: '12mm \u00B7 \u0192/2.8 \u00B7 1/200s',
        x: 1730, y: 700, w: 300,
        caption: 'An aerial view along the coulee rim near Sweetgrass, Montana as evening sets in. The rugged sandstone escarpment and golden wheat fields drop away into the coulee floor, framed perfectly by the distant, rising peaks of the Sweet Grass Hills glowing under a soft twilight sky.',
      },
      {
        file: 'escarpments/escarpment8.jpg',
        // NOTE: reads as "Briscoe County Ledge / Briscoe County, Texas"
        // in the index now that place is its own field. 'Tule Canyon
        // Ledge' would carry more, but renaming your work isn't my call.
        title: 'Briscoe County Ledge',
        place: 'Briscoe County, Texas',
        lat: 34.546670, lng: -101.429921,
        specs: '12mm \u00B7 \u0192/8 \u00B7 1/320s',
        x: 730, y: 540, w: 300,
        caption: 'A ground-level perspective from the floor of Tule Canyon in Briscoe County, Texas. The reddish waters of Tule Creek weave through golden grasses, framed by towering, multi-layered cliffs of white gypsum, red mudstone, and rugged caprock bluffs under a bright Panhandle sky.',
      },
      {
        file: 'escarpments/escarpment9.jpg',
        title: 'White Over Yellowhouse Canyon',
        place: 'Lubbock County, Texas',
        lat: 33.494000, lng: -101.635000,
        specs: '12mm \u00B7 \u0192/2.2 \u00B7 1/4000s',
        x: 1680, y: 910, w: 300,
        caption: 'An aerial look over Yellowhouse Canyon near Lubbock after a West Texas snowfall. The dark, meandering waters of the North Fork Double Mountain Fork River curl through a blanket of white, highlighting the rugged mesa bluffs and dormant mesquite brush.',
      },
      {
        file: 'escarpments/escarpment10.jpg',
        title: 'Walls of the Pecos',
        place: 'Val Verde County, Texas',
        lat: 29.720860, lng: -101.347319,
        specs: '12mm \u00B7 \u0192/5.6 \u00B7 1/1000s',
        x: 1300, y: 1030, w: 360,
        caption: 'Vertical limestone cliffs, olive-green waters, and endless desert tableland. Looking down the sheer escarpments of the Pecos River canyon in Val Verde County.',
      },
      {
        file: 'escarpments/escarpment11.jpg',
        title: 'Brazos Palisades',
        place: 'Garza County, Texas',
        lat: 33.090300, lng: -101.500369,
        specs: '12mm \u00B7 \u0192/5.6 \u00B7 1/1000s',
        x: 1300, y: 570, w: 410,
        caption: 'A panoramic look across the badlands of Garza County, Texas. In the foreground, deeply eroded red clay mounds and pale caliche tell the story of thousands of years of runoff, while the flat, unbroken rim of the Caprock Escarpment stands tall along the distant horizon.',
      },
      {
        file: 'escarpments/escarpment12.jpg',
        title: 'Along the Cache la Poudre',
        place: 'Larimer County, Colorado',
        lat: 40.681113, lng: -105.235401,
        specs: '12mm \u00B7 \u0192/4.4 \u00B7 1/320s',
        x: 980, y: 780, w: 300,
        caption: 'Rooted in the cracks of ancient, tilted granite, a lone pine stands tall over the rugged foothills of the Cache la Poudre Canyon.',
        printLink: '',
      },
      {
        file: 'escarpments/escarpment13.jpg',
        title: 'Lakeside Autumn',
        place: 'Bailey County, Texas',
        lat: 33.957391, lng: -102.753125,
        specs: '20mm \u00B7 \u0192/5.6 \u00B7 1/60s',
        x: 2050, y: 680, w: 300,
        caption: 'Some shallower escarpments drop into intermittent lakes. This view shows the autumn sun rising over the Muleshoe Wildlife Refuge. The summer view can be seen in Plate 14.',
      },
      {
        file: 'escarpments/escarpment14.jpg',
        title: 'Lakeside Summer',
        place: 'Bailey County, Texas',
        lat: 33.957391, lng: -102.753125,
        specs: '20mm \u00B7 \u0192/5.6 \u00B7 1/60s',
        x: 2010, y: 920, w: 300,
        caption: 'As with Plate 13, this view shows the shallow descent into an intermittent lake at the Muleshoe Wildlife Refuge.',
      },
      {
        file: 'escarpments/escarpment15.jpg',
        title: 'House on the Edge',
        place: 'Deaf Smith County, Texas',
        lat: 34.747511, lng: -102.883659,
        specs: '12mm \u00B7 \u0192/5.6 \u00B7 1/640s',
        x: 2070, y: 470, w: 300,
        caption: 'This abandoned homestead sits on the edge of a shallow escarpment in Deaf Smith County, Texas. The house is perched at the edge of a small escarpment that descends toward Tierra Blanca Creek, with the flat plains of the Llano Estacado extending north.',
      },
      {
        file: 'escarpments/escarpment16.jpg',
        title: 'Glacier County Harvest',
        place: 'Glacier County, Montana',
        lat: 48.861767, lng: -112.643927,
        specs: '12mm \u00B7 \u0192/2.2 \u00B7 1/3700s',
        x: 2000, y: 1060, w: 300,
        caption: 'Looking out from a rocky escarpment over the vast, golden fields and scattered hay bales of Glacier County, Montana, with a solitary butte rising in the distance.',
      },
      {
        file: 'escarpments/escarpment17.jpg',
        title: 'Toole County Palisade',
        place: 'Toole County, Montana',
        lat: 48.740329, lng: -112.058411,
        specs: '24mm \u00B7 \u0192/8 \u00B7 1/800s',
        x: 670, y: 750, w: 300,
        caption: 'An escarpment northwest of Kevin, Montana towers nearly 800 feet over the rolling prairie below. During the 1920s and beyond, this area produced oil and gas as part of the Gordon Campbell oil field.',
      },
      {
        file: 'escarpments/escarpment18.jpg',
        title: 'Central Texas Waterfall',
        place: 'Lampasas County, Texas',
        lat: 31.061569, lng: -98.481911,
        specs: '12mm \u00B7 \u0192/2.8 \u00B7 1/500s',
        x: 660, y: 990, w: 280,
        caption: 'Gorman Falls in Lampasas County is one of the most spectacular falls in Texas. Highlighted by colorful fall foliage, this view captures the striking contrast between the river\'s steep, rocky canyon walls and the lush environment of the Colorado River.',
      },
      {
        file: 'escarpments/escarpment19.jpg',
        title: 'Homestead Ruins',
        place: 'Crosby County, Texas',
        lat: 33.6, lng: -101.1,
        specs: '12mm \u00B7 \u0192/2.2 \u00B7 1/4000s',
        x: 970, y: 1010, w: 310,
        caption: 'Echoes of the past linger in these crumbling walls and the sturdy chimney of this forgotten stone house, nestled deep in the rugged beauty of West Texas.',
      },
      {
        file: 'escarpments/escarpment20.jpg',
        title: 'Dempster in the Coulee',
        place: 'Toole County, Montana',
        lat: 48.953794, lng: -111.954469,
        specs: '12mm \u00B7 \u0192/8 \u00B7 1/200s',
        x: 2090, y: 250, w: 310,
        caption: 'A lone Dempster windmill stands in the foreground of the escarpment that outlines Buckley Coulee in Toole County, Montana. The stark contrast of the rocky escarpment, the freshley harvested wheat, and the native grassland frames a classic view of the American West.',
      }
    ],
  },
  {
    slug: 'water_of_the_llano_estacado',
    // Set to false while seven of these twelve plates are untitled. A
    // licensing inquiry for "Plate 06, in preparation" is not one you
    // want to receive. Flip to true once the metadata is filled in.
    sellable: false,
    region: 'Texas | New Mexico',
    centerX: 1250,
    centerY: 820,
    plates: [
      {
        file: 'water/water1.jpg',
        title: 'Tule Creek Flow',
        place: 'Briscoe County, Texas',
        lat: 34.546670, lng: -101.429921,
        specs: '12mm \u00B7 \u0192/8 \u00B7 1/320s',
        x: 950, y: 330, w: 250,
        caption: 'Tule Creek originates on the Llano Estacado and descends the caprock carving a broad canyon through Briscoe and Swisher counties. The creek assumes the rust color as it flows east.',
      },
      {
        file: 'water/water2.jpg',
        title: 'Canadian River Boundary',
        place: 'Hemphill County, Texas',
        lat: 35.937055, lng: -100.369943,
        specs: '12mm \u00B7 \u0192/5.6 \u00B7 1/500s',
        x: 580, y: 150, w: 320,
        caption: 'The Canadian River signifies the northern extent of the Llano Estacado for much of its northern extent. This view in Hemphill County shows the meandering river at sunset.',
      },
      {
        file: 'water/water3.jpg',
        title: 'Flowing Running Water Draw',
        place: 'Parmer County, Texas',
        lat: 34.471036, lng: -102.720865,
        specs: '12mm \u00B7 \u0192/5.6 \u00B7 1/640s',
        x: 1480, y: 80, w: 350,
        caption: 'Running Water Draw after a heavy rain in Parmer County, Texas. After head precipitation upstream, intermittent draws and creeks on the Llano Estacado can flow for periods before returning to their dry state.',
      },
      {
        file: 'water/water4.jpg',
        title: 'Collector Stream',
        place: 'Lubbock County, Texas',
        // was lng: -1102.702870 — the extra 1 put this plate three
        // times around the globe. Out-of-range coordinates now fail
        // the build rather than reaching schema.org and the map link.
        lat: 33.494794, lng: -101.629374,
        specs: '12mm \u00B7 \u0192/2.8 \u00B7 1/3200s',
        x: 1220, y: 330, w: 300,
        caption: 'Water from the Yellow House Draw and Blackwater Draw flows southeast from the Llano Estacado on its way to the Gulf of America.',
      },
      {
        file: 'water/water5.jpg',
        title: 'Reflections and Fractures',
        place: 'Bailey County, Texas',
        lat: 33.990590, lng: -102.702870, // same correction as Plate 04
        specs: '12mm \u00B7 \u0192/2.8 \u00B7 1/3200s',
        x: 1240, y: 590, w: 320,
        caption: 'Water in intermittently dry lake basins offer clear reflections of the sky above, while revealing fractures in the lake\'s underlying surface, a reminder of the Llano Estacado\'s arid climate and the ephemeral nature of these water sources.',
      },
      {
        file: 'water/water6.jpg',
        title: 'White Lake Springs', place: 'Bailey County, Texas',
        lat: 33.928283, lng: -102.767109,
        specs: '12mm \u00B7 \u0192/5.6 \u00B7 1/160s',
        caption: 'The springs that occasionally feed White Lake in Bailey County generate these narrow meanders of living water that temporarily sustain life at the lake.',
        x: 630, y: 380, w: 300,
      },
      // ── untitled below: an empty title marks a plate as in
      // preparation. The coordinates and specs here are still the
      // placeholders copied across all of them.,
      {
        file: 'water/water7.jpg',
        title: 'Dry Portales Spring', place: 'Roosevelt County, NM',
        lat: 34.136934, lng: -103.264933,
        specs: '5mm \u00B7 \u0192/2.8 \u00B7 1/1800s',
        x: 920, y: 70, w: 300,
        caption: 'One of the consistent water sources on the old Fort Sumner Trail, Portales Spring stands dry today, but the location along Yellow House Draw is marked by white caliche deposits and a small depression in the surrounding terrain. Billy the Kid stayed at the spring in 1880.',
      },
      {
        file: 'water/water8.jpg',
        title: 'Coyote Lake', place: 'Bailey County, Texas',
        lat: 34.084710, lng: -102.906476,
        specs: '12mm \u00B7 \u0192/2.8 \u00B7 1/2000s',
        x: 610, y: 850, w: 300,
        caption: 'Coyote Lake, originally named Agua Negra, is one of the largest salt lakes on the Llano Estacado. Ranald Mackenzie camped here in the 1870s on his foray across the plains. Another plate in this series shows the water coloration, a potential indication of how its original name was derived.'
      },
      {
        file: 'water/water9.jpg',
        title: 'Earth\'s Canvas in Texas', place: 'Bailey County, Texas',
        lat: 33.991164, lng: -102.708448,
        specs: '12mm \u00B7 \u0192/5.6 \u00B7 1/800s',
        w: 300,
        caption:'The rust-colored water bleeds into the vibrant green shoreline, separated by chalky white salt flats that look like brushstrokes from above, showcasing the raw, abstract beauty of a receding playa lake.',
        x: 1920, y: 600, w: 300,
      },
      {
        file: 'water/water10.jpg',
        title: 'Above the Draw', place: 'Bailey County, Texas',
        lat: 33.991164, lng: -102.708448,
        specs: '12mm \u00B7 \u0192/2.8 \u00B7 1/3200s',
        x: 625, y: 610, w: 300,
        caption:'The vast agricultural landscape of Texas is illustrated here showcasing the distinct, muddy path of the Blackwater Draw. Although flow is highly irregular, still collects in the draw, creating a temporary water source for wildlife and livestock.'
      },
      {
        file: 'water/water11.jpg',
        title: 'Evaporating Hues', place: 'Bailey County, Texas',
        lat: 33.979772, lng: -102.720094,
        specs: '12mm \u00B7 \u0192/2.8 \u00B7 1/2150s',
        x: 950, y: 810, w: 300,
        caption:'As water evaporates out of Pauls Lake, it leaves behind a sprawling, cracked expanse of pink and reddish salt deposits, ringed by a bright white mineral shoreline that cuts sharply into the surrounding dry plains.'
      },
      {
        file: 'water/water12.jpg',
        title: 'Tierra Blanca Crossing', place: 'Parmer County, Texas',
        lat: 33.991164, lng: -102.708448,
        specs: '12mm \u00B7 \u0192/5.6 \u00B7 1/400s',
        x: 1265, y: 810, w: 300,
        caption: 'Tierra Blanca Creek after a rain. A lone tree stands as a sentinel beside the muddy, receded creek bed, highlighting the seasonal, ephemeral nature of these vital historical waterways.'
      },
      {
        file: 'water/water13.jpg',
        title: 'Aermotor on the Plains', place: 'Lamb County, Texas',
        lat: 33.991164, lng: -102.708448,
        specs: '12mm \u00B7 \u0192/2.8 \u00B7 1/1250s',
        caption: 'Windmills mark water on the Llano Estacado in a different way. The Aermotor windmill, a common sight across the plains, extracts water from underground aquifers to the surface, providing vital water for both livestock and agriculture in this arid region.',
        x: 1850, y: 80, w: 300,
      },
      {
        file: 'water/water14.jpg',
        title: 'Sources for the Pastores', place: 'Potter County, Texas',
        lat: 33, lng: -102,
        specs: '12mm \u00B7 \u0192/2.2 \u00B7 1/750s',
        caption: 'Deep in the rugged expanse of the Canadian River Valley bordering the northern extent of the Llano Estacado, remnant springs and water holes are reminders of the water needed to support early pastore settlement in the Panhandle in the 1870s.',
        x: 1240, y: 120, w: 220,
      },
      {
        file: 'water/water15.jpg',
        title: 'Headwaters Scales', place: 'Lynn County, Texas',
        lat: 33.077788, lng: -101.535817,
        specs: '14mm \u00B7 \u0192/5.6 \u00B7 1/50s',
        caption: 'Receding waters of the Double Mountain Fork Brazos River create a scaly texture that illustrates the rolling movement of water along this course.',
        x: 1530, y: 320, w: 220,
      },
      {
        file: 'water/water16.jpg',
        title: 'Shallow Pools of Agua Negra ', place: 'Bailey County, Texas',
        lat: 34.102829, lng: -102.892902,
        specs: '12mm \u00B7 \u0192/5.6 \u00B7 1/800s',
        caption: 'Coyote Lake has been a consistent water source for wildlife, livestock, indigenous peoples, and settlers for centuries. Its waters are brackish and shallow, and they assume various colors due to high mineral content.',
        x: 1580, y: 600, w: 320,
      },
      {
        file: 'water/water17.jpg',
        title: 'Ruins along Crawfish Creek', place: 'Floyd County, Texas',
        lat: 34.1, lng: -101.3,
        specs: '12mm \u00B7 \u0192/2.2 \u00B7 1/380s',
        caption: 'Although more consistently dry than flowing today, Crawfish Creek in Floyd County supplied some of the earliest settlers of the Llano Estacado with water. These rock ruins and their presence along this creek suggest a once flowing source.',
        x: 1760, y: 340, w: 300,
      },
      {
        file: 'water/water18.jpg',
        title: 'Monument Lake Vista', place: 'Bailey County, Texas',
        lat: 33.973168, lng: -102.876181,
        specs: '24mm \u00B7 \u0192/8 \u00B7 1/200s',
        caption: 'Although more consistently dry than flowing today, Crawfish Creek in Floyd County supplied some of the earliest settlers of the Llano Estacado with water. These rock ruins and their presence along this creek suggest a once flowing source.',
        x: 1600, y: 820, w: 400,
      }
    ],
  },
  {
    slug: 'cotton_gins',
    // Set to false while seven of these twelve plates are untitled. A
    // licensing inquiry for "Plate 06, in preparation" is not one you
    // want to receive. Flip to true once the metadata is filled in.
    sellable: false,
    region: 'Texas | New Mexico',
    centerX: 1250,
    centerY: 820,
    plates: [
      {
        file: 'cotton_gins/girvin20191103-008.jpg',
        title: 'Gin near Girvin',
        place: 'Girvin, Pecos County, Texas',
        lat: 31.015116, lng: -102.503481,
        specs: '6mm \u00B7 \u0192/2.2 \u00B7 1/3000s',
        x: 950, y: 330, w: 250,
        caption: 'An abandoned gin sits on Owego Road southwest of Girvin, Texas. Girvin Butte is visible in the background. The gin\'s proximity to the railroad tracks to the northwest suggests it was once a hub of agricultural activity in the area.',
      },
      {
        file: 'cotton_gins/dumontgpp.2018.0029.3.jpg',
        title: 'Dumont Gin',
        place: 'Dumont, King County, Texas',
        lat: 33.809930, lng: -100.516919,
        specs: '24mm \u00B7 \u0192/8 \u00B7 1/640s',
        x: 750, y: 150, w: 250,
        caption: 'The Dumont gin is one of the oldest extant gins in West Texas. A 1921 fire destroyed the original gin, but this structure was built in 1922 and featured a smokestack and whistle from a steamboat.',
      },
      {
        file: 'cotton_gins/causeygpp.2018.0045.jpg',
        title: 'Gin at Causey',
        place: 'Causey, Roosevelt County, New Mexico',
        lat: 33.809930, lng: -100.516919,
        specs: '200mm \u00B7 \u0192/8 \u00B7 1/500s',
        x: 1050, y: 150, w: 250,
        caption: 'The gin at Causey, New Mexico sits abandoned with typical agricultural equipment scattered around the property. The gin is a reminder of the once-thriving cotton industry in the region, which has since declined due to changes in agricultural practices and market demands.',
      },
      {
        file: 'cotton_gins/bulagpp.2018.0039.jpg',
        title: 'Bula Gin Co.',
        place: 'Bula, Bailey County, Texas',
        lat: 33.911635, lng: -102.637156,
        specs: '24mm \u00B7 \u0192/8 \u00B7 1/400s',
        x: 1220, y: 330, w: 250,
        caption: 'The idle Bula Gin remains an imposing testament to the cotton industry that dominated the Llano Estacado. The strinking red steel equipment offers a stark contrast to the muted tones of corrugated steel, highlighting the industrial nature of cotton processing in this region.',
      },
      {
        file: 'cotton_gins/pleasantvalleygpp.2018.0050.jpg',
        title: 'Pleasant Valley Gin',
        place: 'Pleasant Valley, Lamb County, Texas',
        lat: 34.300903, lng: -102.561075,
        specs: '70mm \u00B7 \u0192/8 \u00B7 1/160s',
        x: 660, y: 340, w: 250,
        caption: 'The Pleasant Valley Gin remained active until recent years. This gin was the center of a thriving agricultural community in northern Lamb County that benefitted from the shallow water belt north of the sandhills. Local\'s will remember Betty Bryant who ran the Pleasant Valley Cafe near the gin.',
      },
      {
        file: 'cotton_gins/finney20220101-8.jpg',
        title: 'Finney Gin',
        place: 'Finney, Hale County, Texas',
        lat:  34.277, lng: -101.716,
        specs: '50mm \u00B7 \u0192/8 \u00B7 1/640s',
        x: 1320, y: 110, w: 250,
        caption: 'The Finney Gin sits abandoned in the heart of the Llano Estacado. While some of the gin\'s corrugated metal has been removed or has fallen away, the main structure remains a visible testament to this area\'s agricultural output. Horses graze near the gin and use it as protection from occasional harsh weather.',
      },
      {
        file: 'cotton_gins/rallsgpp.2018.0035.1.jpg',
        title: 'Gin at Sunset',
        place: 'Ralls, Crosby County, Texas',
        lat:  33.669897, lng: -101.374934,
        specs: '24mm \u00B7 \u0192/8 \u00B7 1/13s',
        x: 1480, y: 310, w: 250,
        caption: 'A gin in Ralls maintains its presence in the community despite the slow deterioration of its structure. The gin\'s silhouette is highlighted against the already set sun',
      },
      {
        file: 'cotton_gins/grow20190420-002.jpg',
        title: 'Grow Gin',
        place: 'Grow, King County, Texas',
        lat:  33.81, lng: -100.306,
        specs: '12mm \u00B7 \u0192/2.2 \u00B7 1/4000s',
        x: 1580, y: 80, w: 250,
        caption: 'An aerial view of the Grow Gin in King County, Texas. The scale house and gin sit amidst the gently rolling plains east of the Llano Estacado.',
      }, 
      {
        file: 'cotton_gins/newlynn20220108-2.jpg',
        title: 'New Lynn Gin',
        place: 'New Lynn, Lynn County, Texas',
        lat:  33.211, lng: -101.666,
        specs: '24mm \u00B7 \u0192/8 \u00B7 1/1600s',
        x: 1580, y: 490, w: 250,
        caption: 'The New Lynn gin presents a unique adaptation of an old school structure into a functional cotton gin. Following New Lynn\'s consolidation with Wilson in 1947, the old school structure was repurposed to serve the local cotton industry.',
      },    
      {
        file: 'cotton_gins/littlefieldgpp.2018.0061.jpg',
        title: 'Lumsden-Perkins Gin',
        place: 'Littlefield, Lamb County, Texas',
        lat:  33.917971, lng: -102.400237,
        specs: '70mm \u00B7 \u0192/8 \u00B7 1/500s',
        x: 1050, y: 550, w: 500,
        caption: 'The Lumsden-Perkins Gin four miles west of Littlefield is an example of a historic gin yard with several extant structures. The previous gin was destroyed in April 1957 by a tornado. Ross Lumsden and J.G. Perkins rebuilt the gin, and it operated for several decades before being abandoned.',
      },
      {
        file: 'cotton_gins/petersburg20220101-5.jpg',
        title: 'Gin at Petersburg',
        place: 'Petersburg, Hale County, Texas',
        lat:  33.876053, lng: -101.599384,
        specs: '24mm \u00B7 \u0192/8 \u00B7 1/2000s',
        x: 780, y: 560, w: 250,
        caption: 'This abandoned gin at Petersburg, Texas illustrates the typical West Texas gin design. It is notable to frame this image with the 21 century wind turbines in the background with the aging gin structure.',
      },  
      {
        file: 'cotton_gins/enochsgpp.2018.0040.jpg',
        title: 'Gardner-Hankins Gin at Enochs',
        place: 'Enochs, Bailey County, Texas',
        lat:  33.873397, lng: -102.759468,
        specs: '24mm \u00B7 \u0192/8 \u00B7 1/500s',
        x: 1060, y: 700, w: 250,
        caption: 'The abandoned Gardner-Hankins Gin at Enochs is the typical large, imposing, and grandiose gin structure that was once common in the crossroads towns across the area. This gin was at one time managed by Erelious Notrey (E.N.) "Shorty" McCall.',
      },  
      {
        file: 'cotton_gins/hartcampgpp.2018.0006.jpg',
        title: 'Hart Camp Gin',
        place: 'Hart Camp, Lamb County, Texas',
        lat:  34.022, lng: -102.154,
        specs: '100mm \u00B7 \u0192/5.6 \u00B7 1/400s',
        x: 1330, y: 700, w: 250,
        caption: 'The gin at Hart Camp, Texas exists just south of the crossroads of FM 37 and FM 168 in eastern Lamb County. Prominent bits of signage are still visible on the corrugated metal and a Hardwicke-Etter sign remains at the peak. The Hart Camp School is north of this structure and is another extant struture of the once busling corner.',
      },   
    ],
  }
];

/* ── formatting helpers ─────────────────────────────────────────── */

export const plateNo = (i: number) => String(i + 1).padStart(2, '0');

export const coordLabel = (lat: number, lng: number) =>
  `${Math.abs(lat).toFixed(6)}\u00B0 ${lat >= 0 ? 'N' : 'S'}, ` +
  `${Math.abs(lng).toFixed(6)}\u00B0 ${lng >= 0 ? 'E' : 'W'}`;

export const geoUrl = (lat: number, lng: number) =>
  `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=12/${lat}/${lng}`;

export const plateHref = (slug: string, i: number) =>
  `/photography/${slug}/${plateNo(i)}`;

/** One line for a plate wherever both parts are shown together. */
export const plateLine = (p: { title: string; place: string }) =>
  p.title ? (p.place ? `${p.title} \u00B7 ${p.place}` : p.title) : 'Untitled';

/* ── THE LAYOUT ─────────────────────────────────────────────────
 *
 * A plate with x and y is pinned exactly where you put it. A plate
 * without them is placed by the flow below, which fills the shortest
 * column each time — a skyline pack, loosened with seeded jitter so it
 * reads as a hand-laid desk rather than a grid.
 *
 * The jitter is seeded from the plate's own filename, so a given plate
 * lands in the same spot on every build, on every machine. Add a plate
 * and the ones after it shift; rename a file and that plate moves.
 * Neither breaks anything — nothing links to a coordinate — but it is
 * why you pin the plates whose position carries an argument.
 *
 * Pinned and flowed plates coexist: pinned rectangles are laid down
 * first, and the flow reads them as obstacles.
 *
 * DIALS: wider gutters loosen the desk, narrower tighten it. COL_BIAS
 * shapes the aspect ratio — higher is wider and shorter.
 */

const GUTTER_X = 110;   // horizontal breathing room between columns
const GUTTER_Y = 96;    // vertical gap below a plate's caption
const MARGIN = 220;     // slack from the sheet's top-left origin
const JITTER_X = 46;    // how far a plate may drift within its column
const JITTER_Y = 70;    // extra sag below the column head
const PAIR_GAP = 34;    // gap under an `after:` plate — tighter, they pair
const CLEARANCE = 24;   // minimum air between any two plates
const COL_BIAS = 1.7;   // columns = sqrt(count * COL_BIAS)
const DEFAULT_WIDTHS = [300, 340, 380, 420, 450];

type Box = { x: number; y: number; w: number; h: number };

/** FNV-1a — small and stable. It only needs to give each filename a
 *  different seed, not to be a hash function that matters. */
const hashSeed = (s: string) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

/** mulberry32, seeded per plate so the layout is reproducible */
const seeded = (seed: number) => {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

/** the printed width of a plate that didn't declare one */
export const defaultWidth = (file: string) =>
  DEFAULT_WIDTHS[hashSeed(file) % DEFAULT_WIDTHS.length];

const hits = (a: Box, b: Box) =>
  a.x < b.x + b.w + CLEARANCE && b.x < a.x + a.w + CLEARANCE &&
  a.y < b.y + b.h + CLEARANCE && b.y < a.y + a.h + CLEARANCE;

type LayoutItem = {
  file: string;
  w: number;
  /** image height only — the caption row is added inside the layout */
  h: number;
  x?: number;
  y?: number;
  after?: string;
};

/** Returns x/y for every item, in the order they were given. Keyed by
 *  array position rather than filename, so a duplicate `file` can't
 *  make two plates share one box. */
function layout(items: LayoutItem[], slug: string): { x: number; y: number }[] {
  const boxes: (Box | undefined)[] = new Array(items.length);
  const placed: Box[] = [];

  const put = (i: number, x: number, y: number) => {
    const box = { x, y, w: items[i].w, h: items[i].h + CAPTION_H };
    boxes[i] = box;
    placed.push(box);
  };

  /* 1. pinned plates go down exactly as authored */
  items.forEach((it, i) => {
    if (it.x != null && it.y != null) put(i, it.x, it.y);
  });

  /* 2. `after:` plates hang off their target. Repeated because a chain
        (C after B after A) needs its target resolved first; we stop as
        soon as a pass places nothing. */
  const indexOfFile = new Map<string, number>();
  items.forEach((it, i) => {
    if (!indexOfFile.has(it.file)) indexOfFile.set(it.file, i);
  });

  let pending = items
    .map((it, i) => ({ it, i }))
    .filter(({ it, i }) => !boxes[i] && it.after);

  for (let pass = 0; pending.length && pass <= items.length; pass++) {
    const still: typeof pending = [];
    for (const entry of pending) {
      const t = indexOfFile.get(entry.it.after!);
      const target = t == null ? undefined : boxes[t];
      if (!target) { still.push(entry); continue; }
      put(entry.i, target.x, target.y + target.h + PAIR_GAP);
    }
    if (still.length === pending.length) break; // nothing resolved
    pending = still;
  }
  if (import.meta.env.DEV) {
    for (const { it } of pending) {
      console.warn(
        `[photography/${slug}] ${it.file} has after: "${it.after}", which is not a plate in this gallery (or the chain loops back on itself). Flowing it normally.`,
      );
    }
  }

  /* 3. everything else flows into the shortest column */
  const auto = items.map((it, i) => ({ it, i })).filter(({ i }) => !boxes[i]);
  if (auto.length) {
    const widest = Math.max(...items.map((it) => it.w));
    const colW = widest + GUTTER_X;
    const cols = Math.max(3, Math.round(Math.sqrt(auto.length * COL_BIAS)));
    const heads = new Array(cols).fill(MARGIN);

    // a pinned plate raises the head of whatever column it sits in, so
    // the flow starts below it instead of colliding and pushing down
    for (const box of placed) {
      const c = Math.round((box.x - MARGIN) / colW);
      if (c >= 0 && c < cols) heads[c] = Math.max(heads[c], box.y + box.h + GUTTER_Y);
    }

    for (const { it, i } of auto) {
      const rand = seeded(hashSeed(it.file) + i);
      let col = 0;
      for (let c = 1; c < cols; c++) if (heads[c] < heads[col]) col = c;

      const h = it.h + CAPTION_H;
      const x = MARGIN + col * colW + Math.round((rand() - 0.5) * JITTER_X);
      let y = heads[col] + Math.round(rand() * JITTER_Y);

      // slide down past anything already there (pinned plates, mostly)
      for (let guard = 0; guard < items.length * 2; guard++) {
        const clash = placed.find((b) => hits({ x, y, w: it.w, h }, b));
        if (!clash) break;
        y = clash.y + clash.h + GUTTER_Y;
      }

      put(i, x, y);
      heads[col] = y + h + GUTTER_Y;
    }
  }

  return boxes.map((b) => ({ x: b!.x, y: b!.y }));
}

/* ── image pipeline ─────────────────────────────────────────────── */

const LOCAL = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/photography/**/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

const BOARD_MAX = 1400;  // 2x the widest plate on the sheet
const FULL_MAX = 2400;   // what the viewing station opens with
const DETAIL_MAX = 4000; // fetched only if the reader zooms past 1.5x
const INDEX_MAX = 280;   // 2x the 88px row thumb on the plate index
const THUMB_MAX = 160;   // filmstrip

export type ResolvedImage = {
  board: string;
  /** the 1400 derivative on its own, not just embedded in the 1x/2x
   *  string — a full-bleed presentation needs to build its own width
   *  descriptor ladder and cannot parse it back out of boardSrcset. */
  board2x: string;
  boardSrcset?: string;
  full: string;
  detail: string;
  index: string;
  thumb: string;
  width: number;
  height: number;
  optimized: boolean;
};

async function resolveImage(file: string): Promise<ResolvedImage> {
  const mod = LOCAL[`/src/assets/photography/${file}`];

  if (!mod) {
    if (import.meta.env.DEV) {
      console.warn(
        `[photography] ${file} is not in src/assets/photography — serving the unoptimized original from /public. See IMAGE MIGRATION in src/data/photography.ts.`,
      );
    }
    const fallback = `/images/${file}`;
    return {
      board: fallback,
      board2x: fallback,
      boardSrcset: undefined,
      full: fallback,
      detail: fallback,
      index: fallback,
      thumb: fallback,
      width: 1500,
      height: 1000, // assumed 3:2 until the file is a real asset
      optimized: false,
    };
  }

  const src = mod.default;
  const cap = (w: number) => Math.min(w, src.width);

  const [b1, b2, full, index, thumb] = await Promise.all([
    getImage({ src, width: cap(BOARD_MAX / 2), format: 'webp', quality: 78 }),
    getImage({ src, width: cap(BOARD_MAX), format: 'webp', quality: 70 }),
    getImage({ src, width: cap(FULL_MAX), format: 'webp', quality: 84 }),
    getImage({ src, width: cap(INDEX_MAX), format: 'webp', quality: 72 }),
    getImage({ src, width: cap(THUMB_MAX), format: 'webp', quality: 62 }),
  ]);

  const detail =
    src.width > FULL_MAX
      ? await getImage({ src, width: cap(DETAIL_MAX), format: 'webp', quality: 82 })
      : full;

  return {
    board: b1.src,
    board2x: b2.src,
    boardSrcset: `${b1.src} 1x, ${b2.src} 2x`,
    full: full.src,
    detail: detail.src,
    index: index.src,
    thumb: thumb.src,
    width: src.width,
    height: src.height,
    optimized: true,
  };
}

/* ── resolved shapes ────────────────────────────────────────────── */

export type ResolvedPlate = Omit<PlateInput, 'x' | 'y' | 'w'> & {
  /** resolved by the layout — always concrete on a ResolvedPlate */
  x: number;
  y: number;
  w: number;
  img: ResolvedImage;
  /** printed height on the sheet, from the real aspect ratio */
  h: number;
  /** distance from the opening view, for eager-loading */
  d: number;
  index: number;
  no: string;
  plate: string;
  href: string;
  coordinates: string;
  mapUrl: string;
  draft: boolean;
  sellable: boolean;
  printLink: string;
};

export type ResolvedGallery = Omit<GalleryInput, 'plates' | 'centerX' | 'centerY'> & {
  number: string;
  title: string;
  plates: ResolvedPlate[];
  bounds: { minX: number; minY: number; maxX: number; maxY: number };
  /** the sheet, sized to whatever the layout produced */
  boardW: number;
  boardH: number;
  /** the opening view — authored, or the centre of the content */
  centerX: number;
  centerY: number;
  eager: Set<number>;
};

/* ── validation, once, at module load ───────────────────────────── */

for (const g of galleryData) {
  const entry = SERIES.find((s) => s.slug === g.slug);
  if (!entry) {
    throw new Error(
      `[photography] gallery "${g.slug}" has no matching SERIES entry — add one in src/data/photography.ts so its number, title, and registry link are defined.`,
    );
  }
  if (!entry.built) {
    throw new Error(
      `[photography] gallery "${g.slug}" is defined but SERIES still marks it built: false — flip it to true.`,
    );
  }
  if (g.plates.length === 0) {
    throw new Error(
      `[photography] gallery "${g.slug}" has zero plates — the light table has nothing to bound, fit, or open.`,
    );
  }

  /* One image, one plate. A duplicated filename renders the same
     photograph twice under two plate numbers and silently orphans
     whichever file it displaced. */
  const seen = new Map<string, number>();
  g.plates.forEach((p, i) => {
    const first = seen.get(p.file);
    if (first != null) {
      throw new Error(
        `[photography/${g.slug}] ${p.file} is used by both Plate ${plateNo(first)} and Plate ${plateNo(i)}. Each plate needs its own image.`,
      );
    }
    seen.set(p.file, i);

    /* A coordinate off the globe reaches the plate page's schema.org
       block and its map link, where it goes wrong quietly. */
    if (!Number.isFinite(p.lat) || Math.abs(p.lat) > 90) {
      throw new Error(
        `[photography/${g.slug}] Plate ${plateNo(i)} (${p.file}) has lat ${p.lat} — latitude must be between -90 and 90.`,
      );
    }
    if (!Number.isFinite(p.lng) || Math.abs(p.lng) > 180) {
      throw new Error(
        `[photography/${g.slug}] Plate ${plateNo(i)} (${p.file}) has lng ${p.lng} — longitude must be between -180 and 180. A stray leading digit is the usual cause.`,
      );
    }

    /* x without y (or the reverse) is almost always a half-finished
       edit; flowing it silently would hide the mistake. */
    if ((p.x == null) !== (p.y == null)) {
      throw new Error(
        `[photography/${g.slug}] Plate ${plateNo(i)} (${p.file}) has only one of x/y. Give it both to pin it, or neither to let the layout place it.`,
      );
    }
  });
}

for (const s of SERIES) {
  if (s.built && !galleryData.some((g) => g.slug === s.slug)) {
    throw new Error(
      `[photography] SERIES marks "${s.slug}" as built, but no gallery is defined for it — a live registry link would go straight to a 404.`,
    );
  }
}

/* ── build ──────────────────────────────────────────────────────── */

let cache: Promise<ResolvedGallery[]> | null = null;

async function build(): Promise<ResolvedGallery[]> {
  const out: ResolvedGallery[] = [];

  for (const g of galleryData) {
    const entry = SERIES.find((s) => s.slug === g.slug)!;

    /* Images first — the layout needs real aspect ratios to know how
       tall each plate prints, and height is never authored. */
    const sized = await Promise.all(
      g.plates.map(async (p) => {
        const img = await resolveImage(p.file);
        const w = p.w ?? defaultWidth(p.file);
        return { p, img, w, h: Math.round((img.height / img.width) * w) };
      }),
    );

    const positions = layout(
      sized.map(({ p, w, h }) => ({ file: p.file, w, h, x: p.x, y: p.y, after: p.after })),
      g.slug,
    );

    const bounds = sized.reduce(
      (acc, { w, h }, i) => ({
        minX: Math.min(acc.minX, positions[i].x),
        minY: Math.min(acc.minY, positions[i].y),
        maxX: Math.max(acc.maxX, positions[i].x + w),
        maxY: Math.max(acc.maxY, positions[i].y + h + CAPTION_H),
      }),
      { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity },
    );

    /* The sheet is whatever the plates need plus a margin, instead of a
       fixed 3200x2200 that a large series would overflow and a small
       one would rattle around inside. */
    const boardW = Math.max(1200, Math.ceil(bounds.maxX + MARGIN));
    const boardH = Math.max(900, Math.ceil(bounds.maxY + MARGIN));

    const centerX = g.centerX ?? Math.round((bounds.minX + bounds.maxX) / 2);
    const centerY = g.centerY ?? Math.round((bounds.minY + bounds.maxY) / 2);

    const plates = sized.map(({ p, img, w, h }, i) => {
      const { x, y } = positions[i];
      const draft = !p.title;
      return {
        ...p,
        x,
        y,
        w,
        img,
        h,
        d: Math.hypot(x + w / 2 - centerX, y + h / 2 - centerY),
        index: i,
        no: plateNo(i),
        plate: `Plate ${plateNo(i)}`,
        // an untitled plate gets no record page, so it gets no link
        href: draft ? '' : plateHref(g.slug, i),
        coordinates: coordLabel(p.lat, p.lng),
        mapUrl: geoUrl(p.lat, p.lng),
        draft,
        // an unfinished plate is never for sale, whatever the gallery says
        sellable: g.sellable !== false && !draft,
        printLink: p.printLink || '',
      } satisfies ResolvedPlate;
    });

    /* dev-only collision report — hand-placed coordinates drift, and
       the flow only guarantees clearance against what it can see. */
    if (import.meta.env.DEV) {
      for (let i = 0; i < plates.length; i++) {
        for (let j = i + 1; j < plates.length; j++) {
          const a = plates[i], b = plates[j];
          const hit =
            a.x < b.x + b.w && b.x < a.x + a.w &&
            a.y < b.y + b.h + CAPTION_H && b.y < a.y + a.h + CAPTION_H;
          if (hit) {
            console.warn(`[photography/${g.slug}] ${a.plate} and ${b.plate} overlap on the sheet.`);
          }
        }
      }
    }

    out.push({
      ...g,
      number: entry.number,
      title: entry.title,
      plates,
      bounds,
      boardW,
      boardH,
      centerX,
      centerY,
      eager: new Set(
        [...plates].sort((a, b) => a.d - b.d).slice(0, 4).map((p) => p.index),
      ),
    });
  }

  return out;
}

/** Every built gallery, images resolved. Memoized — the routes that
 *  call it share one pass over the image pipeline. */
export function getGalleries(): Promise<ResolvedGallery[]> {
  if (!cache) cache = build();
  return cache;
}

export async function getGallery(slug: string): Promise<ResolvedGallery> {
  const g = (await getGalleries()).find((x) => x.slug === slug);
  if (!g) throw new Error(`[photography] no gallery for slug "${slug}".`);
  return g;
}

/* ── album covers ───────────────────────────────────────────────
   The album page shows one plate per series, including for series that
   have no gallery yet. Reuses the board derivatives (700 / 1400), the
   right size for a 7-of-12 column in a max-w-6xl page. */

export type SeriesCover = SeriesEntry & {
  src: string;
  /** 1x/2x density pair — right for a cover shown in a column. */
  srcset?: string;
  /** Width descriptors for a cover shown FULL BLEED. The board
   *  derivatives stop at 1400, which is visibly soft stretched across a
   *  wide display, so this ladder reaches up through the same 2400 and
   *  4000 files the light table already generates. Nothing new enters
   *  the image pipeline. Pair it with sizes="100vw".
   *
   *  `detail` falls back to `full` when the original has no more pixels,
   *  so the last two entries can name the same file. Harmless — the
   *  browser picks one. */
  wideSrcset: string;
  width: number;
  height: number;
};

let coverCache: Promise<SeriesCover[]> | null = null;

async function buildCovers(): Promise<SeriesCover[]> {
  return Promise.all(
    SERIES.map(async (entry) => {
      const img = await resolveImage(entry.cover);
      return {
        ...entry,
        src: img.board,
        srcset: img.boardSrcset,
        wideSrcset: [
          `${img.board} 700w`,
          `${img.board2x} 1400w`,
          `${img.full} 2400w`,
          `${img.detail} 4000w`,
        ].join(', '),
        width: img.width,
        height: img.height,
      };
    }),
  );
}

/** Every series in registry order, cover image resolved. Memoized. */
export function getCovers(): Promise<SeriesCover[]> {
  if (!coverCache) coverCache = buildCovers();
  return coverCache;
}