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

1. **Review allegations and practical criticism.** Apply the reader-utility
   rules in `docs/workflows/operator-directives-2026-09-10.md`. A link does not
   make a damaging review allegation publishable. Do not quote/paraphrase review
   allegations of misconduct, discrimination, crime or infestation. Benign useful
   quotations require an exact review permalink and attribution; corroborate
   practical policies independently. Omit unsupported gossip across all locales.
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

   **Tier-1 pass condition for Google Maps listing UGC / official-site /
   Instagram photos (operator directive, 2026-09-10).** This is a
   take-down-on-request posture, not a rights-clearance guarantee, and
   that is the accepted basis for this specific tier — do not hold a
   piece over it. Sign off when all three hold: (a) `attributionLink`
   deep-links to the actual photo/post, not just the venue's home page;
   (b) attribution names the real source (e.g. "Google Maps user photo,"
   or the Instagram handle); (c) a visible "report this image" control
   renders next to the caption, wired to the existing inbox form's
   `removal` type (`/api/inbox` — no new channel). Never Street View
   under this tier; that is a generic exterior shot, not a UGC photo of
   the place. If any of the three is missing, that's a real finding —
   the policy itself is not.
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

## Operator directives (2026-09-10)

Read the applicable section of `docs/workflows/operator-directives-2026-09-10.md`. Apply the review-allegation and Google-review-photo rules. Photos need exact provenance, creator attribution and a usage basis. Visual density is a floor; consult `near-video-finder` for useful video.
