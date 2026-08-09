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
 * — so a plate described once is described everywhere. This used to
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
 *         emits them as schema.org GeoCoordinates.
 *  x/y/w  position on the 3200x2200 light table sheet. Height comes
 *         from the real image.
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

export const BOARD_W = 3200;
export const BOARD_H = 2200;
export const CAPTION_H = 22; // caption row under each print, for bounds
export const LICENSE_EMAIL = 'hello@austinlallison.com';
export const PHOTOGRAPHER = 'Austin Allison';

/* ── types ──────────────────────────────────────────────────────── */

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
};

export type PlateInput = {
  file: string;
  title: string;
  place: string;
  lat: number;
  lng: number;
  specs: string;
  x: number;
  y: number;
  w: number;
  caption?: string;
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
  centerX: number;
  centerY: number;
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
    lede: "A gallery of the vertical escarpments outlining the edges of our country's plateaus. This collection captures the jarring drops of these areas under natural light. Encompassing three states, this gallery only captures a small portion of our nation's plateaus and escarpments.",
    cover: 'escarpments/escarpment5.jpg',
    coverLabel: 'Plate 1.05 \u00B7 Little Jerusalem',
  },
  {
    slug: 'water_on_the_llano_estacado',
    number: 'II',
    title: 'Water on the Llano Estacado',
    built: true,
    lede: 'A documentary index isolating the diminutive water sources of the Llano Estacado.',
    cover: 'water/water1.jpg',
    coverLabel: 'Plate 2.01 \u00B7 Tule Creek',
  },
  {
    slug: 'cotton_gins',
    number: 'III',
    title: 'Cotton Gins of Texas',
    built: false,
    lede: 'An intentional survey of the remnant legacy cotton gins in West Texas. No longer in use, these sentinels of the plains register stories of economic prosperity dating back more than a century.',
    cover: 'cotton_gins/dumont.jpg',
    coverLabel: 'Plate 3.01 \u00B7 Dumont',
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
        x: 820, y: 280, w: 400,
        caption: 'Overlooking Buckley Coulee near Sunburst and Sweet Grass, Montana. This dramatic 200-foot drop reveals incredible rugged rock formations. A small piece of "Little Jerusalem" and its hoodoos can be seen in the foreground.',
        printLink: '', // TODO: Stripe Payment Link
      },
      {
        file: 'escarpments/escarpment2.jpg',
        title: 'Blooming Stratification',
        place: 'Garza County, Texas',
        lat: 33.090300, lng: -101.500369,
        specs: '14mm \u00B7 \u0192/8 \u00B7 1/320s',
        x: 1670, y: 300, w: 450,
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
        x: 980, y: 900, w: 300,
        caption: 'Looking down into the canyon near Palouse Falls, Washington. The dark, tiered basalt cliffs drop nearly 200 feet into the gorge, where the river winds through steep talus slopes, pale sagebrush, and golden summer grasses. A striking reminder of the power of the ancient Missoula Floods that shaped the Pacific Northwest landscape.',
      },
      {
        file: 'escarpments/escarpment4.jpg',
        title: 'The Sea of Red and Cedar',
        place: 'Briscoe County, Texas',
        lat: 34.465959, lng: -101.098786,
        specs: '12mm \u00B7 \u0192/2.8 \u00B7 1/2000s',
        x: 1275, y: 280, w: 350,
        caption: 'An aerial look over the North Prong Little Red River country in Briscoe County, Texas. The vivid red clay and sandstone canyon walls contrast against a sea of vibrant green juniper and mesquite, showing off the wild, rugged beauty carved along the edge of the Caprock.',
      },
      {
        file: 'escarpments/escarpment5.jpg',
        title: 'Little Jerusalem Hoodoos',
        place: 'Toole County, Montana',
        lat: 48.968683, lng: -111.982261,
        specs: '12mm \u00B7 \u0192/3.5 \u00B7 1/1250s',
        x: 1310, y: 870, w: 340,
        caption: 'A closer look at the remarkable rock spires and caprock formations lining Buckley Coulee near Sunburst, Montana. Sculpted over centuries by wind and water, these sandstone hoodoos stand guard right where the flat prairie plunges down into the valley floor.',
      },
      {
        file: 'escarpments/escarpment6.jpg',
        title: 'Upper Yellow House Draw Canyon',
        place: 'Bailey County, Texas',
        lat: 33.851419, lng: -102.700752,
        specs: '12mm \u00B7 \u0192/2.8 \u00B7 1/2000s',
        x: 1750, y: 520, w: 400,
        caption: 'An aerial perspective of the Upper Yellow House Draw in Bailey County, Texas. Unlike the near-vertical cliffs further east, this escarpment shows a gentler break in the Llano Estacado, a shallow valley carved into the tableland where caliche ledges, winter native grasses, and a quiet stock pond break up the endless, flat horizon.',
      },
      {
        file: 'escarpments/escarpment7.jpg',
        title: 'Little Jerusalem with Sweetgrass Hills',
        place: 'Toole County, Montana',
        lat: 48.966829, lng: -111.965596,
        specs: '12mm \u00B7 \u0192/2.8 \u00B7 1/200s',
        x: 1720, y: 780, w: 400,
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
        x: 600, y: 600, w: 400,
        caption: 'A ground-level perspective from the floor of Tule Canyon in Briscoe County, Texas. The reddish waters of Tule Creek weave through golden grasses, framed by towering, multi-layered cliffs of white gypsum, red mudstone, and rugged caprock bluffs under a bright Panhandle sky.',
      },
      {
        file: 'escarpments/escarpment9.jpg',
        title: 'White Over Yellowhouse Canyon',
        place: 'Lubbock County, Texas',
        lat: 33.494000, lng: -101.635000,
        specs: '12mm \u00B7 \u0192/2.2 \u00B7 1/4000s',
        x: 1700, y: 1050, w: 400,
        caption: 'An aerial look over Yellowhouse Canyon near Lubbock after a West Texas snowfall. The dark, meandering waters of the North Fork Double Mountain Fork River curl through a blanket of white, highlighting the rugged mesa bluffs and dormant mesquite brush.',
      },
      {
        file: 'escarpments/escarpment10.jpg',
        title: 'Walls of the Pecos',
        place: 'Val Verde County, Texas',
        lat: 29.720860, lng: -101.347319,
        specs: '12mm \u00B7 \u0192/5.6 \u00B7 1/1000s',
        x: 1300, y: 1100, w: 360,
        caption: 'Vertical limestone cliffs, olive-green waters, and endless desert tableland. Looking down the sheer escarpments of the Pecos River canyon in Val Verde County.',
      },
      {
        file: 'escarpments/escarpment11.jpg',
        title: 'Brazos Palisades',
        place: 'Garza County, Texas',
        lat: 33.090300, lng: -101.500369,
        specs: '12mm \u00B7 \u0192/5.6 \u00B7 1/1000s',
        x: 1050, y: 550, w: 660,
        caption: 'A panoramic look across the badlands of Garza County, Texas. In the foreground, deeply eroded red clay mounds and pale caliche tell the story of thousands of years of runoff, while the flat, unbroken rim of the Caprock Escarpment stands tall along the distant horizon.',
      },
      {
        file: 'escarpments/escarpment12.jpg',
        title: 'Along the Cache la Poudre',
        place: 'Larimer County, Colorado',
        lat: 40.681113, lng: -105.235401,
        specs: '12mm \u00B7 \u0192/4.4 \u00B7 1/320s',
        x: 950, y: 1150, w: 300,
        caption: 'Rooted in the cracks of ancient, tilted granite, a lone pine stands tall over the rugged foothills of the Cache la Poudre Canyon.',
        printLink: '',
      },
      {
        file: 'escarpments/escarpment13.jpg',
        title: 'Lakeside Autumn',
        place: 'Bailey County, Texas',
        lat: 33.957391, lng: -102.753125,
        specs: '20mm \u00B7 \u0192/5.6 \u00B7 1/60s',
        x: 2170, y: 650, w: 300,
        caption: 'Some shallower escarpments drop into intermittent lakes. This view shows the autumn sun rising over the Muleshoe Wildlife Refuge. The summer view can be seen in Plate 14.',
      },
      {
        file: 'escarpments/escarpment14.jpg',
        title: 'Lakeside Summer',
        place: 'Bailey County, Texas',
        lat: 33.957391, lng: -102.753125,
        specs: '20mm \u00B7 \u0192/5.6 \u00B7 1/60s',
        x: 2140, y: 880, w: 300,
        caption: 'As with Plate 13, this view shows the shallow descent into an intermittent lake at the Muleshoe Wildlife Refuge.',
      },
    ],
  },
  {
    slug: 'water_on_the_llano_estacado',
    // Set to false while nine of these twelve plates are untitled and
    // share one set of coordinates. A licensing inquiry for "Plate 04,
    // in preparation" is not an inquiry you want to receive. Flip to
    // true once the metadata is filled in.
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
        x: 750, y: 250, w: 250,
        caption: 'Tule Creek originates on the Llano Estacado and descends the caprock carving a broad canyon through Briscoe and Swisher counties. The creek assumes the rust color as it flows east.'
      },
      {
        file: 'water/water2.jpg',
        title: 'Canadian River Boundary',
        place: 'Hemphill County, Texas',
        lat: 35.937055, lng: -100.369943,
        specs: '12mm \u00B7 \u0192/5.6 \u00B7 1/500s',
        x: 320, y: 200, w: 400,
        caption: 'The Canadian River signifies the northern extent of the Llano Estacado for much of its northern extent. This view in Hemphill County shows the meandering river at sunset.',
      },
      {
        file: 'water/water3.jpg',
        title: 'Flowing Running Water Draw',
        place: 'Parmer County, Texas',
        lat: 34.471036, lng: -102.720865, 
        specs: '12mm \u00B7 \u0192/5.6 \u00B7 1/640s',
        x: 1100, y: 180, w: 400,
        caption: 'Running Water Draw after a heavy rain in Parmer County, Texas. After head precipitation upstream, intermittent draws and creeks on the Llano Estacado can flow for periods before returning to their dry state.'
      },
      // ── untitled below: empty title marks a plate as in preparation.
      // The coordinates and specs are placeholders copied across all of
      // them; they'll want real values before this gallery is sellable.
      {
        file: 'water/water4.jpg',
        title: 'Winter Oasis', place: 'Bailey County, Texas',
        lat: 33.990590, lng: -1102.702870,
        specs: '12mm \u00B7 \u0192/2.8 \u00B7 1/3200s',
        x: 1080, y: 480, w: 400,
        caption: 'Remnant water in a lake basin as the season evolves to winter. Winter months on the Llano Estacado are its driest period, but remnant autumn precipitation and occasional fall and winter rain can fill these basins water for a short time.'
      },
      {
        file: 'water/water5.jpg',
        title: 'Reflections and Fractures', place: 'Bailey County, Texas',
        lat: 33.990590, lng: -1102.702870,
        specs: '12mm \u00B7 \u0192/2.8 \u00B7 1/3200s',
        x: 880, y: 750, w: 400,
        caption: 'Water in intermittently dry lake basins offer clear reflections of the sky above, while revealing fractures in the lake\'s underlying surface, a reminder of the Llano Estacado\'s arid climate and the ephemeral nature of these water sources.'
      },
      {
        file: 'water/water14.jpg',
        title: '', place: '',
        lat: 33.991164, lng: -102.708448,
        specs: '12mm \u00B7 \u0192/2.8 \u00B7 1/3200s',
        x: 1510, y: 250, w: 400,
      },
      {
        file: 'water/water7.jpg',
        title: '', place: '',
        lat: 33.991164, lng: -102.708448,
        specs: '12mm \u00B7 \u0192/2.8 \u00B7 1/3200s',
        x: 1510, y: 550, w: 400,
      },
      {
        file: 'water/water8.jpg',
        title: '', place: '',
        lat: 33.991164, lng: -102.708448,
        specs: '12mm \u00B7 \u0192/2.8 \u00B7 1/3200s',
        x: 460, y: 720, w: 400,
      },
      {
        file: 'water/water9.jpg',
        title: '', place: '',
        lat: 33.991164, lng: -102.708448,
        specs: '12mm \u00B7 \u0192/2.8 \u00B7 1/3200s',
        x: 1310, y: 880, w: 400,
      },
      {
        file: 'water/water12.jpg',
        title: '', place: '',
        lat: 33.991164, lng: -102.708448,
        specs: '12mm \u00B7 \u0192/2.8 \u00B7 1/3200s',
        x: 395, y: 470, w: 300,
      },
      {
        file: 'water/water13.jpg',
        title: '', place: '',
        lat: 33.991164, lng: -102.708448,
        specs: '12mm \u00B7 \u0192/2.8 \u00B7 1/3200s',
        x: 395, y: 990, w: 300,
      },
      {
        file: 'water/water14.jpg',
        title: '', place: '',
        lat: 33.991164, lng: -102.708448,
        specs: '12mm \u00B7 \u0192/2.8 \u00B7 1/3200s',
        x: 795, y: 1020, w: 300,
      },
    ],
  },
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

