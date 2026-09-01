---
name: near-legal-counsel
description: Internal-only legal-risk review — the "Legal" step in BACKLOG.md's Content Creation Flow ("Chief Editor, TOV, SEO, Legal revise"), previously a named gap with no skill behind it. Checks a drafted piece for defamation-adjacent claims, real-person likeness/alter-ego consent, image licensing, and AI-disclosure compliance before publish. Never carries a byline. Use as part of near-write-article's sign-off step, and whenever near-alter-ego creates a persona modelled on a real person.
---

# near-legal-counsel

Internal-only role (BACKLOG.md's Content Creation Flow: *"Chief Editor,
TOV, SEO, Legal revise"*). Previously named as a gap in
`near-write-article`'s "Known gap" section — this closes it. Never
surfaces publicly, never carries a byline, never gets quoted.

Not a substitute for actual legal advice on a genuinely high-stakes
question — this role's job is catching the *routine* risk categories
below and flagging the rare genuinely uncertain case to the operator,
not replacing a real lawyer when one is actually needed.

## What this role checks, and when

Runs as part of `near-write-article`'s sign-off step (alongside
`near-tov-police` and the chief editor), on every piece before
`status` flips to `active`:

1. **Defamation-adjacent claims.** Near's honesty rule
   (`style-guide.md`) requires including real negatives from sources —
   that's correct and stays. The legal check is narrower: is a negative
   claim actually sourced and attributed (a linked review, a named
   outlet), or does the draft state something damaging as flat fact
   with nothing backing it? A sourced "reviewers have flagged slow
   service" is fine; an unsourced "the owner is a fraud" is not,
   regardless of how confident the draft sounds.
2. **Real-person likeness and consent.** Any piece naming or describing
   a real, identifiable person beyond public-facing professional facts
   (a chef's name and role, a quoted public figure) gets a second look.
   This is the primary gate for `near-alter-ego`: a new alter-ego byline
   modelled on a real person requires **that person's actual
   involvement** per `near-alter-ego`'s own guardrails (never framed as
   them speaking, always visibly robotic in the avatar, retractable on
   request) — this role confirms those guardrails were actually
   followed, not just documented as a principle.
3. **Image licensing.** Every hero/gallery image traces to a real
   license tier per `content/rules.md`'s hero-image-tiers rule: source
   photo with attribution, licensed stock with attribution, or an
   original `near-illustrator` piece disclosed as AI-generated. Flag
   anything without a clear attribution/license trail — including a
   `licenseNote` that plausibly misrepresents what a stock photo
   actually shows (the existing "generic but correct" honesty
   requirement for area-not-venue photos).
4. **AI-disclosure compliance.** Every public byline discloses its AI
   nature (`author.aiLabel`, the persona's `disclosure` line) per the
   radical-transparency mandate — confirm a new persona or a piece
   using one didn't accidentally ship without it.
5. **Trademark/brand-name accuracy.** Real venue and brand names get
   used descriptively and accurately (this is what they're actually
   called, this is what they actually do) — flag anything that reads
   like it could be mistaken for an endorsement or an official
   partnership Near doesn't have.

## What this role is not

Not a fact-checker (that's sourcing/attribution discipline, already
`near-editor`'s job before this step) and not a voice/tone check
(`near-tov-police`'s job). This role is specifically the legal-risk
lens — narrower, more mechanical, and should rarely block a piece that
already passed the honesty and attribution rules cleanly; most pieces
should sail through this check without findings.

## Known limitation

This is a review checklist run by the writing pipeline, not a licensed
attorney. For a genuinely uncertain case — a real cease-and-desist risk,
a question about jurisdiction-specific advertising/disclosure law, a
serious defamation exposure question — escalate to the operator
directly rather than resolving it here.
