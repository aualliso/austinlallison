// src/pages/iiif/collection.json.ts
//
// The top of the tree: every family collection, as IIIF Collections.

import type { APIRoute } from 'astro';
import { collectionBySlug } from '../../data/collections/index';
import {
  PRESENTATION_CONTEXT,
  TOP_COLLECTION_PATH,
  collectionPath,
  en,
  json,
} from '../../data/collections/iiif';

export const GET: APIRoute = ({ site }) => {
  const abs = (p: string) => new URL(p, site ?? 'https://austinlallison.com').href;
  return json({
    '@context': PRESENTATION_CONTEXT,
    id: abs(TOP_COLLECTION_PATH),
    type: 'Collection',
    label: en('Family photographs, collection of Austin Allison'),
    homepage: [{ id: abs('/collections'), type: 'Text', label: en('Collections'), format: 'text/html' }],
    items: [...collectionBySlug.values()].map((c) => ({
      id: abs(collectionPath(c.slug)),
      type: 'Collection',
      label: en(c.title),
    })),
  });
};
