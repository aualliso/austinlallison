// src/pages/collections/[collection]/[item]/record.json.ts
//
// THE RECORD AS DATA: /collections/<collection>/<item>/record.json
//
// One file per photograph, holding what the page holds, in a shape anything
// can read - a future you migrating to other software, a cousin's genealogy
// program, a colleague who asks for your data, or you in ten years when the
// site is gone and the JSON is what is left beside the masters.
//
// IT IS NOT A STANDARD, deliberately. A standard (IIIF, MODS, EAD) is a
// mapping to maintain and a vocabulary to argue with; this is your own model
// written out plainly, which costs nothing to keep true. `record: 1` is there
// so a later change of shape can be told from this one.
//
// Values are as recorded: the date keeps its brackets in `display` AND its
// numbers in `earliest`/`latest`, an identification keeps its confidence and
// its grounds, and a region keeps the percentages it was drawn in.

import type { APIRoute } from 'astro';
import {
  ALL_ITEMS,
  itemBySlug,
  collectionBySlug,
  personById,
  personHref,
  inscriptionFace,
} from '../../../../data/collections/index';
import { naturalName, RIGHTS } from '../../../../data/collections/types';
import { plate } from '../../../../data/collections/images';

export function getStaticPaths() {
  return ALL_ITEMS.map((i) => ({
    params: { collection: i.collection, item: i.slug },
    props: { slug: i.slug },
  }));
}

export const GET: APIRoute = async ({ props, site }) => {
  const { slug } = props as { slug: string };
  const item = itemBySlug.get(slug)!;
  const c = collectionBySlug.get(item.collection)!;
  const base = site ?? new URL('https://austinlallison.com');
  const abs = (path: string) => new URL(path, base).href;

  const faces = await Promise.all(
    item.faces.map(async (f) => {
      const r = await plate(item.collection, f.surrogate.file, f.surrogate);
      return {
        key: f.key,
        label: f.label,
        file: f.surrogate.file,
        width: r.width,
        height: r.height,
        images: {
          thumbnail: abs(r.index),
          view: abs(r.view),
          detail: abs(r.detail),
          study: abs(r.study),
        },
      };
    })
  );

  const rights = RIGHTS[item.rights.status];

  const record = {
    record: 1,
    id: abs(item.href),
    slug: item.slug,
    ...(item.controlNumber ? { controlNumber: item.controlNumber } : {}),
    title: item.title,
    titleSource: item.titleSource,
    ...(item.description ? { description: item.description } : {}),
    collection: { slug: c.slug, title: c.title, url: abs(`/collections/${c.slug}`) },
    ...(item.series ? { series: item.series } : {}),
    date: {
      display: item.date.display,
      ...(item.date.earliest !== undefined ? { earliest: item.date.earliest } : {}),
      ...(item.date.latest !== undefined ? { latest: item.date.latest } : {}),
      confidence: item.date.confidence,
      basis: item.date.basis,
    },
    ...(item.format ? { format: item.format } : {}),
    ...(item.dimensions ? { dimensions: item.dimensions } : {}),
    ...(item.photographer
      ? { photographer: { name: item.photographer.name, confidence: item.photographer.confidence } }
      : {}),
    ...(item.studio ? { studio: item.studio } : {}),
    ...(item.place ? { place: item.place } : {}),
    faces,
    depicts: item.depicts.map((d) => ({
      ...(d.person
        ? {
            person: d.person,
            name: naturalName(personById.get(d.person)!),
            url: abs(personHref(d.person)),
          }
        : { as: d.as }),
      confidence: d.confidence,
      basis: d.basis,
      ...(d.position ? { position: d.position } : {}),
      ...(d.region ? { region: { face: d.region.face ?? 'recto', ...d.region } } : {}),
    })),
    inscriptions: item.inscriptions.map((ins) => ({
      location: ins.location,
      medium: ins.medium,
      text: ins.text,
      ...(ins.hand ? { hand: ins.hand } : {}),
      ...(ins.note ? { note: ins.note } : {}),
      ...(ins.datesSubjectNotObject ? { datesSubjectNotObject: true } : {}),
      ...(ins.region ? { region: { face: inscriptionFace(ins), ...ins.region } } : {}),
    })),
    ...(item.details?.length
      ? { details: item.details.map((d) => ({ ...d })) }
      : {}),
    ...(item.related?.length
      ? {
          related: item.related.map((r) => ({
            slug: r.slug,
            relation: r.relation,
            url: abs(itemBySlug.get(r.slug)!.href),
          })),
        }
      : {}),
    ...(item.provenance ? { provenance: item.provenance } : {}),
    rights: {
      status: item.rights.status,
      statement: rights.statement,
      uri: rights.uri,
      ...(item.rights.note ? { note: item.rights.note } : {}),
    },
  };

  return new Response(JSON.stringify(record, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
