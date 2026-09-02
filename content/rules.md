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
      >= 3 bullets, long-form body >= 150 words in at least English,
      geocode confidence >= 0.6, a hero image was resolved, and the
      link-density rule below passes. If hero image resolution fails
      entirely, the place is skipped, not published without an image.

      The 150-word floor (lowered from 600 on 2026-09-01, operator
      directive) is a floor, not a target — write as tight as the piece
      actually needs, don't pad toward a target length. It exists to
      catch genuinely thin/stub content, not to mandate a minimum essay
      length: SEO/AEO both reward front-loaded, citable, specific copy
      over length for its own sake (see llm-seo.md and aeo/SKILL.md),
      and shorter drafts cost less to write and translate across all six
      locales. Reserve real length for pieces where depth is the actual
      value — Featured Articles, near-blogger long-form guides, and
      standing-column issues are the standing exceptions, not the
      default. Each near-translator locale persona is also an editor,
      not a literal-translation pass: a locale edition may legitimately
      land shorter than its English source (down to this same 150-word
      floor) if that locale's persona judges the shorter version serves
      that market better — it does not need to match the source's length.
      This does not retroactively apply to already-published content;
      nothing needs trimming just because the floor moved.

      This gate also covers the two AI-tell opener bans in
      style-guide.md's "Opening lines" section: no body (place, column
      entry, or blog post, any locale) may open with a crowd-consensus
      claim ("Everyone," "Todo mundo," "Todo el mundo," "Tutti," or
      equivalent) as the sentence's first word, and none may open with a
      faux-candor framing device ("I'll say the quiet part first," "Vou
      logo dizer a parte que ninguém fala," "let's be honest," "here's
      the thing nobody tells you," or equivalent) that announces candor
      instead of just being candid. Check the opening sentence of every
      locale, not just English, before flipping status to active — a
      translated piece can reintroduce either pattern even when the
      English source is clean. Caught live 2026-09-01 in The Setlist's
      first issue (faux-candor opener, all six locales) after this rule
      already existed in prose but wasn't yet a checked gate item.

      COLUMN ISSUES AND RECOMMENDING COLLECTIONS must carry a `bullets`
      array (>= 3) in their locale frontmatter — the scannable "why you
      should go" box, rendered above the body. Concrete reasons a reader
      can act on (a new record, a specific artist, a confirmed date), not
      atmosphere. The field is optional in the Zod schema on purpose,
      because collections also carry essays with nothing to recommend
      going to (e.g. zombie-listicle-problem, a piece arguing against
      listicles); this gate is where the editorial distinction lives. If
      the piece recommends something, the box is required; if it argues
      something, it is not. Requested by an outside reader 2026-09-02 who
      wanted to know at a glance why a festival was worth the trip and
      had to read five paragraphs to find out.

      This gate also covers style-guide.md's "Never pull rank on the
      reader": no body, in any locale, may aim its opinions at the person
      reading rather than at the place, scene or music. Check for a
      sentence correcting a habit the piece invented for the reader,
      taste-rank display, the superior wink, or framing that makes
      declining the recommendation lazy or basic; and cap sarcasm at
      roughly one beat per piece. The test is effect, not intent. This
      does NOT soften the house voice toward places — being harsh about a
      venue, a line-up or a price is correct and stays. Caught by an
      outside reader 2026-09-02 on The Setlist's October issue.

      This gate also covers style-guide.md's "Never publish the editorial
      process as copy": no body, in any locale, may contain sentences
      whose subject is Near, the column, or its editorial standards
      rather than the place, event or scene being covered. The four
      shapes are self-defining against other coverage ("most festival
      previews run when the tickets are gone; this isn't one of them"),
      narrating the piece's own format ("so here's the local half of this
      edition"), a section documenting the column's rules, and
      disclaiming work not done ("I won't pretend I have an opinion on
      all forty"). Scan every locale, not just English. Caught by an
      outside reader 2026-09-02 in The Setlist's October issue, where
      roughly half the body was process talk and the piece never made an
      argument about the music. Note this is the same column the
      faux-candor ban above already caught: that fix removed the
      announcing preamble but kept the comparison underneath, so removing
      the throat-clearing phrase alone does not clear this gate.

      HERO IMAGE TIERS, in preference order: (1) a real source photo with
      attribution, (2) licensed stock, (3) an original illustration from
      near-illustrator. Tier 3 reverses this rule's earlier "no
      AI-generated fallback tier by design" position — an operator
      decision on 2026-08-31, on the grounds that a drawn hero beats
      either a generic stock photo or skipping a genuinely good place for
      want of a photograph. The earlier position was guarding against
      passing off synthetic photos as real documentation; that concern is
      handled instead by the constraints on tier 3 rather than by banning
      it: illustrations must be visibly stylized and never photoreal (see
      near-illustrator), and must disclose themselves as AI-generated in
      meta.heroImage.attribution. A generated image that could be
      mistaken for a photograph of the actual place is a violation of
      this rule, not a success.
    trigger: "on generation, before write"
    action: "if any check fails, skip publish; log to _ingestion-log.md with the specific failed check"

  - id: link-density
    description: >
      The style guide has always required that every source used gets a
      real in-text link and that a piece ends with a bridge outward
      (references/style-guide.md, "Attribution and honesty" and
      "Long-form body"). It was being ignored wholesale — an audit on
      2026-08-31 found 12 of 18 English bodies with zero external in-text
      links and 7 of 18 with zero internal ones. Prose guidance clearly
      isn't enough on its own, so this is now a mechanical gate.

      EXTERNAL: the body must carry at least one in-text markdown link to
      a URL that also appears in meta.sources. The footer source list
      does not count — it's a citation block, not attribution at the
      point of the claim. Where the body states a specific fact, quote,
      or observation drawn from a source, that sentence is where the
      link belongs. Do not invent a URL to satisfy this; only link
      sources actually consulted and recorded in meta.sources.

      INTERNAL: the body must carry at least one <NearLink> to a genuinely
      related published place — same city or neighborhood, same beat, or
      a real editorial connection. If no such place exists yet, DO NOT
      force a weak link to an unrelated pin to clear the gate. Instead
      append an entry to content/requests.md naming the article that
      wanted the link and what it needed, and the internal half of this
      rule is considered satisfied for this run. A logged gap is a
      correct outcome; a bad link is not.
    trigger: "on generation, before write, for any place or collection body"
    action: "if no in-text source link, skip publish and log; if no internal-link target exists, append to content/requests.md and proceed"

  - id: event-belongs-to-venue
    description: >
      An event held at a venue Near already publishes is not an
      independent place. Before this rule existed, it was written as one,
      which produced two board cards with the same hero photo and two map
      pins stacked on identical coordinates for a single address — the
      exact duplication dedupe-by-place exists to prevent, waved through
      because event-expiry had carved events out of that rule.

      The event still gets its own slug, page, and URL: the specifics
      that make it worth covering (lineup, ticket tiers, door policy)
      deserve a shareable address, and folding them into a field on the
      venue would throw that away. What changes is that it sets
      meta.parentPlace to the venue's slug, which removes it from the
      board and the map (lib/content/loader.ts's getAllPlaces) and
      surfaces it on the venue's card and page instead — a "next event"
      ribbon on the card, a "coming up here" list on the page, both fed
      by getUpcomingEventsByParent and both disappearing on their own
      once eventEndsAt passes.

      Set meta.eventStartsAt too wherever the source states a start time.
      eventEndsAt is frequently an estimate for a late-running night, and
      showing an estimated end date as if it were the event date is
      simply wrong — the Cabaret Latino pin ends at 05:00 the following
      morning but happens on the 11th.

      An event at a venue Near does NOT cover yet is a different case:
      either create the venue first and hang the event off it, or publish
      the event standalone with no parentPlace and log the missing venue
      to content/requests.md.
    trigger: "creating a place that is a time-bound happening at a venue Near already publishes"
    action: "set meta.parentPlace to the venue slug and meta.eventStartsAt where known; do not create a standalone board listing"

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

  - id: currency-maintenance
    description: >
      Published content is written with real specifics — named people,
      prices, opening years, "just opened" framing — because that's what
      makes it worth reading. The cost is that it goes stale silently, and
      the answer is maintenance, not hedging the copy into vagueness.
      near-caretaker (.claude/skills/near-caretaker/SKILL.md) owns that
      maintenance and covers seven staleness classes: people (died, left,
      sold up), open/closed/moved, ownership changes, numbers, recency
      claims, event references, and link rot.

      Person-dependent claims are the highest risk — present-tense copy
      about someone who has died is both false and callous, and nothing
      in the pipeline catches it automatically. Any page naming a living
      person carries this risk permanently.

      Corrections fix the specific claim in every locale, including the
      frontmatter (tagline, shortTitle, bullets, seoDescription — all
      carry factual claims and are easy to miss when only the prose is
      read), append to statusHistory, and add a sourced note where the
      change is itself the story. A death or a permanent closure needs
      two independent sources before it goes in; an operator flag is a
      prompt to verify, not a source.
      near-caretaker runs on EVERY near-refresh pass — step 1a, not
      optional, not dropped when a run is scoped to one destination, and
      not the first thing cut when run-volume-cap bites (cut new-place
      publishing first). A refresh that skipped it is not a completed
      refresh, and the run summary in _ingestion-log.md must record what
      the pass covered, including "nothing needed correcting".
    trigger: "every near-refresh run (mandatory), or an operator flag that something has changed"
    action: "verify against sources, correct the specific claim in every locale including frontmatter, append statusHistory, record the pass in _ingestion-log.md; never flatten voice to make a piece age better"

  - id: confirmed-closed
    description: >
      A place is marked closed only after two independent checks against
      Google Maps business status via claude-in-chrome (no Places API key
      in use), at least 3 days apart, both showing "Permanently closed".
      Page stays live with a closed banner; removed from the active board.
    trigger: "google_maps_status == 'permanently_closed' (2x, >= 3 days apart)"
    action: "set status = closed; add statusHistory entry"

  - id: weekly-editorial-column
    description: >
      Near runs a recurring weekly editorial column in near-editor's
      house voice, tracked in content/editorial-column.md (cadence,
      series index, what makes a good entry). near-refresh checks this
      every run and treats a new entry as priority near-editor work once
      7+ days have passed since the last one. Topic is never invented —
      grounded in something that run's own research actually surfaced,
      scoped jointly by near-seo + RADAR-X + near-editor per Near's
      standing content-decision process. Operator decision, 2026-09-01,
      after the inaugural piece ("The Zombie Listicle Problem").

  - id: full-locale-coverage
    description: >
      Every place with trust: auto and status: active carries content in
      ALL SIX locales (en, pt-BR, it, es-ES, es-419, zh-CN) — see
      near-translator (.claude/skills/near-translator/SKILL.md) for how
      each locale's version gets written.

      This rule was weakened until 2026-08-31: it said launching with
      fewer locales was fine and the gap could be closed later. In
      practice "later" meant half the catalogue sitting in English
      fallback across four markets. The operator's call is that being
      genuinely multilingual is a core strategic property of the app, not
      a nice-to-have, so a place is no longer considered publishable in a
      partial state.

      ALL SIX LOCALES ARE NOW PART OF quality-gate-before-publish. A new
      place ships complete or it doesn't ship. run-volume-cap bounds how
      many *places* a run creates, not how many locales each one gets —
      if the cap binds, publish fewer places fully rather than more
      places partially.

      The English-fallback path in lib/content/loader.ts stays as a
      safety net so a missing file degrades instead of 404ing, but it is
      now a bug indicator rather than an expected state. Anything hitting
      it should be treated as a gap to close, not a design working as
      intended.

      Does not apply to trust: review / status: draft places (no point
      localizing something unapproved) or to status: closed / archived
      (not worth the effort on something off the board).
    trigger: "any place being published, and any active/auto place missing one of the six locale files"
    action: "publish only with all six locales present; for the existing backlog, near-refresh dispatches near-translator per missing locale as first-class work until the gap is zero"

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
