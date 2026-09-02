---
name: google-discover-audit
description: Audits a piece (or the whole site) for Google Discover eligibility and for the neighbouring feed surfaces — Apple News, and the AR/glasses surfaces in docs/ar-surfaces.md. Covers Discover's actual documented requirements (content policies, transparency/byline rules, 1200px 16:9 hero images, max-image-preview:large, headline-content alignment) and separates what Google publishes from what the SEO trade press infers. Mandatory step inside near-write-article before any status flip to active; also runs standalone when the operator asks about Discover traffic, feed surfaces, Apple News, or why a piece did or didn't get picked up.
---

# google-discover-audit

Discover is a **feed**, not a search results page. Nobody typed a query;
Google decided a card was worth putting in front of someone. That makes
it the one surface where Near's usual lever — being the most specific
honest answer to a question — isn't sufficient on its own, because there
is no question. What's being judged is whether the card is worth a tap
and whether the page behind it is worth trusting.

This skill is the check for that. It sits next to `near-seo` (classic
ranking) and `aeo` (answer engines) as the third distinct reader:
`near-seo` optimises for a query, `aeo` for a machine that quotes you,
this one for a feed slot with no query at all.

**Re-check the sources before trusting this file.** Discover guidance
moves, and Google shipped the first Discover-specific core update in
February 2026. Everything below was verified on **2026-09-02** against
the pages linked in "Sources" — if this skill hasn't been re-verified in
six months, re-fetch those pages first and update this file as part of
the run. Do not audit from training data.

## What Google actually documents vs. what the trade press infers

Keeping these apart matters, because acting on an inferred penalty as if
it were policy leads to the wrong change.

**Documented by Google:**

- Eligibility is automatic: content is eligible once it's **indexed and
  meets the Discover content policies**. There is no tag, no structured
  data requirement, no minimum site size, no domain-authority threshold,
  no application.
- Images: **at least 1200px wide**, more than 300,000 total pixels,
  **16:9** aspect ratio, specified via `og:image` or schema.org markup.
  Avoid logos and text-heavy images.
- **`max-image-preview:large`** (or AMP) is what permits a large image
  preview at all. Not an eligibility gate — a card-size gate.
- Titles/headlines should **capture the essence of the content**.
  Clickbait and sensationalism that "artificially inflate engagement"
  are called out by name.
- **Misleading preview content** — a preview promising details the body
  doesn't deliver — is a restricted-content violation, not just bad
  practice.
- **Transparency**: clear dates, bylines, author and publication
  information, and contact information, so a reader can tell who made
  the thing.
- Ads/sponsored content must not exceed the content, and paid material
  must be disclosed rather than dressed as editorial.
- Violations show up as a **Discover manual action** in Search Console
  under Security and Manual Actions.
- Discover traffic is volatile by design; Google says fluctuation
  reflects shifting user interest, not necessarily a quality change.

**Trade-press inference, treat as a hypothesis:** that the February 2026
update penalises AI-generated content specifically, and the various
"30–60% traffic drop" figures. Google's own content policies do not
address AI-generated content at all. Discover is ranked by a separate
algorithm from Search as of that update — that part is sourced — but
the E-E-A-T and AI-byline reading of it is analysis, not documentation.
Don't quote it to the operator as Google's position.

## The Near-specific problem, stated plainly

Discover's transparency rule wants a clear byline and a reader able to
tell who is behind the content. **Every Near byline is a disclosed AI
persona**, and per the provenance constraint none of them may ever be
marked as a real `Person`. That is not fixable and shouldn't be — the
disclosure is the honest thing, and faking a human byline to please a
feed is exactly the deception the policy exists to catch.

What Near does instead is make the human node findable: the curator page
at `/about/thiago-baraldi` is the site's only `Person` in structured
data, now linked from the footer of every page and from `/about`
(shipped 2026-09-02). When auditing, confirm the piece is inside that
chain — footer link present, `/about` reachable, personas disclosed on
their own author pages — rather than trying to manufacture a human
byline on the piece itself.

If a Discover manual action or a sustained drop ever does appear, this
is the first hypothesis to test, and the operator should hear it framed
as a real trade-off — disclosed AI bylines may cost Discover reach —
not as a bug to route around.

## The audit — per piece

Run this **after** `near-illustrator` (step 6) and the sign-offs (step
7), before the status flip in step 9. It needs the finished body, the
resolved hero, and the final `shortTitle`.

