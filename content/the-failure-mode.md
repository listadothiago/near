# The Failure Mode — Near's AI-content-practice column

**Decision (2026-09-07, operator directive):** Near runs a fifth
standing column, mirroring the structures of the weekly editorial
column (`content/editorial-column.md`), Ladies&Gentlethem
(`content/ladies-and-gentlethem.md`), The Setlist
(`content/the-setlist.md`) and The Pass. It is **PARSER's** own column
on how AI content actually gets made.

The trigger was the operator's read on the piece that had just shipped
under the weekly editorial column: *"is not a guide, this is a first
installment of PARSER column."* That piece,
["I Look Pretty Good for a Dead Internet
Site"](collections/i-look-pretty-good-dead-internet-site/en.mdx), was
therefore **moved out of the editorial column and becomes issue #1
here**, on the same day. `content/editorial-column.md`'s own series
index records the reassignment rather than quietly dropping it.

The column name comes from PARSER's own bio
(`.claude/skills/parser/SKILL.md`, `messages/*.json`'s
`authors.parser`): "the tooling, the failure modes, the difference
between a real workflow and a vendor's pitch deck." Route slug is
`the-failure-mode`. Naming the column after the beat rather than after
the byline follows the same reasoning The Setlist used, and leaves room
for a guest byline on an issue PARSER did not write personally.

## Byline and editor model

**PARSER is the standing byline.** This is a deliberate difference from
The Setlist and the weekly editorial column, where the orchestrator
rarely writes personally and the byline rotates freely. PARSER is a
consultant-tier persona with `beats: []` (`lib/content/authors.ts`) and
no place-writing remit, so the column's subject matter *is* PARSER's
only subject matter. Issues run under `meta.author: "parser"` by
default. A guest byline is allowed where a specific issue genuinely
belongs to someone else's expertise, but it is the exception and needs
a reason, not a rotation slot.

PARSER also owns the column's continuity and quality bar — scoping,
the running argument across issues, what is worth an issue and what is
not. That is the editor's job in the sense every other Near column
charter uses the word.

**The `meta.editor` field is separate and records who actually edited
that issue,** since a standing byline cannot meaningfully edit itself.
Issue #1 keeps `editor: "radar-x"`: RADAR-X genuinely edited it under
the weekly editorial column, and RADAR-X's involvement is in any case
mandatory on every issue of every Near column via the joint scoping
step below. Reassigning the column does not retroactively unmake the
editing that happened.

## Mandatory guidance step — near-seo + near-trendsetter (RADAR-X), every issue, no exceptions

**Standing rule for every Near column editor (2026-09-01, operator
directive), in force here identically:** before scoping any issue, the
column editor consults `near-seo` (which market/query gap this fills)
and `near-trendsetter`/RADAR-X (what's actually current in the
alt-press) together — the same joint process that governs every other
Near content decision, per `BACKLOG.md`'s process note and
`feedback_content-decisions-seo-trendsetter.md`. This applies to PARSER
here exactly as it applies to RADAR-X on the weekly editorial column,
to RUCIO LIBERO on The Setlist, and to Ladies&Gentlethem's rotating
writers. **No column editor scopes an issue solo**, and PARSER being
the standing byline does not create an exemption.

## Cadence

One issue per week, matching every other Near column (2026-09-01
operator directive, "make all columns weekly, they're great").
`near-refresh` checks this file each run and, once more than 7 days
have passed since the last published issue in the log below, treats
scoping the next one as a priority task — starting with the joint
near-seo + RADAR-X step above.

**Hold rather than force.** PARSER's own charter is explicit that a
column issue is warranted "only when there is a concrete practice,
change or failure worth sharing." A genuine gap in the log is more
honest than an issue padded out of a thin week, and the bar here is
higher than on the other columns precisely because the subject is
process: a manufactured process observation is exactly the failure the
column exists to name.

## What makes a good issue

- **A concrete practice, tooling change, or named failure** that Near's
  own pipeline or the wider AI-content space actually ran into. Not
  "AI is changing content." A specific thing that happened, with a
  date attached.
- **Honest about Near's own machinery**, including where it strains.
  The `.claude/skills/parser/SKILL.md` "Learnings" log is a legitimate
  primary source for this column — that is what it is for.
- **Never confidential.** PARSER "must never turn routine internal
  mechanics into public copy or publish confidential metrics." Process
  transparency is not the same as publishing internal numbers,
  operator details, or anything the geolocation/privacy rules put
  off-limits.
- **Sourced and fact-checked like any other piece**, under
  `content/rules.md`'s `quality-gate-before-publish` and
  `near-tov-police`'s mechanical checks. The anti-fabrication rule
  applies with no softening: never invent a fact, date, or source.
- **Ties to real places** where the argument genuinely supports it, per
  `collectionMetaSchema`'s `placeSlugs.min(1)`. A place cited here has
  to carry a specific fact that does argumentative work, not a generic
  claim any venue would satisfy.

## Standing format element: one diagram per issue, considered

**Operator directive, 2026-09-07:** this column "could always include
some lucid chart (but not ugly) type of visual flow," built with the
vector-derived method. **Every issue should therefore consider carrying
one diagram**, built with `<FlowDiagram>`
(`components/mdx/FlowDiagram.tsx`) per `near-illustrator`'s "Diagrams:
the vector-derived method, NOT rasterized" section.

*Consider*, not *must*. A forced diagram on an issue that does not need
one is worse than no diagram, and the two gates from that section decide
it:

1. **A chart must make one claim better than a paragraph does.** If the
   prose already says it plainly, the chart is decoration and gets cut.
2. **Its labels are copy, not annotation.** They are written in the
   issue's voice, translated as genuine local editions per
   `near-translator` rather than copied across from English, and held to
   `near-tov-police`'s rules exactly like body text.

Rendered as live markup, never as a raster: six locales, no garbled
baked-in text, and it reflows on a phone. The acid green stays reserved
for the single handoff moment the diagram is actually about.

**No standing recap-of-the-scene requirement.** The weekly editorial
column's second-entry-onward structure (opinion + recap of Near's own
recent output + AI-process thread) is that column's rule and does not
transfer here. This column is the AI-process thread, full-time.

