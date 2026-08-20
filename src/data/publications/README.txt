ADDING A PUBLICATION
austinlallison.com — src/pages/publications/
Last updated 2026-08-19

--------------------------------------------------------------------------
WHAT THE SYSTEM IS
--------------------------------------------------------------------------

Every publication page is two files:

  src/data/publications/<slug>.ts      citation, figures, endnotes
  src/pages/publications/<slug>.astro  the prose and the markup

Everything they share lives in six components and one library:

  src/lib/citation.ts            types + citation formatters
  src/components/Fn.astro        one footnote marker
  src/components/Endnotes.astro  the notes list + hover previews
  src/components/Figure.astro    a numbered figure
  src/components/FigRef.astro    an in-text "(Fig. 4)" pointer
  src/components/CiteThis.astro  the Chicago/MLA/BibTeX box
  src/components/ScholarlyMeta.astro  the <head> metadata

You should never need to edit those seven when adding an article. If you
find yourself wanting to, see WHEN TO CHANGE THE SHARED FILES at the end.

The apparatus is opt-in. An article with no notes doesn't import Fn or
Endnotes. One with no images doesn't import Figure or FigRef. Nothing
breaks by omission — you just leave the pieces out.


--------------------------------------------------------------------------
THE PROCEDURE
--------------------------------------------------------------------------

1. PICK A SLUG

   Lowercase, underscores, matching the URL you want:
       /publications/opportunity_knocking  ->  opportunity_knocking

   The .astro filename, the data filename, and CITATION.canonicalPath all
   have to agree. (Data files use hyphens, pages use underscores — that's
   how the existing four are; either is fine, just be consistent.)

2. COPY THE TEMPLATES

   cp src/data/publications/_template.ts   src/data/publications/<slug>.ts
   cp src/pages/publications/_template.astro src/pages/publications/<slug>.astro

   Or copy the closest existing article instead:

     journal article, figures, DOI      capitol-land-shq.ts
     journal article, no DOI            spring-sprung-it.ts
     journal article, no DOI, no issue  opportunity-knocking.ts
     preprint of a published article    capitol-land-manuscript.ts

3. FILL IN THE CITATION

   Omit what you don't have. Do not use a placeholder, an empty string, or
   a guess. doi, issue, monthYear, issn, publisher, journalAbbrev and the
   page range are all optional; the formatters and the metadata skip
   whatever is absent. A wrong DOI is worse than no DOI.

   Set `status` honestly:
     'record'      published journal article — emits full Scholar metadata
     'manuscript'  preprint — emits thin metadata, points at the record
     'draft'       anything else — title and author only

   USE 'draft' FOR ANYTHING THAT IS NOT A JOURNAL ARTICLE. A newsletter
   column or encyclopedia entry advertising citation_journal_title tells
   Google Scholar to index it as scholarship, which is worse than telling
   it nothing.

4. ADD THE IMAGES, IF ANY

   Put them in ONE of:
       src/assets/publications/<dir>/     preferred
       public/images/<dir>/               also works

   <dir> is whatever you set as FIGURES.dir. Files under src/assets go
   through astro:assets and get intrinsic dimensions, srcset and modern
   formats; anything not found there falls back to the /public path with
   lazy loading. Both work — src/assets is just better.

   Order in FIGURES.entries IS the figure numbering. Reorder the array and
   every caption and cross-reference follows.

5. ADD THE NOTES, IF ANY

   NOTES is [{ n, html }], numbered from 1 with no gaps.

6. WRITE THE PAGE

   Prose goes in the .prose-article div. Then:
       <Fn n={7} />                              a footnote marker
       <Figure set={FIGURES} id="my-map" />      a figure, where discussed
       <Figure set={FIGURES} id="my-map" lead /> the one above the article
       <FigRef set={FIGURES} id="my-map" />      an in-text "(Fig. 4)"

   Delete <CiteThis> if it isn't citable, <Endnotes> if there are no notes.

7. ADD IT TO THE INDEX

   The publications index page doesn't read the data files, so a new
   article is unreachable until you link it there.

8. CHECK IT

   npm run build          figure-id typos and bad imports fail here
   then open the page and confirm:
     - a footnote marker jumps to its note, and the backlink returns
     - the note lands below the sticky header, not under it
     - figure numbers run 1..N with no repeats
     - the cite box copies correctly
     - view source: citation_* tags are in <head>, not the body


--------------------------------------------------------------------------
THE FIVE THINGS THAT ACTUALLY GO WRONG
--------------------------------------------------------------------------

1. A MARKER WITH NO NOTE
   <Fn n={64} /> with only 63 notes gives a dead link and no preview, and
   NOTHING WARNS YOU. Check that your highest marker equals NOTES.length.

2. BACKTICKS, ${ }, OR BACKSLASHES IN NOTE TEXT
   NOTES html is a template literal. Those three characters break the file.
   Curly quotes and HTML entities (&ldquo; &amp; &ndash;) are fine — that's
   how all the existing notes are written. <em> and <a href> work.

3. A MISSING set={FIGURES}
   Every <Figure> and <FigRef> needs it. Without it the build throws
   "was called without a `set` prop" — which names the problem, but only
   after you've hit it.

4. CRLF LINE ENDINGS
   These files are CRLF. Editing by hand is fine; scripted edits must read
   and write raw bytes or you get a whole-file diff for a one-line change.

5. RootLayout NEEDS <slot name="head" />
   Already done, but if it ever gets removed, ScholarlyMeta renders in the
   body and Google Scholar silently ignores every citation_* tag. Nothing
   visibly breaks — the article just stops being indexable as scholarship.


--------------------------------------------------------------------------
THINGS WORTH DECIDING DELIBERATELY
--------------------------------------------------------------------------

ALT TEXT is empty by default, because the figcaption already describes the
image and an alt that restates it makes a screen reader say the same
sentence twice. Fill in `alt` only with genuine visual description — what
someone would see who cannot see it.

CROSS-REFERENCES are the one thing the page adds to a published text. Add
them where the prose already points at a specific image; don't write a new
sentence just to justify one. If a page reproduces a version of record, say
in the provenance note that the figure numbers are an editorial addition.

COMPARISON FIGURES: when two or three images make a point together, give
them one figure with multiple plates rather than separate stacked figures.
Three maps of the same county across three decades stacked vertically read
as repetition; side by side with year labels they read as evidence.

THE ABSTRACT feeds three places — the visible abstract, the meta
description, and the schema.org abstract. Use the journal's own where there
is one.


--------------------------------------------------------------------------
WHEN TO CHANGE THE SHARED FILES
--------------------------------------------------------------------------

Add a field to Citation in src/lib/citation.ts when an article genuinely
has something the interface can't express — that's how displayTitle and
subtitle got added. Make it OPTIONAL, and the other articles are unaffected.

Do NOT edit a component to accommodate one article's layout. If a new piece
needs a block quotation style, a table, or a different notes format, add a
component. The six that exist are shaped by four articles' needs, and
bending one of them to a fifth is how they stop being reusable.
