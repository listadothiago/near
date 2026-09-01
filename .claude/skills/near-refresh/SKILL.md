---
name: near-refresh
description: Orchestrates a full refresh pass over Near's content — starts with near-sources verifying every watched feed still resolves, then RADAR-X reading what's actually trending in those sources (independent/alt-press weighted heavily) to guide the run's content picks, always runs near-caretaker's currency sweep (mandatory every run), re-verifies existing places are still open, works through content/preferred-destinations.md, picks up anything else Near's watched sources recommend, and backfills any locale near-translator hasn't covered yet. Directs near-editor and near-translator to do the actual writing/publishing. Use when asked to "refresh Near," "run a refresh," or do a periodic content-freshness/growth pass rather than a single one-off place request.
---

# near-refresh

The periodic growth-and-maintenance pass for Near. `near-refresh` is an
**orchestrator, not a writer** — it decides what needs attention and in
what order, then hands each concrete piece of work to `near-editor` (new
place, updated sources, status change) or to a specialist advisor skill
consulted through `near-editor`. It never writes `meta.json` or `.mdx`
files itself.

Read `content/rules.md`, `content/sources.md`, `content/preferred-sources.md`,
and `content/preferred-destinations.md` before starting — all four are
prose + fenced YAML/lists, read the prose too.

## Order of operations

0. **`near-sources` first, every run, no exceptions (operator directive,
   2026-09-01).** Invoke `.claude/skills/near-sources/SKILL.md` before
   any content research starts. It verifies every watched source still
   resolves, pauses dead ones, and reports back a source-health summary.
   The rest of this run trusts that summary rather than assuming last
   run's source list is still accurate.
0b. **Check `content/photo-inbox/` once per pass.** Read its `README.md`
   for the process. Match any dropped photos to existing or in-progress
   pieces per `near-illustrator`'s hero-image tier order (a real,
   operator-supplied venue photo beats a generic fallback or a generated
   illustration), wire matches in, and leave unmatched files logged in
   `_inbox-notes.md` rather than guessing.

