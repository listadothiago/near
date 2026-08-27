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
