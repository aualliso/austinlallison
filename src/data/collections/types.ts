// src/data/collections/types.ts
//
// Schema for the family photograph collections.
//
// THE PRINCIPLE THIS FILE ENCODES: an identification and a date are CLAIMS,
// and a claim without its grounds is worth very little. So there is nowhere in
// this schema to write "Benjamin Thomas, 1890" and be done. A name needs a
// confidence and a basis; a date needs an interval and its evidence. If you
// find yourself wanting to skip those, the honest answer is usually
// `confidence: 'unidentified'`, which is a real answer and not a failure.
//
// SECOND PRINCIPLE: the OBJECT and the SURROGATE are different things with
// different histories. The photograph was made once, by someone, somewhere.
// The digital file was made later, by you, at some resolution, possibly from a
// copy rather than from the original. Conflating them is how a 2013 camera
// copy of a crayon portrait ends up described as a 2013 photograph.

// HOW MUCH TO WRITE, since the first ten records made this look heavier than
// it is: they were written at maximum density to show what the schema CAN
// hold. Almost nothing is required. A perfectly good record is:
//
//   {
//     slug: 'jean-and-sammy-with-goat',
//     title: '[Jean and Sammy with goat]',
//     titleSource: 'supplied',
//     format: 'snapshot',
//     recto: { file: 'jean_and_sammy.jpg', width: 2400, height: 1920 },
//     description: 'Two small children in a goat cart in a bare yard.',
//   },
//
// Seven lines. Deepen the ones that earn it - the ones with a verso, the ones
// that anchor a line, the ones somebody asks about - and leave the rest at
// seven lines forever. That is ordinary archival practice, not a compromise.

/* ------------------------------------------------------------------ *
 * Vocabularies
 * ------------------------------------------------------------------ */

/**
 * 'certain'      inscribed on the object, or otherwise documented
 * 'probable'     strong grounds, one inferential step (a hand you can
 *                attribute, a comparison with an identified item)
 * 'possible'     a reasonable suggestion that could be wrong
 * 'unidentified' nobody knows. A first-class answer, not a gap.
 */
export type Confidence = 'certain' | 'probable' | 'possible' | 'unidentified';

export type ObjectFormat =
  | 'cabinet card'
  | 'carte de visite'
  | 'mounted photograph'
  | 'real photo postcard'
  | 'snapshot'
  | 'crayon enlargement'
  | 'tintype'
  | 'copy print'
  | 'ambrotype'
  | 'unknown';

/**
 * Most family photographs are UNPUBLISHED works, so the pre-1930 rule that
 * covers published material does not reach them: unpublished works run life
 * of the author plus 70, or 120 years from creation where the maker is
 * unknown. Where the photographer cannot be identified there is usually no
 * way to establish the term, which is what 'no-known-restrictions' is for.
 * Not legal advice.
 */
export type RightsStatus =
  | 'public-domain'
  | 'no-known-restrictions'
  | 'in-copyright'
  | 'undetermined';

/* ------------------------------------------------------------------ *
 * Claims
 * ------------------------------------------------------------------ */

export interface Depiction {
  /** Key into PEOPLE. Omit when the person has no record yet. */
  person?: string;
  /** The name exactly as it reaches us, when it differs or has no record. */
  as?: string;
  confidence: Confidence;
  /**
   * WHY. "Named in ink on the verso", "supplied with the item, source
   * unrecorded". Omit to inherit the item's `identificationBasis`; the index
   * throws if there is neither, because a name with no grounds at all is the
   * one thing this schema exists to prevent.
   */
  basis?: string;
  /** Where in the frame, once known. Leave unset rather than guessing. */
  position?: string;
}

export interface Inscription {
  location: 'recto' | 'verso' | 'mount' | 'sleeve' | 'note';
  medium: 'pencil' | 'ink' | 'ballpoint' | 'printed' | 'stamped' | 'other';
  /** Transcribed as written. Keep the spelling; use [sic] in `note`. */
  text: string;
  /** Whose hand, when attributable, and on what grounds. */
  hand?: string;
  note?: string;
  /**
   * TRUE when the inscription dates the SUBJECT rather than the photograph -
   * "Built about 1885" on the back of a picture of a building tells you when
   * the building went up, not when the shutter opened. Keeping these apart is
   * the whole reason this flag exists.
   */
  datesSubjectNotObject?: boolean;
}

