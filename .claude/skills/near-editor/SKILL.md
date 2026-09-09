---
name: near-editor
description: Fetches items from Near's watched sources (content/sources.md), geocodes the featured place, and generates the original English source draft (name, tagline, reasons-to-check-out bullets, long-form article, hero image) per content/rules.md, then hands off to near-translator for every other locale. Writes to content/places/ and commits auto-trust sources. Review-trust items (near-inbox submissions and explicitly review-trust sources) are staged as drafts for explicit operator approval and never auto-committed. Use when ingesting new source content, triaging the near-inbox GitHub issues, or adding a place requested directly in chat.
---

# near-editor

Near's editorial pipeline. Turns a source item — an RSS entry, a near-inbox
submission, or a place named directly in chat — into an original Near page:
a name, a tagline, bullet reasons to check it out, a long-form article
comfortable to read, and a hero image, in every locale Near supports.

This is an **editorial** skill, not a scraper. Near never republishes a
source's own copy — every word on a place page is written by Near, informed
by the source but not copied from it.

## Supported locales

`en` (default/canonical), `pt-BR`, `it`, `es-ES`, `es-419`, `zh-CN`. Content
schema and locale list: `lib/content/schema.ts` (`LOCALES`). Mirror of the
schema for reference while writing: `references/content-schema.md`.

## The three entry points

1. **Scheduled/on-demand source ingestion** — read `content/sources.md`,
   process `status: active` sources.
2. **near-inbox triage** — `gh issue list --label near-inbox --state open`
   in the `near` GitHub repo (owner/repo from `NEAR_GITHUB_REPO` env var,
   default `listadothiago/near`). Each issue is one visitor submission
   (suggestion / request / removal / message) filed by `app/api/inbox/route.ts`.
   Place-submission issues become `trust: review` candidates. Removal
   requests get evaluated against `rules.md`'s `confirmed-closed` logic and,
   if the operator approves, transition the target place's status. Close or
   label issues once handled.
3. **Ad-hoc chat request** — the operator names a place directly in
   conversation ("add X in Lisbon"). Operator-named places use `trust: auto`: the request is approval,
   per `rules.md`'s `trust-gate`; all quality gates still apply.
4. **Supplemental research pass** — for a place Near already has, search
   the web for additional reviews/coverage beyond the original source(s).
   Every genuinely new source found gets appended to `meta.sources` (dedupe
   by URL) and, if it adds real information, folded into the long-form
   body with an in-text link — see "Attribution and honesty" in
   `references/style-guide.md`, which is the load-bearing rule for this
   entry point: credit everything used, and if a source raises a real
   criticism, include it honestly rather than only keeping the flattering
   parts. This doesn't touch `meta.trust` (an existing `auto` place stays
   `auto`) and follows the same commit/quality-gate rules as any other
   update.

## Intake and publishing

Read `content/rules.md` and the relevant entries in `content/sources.md`,
including their prose and trust values. For ingestion, fetch active RSS/Atom;
for HTML sources or failed feeds, inspect the source's actual listing page
with available browser tools. Extract title, URL, date and useful source facts.
Only location-grounded items become place/event candidates. Preserve generic
news leads for the appropriate column rather than inventing a pin.

Then execute `.claude/skills/near-write-article/SKILL.md` in its full order.
It owns dedupe, current-status and Google Maps verification, events, research,
persona choice, drafting, imagery, distinct sign-offs, all six locales,
mechanical/red-team/feed/revenue checks and the trust/build/push gates.
The same route applies to supplemental research and edits of existing pieces;
`near-caretaker` supplies freshness expertise. This skill is an entry point,
not an alternative pipeline. Follow `docs/workflows/content-execution.md` for
resuming, evidence reuse and changed-input checks.

Intake-specific obligations after that pipeline:

- Apply `run-volume-cap`: normally at most five successful places per invocation;
  explicit batch mode follows its own limit. Log deferred candidates.
- Validate against `lib/content/schema.ts`; use `references/content-schema.md`
  as a writing aid, not permission to ignore the current schema.
- Update `content/_stats.json` (`placesIndexed`, `sourcesWatched`, `lastSyncAt`)
  from actual results on a committed run. Follow the pipeline's per-place commit
  and review-trust rules; a draft awaiting approval stays uncommitted.
- Append a compact result to `content/_ingestion-log.md`: sources checked,
  added/updated/held items and exact failed rules, inbox issues handled.

## Notes

- `content/_stats.json` drives the header's status strip on every page —
  keep it current on every committed run.
- Archiving (`age-decay-archive`, `event-expiry`) and closure confirmation
  (`confirmed-closed`) are rules.md-governed housekeeping, not just
  ingestion-time logic — a full run should also sweep existing places for
  rules that now apply (an event whose date passed, a place untouched for
  365+ days — one year, per the operator change of 2026-09-04), not only process new candidates.
- Never invent a fact. If a source doesn't say something, the long-form
  body shouldn't either — "worth checking out" claims need to trace back to
  something the source (or direct observation via `claude-in-chrome`)
  actually supports.
