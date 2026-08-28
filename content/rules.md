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

  - id: verify-still-open-before-create
    description: >
      confirmed-closed governs re-checking a place Near already
      publishes. This rule covers the gap before that: a brand-new
      candidate — from a source article, an operator mention, a
      war-room research pass, or an old "should add this" list — can
      itself be stale. A place written up two years ago, or a name
      recalled from training data / general knowledge with no source
      checked this session, may no longer exist by the time near-editor
      gets to it. Before writing a NEW place (not an update to an
      existing one), do a basic current-status check: a fresh web
      search for the place name + city, or a quick claude-in-chrome
      glance at its Google Maps listing, is enough — this does not need
      confirmed-closed's full two-checks-3-days-apart rigor, since
      nothing is being flipped from active to closed, a candidate is
      just being screened before it's created at all. If that check
      turns up real signal the place has closed, moved, or rebranded,
      skip creating it — log why in _ingestion-log.md — rather than
      publishing a pin for something that's no longer there. This
      applies to near-editor, near-adiciona, and near-war-room equally;
      any skill that creates a brand-new place pin is responsible for
      this check before writing it.
    trigger: "about to create a place that does not already exist in content/places/"
    action: "do a basic current-status check before writing; skip and log if the place appears closed/gone rather than publishing stale content"

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

  - id: full-locale-coverage
    description: >
      Every place with trust: auto and status: active should eventually
      carry content in all six locales (en, pt-BR, it, es-ES, es-419,
      zh-CN) — see near-translator (.claude/skills/near-translator/SKILL.md)
      for how each locale's version gets written. It's fine for a place to
      launch with fewer locales than that (the app falls back to English
      with a "translation pending" note rather than 404ing — see
      lib/content/loader.ts's resolveLocaleContent) and for near-editor to
      cap how many locales it produces in a single run per
      run-volume-cap. But a locale gap shouldn't sit indefinitely: a
      near-refresh run's check-open sweep should also check for places
      missing one or more locales and treat closing that gap as
      first-class work, not an afterthought — dispatching near-translator
      per missing locale the same way it dispatches near-editor for a new
      place. This rule does not apply to trust: review / status: draft
      places (no point localizing something that hasn't been approved
      yet) or to status: closed / status: archived places (not worth the
      effort on something no longer live on the board).
    trigger: "status == 'active' AND trust == 'auto' AND missing one or more of the six locale files"
    action: "near-refresh (or an explicit operator request) dispatches near-translator per missing locale; log closed gaps in _ingestion-log.md"

  - id: dedupe-everywhere
    description: >
      dedupe-by-place (above) covers places specifically. The same
      discipline applies to every other content type any skill creates:
      collections/blog posts (check existing content/collections/*
      placeSlugs and theme before creating a near-duplicate — extend the
      existing one instead), and source entries (check content/sources.md
      and content/preferred-sources.md for an existing entry, even under
      a different display name, before adding a new one). Every content-
      creating skill (near-editor, near-translator, near-blogger,
      near-adiciona, near-war-room, near-refresh) is responsible for this
      check before writing, not just near-editor.
    trigger: "any skill about to create a new collection or source entry"
    action: "search existing content first; extend/update instead of duplicating if a real match exists"

  - id: source-enrichment
    description: >
      Any skill that does web research (near-editor, near-refresh,
      near-blogger, near-war-room, near-deep-researcher, near-translator
      when it encounters a genuinely locale-specific outlet) should add
      genuinely good new sources it finds to content/sources.md, not
      leave that solely to near-refresh's own "new source discovery"
      step. Don't onboard off one lucky find (see near-refresh's own
      guidance on this) — but do record candidates so a pattern across
      runs is visible.
    trigger: "a skill's research surfaces a source not already in content/sources.md"
    action: "record as a candidate (content/preferred-sources.md 'Candidates') or, once proven across multiple hits, add formally to content/sources.md"

  - id: human-content-preservation
    description: >
      Once human-authored pins exist (admins, curators/editors, paid/
      sponsor users, and free users per the account system in
      BACKLOG.md), any AI skill editing or supplementing that content
      must preserve the human's original content and append rather than
      delete or silently overwrite it. A questionable statement gets a
      linked note/reply, not a silent edit. Content can be submitted for
      admin removal review if warranted. Immediate takedown (before
      admin review) is reserved for criminally or extremely offensive
      content only. Not yet in effect operationally (no human-authored
      pins exist yet as of this writing) — documented now so it's in
      place before that feature ships.
    trigger: "an AI skill edits a place/collection not originally created by that skill or another AI skill"
    action: "append rather than overwrite; flag questionable content with a linked note rather than silently editing; escalate to admin review if warranted; immediate takedown only for criminal/extreme content"

  - id: run-volume-cap
    description: >
      A single near-editor run creates or updates at most 5 places, to
      bound cost and keep quality high while the pipeline is being
      validated. Adjust upward once Stage 1 output quality is proven.
    trigger: "per skill invocation"
    action: "stop processing after 5 successful publishes; log remainder as deferred"
```