export interface DateEstimate {
  /** What prints on the page. Square brackets for an assessment: '[1885x1900]'. */
  display: string;
  earliest?: number;
  latest?: number;
  /** One line per piece of evidence. An empty array means say so on the page. */
  basis: string[];
  /** How much weight the interval carries. */
  confidence: Confidence;
}

/** The digital file. NOT the photograph. */
export interface Surrogate {
  file: string;
  /**
   * What this view IS. Defaults to 'Recto' and 'Verso' for those two, which
   * is right for a flat print - but wrong for anything cased. A
   * daguerreotype wants 'Case, closed' / 'Case, open' / 'Plate', and a
   * framed portrait wants 'Frame' / 'Portrait'. Set it and the button says
   * so.
   */
  label?: string;
  /**
   * OPTIONAL, and normally omit them. Once the file sits in
   * src/assets/collections/<slug>/, Astro knows the real dimensions and
   * plate() uses those. These two are only a fallback for a file still being
   * served raw out of /public, where nothing can measure it.
   */
  width?: number;
  height?: number;
  /**
   * 'flatbed, 600 ppi' / 'camera copy, Nikon D800'. Omit to take the
   * collection's default - most of a collection is usually scanned the same
   * way, and the exceptions are what you actually want to record.
   */
  capture?: string;
  /** When the surrogate was made, if known. */
  captured?: string;
  /** Anything that limits it: made from a copy print, downsampled, retouched. */
  note?: string;
}

/* ------------------------------------------------------------------ *
 * The item
 * ------------------------------------------------------------------ */

export interface Item {
  /**
   * THE identity. Permanent, used in the URL, and the key every
   * cross-reference resolves against. Every item has one, because every item
   * needs an address whether or not anyone ever numbered it.
   */
  slug: string;
  /**
   * Your internal control number, where the object carries one - 'c.1.4.1',
   * 'b.1.26.1'. OPTIONAL: not every photograph has been numbered, and the
   * letter prefixes are shelf bookkeeping rather than a statement about where
   * the material came from. Displayed on the item page when present, and
   * never used as a key - an identifier that only some records have cannot
   * hold a system together.
   */
  controlNumber?: string;
  /** Quoted from the object where inscribed; otherwise supplied, in brackets. */
  title: string;
  /** Defaults to 'supplied'. Say 'inscribed' when the object names itself. */
  titleSource?: 'inscribed' | 'supplied';
  series?: string;

  /** Omit when you have not determined it; renders as nothing, not 'unknown'. */
  format?: ObjectFormat;
  /** Of the object, mount included. '4 1/4 x 6 1/2 in.' */
  dimensions?: string;
  photographer?: { name: string; confidence: Confidence; basis: string };
  studio?: string;
  /** Where the photograph was taken, as specific as the evidence allows. */
  place?: string;

  /** Omit entirely when undated. The index fills in '[undated]'. */
  date?: DateEstimate;

  recto: Surrogate;
  verso?: Surrogate;
  /**
   * FURTHER VIEWS, in the order you want them shown - the open case, the
   * mat, a plate shot out of its housing. Each should carry a `label`, since
   * 'View 3' tells a reader nothing.
   *
   * Why these sit apart from recto/verso rather than in one list: for the
   * hundreds of flat prints that make up most of a family collection, front
   * and back is the whole truth and naming them costs nothing. Cased objects
   * are the exception, and an exception should not complicate the ordinary
   * case. `recto` stays the view the item is represented BY.
   */
  views?: Surrogate[];

  /**
   * What is VISIBLE. One honest sentence satisfies this. Optional - but when
   * it is absent the title has to serve as the image's text alternative, so
   * an item with a bracketed supplied title and no description is invisible
   * to anyone using a screen reader.
   */
  description?: string;

  /** Omit when there is nothing written on the object. */
  inscriptions?: Inscription[];
  /** Omit when nobody in it is named. */
  depicts?: Depiction[];
  /**
   * Where the names on THIS item came from, when they all came from the same
   * place. Depictions that give no `basis` of their own inherit this - so a
   * group photograph with fourteen names off one verso is fourteen names and
   * one sentence, not fourteen sentences.
   */
  identificationBasis?: string;

  /** How it reached you, where that differs from the collection's chain. */
  provenance?: string;
  /** Omit to take the collection's default. */
  rights?: { status: RightsStatus; note?: string };