0a. **RADAR-X reads the verified sources for what's trending —
   before picking what to write, not after.** Using `near-sources`'
   output, RADAR-X (the trendsetter persona) scans the live, healthy
   sources — weighting genuinely independent newspapers/alt-weeklies
   over aggregators and PR-adjacent outlets, per `near-sources`'
   own trust weighting — for what's actually current: a scene heating
   up, a venue getting real coverage, a recurring theme across multiple
   outlets. This trend read is what should steer which candidates from
   steps 2-5 below get prioritized this run, not just proximity to a
   preferred destination. Where a trend has an actual dated instance
   worth attaching content to, hand off to `.claude/skills/near-events/SKILL.md`
   to pin down the specific date (further out is better — see that
   skill's own guidance) before handing the candidate to `near-editor`.
1. **Check-open sweep.** Sweep
   existing `content/places/*/meta.json` for places due a liveness check:
   - Any `status: active` place not checked in a while (no explicit
     interval is enforced — use judgment, but a place whose `updatedAt`
     predates the last several refresh runs is overdue).
   - Any place already flagged as possibly closed (from a prior partial
     `confirmed-closed` check per `rules.md` — i.e. one confirmation logged
     but not the second).
   For each, follow `rules.md`'s `confirmed-closed` procedure: two
   independent checks via `claude-in-chrome` against Google Maps' own UI
   (business-status label, not just a listing existing), at least 3 days
   apart. A single check this run either confirms "still fine" (touch
   nothing but a lightweight internal checked-at note if useful) or logs
   the first of the two required closure confirmations — never flip
   `status` to `closed` off one check. Also apply `age-decay-archive`
   (270 days) and `event-expiry` (past `eventEndsAt`) here — these are
   plain date comparisons, no browser check needed. Also check locale
   coverage per `rules.md`'s `full-locale-coverage` rule:
   any `status: active`, `trust: auto` place missing one or more of the
   six locale `.mdx` files is a candidate for a `near-translator` pass
   this run (see step 7a below) — first-class refresh work, not an
   afterthought.
1a. **Dispatch `near-caretaker` — MANDATORY, every single run, no
   exceptions.** Invoke `.claude/skills/near-caretaker/SKILL.md` for the
   currency sweep. This is not conditional on the run's scope, not
   skippable when the operator names a specific destination, and not
   something to drop when a run is short on room — if `run-volume-cap`
   is biting, cut new-place publishing before you cut this.

   Step 1 only establishes whether a place is still trading. That's one
   of seven ways a page goes stale, and the other six have nothing at all
   catching them automatically: a named founder who has died, a change of
   ownership, a price that moved, a "just opened" that's now two years
   old, prose around an expired event, a source URL that 404s. Those
   errors sit on the live site indefinitely until this step finds them.

   A run that skipped this step is not a completed refresh. Say so
   explicitly in the run summary rather than letting it pass silently.

1b. **Drain `content/requests.md`.** Open requests are places Near's own
   writing has already asked for and couldn't link to — a piece wanted a
   cross-link, found nothing to point at, and logged the gap per
   `rules.md`'s `link-density` rule. Treat these as first-class candidates
   for this run alongside the source-driven ones below, not as a
   leftovers list: demand that came from the published catalog itself is
   at least as good a signal as an outlet's RSS feed. When a request gets
   fulfilled, set its `status: fulfilled`, record the slug that closed
   it, **and go back and add the link to every article in its `wantedBy`
   list** — the unfulfilled promise to link is the entire reason the
   entry existed, and closing the request without doing that leaves the
   original piece exactly as link-less as before.
1c. **Check `content/opportunities.md`.** The ranked queue `near-seo`
   maintains — coverage gaps, empty categories, bylines with no work,
   locale backfill. Together with `requests.md` this is demand Near has
   already analysed; work it before going looking for more.
1d. **Check `content/editorial-column.md`'s cadence — every run.** Near
   runs a recurring weekly editorial column (operator decision,
   2026-09-01). If more than 7 days have passed since the most recent
   entry in that file's Series Index, writing this week's column is a
   priority `near-editor` task for this run: consult `near-seo` + RADAR-X
   together for a genuine topic grounded in something this run's own
   research actually surfaced (a dead-listing pattern, a recurring theme
   across sources, a real opinion worth having) — same process as the
   inaugural piece, not an invented hook. Append the new entry to the
   Series Index when done.
2. **Tier 1 preferred sources, every run.** Work every source listed under
   "Tier 1" in `content/preferred-sources.md` regardless of what
   destination this run is focused on.
2a. **Scan those sources for accommodation, via NITE-PORTER.** While
   working Tier 1/2 sources, watch for hotels, hostels, guesthouses and
   co-living mentioned in a non-advertorial context — a gig listing, a
   building's history, a labour story, a neighbourhood piece. That's the
   signal `.claude/skills/near-editor-accommodation/SKILL.md` is built
   around, and `accommodation` is one of Near's two still-empty
   categories. Ignore "best hotels in X" roundups and anything with an
   affiliate tell.
3. **Tier 2 preferred sources, if relevant.** Work "Tier 2" sources whose
   region/beat matches this run's focus.
4. **Preferred destinations.** Go through `content/preferred-destinations.md`
   in the priority order it documents. For each destination being worked
   this run, actively research — don't just wait for a source's RSS feed
   to surface it. Web-search the destination combined with each relevant
   category ("Vila Madalena nightlife 2026", "Shoreditch new restaurant
   opening", etc.), and check whether any preferred source has region-
   specific coverage (a local section, a city tag) not exposed via the
   generic feed.
5. **Anything else a watched source recommends.** A place a Tier 1/2
   source covers that isn't in a preferred destination still counts —
   `preferred-destinations.md` is a prioritization tool for active
   research, not an allowlist. Don't discard a genuinely good source item
   just because its city isn't on the list.
6. **New source discovery.** While researching, note any outlet that kept
   coming up as genuinely good (see "Candidates" in
   `preferred-sources.md`). Don't onboard off one lucky find — but do
   record it. Once a candidate has produced a second or third real hit
   across runs, formally add it to `content/sources.md` (with `trust`,
   `category`, `feedUrl`/`feedType`) and promote it into a tier in
   `preferred-sources.md`.
7. **Hand off to near-editor.** For every concrete candidate found in
   steps 2–5 (new place, new source citation on an existing place, a
   status change to apply), invoke `near-editor` to do the actual
   fetch/write/publish following its own pipeline and `rules.md`'s
   `trust-gate` and `quality-gate-before-publish`. `near-refresh` supplies
   the candidate and context (which source, why it's relevant, which
   preferred destination if any); `near-editor` still independently
   verifies and writes.
7a. **Dispatch `near-translator` for locale gaps found in step 1.** For
   each place flagged missing one or more locales, invoke
   `.claude/skills/near-translator/SKILL.md` once per missing locale —
   each invocation is that locale's own persona, not a batch translation
   job. Prioritize places that are getting real traffic/visibility
   signals (newer, more sources, `trending` tag) over old long-tail
   places if the run doesn't have room for all of them; `run-volume-cap`
   still bounds how much gets done in one pass, shared across new places
   and locale backfills.
8. **Consult specialist advisors where they apply.** When a candidate is
   squarely in a specialist's beat, near-editor should consult that
   advisor while drafting rather than writing it from the generic voice
   alone:
   - Food & drink coverage → `near-editor-gastronomic`
     (`.claude/skills/near-editor-gastronomic/SKILL.md`).
   - A single strange, over-specific "have you tried..." aside worth
     folding into a body as a real recommendation → `near-editor-stefon`
     (`.claude/skills/near-editor-stefon/SKILL.md`), used sparingly, per
     that skill's own guidance on when it applies at all.
   This mirrors the "advisor lenses" concept documented in
   `near-editor`'s `references/style-guide.md` ("Categories, tags, and
   'advisor lenses'" section) — these two skills are the first concrete
   advisors under that concept.
9. **Log and update destinations/sources files.** Append a run summary to
   `content/_ingestion-log.md` (same format as `near-editor`'s own
   entries — this is one shared log). The summary must state what the
   `near-caretaker` pass covered and what it changed — including "nothing
   needed correcting," which is a real and useful result. A summary with
   no caretaker line means step 1a didn't happen, and that's the signal
   to run it before calling the refresh done. Update `content/preferred-sources.md`
   if a source proved unreliable this run (move it down a tier or flag
   `status: paused` in `sources.md`) or a candidate graduated. Update
   `content/preferred-destinations.md` if a destination is now well-covered
   (Near has solid depth there) or a new one should be added based on
   what sources kept surfacing.

## Run scope

A single `near-refresh` invocation doesn't have to do all of the above
exhaustively — `rules.md`'s `run-volume-cap` still applies to how much
near-editor publishes in one pass. When the operator asks for "a refresh"
without more detail, default to: full check-open sweep (step 1, cheap,
always complete it) + the `near-caretaker` currency sweep (step 1a,
always, without exception) + Tier 1 sources (step 2, always) + whichever
single preferred destination is most overdue for attention. When the
operator names a specific destination or source, narrow the *discovery*
steps to that — steps 1 and 1a still run in full, because a scoped run
is about where new content comes from, not about letting published pages
quietly rot outside the chosen scope.

## Notes

- `near-refresh` never sets `meta.trust` — that's near-editor's call per
  `rules.md`'s `trust-gate`, based on the source's own trust tier in
  `sources.md`.
- If a check-open sweep finds a place near/past `age-decay-archive`'s
  270-day threshold but still clearly open (confirmed via the sweep
  itself), that's a good signal to prioritize it for a supplemental
  research pass (near-editor's fourth entry point) rather than letting it
  archive on staleness alone.
- Keep `content/_stats.json` current the same way near-editor does —
  `near-refresh` triggers near-editor for the actual writes, but should
  verify the stats file reflects reality at the end of a run.