## Site placement

A nav label sits in the header's Columns dropdown, same visual weight
as the other column links, pointing at `/the-failure-mode`. That route
is an **archive page** — every published issue, newest first — mirroring
`/the-setlist` and `/column` exactly: reads
`content/the-failure-mode-index.json`'s `slugs` array, resolves each via
`getCollectionContent`, filters to `status: "active"`, and renders with
`CollectionCards`. A dedicated RSS feed lives at
`/the-failure-mode/feed.xml`, same pattern as the other columns, and is
listed in `app/[locale]/layout.tsx`'s feed alternates. The route is also
registered in `app/sitemap.ts`.

**Whoever flips an issue's `meta.json` `status` from `draft` to
`active` must also prepend its slug to
`content/the-failure-mode-index.json`'s `slugs` array** — the archive
page and feed only ever show issues listed there, and only if they are
actually `active`. Keep this file's issue log below in sync.

## Issue log / changelog

Chronological, most recent first. Each entry: title, slug, byline,
publish date, one-line topic.

1. **"Automate the Alarm, Not the Answer"** —
   `i-look-pretty-good-dead-internet-site` — PARSER, edited by RADAR-X
   — published 2026-09-07. Automation should monitor stale facts and
   dead sources; humans keep reporting, judgment and voice. Uses
   Michelberger Hotel's confirmed PEOPLE Festival dates (10–11 October
   2026) as a live example of a dated fact that will need pushing back
   at an editor, and names PARSER's own 2026-09-03 failure: a queue
   note's dated hook going stale because nothing re-checks a queue
   note after it is written. Carries the column's first `<FlowDiagram>`.

   *Slug note:* the slug is the original working title and stays that
   way. The piece was retitled on 2026-09-07 by operator directive — the
   old title, "I Look Pretty Good for a Dead Internet Site," was written
   in the first person as the website, a voice the piece never uses,
   while the new one states the thesis in PARSER's own register. The
   page was already live and indexed, so retitling was free and
   re-slugging was not. No redirect, no directory rename.

## Changelog

- **2026-09-07 — column created, by operator directive.** The operator
  read the piece above and ruled it "not a guide, this is a first
  installment of PARSER column," then named the column **The Failure
  Mode** after PARSER's own bio line. Created this charter, the index
  file, `app/[locale]/the-failure-mode/page.tsx`, the RSS route, the
  header nav entry, the sitemap entry, the layout feed alternate, and
  `collection.theFailureMode*` strings in all six locales.
- **2026-09-07 — issue #1 reassigned in.**
  `i-look-pretty-good-dead-internet-site` removed from
  `content/editorial-column-index.json` (which retains
  `zombie-listicle-problem`) and added here. The reassignment is logged
  in `content/editorial-column.md`'s own series index and in the
  piece's `meta.json` `statusHistory`; `meta.editor` stays `radar-x`
  per the byline-and-editor model above.
- **2026-09-07 — diagrams become a standing format element,** by
  operator directive (see the section above). `<FlowDiagram>` and the
  `near-illustrator` diagram section were built in the same run; issue
  #1 carries the first one, in all six locales.
- **2026-09-07 — issue #1 retitled** to "Automate the Alarm, Not the
  Answer," by operator directive. See the slug note in the issue log
  above for the reasoning and for why the slug did not move.
- **2026-09-07 — copy-edit pass on issue #1.** Stock
  thought-leadership phrasing cut across all six locales, the
  Michelberger link rebuilt around a verifiable dated fact, and the
  1-2-3-4 Go! Records queue-note failure added as a named example.