  /**
   * NAMED DETAILS. Regions of the recto or verso worth pointing at, given as
   * percentages of the image so they survive a rescan at any resolution.
   * This is what makes an 8000px scan pay off: free zoom lets a reader hunt,
   * a named detail tells them what to look at and why it matters. Optional,
   * and most items will never have one.
   */
  details?: {
    /**
     * Which view the region is on: 'recto', 'verso', or the key of one of
     * `views` - its label lowercased and hyphenated, so 'Case, open' is
     * 'case-open'. The build throws and lists the valid keys if it misses.
     */
    face: string;
    /** Percentages of the image's width/height, from the top left. */
    x: number;
    y: number;
    w: number;
    h: number;
    caption: string;
  }[];

  related?: { slug: string; relation: string }[];

  /**
   * YOUR WORKLIST, not page content. Never rendered. This is the cataloguer's
   * note - what you would chase if you had an afternoon - and putting it on
   * the page made a described collection look like an unfinished one.
   * The reader gets one quiet invitation to write in instead.
   */
  needsWork?: string[];
}

/* ------------------------------------------------------------------ *
 * The collection
 *
 * A collection is a body of material that reached you AS A UNIT, with one
 * custodial chain. It is not a family line. Four lines that arrived in one
 * shoebox are one collection; one line split between two houses is two.
 * The family tree is carried by PEOPLE, which cuts across collections.
 * ------------------------------------------------------------------ */

export interface Series {
  id: string;
  title: string;
  scope?: string;
}

export interface Collection {
  slug: string;
  title: string;
  /** HOW IT CAME TO YOU. The one fact that cannot be reconstructed later. */
  custody: string;
  scope: string;
  arrangement?: string;
  /** Surnames represented. Descriptive only - not the arrangement. */
  lines: string[];
  places: string[];
  series: Series[];

  /**
   * KEY ITEMS. The slugs of the photographs that stand for this collection on
   * the /collections guide, in order - the first is laid on top. Up to three
   * are shown. OPTIONAL: omit it and the guide picks the earliest, a middle
   * and the latest dated photograph, so the card shows the reach of the
   * collection rather than whatever happens to be first in the box. Set it
   * when one photograph plainly IS the collection. The build throws on a
   * slug that is not one of this collection's own items.
   */
  keyItems?: string[];

  /**
   * Applied to every item that does not state its own. THIS IS WHERE THE
   * REPETITION GOES: five hundred prints scanned the same way should say so
   * once, not five hundred times.
   */
  defaults?: {
    capture?: string;
    rights?: { status: RightsStatus; note?: string };
    place?: string;
    identificationBasis?: string;
  };

  items: Item[];
}

/* ------------------------------------------------------------------ *
 * People. Referenced by items; never duplicated inside them.
 * ------------------------------------------------------------------ */

export interface Relation {
  type: 'child' | 'parent' | 'spouse' | 'sibling';
  person: string;
  /** Same rule as everywhere else: on what grounds do we say this? */
  basis: string;
  confidence: Confidence;
}

/**
 * AN AUTHORITY RECORD, not a name list. One established heading per person,
 * every variant form that person is found under, and the sources the heading
 * rests on - so that a name is a controlled access point rather than however
 * it happened to be typed that day.
 */
export interface Person {
  id: string;
  /**
   * THE ESTABLISHED HEADING. Inverted, with dates appended when they are
   * needed to break a conflict: 'Swann, Malcom, 1834-1912'.
   */
  authorized: string;
  surname: string;
  given?: string;
  /**
   * Life dates, entered SEPARATELY so the heading can be built to convention
   * and the individual years stay usable for sorting and for research.
   * Years only - '1834'. Leave one side empty for an open range.
   */
  birth?: string;
  death?: string;
  /**
   * 'exact'       1834-1912
   * 'approximate' approximately 1834-approximately 1912
   * 'active'      active 1885-1901   (use when only a period of activity is
   *               known, which is common for someone who survives only in a
   *               photograph and a county record)
   */
  dateType?: 'exact' | 'approximate' | 'active';
  /**
   * Other designation, for when dates cannot distinguish two people who would
   * otherwise share a heading: 'cotton ginner', 'of Bailey County, Tex.'
   */
  qualifier?: string;
  /**
   * SEE-FROM REFERENCES. Every other form this person is found under -
   * nicknames, maiden and married names, spelling variants as they appear on
   * the objects. Search should find the person through any of these.
   */
  variants?: string[];
  /**
   * WHERE THE HEADING COMES FROM. One line per source, in the form a
   * cataloguer would recognise: what was consulted and what it said.
   *   'Verso of the Benjamin B. Thomas portrait, in ink: "M. B. Thomas (Bud)"'
   */
  sources?: string[];
  /**
   * 'provisional' while the heading rests only on this collection's own
   * objects. 'established' once it is supported from outside - a census, a
   * headstone, a published record, an existing name authority.
   */
  status?: 'provisional' | 'established';
  /** Links out, so this record can be reconciled with somebody else's. */
  identifiers?: {
    viaf?: string;
    lccn?: string;
    findagrave?: string;
    familysearch?: string;
  };
  /** What distinguishes this person, for anyone choosing between headings. */
  scopeNote?: string;
  relations?: Relation[];
}

