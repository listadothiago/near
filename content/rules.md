# Near — Curation & Lifecycle Rules

Rules are evaluated in the order listed below. Every rule outcome must be
recorded in `content/_ingestion-log.md` and reflected in the affected
place's `meta.json` → `statusHistory`. The `near-editor` skill reads this
file programmatically (the fenced YAML block) — edit it directly to tune
thresholds.

```yaml
rules:
  - id: trust-gate
    description: >
      If the candidate's source has trust: review (near-inbox submissions —
      i.e. anonymous site visitors — or any source explicitly marked review
      in sources.md), the place is written with status: draft and is never
      auto-committed to the published set — it's surfaced to the operator
      for explicit approval, regardless of whether every other rule below
      passes. A place the operator names directly in chat is different:
      the operator is the approver, so instructing near-editor to add it
      already is the approval — trust: auto applies, gated by the normal
      quality-gate-before-publish rule like any other auto source, not by
      a separate review step. (draft can still happen for these places for
      an unrelated reason — e.g. no verified hero image yet — see
      quality-gate-before-publish; that's not the trust-gate rule firing.)
    trigger: "meta.trust == 'review'"
    action: "write meta.json + locale files with status = draft; do not commit; report to operator"

  - id: dedupe-by-place
    description: >
      Before creating a new place, check existing meta.json files for
      coordinate proximity (haversine < 150m) or a fuzzy name match. If
      found, this is the same real-world place covered again — not a new
      place. Append the new item to meta.sources (dedupe by URL first, a
      given article should only be listed once) rather than creating a
      new slug or overwriting the existing entry, and refresh updatedAt.
      One map pin, one article, however many outlets have covered it —
      every distinct source that mentioned the place stays linked from
      the same page. meta.trust does not change on an update; a place
      that started trust: auto stays auto even if a later mention of it
      comes from a review-tier source (the place is already published and
      reviewed in spirit by having survived this long, so a routine
      re-mention doesn't need re-approval) — the trust-gate rule only
      governs whether a *new* place gets created, not whether an existing
      one gets a new citation.
    trigger: "candidate place matches an existing place"
    action: "append to meta.sources (dedupe by url), refresh updatedAt; do not create a new slug, do not change meta.trust"

  - id: quality-gate-before-publish
    description: >
      A place is only written/committed if all of: tagline <= 90 chars,
      >= 3 bullets, long-form body >= 600 words in at least English,
      geocode confidence >= 0.6, and a hero image was resolved (source
      image with attribution, or licensed stock — there is no AI-generated
      fallback tier by design). If hero image resolution fails entirely,
      the place is skipped, not published without an image.
    trigger: "on generation, before write"
    action: "if any check fails, skip publish; log to _ingestion-log.md with the specific failed check"

  - id: event-expiry
    description: >
      A place that represents a one-off or time-bound happening (a concert,
      festival, exhibition run, pop-up) rather than a persistent venue must
      have meta.eventEndsAt set to that happening's end date/time. Once
      eventEndsAt has passed, it drops off the map and nearest/latest lists
      immediately — independent of the 270-day age-decay-archive threshold,
      which is for evergreen places (restaurants, districts, permanent
      venues) and much too slow for something that's simply over. The page
      itself stays live (same no-delete rationale as age-decay-archive) in
      case it was shared on social; it's excluded from the live board via
      lib/content/loader.ts (which checks eventEndsAt against the current
      time on every ISR revalidation, not just at near-editor run time) and
      formally marked status = archived the next time near-editor runs.
      Places with no eventEndsAt (the default — most places are evergreen
      venues, not events) are unaffected by this rule.
    trigger: "meta.eventEndsAt is set AND now > meta.eventEndsAt"
    action: "excluded from board immediately (loader-level, real-time); set status = archived + statusHistory entry on next near-editor run"

  - id: age-decay-archive
    description: >
      A place with no update in 270 days is archived: removed from the
      board (map + nearest/latest lists) and excluded from sitemap
      priority, marked noindex. The page itself stays live — no delete,
      no 404 — to preserve any link equity from social shares and avoid
      broken links.
    trigger: "now - meta.updatedAt > 270 days AND status == active"
    action: "set status = archived; add statusHistory entry"

  - id: confirmed-closed
    description: >
      A place is marked closed only after two independent checks against
      Google Maps business status via claude-in-chrome (no Places API key
      in use), at least 3 days apart, both showing "Permanently closed".
      Page stays live with a closed banner; removed from the active board.
    trigger: "google_maps_status == 'permanently_closed' (2x, >= 3 days apart)"
    action: "set status = closed; add statusHistory entry"

  - id: run-volume-cap
    description: >
      A single near-editor run creates or updates at most 5 places, to
      bound cost and keep quality high while the pipeline is being
      validated. Adjust upward once Stage 1 output quality is proven.
    trigger: "per skill invocation"
    action: "stop processing after 5 successful publishes; log remainder as deferred"
```
