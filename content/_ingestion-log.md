# Near — Ingestion Log

Append-only run log written by `near-editor`. Each run appends a section
with: timestamp, sources checked, places added/updated/skipped (with the
specific rule that caused a skip), and any near-inbox items triaged.

## 2026-08-20T10:00:00Z — seed content (manual, not via near-editor)

Hand-authored 3 seed places to validate rendering, i18n, and the map before
the first real `near-editor` run: `lx-factory-lisbon`, `time-out-market-lisboa`,
`borough-market-london`. All `status: active`, `trust: auto`.