export type ResolvedPlate = PlateInput & {
  img: ResolvedImage;
  /** printed height on the sheet, from the real aspect ratio */
  h: number;
  /** distance from the composed opening view, for eager-loading */
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

export type ResolvedGallery = Omit<GalleryInput, 'plates'> & {
  number: string;
  title: string;
  plates: ResolvedPlate[];
  bounds: { minX: number; minY: number; maxX: number; maxY: number };
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

    const plates = await Promise.all(
      g.plates.map(async (p, i) => {
        const img = await resolveImage(p.file);
        const h = Math.round((img.height / img.width) * p.w);
        const draft = !p.title;
        return {
          ...p,
          img,
          h,
          d: Math.hypot(p.x + p.w / 2 - g.centerX, p.y + h / 2 - g.centerY),
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
      }),
    );

    const bounds = plates.reduce(
      (acc, p) => ({
        minX: Math.min(acc.minX, p.x),
        minY: Math.min(acc.minY, p.y),
        maxX: Math.max(acc.maxX, p.x + p.w),
        maxY: Math.max(acc.maxY, p.y + p.h + CAPTION_H),
      }),
      { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity },
    );

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
      eager: new Set(
        [...plates].sort((a, b) => a.d - b.d).slice(0, 4).map((p) => p.index),
      ),
    });
  }

  return out;
}

/** Every built gallery, images resolved. Memoized — the three routes
 *  that call it share one pass over the image pipeline. */
export function getGalleries(): Promise<ResolvedGallery[]> {
  if (!cache) cache = build();
  return cache;
}

/* ── album covers ───────────────────────────────────────────────
   The album page shows one plate per series, including for series that
   have no gallery yet. Reuses the board derivatives (700 / 1400), which
   is the right size for a 7-of-12 column in a max-w-6xl page. */

export type SeriesCover = SeriesEntry & {
  src: string;
  srcset?: string;
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

export async function getGallery(slug: string): Promise<ResolvedGallery> {
  const g = (await getGalleries()).find((x) => x.slug === slug);
  if (!g) throw new Error(`[photography] no gallery for slug "${slug}".`);
  return g;
}