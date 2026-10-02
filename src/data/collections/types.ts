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
  | 'silver gelatin print'
  | 'tintype'
  | 'copy print'
  | 'ambrotype'
  | 'photograph album'
  | 'bound manuscript volume'
  | 'bound photograph album'
  | 'letter'
  | 'document'
  | 'unknown';

/**
 * WHAT KIND OF THING an item is. Omit it and the item is a photograph, which
 * most of them are. The pages use it for their words - a person is "in 2
 * photographs and 1 journal" - and to decide how the item is read: anything
 * with `pages` gets a page reader, whatever its kind.
 */
export type ItemKind = 'photograph' | 'journal' | 'letter' | 'document' | 'artifact';

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

/**
 * A PLACE ON ONE VIEW OF THE OBJECT, as percentages of that image's width and
 * height from the top left - the same convention as `details`, so a region
 * survives a rescan at any resolution. Never type these by eye: open the item
 * page with ?regions on the end of the URL, drag a box on the photograph (or
 * Shift+drag inside Examine, where you can zoom in first), and the finished
 * line is copied to the clipboard.
 */
export interface Region {
  /**
   * 'recto', 'verso', the key of one of `views`, or a page: 'p12'. Omit it
   * and a person's region is on the recto, and an inscription's is on the
   * face its `location` names. An item with pages has no recto to fall back
   * on, so there the face is always given - ?regions writes it for you.
   */
  face?: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

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
  /**
   * WHERE IN THE PICTURE, as a box. Optional, and worth it on any group
   * photograph: the item page outlines the face when a reader points at the
   * name, and Examine flies to it. `position` stays useful as words; this is
   * the same claim made precise.
   */
  region?: Region;
}

/**
 * ONE PRINT ON A PAGE OF AN ALBUM. The album is the item and its leaves are
 * its `pages`; a print is a box on one of those pages - the same percentage
 * box as a face or a named detail - with as much of its own description as
 * you have. Nothing is cut out: the page scan stays the one master, and the
 * print is shown by framing that scan.
 *
 * The whole of a print can be one pasted line:
 *
 *   { region: { face: 'p5', x: 16.4, y: 8.1, w: 31.2, h: 34.6 } },
 *
 * Open the album with ?regions on the end of the URL, turn to the page, and
 * drag round each print with Alt (or Ctrl) held: the lines for that page
 * collect on the clipboard, ready to paste into `prints`. Draw the box round
 * the print and its corner mounts, not just the picture area.
 *
 * WHO IS IN IT is not entered here. People stay in the item's `depicts`,
 * each with a face region on the page ({ face: 'p5', ... }), and a person
 * belongs to whichever print their face falls inside. So nothing links a
 * name to a print by hand, and nothing can drift out of step.
 */
export interface Print {
  /**
   * WHERE IT IS. `face` is the page and is required here: 'p5' is the fifth
   * image, whatever the album's own numbering says.
   */
  region: Region;
  /**
   * A caption written on the leaf, as written; otherwise a supplied title in
   * brackets. Omit it and the print is known by its picture.
   */
  title?: string;
  /** What is visible. One honest sentence, as for an item. */
  description?: string;
  /** Only when this print can be dated more closely than the album. */
  date?: DateEstimate;
  /** Only when it differs from the album's. */
  place?: string;
  format?: ObjectFormat;
  /** Of the print itself: '2 1/2 x 4 1/4 in.' */
  dimensions?: string;
  /**
   * THE SLUG OF ITS OWN RECORD, for a print that has earned one - lifted
   * from its corners and found to have writing on the back, or a duplicate
   * of a print held loose elsewhere. That item carries the recto and verso;
   * this line points the album page at it. The build throws on a slug that
   * does not exist.
   */
  item?: string;
}

/**
 * A PERSON NAMED IN THE TEXT of a journal, letter or document, as opposed to
 * one pictured in a photograph. Same rule as a depiction: a name needs its
 * confidence and its grounds - "Named in the minutes of 12 March 1884 as
 * Worthy Master" is a basis; a name alone is not.
 */
export interface Mention {
  /** Key into PEOPLE. Omit when the person has no record yet. */
  person?: string;
  /** The name exactly as written, when it differs or has no record. */
  as?: string;
  /**
   * WHICH PAGE, by its key: 'p1', 'p2' ... in image order. Omit only when the
   * item has no pages. For a name written several times, list the page it is
   * most usefully found on and say the rest in `note`.
   */
  page?: string;
  confidence: Confidence;
  /** Omit to inherit the item's `identificationBasis`, as depictions do. */
  basis?: string;
  /** Anything else: the office held, the other pages the name appears on. */
  note?: string;
  /**
   * Where on the page the name is written, as percentages - the same box as
   * everywhere else. The page reader outlines it when a reader points at the
   * name. `face` is taken from `page` when the region does not give one.
   */
  region?: Region;
}

/**
 * ONE PAGE of a bound volume or a multi-leaf document, in IMAGE ORDER. The
 * key of the n-th page is 'p' + n - 'p1', 'p12' - and that is what a mention,
 * a detail or a region names. Keys follow the images, never the volume's own
 * numbering, which rarely starts on the first image and is not always there.
 */
export interface Page extends Surrogate {
  /**
   * What this page is, as a reader would say it: 'Front cover', 'Inside
   * front cover', 'p. 1', '[unnumbered]', 'Blank'. Omit it and the page is
   * called 'Page n' by its image position. Set it wherever the volume's own
   * pagination differs from image order, which is usually from the first
   * page on.
   */
  label?: string;
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
  /** Where the writing is, so the transcription can be read against the ink. */
  region?: Region;
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

