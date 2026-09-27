// src/pages/iiif/[collection]/[item]/manifest.json.ts
//
// One IIIF Presentation 3 manifest per item, generated from its record.
//
//   each face (recto, verso, "Case, open")  ->  a Canvas, at the scan's pixel size
//   the image on it                         ->  the 1900px view, with the R2
//                                               tile service attached, which is
//                                               how a viewer reaches full resolution
//   people, details, inscriptions with a
//   region                                  ->  annotations on that canvas, the
//                                               percentages turned into pixels
//   date, photographer, place, people ...   ->  metadata rows
//
// Region annotations all use the `commenting` motivation. `identifying` and
// `supplementing` would be more exact for people and inscriptions, but the
// common viewers only show commenting and tagging in their annotation panels,
// and an identification nobody can see is not much of one.

import type { APIRoute } from 'astro';
import {
  ALL_ITEMS,
  collectionBySlug,
  itemBySlug,
  personById,
  inscriptionFace,
} from '../../../../data/collections/index';
import { naturalName, naturalNameWithDates, RIGHTS } from '../../../../data/collections/types';
import { plate } from '../../../../data/collections/images';
import {
  PRESENTATION_CONTEXT,
  collectionPath,
  manifestPath,
  en,
  row,
  dateWords,
  confidenceLabel,
  xywh,
  iiifImage,
  isIiifRights,
  json,
} from '../../../../data/collections/iiif';

export function getStaticPaths() {
  return ALL_ITEMS.map((i) => ({
    params: { collection: i.collection, item: i.slug },
    props: { slug: i.slug },
  }));
}

const EM = '\u2014';

export const GET: APIRoute = async ({ props, site }) => {
  const item = itemBySlug.get((props as { slug: string }).slug)!;
  const c = collectionBySlug.get(item.collection)!;
  const abs = (p: string) => new URL(p, site ?? 'https://austinlallison.com').href;

  const id = abs(manifestPath(item.collection, item.slug));
  // Canvases and annotations hang off the item's IIIF path, not the .json file.
  const base = abs(`/iiif/${item.collection}/${item.slug}`);
  const permalink = abs(item.href);

  const faces = await Promise.all(
    item.faces.map(async (f) => ({
      key: f.key,
      label: f.label,
      img: await plate(item.collection, f.surrogate.file, f.surrogate),
    }))
  );

  // Every region, as { face, region, text }, in the order the page lists them.
  type Note = { face: string; r: { x: number; y: number; w: number; h: number }; text: string };
  const notes: Note[] = [];

  (item.details ?? []).forEach((d) => notes.push({ face: d.face, r: d, text: d.caption }));

  item.depicts.forEach((d) => {
    if (!d.region) return;
    const name = d.person ? naturalNameWithDates(personById.get(d.person)!) : (d.as as string);
    const conf = confidenceLabel(d.confidence);
    const basis = d.basis ? ` ${d.basis.charAt(0).toUpperCase()}${d.basis.slice(1)}` : '';
    notes.push({
      face: d.region.face ?? 'recto',
      r: d.region,
      text: `${name}${conf ? ` ${EM} ${conf}` : ''}.${basis}`,
    });
  });

  item.inscriptions.forEach((ins) => {
    if (!ins.region) return;
    notes.push({ face: inscriptionFace(ins), r: ins.region, text: ins.text });
  });

  const canvases = faces.map((f) => {
    const canvasId = `${base}/canvas/${f.key}`;
    const W = f.img.width;
    const H = f.img.height;
    const mine = notes.filter((n) => n.face === f.key);

    return {
      id: canvasId,
      type: 'Canvas',
      label: en(f.label),
      width: W,
      height: H,
      thumbnail: [iiifImage(f.img.index, f.img.iiif)],
      items: [
        {
          id: `${canvasId}/page`,
          type: 'AnnotationPage',
          items: [
            {
              id: `${canvasId}/page/image`,
              type: 'Annotation',
              motivation: 'painting',
              target: canvasId,
              body: iiifImage(f.img.view, f.img.iiif),
            },
          ],
        },
      ],
      ...(mine.length
        ? {
            annotations: [
              {
                id: `${canvasId}/regions`,
                type: 'AnnotationPage',
                items: mine.map((n, k) => ({
                  id: `${canvasId}/regions/${k + 1}`,
                  type: 'Annotation',
                  motivation: 'commenting',
                  body: { type: 'TextualBody', value: n.text, format: 'text/plain', language: 'en' },
                  target: `${canvasId}#${xywh(n.r, W, H)}`,
                })),
              },
            ],
          }
        : {}),
    };
  });

  const maker = item.photographer
    ? `${item.photographer.name}${item.photographer.confidence === 'certain' ? '' : ' (attributed)'}`
    : item.studio;

  const people = item.depicts.map((d) => {
    // An unnamed sitter's description already says what is known.
    if (!d.person) return d.as as string;
    const conf = confidenceLabel(d.confidence);
    const name = naturalName(personById.get(d.person)!);
    return conf ? `${name} (${conf.toLowerCase()})` : name;
  });

  const rights = RIGHTS[item.rights.status];
  const rightsText = `${rights.label}${item.rights.note ? ` ${item.rights.note}` : ''}`;

  return json({
    '@context': PRESENTATION_CONTEXT,
    id,
    type: 'Manifest',
    label: en(item.title),
    ...(item.description ? { summary: en(item.description) } : {}),
    metadata: [
      ...row('Date', dateWords(item)),
      ...row(item.photographer ? 'Photographer' : 'Studio', maker),
      ...row('Place', item.place),
      ...row('Format', item.format ? item.format.charAt(0).toUpperCase() + item.format.slice(1) : null),
      ...row('People', ...people),
      ...row('Inscriptions', ...item.inscriptions.map((i) => i.text)),
      ...row('Control number', item.controlNumber),
      ...row('Collection', c.title),
      ...row('Rights', rightsText),
    ],
    requiredStatement: {
      label: en('Attribution'),
      value: en(`${c.title}, collection of Austin Allison. ${rightsText}`),
    },
    ...(isIiifRights(rights.uri) ? { rights: rights.uri } : {}),
    provider: [
      {
        id: abs('/about'),
        type: 'Agent',
        label: en('Austin Allison'),
        homepage: [{ id: abs('/'), type: 'Text', label: en('austinlallison.com'), format: 'text/html' }],
      },
    ],
    homepage: [{ id: permalink, type: 'Text', label: en(item.title), format: 'text/html' }],
    thumbnail: canvases[0].thumbnail,
    partOf: [{ id: abs(collectionPath(item.collection)), type: 'Collection', label: en(c.title) }],
    items: canvases,
  });
};
