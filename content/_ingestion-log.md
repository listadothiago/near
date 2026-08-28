# Near — Ingestion Log

Append-only run log written by `near-editor`. Each run appends a section
with: timestamp, sources checked, places added/updated/skipped (with the
specific rule that caused a skip), and any near-inbox items triaged.

## 2026-08-20T10:00:00Z — seed content (manual, not via near-editor)

Hand-authored 3 seed places to validate rendering, i18n, and the map before
the first real `near-editor` run: `lx-factory-lisbon`, `time-out-market-lisboa`,
`borough-market-london`. All `status: active`, `trust: auto`.

## 2026-08-27T00:00:00Z — supplemental research pass (first use of the new entry point)

Ran the "supplemental research pass" entry point against all 3 existing
places — searched for additional coverage beyond each place's original
source, verified every URL before citing it, and updated both
`meta.sources` and the long-form body (en, pt-BR, it) with attributed
detail, including honest criticism where sources raised it (not just
praise).

- `lx-factory-lisbon`: +1 source (Tripexpert, aggregated critic reviews —
  Fodor's, Michelin, Lonely Planet). Added: critic praise quotes, plus the
  honest caveat that it's a deliberate-trip destination that skews toward
  a younger/artistically-inclined crowd, not universal appeal.
- `time-out-market-lisboa`: +2 sources (Do Eat Better Experience, Will Fly
  for Food). Added: specific dish praise (Sá Pessoa's suckling pig,
  Manteigaria's pastéis de nata), plus honest criticism — peak-hour
  chaos, small portions/high prices for what it is, seating scarcity —
  corroborated independently by both sources.
- `borough-market-london`: +2 sources (Time Out London, The Guide
  Magazine). Added: standout vendor detail (Neal's Yard Dairy, Black Pig,
  Bread Ahead), the Monday closure, plus honest criticism — both sources
  independently describe serious crowding and long queues at peak times.

No new places created this run; no rule violations. All updates keep
`trust: auto` unchanged per `dedupe-by-place` (an update to an existing
auto place doesn't require re-approval).

## 2026-08-28T00:00:00Z — hero-image resolution pass (published every remaining draft)

Not a new-place run. An audit while scoping a Baixada Santista/São Paulo
content push found that all 7 `status: draft` places were in São Paulo and
Santos, i.e. exactly the two markets the operator had just prioritized.
The live board was showing 9 of 16 places, and none of the Santos coverage
at all.

> **Correction, appended same day.** This entry originally claimed the 7
> were drafts "for one reason only — `quality-gate-before-publish`'s
> hero-image requirement." That was wrong, and the error was in the
> method: `heroImage == null` was checked and the cause inferred from it,
> without evaluating the rest of the gate. **All 7 also fail the same
> rule's `body >= 600 words` condition** (294–518 words in English), so
> publishing them cleared one blocking condition and ignored another.
> See the follow-up entry below.

Resolved a hero image for each from the place's *own* existing source
article (`strategy: source`, credited and linked, per the same convention
already used by `bar-skula-oakland` and `stray-dog-mission-san-francisco`).
Every candidate image was fetched and visually checked to confirm it
depicts the right subject before being used — one obvious trap avoided:
the CNN Brasil article cited by `bar-fel-copan-sao-paulo` has an og:image
of *Bar dos Arcos*, not Fel, so it was rejected and a São Paulo Secreto
photograph of Fel's counter used instead.

- `bar-das-sao-paulo` — Catraca Livre (neon DAS sign over the Rua Marielle
  Franco entrance).
- `bar-fel-copan-sao-paulo` — São Paulo Secreto (the 13-seat counter under
  the Copan). Also +1 source: São Paulo Secreto appended to `meta.sources`
  per `dedupe-by-place` rather than forking a slug.
- `djapa-sao-paulo` — BaresSP (lit façade). Lowest-resolution of the set at
  570×300; acceptable, but worth upgrading if a better shot turns up.
- `rong-he-sao-paulo` — Diários Gastronômicos, credited to Dé Comber (the
  hand-pulled noodle work the place is known for).
- `thai-e-san-sao-paulo` — Que Gostoso!, credited to Claudio Schapochnik.
- `teatro-clube-da-eskyna-santos` — A Tribuna (the venue interior).
- `cabaret-latino-teatro-eskyna-santos` — the one compromise. Its only
  source is an Instagram post, whose CDN URLs expire and can't be linked,
  so it reuses A Tribuna's photograph of the venue the event runs in, with
  a `licenseNote` saying plainly that it shows the room and not the show.
  Judged better than an event pin staying invisible for its entire run
  (it ends 2026-09-12).

Result: 16/16 places `status: active`; no drafts remain. No new places
created, no `trust` values changed. ~~No rule violations.~~ **Struck —
see the follow-up entry: this pass violated
`quality-gate-before-publish`'s word-count condition on all 7 places, and
opened locale gaps under `full-locale-coverage` on all 7.**
`npx tsc --noEmit` and `npm run build` both pass (121 pages), and all
seven images were confirmed rendering through `next/image` in the browser.

## 2026-08-28T00:00:00Z — follow-up: two real defects in the pass above

The operator flagged a paragraph on the live
`cabaret-latino-teatro-eskyna-santos` page. Both problems below trace to
the same root cause: the pass above verified hero *images* carefully —
every candidate was fetched and looked at — but never read the prose it
was making public, and never re-evaluated the rest of
`quality-gate-before-publish` before flipping `draft` to `active`.

**1. Fourth-wall copy on a reader-facing page (fixed).** The closing
paragraph of `cabaret-latino-teatro-eskyna-santos` explained Near's own
pipeline to the reader — "this listing", "it's set to expire
automatically rather than sitting around as stale content", "that's
covered on its own page". Rewritten in `en` and `pt-BR` to keep the part
that genuinely serves a reader (single-source announcement, so check the
venue's Instagram before travelling) and drop the internal plumbing. Note
that a pattern grep for this missed the `pt-BR` version, which used
different wording — reading the files was what actually found it.

**2. The 600-word condition is not being enforced anywhere.** 12 of the
16 currently-active places fail `quality-gate-before-publish`'s
`body >= 600 words in at least English`:

- Published in the pass above, all 7 under: `bar-das-sao-paulo` (294),
  `cabaret-latino-teatro-eskyna-santos` (333), `djapa-sao-paulo` (387),
  `rong-he-sao-paulo` (374), `thai-e-san-sao-paulo` (398),
  `bar-fel-copan-sao-paulo` (412), `teatro-clube-da-eskyna-santos` (518).
- Already active *before* this session, also under: `beco-do-batman-sao-paulo`
  (327), `boxpark-shoreditch-london` (340), `old-truman-brewery-london`
  (343), `dollywood-pigeon-forge` (442), `borough-market-london` (555).
- Passing: `bar-skula-oakland` (611), `time-out-market-lisboa` (605),
  `lx-factory-lisbon` (615), `stray-dog-mission-san-francisco` (630).

So this is a pre-existing pattern the pass above added to rather than
started. It needs an operator decision, logged here rather than silently
resolved: either the threshold is real and 12 pages need expanding (with
researched material — `rules.md` forbids padding), or 600 was aspirational
and never matched how Near actually writes, in which case `rules.md`
should be amended to the real number. Awaiting that decision.

**3. Publishing the 7 opened 28 locale gaps.** `full-locale-coverage`
exempts `status: draft`, so these places were legitimately incomplete
while they were drafts. Now active, each is missing 3–4 locales
(`it`, `es-ES`, `es-419`, `zh-CN`; `teatro-clube-da-eskyna-santos` has
`it`). Not user-breaking — `resolveLocaleContent` falls back to English
with a "translation pending" note — but it does mean BACKLOG's
"all published places carry full 6-locale coverage" line was made false
by this pass, and has been corrected.