  /** Omit for a photograph. See ItemKind. */
  kind?: ItemKind;
  /**
   * THE PAGES of a journal, a letter of several leaves, any multi-page
   * document - one image each, in order. An item with pages is read page by
   * page: a strip of pages under the plate, a transcription beside it, and
   * each page with its own address. `recto` stays the image the item is
   * represented BY in lists (normally the cover, which may be the same file
   * as the first page), and `verso` is not used - a volume has pages, not a
   * back. Further `views` (the spine, the volume closed) follow the pages.
   *
   * Seventy of these are not typed by hand: scripts/journal-pages.mjs reads
   * the folder and writes the list. The transcriptions live apart, in
   * src/data/collections/transcriptions/<item-slug>.md - see the README
   * there.
   *
   * A PHOTOGRAPH ALBUM is the same thing: each leaf is a page, scanned whole
   * - leaf, mounts and all - and the prints on it are listed in `prints`.
   */
  pages?: Page[];
  /** People named in the text. See Mention. */
  mentions?: Mention[];
  /**
   * THE PRINTS MOUNTED ON THE PAGES of an album, in the order they should be
   * read - normally page by page, and across each page as the eye goes.
   * Only an item with `pages` can have them. See Print.
   */
  prints?: Print[];

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
   * THE FRONTISPIECE: the print the collection page opens on, large, on a
   * dark ground. OPTIONAL; omit it and the first key item is used. The build
   * throws on a slug that is not one of this collection's own items.
   */
  frontispiece?: string;

  /**
   * AN EPIGRAPH for the frontispiece. OPTIONAL, and never filled in for you:
   * nothing is quoted on the page unless it is stated here. Without it the
   * print stands beside its own record - title, people, date.
   *
   *   text         the words; line breaks are kept
   *   attribution  written out in full, as it should read:
   *                'Inscribed on the back of the portrait of Benjamin B. Thomas'
   *   source       OPTIONAL slug of the item the words come from; the
   *                attribution then links to it (the build throws on a slug
   *                that is not this collection's)
   *
   * Choose words you stand behind. An inscription is evidence, not a caption:
   * set out of context in the largest type on the page, a mistaken name on a
   * verso reads as a fact.
   */
  epigraph?: { text: string; attribution: string; source?: string };

  /**
   * THE MOUNT TONE, as '#rrggbb'. OPTIONAL; omit it and the build samples the
   * key print's mount (see mount.ts), logging the value so it can be pinned
   * here. Set it to fix a collection's colour or to overrule a sample.
   */
  mount?: string;

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
 * A print as the pages read it: placed, numbered and joined to the people
 * whose faces fall inside it.
 */
export interface ResolvedPrint extends Print {
  /** 'print-<page number>-<position on that page>': 'print-5-2'. */
  id: string;
  /** Position in the album, from 1, in the order listed. */
  n: number;
  /** The page it is on, by key ('p5') and by position (5). */
  page: string;
  pageNo: number;
  /** Position among the prints on its page, from 1, in the order listed. */
  onPage: number;
  /** Its address: the album opens on the page with the print outlined. */
  href: string;
  /**
   * WHO IS IN IT, as indexes into the item's `depicts`: every depiction
   * whose face region has its centre inside this print's box.
   */
  people: number[];
}

/**
 * What the pages consume. Authoring is loose; consumption is strict - the
 * index fills every optional field from the collection's defaults so no page
 * ever has to handle `undefined`. Loose in, strict out.
 */
export interface ResolvedItem extends Item {
  collection: string;
  titleSource: 'inscribed' | 'supplied';
  kind: ItemKind;
  recto: Surrogate & { capture: string };
  /**
   * Every view of the object in display order, already labelled and keyed.
   * The page iterates THIS and never has to know that recto and verso are
   * spelled differently in the data. For an item with pages, the pages come
   * first, keyed p1, p2 ..., each with its position (`page`, from 1) and
   * the transcription of that page when there is one.
   */
  faces: {
    key: string;
    label: string;
    surrogate: Surrogate;
    page?: number;
    transcription?: string;
  }[];
  /** How many pages; 0 for anything read as views rather than pages. */
  pageCount: number;
  /** The prints of an album, resolved; empty for everything else. */
  prints: ResolvedPrint[];
  mentions: (Mention & { basis: string })[];
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

/**
 * The four rights statuses mapped to the standard statements digital libraries
 * use, so the page can link to them and the structured data can carry a URI a
 * machine understands. RightsStatements.org URIs are canonically http://.
 * 'undetermined' is UND (evaluated, and could not be determined) rather than
 * CNE (not evaluated), because choosing this status IS an evaluation.
 */
export const RIGHTS: Record<RightsStatus, { label: string; statement: string; uri: string }> = {
  'public-domain': {
    label: 'Public domain.',
    statement: 'Public Domain Mark 1.0',
    uri: 'https://creativecommons.org/publicdomain/mark/1.0/',
  },
  'no-known-restrictions': {
    label: 'No known copyright restrictions.',
    statement: 'No Known Copyright',
    uri: 'http://rightsstatements.org/vocab/NKC/1.0/',
  },
  'in-copyright': {
    label: 'In copyright.',
    statement: 'In Copyright',
    uri: 'http://rightsstatements.org/vocab/InC/1.0/',
  },
  undetermined: {
    label: 'Rights undetermined.',
    statement: 'Copyright Undetermined',
    uri: 'http://rightsstatements.org/vocab/UND/1.0/',
  },
};

/** What each kind is called, singular. */
export const KIND_NOUN: Record<ItemKind, string> = {
  photograph: 'photograph',
  journal: 'journal',
  letter: 'letter',
  document: 'document',
  artifact: 'artifact',
};

export const CONFIDENCE_LABEL: Record<Confidence, string> = {
  certain: 'Identified',
  probable: 'Probable',
  possible: 'Possible',
  unidentified: 'Unidentified',
};