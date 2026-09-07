# Caretaker Dated Claims

This is the durable queue for a specific dated event cited in evergreen
copy. Add an entry before publishing. `near-caretaker` reads it at the
start of every cleanup, and may summon any relevant specialist to verify,
amend or remove a claim. Remove a resolved entry only after recording the
outcome in the affected content's `statusHistory` and in
`content/_ingestion-log.md`.

## Due

- **2026-10-12 — Michelberger Hotel, Berlin**
  - Article: `content/places/michelberger-hotel-berlin/` (all six locales)
  - Perishable claim: PEOPLE Festival is confirmed for 10–11 October 2026.
  - Source: <https://whatson.michelbergerhotel.com/category/events/>
  - Required action: after the final date, verify the official programme;
    amend the dated body/bullet reference into durable context or remove
    it, then update every locale and the content status history.
