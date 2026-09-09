# Content execution contract

Owner: PARSER with chief editor and Product Trio. Adopted 2026-09-09.
Applies to publishing/refresh orchestration; editing a skill does not start a content run.

- `content/rules.md` owns editorial invariants and trust. `near-write-article`
  owns the ordered per-piece pipeline. Entry skills choose work and provide
  subject expertise; they must not run a second, abbreviated publishing sequence.
- Reconcile the active manifest, actual files and publication evidence before
  starting. Counts and NEXT-UP prose are hints when they disagree with evidence.
  Keep the existing batch scope; record policy changes that affect its next pieces.
- One coordinator completes one article before opening another. Apply required
  roles as distinct lenses, with actual findings and verdicts, in retained context.
  Separate agents only for authorized, bounded independent work that justifies the
  added context. Preserve EDDIE TOR's independent editorial reviewer rule.
- Read each needed skill/reference once per retained context. Load the selected
  city, persona, locale and evidence, not every city/body/brain. Consult all
  mandatory roles; selective loading never means selective quality gates.
- SEO and trendsetter share one timestamped feed/source snapshot per run. Attempt
  all saved Trends feeds; record failures. Reuse the snapshot for that run's
  scoping, but verify each venue and dated event separately. New run, changed
  scope or expired evidence requires fresh checks. Never label failed access as
  no demand, and never invent language-volume weights.
- Reuse source evidence through compact claim IDs, URLs, check dates and supported
  claims. Research older than seven days expires; recheck mutable facts on resume.
  A neighbouring venue does not inherit the original venue's verification.
- Store each gate's role, verdict, evidence path, checked time and input hashes in
  the existing run packet (or `content/_reports/<slug>/` for a standalone piece).
  Hash the source, locale files, hero URL/asset and relevant instructions. Reuse a
  passed check only while its inputs and factual validity remain unchanged.
- Changed facts invalidate affected locales and factual reviews; changed prose
  invalidates its tone/language/chief-editor/feed reviews; changed imagery
  invalidates image/rights/Discover checks; changed event dates invalidate event
  expiry, links and dependent copy. Recheck all final locales before publication.
- After two failed repairs of the same blocker, save evidence, hold that item and
  use an eligible replacement within scope. Do not repeatedly restart workers
  against the same usage/access failure. A hold is never a publication.
- Run the required build for the final publishable set before pushing; repeat
  after relevant edits or failure. Record commit and observed live URL before
  saying published. For instruction-only work, report instruction validation;
  deployment does not prove the new editorial process has been exercised.
- Record actual token telemetry when available, otherwise `unavailable`.
  Fewer words, fewer tool calls and elapsed time are not measured token savings.
