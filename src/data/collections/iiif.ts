// src/data/collections/iiif.ts
//
// Shared pieces for the IIIF Presentation 3 endpoints under src/pages/iiif/.
// The manifests are GENERATED from the same records the pages use, on every
// build, so they can never drift from the description.
//
//   /iiif/collection.json                           every collection
//   /iiif/<collection>/collection.json              one collection's items
//   /iiif/<collection>/<item>/manifest.json         one item
//
// Images come from R2 (iiif.austinlallison.com); only these small JSON files
// live on the site itself. public/_headers opens /iiif/* to other sites, which
// is what lets Mirador and other viewers load them.

import { spanOf } from './index';

export const PRESENTATION_CONTEXT = 'http://iiif.io/api/presentation/3/context.json';

export const manifestPath = (collection: string, item: string) =>
  `/iiif/${collection}/${item}/manifest.json`;
export const collectionPath = (collection: string) => `/iiif/${collection}/collection.json`;
export const TOP_COLLECTION_PATH = '/iiif/collection.json';

/** A IIIF language map. Everything on this site is English. */
export const en = (...values: string[]) => ({ en: values });

/** One metadata row, skipped when empty. */
export const row = (label: string, ...values: (string | null | undefined | false)[]) => {
  const v = values.filter((x): x is string => !!x && x.trim() !== '');
  return v.length ? [{ label: en(label), value: en(...v) }] : [];
};

/** The date in words, the way the item page writes it. */
export function dateWords(item: Parameters<typeof spanOf>[0] & { date: { confidence: string } }): string {
  const span = spanOf(item);
  const approx = item.date.confidence === 'probable' || item.date.confidence === 'possible';
  if (!span) return 'Undated';
  if (span.openStart) return `In or before ${span.to}`;
  if (span.openEnd) return `In or after ${span.from}`;
  if (span.from === span.to) return `${approx ? 'About' : 'In'} ${span.from}`;
  return `Between ${span.from} and ${span.to}`;
}

/** 'certain' says nothing; any doubt is spelled out. */
export const confidenceLabel = (conf: string) =>
  conf === 'certain' ? '' : conf.charAt(0).toUpperCase() + conf.slice(1);

/** A percentage region as a pixel media fragment on a canvas of W x H. */
export function xywh(r: { x: number; y: number; w: number; h: number }, W: number, H: number): string {
  const px = (v: number, of: number) => Math.round((v / 100) * of);
  return `xywh=${px(r.x, W)},${px(r.y, H)},${Math.max(1, px(r.w, W))},${Math.max(1, px(r.h, H))}`;
}

/**
 * A pre-made image from the tiling script, as JPEG (what IIIF viewers expect)
 * with its pixel size, read back out of the URL images.ts wrote.
 */
export function iiifImage(webpUrl: string, service: string) {
  const m = webpUrl.match(/\/full\/(\d+),(\d+)\/0\/default\.webp$/);
  if (!m) throw new Error(`[iiif] Unexpected image URL: ${webpUrl}`);
  return {
    id: webpUrl.replace(/default\.webp$/, 'default.jpg'),
    type: 'Image',
    format: 'image/jpeg',
    width: Number(m[1]),
    height: Number(m[2]),
    service: [{ id: service, type: 'ImageService3', profile: 'level0' }],
  };
}

/**
 * IIIF's `rights` only accepts Creative Commons or RightsStatements.org URIs,
 * and only in their http:// form, though both sites now publish https://.
 * Returns the IIIF form, or null when the URI is from anywhere else.
 */
export function iiifRights(uri: string): string | null {
  const m = uri.match(
    /^https?:\/\/(creativecommons\.org\/(?:licenses|publicdomain)\/.+|rightsstatements\.org\/vocab\/.+)$/
  );
  return m ? `http://${m[1]}` : null;
}

export const json = (body: unknown) =>
  new Response(JSON.stringify(body, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