/**
 * What the pages consume. Authoring is loose; consumption is strict - the
 * index fills every optional field from the collection's defaults so no page
 * ever has to handle `undefined`. Loose in, strict out.
 */
export interface ResolvedItem extends Item {
  collection: string;
  titleSource: 'inscribed' | 'supplied';
  recto: Surrogate & { capture: string };
  /**
   * Every view of the object in display order, already labelled and keyed.
   * The page iterates THIS and never has to know that recto and verso are
   * spelled differently in the data.
   */
  faces: { key: string; label: string; surrogate: Surrogate }[];
  /** Where this item lives: /collections/<collection>/<slug>. */
  href: string;
  date: DateEstimate;
  inscriptions: Inscription[];
  depicts: (Depiction & { basis: string })[];
  rights: { status: RightsStatus; note?: string };
}

export const UNDATED_ESTIMATE: DateEstimate = {
  display: '[undated]',
  basis: [],
  confidence: 'unidentified',
};

/**
 * Build the heading the way a name authority record does: the established
 * form, then dates, then - only when dates cannot do the work - a
 * distinguishing designation.
 *
 *   Swann, Malcom, 1834-1912
 *   Thomas, M. B., approximately 1861-
 *   Naylor, Charley, active 1885-1901
 *   Swann, John, cotton ginner
 *
 * A person with no dates and no conflict is simply 'Swann, John', which is
 * correct - a bare heading is a real heading, not an incomplete one.
 */
export const headingDates = (p: Person): string => {
  if (!p.birth && !p.death) return '';
  const kind = p.dateType ?? 'exact';
  if (kind === 'active') {
    return `active ${p.birth ?? ''}-${p.death ?? ''}`.replace(/-$/, '');
  }
  const q = kind === 'approximate' ? 'approximately ' : '';
  const b = p.birth ? q + p.birth : '';
  const d = p.death ? q + p.death : '';
  return `${b}-${d}`;
};

/**
 * The heading turned back into reading order: 'Girdner, Nannie Atkinson
 * Swann' -> 'Nannie Atkinson Swann Girdner'.
 *
 * WHERE TO USE WHICH. Inverted headings exist so names FILE correctly - they
 * are right on the authority record itself and in any alphabetical index, and
 * wrong everywhere else. In a sentence, in a caption, or in a list of who is
 * in a photograph, nobody says "Swann, Malcom". Archival practice has always
 * kept these two apart; so should the pages.
 *
 * Splits on the FIRST comma only, so a compound surname or a maiden name
 * carried in the middle survives intact.
 */
export const naturalName = (p: Person): string => {
  const at = p.authorized.indexOf(',');
  if (at === -1) return p.authorized;
  const surname = p.authorized.slice(0, at).trim();
  const rest = p.authorized.slice(at + 1).trim();
  return rest ? `${rest} ${surname}` : surname;
};

/** Reading order with life dates, for a caption that wants them. */
export const naturalNameWithDates = (p: Person): string => {
  const d = headingDates(p);
  return d ? `${naturalName(p)}, ${d}` : naturalName(p);
};

export const heading = (p: Person): string => {
  const parts = [p.authorized];
  const d = headingDates(p);
  if (d) parts.push(d);
  else if (p.qualifier) parts.push(p.qualifier);
  return parts.join(', ');
};

export const CONFIDENCE_LABEL: Record<Confidence, string> = {
  certain: 'Identified',
  probable: 'Probable',
  possible: 'Possible',
  unidentified: 'Unidentified',
};