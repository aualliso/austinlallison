// src/pages/iiif/[collection]/collection.json.ts
//
// One IIIF Collection per family collection, listing its items' manifests in
// the same order as the collection page.

import type { APIRoute } from 'astro';
import { collectionBySlug, itemsOf } from '../../../data/collections/index';
import { plate } from '../../../data/collections/images';
import {
  PRESENTATION_CONTEXT,
  TOP_COLLECTION_PATH,
  collectionPath,
  manifestPath,
  en,
  iiifImage,
  json,
} from '../../../data/collections/iiif';

export function getStaticPaths() {
  return [...collectionBySlug.values()].map((c) => ({
    params: { collection: c.slug },
    props: { slug: c.slug },
  }));
}

export const GET: APIRoute = async ({ props, site }) => {
  const c = collectionBySlug.get((props as { slug: string }).slug)!;
  const abs = (p: string) => new URL(p, site ?? 'https://austinlallison.com').href;

  const items = await Promise.all(
    itemsOf(c.slug).map(async (i) => {
      const r = await plate(i.collection, i.recto.file, i.recto);
      return {
        id: abs(manifestPath(i.collection, i.slug)),
        type: 'Manifest',
        label: en(i.title),
        thumbnail: [iiifImage(r.index, r.iiif)],
      };
    })
  );

  return json({
    '@context': PRESENTATION_CONTEXT,
    id: abs(collectionPath(c.slug)),
    type: 'Collection',
    label: en(c.title),
    homepage: [{ id: abs(`/collections/${c.slug}`), type: 'Text', label: en(c.title), format: 'text/html' }],
    partOf: [{ id: abs(TOP_COLLECTION_PATH), type: 'Collection' }],
    items,
  });
};
