---
name: link-police
description: Internal-only linking auditor — pushes every piece past content/rules.md's link-density MINIMUM (one external, one internal) toward maximum real linkage. Checks every claim for an available external link (preferring monitored sources, logging new ones), every mention of another place/topic for an internal link, and turns a missing external target into a published "coming soon" shell page instead of a dropped opportunity. Never carries a byline. Use on every near-write-article pass (step 9, alongside the mechanical gates) and by any other skill about to publish or edit body copy.
---

# link-police

Internal-only role, same family as `near-tov-police` and `near-seo`'s
QA mode — never surfaces publicly, never bylined, never quoted in a
piece. Its job is narrow and mechanical: **make Near linky**, on every
piece, not just the one-external-one-internal floor
`content/rules.md`'s `link-density` rule already enforces.

Trigger for this skill existing: an audit of
`https://near.tips/pt-BR/collection/ladies-and-gentlethem-2026-09`
found it clearing the minimum-link gate but leaving obvious external
and internal linking opportunities on the table — venues, artists, and
related Near content mentioned in prose with no link at all. The
mechanical gate proves a floor, not a ceiling; this skill is the
ceiling-raiser.

## When this runs

- Every `near-write-article` pass, as an added pass inside step 9
  (mechanical quality gates), immediately alongside the existing
  `link-density` check — not a replacement for it.
- Any other skill that drafts or edits body copy directly should run
  this pass before considering a piece done: `near-editor`,
  `near-blogger`, `near-caretaker` (when it touches body text during a
  currency correction), `near-translator` (per-locale, since a
  translated body can drop a link the source had, or gain a new
  linkable mention the source didn't), every standing-column editor
  persona, and `near-adiciona`.
- A retroactive sweep over already-published pieces is fair game too
  (that's how the Ladies&Gentlethem gap was found) — treat it like
  `near-caretaker`'s staleness sweep: correct in place, don't rewrite
  the voice.

## The three checks

### 1. External links — maximize, don't just clear the floor

For every sentence that states a specific fact, name-drops a venue,
artist, brand, event, or claim that traces to a source — check whether
it already has an in-text link. `link-density` only requires *one*;
this pass asks about *all of them*.

Preference order for what to link to:

1. **A source already in `content/sources.md` or
   `content/preferred-sources.md`** that covers this specific claim —
   link straight to the source article/page, same as the existing
   attribution rule.
2. **The subject's own site or verified social** (official venue site,
   artist's own page) when no watched source covers the specific claim
   but an authoritative primary link exists.
3. **A newly-found source that isn't monitored yet** — link it, and
   hand it to `near-sources` immediately per `near-write-article` step
   4's existing "capture any genuinely new source" rule (log to
   `content/preferred-sources.md`'s candidates section). Don't link a
   page and leave it undiscoverable for next time.

Never invent a URL to satisfy this. If real research turns up nothing
linkable for a given mention, that mention just doesn't get a link —
log it as a genuine gap (see "Coming-soon shells" below) rather than
forcing a weak or fabricated one.

### 2. Internal links — maximize, don't just clear the floor

Same widening of `link-density`'s INTERNAL half: every mention of
another place, neighborhood, event, or topic Near already covers (or
plausibly will) is a candidate `<NearLink>`, not just the one required
to clear the gate. Check the full body, not just the opening or the
first available match.

If a genuinely related published place exists, link it — and add the
reciprocal link back on the target page's own body (a "mentioned in"
or equivalent tie-back), matching the two-way cross-linking
`near-blogger`'s collections already do between the collection and its
pins. A one-way internal link is a missed opportunity in the other
direction.

If no target exists yet, this is where a mention becomes a real
opportunity instead of a dead end — see below.

### 3. Coming-soon shells — turn a missing target into a linked page

When a piece wants to link to a place, artist, or topic Near doesn't
cover yet, and the gap is worth closing (not every passing mention
qualifies — use judgment: a place named twice, a headliner artist, a
venue central to the piece's premise are worth it; an incidental aside
is not):

1. Publish a minimal, honest, public **"coming soon" shell page** for
   that target — same content type it would eventually be (place page
   or collection), `status: draft`-adjacent but *visible*, not hidden:
   a real slug, a real hero image if one's easily available, a short
   note that Near is working on full coverage, and a genuine link back
   to the piece(s) that reference it. This is not a placeholder that
   404s or a private draft — it has to be a linkable, publishable page
   or it doesn't solve the problem.
2. Link the original piece to this shell page instead of leaving the
   mention bare.
3. Log it exactly like `link-density`'s existing internal-gap path:
   append to `content/requests.md` naming what full coverage is still
   needed, so a future `near-refresh` or `near-editor` pass picks it up
   and fleshes the shell into a real page. When that happens, the shell
   graduates in place (same slug, same URL) rather than creating a
   second page — don't dedupe-by-place yourself into a duplicate.
4. Never fabricate facts to fill the shell. "Coming soon, here's why
   it's worth a look, full write-up in progress" is honest; inventing
   bullets/tagline copy to make it look finished is not.

Get sign-off on judgment calls (is this gap worth a shell, or just a
logged request) from whoever's running `near-write-article`'s step
7 sign-off on the piece — this skill flags the opportunity, it doesn't
unilaterally decide to publish a new page without the same sign-off
any other new page would get.

## What this skill is not

Not a replacement for `content/rules.md`'s `link-density` gate — that
mechanical floor still runs exactly as written. Not `near-seo` (query/
opportunity strategy) or `near-sources` (owns the monitored-source
list this skill links into and feeds new candidates to). Not license
to pad a piece with irrelevant links to hit a quota — every link this
skill adds still has to be a real, relevant one; "wherever possible"
means every genuine opportunity, not every noun phrase.
