// src/data/collections/index.ts
//
// REGISTRATION IS EXPLICIT, and that is a deliberate change from
// src/data/publications/index.ts, which globs its folder.
//
// The glob earns its keep there because publications are MANY MODULES with a
// FEW facts each - one file per article, and forgetting to register one is how
// two finished article pages went missing. Collections are the other shape:
// a HANDFUL OF MODULES with MANY items each. You will add a collection maybe
// five times ever, and you cannot forget one, because a collection nobody has
// registered is also a collection nobody has written.
//
// What the explicit list buys instead: a malformed collection module is a red
// squiggle in your editor at the import below, not a thrown error at build
// time. Through a glob, every module arrives typed as `unknown`-ish and the
// type system has nothing to check against.
//
// TO ADD A COLLECTION: import it, add it to the array. Two lines.

import type {
  Collection,
  Item,
  Person,
  Confidence,
  ResolvedItem,
  Surrogate,
} from './types';

/** A view's label, reduced to a key: 'Case, open' -> 'case-open'. */
const faceKey = (label: string) =>
  label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
import { UNDATED_ESTIMATE, heading, naturalName } from './types';
import { PEOPLE, personById, NAME_INDEX } from './people';

import { COLLECTION as SWANN_FAMILY } from './swann-family';
import { COLLECTION as THOMAS_FAMILY } from './thomas-family';

const REGISTERED: Collection[] = [
  SWANN_FAMILY,
  THOMAS_FAMILY,
];

export const COLLECTIONS: Collection[] = [...REGISTERED].sort((a, b) =>
  a.title.localeCompare(b.title)
);

/**
 * Every item, with the collection's defaults folded in. Pages read THIS, so
 * they never test for a missing date, an absent rights statement or an
 * undefined array.
 */
export const ALL_ITEMS: ResolvedItem[] = COLLECTIONS.flatMap((c) =>
  c.items.map((i): ResolvedItem => {
    const d = c.defaults ?? {};
    const rights = i.rights ?? d.rights ?? { status: 'undetermined' as const };
    const basisFor = (b?: string) =>
      b ?? i.identificationBasis ?? d.identificationBasis;

    const withCapture = (sur: Surrogate) => ({
      ...sur,
      capture: sur.capture ?? d.capture ?? 'unrecorded',
    });

    // Every view of the object, in display order, labelled and keyed.
    const faces: ResolvedItem['faces'] = [
      { key: 'recto', label: i.recto.label ?? 'Recto', surrogate: withCapture(i.recto) },
    ];
    if (i.verso) {
      faces.push({
        key: 'verso',
        label: i.verso.label ?? 'Verso',
        surrogate: withCapture(i.verso),
      });
    }
    (i.views ?? []).forEach((v, n) => {
      const label = v.label ?? `View ${n + 3}`;
      const key = faceKey(label) || `view-${n + 1}`;
      faces.push({ key, label, surrogate: withCapture(v) });
    });

    const keys = new Set(faces.map((f) => f.key));
    if (keys.size !== faces.length) {
      throw new Error(
        `${i.slug}: two views resolve to the same key. Give them labels that ` +
          `differ by more than punctuation.`
      );
    }
    for (const det of i.details ?? []) {
      if (!keys.has(det.face)) {
        throw new Error(
          `${i.slug}: detail "${det.caption}" is on face "${det.face}", which ` +
            `this item does not have. Valid faces: ${[...keys].join(', ')}.`
        );
      }
    }

    return {
      ...i,
      collection: c.slug,
      faces,
      href: `/collections/${c.slug}/${i.slug}`,
      titleSource: i.titleSource ?? 'supplied',
      date: i.date ?? UNDATED_ESTIMATE,
      place: i.place ?? d.place,
      recto: withCapture(i.recto),
      verso: i.verso ? withCapture(i.verso) : undefined,
      inscriptions: i.inscriptions ?? [],
      rights,
      depicts: (i.depicts ?? []).map((dep) => {
        const basis = basisFor(dep.basis);
        if (!basis) {
          throw new Error(
            `${i.slug} names "${dep.person ?? dep.as}" with no basis, and ` +
              `neither the item nor the collection sets a default. Say where ` +
              `the name came from, or set identificationBasis once for the item.`
          );
        }
        return { ...dep, basis };
      }),
    };
  })
);

/* ------------------------------------------------------------------ *
 * Integrity. These throw at build rather than producing a page that is
 * quietly wrong, which is the failure mode that matters in a collection
 * whose whole claim is that its identifications are traceable.
 * ------------------------------------------------------------------ */

const registeredSlugs = new Set(REGISTERED.map((c) => c.slug));
if (registeredSlugs.size !== REGISTERED.length) {
  throw new Error('Two collections share a slug in the REGISTERED list above.');
}

// /collections/names is the authority file, and a static route wins over a
// dynamic one - so a collection slugged 'names' would be unreachable with no
// error to tell you why.
const RESERVED_SLUGS = new Set(['names']);
for (const c of REGISTERED) {
  if (RESERVED_SLUGS.has(c.slug)) {
    throw new Error(
      `Collection slug "${c.slug}" is reserved by a page route. Rename it.`
    );
  }
}

const seenSlugs = new Set<string>();
// Control numbers are checked only among the items that HAVE one - an
// identifier only some records carry cannot be the thing that holds the
// system together, so it is validated but never depended on.
const seenControlNumbers = new Set<string>();