1. **Hero image meets the card spec.** ≥1200px wide, >300,000 pixels,
   as close to 16:9 as the source allows, and reaching `og:image` —
   which on a place page comes from `meta.heroImage.url` via
   `generateMetadata`. A hero that's a logo, a text-heavy graphic, or a
   portrait-orientation crop fails the card even if it's a fine
   illustration. Hand a failure back to `near-illustrator`; don't
   downgrade the check.
   - **Known gap:** `heroImageSchema` in `lib/content/schema.ts` stores
     no width/height, so this cannot currently be verified
     mechanically — check the actual asset. Adding dimensions to the
     schema is a `near-tech-lead` item, logged, not something this skill
     fixes inline.
2. **Headline delivers what it promises.** Read the `shortTitle` and the
   `dek` as a card, with the hero, without the body — the only thing a
   Discover user ever sees before tapping. Does the body pay off every
   claim in it? An over-promising headline is the documented
   misleading-preview violation, and it's the failure mode Near's own
   punchy house style is most likely to produce.
3. **No clickbait shape.** Withheld nouns ("this one spot"), fake
   urgency, manufactured superlatives. Distinct from
   `near-tov-police`'s headline-shape check, which is about *repetition*
   across the catalogue; this is about *over-promise* on one card.
4. **Dated and attributed.** A visible date, a byline, the byline's
   author page reachable, sources linked in-body. Near does this
   already; confirm it rather than assuming.
5. **Timeliness is real.** Discover rewards timely and it's the surface
   where a dated event genuinely lands — which aligns with the
   site-wide preference for specific, further-out dates. A piece hung on
   a real dated event is a stronger Discover candidate than an evergreen
   one; note which this is, don't fabricate the other.
6. **Sponsored/affiliate disclosure survives.** If step 9b attached an
   affiliate link, the disclosure must be visible at the point of the
   link, and promotional material must not outweigh the content. This
   is a Discover policy, not only an FTC one.
7. **Page experience.** Mobile Core Web Vitals; the piece shouldn't
   introduce a heavy unoptimised image. Static-rendered Next pages with
   `next/image` normally pass — flag a regression, don't re-derive it.

Record the verdict with the piece's other pipeline logs, **including a
clean pass**, so the next run doesn't re-litigate it.

## Site-level, occasional

Not per-piece — run on request or alongside a `near-refresh` sweep.

- `max-image-preview:large` still emitted. It is, via
  `ROBOTS_PREVIEW_DIRECTIVES` in `app/robots.ts`, applied in the root
  layout's metadata. Confirm it's still wired rather than assuming.
- Search Console → Security and Manual Actions, for a Discover manual
  action. This needs the operator — Near's agents have no Console
  access. Ask; don't guess from traffic shape.
- **Topical consistency.** Publishing consistently inside defined topic
  areas is the trade-press reading of the Feb 2026 update, and it
  happens to be exactly what the neighborhood-first war-room strategy
  produces anyway. Worth noting as a reason that strategy is right, not
  as a new instruction.

## Apple News

**Apple News is not open.** It no longer accepts unsolicited publisher
applications, so there is nothing to submit and this is a *watch* item,
not a task. Don't spend a session preparing a submission for a door
that's shut.

What's worth keeping true regardless, because it's cheap and it's the
prerequisite if the door opens:

- The RSS feeds (`lib/seo/rss.ts`, `/feed.xml` and the per-column
  feeds) stay valid RSS 2.0, UTF-8, with channel `title`, `link` and a
  **`language` with a locale**, and item `title`, `link`, `description`.
  That's Apple's stated RSS requirement and it's good hygiene anyway.
- Apple News Format would be the richer path if Near were ever admitted;
  it is not worth building speculatively.

Near's disclosed-AI byline model is likely a harder problem for Apple's
editorial curation than for Discover's algorithm. Say so honestly if the
operator asks, rather than implying admission is a formality.

## AR and other feed surfaces

`docs/ar-surfaces.md` holds the real analysis; don't restate it here.
The relevant overlap: the HUD-glasses card (~600×600, no scrolling) and
a Discover card are the same design problem — a title, an image and a
distance have to carry the whole decision. A `shortTitle` that fails
step 2 above fails the glasses card too. Audit them together when both
are in play.

## What this skill does not do

Not `near-seo` (query ranking) and not `aeo` (answer engines) — three
different readers, three different checks, all three run. Not
`near-illustrator`: this skill states the card spec a hero must meet and
hands failures back, it doesn't source or generate images. Not
`near-tov-police`: over-promise on one card, versus repeated shape
across the catalogue. Doesn't touch Search Console — no agent here has
access.

## Sources

Verified 2026-09-02. Re-fetch before trusting.

- <https://developers.google.com/search/docs/appearance/google-discover>
- <https://support.google.com/websearch/answer/9982767>
- <https://support.apple.com/guide/news-publisher/> (Apple News
  Publisher guide)
- `docs/ar-surfaces.md`, `app/robots.ts`, `lib/seo/rss.ts`
