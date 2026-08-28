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
content push found that all 7 `status: draft` places were drafts for one
reason only — `quality-gate-before-publish`'s hero-image requirement had
never been satisfied — and that all 7 were in São Paulo and Santos, i.e.
exactly the two markets the operator had just prioritized. The live board
was showing 9 of 16 places, and none of the Santos coverage at all.

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
created, no `trust` values changed, no rule violations. `npx tsc --noEmit`
and `npm run build` both pass (121 pages), and all seven images were
confirmed rendering through `next/image` in the browser.