for (const item of ALL_ITEMS) {
  if (seenSlugs.has(item.slug)) throw new Error(`Duplicate item slug: ${item.slug}`);
  seenSlugs.add(item.slug);

  if (item.controlNumber) {
    if (seenControlNumbers.has(item.controlNumber)) {
      throw new Error(
        `Duplicate control number ${item.controlNumber} (on ${item.slug}).`
      );
    }
    seenControlNumbers.add(item.controlNumber);
  }

  for (const d of item.depicts) {
    if (d.person && !personById.has(d.person)) {
      throw new Error(
        `${item.slug} depicts unknown person "${d.person}". Add a record to people.ts.`
      );
    }
    if (!d.person && !d.as) {
      throw new Error(
        `${item.slug} has a depiction with neither a person nor an "as" name.`
      );
    }
  }
}

for (const item of ALL_ITEMS) {
  for (const r of item.related ?? []) {
    if (!seenSlugs.has(r.slug)) {
      throw new Error(`${item.slug} relates to unknown item "${r.slug}".`);
    }
  }
}

for (const p of PEOPLE) {
  for (const r of p.relations ?? []) {
    if (!personById.has(r.person)) {
      throw new Error(`${p.id} has a relation to unknown person "${r.person}".`);
    }
  }
}

/* ------------------------------------------------------------------ *
 * The joins
 * ------------------------------------------------------------------ */

export type Appearance = {
  item: ResolvedItem;
  confidence: Confidence;
  basis: string;
};

/** Every appearance of a person, across every collection. */
export const appearancesOf = (personId: string): Appearance[] =>
  ALL_ITEMS.flatMap((item) =>
    item.depicts
      .filter((d) => d.person === personId)
      .map((d) => ({ item, confidence: d.confidence, basis: d.basis }))
  );

/** People who appear in at least one item, with their appearance count. */
export const PEOPLE_WITH_ITEMS: { person: Person; appearances: Appearance[] }[] =
  PEOPLE.map((person) => ({ person, appearances: appearancesOf(person.id) }))
    .filter((p) => p.appearances.length > 0)
    .sort((a, b) => heading(a.person).localeCompare(heading(b.person)));

/**
 * People who are documented but not pictured - named on a verso, or entered
 * as somebody's child. They still deserve a record; a name on the back of a
 * photograph is evidence whether or not the face is in the frame.
 */
/**
 * Documented but not pictured - named on a verso, or entered as somebody's
 * child. NOT a section on the people index; these records exist because
 * relations point at them and because a search for the name should still land
 * somewhere. Use it if you ever want a completeness report.
 */
export const PEOPLE_WITHOUT_ITEMS: Person[] = PEOPLE.filter(
  (p) => appearancesOf(p.id).length === 0
).sort((a, b) => a.authorized.localeCompare(b.authorized));

/**
 * INTERNAL. `needsWork` is a cataloguer's worklist and is not page content -
 * a described collection should not advertise itself as an unfinished one.
 * Kept exported so you can run it as a report on yourself.
 */
export const OPEN_QUESTIONS: { item: ResolvedItem; question: string }[] =
  ALL_ITEMS.flatMap((item) =>
    (item.needsWork ?? []).map((question) => ({ item, question }))
  );

/** Items with at least one unidentified or possible sitter. */
export const NEEDS_IDENTIFICATION = ALL_ITEMS.filter((i) =>
  i.depicts.some((d) => d.confidence === 'unidentified' || d.confidence === 'possible')
);

/** Items whose date rests on nothing. */
export const UNDATED = ALL_ITEMS.filter((i) => i.date.confidence === 'unidentified');

export const collectionBySlug = new Map(COLLECTIONS.map((c) => [c.slug, c]));

/** Items of one collection, in the order their series are declared. */
export const itemsOf = (slug: string): ResolvedItem[] => {
  const c = collectionBySlug.get(slug);
  if (!c) return [];
  const order = new Map(c.series.map((s, i) => [s.id, i]));
  return ALL_ITEMS.filter((i) => i.collection === slug).sort(
    (a, b) =>
      (order.get(a.series ?? '') ?? 99) - (order.get(b.series ?? '') ?? 99) ||
      a.title.localeCompare(b.title)
  );
};

/** Person href, kept in one place so the pages cannot disagree. */
export const personHref = (id: string) => `/collections/names/${id}`;

/**
 * Who is in a photograph, in reading order, for an inventory row. Falls back
 * to the depiction's own `as` string for anyone with no authority record.
 */
export const depictedNames = (item: ResolvedItem): string[] =>
  item.depicts.map((d) => {
    const p = d.person ? personById.get(d.person) : undefined;
    return p ? naturalName(p) : (d.as as string);
  });
export const itemBySlug = new Map(ALL_ITEMS.map((i) => [i.slug, i]));

/** Lookup by your internal number, for the items that have one. */
export const itemByControlNumber = new Map(
  ALL_ITEMS.filter((i) => i.controlNumber).map((i) => [i.controlNumber as string, i])
);

/** Items not yet given a control number - a worklist, not a problem. */
export const UNNUMBERED = ALL_ITEMS.filter((i) => !i.controlNumber);

export { PEOPLE, personById, NAME_INDEX };
export { heading, headingDates, naturalName, naturalNameWithDates } from './types';
export type { Collection, Item, Person, ResolvedItem };