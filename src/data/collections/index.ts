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
  DateEstimate,
  Item,
  Person,
  Confidence,
  Inscription,
  Mention,
  Region,
  Relation,
  ResolvedItem,
  ResolvedPrint,
  Surrogate,
} from './types';

/** The face an inscription's region is on when the region does not say. */
export const inscriptionFace = (ins: Inscription): string =>
  ins.region?.face ?? (ins.location === 'verso' ? 'verso' : 'recto');

/** A view's label, reduced to a key: 'Case, open' -> 'case-open'. */
const faceKey = (label: string) =>
  label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
import { UNDATED_ESTIMATE, heading, naturalName } from './types';

/* ------------------------------------------------------------------ *
 * Transcriptions
 *
 * One plain-text file per paged item, named for its slug:
 *   src/data/collections/transcriptions/midway-grange-journal.md
 * Each page starts with a heading giving its IMAGE POSITION - the n of p<n>,
 * not the volume's own page number - and anything after the number on that
 * line is for you and ignored:
 *
 *   ## 5  (p. 1 in the volume)
 *   Midway Grange No. 1054
 *   Minutes of the meeting of March 12th 1884 ...
 *
 * The text is shown exactly as typed, line breaks kept: a transcription
 * follows the lines of the page, and nothing in it is read as formatting.
 * Pages with no heading simply have no transcription yet. Anything above
 * the first heading is a note to yourself and never shown.
 * ------------------------------------------------------------------ */
