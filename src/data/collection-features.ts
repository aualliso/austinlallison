// src/data/collection-features.ts
//
// What the home page's Collections leaf (leaf 04 of src/pages/index.astro)
// shows. Everything is derived from the collections data, so nothing here
// is hand-maintained: add a collection or describe more photographs and
// the leaf follows on the next build.
//
// ROWS    one per collection, in the order COLLECTIONS files them, with
//         the number of items described in it.
//
// PRINTS  three of the prints the collections guide lays on its table.
//         The picks are made the way src/pages/collections/index.astro
//         makes them (TABLE_N items spread evenly across the dates), so
//         the two pages draw from the same handful. From those the leaf
//         takes one upright print and two wide ones, because that is the
//         shape its three slots are cut for: see .print--1 to .print--3
//         in index.astro. It is the same three on every build until the
//         records change.
//
// The images are plate()'s `index` rung, the transform the guide's table
// and the inventories already ask for, so this adds no files to the build.

import { COLLECTIONS, ALL_ITEMS, itemsOf, spanOf } from './collections/index';
import type { ResolvedItem } from './collections/index';
import { plate } from './collections/images';
import type { Rendered } from './collections/images';

export interface CollectionRow {
  title: string;
  href: string;
  count: number;
}

export interface CollectionPrint {
  src: string;
  srcset?: string;
  width: number;
  height: number;
  /** Title and date, as the guide's table labels it. */
  label: string;
  href: string;
}

// Keep equal to TABLE_N in src/pages/collections/index.astro, or the two
// pages stop drawing from the same prints.
const TABLE_N = 8;

// How far from square a print has to be before it counts as upright or
// wide. Anything in between only fills a slot nothing else can.
const UPRIGHT = 0.9;
const WIDE = 1.1;

type Laid = { item: ResolvedItem; r: Rendered; shape: number };

export async function collectionFeatures(): Promise<{
  rows: CollectionRow[];
  prints: CollectionPrint[];
}> {
  const rows = COLLECTIONS.map((c) => ({
    title: c.title,
    href: `/collections/${c.slug}`,
    count: itemsOf(c.slug).length,
  }));

  // the guide's table picks, earliest first
  const byDate = [...ALL_ITEMS].sort(
    (a, b) =>
      (spanOf(a)?.from ?? Infinity) - (spanOf(b)?.from ?? Infinity) ||
      a.slug.localeCompare(b.slug)
  );
  const picks =
    byDate.length <= TABLE_N
      ? byDate
      : Array.from(
          { length: TABLE_N },
          (_, n) => byDate[Math.round((n * (byDate.length - 1)) / (TABLE_N - 1))]
        );

  const laid: Laid[] = await Promise.all(
    picks.map(async (item) => {
      const r = await plate(item.collection, item.recto.file, item.recto);
      return { item, r, shape: r.width / r.height };
    })
  );

  // Slot 1 wants an upright print; slots 2 and 3 want wide ones, taken
  // from the two ends of the dates so they are not near-twins. A slot
  // with no print of its shape takes whatever is left, earliest first.
  const upright = laid.find((p) => p.shape < UPRIGHT);
  const wide = laid.filter((p) => p.shape > WIDE);
  const chosen: (Laid | undefined)[] = [upright, wide[0], wide.length > 1 ? wide[wide.length - 1] : undefined];
  const spare = laid.filter((p) => !chosen.includes(p));
  const slots = chosen.map((p) => p ?? spare.shift()).filter((p): p is Laid => !!p);

  const prints = slots.map(({ item, r }) => ({
    src: r.index,
    srcset: r.indexSrcset,
    width: r.width,
    height: r.height,
    label: [item.title, item.date?.display].filter(Boolean).join(', '),
    href: item.href,
  }));

  return { rows, prints };
}