const TRANSCRIPTION_FILES = import.meta.glob('./transcriptions/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

// A transcription saved anywhere else is never read - and nothing would say
// so. Look for strays across src/ and name them. (Keys only: nothing loaded.)
{
  const HOME = '/src/data/collections/transcriptions/';
  const strays = Object.keys(import.meta.glob('/src/**/transcriptions/*.{md,txt}')).filter(
    (k) => !(k.startsWith(HOME) && k.endsWith('.md') && !k.slice(HOME.length).includes('/'))
  );
  for (const k of strays) {
    console.warn(
      `[collections] ${k} is not read. Transcriptions must be .md files directly in ` +
        `${HOME.slice(1)} - move it there.`
    );
  }
}

const TRANSCRIPTIONS = new Map<string, Map<number, string>>(
  Object.entries(TRANSCRIPTION_FILES).map(([path, text]) => {
    const slug = path.replace(/^.*\//, '').replace(/\.md$/, '');
    const pages = new Map<number, string>();
    let at: number | null = null;
    let lines: string[] = [];
    let lineNo = 0;
    const flush = () => {
      if (at === null) return;
      if (pages.has(at)) {
        throw new Error(`transcriptions/${slug}.md: page ${at} has two headings.`);
      }
      const body = lines.join('\n').replace(/^\s*\n|\s+$/g, '');
      if (body) pages.set(at, body);
    };
    for (const line of text.replace(/\r\n?/g, '\n').split('\n')) {
      lineNo++;
      const h = line.match(/^##\s+(\d+)\b/);
      // Something that was MEANT as a page heading and is not one - '##3',
      // '## Page 3', an indented '  ## 3' - would silently fold its page into
      // the one before. Stop instead, and say which line.
      if (!h && /^\s*##/.test(line)) {
        throw new Error(
          `transcriptions/${slug}.md, line ${lineNo}: "${line.trim()}" looks like a page ` +
            `heading but is not one. Write it as "## " and the image position, at the ` +
            `start of the line: "## 3".`
        );
      }
      if (h) {
        flush();
        at = Number(h[1]);
        lines = [];
      } else if (at !== null) {
        lines.push(line);
      }
    }
    flush();
    // Said once per build, so there is always a way to see that the file was
    // found and how much of it was read.
    console.log(
      `[collections] transcriptions/${slug}.md: ${pages.size} page${pages.size === 1 ? '' : 's'} with text` +
        (pages.size ? ` (${[...pages.keys()].slice(0, 8).join(', ')}${pages.size > 8 ? ', ...' : ''})` : '')
    );
    return [slug, pages] as const;
  })
);
import {
  PEOPLE as EVERY_PERSON,
  personById as everyPersonById,
  NAME_INDEX as EVERY_NAME,
} from './people';
import IIIF_IMAGES from './iiif-images.json';
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';

import { COLLECTION as SWANN_FAMILY } from './swann-family';
import { COLLECTION as THOMAS_FAMILY } from './thomas-family';
import { COLLECTION as MCKINSTRY_FAMILY } from './mckinstry-family';
import { COLLECTION as ALLISON_FAMILY } from './allison-family';
import { COLLECTION as INGLE_FAMILY } from './ingle-family';

const REGISTERED: Collection[] = [
  SWANN_FAMILY,
  THOMAS_FAMILY,
  MCKINSTRY_FAMILY,
  ALLISON_FAMILY,
  INGLE_FAMILY
];

/** Every collection as written, private material and all. */
const EVERY_COLLECTION: Collection[] = [...REGISTERED].sort((a, b) =>
  a.title.localeCompare(b.title)
);

/* ------------------------------------------------------------------ *
 * Filing titles
 * ------------------------------------------------------------------ */

/** Leading articles that are not filed on. English, and the Spanish forms
 *  that turn up in place names out here. */
const ARTICLES = new Set(['a', 'an', 'the', 'el', 'la', 'los', 'las', 'un', 'una']);

/**
 * THE TITLE AS IT FILES, which is not the title as it prints. Square brackets
 * say a title was supplied rather than taken from the object; they say nothing
 * about where it belongs in a list, and '[' sorting ahead of every letter is
 * how a whole collection of supplied titles ends up in a block of its own. A
 * leading article is dropped for the same reason a MARC nonfiling indicator
 * exists. The displayed title is never altered.
 *
 *   '[Men at the Swann gin]'  ->  'men at the swann gin'
 *   'The gin at Celeste'      ->  'gin at celeste'
 */
export const filingTitle = (title: string): string => {
  const t = title
    .replace(/[\[\]{}()"'\u2018\u2019\u201c\u201d]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
  const words = t.split(' ');
  return words.length > 1 && ARTICLES.has(words[0]) ? words.slice(1).join(' ') : t;
};

/** Numbers file as numbers, so 'Gin no. 2' comes before 'Gin no. 10'. */
const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });

/** Sort items, or anything else with a title, the way a catalogue files them. */
export const compareTitles = (a: { title: string }, b: { title: string }) =>
  collator.compare(filingTitle(a.title), filingTitle(b.title));

/**
 * ARRANGEMENT ORDER: the order the material is in, not an alphabet. A control
 * number IS an arrangement - box, folder, item - so numbered items file by it,
 * each part read as a number so c.1.2.10 follows c.1.2.9 instead of c.1.2.1.
 * Items with no number yet follow, earliest first, then by filing title.
 */
export const compareArrangement = (a: ResolvedItem, b: ResolvedItem) => {
  if (a.controlNumber && b.controlNumber) return collator.compare(a.controlNumber, b.controlNumber);
  if (a.controlNumber) return -1;
  if (b.controlNumber) return 1;
  return compareChronology(a, b);
};

/** Earliest first; a tighter date before a looser one that starts with it. */
export const compareChronology = (a: ResolvedItem, b: ResolvedItem) => {
  const x = spanOf(a);
  const y = spanOf(b);
  return (
    (x ? x.from : Infinity) - (y ? y.from : Infinity) ||
    (x ? x.to : Infinity) - (y ? y.to : Infinity) ||
    compareTitles(a, b)
  );
};

/* ------------------------------------------------------------------ *
 * Reading a date statement
 * ------------------------------------------------------------------ */

/**
 * How wide "ca." is when a display says it and the numbers are left out. No
 * cataloguing standard fixes this, so it is a house rule, stated once, here.
 * Give earliest/latest whenever the evidence says something narrower.
 */
export const CIRCA_YEARS = 5;

type ReadDate = {
  earliest?: number;
  latest?: number;
  /** 'range' = the words state both ends; 'year' = one year; 'open' = one bound. */
  kind: 'range' | 'year' | 'open' | 'undated';
};

/**
 * The years a date statement states, read from the words alone. Brackets say
 * where the date came from and a question mark says how sure it is - neither
 * changes WHICH years, so both are set aside before reading. Returns null for
 * anything it does not recognise; it never guesses.
 *
 *   1890, [1890], [1890?]             1890
 *   [ca. 1890], circa 1890            1885-1895 (CIRCA_YEARS)
 *   [189-], [189-?], 1890s            1890-1899
 *   [18--]                            1800-1899
 *   1885-1900, [1885x1900]            1885-1900
 *   [between 1885 and 1900]           1885-1900
 *   [1914 or 1915]                    1914-1915
 *   [not before 1885], after 1885     1885-
 *   [not after 1900], before 1900     -1900
 *   [n.d.], undated                   undated
 *   June 3, 1890                      1890 (one year anywhere in the text)
 */
export const readDate = (display: string): ReadDate | null => {
  let t = display
    .toLowerCase()
    .replace(/[\[\]?]/g, ' ')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
  if (/^(n\.? ?d\.?|undated|no date|date unknown)$/.test(t)) return { kind: 'undated' };

  let circa = false;
  t = t.replace(/^(ca\.?|c\.|circa|approximately|approx\.?|about)\s*/, () => {
    circa = true;
    return '';
  });

  const Y = '(1\\d{3}|20\\d{2})';
  let m: RegExpMatchArray | null;
  const range = (a: string, b: string): ReadDate => ({ earliest: Number(a), latest: Number(b), kind: 'range' });

  if ((m = t.match(new RegExp(`^between ${Y} and ${Y}$`)))) return range(m[1], m[2]);
  if ((m = t.match(new RegExp(`^${Y} ?(?:-|x|to) ?${Y}$`)))) return range(m[1], m[2]);
  if ((m = t.match(new RegExp(`^${Y} or ${Y}$`)))) return range(m[1], m[2]);
  if ((m = t.match(new RegExp(`^(?:not after|no later than|before) ${Y}$`)))) return { latest: Number(m[1]), kind: 'open' };
  if ((m = t.match(new RegExp(`^(?:not before|no earlier than|after) ${Y}$`)))) return { earliest: Number(m[1]), kind: 'open' };
  if ((m = t.match(/^(1\d{2}|20\d)(?:-|0s)$/))) return range(`${m[1]}0`, `${m[1]}9`);
  if ((m = t.match(/^(1\d|20)--$/))) return range(`${m[1]}00`, `${m[1]}99`);

  const years = t.match(new RegExp(`\\b${Y}\\b`, 'g')) ?? [];
  if (years.length === 1) {
    const y = Number(years[0]);
    return circa
      ? { earliest: y - CIRCA_YEARS, latest: y + CIRCA_YEARS, kind: 'range' }
      : { earliest: y, latest: y, kind: 'year' };
  }
  return null;
};

/**
 * THE NUMBERS ARE WHAT SORT. `display` is what a reader sees; `earliest` and
 * `latest` are what every list, chronology and age is computed from. So:
 *   - numbers given: they win, always. The build warns only when they
 *     contradict a range the display states outright - [189-] with
 *     earliest 1880 is a typo in one field or the other.
 *   - numbers left out: they are read from the display, for the forms
 *     readDate() knows. A plain 1890 and a bracketed [1890?] then sort
 *     together, instead of every date without numbers falling to the end
 *     of every list as though it were undated.
 *   - neither possible: a display with a year in it that cannot be read is
 *     reported, so nothing drops out of the chronology in silence.
 */
const resolveDate = (slug: string, date?: DateEstimate, quiet = false): DateEstimate => {
  if (!date) return UNDATED_ESTIMATE;
  const read = readDate(date.display);
  if (date.earliest !== undefined || date.latest !== undefined) {
    if (read && (read.kind === 'range' || read.kind === 'year')) {
      const lo = date.earliest ?? date.latest!;
      const hi = date.latest ?? date.earliest!;
      const disjoint = hi < read.earliest! || lo > read.latest!;
      const statedEnds = read.kind === 'range' && !/ca\.?|circa|approx|about/i.test(date.display);
      if (!quiet && (disjoint || (statedEnds && (lo !== read.earliest || hi !== read.latest)))) {
        console.warn(
          `[collections] ${slug}: date reads "${date.display}" but earliest/latest are ` +
            `${date.earliest ?? '-'}/${date.latest ?? '-'}. One of the two is probably mistyped.`
        );
      }
    }
    return date;
  }
  if (read && read.kind !== 'undated') return { ...date, earliest: read.earliest, latest: read.latest };
  if (!quiet && !read && /\d{3}/.test(date.display)) {
    console.warn(
      `[collections] ${slug}: could not read a date from "${date.display}". Add earliest/latest, ` +
        `or it sorts as undated.`
    );
  }
  return date;
};

/* ------------------------------------------------------------------ *
 * WHO SEES WHAT
 *
 * The site is built for one of two audiences:
 *
 *   'public'   everyone. Living people and the photographs they are in are
 *              not there at all - no page, no name, no thumbnail.
 *   'family'   relatives who have signed in at /collections/family.
 *              Everything, with the private things marked.
 *
 * `npm run build` builds the public site, then (scripts/family.mjs) builds
 * the family one beside it and keeps only the pages that differ, encrypted.
 * `npm run dev` shows the family view, because that is the one you work in;
 * `npm run dev:public` shows what everyone else gets.
 *
 * NOTHING BELOW THIS FILE DECIDES ANYTHING. The pages read ALL_ITEMS, PEOPLE,
 * FACES and the rest exactly as before; what those hold is settled here, once,
 * from three things you write:
 *
 *   living: true       on a person in people.ts (or on a depiction or
 *                      mention of someone who has no record)
 *   restricted: true   on an item, or on one page of a paged item
 *   death: '1998'      which is what makes a person public again
 *
 * `npm run private` prints what is private and why.
 * ------------------------------------------------------------------ */
const ENV =
  (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {};
const ASKED = ENV.COLLECTIONS_AUDIENCE;
if (ASKED && ASKED !== 'public' && ASKED !== 'family') {
  throw new Error(`COLLECTIONS_AUDIENCE is "${ASKED}"; it can only be "public" or "family".`);
}
/** Left unset, a build is PUBLIC. Only the dev server defaults to family. */
export const AUDIENCE: 'public' | 'family' =
  ASKED === 'public' || ASKED === 'family' ? ASKED : import.meta.env.DEV ? 'family' : 'public';

/** Where relatives sign in. Also reserved as a collection slug, below. */
export const FAMILY_SIGN_IN = '/collections/family';

/**
 * How long ago someone must have been born before a missing death year
 * stops meaning "may be living". See `living` on Person.
 */
export const LIVING_YEARS = 100;
const THIS_YEAR = new Date().getFullYear();
const yearIn = (v?: string) => {
  const m = v?.match(/\d{4}/);
  return m ? Number(m[0]) : undefined;
};

/** The latest year a date allows, or undefined when it sets no upper bound. */
const latestOf = (date?: DateEstimate): number | undefined => {
  if (!date) return undefined;
  if (date.latest !== undefined) return date.latest;
  if (date.earliest !== undefined) return undefined;
  const r = readDate(date.display);
  return r && r.kind !== 'undated' ? r.latest : undefined;
};

/**
 * WHEN SOMEONE WITH NO BIRTH YEAR MUST HAVE BEEN BORN BY. A person pictured
 * in a cabinet card of 1890 was born by 1890, whatever their record leaves
 * out; so was the parent of a child born in 1902 (by 1890, say), and the
 * child of a mother who died in 1911. These bounds are only ever used to
 * decide that someone is long dead - never to print a date - and each is
 * generous, so a doubt leaves the person private.
 */
const bornBy = new Map<string, number>();
{
  const bound = (id: string | undefined, year: number | undefined) => {
    if (id && year !== undefined) bornBy.set(id, Math.min(bornBy.get(id) ?? Infinity, year));
  };
  for (const c of EVERY_COLLECTION) {
    for (const i of c.items) {
      const y = latestOf(i.date);
      for (const dep of i.depicts ?? []) bound(dep.person, y);
      for (const m of i.mentions ?? []) bound(m.person, y);
    }
  }
  // `b` is `a`'s <type>: their child, parent, sibling or spouse.
  const fromKin = (a: Person, b: Person, type: Relation['type']) => {
    const born = yearIn(b.birth);
    const died = yearIn(b.death);
    if (type === 'child' && born !== undefined) bound(a.id, born - 12);
    if (type === 'parent') {
      if (born !== undefined) bound(a.id, born + 70);
      if (died !== undefined) bound(a.id, died + 1);
    }
    if (type === 'sibling' && born !== undefined) bound(a.id, born + 30);
    if (type === 'spouse') {
      if (born !== undefined) bound(a.id, born + 40);
      if (died !== undefined) bound(a.id, died - 14);
    }
  };
  const back: Record<Relation['type'], Relation['type']> = {
    child: 'parent',
    parent: 'child',
    spouse: 'spouse',
    sibling: 'sibling',
  };
  for (const p of EVERY_PERSON) {
    for (const r of p.relations ?? []) {
      const q = everyPersonById.get(r.person);
      if (!q) continue;
      fromKin(p, q, r.type);
      fromKin(q, p, back[r.type]);
    }
  }
}

/** Every living person's id, with the reason they count as living. */
const LIVING = new Map<string, string>();
for (const p of EVERY_PERSON) {
  if (p.living === true) {
    LIVING.set(p.id, 'marked living: true');
    continue;
  }
  if (p.living === false || p.death?.trim()) continue;
  const own = yearIn(p.birth);
  const by = own ?? bornBy.get(p.id);
  if (by === undefined) {
    LIVING.set(p.id, 'presumed: no dates, and nothing dates them');
  } else if (THIS_YEAR - by < LIVING_YEARS) {
    LIVING.set(
      p.id,
      own !== undefined
        ? `presumed: born ${own}, no death year`
        : `presumed: no dates, and nothing puts their birth before ${by}`
    );
  }
}

type LivingClaim = { person?: string; as?: string; living?: boolean };
const isLivingClaim = (x: LivingClaim) => x.living === true || (!!x.person && LIVING.has(x.person));

/**
 * What the rules decide about one item. `whole`: the item is private.
 * `pages`: the private pages of an item that is otherwise public. `byHand`
 * and `pagesByHand` remember a `restricted: true` you set yourself: nothing
 * is published from those, not even a dead person's face (see safeCrop).
 */
type Privacy = {
  whole: boolean;
  pages: Set<string>;
  byHand: boolean;
  pagesByHand: Set<string>;
  why: string[];
};
const PUBLIC_ITEM: Privacy = {
  whole: false,
  pages: new Set(),
  byHand: false,
  pagesByHand: new Set(),
  why: [],
};
const privacyOf = new Map<string, Privacy>();
for (const c of EVERY_COLLECTION) {
  for (const i of c.items) {
    const pageKeys = new Set((i.pages ?? []).map((_, n) => `p${n + 1}`));
    const p: Privacy = { whole: false, pages: new Set(), byHand: false, pagesByHand: new Set(), why: [] };
    if (i.restricted) {
      p.whole = true;
      p.byHand = true;
      p.why.push('marked restricted: true');
    }
    (i.pages ?? []).forEach((pg, n) => {
      if (!pg.restricted) return;
      p.pages.add(`p${n + 1}`);
      p.pagesByHand.add(`p${n + 1}`);
      p.why.push(`page ${n + 1} is marked restricted: true`);
    });
    const place = (x: LivingClaim, on: string | undefined, verb: string) => {
      if (!isLivingClaim(x)) return;
      const who = x.person ?? x.as ?? 'someone';
      if (on && pageKeys.has(on)) {
        p.pages.add(on);
        p.why.push(`${who} (living) is ${verb} on ${on}`);
      } else {
        // Not a paged item, or nobody has said which page: the whole item.
        p.whole = true;
        p.why.push(
          `${who} (living) is ${verb}${pageKeys.size ? ', and no page is given for them' : ''}`
        );
      }
    };
    for (const dep of i.depicts ?? []) place(dep, dep.region?.face, 'pictured');
    for (const m of i.mentions ?? []) place(m, m.page ?? m.region?.face, 'named');
    if (!p.whole && pageKeys.size > 0 && p.pages.size === pageKeys.size) {
      p.whole = true;
      p.why.push('every page is private');
    }
    if (p.whole) p.pages = new Set();
    if (p.whole || p.pages.size) privacyOf.set(i.slug, p);
  }
}

/**
 * One item with the collection's defaults folded in, so no page ever tests
 * for a missing date, an absent rights statement or an undefined array.
 *
 * `how` carries what the privacy rules above decided about it. The same
 * function resolves an item twice when it has private pages: once whole (for
 * family), once with those pages emptied (for everyone else) - `redact` -
 * and the second time it keeps quiet, having said its warnings already.
 */
type How = {
  whole: boolean;
  pages: Set<string>;
  redact?: boolean;
  quiet?: boolean;
  depictSource?: number[];
};
const resolveItem = (c: Collection, i: Item, how: How): ResolvedItem => {
    const warn = (msg: string) => {
      if (!how.quiet) warn(msg);
    };
    const d = c.defaults ?? {};
    const rights = i.rights ?? d.rights ?? { status: 'undetermined' as const };
    const basisFor = (b?: string) =>
      b ?? i.identificationBasis ?? d.identificationBasis;

    const withCapture = (sur: Surrogate) => ({
      ...sur,
      capture: sur.capture ?? d.capture ?? 'unrecorded',
    });

    // Every view of the object, in display order, labelled and keyed. An
    // item with pages is read by its pages, p1..pN, and never by recto and
    // verso - a volume has pages, not a back.
    const pages = i.pages ?? [];
    const tx = TRANSCRIPTIONS.get(i.slug);
    if (tx && pages.length === 0) {
      throw new Error(
        `transcriptions/${i.slug}.md exists, but ${i.slug} has no pages. ` +
          `A transcription belongs to an item with a \`pages\` list.`
      );
    }
    if (pages.length > 0 && i.verso) {
      throw new Error(
        `${i.slug} has pages and a verso. An item with pages is read page by ` +
          `page; put the back cover in as its last page instead.`
      );
    }
    for (const n of tx?.keys() ?? []) {
      if (n < 1 || n > pages.length) {
        throw new Error(
          `transcriptions/${i.slug}.md has a page ${n}, but the item has ` +
            `${pages.length} page${pages.length === 1 ? '' : 's'}. Headings give ` +
            `the image position, 1-${pages.length}.`
        );
      }
    }
    const faces: ResolvedItem['faces'] = pages.length
      ? pages.map((pg, n) => {
          const key = `p${n + 1}`;
          const priv = how.pages.has(key);
          const label = pg.label ?? `Page ${n + 1}`;
          return {
            key,
            // On the public site a private page says so in its name, and its
            // transcription is gone with everything else on it.
            label: priv && how.redact ? `${label} (withheld)` : label,
            surrogate: withCapture(pg),
            page: n + 1,
            transcription: priv && how.redact ? undefined : tx?.get(n + 1),
            ...(priv ? { private: true } : {}),
          };
        })
      : [{ key: 'recto', label: i.recto.label ?? 'Recto', surrogate: withCapture(i.recto) }];
    if (!pages.length && i.verso) {
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
    // Every box on the object - details, people, inscriptions - must name a
    // face the item has and sit inside the picture. A region hanging off the
    // edge is a mistyped number, and it would draw an outline around nothing.
    const checkBox = (r: Region, face: string, what: string) => {
      if (!keys.has(face)) {
        throw new Error(
          `${i.slug}: ${what} is on face "${face}", which this item does not ` +
            `have. Valid faces: ${[...keys].join(', ')}.`
        );
      }
      const bad = [r.x, r.y, r.w, r.h].some((v) => !Number.isFinite(v) || v < 0 || v > 100);
      if (bad || r.w === 0 || r.h === 0 || r.x + r.w > 100.5 || r.y + r.h > 100.5) {
        throw new Error(
          `${i.slug}: ${what} has a box that is empty or runs off the image ` +
            `(x ${r.x}, y ${r.y}, w ${r.w}, h ${r.h}). Values are percentages, 0-100.`
        );
      }
    };
    for (const det of i.details ?? []) {
      checkBox(det, det.face, `detail "${det.caption}"`);
    }
    for (const dep of i.depicts ?? []) {
      if (dep.region) {
        checkBox(dep.region, dep.region.face ?? 'recto', `the region for "${dep.person ?? dep.as}"`);
      }
    }
    (i.inscriptions ?? []).forEach((ins, n) => {
      if (ins.region) {
        checkBox(ins.region, ins.region.face ?? inscriptionFace(ins), `inscription ${n + 1}`);
      }
    });
    for (const m of i.mentions ?? []) {
      const who = m.person ?? m.as;
      if (m.page && !keys.has(m.page)) {
        throw new Error(
          `${i.slug}: "${who}" is named on page "${m.page}", which this item ` +
            `does not have. Pages are keyed by image position: p1-p${pages.length}.`
        );
      }
      if (m.region) {
        checkBox(m.region, m.region.face ?? m.page ?? faces[0].key, `the region for "${who}"`);
      }
    }

    // THE PRINTS OF AN ALBUM. Each is a box on one page; each is numbered on
    // its page in the order listed, and that pair - page 5, print 2 - is its
    // address. People are not attached by hand: a depiction belongs to the
    // print its face region's centre falls inside.
    const href = `/collections/${c.slug}/${i.slug}`;
    if (i.prints?.length && pages.length === 0) {
      throw new Error(
        `${i.slug} lists prints but has no pages. Prints are boxes on the ` +
          `pages of an album; give the item its \`pages\` first.`
      );
    }
    const pageNoOf = new Map(faces.filter((f) => f.page).map((f) => [f.key, f.page as number]));
    const countOn = new Map<string, number>();
    const prints: ResolvedPrint[] = (i.prints ?? []).map((p, n) => {
      const what = `print ${n + 1}${p.title ? ` (${p.title})` : ''}`;
      const page = p.region.face;
      const pageNo = page ? pageNoOf.get(page) : undefined;
      if (!page || !pageNo) {
        throw new Error(
          `${i.slug}: ${what} ${page ? `is on "${page}", which is not one of this item's pages` : 'does not say which page it is on'}. ` +
            `Give its region a face: p1-p${pages.length}, by image position.`
        );
      }
      checkBox(p.region, page, what);
      if (p.date && p.date.earliest !== undefined && p.date.latest !== undefined && p.date.earliest > p.date.latest) {
        throw new Error(
          `${i.slug}: ${what} has a date that runs backwards (earliest ${p.date.earliest}, latest ${p.date.latest}).`
        );
      }
      const onPage = (countOn.get(page) ?? 0) + 1;
      countOn.set(page, onPage);
      return {
        ...p,
        date: p.date ? resolveDate(`${i.slug}, ${what}`, p.date, how.quiet) : undefined,
        id: `print-${pageNo}-${onPage}`,
        n: n + 1,
        page,
        pageNo,
        onPage,
        href: `${href}#page=${pageNo}&print=${onPage}`,
        people: [],
      };
    });
    const holds = (p: ResolvedPrint, x: number, y: number) =>
      x >= p.region.x && x <= p.region.x + p.region.w && y >= p.region.y && y <= p.region.y + p.region.h;
    // Two prints, one place: a face there could belong to either, so say so
    // rather than choose. (Overlapping corners are fine; a centre inside
    // another print's box is a box drawn twice or drawn too large.)
    for (const a of prints) {
      for (const b of prints) {
        if (a.n < b.n && a.page === b.page) {
          const inA = holds(a, b.region.x + b.region.w / 2, b.region.y + b.region.h / 2);
          const inB = holds(b, a.region.x + a.region.w / 2, a.region.y + a.region.h / 2);
          if (inA || inB) {
            warn(
              `[collections] ${i.slug}: prints ${a.onPage} and ${b.onPage} on ${a.page} overlap. ` +
                `One box is probably drawn twice, or drawn round two prints.`
            );
          }
        }
      }
    }
    (i.depicts ?? []).forEach((dep, n) => {
      const r = dep.region;
      if (!r?.face) return;
      const here = prints.filter((p) => p.page === r.face);
      if (here.length === 0) return;
      const home = here.find((p) => holds(p, r.x + r.w / 2, r.y + r.h / 2));
      if (home) home.people.push(n);
      else {
        warn(
          `[collections] ${i.slug}: "${dep.person ?? dep.as}" is on ${r.face} but inside none of ` +
            `the prints listed for that page. Check the face's box, or add the print.`
        );
      }
    });

    return {
      ...i,
      collection: c.slug,
      kind: i.kind ?? 'photograph',
      faces,
      private: how.whole,
      depictSource: how.depictSource ?? (i.depicts ?? []).map((_, n) => n),
      pageCount: pages.length,
      prints,
      href,
      titleSource: i.titleSource ?? 'supplied',
      date: resolveDate(i.slug, i.date, how.quiet),
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
      mentions: (i.mentions ?? []).map((m) => {
        const basis = basisFor(m.basis);
        if (!basis) {
          throw new Error(
            `${i.slug} names "${m.person ?? m.as}" in its text with no basis, and ` +
              `neither the item nor the collection sets a default. Say where ` +
              `the name is written, or set identificationBasis once for the item.`
          );
        }
        return { ...m, basis };
      }),
    };
};

/**
 * EVERY ITEM AS WRITTEN - private ones included, each carrying what the
 * rules decided (`private`, and `private` on a page). This is what family
 * see, what the checks below run over, and what the scripts read. The pages
 * read ALL_ITEMS, further down, which is this list as their audience may
 * see it.
 */
const EVERY_ITEM: ResolvedItem[] = EVERY_COLLECTION.flatMap((c) =>
  c.items.map((i) => {
    const p = privacyOf.get(i.slug) ?? PUBLIC_ITEM;
    return resolveItem(c, i, { whole: p.whole, pages: p.pages });
  })
);

// A transcription file for an item that does not exist is a mistyped file
// name, and its text would otherwise never be seen.
{
  const slugs = new Set(EVERY_ITEM.map((i) => i.slug));
  for (const slug of TRANSCRIPTIONS.keys()) {
    if (!slugs.has(slug)) {
      throw new Error(
        `transcriptions/${slug}.md does not match any item's slug. Name the ` +
          `file for the item it transcribes.`
      );
    }
  }
}

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
// 'family' is the sign-in page, '-' the address private files are served
// from, and 'faces' the folder of face crops.
const RESERVED_SLUGS = new Set(['names', 'family', '-', 'faces']);
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

for (const item of EVERY_ITEM) {
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
    if (d.person && !everyPersonById.has(d.person)) {
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
  for (const m of item.mentions) {
    if (m.person && !everyPersonById.has(m.person)) {
      throw new Error(
        `${item.slug} names unknown person "${m.person}". Add a record to people.ts.`
      );
    }
    if (!m.person && !m.as) {
      throw new Error(`${item.slug} has a mention with neither a person nor an "as" name.`);
    }
  }
}

for (const item of EVERY_ITEM) {
  for (const r of item.related ?? []) {
    if (!seenSlugs.has(r.slug)) {
      throw new Error(`${item.slug} relates to unknown item "${r.slug}".`);
    }
  }
  // A print's own record is another item. An album that points at itself, or
  // at nothing, would print a link that goes nowhere.
  for (const p of item.prints) {
    if (!p.item) continue;
    if (p.item === item.slug || !seenSlugs.has(p.item)) {
      throw new Error(
        `${item.slug}: print ${p.onPage} on ${p.page} gives "${p.item}" as its own record, ` +
          `${p.item === item.slug ? 'which is the album itself' : 'and no item has that slug'}.`
      );
    }
  }
}

for (const item of EVERY_ITEM) {
  const { earliest, latest } = item.date;
  if (earliest !== undefined && latest !== undefined && earliest > latest) {
    throw new Error(
      `${item.slug}: date runs backwards (earliest ${earliest}, latest ${latest}).`
    );
  }
}

for (const c of REGISTERED) {
  const own = new Set(c.items.map((i) => i.slug));
  for (const slug of c.keyItems ?? []) {
    if (!own.has(slug)) {
      throw new Error(
        `Collection "${c.slug}" lists key item "${slug}", which is not one of ` +
          `its own items. Key items must come from the collection they represent.`
      );
    }
  }
}

for (const p of EVERY_PERSON) {
  for (const r of p.relations ?? []) {
    if (!everyPersonById.has(r.person)) {
      throw new Error(`${p.id} has a relation to unknown person "${r.person}".`);
    }
  }
}

/* ------------------------------------------------------------------ *
 * THE AUDIENCE'S VIEW. Everything the pages read from here down is the
 * data as the audience may see it (see WHO SEES WHAT, above). For family
 * that is all of it. For everyone else:
 *
 *   - a private item is not in ALL_ITEMS, so it has no page, no row in any
 *     list, no manifest and nothing for the search to index;
 *   - a paged item with private pages keeps its place, but those pages are
 *     emptied: no people, prints, details, inscriptions or transcription
 *     (and images.ts gives the page the "withheld" card for a picture);
 *   - a living person is not in PEOPLE, so they have no page and no line in
 *     the names index, and nobody's relations point at them;
 *   - a collection does not choose a private item as its key item,
 *     frontispiece or epigraph.
 * ------------------------------------------------------------------ */
const isPrivateItem = (slug?: string) => !!slug && privacyOf.get(slug)?.whole === true;

/** A paged item as the public see it: its private pages emptied. */
const redacted = (c: Collection, i: Item, p: Privacy): ResolvedItem => {
  const gone = (face?: string) => !!face && p.pages.has(face);
  const kept = (i.depicts ?? []).map((d, n) => ({ d, n })).filter(({ d }) => !gone(d.region?.face));
  // The item is represented by its recto. If that is one of the private
  // pages (a cover with a name on it), the first open page stands in.
  const pages = i.pages ?? [];
  const rectoGone = pages.some((pg, n) => gone(`p${n + 1}`) && pg.file === i.recto.file);
  const firstOpen = pages.find((_, n) => !gone(`p${n + 1}`));
  return resolveItem(
    c,
    {
      ...i,
      recto: rectoGone && firstOpen ? firstOpen : i.recto,
      depicts: kept.map((k) => k.d),
      mentions: (i.mentions ?? []).filter((m) => !gone(m.page ?? m.region?.face)),
      prints: (i.prints ?? []).filter((pr) => !gone(pr.region.face)),
      details: (i.details ?? []).filter((det) => !gone(det.face)),
      inscriptions: (i.inscriptions ?? []).filter((ins) => !gone(ins.region?.face)),
    },
    { whole: false, pages: p.pages, redact: true, quiet: true, depictSource: kept.map((k) => k.n) }
  );
};

/** Nothing public may point at a private item. */
const unlinked = (it: ResolvedItem): ResolvedItem => {
  const related = it.related?.some((r) => isPrivateItem(r.slug));
  const prints = it.prints.some((pr) => isPrivateItem(pr.item));
  if (!related && !prints) return it;
  return {
    ...it,
    related: it.related?.filter((r) => !isPrivateItem(r.slug)),
    prints: it.prints.map((pr) => (isPrivateItem(pr.item) ? { ...pr, item: undefined } : pr)),
  };
};

const everyItemBySlug = new Map(EVERY_ITEM.map((i) => [i.slug, i]));

/**
 * Every item this audience may see, with the collection's defaults folded
 * in. Pages read THIS, so they never test for a missing date, an absent
 * rights statement or an undefined array - nor for who is living.
 */
const PUBLIC_ITEMS: ResolvedItem[] = EVERY_COLLECTION.flatMap((c) =>
  c.items.flatMap((i) => {
    const p = privacyOf.get(i.slug);
    if (p?.whole) return [];
    return [unlinked(p ? redacted(c, i, p) : (everyItemBySlug.get(i.slug) as ResolvedItem))];
  })
);
export const ALL_ITEMS: ResolvedItem[] = AUDIENCE === 'family' ? EVERY_ITEM : PUBLIC_ITEMS;

export const COLLECTIONS: Collection[] =
  AUDIENCE === 'family'
    ? EVERY_COLLECTION
    : EVERY_COLLECTION.map((c) => {
        const keyItems = c.keyItems?.filter((s) => !isPrivateItem(s));
        return {
          ...c,
          items: c.items.filter((i) => !isPrivateItem(i.slug)),
          keyItems: keyItems?.length ? keyItems : undefined,
          frontispiece: isPrivateItem(c.frontispiece) ? undefined : c.frontispiece,
          // An epigraph taken from a private item goes with it, words and all.
          epigraph: isPrivateItem(c.epigraph?.source) ? undefined : c.epigraph,
        };
      });

/** The authority file as this audience may see it: the living left out. */
export const PEOPLE: Person[] =
  AUDIENCE === 'family'
    ? EVERY_PERSON
    : EVERY_PERSON.filter((p) => !LIVING.has(p.id)).map((p) =>
        p.relations?.some((r) => LIVING.has(r.person))
          ? { ...p, relations: p.relations.filter((r) => !LIVING.has(r.person)) }
          : p
      );
export const personById = new Map(PEOPLE.map((p) => [p.id, p]));
export const NAME_INDEX = EVERY_NAME.filter((n) => personById.has(n.id));

/* Private scans ------------------------------------------------------ */

/**
 * Every scan that belongs in the private bucket, as 'collection/file' in
 * lower case: all the views of a private item, and each private page.
 * scripts/iiif-tiles.mjs puts the tiles where this says; images.ts asks it
 * before it writes an address.
 */
const PRIVATE_SCAN_KEYS = new Set<string>();
{
  const key = (collection: string, file: string) => `${collection}/${file}`.toLowerCase();
  for (const it of EVERY_ITEM) {
    if (it.private) {
      PRIVATE_SCAN_KEYS.add(key(it.collection, it.recto.file));
      for (const f of it.faces) PRIVATE_SCAN_KEYS.add(key(it.collection, f.surrogate.file));
    } else {
      for (const f of it.faces) if (f.private) PRIVATE_SCAN_KEYS.add(key(it.collection, f.surrogate.file));
    }
  }
  // One scan, two records, one of them private: the scan can only be in one
  // bucket, and it goes to the private one. Say so, since the public record
  // will show the "withheld" card where its picture was.
  for (const it of EVERY_ITEM) {
    if (it.private) continue;
    for (const f of it.faces) {
      if (!f.private && PRIVATE_SCAN_KEYS.has(key(it.collection, f.surrogate.file))) {
        console.warn(
          `[collections] ${it.slug}: ${f.surrogate.file} is also the scan of something private, ` +
            `so it is withheld here too. Give the two records separate files.`
        );
      }
    }
  }
}
export const isPrivateScan = (collection: string, file: string) =>
  PRIVATE_SCAN_KEYS.has(`${collection}/${file}`.toLowerCase());

/** How many people are left out of the names for this audience. */
export const withheldPeople = (): number => (AUDIENCE === 'family' ? 0 : LIVING.size);

/** How much of a collection is withheld from this audience. */
export const withheldIn = (slug: string): { items: number; pages: number } => {
  let items = 0;
  let pages = 0;
  if (AUDIENCE === 'family') return { items, pages };
  for (const it of EVERY_ITEM) {
    if (it.collection !== slug) continue;
    if (it.private) items++;
    else pages += it.faces.filter((f) => f.private).length;
  }
  return { items, pages };
};

/* ------------------------------------------------------------------ *
 * The joins
 * ------------------------------------------------------------------ */

/* Faces ------------------------------------------------------------ */

/**
 * A FACE is a depiction that names a person AND records where they are. Each
 * one becomes a small crop cut from the source scan by scripts/faces.mjs
 * (`npm run faces`), which reads this list. The crop is a real file, not the
 * whole scan scaled up inside a small box, so a person page with thirty faces
 * loads thirty small images rather than decoding thirty large ones - which a
 * phone would feel. A face on an album page is cut from that page's scan:
 * `file` is the page's file, so the script needs to know nothing about albums.
 */
export type Face = {
  /** '<person>--<item slug>', with -2, -3 if someone appears twice in one item. */
  id: string;
  person: string;
  item: ResolvedItem;
  /** Which view of the object the region is on: 'recto', 'verso', a view key. */
  view: string;
  file: string;
  collection: string;
  region: Region;
  confidence: Confidence;
  basis: string;
  /**
   * WHERE THE CROP FILE LIVES. 'public': public/collections/faces/, as
   * always. 'private': the private bucket, served only to family. A face is
   * private when it is on a private item or page - unless it is `fromWithheld`.
   */
  store: 'public' | 'private';
  /**
   * A DEAD PERSON'S FACE FROM A PRIVATE PHOTOGRAPH, published on its own. A
   * tight crop of someone long dead shows only them, and a group photograph
   * with one living grandchild in it is often the best likeness there is. So
   * the crop is public while the photograph stays private - but only when
   * safeCrop(), below, can show that no living person is inside it.
   */
  fromWithheld: boolean;
  /**
   * THE CROP'S FILE NAME, without extension. Ordinarily the id. A face
   * published from a private photograph gets a name that does not contain
   * the photograph's slug - a slug is made of the title's words, and the
   * title of a private photograph is not for the public either.
   */
  crop: string;
};

/** Crop size at 1x. 4:5, the proportion of a carte de visite portrait. */
export const FACE_W = 240;
export const FACE_H = 300;
/** How much larger than the recorded region a face crop is cut. */
export const FACE_MARGIN = 1.45;

/**
 * THE CROP RECTANGLE, in pixels of a scan W x H: the region grown by
 * FACE_MARGIN, widened or heightened to FACE_W:FACE_H, and slid back inside
 * the picture. scripts/faces.mjs cuts with THIS function, and safeCrop()
 * checks with it, so what is checked is exactly what is cut.
 */
export function faceCropRect(region: Region, W: number, H: number) {
  const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
  const aspect = FACE_W / FACE_H;
  const cx = ((region.x + region.w / 2) / 100) * W;
  const cy = ((region.y + region.h / 2) / 100) * H;
  let cw = (region.w / 100) * W * FACE_MARGIN;
  let ch = (region.h / 100) * H * FACE_MARGIN;
  if (cw / ch > aspect) ch = cw / aspect;
  else cw = ch * aspect;
  if (cw > W) {
    cw = W;
    ch = cw / aspect;
  }
  if (ch > H) {
    ch = H;
    cw = ch * aspect;
  }
  const left = Math.round(clamp(cx - cw / 2, 0, W - cw));
  const top = Math.round(clamp(cy - ch / 2, 0, H - ch));
  return {
    left,
    top,
    width: Math.max(1, Math.min(W - left, Math.round(cw))),
    height: Math.max(1, Math.min(H - top, Math.round(ch))),
  };
}

/** A scan's pixel size, from the tiling script's record of it. */
const SCANS = IIIF_IMAGES as unknown as Record<string, { width: number; height: number }>;
const scanByLowerKey = new Map(Object.keys(SCANS).map((k) => [k.toLowerCase(), k]));
const scanSize = (collection: string, file: string) => {
  const k = scanByLowerKey.get(`${collection}/${file}`.toLowerCase());
  return k ? SCANS[k] : null;
};

/**
 * MAY THIS FACE BE PUBLISHED, though its photograph is private? Returns
 * null for yes, or the reason for no - which `npm run private` prints, so
 * you can see what would release it (usually: draw the missing box, or
 * tighten one). The answer is no unless every one of these holds:
 *
 *   - the person is not living;
 *   - the photograph is private only because of who is in it, not because
 *     you marked it `restricted` yourself;
 *   - every living person in it has a box, so it is known where they are;
 *   - the crop, exactly as faces.mjs will cut it, touches none of those
 *     boxes - each grown by LIVING_PAD on every side, because a box drawn
 *     round a face stops short of the hair and the shoulder.
 */
const LIVING_PAD = 0.15;
const safeCrop = (f: Omit<Face, 'store' | 'fromWithheld' | 'crop'>): string | null => {
  if (LIVING.has(f.person)) return 'the person is living';
  const p = privacyOf.get(f.item.slug);
  if (!p) return null;
  if (p.byHand) return 'the item is marked restricted: true';
  if (p.pagesByHand.has(f.view)) return 'the page is marked restricted: true';
  const boxes: Region[] = [];
  for (const d of f.item.depicts) {
    if (!isLivingClaim(d)) continue;
    const who = d.person ?? d.as ?? 'someone';
    if (!d.region) return `${who} (living) has no box, so it is not known where they are`;
    if ((d.region.face ?? 'recto') === f.view) boxes.push(d.region);
  }
  for (const m of f.item.mentions) {
    if (!isLivingClaim(m)) continue;
    const who = m.person ?? m.as ?? 'someone';
    const on = m.page ?? m.region?.face;
    if (!on) return `${who} (living) is named, and no page is given for them`;
    if (on !== f.view) continue;
    if (!m.region) return `${who} (living) is named on this page with no box`;
    boxes.push(m.region);
  }
  const size = scanSize(f.collection, f.file);
  if (!size) return 'the scan has not been tiled yet; run npm run iiif';
  const r = faceCropRect(f.region, size.width, size.height);
  const crop = {
    x0: (r.left / size.width) * 100,
    y0: (r.top / size.height) * 100,
    x1: ((r.left + r.width) / size.width) * 100,
    y1: ((r.top + r.height) / size.height) * 100,
  };
  for (const b of boxes) {
    const px = b.w * LIVING_PAD;
    const py = b.h * LIVING_PAD;
    const apart =
      b.x + b.w + px <= crop.x0 || b.x - px >= crop.x1 || b.y + b.h + py <= crop.y0 || b.y - py >= crop.y1;
    if (!apart) return 'a living person is too close: the crop would take in part of them';
  }
  return null;
};

/** Every face there is, private ones included, each with where its file lives. */
const everyFaceAt = new Map<string, Face>();
const heldFaces: { id: string; item: string; why: string }[] = [];
const EVERY_FACE: Face[] = (() => {
  const seen = new Map<string, number>();
  const out: Face[] = [];
  for (const item of EVERY_ITEM) {
    item.depicts.forEach((d, n) => {
      if (!d.person || !d.region) return;
      const view = d.region.face ?? 'recto';
      const surface = item.faces.find((f) => f.key === view);
      if (!surface) return; // unreachable: checkBox() has already thrown
      const base = `${d.person}--${item.slug}`;
      const count = (seen.get(base) ?? 0) + 1;
      seen.set(base, count);
      const bare = {
        id: count > 1 ? `${base}-${count}` : base,
        person: d.person,
        item,
        view,
        file: surface.surrogate.file,
        collection: item.collection,
        region: d.region,
        confidence: d.confidence,
        basis: d.basis,
      };
      const hidden = item.private || surface.private === true;
      const why = hidden ? safeCrop(bare) : null;
      if (hidden && why && !LIVING.has(d.person)) heldFaces.push({ id: bare.id, item: item.slug, why });
      const fromWithheld = hidden && !why;
      const face: Face = {
        ...bare,
        store: hidden && why ? 'private' : 'public',
        fromWithheld,
        crop: fromWithheld
          ? `${d.person}--w${createHash('sha256').update(bare.id).digest('hex').slice(0, 12)}`
          : bare.id,
      };
      out.push(face);
      everyFaceAt.set(`${item.slug}#${n}`, face);
    });
  }
  return out;
})();

/**
 * The faces this audience may see IN THEIR PHOTOGRAPHS. On the public site
 * that leaves out the ones published from private photographs: those have
 * no photograph to stand in, and are reached through withheldFor().
 */
const faceByDepiction = new Map<string, Face>();
export const FACES: Face[] = ALL_ITEMS.flatMap((item) =>
  item.depicts.flatMap((_, n) => {
    const full = everyFaceAt.get(`${item.slug}#${item.depictSource[n]}`);
    if (!full) return [];
    // The face belongs to the item as THIS audience has it.
    const face = full.item === item ? full : { ...full, item };
    faceByDepiction.set(`${item.slug}#${n}`, face);
    return [face];
  })
);

export const faceById = new Map(EVERY_FACE.map((f) => [f.id, f]));
/**
 * A private crop is served from the private bucket, to family only; the
 * address says which, so no page has to ask.
 */
export const faceHref = (id: string, density: 1 | 2 = 1) => {
  const f = faceById.get(id);
  return `/collections/${f?.store === 'private' ? '-/' : ''}faces/${f?.crop ?? id}${density === 2 ? '@2x' : ''}.webp`;
};

export type Appearance = {
  item: ResolvedItem;
  confidence: Confidence;
  basis: string;
  position?: string;
  region?: Region;
  /** Set when this appearance has a region, and so a face crop. */
  face?: Face;
  /**
   * TRUE when the person is NAMED in the item's text rather than pictured -
   * a journal, a letter. Such an appearance never has a face crop.
   */
  named?: boolean;
  /** For a named appearance: the page it is on, and a note. */
  page?: { key: string; label: string; n: number; href: string };
  note?: string;
  /**
   * For a person pictured in an ALBUM: the print their face is in. Its
   * `href` opens the album on that page with the print outlined, which is
   * where a link from a person's page should land - not on the front cover.
   */
  print?: ResolvedPrint;
};

/** The address of one page of a paged item: the reader opens on it. */
export const pageHref = (item: ResolvedItem, n: number) => `${item.href}#page=${n}`;

/** The prints on one page of an album, in the order listed. */
export const printsOn = (item: ResolvedItem, page: string): ResolvedPrint[] =>
  item.prints.filter((p) => p.page === page);

/** Every appearance of a person, across every collection: pictured, then named. */
export const appearancesOf = (personId: string): Appearance[] =>
  ALL_ITEMS.flatMap((item) => [
    ...item.depicts.flatMap((d, n) =>
      d.person === personId
        ? [
            {
              item,
              confidence: d.confidence,
              basis: d.basis,
              position: d.position,
              region: d.region,
              face: faceByDepiction.get(`${item.slug}#${n}`),
              print: item.prints.find((p) => p.people.includes(n)),
            },
          ]
        : []
    ),
    ...item.mentions.flatMap((m): Appearance[] => {
      if (m.person !== personId) return [];
      const f = m.page ? item.faces.find((x) => x.key === m.page) : undefined;
      return [
        {
          item,
          confidence: m.confidence,
          basis: m.basis,
          region: m.region,
          named: true,
          note: m.note,
          page: f?.page ? { key: f.key, label: f.label, n: f.page, href: pageHref(item, f.page) } : undefined,
        },
      ];
    }),
  ]);

/* Relations, both ways ---------------------------------------------- */

const INVERSE: Record<Relation['type'], Relation['type']> = {
  child: 'parent',
  parent: 'child',
  spouse: 'spouse',
  sibling: 'sibling',
};

export type Kin = Relation & {
  /** False when the relation was recorded on the OTHER person's record. */
  stated: boolean;
};

/**
 * A person's relations, including the reciprocals. A relation is entered once,
 * on either record - "child: Bud" on Benjamin's - and both pages show it. An
 * authority file that makes you enter every reciprocal by hand is one that
 * will be missing half of them by the hundredth person.
 */
export const relationsOf = (personId: string): Kin[] => {
  const out = new Map<string, Kin>();
  for (const r of personById.get(personId)?.relations ?? []) {
    out.set(`${r.type}|${r.person}`, { ...r, stated: true });
  }
  for (const other of PEOPLE) {
    for (const r of other.relations ?? []) {
      if (r.person !== personId) continue;
      const key = `${INVERSE[r.type]}|${other.id}`;
      const mine = out.get(key);
      if (!mine) {
        out.set(key, {
          type: INVERSE[r.type],
          person: other.id,
          basis: r.basis,
          confidence: r.confidence,
          ...(r.type === 'sibling' && r.half ? { half: true } : {}),
          stated: false,
        });
      } else if (r.type === 'sibling' && r.half && !mine.half) {
        // HALF-SIBLINGS: a mark on EITHER record holds for both. Leaving it
        // off claims nothing, so the other record's mark is not contradicted
        // by this one's silence - and the two pages must not disagree.
        out.set(key, { ...mine, half: true });
      }
    }
  }
  return [...out.values()];
};

/**
 * HOW MANY OF A PERSON'S RELATIVES ARE LIVING, by relation. The public site
 * does not name them or link to them (they are not in PEOPLE, so relationsOf
 * never returns them); a page can still say "and two living".
 */
export const livingKinOf = (personId: string): Record<Relation['type'], number> => {
  const out = { parent: 0, child: 0, spouse: 0, sibling: 0 };
  if (AUDIENCE === 'family') return out;
  const seen = new Set<string>();
  const count = (type: Relation['type'], other: string) => {
    if (!LIVING.has(other) || seen.has(`${type}|${other}`)) return;
    seen.add(`${type}|${other}`);
    out[type]++;
  };
  for (const r of everyPersonById.get(personId)?.relations ?? []) count(r.type, r.person);
  for (const other of EVERY_PERSON) {
    for (const r of other.relations ?? []) {
      if (r.person === personId) count(INVERSE[r.type], other.id);
    }
  }
  return out;
};

/**
 * WHAT IS WITHHELD OF ONE PERSON: how many private photographs (or private
 * album pages) they are in, and the faces of theirs that are published from
 * those photographs anyway (see `fromWithheld` on Face). Nothing for a
 * living person, and nothing when the audience is family.
 */
export const withheldFor = (personId: string): { n: number; faces: Face[] } => {
  if (AUDIENCE === 'family' || LIVING.has(personId)) return { n: 0, faces: [] };
  const units = new Set<string>();
  for (const it of EVERY_ITEM) {
    const note = (who: string | undefined, on: string | undefined) => {
      if (who !== personId) return;
      if (it.private) units.add(it.slug);
      else if (on && it.faces.some((f) => f.key === on && f.private)) units.add(`${it.slug}#${on}`);
    };
    for (const d of it.depicts) note(d.person, d.region?.face);
    for (const m of it.mentions) note(m.person, m.page ?? m.region?.face);
  }
  // Only the crops that have been cut. Until `npm run faces` has made one
  // it is not offered, so a page never asks for a file that is not there.
  const cut = (f: Face) => existsSync(`public/collections/faces/${f.crop}.webp`);
  return {
    n: units.size,
    faces: EVERY_FACE.filter((f) => f.person === personId && f.fromWithheld && cut(f)),
  };
};

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

/** Who is named in an item's text, in reading order, once each. */
export const mentionedNames = (item: ResolvedItem): string[] => [
  ...new Set(
    item.mentions.map((m) => {
      const p = m.person ? personById.get(m.person) : undefined;
      return p ? naturalName(p) : (m.as as string);
    })
  ),
];
export const itemBySlug = new Map(ALL_ITEMS.map((i) => [i.slug, i]));

/** Lookup by your internal number, for the items that have one. */
export const itemByControlNumber = new Map(
  ALL_ITEMS.filter((i) => i.controlNumber).map((i) => [i.controlNumber as string, i])
);

/** Items not yet given a control number - a worklist, not a problem. */
export const UNNUMBERED = ALL_ITEMS.filter((i) => !i.controlNumber);

/* ------------------------------------------------------------------ *
 * Dates across many items
 * ------------------------------------------------------------------ */

export type YearSpan = {
  from: number;
  to: number;
  /** Only `latest` is known: "before 1900". */
  openStart: boolean;
  /** Only `earliest` is known: "after 1890". */
  openEnd: boolean;
};

/**
 * The years a date statement covers, or null when it gives none. A date with
 * only one bound says so through openStart/openEnd rather than quietly
 * passing itself off as a single year. For anything that carries a date of
 * its own - an item, or one print in an album.
 */
export const spanOfDate = (date: DateEstimate): YearSpan | null => {
  const { earliest, latest } = date;
  if (earliest === undefined && latest === undefined) return null;
  const a = earliest ?? (latest as number);
  const b = latest ?? (earliest as number);
  return {
    from: Math.min(a, b),
    to: Math.max(a, b),
    openStart: earliest === undefined,
    openEnd: latest === undefined,
  };
};

/** The years a photograph could have been made in, or null when undated. */
export const spanOf = (item: ResolvedItem): YearSpan | null => spanOfDate(item.date);

export type Extent = {
  dated: number;
  undated: number;
  /** Inclusive dates. */
  from: number;
  to: number;
  /**
   * Bulk dates: the narrowest run of years holding BULK_SHARE of the
   * material. Each photograph's weight is spread evenly across its interval,
   * so a print dated 1885-1905 counts a twenty-first in each of those years
   * rather than a whole photograph in 1895. Absent when there is too little
   * material for the figure to mean anything, or when the bulk would be
   * nearly the whole span anyway.
   */
  bulk?: { from: number; to: number };
};

const BULK_SHARE = 0.8;
const BULK_MIN_ITEMS = 10;

/** Inclusive and bulk dates for any set of items - a collection, or all. */
export const extentOf = (items: ResolvedItem[]): Extent | null => {
  const spans = items.map(spanOf).filter((s): s is YearSpan => s !== null);
  if (spans.length === 0) return null;
  const from = Math.min(...spans.map((s) => s.from));
  const to = Math.max(...spans.map((s) => s.to));
  const out: Extent = { dated: spans.length, undated: items.length - spans.length, from, to };
  if (spans.length < BULK_MIN_ITEMS || to - from < 10) return out;

  const weight = new Array<number>(to - from + 1).fill(0);
  for (const s of spans) {
    const share = 1 / (s.to - s.from + 1);
    for (let y = s.from; y <= s.to; y++) weight[y - from] += share;
  }

  // Shortest window whose weight reaches the target: two pointers, one pass.
  const target = spans.length * BULK_SHARE - 1e-9;
  let best: [number, number] | null = null;
  let sum = 0;
  let left = 0;
  for (let right = 0; right < weight.length; right++) {
    sum += weight[right];
    while (left < right && sum - weight[left] >= target) sum -= weight[left++];
    if (sum >= target && (!best || right - left < best[1] - best[0])) best = [left, right];
  }
  if (best && best[1] - best[0] <= 0.75 * (to - from)) {
    out.bulk = { from: from + best[0], to: from + best[1] };
  }
  return out;
};

/**
 * The photographs that stand for a collection on the guide: its declared
 * `keyItems`, or else the earliest, a middle and the latest dated item.
 */
export const keyItemsOf = (slug: string, n = 3): ResolvedItem[] => {
  const c = collectionBySlug.get(slug);
  const items = itemsOf(slug);
  if (!c || items.length === 0) return [];
  if (c.keyItems?.length) {
    return c.keyItems.slice(0, n).map((s) => itemBySlug.get(s) as ResolvedItem);
  }
  const dated = items
    .filter((i) => spanOf(i) !== null)
    .sort((a, b) => (spanOf(a) as YearSpan).from - (spanOf(b) as YearSpan).from);
  const pool = dated.length >= n ? dated : items;
  if (pool.length <= n) return pool;
  const picks = Array.from({ length: n }, (_, k) =>
    Math.round((k * (pool.length - 1)) / (n - 1))
  );
  return [...new Set(picks)].map((k) => pool[k]);
};

export { heading, headingDates, naturalName, naturalNameWithDates, KIND_NOUN } from './types';
export type { Collection, Item, Person, ResolvedItem, ResolvedPrint };

/* ------------------------------------------------------------------ *
 * FOR THE SCRIPTS, never for a page: the whole of what is private and why.
 * scripts/iiif-tiles.mjs reads `scans` to choose a bucket, scripts/faces.mjs
 * reads `faces` to cut the crops and put each where it belongs, and
 * scripts/family.mjs reads `paths` to check that nothing private reached
 * the public site. `npm run private` prints the rest.
 * ------------------------------------------------------------------ */
export const PRIVACY = {
  audience: AUDIENCE,
  living: [...LIVING].map(([id, why]) => ({
    id,
    name: heading(everyPersonById.get(id) as Person),
    why,
  })),
  items: EVERY_ITEM.flatMap((it) => {
    const p = privacyOf.get(it.slug);
    return p
      ? [{ slug: it.slug, collection: it.collection, title: it.title, whole: p.whole, pages: [...p.pages], why: p.why }]
      : [];
  }),
  /** 'collection/file', lower case. */
  scans: [...PRIVATE_SCAN_KEYS],
  faces: EVERY_FACE.map((f) => ({
    id: f.id,
    item: f.item.slug,
    collection: f.collection,
    file: f.file,
    region: f.region,
    store: f.store,
    fromWithheld: f.fromWithheld,
    crop: f.crop,
  })),
  /** Dead people's faces that stay private with their photograph, and why. */
  heldFaces,
  /** Addresses that must never appear on the public site. */
  paths: [
    ...EVERY_ITEM.filter((it) => it.private).map((it) => it.href),
    ...[...LIVING.keys()].map((id) => `/collections/names/${id}`),
  ],
};

/**
 * A LIVING PERSON'S NAME, TYPED INTO SOMETHING PUBLIC. The rules above
 * follow who is PICTURED or NAMED IN the records; they cannot read prose. A
 * caption that says "with her grandson Austin Allison", an inscription
 * naming a child, a dead person's scope note that lists their living
 * children - those are words you wrote, on records that are public, and they
 * are published as written. This finds them: every public record whose text
 * holds a living person's name in full (two words or more, so a first name
 * alone is not reported). `npm run private` prints the list; whether a line
 * should change is yours to say.
 */
export const livingNamedInPublic = (): { person: string; where: string; found: string }[] => {
  const out: { person: string; where: string; found: string }[] = [];
  const living = [...LIVING.keys()].map((id) => {
    const p = everyPersonById.get(id) as Person;
    const forms = [...new Set([naturalName(p), ...(p.variants ?? [])])].filter((f) => f.trim().split(/\s+/).length >= 2);
    return {
      name: naturalName(p),
      tests: forms.map((f) => ({
        form: f,
        re: new RegExp(`(^|[^\\p{L}])${f.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+')}($|[^\\p{L}])`, 'iu'),
      })),
    };
  });
  if (!living.length) return out;
  const look = (where: string, texts: (string | undefined | null)[]) => {
    const text = texts.filter(Boolean).join('\n');
    if (!text) return;
    for (const l of living) {
      const hit = l.tests.find((t) => t.re.test(text));
      if (hit) out.push({ person: l.name, where, found: hit.form });
    }
  };
  for (const c of EVERY_COLLECTION) {
    look(`collection ${c.slug}`, [c.title, c.scope, c.custody, c.arrangement, isPrivateItem(c.epigraph?.source) ? '' : c.epigraph?.text, c.epigraph?.attribution]);
  }
  for (const it of PUBLIC_ITEMS) {
    look(`item ${it.slug}`, [
      it.title,
      it.description,
      it.place,
      it.provenance,
      it.studio,
      it.photographer?.name,
      it.photographer?.basis,
      it.identificationBasis,
      it.rights.note,
      ...it.date.basis,
      ...it.inscriptions.flatMap((x) => [x.text, x.hand, x.note]),
      ...it.depicts.flatMap((x) => [x.as, x.position, x.basis]),
      ...it.mentions.flatMap((x) => [x.as, x.note, x.basis]),
      ...(it.details ?? []).map((x) => x.caption),
      ...it.prints.flatMap((x) => [x.title, x.description, x.place]),
      ...(it.related ?? []).map((x) => x.relation),
      ...it.faces.flatMap((x) => [x.label, x.transcription, x.surrogate.note]),
    ]);
  }
  for (const p of EVERY_PERSON) {
    if (LIVING.has(p.id)) continue;
    look(`person ${p.id}`, [
      p.scopeNote,
      p.qualifier,
      ...(p.sources ?? []),
      ...(p.variants ?? []),
      ...(p.relations ?? []).filter((r) => !LIVING.has(r.person)).map((r) => r.basis),
    ]);
  }
  return out;
};

// Said once per build, in numbers only: a build log is no place for names.
{
  const whole = PRIVACY.items.filter((i) => i.whole).length;
  const pages = PRIVACY.items.reduce((n, i) => n + i.pages.length, 0);
  console.log(
    `[collections] audience: ${AUDIENCE}. Private: ${LIVING.size} living ` +
      `${LIVING.size === 1 ? 'person' : 'people'}, ${whole} item${whole === 1 ? '' : 's'}, ` +
      `${pages} page${pages === 1 ? '' : 's'}, ${PRIVATE_SCAN_KEYS.size} scan${PRIVATE_SCAN_KEYS.size === 1 ? '' : 's'}.`
  );
}

/* ------------------------------------------------------------------ *
 * Warnings, not errors: brothers and sisters whose recorded PARENTS do not
 * fit what the records say of them (see `half` on Relation, types.ts).
 *
 * Nothing here decides who is a half-sibling - that is stated on a record
 * or it is not said. This only points at places where two statements pull
 * against each other, so one of them can be looked at again:
 *   - `half: true` on something that is not a sibling relation;
 *   - marked half-siblings who share BOTH their recorded parents, or none;
 *   - siblings NOT marked half who share only one parent, where each has
 *     two parents recorded (so it is not just an unfinished record) - the
 *     likeliest case of a half-sibling waiting for its mark;
 *   - siblings who have no recorded parent in common at all.
 * Each pair is reported once. A pair where either person has no parent
 * recorded is left alone: there is nothing to compare.
 * ------------------------------------------------------------------ */
{
  for (const p of PEOPLE) {
    for (const r of p.relations ?? []) {
      if (r.half && r.type !== 'sibling') {
        console.warn(`[people] ${p.id}: \`half\` is set on a ${r.type} relation (to ${r.person}); it only means something on a sibling.`);
      }
    }
  }
  const parentsOf = new Map<string, Set<string>>(
    PEOPLE.map((p) => [p.id, new Set(relationsOf(p.id).filter((k) => k.type === 'parent').map((k) => k.person))])
  );
  for (const p of PEOPLE) {
    for (const k of relationsOf(p.id)) {
      if (k.type !== 'sibling' || !(p.id < k.person)) continue;
      const a = parentsOf.get(p.id)!;
      const b = parentsOf.get(k.person)!;
      if (a.size === 0 || b.size === 0) continue;
      const shared = [...a].filter((x) => b.has(x)).length;
      const pair = `${p.id} and ${k.person}`;
      if (k.half) {
        if (shared === 0) {
          console.warn(`[people] ${pair}: marked half-siblings, but no recorded parent is common to both.`);
        } else if (shared >= 2) {
          console.warn(`[people] ${pair}: marked half-siblings, but they share ${shared} recorded parents.`);
        }
      } else if (shared === 0) {
        console.warn(`[people] ${pair}: recorded as siblings, but no recorded parent is common to both.`);
      } else if (shared === 1 && a.size >= 2 && b.size >= 2) {
        console.warn(`[people] ${pair}: siblings with only one recorded parent in common. If they are half-siblings, add half: true to the relation.`);
      }
    }
  }
}

/* ------------------------------------------------------------------ *
 * A warning, not an error: a photograph dated wholly outside a person's
 * exact life dates. It can be right - a post-mortem portrait, a copy of an
 * older photograph - so the build carries on; but it is far more often a
 * mistyped year or a wrong identification, and worth a second look.
 *
 * "After they died" applies only to PICTURES of someone. A person who is
 * NAMED in a document (an obituary, a news clipping, a letter, a probate
 * record) can be named long after their death, so `mentions` never trigger
 * that warning. "Before they were born" still applies to both.
 * ------------------------------------------------------------------ */
{
  const year = (v?: string) => (v && /^\d{3,4}$/.test(v.trim()) ? Number(v) : undefined);
  for (const p of PEOPLE) {
    if ((p.dateType ?? 'exact') !== 'exact') continue;
    const born = year(p.birth);
    const died = year(p.death);
    for (const a of appearancesOf(p.id)) {
      // A print in an album is judged by its own date where it has one: the
      // album's span says only when the album was filled.
      const s = a.print?.date ? spanOfDate(a.print.date) : spanOf(a.item);
      if (!s || s.openStart || s.openEnd) continue;
      if (born !== undefined && s.to < born) {
        console.warn(`[collections] ${a.item.slug}: dated ${s.from}-${s.to}, before ${p.id} was born (${born}).`);
      }
      if (!a.named && died !== undefined && s.from > died) {
        console.warn(`[collections] ${a.item.slug}: dated ${s.from}-${s.to}, after ${p.id} died (${died}).`);
      }
    }
  }
}