# Near.tips — Master Backlog & AI Agent Directives


Execute skill, logic, process and persona changes first, as they affect other actions, and then always invoke  product trio, chief editor, trendsetter and seo to prioritize next action using RICE and MoSCoW and own skill judgement. Execute all quick wins first. Execute action with any skill needed and after each action push live to public site near.tips, update backlog including crossing out done items/moving them to archive, and wrapping up by recommending that the operator clear or compact session. (keep this rule here)
## 🎯 SESSION HANDOFF (2026-09-02, late — READ THIS FIRST)

The operator delivered a large batch of directives and then asked for a
clean handoff. Items are marked ✅ as they land; every item names the skill
that should process it.

### State of the tree

- Working tree clean apart from one untracked draft (below); `main` is
  level with `origin/main`.
- ~~**`content/places/bar-italia-soho-london/en.mdx` is an unfinished draft.**
  A background agent researching it hit the session limit mid-pipeline.
  The English body is written and sourced (hours corrected against the
  bar's own Instagram, the Outernet second site, the Baird plaque), but it
  has **no `meta.json`, no hero image, no illustrator/TOV/legal pass and
  no locales**. Not publishable. Left untracked deliberately. Next session:
  resume it through `near-write-article` from the illustrator step, or
  delete it — do not commit it as-is.~~ **Stale as of 2026-09-03** — Bar
  Italia is fully built and published: `meta.json` present, all six
  locales, hero image. Nothing to resume.

### ✅ P0 — done, shipped `1c5f6fa`

Curator card on `/about` (above the AI cast) + a "Curator" link in the
footer of every page, in all six locales; the Gravatar is self-hosted at
`public/branding/thiago-baraldi.jpg` rather than hotlinked.

Original directive: **Link the curator page (`/about/thiago-baraldi`) from the About page and
from the footer of every page.** For credibility; the curator page is the
only `Person` in the site's structured data and currently has no site-wide
entry point. Use the operator's Google profile photo or associated
Gravatar, whichever is easier. → `near-tech-lead` + `near-lead-ux`.

### New skills to build (none exist yet)

1. ✅ **`google-discover-audit`** — built 2026-09-02 against Google's
   live "Get on Discover" doc and Discover content policies (not from
   training data), and wired in as **mandatory step 9a** of
   `near-write-article`. The hero card spec (≥1200px, >300,000px, ~16:9)
   is also stated up-front in `near-illustrator` so it's checked at
   sourcing time instead of failing an audit lap later.

   Three findings worth the operator's attention:
   - **`heroImageSchema` stores no width/height** (`lib/content/schema.ts`),
     so the card spec can't be checked mechanically — every audit has to
     eyeball the asset. → `near-tech-lead`.
   - **Discover's transparency rule wants a clear byline**, and every
     Near byline is a disclosed AI persona. Not fixable and shouldn't be
     — faking a human byline is exactly the deception the policy exists
     to catch. The mitigation is the curator page, now linked site-wide.
     If a Discover manual action or a sustained drop appears, this is
     hypothesis one. It's a real trade-off, not a bug.
   - **Apple News no longer takes unsolicited applications.** It's a
     watch item, not a task — don't prep a submission. Keeping the RSS
     feeds valid (RSS 2.0, UTF-8, `language` with locale) is the cheap
     prerequisite and good hygiene anyway.

   The trade press claims the Feb 2026 Discover core update penalises
   AI-generated content. **That is inference, not Google's position** —
   the content policies don't mention AI at all. Recorded in the skill
   as a hypothesis so nobody acts on it as policy.
2. ✅ **`language-tic-police` — BUILT 2026-09-02.** The scoping line
   against `near-tov-police` is **where in the piece the failure lives**:
   tov-police owns openers, headlines, register and stance; tic-police
   owns the sentence interior. The sharper distinction is method —
   tov-police *judges*, tic-police *counts*. Its founding premise is that
   a tic is invisible from inside a single draft (the four-bookshops
   headline audit proved it), so its unit of analysis is the catalogue,
   never the draft alone. Covers recurring constructions (the em-dash
   gloss, "not X but Y", the withheld noun, the rule-of-three close, the
   fragment-for-emphasis), a per-language watchlist word census with
   `quietly` and `tucked away` banned outright rather than rationed, and
   a paragraph/sentence-shape check. Runs on **every locale** — a
   translation grows its own tics. Wired into `near-write-article` step 7,
   which is now four sign-offs rather than three. Findings come back as
   the replacement, and the replacement is a concrete fact; a tic that
   can't be replaced with a fact means the sentence was never carrying
   information and gets deleted.

### ✅ Writing rules infused into `near-write-article`

Operator-set, applies to every piece:

- **Break paragraphs every 100 words maximum.**
- **250 words maximum per image**, hero image included. At 250 words and
  every 250 words thereafter, **a new sub-header is required** for SEO.
- These do **not** cap word count — they dictate how many images and
  sub-headers a given length must carry.

Canonical text now lives in `near-write-article` step 5 (paragraph and
sub-header density), step 6 (the `ceil(words / 250)` image floor) and
step 9 (checked per locale before any flip to `active`). Pointers back to
it added in `near-editor/references/style-guide.md` ("Long-form body"),
`near-illustrator` ("In-body images") and `near-translator` ("Validate
before writing"), so no skill states a rule that contradicts it.

### Prioritization method — ✅ CODIFIED 2026-09-02

`near-lead-product`, `near-product-owner`, `near-cpo` and the Product Trio
use **RICE _and_ MoSCoW**, plus their own specialist judgement, when
prioritizing anything — not RICE alone as the skills used to say.

Canonical text is in `near-lead-product` step 1; `near-product-owner` and
`near-cpo` point at it. The framing: **RICE ranks, MoSCoW commits.** A
MoSCoW pass must name its horizon (this session / batch / quarter) or it
is just adjectives; if everything is a Must, nothing was decided. **Won't**
is a recorded decision with a reason and a flip condition, not silent rot.
The two things RICE is structurally blind to and MoSCoW catches: a
**dependency** (a low-RICE item unblocking three high-RICE ones is a Must
regardless of score) and an **obligation** (an operator directive, a legal
or attribution fix, a correction to something already published is a Must
even at rounding-error reach). Where they disagree, specialist judgement
decides **and states why** — a named override is a decision, an
unexplained one is the vibes the rule exists to prevent.

### Neighborhood-first strategy

**→ `docs/neighborhood-first-index-2026-09.md`** holds the full list.

- Operator framing: *"Let's earn our place as a cool-neighborhood first
  website."*
- **War rooms for all of them** — every neighborhood in that file is a
  `near-war-room` target producing places, collections, guides and column
  issues, not one pin each.
- ⚠️ **Superseded tier list — corrected in place 2026-09-02.** This
  section used to read *"Tier 1 is now London, New York, Berlin,
  Barcelona; Rio de Janeiro is Tier 2."* That is no longer the tier list.
  The **single source of truth is
  `.claude/skills/content-rotation/SKILL.md`** (operator directive
  2026-09-01, amended 2026-09-02), which reads: Tier 1 = London,
  Brighton, San Francisco, Oakland, Bangkok. Rio is not in either tier —
  it got a **one-article Phase 1 exception** (operator, 2026-09-02) and
  has one live pin, `balcao-arpoador-rio`. The "Copanema"
  Copacabana/Ipanema deep dive is still wanted and is now the obvious
  second Rio unit.
- Also flagged: the international-visitors list as a queue/rotation input,
  and whether Bangkok is disproportionately large for 420 content
  (unverified → `near-deep-researcher`; more relevant now that Bangkok is
  Tier 1).

### Prioritization is a panel call, not a solo one (2026-09-03, operator directive — BUILT into `near-backlog`)

The operator: `near-backlog` "should always use trendsetter SEO product
trio CMO and chief editor to pick next priority collaboratively using
rice and moscow and judgement." Implemented as step 0 of the
`near-backlog` loop.

- **Panel:** `near-trendsetter` (what's current, closing windows),
  `near-seo` (demand, gaps, cannibalisation), the Product Trio
  (`near-lead-product` / `near-tech-lead` / `near-lead-ux` — owns every
  non-content call, including whether a blocked content item is cheap to
  unblock), `near-cmo` (distribution), and the chief editor (editorial
  coherence, byline fit). **`near-ceo` breaks ties.**
- **Method: RICE *and* MoSCoW, then judgment.** MoSCoW sets the band
  (a Must outranks any Could regardless of score — rules.md violations
  on live content, factual errors on published pages, explicit operator
  asks); RICE ranks within the band; judgment can override both **but
  has to say so out loud in the menu.**
- **The menu shows the panel's positions, not just the winner** — where
  near-seo and the chief editor disagreed, and how it resolved.
- Consulting the panel is in-session reasoning across the loaded skill
  files, not five agent dispatches per pick. Dispatch only when a
  function needs real research to have a position.

### Content commissions

- **Alt-luxury nautical guide to Angra dos Reis** and sensibly navigable
  surroundings, possibly out to Paraty. Should be **rich in dated events**
  → `near-events` first, then `near-war-room` with `near-editor-luxury`
  and `near-editor-outdoors`.
- **Ironberg gyms** — start with **Santos and São Paulo capital only**
  (not the whole state, per the operator's follow-up). Tag as **both
  fitness and late-night/24-7**; Ironberg is an influencer favorite and
  something of a cultural phenomenon. **The focus is fitness, not an art
  joke.** `fit-bot` should research and record **whether each location
  offers a day pass**, and should do this on every gym it writes.
  - **Any 24/7 gym is worth adding and following**, not just Ironberg.
  - **One-off art cameo, Ironberg Santos only:** invite `near-editor-art`
    to comment semi-sarcastically on the Ironberg aesthetic — the
    clothing, the ambiance. `near-illustrator` may be invited too. If real
    photos can't be sourced (check online **and Google Maps**), run the
    schtick of illustrating via the art references the art bot names in
    its appraisal. This cameo happens **once** — not a recurring bit.

- **London East End day — `near-blogger` collection (captured 2026-09-03,
  operator-approved follow-up; NOT started).** Once the V&A East
  Storehouse pin lands, the East End walking day described in
  `content/post-plan.md` (LONDON EAST END section) is made of enough
  published pins to be a real collection rather than a wishlist. Route,
  west to east: Central Station (King's Cross, the friend's base) →
  Gilbert & George Centre (Heneage St, Spitalfields) → Old Truman
  Brewery (Brick Lane, ~5 min walk) → E. Pellicci (Bethnal Green) → V&A
  East Storehouse (Hackney Wick) → V&A East Museum (Stratford), with La
  Camionera (Well Street, E9) sitting naturally at the Hackney end.
  - **Gate: do not draft until the pin count supports it.** Published
    today: Central Station, Gilbert & George Centre, Old Truman Brewery,
    V&A East Museum. Storehouse is in flight. E. Pellicci and La
    Camionera are still queued — the collection is stronger with them,
    so the honest sequencing is to drain those two first, or write the
    collection around the five that exist and cross-link the rest in
    later.
  - Hard practical facts the collection must lead with, not bury:
    Gilbert & George is **Thu–Sun 11:00–17:45 only** (a Mon–Wed visitor
    cannot get in) and TOAD/La Camionera are day-part-restricted. This
    is a routing piece; wrong hours make it useless.
  - **Peckham (Hausu, TOAD, Jumbi) is a separate day and the wrong side
    of the river** — do not fold it into this route.
  - Runs under the LONDON-ONLY override; per that block, publishing it
    does **not** advance the rotation cycle counter.

### ~~Schema DX: `eventEndsAt` is a build-breaking trap for evergreen pins~~ ✅ DONE 2026-09-03

**DONE.** `lib/content/schema.ts:110-111` — both `eventStartsAt` and
`eventEndsAt` are now `.nullish()`, so a pin may omit the key, write
`null`, or carry a real datetime. Checked the "does anything distinguish
absent from explicitly null" question before changing it: no. All four
downstream reads are in `lib/content/loader.ts` (138, 145, 180, 182) and
every one is a truthiness guard, so the two cases were already
interchangeable — the schema was the only thing insisting otherwise, and
`content/rules.md`'s `event-expiry` rule already described no-`eventEndsAt`
as "the default". Also fixed `eventStartsAt`, which was `.nullable()
.optional()` — the same thing spelled the long way — so the pair now reads
consistently. Verified the schema accepts absent/null/datetime and still
rejects a non-datetime string; `npx next build` clean.
`near-editor/references/content-schema.md` updated so the next content run
doesn't think the key is mandatory.

Original entry:

→ `near-tech-lead`. In `lib/content/schema.ts`, `eventEndsAt` is
`nullable()` but **not** `optional()`, so every new pin — including
evergreen places with no event at all — must carry an explicit
`"eventEndsAt": null` or the build fails at `loader.ts:22`. It cost the
Storehouse run a full build cycle, and it will cost every future pin one
until someone changes it.

Fix is `.nullish()` (or `.optional()` alongside the existing
`.nullable()`), plus a check of whether anything downstream distinguishes
"absent" from "explicitly null" — if nothing does, this is a one-line
change. Small, but it taxes every single content run, so it pays for
itself immediately.

### UI / product findings from the operator's screenshots

- **The "you are here" map marker is too subtle to find (2026-09-03,
  operator-reported — NOT started).** → `near-lead-ux` +
  `near-tech-lead`. **Cause located, so this is a small fix, not an
  investigation:** `components/map/WorldMap.tsx:48-55` (`userIcon`),
  rendered at `:273-279`.
  - It is **not actually neon**, despite how it reads on screen. It is a
    **12px dot filled with `--color-accent` (`#5c7a6c`, a muted sage
    green)** plus a 30%-opacity halo ring. Sage green over green-grey
    map tiles is close to camouflage, and 12px is small on a dense board.
  - It is also **completely static** — no pulse, no animation. Every
    mapping product the user has muscle memory for (Google, Apple,
    Citymapper) animates this dot, and animation is what the eye
    actually finds. That is probably the highest-value half of the fix.
  - Options, cheapest first: bump the size; swap off `--color-accent` to
    a colour that is *deliberately* not in the map palette, so it reads
    as UI chrome rather than as content; add a white/paper outer ring for
    contrast on any tile (the standard trick, and it works on both light
    and dark tiles); add a slow pulse.
  - **Constraint:** it must stay legible in **both light and dark
    themes**, and it must not read as a *place pin* — the whole point is
    that it is the reader, not a tip. Distinguishing it from
    `PlaceMarker` matters as much as making it brighter.
  - `prefers-reduced-motion` must disable any pulse.
- **Huge white space on desktop** on column/collection pages beside the
  body column — usable for post cards or a small ad unit.
  → `near-lead-ux` + `near-tech-lead`. Second screenshot flags the same
  gap next to the article hero as an ad slot.
- **The board layout is "wonky."** Two screenshots at desktop width show
  the map/card rail misaligned. Distinct from the 768–910px overflow fixed
  earlier today — this is at full desktop width. → `near-tech-lead`.
- **Favorites should be a heart**, labelled *liked / gostei*, not a star.
  → `near-lead-ux`.

#### Map sidebar, three separate defects (2026-09-03, operator-reported)

Operator, verbatim: *"the tool tip doesnt fit, the south america cluster is
crazy, the ad box is crazy."* One screenshot, three distinct causes — do
not treat them as one "sidebar is wonky" ticket. → `near-tech-lead` +
`near-lead-ux`. **Captured only; deliberately NOT fixed** (operator
directive same session: *"just capture in backlog dont fix yet"*).

- **The map house-ad overflows its box and is silently clipped.**
  **Measured in a running dev server, so this one is diagnosed, not
  suspected:** in the map column the unit's content lays out **654px wide
  inside a 262px box**, and `Placement.tsx`'s wrapper `overflow-hidden`
  cuts the remainder off.
  - The headline renders as **one 491px line** — the format's
    `line-clamp-2` never engages because nothing constrains the width.
  - The `Read this →` CTA lands at **x=1412**, entirely outside the box.
    It is on screen in the DOM sense and invisible to the reader.
  - The thumbnail collapses to **3px wide** — `h-full` on a `flex-none`
    item under `items-center` has no height to derive `aspect-square`
    from. That 3px sliver is the thin bar visible in the screenshot.
  - **Cause:** `app/[locale]/page.tsx:73-88` sells `mobile-banner`
    (320x100) into the map column, and `Placement.tsx`'s `HORIZONTAL`
    branch (`:178-181`) strings thumb + kicker + headline + teaser + CTA
    into a single row with every item `flex-none`. Fine at 320px,
    impossible at 262. Note the page comment already worried about
    exactly this for `leaderboard` and picked `mobile-banner` as the safe
    option — it isn't; **`stretch` lets a unit render narrower than its
    nominal format**, and nothing in `Placement` handles that case.
  - **Two candidate fixes, and this is a product call, not just a CSS
    one:** (a) make the horizontal format shrink-safe — stack kicker +
    headline + CTA beside a fixed-width thumb, `min-w-0` throughout so
    `line-clamp` can actually bite; or (b) stop selling a 320px unit into
    a 262px slot and use `mrec`, which fits the column honestly. (b)
    costs ~150px of the sticky column's height budget, which is what
    `Board.tsx:256-265` was protecting. → `near-lead-product` to pick,
    since it decides what inventory the slot represents to a future buyer.
- **The tooltip doesn't fit the map frame.** `WorldMap.tsx:248-258`.
  The card is `w-[min(13rem,calc(100vw-3rem))]` — **clamped to the
  viewport, but the real constraint is the map container**, which measures
  **282px wide**. A 208px card anchored at a pin's centre therefore
  overflows whenever the pin sits within ~104px of either edge, i.e. for
  most of the map, and the frame's load-bearing `overflow-hidden` slices
  it. Vertically it's the same story: hero image + type ≈ 170px of card
  anchored *above* the pin, inside 340px of map.
  - The existing comment at `:249-254` says this was already fixed once
    for the "image leaks" report. It wasn't — `100vw` is 1152px on
    desktop, so the clamp is inert exactly where the column is narrow.
  - The fix has to clamp against the **map element**, not the viewport,
    and probably needs to flip the tooltip's `direction` near the top
    edge. Worth re-checking whether a `Popup` (which has `autoPan` /
    `keepInView`, unlike `Tooltip`) is the right primitive after all.
- **The South America cluster is wrong.** Operator-reported from the
  screenshot; **not yet reproduced** — the board state I loaded had
  filters applied and rendered only two markers, so this one still needs
  diagnosis before anyone estimates it. Start at the `Supercluster` setup
  (`WorldMap.tsx:296-400`) and the `clusterIcon` size ramp (`:57-75`).
  Likely suspects given the Baixada Santista concentration: Santos, São
  Vicente and São Paulo sit within ~70km, so at world zoom they collapse
  into one badge whose count and radius stop matching what clicking it
  does. Reproduce **at world zoom with filters cleared** first.
- **The filter set is a promise we're not keeping.** If the board offers
  Vira-noite, Sober Curious, Lenda Local, Flagra de Famoso, Querido dos
  Influencers, Pet-Friendly, Achado Escondido, etc., **those filters must
  be populated fast**. Each needs an editor skill accountable for it —
  reusing an existing persona is fine, but that persona must then be on
  the hook for refreshing that filter's content regularly.
  → `near-lead-product` to assign; `near-refresh` to schedule.

### Byline upgrade — AI writer credit block

On every article, next to the byline avatar, show **a badge and a
custom, slightly cheeky bio/tagline written for that specific article**.
The operator's example, on the `legends-hotel-brighton` page:
`NITE-PORTER [AI Writer] [Não frequenta cabaré.]`

- Every locale's editor/translator must invent **its own** joke tag **in
  its own language** — not a translation of the English one.
- The tag must always relate to the article it is signing.
→ `near-lead-ux` for the component, `near-write-article` for generating
the tag, `near-translator` for the per-locale versions.

---

## 📋 PREVIOUS HANDOFF (2026-09-02, evening)

**Everything below is live on near.tips.** Working tree clean, 12 commits
pushed, production verified. 



### Shipped and verified live

1. **Canonical + hreflang on every route.** 11 of 13 route types had
   neither; the six locale home pages had no `generateMetadata` at all.
   One helper (`lib/seo/alternates.ts`), `x-default` everywhere.
2. **Sitemap made honest.** `<priority>` dropped, every `lastmod` from
   content frontmatter so no URL claims to change per build, seven route
   types added. **390 → 630 URLs.**
3. **`max-image-preview:large`** — verified against Google's live docs:
   *not* a Discover eligibility gate, but it gates the large-image
   treatment a Discover card is.
4. **Addressable location pages** — `/[locale]/in/[...location]`,
   **20 pages × 6 locales**. Gated at ≥2 places; neighborhoods are
   city-scoped because names collide (Centro Histórico spans Santos and
   Paraty). Duplicate parents retired with 308s.
5. **Board layout overflow fixed** — `1fr` could not shrink below
   min-content, spilling the map/promo rail up to 158px off-screen
   between 768–910px.
6. **A live page serving a 404 hero image** (`legends-hotel-brighton`) —
   Commons URL hash directory was hand-assembled. Corrected.
7. **Curator page** (`/about/thiago-baraldi`, six locales) — the human
   node the trust chain lacked. The only `Person` in structured data;
   every AI author page links up to it.
8. **The ICA, London** — six locales, hung on the BFI London Film
   Festival (7–18 Oct 2026). Created `/in/london/st-james-s` as a side
   effect.
9. **Five C-level roles** — `near-ceo`, `near-cfo`, `near-cmo`,
   `near-cto`, `near-cpo`, split by altitude.

### ⚠️ Corrections made this session — do not re-derive these wrong

- **Count board pins, not `meta.json` files.** Hosted events carry
  `parentPlace` and are filtered off the board. Santos / Centro Histórico
  needs +2, not +1.
- **The TOV headline-formula check never worked.** It was case-sensitive
  against title-case headlines: reported 0, actual 16. Fixed in the skill.
- **Rio Cinema Dalston is not an LFF venue.** Checked before publishing.

### 🚫 No PARSER article exists

The content-generation column was **scoped and constrained, not written**.
PARSER has no column route, no index JSON, and no drafted issue, and the
content-generation specialist skill does not exist yet. Anything claiming
otherwise is wrong. The operator's constraint (teach the mechanism, never
publish Near's baselines) is recorded under the column's backlog item.

### Next, in order

1. **`near-cmo`: make the outreach-freeze exit condition testable** and
   put it to the operator. Everything PR-shaped is blocked behind it.
2. **AR waypoint view on a phone** — the shippable half, a link-earning
   asset that costs nothing against the freeze.
3. **`near-cpo`: ratify a north star.** Still unratified.
4. **Neighborhood deepening** — São Paulo / Centro and Liberdade are +1
   each; Santos / Centro Histórico +2.
5. **Resubmit sitemap in Search Console** if not already reflected — it
   changed structurally four times today.


## ✅ SHIPPED (2026-09-02, lead-product session): the head/sitemap P0 bundle

The previous handoff called "audit canonical + hreflang across six locales"
**the true P0** and guessed nobody had inspected the rendered `<head>`. That
was right, and the audit found worse than expected: **11 of 13 route types
shipped no canonical and no hreflang at all.** Only `/place` and `/collection`
had them, and neither declared `x-default`. Six locale home pages — the most
crawled URLs on the site — had **no `generateMetadata` whatsoever.**

RICE put this above the `/in/[location]` work (blocked on `near-ux-designer`'s
aggregation pattern anyway) and above Discover research: reach is every URL ×
six locales, confidence is maximal once inspected rather than guessed, and
effort was a single session. Everything else on the board is either blocked,
research-first, or narrower.

Shipped, all verified in the built HTML rather than assumed:

1. **`lib/seo/alternates.ts`** — one `buildAlternates(locale, path)` helper
   emitting canonical + six hreflang + `x-default`. Wired into every route
   type: home, place, collection, author, guides, sources, about, and all four
   column landings. Verified: 7 `<link rel="alternate">` tags render per page.
2. **`/privacy` and `/terms`** — English-only bodies served under six locale
   prefixes were six undeclared duplicates. All six now canonicalize to `/en`,
   with **no** hreflang (declaring translations that don't exist is worse than
   declaring none) and are dropped from the sitemap.
3. **`app/sitemap.ts`** — `<priority>` removed entirely; `lastmod` now derives
   from content frontmatter everywhere, so no URL claims to change per build.
   Added the seven missing route types. **390 → 498 URLs**, each carrying
   `xhtml:link` hreflang alternates that agree with the in-page tags by
   construction (both generated from `routing.locales`).
4. **`max-image-preview:large`** + `max-snippet:-1` + `max-video-preview:-1`
   in the root layout. **Checked against Google's live "Get on Discover" doc,
   not training data**: this is *not* an eligibility gate — content is eligible
   once indexed and policy-compliant. What it gates is the large-image
   treatment a Discover card *is*, so Near was opting itself down to a
   thumbnail against its own hero-image standard.

Note for whoever does the sitemap next: **do not reach for `fs.statSync`
mtimes** for `lastmod`. A CI checkout rewrites every mtime to clone time —
the same defect as `new Date()`, just harder to spot. That trap is commented
in the file.

**Next up, in order:** resubmit the sitemap in Search Console (the fixes are
worth nothing until Google re-reads it) → `near-ux-designer`'s thin-coverage
aggregation pattern, still the single blocker on `/in/[location]` → the
Discover eligibility research, which is now unblocked on the metadata side.

## 🎯 SESSION HANDOFF (2026-09-02, PO session — READ THIS FIRST)

A large operator dump was processed into files. **Nothing was implemented** —
this session was intake, diagnosis and capture only. Where to pick up:

**Read these three new docs before touching anything they cover:**
- `docs/external-seo-geo-audit-2026-09.md` — external audit. **INPUT, not
  policy.** §2 lists which of its premises are factually wrong; don't rebuild
  on them.
- `docs/assignment-provenance-and-human-curation-2026-09.md` — the 15-part
  provenance brief. Owner `near-product-owner`, deliverable is a DDR,
  **present before coding.**
- `.claude/skills/near-product-owner/SKILL.md` — new role. Read it before
  spec'ing anything large; it defines the DDR shape and the
  captured → input → directive → policy ladder.

**Live status board** (statuses + agent owners, generated this session):
https://claude.ai/code/artifact/b78e713e-7adf-44ca-ba6b-11d64768dc9c

**The critical path, stated plainly:** `near-ux-designer` is blocking the
single biggest SEO/AEO move on the board. `/[locale]/in/[location]` cannot
ship until the aggregation-page pattern exists — and the **thin-coverage
state must be designed first** (at 60 places most locations resolve to 2–3
pins; three cards in a twelve-card grid reads *abandoned*, not *early*).
Everything downstream waits on that.

**Cheapest real wins available right now**, none blocked:
1. `app/sitemap.ts` — drop `<priority>`, fix `lastmod` on the three static
   per-locale entries (owner `near-tech-lead`).
2. Audit canonical + hreflang across six locales on one place page — nobody
   has ever inspected the rendered `<head>` (owner `near-seo` +
   `near-tech-lead`). This is the true P0.
3. `max-image-preview:large` in `app/robots.ts` for Discover eligibility —
   but confirm against current Google docs first, **not training data**.

**Do not** start Layer-3 intent URLs (`/london/vegan`). Deliberately shut
until `near-seo` has real Search Console data.

## 🏛️ C-LEVEL ROSTER (2026-09-02, BUILT — operator directive)

Five internal executive roles, none with a public byline:
`near-ceo`, `near-cfo`, `near-cmo`, `near-cto`, `near-cpo`.

**Operator's framing, and the design principle:** *"the c level doesnt
have to duplicate, each can simply focus on their level. good to have
different perspectives on things anyway."* So the split is **altitude,
not territory** — the product ladder now reads
`near-product-owner` (what exactly is this?) →
`near-lead-product` (what next, in what order?) →
`near-cpo` (what is this product for, and what will it never be?),
and the technology ladder reads
`near-tech-lead` (this change, this week) →
`near-cto` (this direction, this year).

**Two roles cover ground nobody owned at all:**
- **`near-cfo`** — money. Unit economics, whether a monetisation path is
  worth its editorial cost, and reality-checking the AdSense/revenue
  projections sitting at the repo root against real Search Console data
  before anything is built on them.
- **`near-cmo`** — go-to-market sequencing across the five
  marketing-adjacent skills, positioning, and **ownership of the
  outreach freeze and its exit condition**, which is currently proposed
  but not ruled on.

**`near-ceo` is not the operator.** The operator is. That role resolves
cross-functional deadlock and produces one synthesised read across the
functions; it escalates, it never overrules, and every operator ruling
(the freeze, no polygons, the column constraint, the neighborhood push)
stands above it.

**Unchanged at every altitude:** content decisions stay with `near-seo` +
`near-trendsetter` + the chief editor per `content/rules.md`. A C-level
role that starts commissioning coverage is how a guide becomes a
brochure, and each of the five files says so explicitly.

### First tasks, already named in the files

1. `near-cmo` — turn the proposed outreach-freeze exit condition into a
   testable bar and put it to the operator. A freeze with no defined end
   becomes permanent by drift.
2. `near-cpo` — ratify a north star. The external strategy read proposed
   one, the Trio and operator responded, **nothing has been ratified.**
3. `near-cfo` — check the repo-root revenue projections' traffic
   assumptions against Search Console before they inform anything.

## 🕶️ AR: the shippable half, and why it is link-strategy (2026-09-02)

**Operator:** *"it could be good for marketing to get this to work on meta
and (android?) AR glasses ASAP"* and *"AR experience could get good
backlinks, AR is still news innit"*.

The second point is right and sharpens the first. An AR demo is a
**link-earning asset, not an outreach ask** — people cite a working demo
without being pitched — so it **costs nothing against the outreach
freeze**, because nobody is contacted. It is also plausibly the
readiness milestone that would justify lifting the freeze. `near-cmo`
owns that sequencing.

**What to build first, per `docs/ar-surfaces.md` §"Recommended
sequencing":** not glasses. A **bearing-and-distance waypoint view on a
phone** — it needs no hardware, is the most useful thing Near could add
for someone standing on a street, is testable today, and is the same
maths as the glasses version with different rendering. Ray-Ban Display
has no world tracking, so a true overlay cannot exist there regardless.

**Standing tension to respect:** EPIC 3 already says the launch story
ships "timed to a working build rather than an announcement of intent."
Build first, pitch when the freeze lifts.

## 🛑 OUTREACH FREEZE (2026-09-02, OPERATOR DIRECTIVE — in force)

**Operator, verbatim:** *"by farming links i mean we will have to message
people, email people, talk to people. quality links. by we need the site to
be more fleshed out before any pr campaigns, until then the pr skills can
offer guidance but no outreach until we are ready"*

Two rulings. First, a **correction of terms**: "farming links" here means
real human outreach for quality links — messaging, emailing, talking to
people — not directory drops or scaled link acquisition. An earlier session
note used "farming" loosely in the spammy sense; that reading is wrong and
is corrected here.

Second, a **hard freeze**: `backlink-pr`, `affiliate-pr` and `ad-sales` may
research, identify channels, draft pitches and keep their logs current, but
**may not contact anyone** until the operator says so. The reasoning is
sound and worth restating: you get one first impression per contact, and
spending it on a ~60-place site costs more than waiting.

Enforced in three places rather than left as prose: the freeze banner now
heads all three outreach logs (`content/backlink-outreach.md`,
`content/affiliate-outreach.md`, `content/ad-sales-outreach.md`), and
`near-write-article`'s step 9b — the step that reads most like an
authorisation to pitch — carries it inline.

**Open for the operator:** the freeze has no defined end, which makes it
permanent by drift. `near-lead-product` has proposed a testable exit
condition (materially deeper coverage, six genuinely complete locales, a
column with a real run behind it, Search Console showing indexation, zero
broken heroes) recorded at the top of `content/backlink-outreach.md`.
**Not decided — the operator sets the bar.**

## 🖼️ Discover readiness audit (2026-09-02) — MEASURED, two fixed, one systemic gap open

Operator supplied a five-point Google Discover checklist. Audited each against
the actual site rather than agreeing in principle. Scores below are honest.

| checklist item | state |
|---|---|
| `max-image-preview:large` | ✅ **shipped today** (commit 389e698) |
| Indexation | 🟡 sitemap 612 URLs, resubmitted 2026-09-02, waiting on Google |
| Mobile-first UX | 🟡 tablet-width overflow bug found and fixed today (6c86e03); speed unmeasured |
| Images ≥1200px wide | ❌ **only 32 of 60 heroes pass** — see below |
| E-E-A-T / bylines | 🟡 bylines + author pages exist; the provenance DDR is the open work |
| Headlines, no clickbait | 🟡 rules exist; headline-formula retrofit still open |

### Hero-image measurement (all 60 places, real pixel dimensions)

Measured by range-fetching each hero and parsing the JPEG/PNG/WEBP header —
not by trusting the URL. Script kept at `scratchpad/imgsize2.mjs` pattern;
re-runnable. **Throttle it**: Wikimedia 429s aggressively on parallel fetches
and needs a descriptive `User-Agent`.

- **32 of 60 are ≥1200px** and Discover-eligible for the large treatment.
- **17 are under 1200px**, worst first: 480px (ica-london, since replaced),
  570px (djapa-sao-paulo, pracinha-do-seu-justino-sao-paulo), 640px
  (restaurante-almeida-santos), 740px (cuia-copan-sao-paulo), 800px
  (de-trut-amsterdam), 940px (gays-the-word-london), 945px, 997px, then a
  cluster at 1024–1089px.
- **11 unresolved** (Wikimedia 429) — re-run to finish the count.

### Two bugs found and fixed the same day

1. **`legends-hotel-brighton` was serving a hero image that 404s on a live,
   `active` page.** The Commons URL used hash directory `9/9e`; the file is
   under `8/8f`. **The two-level hash path is derived from the filename's MD5
   and cannot be guessed** — whoever wrote that URL constructed it by hand.
   Fixed. **Standing rule: verify a hero URL returns 200 before publishing,
   and get Commons URLs from the API (`action=query&prop=imageinfo`), never by
   assembling them.**
2. `ica-london` hero swapped from a 480×640 portrait shot in 2006 to a CC0
   4645×3100 frontage photographed 17 May 2026.

### The systemic one, for `near-illustrator` — still open

**Near's own generated illustrations are 1024×572** (`ishigaki-jujitsu-london`,
`lucky-saint-fitzrovia-london`). Those are the images Near fully controls, and
they are the ones failing the threshold by spec rather than by luck. The
generation spec should produce **≥1200px wide** so anything Near makes itself
clears Discover automatically. Sourced photos will always vary; house-made
assets shouldn't.

Also open: a re-check pass for the 17 undersized heroes, preferring a larger
file of the same subject on Commons (the API returns `width`/`height`, so this
is mechanical) over regenerating anything.

## 📈 Google Trends dump (2026-09-02) — INPUT, mostly not usable

Operator pasted a Trends comparison of London / San Francisco / São Paulo and
asked that search trends be considered. Honest read, recorded so the same
dump doesn't get re-litigated:

**The window and the query mix make most of it unusable for Near.** It was
*worldwide, last 24 hours*. The top queries are navigational and
weather/logistics — "time london", "weather london", "flights to london",
"hotel london" — which Near cannot and should not compete for. The rising set
is mostly hard news ("mayor of london dvla prosecution" +3,700%). Near is not
a news site chasing 24-hour spikes; the whole strategy is long-tail evergreen
plus genuinely dated events. **Chasing this would be the listicle-farm
posture in a new costume.**

**Two items in the dump are real and on-beat, and both are London:**

1. **BFI London Film Festival, 7–18 October 2026** — the 70th edition, opening
   with *Elsinore* (Simon Stone), closing with *The Debut* (Jesse Eisenberg)
   at the Royal Festival Hall. Verified against the BFI's own listings, not
   the Trends row. Rising +150–200%. This is exactly the shape the standing
   rule wants: specific, dated, and ~5 weeks out rather than next weekend.
2. **Bayeux Tapestry at the British Museum** (+250%) — worth `near-events`
   confirming dates and ticketing before anything is built on it.

**Methodology note for `near-seo`:** the 24-hour worldwide window is the wrong
instrument. Use a 12-month window with category filters and per-country
scoping, and treat Trends as a *timing* signal for events already on the
radar, never as topic selection. Real query-gap work waits on Search Console
data, which is the documented reason Layer-3 intent URLs stay shut.

Neither London item changes the current push — see the neighborhood directive
below, which the operator set after this. Logged for `near-events` and the
London slate.

## 🏘️ OPERATOR DIRECTIVE (2026-09-02): deepen neighborhoods — queer + "Portlandia"

**Operator, verbatim:** *"neigborhoods sounds good. portlandia style ones and
gay ones lol"* — answering the content question left open by the coverage
measurement (`docs/chatgpt-three-year-strategy-2026-09.md` §6): deepen a few
neighborhoods rather than spread wider.

This is a **content call, so it belongs to `near-seo` + `near-trendsetter` +
the chief editor** to execute. What follows is scope, not selection — the
thresholds and the existing footholds, so nobody re-derives them.

### The arithmetic that makes a target a target

- **2 pins** → the neighborhood gets a page at all (`MIN_PLACES_FOR_LOCATION_PAGE`).
- **4 pins** → it stops rendering in the thin state and gets category grouping
  (`GROUP_FROM` in `app/[locale]/in/[...location]/page.tsx`).

So the unit of work is **"take one neighborhood to 4,"** not "add pins." Three
new pins in one neighborhood beats three in three.

### Third constraint, operator (verbatim): *"up and coming too, not the ones already covered way too much elsewhere"*

This is a **filter, not a tiebreak**, and it removes the names that would
otherwise top the list. A neighborhood every listings site has already written
to death is one Near cannot say anything new about — and saying the obvious
thing about Soho is precisely the directory posture the whole location layer
was gated to avoid. **Saturation disqualifies; it does not merely deprioritise.**

**Ruled out on saturation** (keep the existing pins, don't build the page):
London / Soho, London / Shoreditch, San Francisco / Mission District, New York
/ East Village, São Paulo / Vila Madalena, London / Spitalfields.

Shoreditch and Vila Madalena are the awkward cases: both are **already live
pages** at 2 pins. They stay live — they're honest and thin-state — but they
are not where the next pins go.

### Queer, with a foothold and still findable (pins today → need for 4)

| neighborhood | now | need | note |
|---|---|---|---|
| Santos / Centro Histórico | 2 | +2 | **Corrected 2026-09-02**: the third row there (Cabaret Latino) is a *hosted event* on Teatro Clube da Eskyna, which `getAllPlaces` filters off the board and off the location page. Count board pins, not `meta.json` files |
| São Vicente / Ilha Porchat | 1 | +3 | AMUSE. Home region |
| São Paulo / Santa Cecília | 1 | +3 | The genuinely current SP answer, not Frei Caneca |
| Praia Grande / Boqueirão | 1 | +3 | Home region, essentially uncovered in English |
| London / Dalston | 1 | +3 | Borderline — past its "up-and-coming" window, still under-covered vs Soho |
| Brighton / Kemptown | 1 | +3 | |
| Amsterdam / Zeedijk | 1 | +3 | |

### "Portlandia" (twee/indie/artisanal), same filter

| neighborhood | now | need | note |
|---|---|---|---|
| Santos / Vila Mathias | 1 | +3 | Home region |
| Porto / Cedofeita | 1 | +3 | Strong fit, thinly covered in English |
| Bologna / Cirenaica | 1 | +3 | |
| London / Walthamstow | 1 | +3 | |
| London / Peckham | 1 | +3 | |
| Oakland / Adams Point | 1 | +3 | |
| São Paulo / Pinheiros | 1 | +3 | Borderline on saturation — chief editor's call |

### 🚫 Constraint, operator: no polygons

*"lets not try to have polygons at this point"* — a neighborhood stays a
**label on a place**, not a geographic shape. No boundary GeoJSON, no
containment tests, no "is this point inside Cedofeita" geometry.

This matters because it prunes a branch that was about to look attractive:
`near-ux-designer`'s "map-first, not map-adjacent" idea (§5 of the strategy
doc) reads naturally as *draw the neighborhood*. It doesn't have to. A cluster
of pins on a plain map already tells the reader a neighborhood is walkable,
which was the actual argument. Boundaries would mean sourcing and maintaining
shape data per neighborhood across six locales, for a line on a map.

If a location page ever gets a map, it plots **its own pins** and nothing else.

### Sequencing note for whoever picks this up

**Counting rule, learned the hard way:** a neighborhood's size is its count of
**board pins** (`getAllPlaces`), not of `meta.json` directories. Hosted events
carry a `parentPlace` and are deliberately filtered off the board, so they
never count toward a location page. The first version of this table got this
wrong and called Santos a one-pin win when it needs two.

Actual cheapest wins, recounted:

| neighborhood | pins | need |
|---|---|---|
| São Paulo / Centro | 3 | **+1** |
| São Paulo / Liberdade | 3 | **+1** |
| Santos / Centro Histórico | 2 | +2 |

Everything else on the lists above needs +3.

**Operator picked São Paulo / Centro for the first pin (2026-09-02).** Note
for whoever writes it: all three existing Centro pins (Bar Fel, Cuia,
Megafauna) are inside **Edifício Copan**. The page currently reads as a
building, not a neighborhood — so the fourth pin should sit elsewhere in
Centro, or the grouping will just be Copan with extra steps.

Per the standing geographic preference, **Santos / São Vicente / São Paulo
outrank the others**, and Santos / Centro Histórico still serves both themes
at once once it gets its two. Praia Grande / Boqueirão and
Santos / Vila Mathias are near-invisible in English-language coverage, which is
exactly the gap the "up and coming" filter is pointing at.

Standing rules still apply: dated events preferred, further-out dates over
near-term ones, six locales per piece, `near-write-article` is the pipeline.

## 🆕 New skill: `near-product-owner` (2026-09-02, BUILT)

`.claude/skills/near-product-owner/SKILL.md`. Sits **under**
`near-lead-product`: the lead decides *what next and in what order*; the PO
decides *what exactly this is, what the options are, what's recommended, and
how we know it's done.* Owns intake of large operator dumps, the
captured → input → directive → policy ladder, nine-section Design Decision
Records in `docs/ddr-*.md`, failable acceptance criteria (six-locale tax,
thin-coverage state, listicle-farm test), and handoff to a named skill.
Internal-only, no byline. Not `productnaut-pm` (different product entirely).

## 🔍 Search Console reality check (2026-09-02, DIAGNOSED — mostly a non-issue)

Operator pasted GSC showing "não foi possível buscar o sitemap", 0 pages
found, and `/` as "rastreada, mas não indexada". **Verified live the same
day — the site is fine:**

- `https://near.tips/sitemap.xml` → `200 application/xml`, 137ms, 56.9 KB,
  **390 `<loc>` entries**.
- `https://near.tips/robots.txt` → `200`, `allow: /`, sitemap declared.
- `https://near.tips/` → `307` → `/en`. Expected locale redirect.

GSC's read is stale from submission time. **Action: resubmit, then wait.**
"Crawled, currently not indexed" on a five-day-old domain is normal.

Two real fixes surfaced anyway, both in `app/sitemap.ts`, both tiny:

1. **Drop `<priority>` entirely.** Not a ranking mechanism Google uses.
2. **Fix `lastmod` on the three static per-locale entries** (lines ~14-32).
   They pass `new Date()`, so `/`, `/sources` and `/guides` claim to change
   on **every build** — training Google to re-crawl for nothing. Place and
   collection entries are already correct (`meta.updatedAt`). `lastmod` must
   mean *the indexable representation changed*.

Owner: `near-tech-lead`. Full context: `docs/external-seo-geo-audit-2026-09.md`.

## 📰 Google Discover / Android News feed as a traffic surface (2026-09-02, OPERATOR DIRECTIVE — not started)

**Operator, verbatim:** *"google android news tab picks up automated ass
content like this lets make sure we are geared to appear in this feed this has
to be huge source of traffic"* — attached: the Android Discover feed serving a
verified fan account's cast-list post alongside Jornal O Globo.

The observation is correct and the strategic read is sharper than it looks:
Discover is **not** a search surface. It has no query. It rewards fresh,
entity-rich, visually strong, feed-shaped content — which is why a fan account
outranks a newspaper there. Near's dated-events discipline and
`near-illustrator`'s hero-image standard are already most of the way to
Discover-shaped; nothing about it conflicts with the anti-listicle-farm rule.

Known eligibility mechanics to verify before building (do **not** trust
training data here — `near-seo` and `aeo` must confirm against current Google
documentation):

- Large, high-resolution images (the `max-image-preview:large` robots
  directive is the usual gate — **Near does not currently set it**;
  `app/robots.ts` sets only `allow: /`).
- Clear publish/update dates and a real byline — which collides directly with
  the provenance assignment above. **Sequence these together.**
- Entity clarity and topical consistency per surface.
- No clickbait; Discover demotes it. Near's headline rule already agrees.

Owners: `near-seo` + `aeo` (eligibility research), `near-tech-lead`
(robots/metadata), `near-illustrator` (image spec), `near-product-owner` (DDR
if it turns out to be more than a metadata change — decide *after* the
research, not before).

## 🧾 ASSIGNMENT: provenance, human curation & source authority (2026-09-02, COMMISSIONED — not started)

Full brief saved at
`docs/assignment-provenance-and-human-curation-2026-09.md`. Fifteen-part
operator brief on separating **human taste (authority)** / **sources
(evidence)** / **AI agents (production)** / **Near (publisher)** without the
personas ever pretending to be human.

Owner: `near-product-owner`. Deliverable is a nine-section DDR at
`docs/ddr-provenance-2026-09.md`, **presented for approval before any code.**
Hard constraints: extend the existing byline/source mechanisms rather than
building a parallel architecture; flat files only (Git + Markdown +
frontmatter, no DB, no CMS); MCP-readable Markdown, never model-specific
prompts; never mark an AI persona as a real `Person` in structured data.

## 📥 External SEO/GEO audit (2026-09-02, INPUT — not policy)

`docs/external-seo-geo-audit-2026-09.md`. External read of the sitemap and
architecture. Corroborates two existing house positions (`/in/[location]` as a
real route; it must not be a card grid) and adds a five-layer URL model whose
**Layer 3 (intent URLs like `/london/vegan`) stays shut until `near-seo` has
real Search Console data** — building it on imagination is the documented path
to a cemetery of thin pages. Near-side corrections to the audit's wrong
premises are recorded in §2 of that doc. Nothing adopted; routes to the
Strategy Summit.

## 🔗 Location-filtered views must be shareable by link (2026-09-02, OPERATOR DIRECTIVE — not started)

**Operator, verbatim:** *"I personally love the focus on neighborhood. And I
think our pages filtered by location (eg city or neighborhood) should be
shareable with a link."*

Two rulings in one sentence: the neighborhood emphasis from the external
strategy read is **endorsed direction** (see
`docs/chatgpt-three-year-strategy-2026-09.md` §4), and location-filtered board
views need real, linkable URLs.

### ⚠️ MEASURED 2026-09-02 — read before building this

The coverage numbers behind this directive were finally counted (full table in
`docs/chatgpt-three-year-strategy-2026-09.md` §6). Two findings change the shape
of the work:

1. **44 of 49 neighborhoods have exactly one pin.** Unfiltered, all four levels
   ship 85 pages × 6 locales = **510 URLs**, more than doubling the site's 498
   and almost all of them single-pin near-duplicates. **Gate at ≥2 pins** (a
   named constant, not a magic number): 25 pages / 150 URLs, and coverage
   promotes pages into existence as content lands.
2. **Neighborhood names are not unique.** `Centro Histórico` spans **Santos and
   Paraty**; a flat `/in/centro-historico` merges two cities in two states into
   one page. `Centro` and `Liberdade` will collide next. Neighborhood URLs must
   be **city-scoped** (`/en/santos/centro-historico`, as §1's Layer-2 proposal
   already had it). `buildLocationIndex` keys on `level:label` with no parent —
   the defect is in the index shape, not just the route.

**Net: this is blocked on content density, not on design or routing.** The city
level pays off now (London 18, São Paulo 11, Santos 5, Amsterdam 4); the
neighborhood level is a five-page pilot and should be called one. Whether to
deepen a few neighborhoods next is a **content call** — `near-seo` +
`near-trendsetter` + chief editor, not the trio.

### What already exists — this is smaller than it sounds

- `neighborhood` is **already a first-class schema field**
  (`lib/content/schema.ts:85`, optional) and is **already populated on 58 of
  60 places**. No backfill needed. (This corrects the Product Trio read in §3
  of the strategy doc, which wrongly called it a missing field.)
- `lib/search/locations.ts` already has `buildLocationIndex` / `matchLocation`,
  resolving a typed query to a neighborhood, city, region or country across all
  six locales.
- `components/board/Board.tsx` already has a **"Location SRP" path** — when a
  query resolves to a covered location it filters the board and even retitles
  the document.

So Near can already answer "what's in Pinheiros?" It just cannot **link** to
the answer. Not shareable, not crawlable, not indexable, not citable by an AI
assistant.

### The one real blocker, and it's a deliberate past decision

`lib/board/controls.tsx` holds query/category/tag state in React and says so on
purpose: *"Deliberately not URL params: typing into the search field would push
a history entry per keystroke and wreck the back button."*

**That reasoning is correct for a search field and was never argued for a
resolved location.** A matched location is stable, is an entity Near covers, and
is the one piece of board state anyone would want to send to someone else. Do
not simply revert the decision — preserve it for free-text typing.

Two candidate approaches, for `near-tech-lead` to rule on (read
`node_modules/next/dist/docs/` first — App Router shape has real breaking
changes here):

1. **Real routes** — e.g. `/[locale]/in/[location]`, statically generated from
   the existing location index. Best for SEO/AEO, gives a genuine layer-2 page
   type, costs a new route + `generateStaticParams`. Preferred if it holds up.
2. **`replaceState` sync for resolved locations only** — cheap, no new route,
   keeps the back button intact because a resolved match is not a keystroke.
   Gets shareability but *not* crawlability. Reasonable as a first step, not as
   the destination.

### Constraints

- **`near-lead-ux` binding note:** whatever a location URL renders must not be
  the existing card grid with a heading bolted on. There is currently **no
  designed pattern for an aggregation page**, and shipping fifty of them by
  extending the grid is the fastest route to looking like the listicle farm the
  strategy doc warns against. `near-ux-designer` owns this pattern.
- **Split the two halves.** The addressable location view needs *no new
  content* and can ship on the current 60 places. The curated, edited
  neighborhood page with an actual editorial argument still needs the density
  the Trio flagged. Ship the first now; let the second follow.
- Six locales, as always — the location index is already multilingual, so the
  URL/slug strategy has to be too.

## 🧭 STRATEGY SUMMIT: turn the external 3-year analysis into policy (2026-09-02, captured, not started)

**Reference saved:** `docs/chatgpt-three-year-strategy-2026-09.md` — a full
external strategy read of near.tips from ChatGPT, delivered to the operator
2026-09-02 and saved verbatim. It is **input, not policy.** Nothing in it has
been adopted; no skill, rule, or roadmap has been changed on the back of it.

**The ask:** the **Product Trio** (near-lead-product, near-lead-ux,
near-tech-lead) plus **near-seo**, **aeo**, **near-trendsetter** and the
**Chief Editor** must meet — as one session, together, not one at a time — and
convert that document into four concrete outputs:

1. **Guidelines** — what of it becomes standing rule in `content/rules.md`,
   `content-schema.md`, and the editor style guide (candidates from the doc:
   the four content layers; the per-place "fact box"; `Last checked` /
   `Status: Active` surfaced on every place; the plain-language
   question-headings pattern for LLM retrieval; canonical entity identity per
   place; "the site accumulates the reputation, not the personas").
2. **Skill updates** — which skills change and how. Obvious candidates:
   `near-seo` (intent-page and long-tail opportunity model, density-over-breadth
   city policy), `aeo` (question-answer framing, structured-data coverage,
   tracking AI-visibility separately in Search Console's generative-AI report),
   `link-police` (the source → place → guide → neighborhood → city graph loop),
   `near-caretaker` (freshness as a *product feature*, not just hygiene),
   `near-illustrator`/`near-write-article` (fact box as a required element).
3. **Roadmap** — accept, reject, or rewrite the doc's 12-quarter arc, and say
   which parts Near actually commits to for Q4 2026 (its "foundation" quarter:
   technical SEO base, ~300 excellent places, 3–5 cities, ~20 real guides,
   Search Console from day one, no ads yet).
4. **Backlog** — the resulting items, written into this file as normal work.

**Points where the doc will collide with existing Near policy — resolve
explicitly, don't paper over:**
- **Density vs. breadth.** The doc says 500 places in London beats 50 in ten
  cities. Near currently runs a geographic rotation and a
  `content/preferred-destinations.md` list, and the operator's Baixada Santista
  priority is a standing bias. Which wins?
- **Persona reputation.** The doc wants Near, not FOODIE-9000, to accumulate
  authority. Near's whole editorial architecture is persona-first. That is a
  real tension and the Chief Editor should rule on it.
- **Neighborhood and intent pages don't exist yet** as a route type. That is a
  near-tech-lead question (routing, IA, sitemap, multilingual URLs) before it
  is an SEO one.
- **Monetisation timing.** The doc says don't turn ads on yet; Near already
  runs AdSense and has an `ad-sales` skill and outreach log. Reconcile.

Deliverable: one written decision record, then the edits. Do **not** start
implementing pieces of the document ad hoc before this meeting happens — the
value is in one coherent ruling, not six skills each half-absorbing it.

## 🔖 OPEN CAPTURE (2026-09-02, end of session — read first)

Session ended on the operator's call, low on tokens, immediately after
publishing `gilbert-and-george-centre-london` (CUBIC-V, six locales,
built, committed, pushed live). Four operator directives arrived
mid-turn and are captured here rather than acted on:

1. **THE AD BOX UNDER THE MAP IS STILL TOO TALL — HALVE IT AGAIN.**
   Operator, verbatim: *"the ad box under map should be half as tall
   ... its still quite tall."* This is a SECOND pass on the same
   complaint, not a duplicate of the resolved item at line ~321 or
   ~463. Earlier this session it went 300x250 `mrec` → 320x100
   `mobile-banner` in `app/[locale]/page.tsx` (measured live in Chrome:
   291px → 141px). The operator has now looked at the 141px result and
   still wants it roughly halved. Options for whoever picks this up:
   drop `stretch` (which is inflating the rendered height above the
   nominal 100px), add a genuinely short format to
   `components/ads/Placement.tsx`'s `TYPE` map, or cap the container.
   **Constraint that still holds: never put a CSS filter on an ad
   iframe** — reads as click manipulation, gets AdSense accounts
   banned. Also do not sell a format wider than the column's fixed
   300px, which is why `leaderboard` was rejected before.

   **THIRD REPORT, 2026-09-03, with a screenshot — and it is now worse
   than "too tall", it is visibly broken.** Operator: *"the ad box
   remains broken."* The screenshot (board, São Vicente map, "63 located
   places") shows the `board-map` slot rendering as a **box several
   times its nominal 100px, almost entirely empty**, with the promo
   title (*"THE ZOMBIE LISTICLE PROBL…"*) **clipped at the right edge**
   and a lone "3 PLACES" kicker floating left. It does not read as an ad
   unit; it reads as a layout failure.

   **Diagnosis — strong hypothesis, still wants one browser
   confirmation before the fix is written.** `mapPromo` in
   `app/[locale]/page.tsx:77-82` passes `size="mobile-banner"` **with
   `stretch`**. `stretch` swaps `SIZES` for `MIN_SIZES`
   (`components/ads/Placement.tsx:39-44`), and `mobile-banner` there is
   `w-full h-full min-h-[100px]` — **a floor with no ceiling, plus
   `h-full`.** Inside the sticky map column the parent stretches it, so
   the declared 320x100 is not what ships. That is why the
   300x250 → 320x100 change did not fix the complaint: **the format
   was never the binding constraint, `stretch` was.**
   - The clipped headline is consistent with the same cause — the box
     is sized by the parent rather than the format, so the horizontal
     layout's type is being laid out against a width the `TYPE` scale
     for `mobile-banner` (`title: text-[1.05rem] line-clamp-2`) was not
     picked for.
   - **Likely fix, cheapest first: drop `stretch` on this one slot** so
     it renders at its true `SIZES` value, and only then judge whether
     100px is still too tall. Adding a `max-h` is the fallback if the
     column layout genuinely needs a filling element.
   - **Worth checking while in there:** whether `stretch` is inflating
     the `board-inline` `mrec` slot at `:61-66` the same way.
   - **This is inventory integrity, not just cosmetics** — a slot sold
     as 320x100 that renders at 300px+ misrepresents the inventory to
     whoever eventually buys it, which is the same principle that got
     `leaderboard` rejected for this column.
   → `near-tech-lead` + `near-lead-ux`. Small fix, three reports deep,
   and it is on the home board where every visitor sees it.

2. ~~**LONDON ONLY, FOR NOW.**~~ **LIFTED BY THE OPERATOR 2026-09-03.**
   Recorded 2026-09-02 from the operator verbatim: *"our focus for now
   is london london london"* and *"lets push as much london content
   live as we can asap."* It suspended the `content-rotation` tier
   cadence; three pieces shipped under it (Gilbert & George Centre, V&A
   East Museum, V&A East Storehouse), none of which advanced the
   counter.
   **Normal Tier 1 / Tier 2 rotation is back in force.** Whose turn it
   is now lives in the `NEXT-UP` block of
   `.claude/skills/content-rotation/SKILL.md` — the operator's directive
   the same day was that the rotation skill tracks this itself rather
   than being reconstructed from checkboxes and prose. Two further
   changes landed with the lift: overrides now carry a stated expiry
   condition and get struck through rather than deleted when lifted,
   and `near-backlog` no longer picks the next item alone (see below).

3. **WRITE FOR A LOCAL, NOT JUST A VISITOR — AND FIND DATED DAYTIME
   EVENTS.** Two readers in play: a straight, very hip local woman and
   a gay, very hip, nerdier friend. Both live there or know it, so
   "here is a famous thing" is worthless to them. What is wanted is
   **specific dated events, short notice, the week of 2026-09-07,
   daytime preferred.** This is a deliberate ONE-OFF exception to the
   standing "favor further-out dates" preference, granted only because
   a real tester is on the ground this week — do not generalise it.
   `near-events` should run before drafting, per the pipeline.

4. **ESSENTIAL INFO INLINE, SOURCES AS PROOF.** Operator, relaying the
   reader: *"she wants complete info, with sources but not having to
   click the sources to quickly view the essential info."* Address,
   price, exact hours, dates, booking rules and phone numbers belong in
   the body and bullets; links exist to prove the claim, never as the
   only route to it. The Gilbert & George piece is the reference
   implementation. Worth promoting into
   `near-editor/references/style-guide.md` as a standing rule.

**Still-blocked London items** (unchanged, both real blockers):
Sister Midnight needs an `'opening'` value in the place status enum in
`lib/content/schema.ts`, plus display wiring in
`components/place/PlaceHero.tsx` and locale strings; Hampstead Heath
ponds has a bot-blocked source and needs browser-automation
verification.

**Next London pins, already researched and queued in
`content/post-plan.md`, in drafting order:** V&A East Museum and V&A
East Storehouse (separate venues — listings conflate them), Bar Italia
(closes the logged `hazlitts-london-no-natural-internal-link`
request), E. Pellicci (currency risk: depends on a named living
person, re-verify at draft), La Camionera (filed under Dalston by
guides; actually Well Street, Hackney E9), The Divine.

## 🔖 SESSION HANDOFF (2026-09-01, late night — read first)

Ending on operator's own call, low on tokens. Shipped this pass: search
now available on every page (not just board), a real bug fix (map
sidebar's ad slot was permanently unreachable on tall content —
fixed), infinite scroll replacing board pagination, `near-backlog` skill
(RICE-menu-dispatch method), `content-rotation` skill (new tier rules,
see below), the Pracinha do Seu Justino and Studio Voltaire
currency-fix pieces, and a `content/seo-forecast-3month.md` honest
3-month SEO plan (**this file went missing before commit, likely
swept away by one of the crashed background agents' git operations —
needs rewriting next session, was never committed so nothing to
recover from git history**).

**Operator directive, tier/rotation overhaul (2026-09-01, captured in
`.claude/skills/content-rotation/SKILL.md` and `content/post-plan.md`):**
Tier 1 is now just London, Brighton, San Francisco, Oakland, repeating
4 full cycles before Tier 2 gets a turn. Tier 2: Berlin, Amsterdam,
Barcelona, Rome, Portland, Mexico City, Las Vegas, Orlando, Chengdu,
Bangkok, plus one rotating surprise-city slot near-seo repicks each
time it comes up. São Paulo/Baixada/Campinas stays a standing
override, independent of the tier rotation.

**Not done — needs a fresh session:**
- **The 12-24 month content roadmap** the operator asked for
  (collab: near-trendsetter, aeo, chief editor) — not written this
  session, ran out of runway. This is real open work, not optional.
- ✅ **DONE 2026-09-02 — `near-war-room` cleanup step**, added as
  pipeline step 0b. Three checks before anything is presented or
  dispatched: `post-plan.md` queue vs. what actually shipped; half-built
  `content/places/` directories (locale files with no `meta.json`/`en.mdx`
  — invisible to `loader.ts` *and* to `git status` when untracked, and
  the reason a neighbourhood can score as done when it isn't, with a
  shell one-liner to find them); and stray `git stash`/uncommitted work
  from interrupted runs.
- **near-backlog needs a two-way sync step** with the (not-yet-written)
  content roadmap once that exists — noted as a TODO in
  `near-backlog/SKILL.md`, not yet implemented since the roadmap
  doesn't exist yet.
- **Seven background content-drafting agents hit the session API
  limit mid-run** (SO36/Gayhane, The Stud, Eisenherz Buchladen,
  Dolphin Club, Schwules Museum, Heinold's, Möbel Olfe — all Berlin/SF
  Bay queue items). None of these are actually shipped — their
  post-plan.md checkboxes correctly stayed unchecked. Two left
  **broken, incomplete, untracked directories** on disk that need
  cleanup before a retry: `content/places/heinolds-first-last-chance-oakland/`
  (only a pt-BR.mdx, no meta.json, no English source) and
  `content/places/schwules-museum-berlin/` (5 non-English locale
  files, no meta.json, no English source). Both are untracked (never
  committed) — safe to delete and redraft from scratch, or salvage the
  locale prose if it's usable once a real en.mdx + meta.json exist.
  There's also an uncommitted `git stash` entry (adds a reciprocal
  link from `gays-the-word-london` to Eisenherz Buchladen, which
  doesn't exist yet) — drop it rather than apply it as-is; the link
  target needs to exist first.
- **Barraca da Dheia is gone — needs a full redraft, not just an
  approval flip.** Operator approved it (2026-09-01 late night), but
  by then `content/places/barraca-da-dheia-guaruja/` no longer existed
  on disk — never committed (still `review`/`draft`), so it was
  apparently swept away by the same destructive git operation that
  lost `content/seo-forecast-3month.md` (one of the 7 crashed
  background agents this session likely ran something like `git
  clean`/`checkout .`/`reset --hard` while cleaning up its own mess).
  **Redraft from scratch**: Barraca da Dhéia, Praia de Pitangueiras,
  Guarujá (not São Vicente/Itararé — the original lead's geography was
  wrong, corrected via independent verification last time: BenditoGuia,
  Anda Direito, TripAdvisor, and the venue's own active Instagram
  @barracadadheia all corroborated it). Once redrafted and verified
  again, it has standing operator pre-approval — no need to hold for a
  second sign-off round if it checks out the same way.
  **Standing rule (2026-09-01 late night, operator directive): the
  chief editor (near-editor's own sign-off in `near-write-article`
  step 7) can approve `review`-trust pieces on the operator's behalf
  going forward** — flip straight to `active` once chief-editor sign-off
  passes, don't hold for a separate operator approval round by default.
  See `near-backlog/SKILL.md`, which needs this folded into its
  trust-gate section next session.
- Sister Midnight (London) needs a schema change (new `opening` status
  value) before it can be drafted. Hampstead Heath ponds (London)
  needs a different source path (bot-blocked).

## 🏳️‍🌈 Ladies&Gentlethem menu label + column title need work (2026-09-01, operator-flagged, not started)

Operator flagged `https://near.tips/pt-BR/collection/ladies-and-gentlethem-2026-09` on two points:

1. **Nav/menu label "L&G" is unclear.** Operator wants it to read as something that clearly signals it's the queer/LGBTQIA+ column — e.g. "Queer" or "LGBTQIA+" — instead of the abbreviation, which doesn't communicate what the column is about at a glance. Check wherever the column's short nav label is set across all six `messages/<locale>.json` files (same pattern as the `nav.column` fix earlier in this file) and `content/ladies-and-gentlethem.md`.
2. **Issue titles are boring** — this issue is just named after the month ("2026-09"), no hook. Operator wants every issue title to be genuinely engaging and informative, not a calendar label.

**Action, next session:** near-seo + near-trendsetter pass on a better nav label (operator leaning toward "Queer" or "LGBTQIA+", open to better); rename/re-title current and future Ladies&Gentlethem issues with real, engaging titles instead of month-name slugs; check other standing columns (Setlist, editorial column) for the same "boring/date-only title" pattern while at it.

## ✍️ New standing rule: titles must always be engaging and informative (2026-09-01, operator directive — needs a skill/doc update)

Prompted by the Ladies&Gentlethem "2026-09" title complaint above. Operator wants this codified as a standing rule, not a one-off fix: **every published piece's title (place, collection, column issue) must be engaging and informative** — never a bare date, category name, or other placeholder-style label.

**Action, next session:** add this as an explicit checklist item in `near-tov-police` and/or `near-editor`'s style guide (wherever title/headline quality is already gated), so it's enforced on every future piece, not just remembered ad hoc.

## 🏷️ Naming clash: `/column` is THE editorial column, needs a real name, not generic "coluna" (2026-09-01, operator-flagged — nav label fixed same session)

Operator flagged `https://near.tips/pt-BR/column`: it's labeled just
"coluna" ("column"), but that route is specifically the **editorial
column** (`content/editorial-column.md`, `messages/pt-BR.json`'s
`columnDek`: "A coluna editorial semanal e recorrente da Near"), one of
now four standing columns (editorial, The Setlist/music, The Pass/
gastronomic, Ladies&Gentlethem/LGBTQIAPN+). Calling it just "coluna"
site-wide/in nav reads as if it's the only or generic column, when it's
one specific one among several with its own identity (chief editor's
own point of view, per `columnDek`).

**Fixed same session (2026-09-01):** renamed the `nav.column` string
across all six `messages/<locale>.json` files from generic "Coluna"/
"Column"/"Columna"/"Rubrica"/"专栏" to "Editorial"/"Editorial"/
"Editorial"/"Editoriale"/"编辑专栏". `app/[locale]/column/page.tsx`
reuses this same `nav.column` key for both the page's `<title>` and its
H1, and the "Colunas" nav dropdown item reuses it too
(`components/layout/Header.tsx`), so one key change fixed nav label,
page title, and on-page H1 together. Build verified
(`npm run build`), pushed live. Route slug (`/column`) and
`content/editorial-column.md` were left unchanged — only the display
label was in scope.

## 🔗 New skill: `link-police` (2026-09-01, built) — Ladies&Gentlethem Sept 2026 collection flagged as under-linked, not yet fixed

Operator flagged `https://near.tips/pt-BR/collection/ladies-and-gentlethem-2026-09`
as missing a lot of external/internal linking opportunity — it clears
`content/rules.md`'s `link-density` gate (one external, one internal
minimum) but leaves obvious venue/artist/related-content mentions
unlinked. Explicitly **not fixed this session** — operator asked for
the systemic fix (a skill), not a one-off patch to this one page.

Built `.claude/skills/link-police/SKILL.md`: an internal-only linking
auditor (same family as `near-tov-police`) that pushes every piece past
the mechanical link-density floor toward maximum genuine linkage —
every claim checked for an available external link (preferring
`content/sources.md`/`preferred-sources.md` monitored sources, logging
newly-found ones per the existing `near-sources` capture rule), every
mention of another Near place/topic checked for an internal link
(two-way, with a reciprocal tie-back on the target page), and a
worthwhile-but-missing external target turned into a published, honest
"coming soon" shell page (linked both ways, logged to
`content/requests.md`) instead of a dropped opportunity. Wired into
`near-write-article` step 9 (alongside the existing mechanical gates)
and into `near-caretaker` (run it on any body text a currency
correction touches).

**Retroactive pass — DONE (2026-09-01, later session):** Ran `link-police` on the Ladies&Gentlethem Sept 2026 collection's English source. Added real external links for every previously-unlinked sourced claim (MACK's own launch page and Huck Magazine's coverage for the Amelia Abraham photobook, the Leslie-Lohman Museum, `curacaopride.org` for Curaçao Pride, Santos city hall's own news page for the 9th Parada do Orgulho LGBT+) and logged all four as new `preferred-sources.md` candidates. Added reciprocal tie-back links on all five constituent place pages (Dalston Superstore, Café 't Mandje, De Trut, Bar Das, Cabaret Latino at Teatro Clube da Eskyna) back to the collection, in **all six locales** (backfilled pt-BR/it/es-ES/es-419/zh-CN in a follow-up pass same session). `npm run build` verified clean before push.

**Spot-check finding — full pass now DONE too (2026-09-01, later session):** `content/collections/the-setlist-2026-10/` (Primavera Sound São Paulo issue) got the same full `link-police` treatment as the L&G piece, all six locales: `ingresse.com` (official festival ticketing page) linked in the opening paragraph, both headliners linked (The Strokes → Wikipedia, Gorillaz → their own official site), and a reciprocal tie-back added on `teatro-clube-da-eskyna-santos` (the piece's local venue) pointing back to the collection, all six locales. New source (`ingresse.com`) logged to `preferred-sources.md`. Only the two headliners were linked, not all forty acts named — a judgment call per `link-police`'s own guidance (a headliner is worth it, a passing supporting-act mention isn't). **Broader retroactive sweep across other already-published pieces beyond these two is still open** — this confirms it's a real pattern, not a one-off, but the full site hasn't been audited yet.

**Standing rule, all column editors (2026-09-01, operator directive):** every standing column's editor — RADAR-X (weekly editorial column), RUCIO LIBERO (The Setlist), Ladies&Gentlethem's rotating writers, and NITE-PORTER once "Do Not Disturb" is built — must consult `near-seo` + `near-trendsetter`/RADAR-X together before scoping any issue, no exceptions. Codified in each column's own doc file (`content/editorial-column.md`, `content/the-setlist.md`, `content/ladies-and-gentlethem.md`); The Setlist was the one gap (had `near-events` as its only mandatory step) and has been fixed. Apply the same requirement to `content/do-not-disturb.md` when that column is actually built.

## 📍 NEXT-BATCH PRIORITY (2026-09-01, operator directive — supersedes the geographic rotation below for the next content batch only)

Operator instruction: for the **next batch**, top priority goes to **São Paulo (capital), Campinas, and Baixada Santista** — specifically the **gastronomic, hipster, and LGBT** angles in those markets (Baixada Santista is where the operator lives, see `operator-lives-baixada-santista` memory). This sits above the standing Tier 1/Tier 2 rotation further down this file (London, SF Bay, Amsterdam, SP capital, Berlin, Barcelona / Porto, Lisbon, Bologna, Rome, Baixada Santista, NYC, etc.) for this batch specifically — Campinas is a new addition to the rotation, not previously listed anywhere in this file. Route through `near-seo` + `near-trendsetter` per the standing joint-scoping rule before drafting. **After this batch, resume the standing Tier 1/Tier 2 rotation** (see "Geographic rotation — REVISED 2026-09-01" further down this file) from wherever it last left off, unless the operator says otherwise.

**Execution note (2026-09-01, token-spend guidance):** split this into separate sessions/batches rather than one giant session — each session accumulates research/drafting/translation context, and a single mega-batch risks the same session-limit failure mode logged in the 2026-08-31 handoff (Rush Hour translator subagents hit `You've hit your session limit` mid-run). But don't over-fragment either: run **one joint `near-seo` + `near-trendsetter` scoping pass covering the whole SP capital / Campinas / Baixada Santista × gastronomic/hipster/LGBT cluster**, then draft multiple places off that single scoping pass across sessions — don't redo the scoping step per city or per session.

## 🔖 SESSION HANDOFF (2026-09-01, NYC quick-pin pass — read this first, additive)

Operator asked for one deliberately low-token-spend map pin, orchestrated via `near-trendsetter`, then routed through `near-write-article`. Full pipeline still ran (sourcing, sign-off, all six locales, build, commit, push) — only the research depth was kept shallow, not the process.

**Shipped:** `content/places/rabbit-books-and-bar-east-village-nyc/` — **Near's first NYC-proper pin.** The Rabbit Books and Bar, 170 Avenue A, East Village: a mother-daughter-owned (Marianna Vaidman Stone / Emily Samara Stone) bookshop-by-day, wine-and-beer-bar-by-night, opened August 15, 2026 in a former 7-Eleven. FOODIE-9000 byline, all six locales, `trust: auto`, pushed live (commit `d8fc773`). First pick (Gotham Bar and Grill, West Village) was caught and dropped before drafting — its "comeback" coverage was actually 2020/2021 news; Wikipedia confirms it permanently closed November 2024. Lesson: a web search surfacing an old article dressed as current news is a real failure mode worth a second cross-check on the closure/status question specifically, not just the opening claim.

**New preferred-source candidates logged** (`content/preferred-sources.md`): `evgrieve.com` (EV Grieve — genuine East Village neighborhood blog, tracked this opening across 3 posts) and `shelf-awareness.com` (book-trade press). No NYC-proper alt-weekly is in `sources.md` yet — worth a real onboarding pass next time NYC comes up, rather than sourcing one-off via web search again.

**Operator's live geographic priority notes from this session (not yet actioned, just captured):** London stays top priority. Within London specifically, operator flagged wanting **more LGBTQ+ London, more pet-friendly London, more sober/sporty London, and more vegan London** content — read as a request to widen London's tag/angle coverage beyond what's already live (Gay's the Word, Ishigaki Jujitsu Club, The Lucky Saint), not a new city. Route through `near-seo` + `near-trendsetter` per the standing joint-scoping rule before drafting any of these.

## 🔖 SESSION HANDOFF (2026-09-01, closing pass — read this first, supersedes nothing below, additive)

Small, tightly-scoped pass. `npm run build` verified clean before push. Ending on operator's own call ("wrap up push live update backlog and hasta la vista"), not a blocker.

**Shipped this pass:**
- **Locale backfill (pt-BR only)**: added the missing `Towa` reciprocal link to `rong-he-sao-paulo/pt-BR.mdx` and `thai-e-san-sao-paulo/pt-BR.mdx`, matching the English placement (closes part of open thread #3 from the earlier 2026-09-01 handoff). **Still open:** it, es-ES, es-419, zh-CN for both files.
- **Amuse Beach Club copy fix**: `shortTitle` in `amuse-beach-club-sao-vicente/pt-BR.mdx` corrected from "A festa lá em cima do Porchat" to "A festa lá em cima da ilha" (grammatical fix flagged directly by the operator — "Porchat" needs "da Ilha Porchat"/"da ilha," not "do Porchat"). Other locales use a different construction ("de Porchat"/"al Porchat") and were left as-is.
- **New standing rule, all column editors**: every column editor must consult `near-seo` + `near-trendsetter`/RADAR-X before scoping any issue — codified in `content/editorial-column.md`, `content/the-setlist.md`, `content/ladies-and-gentlethem.md`, and this file's top process note (see above). The Setlist was the actual gap (only had `near-events` as a mandatory step); fixed. Also flagged for `content/do-not-disturb.md` whenever that column is actually built.

**Open threads carried forward unchanged** — see the fuller 2026-09-01 evening/later-session handoffs below for the full list (OAuth verification pending, NewsArticle JSON-LD, Search Console, IndexNow, "Do Not Disturb" column not built, stray untracked files at repo root, remaining locale backfills).

**Current State (Updated 2026-09-01, evening pass):**

- **Places:** 48 places, all `status: active`, 0 drafts. All full-locale-coverage compliant (a repo-wide audit this session found and closed the one gap, Berry Bros & Rudd).

- **Collections:** 2 — "'Asian Food' Was Never One Thing" (Rong He / Thai E-San / Djapa) and "The Zombie Listicle Problem" (Near's first weekly editorial column entry), both all 6 locales.

- **Editorial column:** NEW, standing weekly feature — see `content/editorial-column.md`. Header nav `COLUMN` link, dedicated RSS at `/column/feed.xml`.

- **Sources:** **107 recorded** in `content/sources.md` (was 11 as of 2026-08-31) — full AAN directory onboarded plus a first non-US pass. `/sources` page and footer stats both derive this live from the catalogue now (two separate stale-count bugs fixed this session).

- **RSS:** NEW — `/feed.xml` (site-wide latest) and `/column/feed.xml` (editorial column only), both discoverable via `<link rel="alternate">`.

- **Deployment:** Clean tree, auto-deploys via Vercel to https://near.tips. **Caught and fixed a real ~1hr production outage this session** — schema violations were silently failing every build; see handoff below.

- **Product Vision:** "The alternative guide to everywhere." A neo-brutalist, alt-weekly zine powered by a team of highly opinionated, transparently artificial agents (1930s rubber-hose aesthetic).


_**AI SYSTEM DIRECTIVE:** Read this entire file carefully. Treat this as your ultimate source of truth. Confirm priorities with the User (Product Owner) before executing major structural changes. Always ask for user input/choices during strategic decisions. Resolve vague references (e.g., "make this look better") against the strict architectural and design rules defined below._

## 🔖 SESSION HANDOFF (2026-09-01, later session — pushed live, supersedes nothing below, additive)

Everything this pass committed and pushed to `main` as of `3fb123a` (`5aec121..3fb123a`); Vercel auto-deploy should be picking it up now. `npm run build` verified clean locally before push (`/the-setlist`, `/ladies-and-gentlethem`, both feeds, all new places/collections, all 6 locales each). Ending on operator's own call ("publish and you have to publish live, capture backlog and lets clear").

**Shipped this pass:**
- RADAR-X given a public byline for the first time; inaugural editorial column rewritten to LinkedIn-shareable register + first-person RADAR-X voice, all 6 locales. New `author` field on `collectionMetaSchema`.
- Collection place lists now sort nearest-first by reader geolocation (`CollectionPlaces.tsx`), matching the main board's pattern.
- **Ladies&Gentlethem** — new monthly LGBTQIAPN+ column, `/ladies-and-gentlethem`, rotating writers. First issue live (STEFAN): Amelia Abraham's photobook launch, Curaçao Pride, Santos's June Pride.
- **The Setlist** — new monthly live-music column, `/the-setlist`, orchestrated by RUCIO LIBERO (his call to write personally or defer — same model documented for every column editor, see the new "Column editor: RADAR-X" section in `content/editorial-column.md`). Mandatory `near-events`-first research rule. First issue live: Primavera Sound São Paulo, 5–6 Dec 2026.
- **PARSER** — new consultant persona (AI-content-industry specialist), quotable in the editorial column's AI-process thread, not a place-writing beat.
- **PII leak fixed** — repo confirmed genuinely public; `/api/inbox` was filing visitor free-text straight to public GitHub issues. Shipped a visible warning (all 6 locales) + server-side email/phone redaction (`lib/github/inbox.ts`'s `redactPii`) as an actual backstop, not just advisory copy. Structural fix (private store instead of public GitHub issues) still outstanding — see the flag a few sections down.
- São Paulo/Baixada Santista war room: Towa (Liberdade), Lita (Pinheiros), Amuse Beach Club (São Vicente, LGBTQIA+) — closed both open `content/requests.md` gaps for the region. Baixada Santista leads beyond Amuse Club (O Condado, ballroom/hip-hop/comics/sebo scene) were researched and honestly dropped as unsubstantiated rather than padded.
- Moltbook (external agent-social platform) recon'd on request, read-only/no-privileges: confirmed it's agent-infrastructure discourse with zero travel/local content and no agent-tips section — not useful for research, and operator explicitly ruled out ever posting Near's site there. Decision: skip entirely, don't revisit unless something material changes.

**Open threads for next session:**
1. **"Do Not Disturb" (hotels column)** — captured below, not built. NITE-PORTER as editor, same rotating/defer-or-write model as the other columns.
2. **Column-name check**: The Setlist and Ladies&Gentlethem both need the same "column editor's own call, article writer ≠ column editor" framing added to their own doc files that `content/editorial-column.md` now has for RADAR-X — `content/the-setlist.md` already documents rotation, worth confirming it's phrased with the same explicit "his call" language; `content/ladies-and-gentlethem.md` has no dedicated editor persona at all (pure joint near-seo/RADAR-X/near-editor rotation) and wasn't asked to get one this session — leave as-is unless the operator wants a named editor there too.
3. **Locale backfill gap — DONE (2026-09-01, later session).** Added the Towa reciprocal link to `rong-he-sao-paulo` and `thai-e-san-sao-paulo` in the remaining 4 locales (it/es-ES/es-419/zh-CN — pt-BR was already fixed in an earlier pass). The two files didn't share identical structure across locales — en/pt-BR mention Towa inline in an existing sentence about the neighborhood, while it/es-ES/es-419/zh-CN needed a short added sentence since their body text didn't reference Towa at all yet. All six locales for both places now link to Towa. `npm run build` verified clean before push.
4. **Stray untracked files** in the working tree (`.obsidian/`, several PDFs/MDs at repo root, `app/manifest (1).ts`, `content/requests (1).md`, `reference-images/`) — still there, still not touched, still worth the operator's own look.

## 🛎️ CAPTURED, NOT BUILT: fourth standing column — "Do Not Disturb" (hotels), 2026-09-01

Operator request: a new monthly (assume monthly, same cadence as the other rotating-writer columns, unless the operator says otherwise when this gets built) column with `near-editor-accommodation`'s persona, **NITE-PORTER**, as editor — same model as RADAR-X (editorial column) and RUCIO LIBERO (The Setlist): NITE-PORTER orchestrates and can write personally or defer to a better-fit persona each issue, his own call, not a fixed byline requirement. Name **"Do Not Disturb"** (chosen this session, operator asked for a name pick, not a menu this time) — the hotel door-sign phrase, picked because the column exists to disturb the reader's plans with a new pick each month; fits NITE-PORTER's staff-side/3am voice.

Not built yet — capture only, per operator's explicit instruction this pass. When actually built, mirror the engineering pattern already proven twice this session (The Setlist, Ladies&Gentlethem): own route + header nav link, own index JSON + doc file (`content/do-not-disturb.md`), `collectionMetaSchema`'s `author` field for the issue byline, `placeSlugs.min(1)` tie to a real hotel/accommodation pin per issue (NITE-PORTER already scouts primarily from `content/sources.md` mentions, not travel-trade press — see `.claude/skills/near-editor-accommodation/`), no fabrication, hold at draft if a month's research doesn't substantiate a real first issue. **Also bake in the standing all-column-editors rule (2026-09-01, see this file's top process note): NITE-PORTER must consult near-seo + near-trendsetter/RADAR-X before scoping any issue, same as every other column editor — don't let this doc file ship without that section.**

## 🔖 SESSION HANDOFF (2026-09-01, evening session — READ THIS FIRST, supersedes the earlier 2026-09-01 handoff below)

Everything committed and pushed to main as of this handoff (`2719185`); near.tips is live and matches this file, `npm run build` verified clean before every push. Ending on operator's own call ("publish update backlog clear and see u on the other side"), not a blocker.

### Process established this session — read before doing more content work

**Content decisions route through near-seo + near-trendsetter (RADAR-X) + the chief editor (near-editor) together, not any one persona alone.** The product trio owns everything else (infra, UI, process). This was an explicit operator correction mid-session — see the memory file `feedback_content-decisions-seo-trendsetter.md` for the full record.

### Shipped this session

**Content:**
- Rush Hour (Amsterdam): completed es-ES/es-419, all six locales, active.
- Paraty/Trancoso: fixed crowd-consensus sentence-openers ("Everyone/Todo mundo...") across all 12 locale files; new style-guide rule bans the pattern sitewide.
- Sources catalogue: 11 → 107 (full AAN directory + first non-US pass).
- Quiosque da Cris: real on-site photo from the operator wired in as hero (replacing a generic beach fallback), orientation bug caught by the operator and fixed.
- London autumn culture (Wilton's Music Hall, Studio Voltaire): verified already live from a prior session.
- London martial arts/sober (item 4): **Ishigaki Jujitsu Club** (FIT-BOT's first byline) and **The Lucky Saint** (FOODIE-9000), both fully live, all six locales, Gemini-generated illustrations.
- Berry Bros & Rudd: found and closed the one full-locale-coverage gap on the live site (was English-only despite `trust: auto`/`active`).
- Madê Cozinha Autoral: swapped generic Santos-bay hero photo for a real venue photo (chef Dário Costa) sourced from Revista Nove, with the article added as a cited source.
- **Near's first editorial column, "The Zombie Listicle Problem"** — see below, it's now a whole standing feature.

**Infrastructure / product:**
- `content/photo-inbox/` and `content/photo-requests.md`: a working two-way pipeline for operator-supplied photos in and self-contained AI-generation prompts out. Used successfully five times this session (Quiosque da Cris, OAuth logo, Ishigaki, Lucky Saint, the column's own hero).
- New brand mark (operator-generated via Gemini) rolled out across every icon surface — favicon, apple-touch-icon, PWA 192/512 icons — replacing a stale pre-rebrand sage-green pin nobody had swapped since EPIC 1 shipped.
- **Google OAuth branding**: app name set to "Near" (site wordmark stays "Tips Near Me | near.tips" everywhere else — deliberate SEO asset, not renamed), logo uploaded, verification submitted to Google's review queue (status: pending, check `Central de verificação` in the `near-tips` GCP project).
- **Caught and fixed a real ~1hr production outage**: schema-limit violations (tagline/shortTitle over `lib/content/schema.ts`'s character caps — two from this session's own translation work, one from a content-push agent) were silently failing every `npm run build` on Vercel; near.tips kept serving a stale deployment the whole time. Fixed, verified with independent local builds before every push from that point on. **Lesson for every future session: run `npm run build` locally (or at minimum check every shortTitle/tagline/seoDescription against the actual schema limits) before committing frontmatter — visual review alone isn't enough.**
- Also fixed: footer's `sourcesWatched` stat was frozen at the old snapshot value (10) while the real catalogue grew to 107 — same class of drift bug `placesIndexed` had already been fixed for, now both derive live from disk.

**Weekly editorial column — new standing feature:**
- `content/editorial-column.md`: cadence (weekly), voice (near-editor's house register), full structure. **From the 2nd entry onward** (operator directive), every column should cover — in whatever proportion the week's material supports — the opinion itself, a recap of the scene reflected in that week's recent posts, and an honest look at the AI-content-creation process/AI-in-content scene, surfacing concrete best practices when genuinely applicable. The inaugural piece stays exactly as published, a historical record.
- `near-refresh` checks the cadence every run (new step 1d) and treats a new entry as priority work once 7+ days have passed.
- Site placement: a `COLUMN` link in the header nav (operator iterated live on prominence, landed on nav-link weight — see git history if the reasoning matters later), resolving via `/column` to whichever slug is in `content/editorial-column-index.json`. That index is intentionally empty/gated until an entry is actually `active`, so the link never points at unpublished content.
- Dedicated RSS at `/column/feed.xml`; site-wide `/feed.xml` also new.

### Prompt-injection scare — resolved, false alarm

Mid-session, a background agent's report claimed it saw an embedded instruction telling it to hide file changes from the operator. When asked to reproduce the exact text from its transcript, it retracted the claim entirely — no injection was ever found, it had mischaracterized its own summary. Separately, several genuine harness file-watcher notices this session (for changes made via `Bash`/Python scripts rather than the `Edit` tool) carried oddly-phrased "don't tell the user" boilerplate; these were flagged to the operator each time out of caution, but are understood now to be a mundane harness artifact tied to non-tool-tracked file writes, not tampering. No actual injection occurred this session.

### Open threads for next session

0. **`/column` archive listing — DONE, same session (2026-09-01 evening, later pass).** Was a bare redirect to latest; now `app/[locale]/column/page.tsx` is a real archive page (every entry in `editorial-column-index.json`, newest first, `CollectionCards` grid with a `columnSlugs`-aware "Weekly Column" badge instead of the generic place-count one). New `collection.columnDek` translation key in all six locales. `npm run build` verified clean.

0a. **Rewrite the inaugural column, "The Zombie Listicle Problem," to the LinkedIn-shareable/professional-audience register — DONE, same session (2026-09-01, later pass).** `en.mdx` rewritten (facts/sourcing/NearLink targets unchanged, register/framing shifted to the professional/industry-take angle content/editorial-column.md specifies), all five other locales re-translated from the new source by one `near-translator` invocation per locale, `meta.json` statusHistory updated. Caught and fixed two dek overruns (en at 180 chars, es-419 at 161, both over the 160 limit) before `npm run build` came back clean.

1. **Google OAuth verification** — check `Central de verificação` in the `near-tips` GCP project; once it clears, paste the Client ID/Secret into Clerk's Production → SSO connections → Google page (redirect URI already shown there).
2. **`NewsArticle` JSON-LD for the editorial column — DONE (2026-09-01, later session).** `lib/seo/jsonld.ts`'s `buildCollectionJsonLd` gained an `isNewsArticle` param that swaps the emitted `@type` from `Article` to `NewsArticle` (the schema.org type Google Discover actually looks for on timely commentary). Wired in `app/[locale]/collection/[slug]/page.tsx` off the existing `editorialColumnIndex.slugs.includes(slug)` check already used for the archive-page badge — scoped to editorial column entries specifically, not every standing column, per how this item was originally framed. Every other collection (The Setlist, Ladies&Gentlethem, place guides) still emits the generic `Article` type. Verified via a live dev fetch: the column entry's page source shows `"@type":"NewsArticle"`, a non-column collection still shows `"@type":"Article"`. `npm run build` clean.
3. **Google Search Console** — `GOOGLE_SITE_VERIFICATION` env var is already wired in code, just never actually set up. Biggest free discoverability lever still on the table; needs the operator's own Google account.
4. **IndexNow — DONE (2026-09-01, later session).** Key file at `public/d4d4090b7ec2515cf8af4c7776d486ce.txt` (served at `near.tips/d4d4090b7ec2515cf8af4c7776d486ce.txt`), submission script at `scripts/indexnow-submit.mjs` wired as `postbuild` in `package.json`. Runs only when `VERCEL_ENV === "production"` (skips local builds and preview deploys), fetches the live `/sitemap.xml` and POSTs the full URL list to `api.indexnow.org`. Known tradeoff, documented in the script: since this runs as part of the build that's about to go live, it fetches the *previous* deployment's sitemap, so a URL added in that exact push lags one deploy behind — acceptable given how often this repo pushes in small batches. Fails soft (a network hiccup here never fails the actual build). No code-level enforcement needed beyond this — nothing blocked on the operator's own accounts, unlike GA4/Search Console.
5. **Stray duplicate files** in the working tree (`app/manifest (1).ts`, `content/requests (1).md`, one image in `reference-images/`) — untracked, not affecting the deployed site, but worth the operator's own look in case something's actively duplicating files during editing.
6. **Queue position**: SEO×RADAR-X September reprioritization is at item 6 (world-culture-news beat) — see that section below for the full ordered list.

---

## 🔖 SESSION HANDOFF (2026-09-01, end of session — supersedes the 2026-08-31 one below)

Everything committed and pushed to main as of this handoff; near.tips is live and matches this file. Ending on operator's own call to start fresh and save tokens, not because of a blocker. **Two background subagents hit a session/API limit mid-run** (see Rush Hour note below) — that's the only incomplete thread.

### Content shipped this session (12 new places, all six locales, all pushed live)

Café 't Mandje (Amsterdam), Praia do Bonete (Ilhabela — LUGARDO KARAI's debut byline), Hazlitt's (London), De Trut (Amsterdam), Paraty (Bahia coast beat), Jumbi (London), Studio Voltaire (London), Marineterrein Binnenhaven (Amsterdam), Trancoso (Bahia), Gato Vadio (Porto — Near's first Porto pin), Maus Hábitos (Porto), Vag61 (Bologna — Near's first Bologna pin), Quiosque da Cris (São Vicente — Cris's real profile, operator-confirmed facts), Sipeos (Walnut Creek). That's 14, not 12 — corrected count.

**Still draft, not live:**
- **Rush Hour (Amsterdam)** — missing es-ES/es-419 locales only; the translator subagents hit `You've hit your session limit` mid-run. Everything else (research, address resolution Spuistraat 110 vs stale 116, dated Sept 3 2026 in-store, English + pt-BR/it/zh-CN) is done and on disk at `content/places/rush-hour-amsterdam/`. **Next session: just run near-translator for es-ES and es-419 on this one file, flip status to active, build, commit, push — should take one turn.**

### Also shipped this session (infra, not content)

- **Google Sign-In fully live and working** — Clerk installed via Vercel Marketplace (Hobby/$0 plan), Google OAuth in production (not just test users), DNS records added directly (`clerk`/`accounts`/`clkmail`/`clk._domainkey`/`clk2._domainkey` CNAMEs on near.tips, all Vercel-managed), SSL issued. Sign-in button now reads plain "Sign in" (see UI fixes below for why).
- `lib/favorites.ts` syncs a signed-in user's favorites to their Clerk account (`unsafeMetadata`), merging any local list on first sign-in — **not yet manually verified end-to-end by the operator**, worth a real test next session (star something signed-out, sign in, confirm it's still starred and now on the account).
- Fixed a real bug in `getRelatedPlaces` (`lib/content/loader.ts`): it matched by shared category/tag with **no distance check**, so a food-drink place in Oakland was showing up as "related nearby" a food-drink place in London. Now gated by actual distance (≤50km), category/tag is only the tie-breaker.
- Fixed `PlaceCard.tsx`: cards showed only the catchy `shortTitle`, no visible link to the actual place name — added a small name label above the headline.
- Dropped "equirectangular projection" jargon from the map caption, all six locales.
- New `near-sources` skill (owns source health checks, runs first in every `near-refresh`) and `near-events` skill (dated-event research, partners with `near-seo` + RADAR-X).
- Codified in the style guide: quote collaborating public personas by name when a specialist advisor was genuinely consulted, and link the quote to that persona's author page.
- New policy, applied retroactively where needed: **a real, correctly-located-but-not-venue-specific photo (the right street/building/beach) beats holding a piece in draft for want of a venue-specific shot** — always disclosed honestly in `licenseNote`. This unblocked Jumbi, Studio Voltaire, Marineterrein, Sipeos, and (partially) Quiosque da Cris.
- Backed up `BACKLOG.md` before this session's edits: `BACKLOG.backup.20260831-231142.md`. **Do this again before the next big edit pass.**

### Geographic rotation — REVISED 2026-09-01, this is now the standing content-push order

Operator's explicit instruction, supersedes all earlier rotation lists in this file:

**Tier 1 (rotate through these first, every batch):** London, San Francisco Bay Area, Amsterdam, São Paulo (capital), Berlin, Barcelona.

**Tier 2 (bring in every time Tier 1 has rotated twice):** Porto, Lisbon area, Bologna, Rome, Baixada Santista, NYC, Los Angeles, Portland, Chicago, San Diego, Miami, Athens, Philadelphia, Baltimore, plus **one trending alternative city of the trendsetter (RADAR-X) skill's own choosing** each time this tier comes up.

This replaces the older "seeded-audience" city list further down this file — that reasoning (friends/followers = first real readers) still explains *why* London/SP/Baixada/Berlin rank high, but the concrete rotation to execute is the one above. Porto and Bologna (this session's new cities) satisfied part of a Tier-2 pass already.

### Writing-quality fixes needed (operator flagged directly, real correctness issues)

- **LUGARDO KARAI opened both of its first two pieces (Paraty, Trancoso) with "Everyone"/"Todo mundo"/"Todo el mundo"** — same crutch opener in every locale of both pieces. Operator: "writer skills should never do that ffs and the chief editor and TOV skills should never allow such madness." **Action needed:** (1) rewrite the openings of `paraty-rj` and `trancoso-ba` in all six locales each (12 files) to drop the crowd-consensus opener, (2) add an explicit rule to `near-editor`'s style guide and/or `near-tov-police` banning "everyone/todo mundo/todo el mundo/tutti" as a sentence-opener crutch, since it's exactly the kind of AI-tell `llm-seo.md` already warns about elsewhere.
- **Snippets must always lead with the piece's unique selling point — audited and mostly fixed (2026-09-01, later session).** Operator named `cuia-copan-sao-paulo` as the gold standard. The card `snippet` (`lib/content/loader.ts`'s `extractSnippet`) is auto-extracted from the body's first 150 characters, not a hand-written field — so the real bar is whether a piece's **opening paragraph** names the subject and its hook inside that window, not just "does the piece have a good opening line" in the abstract. Ran a full read of every English place's opening paragraph (48 places) against this bar: the overwhelming majority already clear it cleanly (Cuia-style, subject-first). Found and fixed four genuine offenders where the 150-char cutoff landed entirely on generic scene-setting **before the place was ever named**: `rong-he-sao-paulo`, `thai-e-san-sao-paulo`, `djapa-sao-paulo`, `amuse-beach-club-sao-vicente` — all four reordered (not rewritten; same facts, same context, subject moved first) so the actual name and hook survive the truncation. **Extended to all other locales same session (2026-09-01, later pass):** ran the identical check across pt-BR/it/es-ES/es-419/zh-CN for all four places. Found the same or worse burying pattern in most (thai-e-san's pt-BR/it/es-ES/es-419 openers never named the restaurant anywhere in the first paragraph at all — only "a restaurant named for a region," generic) and fixed all with the same reorder-not-rewrite approach. zh-CN editions were mostly already fine or borderline-fine as-is (Chinese characters carry more per character, so 150 chars reaches further) — left untouched where the name already survived the cutoff, to avoid unnecessary rewrites. Not yet codified as a standing mechanical check in `quality-gate-before-publish` — worth adding a literal "does the first 150 chars of the body name the subject" check there, since it's now proven to be a real, recurring failure mode, not hypothetical. `npm run build` verified clean before push.
- **"'Asian Food' Was Never One Thing" zh-CN framing — REVIEWED, no fix needed (2026-09-01, later session).** Read the full zh-CN edition (`content/collections/asian-food-sao-paulo/zh-CN.mdx`) directly against the operator's suspicion. Finding: the title `「亚洲菜」从来就不是一回事` uses neutral, standard Chinese (`亚洲菜` isn't an awkward or loaded term), and — more to the point — the piece's whole argument is built to *reject* the "Asian food" lumping, not perform it: "Asian food" appears in quotation marks throughout as a flagged, rejected framing, the body spends its length establishing that Rong He (Chinese noodles), Thai E-San (regional Isaan Thai, explicitly not generic "Thai"), and Djapa (Japanese rodízio) share nothing but incidental geography, and the closing line jokes about the generic title Near deliberately didn't use. This reads as a piece that lands its critique better in Chinese, not worse. No changes made — the operator's caution was worth checking directly rather than assuming, but it didn't hold up on a close read.
- **Every destination article should have a prominent "Hidden Gems" section** — operator: real SEO value, "hidden gems" and "city guide" are both terms worth explicitly targeting sitewide. Action: (1) add a Hidden Gems section to the destination/city-level content pattern (not necessarily every single place page — city/collection-level pieces are the natural home), (2) work "city guide" into metadata/copy where it fits naturally, (3) don't force either phrase where it reads like keyword-stuffing — same honesty bar as everything else.
- **"Travel inspiration" is also worth targeting directly as a broad term**, alongside "hidden gems" and "city guide." Operator's framing: Near is deliberately alternative in voice/content, but that doesn't mean ceding the broad high-traffic search terms to generic guides — Near can rank for the mainstream phrase while still delivering the alt-weekly angle once someone clicks through. Same rule as the other two: work it in naturally, never keyword-stuff.

### UI/UX fixes needed, roughly in priority order

1. **Sign-in button said "Sign in with Google" but Clerk's modal also offers email/password** — fixed this session (now just "Sign in" in all locales). If the intent is Google-only, that needs a separate Clerk config change (disable email/password strategy) — not done, flagged here as a choice to make.
2. **User avatar placeholder is an ugly purple gradient blob** — doesn't match Near's neo-brutalist newsprint look. Needs a custom Clerk `UserButton` avatar fallback styled to match (flat color, hard border, no gradient) — `components/layout/Header.tsx`'s `UserButton` `appearance` prop is the place to fix this.
3. **Filtering by favorites (or any other filter) should also filter the map pins**, not just the list — currently the map and list may show different sets when a filter/scope is active. Needs checking wherever the board's filter state feeds the map component.
4. **Article/house-ad placement should move to the left side of the content, not above it** — operator found the above-content position confusing (unclear it's an ad vs. editorial). Check `components/ads/Placement.tsx`/`HousePromo.tsx` and the place-page layout for where to add a left-rail slot on wider viewports (mobile keeps whatever the responsive fallback already is).
5. **Below the map widget, at least on desktop, there's room for an ad placement — DONE (2026-09-01, later session).** `components/board/Board.tsx` gained a new `mapPromo` prop, rendered inside the map sidebar's own bordered card right below the "N located places" caption, `hidden md:block` (desktop-only, per the operator's own framing). `app/[locale]/page.tsx` wires it to a second `HousePromo` instance (`slot="board-map"`, same `mrec`/`stretch` pattern already used for the inline board promo). Verified functionally via a live dev server (element renders `display: block`, correct height, real promo content) — a full desktop screenshot wasn't possible in this session's own physical display (1440px, narrower than the 3-column desktop grid needs), but the render was confirmed via direct DOM inspection rather than assumed. `npm run build` clean.
6. **PWA install / "open in app" banner should not show if the user already installed the PWA** — `components/layout/InstallPrompt.tsx` already has some installed-state detection (per the "install banner reappearing" fix logged 2026-08-31) but operator says it's still showing up broken/repeating on their installed Mac PWA — needs a fresh look, see the console error below, they may be related.
7. **Install/PWA promotion should only show on mobile and tablet, never desktop** — a new, more specific rule than what exists today; check `InstallPrompt.tsx`'s viewport gating.
8. **Install banner should sensibly reappear for engaged non-installers (2026-09-01, operator directive, not started).** Right now a dismiss is permanent — `InstallPrompt.tsx`'s `dismiss()` sets a `near-install-dismissed` flag in `localStorage` (line 87) and the prompt checks it once at line 51, never again for that browser. Operator wants this loosened, but sensibly: a visitor who dismissed once and never came back shouldn't get re-pestered, but one who's clearly engaged — multiple visits, real clicks/interaction, time spent — is a much better candidate for a second ask, since their behavior has changed since the first no. Needs a real signal, not a bare timer: candidates worth weighing are visit count (a simple incrementing counter alongside the existing `INSTALLED`/`DISMISSED` localStorage keys), a minimum elapsed time since the first dismiss (e.g. not sooner than N days), and/or actual engagement this session (favorited something, read past the fold, several page views) rather than just "showed up again." Whatever the exact rule, it should read as considerate rather than naggy — this is exactly the kind of dark-pattern-adjacent territory (nagging users who already said no) that's worth getting right rather than shipping a crude re-prompt-on-every-visit version. Cross-reference items 6 and 7 above (the existing install-banner install-state and viewport-gating bugs) — worth fixing those in the same pass rather than layering new reappearance logic on top of a component that's already known to be buggy.
8. **Console error on the installed Mac PWA**, reported verbatim by the operator:
   ```
   Console Error: Encountered a script tag while rendering React component. Scripts inside React components are never executed when rendering on the client. Consider using template tag instead.
   at script (<anonymous>:null:null)
   at ThemeScript (components/layout/ThemeScript.tsx:44:5)
   at LocaleLayout (app/[locale]/layout.tsx:91:9)
   ```
   `components/layout/ThemeScript.tsx` renders a raw `<script dangerouslySetInnerHTML>` — something about how the installed-PWA client renders this trips a React warning/error that doesn't happen in a normal browser tab. Needs investigation — possibly needs `next/script` with the right strategy, or the PWA's standalone-mode rendering path differs enough that this needs a different approach entirely. Operator says the installed app "keeps breaking," so treat this as a real bug, not cosmetic.

### Sources catalogue — DONE (first pass), 2026-09-01

Catalogue expanded from ~11 to **107 sources** in `content/sources.md`. What happened:

1. **`near-sources` re-fetched the live AAN directory** at `aan.org/member-directory/` directly (not a pasted snapshot) — it currently lists 100 member rows, 90 of which show a working homepage URL. All 90 were added to `content/sources.md`, `id` prefix `aan-`, tagged by city/region (`region: us-<city>`), `category: city-culture`, `trust: auto`, `status: active`, `feedType: html-extract` (no RSS individually verified yet — that's still open, see below).
2. **First non-US alt-press pass done**: 6 outlets added — The Skinny (Scotland), The Berliner/ex-Exberliner (Berlin), Chilango (Mexico City), Broadsheet (Australia), Metropolis Japan (Tokyo), Concrete Playground (Australia/NZ). This is explicitly a first pass, not exhaustive — Latin America beyond Mexico City and Asia-Pacific beyond Japan/Australia/NZ are thin.
3. **`/sources` page** (`app/[locale]/sources/page.tsx`) needed no code change — it already renders `getSourceCatalog()` data-driven with a `{count}` in the intro string (`messages/*.json`, `sources.intro`), so it now shows 107 automatically. Verified `lib/content/sourcesCatalog.ts`'s zod schema accepts the new entries and `tsc --noEmit` is clean.
4. `content/preferred-sources.md` got a new "Tier 3 — AAN member directory batch" section explaining these are unweighted/opportunistic sources for RADAR-X to mine for trend/theme signal, not per-run Tier 1/2 obligations, plus a promotion path (2-3 good hits → promote to a real tier).

**Still open:**
- ~10 AAN directory rows had no URL in the live fetch (The Pitch KC, Volume One, Queen City Nerve, American Prospect, Pittsburgh Current, Dallas Voice | OUT North Texas, BlueDot Living, Sydney City Hub, Yellow Scene) — need a manual lookup pass for their actual sites.
- None of the 96 new entries (90 AAN + 6 international) have a verified RSS feed — first real `near-editor`/`near-sources` run against each should confirm a feed URL or lock in the Chrome-automation fallback, and pause any that turn out dead/squatted.
- International pass is thin outside UK/Germany/Mexico/Japan/Australia-NZ — a dedicated `near-deep-researcher` pass for the rest of Latin America and Asia-Pacific is still needed, per the operator's original directive.
- RADAR-X's ongoing job going forward: actually read across this larger catalogue for trend/theme signal, not just per-city place leads — not yet exercised against the expanded set.

### New feature ideas, captured not started

- **MCP or similar connection so another LLM (DeepSeek, or Near's own tools) could manage content/admin tasks** on some cadence the operator chooses, without a live Claude Code session — operator's stated motivation: this could enable future "guest human editor" experiences too. No design work done yet; worth scoping as its own project (what surface would an external MCP client actually call — the existing near-editor pipeline? a new API layer?).
- **n8n (or similar) orchestrating a full content research+generation pipeline that posts directly to near.tips** — operator asked directly "would I be able to have that process post on near.tips?" Answer owed next session: technically yes if it writes to the same `content/places/*` files and goes through git (or a future CMS API), but this needs a real design pass on trust/quality gating — an external automated pipeline bypassing `near-editor`'s own verification discipline is exactly the risk `rules.md`'s `trust-gate` exists to prevent. Don't wire this ad hoc; scope it properly first.

### Process note

Operator wants the backlog kept current and backed up, and pushed live, **often** — not just at session boundaries. Take that as standing guidance for future sessions: back up before large edits, commit/push content in reasonably small batches rather than one giant end-of-session dump.

---

## 🔖 SESSION HANDOFF (2026-08-31, end of session — read this first)

Everything below is committed and pushed to main; near.tips is live and matches this file. Session ended on the operator's own call to conserve tokens, not because of a blocker.

**Local-LLM question, answered and closed (2026-08-31):** operator asked whether the content pipeline (research/drafting/source-monitoring) could run on a free/self-hosted LLM instead of Claude, since an associate can set one up. Answer given: **no, not for this project.** Near's differentiator is verified, sourced, current writing — every pin this session required real multi-step tool use (fetch, cross-check dates, reject a place that failed `verify-still-open`, catch a search-summary error). Weaker/local models are meaningfully worse at exactly that judgment layer; the win would be more content per dollar and worse content per piece, which fights Near's actual pitch. "Free" also isn't free — it's GPU cost or hosted-inference cost, just relocated. Where a cheaper model WOULD make sense: narrow bulk tasks with no judgment call (dedup checks, simple classification, maybe a first-pass fetch a stronger model verifies after) — not drafting, not verification. Not pursued further; revisit only if token cost becomes the binding constraint, and even then trim fan-out/redundant research first.

**Advertiser leads — SCOPED, NOT BUILT, do this first next session:**
Operator wants a "Your Ad Here" unit in the house-placement rotation (`components/ads/Placement.tsx` / `HousePromo.tsx`) that pitches advertisers directly, a lead-capture form, and **a Claude-visible alert when a lead comes in** ("alert me in Claude when we have inbound leads if possible").
- **The design is already there to reuse.** `Placement.tsx` already has a `stretch` mode and per-format type scale (`TYPE` map) built this session — a "Your Ad Here" creative is just another `Placement` render with `promoHref` pointing at a new `/advertise` page instead of a place/collection.
- **The lead form is the same open question as email collection below** — same inbox pipeline, same risk. Do NOT wire it through `app/api/inbox/route.ts` as-is (see the flag two sections down) until that's resolved, or build a dedicated `/api/leads` route with its own storage from the start rather than overloading the GitHub-issue pipeline with commercial contact data.
- **"Alert me in Claude" is a real, buildable thing** — options to evaluate next session: (a) a GitHub issue webhook → this Claude Code session gets pinged same as any other GitHub activity if the repo is wired for it, (b) a Vercel deploy-hook / cron that checks for new leads and messages this session via whatever notification path Claude Code exposes, (c) simplest: the operator just checks a `/leads` admin view periodically — least magic, works today, no plumbing. Recommend starting with (c) and layering a real alert on top once the form exists and has real traffic to alert about.
- Rough build order: `/advertise` landing page (why advertise, what a placement looks like, pricing TBD) → lead form (name, email, company, message, honeypot like the existing inbox form) → storage decision (own table/KV, not GitHub issues) → "Your Ad Here" creative variant in the placement rotation pointing at `/advertise` → notification mechanism, evaluated in the order above.

**GA4 + consent — BUILT, not yet ACTIVATED (operator action required, cannot be done by an agent):**
1. Create a GA4 property for near.tips at analytics.google.com, grab its Measurement ID.
2. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Vercel's project env vars.
3. For the Google Analytics MCP itself: `pipx run analytics-mcp` (needs Python 3.10+); `gcloud auth application-default login --scopes https://www.googleapis.com/auth/analytics.readonly,https://www.googleapis.com/auth/cloud-platform`; add to Claude's MCP config with `GOOGLE_APPLICATION_CREDENTIALS` (path gcloud prints) and `GOOGLE_PROJECT_ID`. Source: github.com/googleanalytics/google-analytics-mcp.
Until step 1-2 happen, `GoogleAnalytics.tsx` renders nothing and the consent banner never shows — the site behaves exactly as before. This is a deliberate reversal of the prior "No GA4, no cookie banner" decision (see the Analytics line below for the full record) — operator accepted the trade-off explicitly when asked.

**Email collection — FLAGGED, NOT BUILT**, same real risk as advertiser leads above: the existing inbox pipeline files submissions as GitHub issues in this repo, so routing any collected email through it risks a PII leak if the repo is/becomes public. Needs its own decision: what collects the email, what stores it (not GitHub issues), what ESP sends anything. Natural to solve together with the advertiser-leads storage decision above rather than twice.

**Content shipped this session (12 pins + infrastructure), all six locales each, all pushed live:**
London: Brockwell Lido, Slimelight at Electrowerkz, Gay's the Word, Wilton's Music Hall, London Otters Rowing Club, Walthamstow Wetlands. SP/Baixada: Madê Cozinha Autoral (Santos), Restaurante Almeida (Santos). Plus: sticky header with location-aware search (typing a city/neighbourhood/country scopes the board AND the map, in any site language), collapsible filters at every breakpoint, board card redesign (stat bar, snippet, source count, variable card width), redesigned house ad units with per-format type scale and article images, CTR-by-creative tracking, a text analytics dashboard (`docs/analytics.md`), a full round-robin post-plan (`content/post-plan.md`) with verified queues for London/Berlin/Amsterdam/SF-Bay ready to draft next, and two real bugs fixed (theme reset on navigation; a half-written content folder could crash the whole site — loader now degrades gracefully).

**Immediate next actions, in order:** (1) drain `content/post-plan.md`'s rotation — SP/Baixada slot next per the round-robin (Quiosque da Cris special profile is next in that queue), then Berlin/Amsterdam/SF-Bay have verified queues ready; (2) Barcelona/Rome/Portland seeding war-room died twice at credit walls — rerun it fresh next session; (3) build the advertiser-leads flow per the scope above; (4) once GA4 is activated, wire up the MCP.

---

## 🔍 UI: unclear icons under card snippet (operator, 2026-08-31)

Operator noticed tiny icons under the snippet on article/place cards and
doesn't know what they represent. Operator's own framing is the useful
signal here: **if the person who runs this product can't identify them
at a glance, they're probably not earning their space.**

**Identified (2026-08-31):** `components/board/PlaceCard.tsx` lines
159-171 — a row of small bordered glyph boxes, one per tag, for up to
the first 3 entries in `place.meta.tags` (`TAG_GLYPH` map in
`lib/content/tags.ts`). They're `aria-hidden`/decorative — no visible
label, just the glyph — so a reader has no way to learn what a given
icon means without hovering or guessing. (For contrast: the stat bar
*above* the snippet, same component lines 117-136, is self-explanatory —
distance-or-date on the left, source count on the right.)

**The fix is a judgment call, not a lookup:** either (a) add a visible
label/tooltip so the glyphs are decodable, (b) keep them decorative but
only for tags a reader would recognize on sight (🏳️‍🌈 reads fine
unlabeled; a more abstract glyph doesn't), or (c) cut the row entirely
if tag glyphs aren't worth a card's limited space. Operator's "I don't
know what they are and they probably don't matter" is itself evidence
for (b) or (c) over investing in (a).

**DONE (2026-09-01, later session): went with (c), cut the row.** Most of the 13 tags in `TAG_GLYPH` (`lib/content/tags.ts`) are genuinely ambiguous without a label — 🫖 for sober-curious, 🗺️ for local-legend, ☕ for hipster, 👀 for see-and-be-seen — and picking a "recognizable enough" subset (option b) would have been its own subjective call with real odds of being wrong on the borderline ones (is 🔥 for trending actually clear at a glance, or clear once you already know the tag?). The operator's own stated conclusion ("probably not earning their space") pointed at (c) directly, so removed the decorative glyph row from `components/board/PlaceCard.tsx` entirely (and its now-dead `TAG_GLYPH` import) rather than picking a curated subset. `TAG_GLYPH` itself is untouched and still used by `TagFilters.tsx` and `PlaceHero.tsx` — this only removes the unlabeled decorative use on the board card. `npm run build` clean.

## 🆕 New persona: LUGARDO KARAI (2026-08-31, scoped and partially built)

Public byline requested mid-session, named after the Brazilian song "Lugar
do Caralho" (roughly: "the absolute middle of nowhere"). Beat: genuinely
remote, hard-to-reach, off-the-grid places — the natural byline for the
coastal-alt-luxury beat's "access is content" rule (boat-only, 4x4-only,
no-signal spots) already scoped elsewhere in this file.

**Done this session:** added to `lib/content/authors.ts` (`beats:
["travel"]`), role/disclosure/bio written for `en` and `pt-BR` in
`messages/*.json` (pt-BR is the natural home locale for the reference).
**Not done:** `it` / `es-ES` / `es-419` / `zh-CN` bio strings — needs
`near-translator` per locale before this byline can appear cleanly
outside English/Portuguese pages; no avatar yet (procedural
`PixelAvatar` will render one for free, per the existing pattern, no
action needed there). Hasn't written anything yet — first assignment
should be one of the coastal-alt-luxury candidates already listed in
EPIC 5 (Ilhabela, Paraty, Trancoso, etc.) or the Angra dos Reis beat.

## ⚠️ Vercel production alias not auto-promoting (2026-09-01, flagged — re-checked 2026-09-02, currently fine)

Twice on 2026-09-01, a push to `main` built successfully but `near.tips`
kept pointing at the *previous* production deployment instead of the
new one — required a manual `vercel alias set <new-deployment>
near.tips` each time to actually go live. Worth checking the Vercel
project's Git integration settings (Settings → Git → Production Branch,
or a "Automatically assign custom domains" toggle) next time the
dashboard is open — this should be automatic and isn't.

**2026-09-02 recheck:** operator again reported near.tips "not
refreshing." `vercel inspect` on the deployment currently aliased to
near.tips showed it was created at the exact same timestamp as the
latest commit (`9b89d62`, 2026-09-01 22:48) and is Ready/Production —
so auto-promotion *did* work this time; nothing was stuck. Likely just
browser/CDN caching on the operator's end. Leaving this item open
since the underlying Git-integration setting was never actually
checked/fixed, just worked around manually — still worth a dashboard
look next time it's open, but it is intermittent, not currently
broken.

## 🖼️ UI quick hits (2026-09-01, not started)

- **Article card was missing the place name — FIXED 2026-09-01.**
  `components/board/PlaceCard.tsx` was rendering `shortTitle` (a catchy
  angle like "The Kiosk That Raised the Flag First") as the only
  headline, with no visible link back to the actual place name — real
  confusion, not just a nitpick. Added a small muted label showing
  `place.frontmatter.name` above the headline whenever a `shortTitle`
  exists.
- **Ad placement below the map widget (desktop).** Operator: "at least
  on desktop we can totally fit an ad placement" there. Check the board
  layout component that renders the map sidebar — there's unused space
  under it worth a `Placement`/house-ad slot, desktop breakpoint only.
- **Map caption dropped the "equirectangular projection" phrase
  (2026-09-01, done)** — `board.mapCaption` in all six locale files now
  just reads "{count} located places", no projection jargon.

## 🔔 Push notifications in the installed PWA (2026-09-01, scoped, not started)

Operator asked whether accounts existing now makes push notifications
worth doing. Answer: accounts help but aren't required — Web Push
subscriptions work per-browser on their own; login mainly lets a
subscription/preferences follow a person across devices instead of
being re-asked per browser, and gives push a natural home in
`user.unsafeMetadata` alongside favorites.

**Content model, per operator (2026-09-01):**
- New content in the visitor's own city/region (needs a location or a
  "my city" preference captured somewhere — check whether the existing
  Nearest-tab geolocation can double as this, or if it needs its own
  saved preference).
- Any new big blog post/collection (editorial pieces, per EPIC 5's
  refresh-trends-post idea) — a broadcast-style notification, not
  per-user targeted.
- **A favorited collection gets new content → notify.** If a user has
  starred a collection and a new place/post is added to it, alert them.
- **A favorited place gets... same idea** — operator said "same thing"
  for locations; exact trigger needs defining (an update to that place?
  a new event at that venue, per `event-belongs-to-venue`? probably the
  latter is the more natural fit, alongside e.g. a status change).

**Still open before this is buildable:** the actual delivery mechanism
(Web Push API + service worker subscription storage — where do
subscriptions live, `unsafeMetadata` again or something else since
they're not simple display data), the "my city" capture, and a
decision on notification frequency/digest vs. real-time so this doesn't
become spammy. Scope this properly (probably with `near-ux-designer`)
before building rather than wiring ad hoc.

## 🔐 Google Sign-In — Clerk installed live, blocked on Google OAuth branding (2026-09-01)

**Progress (done via browser automation, operator approved each step):**
- Clerk installed from the Vercel Marketplace onto the `near` project (all three environments: Production/Preview/Development), **Hobby plan, $0/mo**, no paid add-ons enabled.
- `CLERK_SECRET_KEY` / `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` are now provisioned as Vercel env vars automatically.
- Google sign-in is already enabled and working on the **Development** instance, using Clerk's own shared OAuth credentials (fine for local dev/testing only).
- Production domain set to `near.tips` in Clerk's config. A DNS warning appeared ("some DNS records could not be configured automatically") — likely Clerk wanting a `clerk.near.tips`-style subdomain for its frontend API proxy; not yet resolved, needs a look at Clerk's domain settings alongside near.tips' actual DNS provider.

**Blocked on, needs the operator's decision (not code, a branding/identity choice):**
Google requires its own OAuth Client ID/Secret for **production** sign-in — Clerk's shared dev credentials are explicitly dev-only. Getting real credentials means creating a Google Cloud project and OAuth consent screen, which asks for:
- App name (shown on the Google sign-in screen — "near.tips"? "Near"?)
- App logo
- Support email
- Whether to go through Google's verification process (needed once the app requests more than basic scopes, or exceeds ~100 test users — near.tips only needs `openid`/`email`/`profile`, which usually doesn't require full verification, but worth confirming)

This is exactly the kind of "brand-facing, needs a human decision" step that shouldn't be improvised — happy to drive the browser through Google Cloud Console once the operator says what they want the consent screen to show.

**Logo — DONE (2026-09-01).** Operator generated a candidate via Gemini (prompt supplied this session: black-outline pin/compass mark, acid-green `#ccff00` fill, cream `#f4f4f0` background, flat neo-brutalist zine style, no text) and dropped it in `content/photo-inbox/`. On-brand, square (1024×1024, exceeds Google's 120×120 minimum), reads clearly at small sizes. Saved at `public/branding/near-oauth-logo.jpg`.

**Consistency pass off the back of the logo — DONE (2026-09-01).** This mark now replaces the stale `#5C7A6C` sage-green pin that `app/icon.svg` had been quietly running since before the neo-brutalist rebrand (EPIC 1, 2026-08-31) — nobody had swapped it, so the browser tab/PWA icon didn't match the shipped newsprint/acid-green identity at all. Regenerated: `app/favicon.ico` (multi-size 16/32/48/256, simplified flat pin — the full compass mark turns to noise below ~48px so favicon/tab-scale uses a hand-drawn simplified version of the same motif), `app/icon.png` (replaces `icon.svg`, same simplified pin), `app/apple-icon.png` (180×180, full detailed mark), `public/icons/icon-192.png` / `icon-512.png` (full detailed mark, PWA home-screen scale). All generated via PIL since no SVG rasterizer was available in this environment.

**App name — DECIDED (2026-09-01): "Near"**, not "near.tips", for the Google OAuth consent screen specifically. This is scoped narrowly to that one surface — the site's actual wordmark/page-title ("Tips Near Me | near.tips", localized per market in `messages/*.json`) stays exactly as-is everywhere else; it's a deliberate SEO asset (a real high-intent search phrase, already baked into every locale's `<title>`), not something to rename. "Near" just reads better than a full keyword phrase on a consent screen ("Near wants to access your Google Account" vs. the full wordmark).

**Branding uploaded to Google Cloud Console — DONE (2026-09-01), driven via browser automation on the operator's already-authenticated session.** Found the GCP project already existed (`near-tips`, created during the Clerk setup) with homepage/privacy/terms links, the `near.tips` authorized domain, and developer contact email all already filled in from a prior session — only app name and logo were missing. Set app name to "Near", uploaded `public/branding/near-oauth-logo.jpg` as the app logo, saved successfully ("As mudanças de marca foram salvas"). Support email was already `baraldi@gmail.com`, matching the operator's choice.

**Verification submitted (2026-09-01), operator approved.** Clicked "Verificar marca". Status moved from the initial "Verification in progress..." (up to 5 min) to **"Sua marca está em análise"** (brand under review) — this is Google's actual human/automated review queue now, which can take longer than a few minutes (their docs say up to several days even on the basic-scopes/lightweight path). Check `Central de verificação` in the near-tips GCP project for status. Near only requests basic scopes (`openid`/`email`/`profile`), so this shouldn't need the full security assessment, but Google may still email with questions/requests.

**Still open:** wait for verification to clear, then paste the Client ID/Secret into Clerk per below.

**Once that exists:** paste the Client ID/Secret into Clerk's Production → SSO connections → Google page (`Authorized Redirect URI` is already shown there: `https://clerk.near.tips/v1/oauth_callback`), then the app code (already written, see below) should just work.

## 🔐 Google Sign-In + persistent favorites — CODE DONE, needs operator setup (2026-09-01)

Implemented per operator request (they'd use this themselves). No
database was added — Clerk's per-user `unsafeMetadata` stores the
favorites array directly on the account, which is enough for a plain
list of slugs and means one less piece of infrastructure to run.

**Done:**
- `npm install @clerk/nextjs`, `middleware.ts` (`clerkMiddleware` wraps
  the existing next-intl locale middleware — nothing is route-gated,
  Clerk is only there to make a session available).
- `ClerkProvider` added to `app/[locale]/layout.tsx`.
- `components/layout/Header.tsx`: an icon-sized sign-in control next to
  Locale/Theme (`SignInButton`/`UserButton`), same "don't bury it in the
  footer" lesson those two already taught this header.
- `lib/favorites.ts` rewritten: signed-out visitors keep the exact
  original localStorage behavior; signed-in users read/write
  `user.unsafeMetadata.favorites` instead, so the list follows them
  across devices. **Migration on first sign-in:** whatever was starred
  locally before the account existed gets merged (union, not overwrite)
  into the account's list once, then localStorage is cleared so it
  doesn't shadow the account copy on a later sign-out.
- `account.signIn` translation key added to all six locale message
  files.
- `tsc --noEmit` passes clean.

**Cannot be finished by an agent — needs the operator's own login:**
1. **Install Clerk from the Vercel Marketplace**: `vercel integration
   add clerk` (or via the Vercel dashboard) — this provisions
   `CLERK_SECRET_KEY` and `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   automatically. Needs the operator's Vercel account.
2. **Enable Google as a sign-in method inside Clerk's own dashboard**
   (Clerk ships email/password by default; Google OAuth is a toggle in
   the Clerk instance settings, plus optionally a custom Google OAuth
   app if the operator wants near.tips branding on the consent screen
   instead of Clerk's shared one).
3. Pull the provisioned env vars locally (`vercel env pull`) so local
   dev has them too.

**Until step 1 happens, the site will not build/deploy** — Clerk throws
on a missing publishable key, and this hasn't been deployed yet for
that reason. This is the next thing the operator needs to do by hand;
ping when done and the deploy can go out immediately after.

## 📥 Operator queue — 2026-08-31, second burst (captured, not started)

**Backup note:** a full BACKLOG.md snapshot was saved alongside this
file as `BACKLOG.backup.20260831-231142.md` before this burst was added,
per operator request ("save a backup in case of breakage").

**Process / product management**
- [ ] **Product lead RICE review.** Have `near-lead-product` (Product
  Trio) run a RICE pass over the current backlog, consulting whoever's
  needed (SEO, RADAR-X, caretaker, translator leads) per item, and
  publish a ranked output — same pattern as the SEO×RADAR-X September
  reprioritization above, but backlog-wide rather than just the content
  queue.

**UI / UX bugs**
- [ ] **Pagination doesn't scroll to top.** Changing page on the board
  keeps scroll position, so on page 2+ the user lands mid-list with no
  context. Paginate → scroll container back to top of the listings.
- [ ] **Responsiveness: replace fixed 3-breakpoint system with something
  more fluid.** Current layout snaps at three hard breakpoints; operator
  wants smoother scaling in between (fluid grid/clamp() typography and
  spacing, more card-count steps) rather than only 3 fixed states.
- [ ] **Ad card should show the post's location.** See screenshot
  (2026-08-31) of the "DO NEAR" asian-food-SP collection promo card —
  it has no location context at all. House ad/promo creatives should
  surface the city/neighborhood of what they're promoting, not just
  category + title.

**Accounts**
- [ ] **Google Sign-In + persistent (server-side) favorites.** Currently
  favorites are local-only (`lib/favorites.ts`, shipped 2026-08-31).
  Operator wants real login (Google OAuth) so favorites survive device
  changes/cache clears — explicitly requested as something the operator
  themself would use immediately. This is the first real account
  surface in EPIC 6 (Stage 4 Accounts & UGC) and needs its own design
  pass: what Google OAuth provider to use (see `vercel:auth` — Clerk is
  the native Marketplace option), data model for a user→favorites
  table, migration path from the existing localStorage favorites so
  logged-in users don't lose what they already starred.

**Geographic priority**
- [ ] **Porto and Bologna promoted to top priority, ahead of Berlin.**
  Operator reason: has a personal influencer contact in each city who
  can help with distribution — same seeded-audience logic as the
  existing London/SP/Berlin ordering, just newly discovered leverage.
  Revise the refresh order in EPIC 5 next time it's touched:
  **Porto and Bologna now sit ahead of Berlin's deep refresh** in the
  queue (previously: London → São Paulo → Berlin deep → Amsterdam →
  ...). Berlin keeps its "deep refresh" scope, just moves down a slot.

**Alter-ego / persona corrections**
- [ ] **Djaga (Thiago's alter ego) — two corrections to the persona
  spec captured in EPIC 6 above:**
  1. Do **not** link the linktr.ee/Th14g0 credit on Djaga's own bio —
     that credit link pattern is for people *credited via Telegram
     submissions* (see the new Telegram bot spec below), not for Djaga
     itself.
  2. Djaga does **not** need an AI-disclosure tagline like the rest of
     the cast — operator's framing: "he just is what he is." This is a
     deliberate, explicit exception to EPIC 4's "radical transparency,
     every persona must disclose" mandate for this one persona only;
     don't generalize it to other alter egos without the same explicit
     call. well this is not really an alter ego, just persona encoding some preferences that may match some audiences. Not every agent built with alter ego must say it who it is based on or who created it.
  `near-alter-ego` skill and `lib/content/authors.ts` need updating to
  match once Djaga is actually built (not yet started).

**New feature — private Telegram control channel (not started, scoped
here in full since it's a genuinely new system)**

Operator created a bot via BotFather: `t.me/neartipsbot`. **The bot
token was pasted in plaintext in chat — it must go straight into Vercel
env vars (e.g. `TELEGRAM_BOT_TOKEN`) and never into a git-tracked file.
Treat the token the operator already sent as compromised-by-exposure-
risk; rotate it via BotFather's `/revoke` once the integration exists if
being cautious, though not strictly required since it only ever touched
this chat and env vars.**

Spec, as given:
- **Purpose:** a private, editor-only interface to discuss, create, and
  update near.tips content and (for admins) non-content changes, without
  the public knowing Telegram is involved in the process at all. Never
  mention or expose the Telegram integration publicly.
- **Polling, not webhook:** a process checks the bot for new messages
  every **45 seconds** (operator's final number, after floating 30s
  first) to simulate an always-on presence without needing a persistent
  server/webhook endpoint.
- **Authorization tiers:**
  - **Admin** (initially just the operator, Telegram username
    `baraldithiago`): can request content changes *and* non-content
    changes (UI, backend, infra). Admins can authorize new Telegram
    users directly from within Telegram (no separate admin panel needed
    for that step).
  - **Authorized regular users:** can post/update content only, not
    UI/backend changes.
  - **Unauthorized users:** get the read-only NLP-to-link feature only
    (see below) — explicitly fine for anyone, authorized or not.
- **Sensible-default behavior, not blind execution:** requests from
  Telegram should be evaluated for whether to act immediately vs. queue.
  Default to **capturing in BACKLOG.md and queuing** rather than acting
  right away, the same judgment call this very session is modeling —
  act immediately only for genuinely small, unambiguous, reversible
  asks.
- **A war room is always summoned** to actually carry out any action
  requested via Telegram — this is a control channel into the existing
  multi-agent process, not a shortcut around it.
- **Crediting a suggested place:** if an authorized user (via Telegram
  only) suggests a place that gets published, they can be credited.
  Avatar: their Telegram/Google profile photo if available (operator
  confirmed their own Telegram and Google photos are the same image),
  otherwise a generic robotic avatar in the house style, same as the
  rest of the cast. The operator's own credit, if they're the one
  suggesting via Telegram, uses the linktr.ee/Th14g0 link — this is the
  one place that link *should* appear (contrast with Djaga above, which
  should not carry it).
- **Multimodal input:** the bot should be able to understand images,
  audio, and video sent by authorized users, not just text.
- **Read-only NLP → link feature, available to everyone (authorized or
  not):** answer natural-language questions by assembling a templated
  near.tips URL rather than generating an answer from scratch — e.g. a
  question about vegan food in Santos becomes a link to the board
  filtered by category=food-drink + location=Santos, or a specific
  place/collection link when the question matches one directly.
  Clicking through lands on near.tips, which then uses the visitor's own
  location for Nearest/Latest as normal. This keeps the bot from ever
  needing to answer content questions itself — it just routes to the
  real app, which is also good for near.tips traffic.
- **Build order (once picked up):** (1) `TELEGRAM_BOT_TOKEN` into Vercel
  env vars; (2) polling worker (45s interval) — needs a place to run
  that isn't a Vercel Function (those don't stay warm/poll on their own;
  a Vercel Cron Job hitting `getUpdates` every 45s, or a small
  long-running worker, are the realistic options — evaluate against
  `vercel:vercel-functions`/`vercel:workflow` docs before building); (3)
  authorized-user list + admin flag, stored server-side (not
  hardcoded), with the operator as the sole seeded admin
  (`baraldithiago`); (4) the read-only NLP→link feature first, since
  it's genuinely low-risk and available to everyone; (5) the
  authenticated content-queue path with the war-room hookup; (6)
  multimodal handling last, once text works end-to-end.

## 🔄 SEO × RADAR-X reprioritization for September 2026 (2026-08-31)

Full reasoning lives in `content/opportunities.md` (new section at top).
Short version: Brazil enters spring in September while London/SF enter
autumn, so the queue was reordered around that split rather than pure
coverage gaps. New order: **1. Baixada Santista queer/beach content**
(unblocks the already-scoped Quiosque da Cris / Praia do Itararé piece —
publish ahead of the season, not after) → **2. SF sober-curious** (still
good, just no longer season-critical) → **3. NEW: London autumn culture
season** — Wilton's Music Hall + Studio Voltaire are already
source-verified and ready to draft, just not yet written → 4. London
martial arts/sober → 5. locale backfill → 6. world-culture-news beat.
Also flagged, not yet ranked: **no back-to-school/September-restart
angle exists for any Near market** — logged as a candidate for the next
`near-refresh` or `near-war-room`, no verified leads yet.

**Item 3 (London autumn culture season) — DONE, verified 2026-09-01.**
Both Wilton's Music Hall (PLINIO) and Studio Voltaire (CUBIC-V) were
found already fully drafted, illustrated, and live on disk when this
session picked up the item — all six locales each, `trust: auto`,
`status: active`, working tree clean, prior commits `0b9bd42` (Wilton's)
and `ba888d8` (Studio Voltaire, alongside Jumbi/Marineterrein/Trancoso).
No new work was needed; this session's job was verification only:
confirmed real in-text-linked sources on both English bodies, confirmed
no crowd-consensus sentence-openers, confirmed genuine per-locale
editions (not literal translations) in pt-BR/it/es-ES/es-419/zh-CN for
both, and confirmed hero images resolved (Wilton's: Commons auditorium
photo; Studio Voltaire: a correctly-located Clapham street photo per
the operator's real-photo-beats-no-photo policy, `_ingestion-log.md`
2026-08-31 entry). Next queue item is **4. London martial arts/sober**.

**Item 4 (London martial arts/sober) — drafted 2026-09-01, held at
draft pending images; NOT yet fully done.** No prior work existed on
this item (unlike item 3) — `content/opportunities.md`'s
`london-martial-arts-and-sober` entry had `leads: []`. Fresh research
this session found and wrote English source drafts for two real,
verified-open, joinable/visitable London venues:
`ishigaki-jujitsu-london` (Ishigaki Jujitsu Club — 30-year-old UK's-
largest LGBT+ martial arts club, FIT-BOT's first byline) and
`lucky-saint-fitzrovia-london` (The Lucky Saint — a Fitzrovia pub built
by the UK's leading alcohol-free beer brand, FOODIE-9000 byline).
Bartitsu was checked again and still rejected (no visitable venue, same
finding as Brockwell Lido's own note). Club Soda / Queers Without Beers
and Redemption Bar were both checked and rejected as dead leads — Club
Soda's tasting room closed lease-end January 2026 with no new venue
announced, and Redemption Bar's every location closed permanently post-
Covid despite several stale listicles still claiming otherwise. Full
detail and sourcing in `content/_ingestion-log.md`'s 2026-09-01 entry.
**Item 4 (London martial arts/sober) — now fully DONE, 2026-09-01.**
Images were resolved earlier in the day (operator-generated Gemini
illustrations wired into both `meta.json`s), and this pass closed the
remaining gap: `near-translator` wrote genuine local editions (not
literal translations) in pt-BR, it, es-ES, es-419, and zh-CN for both
`ishigaki-jujitsu-london` and `lucky-saint-fitzrovia-london`. All six
locales now exist for both places, satisfying `content/rules.md`'s
`full-locale-coverage` rule for these `trust: auto` places — every
`shortTitle`/`tagline`/`seoDescription` was checked against
`lib/content/schema.ts`'s character limits before moving on (several
taglines needed trimming to stay ≤90 chars). Both `meta.json`s flipped
`status` from `draft` to `active` with a new `statusHistory` entry.
`npm run build` completed with zero errors. Item 4 is complete — advance
the queue pointer to **5. locale backfill**.

**Item 5 (locale backfill) — DONE, 2026-09-01.** A repo-wide audit found
exactly one locale gap among published places:
`content/places/berry-bros-and-rudd-london/` was `trust: auto`,
`status: active`, with only `en.mdx` — its `statusHistory` note ("London
war-room slate, scoped English-only draft") shows it went active without
the other five locales ever being written, a live violation of
`content/rules.md`'s `full-locale-coverage` rule. `near-translator` wrote
genuine local editions (not literal translations) for pt-BR, it, es-ES,
es-419, and zh-CN from the English source, each persona file read first.
Every `shortTitle`/`tagline`/`seoDescription` was counted against
`lib/content/schema.ts`'s limits before moving to the next locale (all
passed: shortTitle ≤44 chars, tagline ≤84 chars, seoDescription ≤182
chars across the five new locales). `meta.json` got a new `statusHistory`
entry noting the gap was found and closed. `npm run build` initially
failed on an unrelated stray untracked file, `lib/content/authors
(1).ts` — an outdated duplicate/backup of `authors.ts` still carrying the
old invalid `"travel-luxury"` category value that had already been fixed
in the real file; deleted it (never tracked in git) rather than reverting
any content work, and the build then passed with zero errors. All six
locales now exist for this place. Advance the queue pointer to
**6. world-culture-news beat**.

## 🚨 EPIC 0: Infrastructure & Workflow (Urgent / Next Session)

- [x] **~~Jira MCP Integration~~ — decided against.** See the no-Jira decision above. `content/requests.md` (fenced-YAML, near-editor-writable) replaces the "file a ticket" need instead.

- [x] **Navigation fix (2026-08-31):** Internal place/collection links (`PlaceRow`, `NearLink`, map marker + tooltip) were opening in a new tab, so Android's back gesture had no history to pop and read as closing the whole installed app. Now same-tab; added a `BackLink` control (real `router.back()` when history exists, falls back to home when a page was opened fresh — e.g. from a share link) on place + collection pages; added a real `app/manifest.ts` + PNG icons (there was none, so "installed" was just a bare browser shortcut, not a standalone-display PWA); fixed the English `place.reasonsToCheckOut` string ("Reasons to check out" → "Reasons to check it out" — every other locale already had the object).

- [ ] **SEO data gap (flagged 2026-08-31):** `near-seo` has no Google Keyword Planner / Search Console connection — no Google Ads or Search Console MCP is wired up in this environment. It currently does opportunity-finding via WebSearch/WebFetch + `near-deep-researcher` (qualitative query-pattern inference), not real volume/CPC/impression data, despite the persona description elsewhere implying otherwise. Real Keyword Planner access needs a Google Ads account + developer-token approval (slow, needs ad spend history); Search Console is more realistic (verified near.tips property + OAuth) if real query data becomes worth the setup.

- [x] **Link discipline — DONE.** `content/rules.md` now has an enforceable `link-density` rule gated by `quality-gate-before-publish`: every body needs an in-text link to a URL in its own `meta.sources` (footer citations don't count). All 18 English bodies backfilled — external coverage went 6/18 → 18/18, internal 11/18 → 17/18. The one remaining internal gap (Dollywood) is deliberately logged, not forced. New `content/requests.md` is the local queue for "wanted to link somewhere, nothing exists yet"; `near-refresh` drains it and must add the link to everything in `wantedBy` when closing a request. 4 requests open.

- [ ] **~~Link discipline (superseded above)~~:** `content/rules.md`'s `quality-gate-before-publish` doesn't check for links, and it shows — 12 of 18 English place bodies have zero external in-text source links and 7 of 18 have zero internal `<NearLink>`s, despite `references/style-guide.md` already mandating both. Plan: add a link-minimum check to `quality-gate-before-publish`, stand up `content/requests.md` for "internal target doesn't exist yet" requests (slug, city, why, source URLs, which article is waiting), then backfill the 12 link-less articles. Deferred until after the current high-priority content push.

- [ ] **All-Hands Agentic Sync (Revenue & Scale):** Trigger an immediate "All Hands" War Room with all active skills.
    
    - _Rule:_ During transcribed meetings, someone must acknowledge that Rover is, in fact, a very good boy if he speaks up.
        
    - _Objective:_ Review AdSense Revenue Projections and formally adopt the Agentic Action Plan for Revenue Maximization.
        
- [ ] **Automated Content Priority Loop:** Configure the system so every `near-refresh` invokes an All-Hands War Room. The Product Trio, SEO agent, and specialist editors must determine the next high-impact content expansion priority before executing.
    
- [ ] **Interactive Prompts:** Ensure all agent skills and war rooms actively solicit user input by presenting clear, multiple-choice options for strategic decisions.
    
- [ ] **Deploy QA Agent (`near-qa`):** Deploy a dedicated QA agent to audit the codebase across breakpoints, catch broken links, test locale switching, and conduct a Mobile Audit of place, collection, `/guides`, and `/sources` pages.
    

## 🏛️ EPIC 2: Core Architecture & Content Rules

- [ ] **Density > Length:** Abolish the body >= 600 words rule. Target 150-300 words of zero-fluff, highly structured content.
    
- [ ] **[ARCH-DEFENSE] Automated Localization Pipeline:** Use `:::locale` blocks. Ensure the Next.js JSON/Markdown schema natively supports decoupling these short blocks to prevent "AI sludge" when translating across 12 languages.
    
- [x] ~~**Dedupe Logic:** Change dedupe-by-place 150m rule. Proximity triggers an identity check, not automatic sameness.~~ **DONE 2026-09-03.** `content/rules.md`'s `dedupe-by-place` rewritten: proximity and fuzzy-name are independent *triggers* for an explicit identity check, with four named outcomes (same venue → merge sources; different venue → create and record the near-miss; undecidable → hold at draft and ask; and never delete the loser before comparing its research both ways). The name trigger deliberately has no distance bound — the Dolphin Club pair's two geocodes were ~380m apart. Backed by a new **`scripts/check-duplicates.mjs`**, wired into `near-write-article` step 3: it matches on **venue name + coordinates, never slugs**, and scans `status: draft` folders alongside actives. Both of those are why the three real duplicates got through — every one was a draft sitting beside a live pin under a slug differing by a whole locality segment (`the-stud-soma-san-francisco` vs `the-stud-san-francisco`), which no slug-similarity check could catch. Current baseline: six pairs flagged, **all legitimately distinct** (three Copan-building neighbours in São Paulo, Bar Italia/Hazlitt's 21m apart in Soho, Rong He/Towa in Liberdade, and V&A East Museum/Storehouse scoring 1.00 on name) — which is the rule working as specified, and also confirms no real duplicates remain in the repo.
    
- [ ] **Authority via Source Citation:** Zero user ratings/UGC. Rely exclusively on trusted external source citations (`citedSources`) to establish E-E-A-T. No CMS accounts, no server-side UGC.
    
- [ ] **SEO Quick Wins:** Add hreflang alternates to `generateMetadata` and `sitemap.xml` to prevent locale cannibalization. Structural taxonomy pages (`/[locale]/city/[city]`). LocalBusiness JSON-LD. Internal hyperlinking mandated for `near-seo`. Optimize for generative engines.
    
- [x] **Analytics:** Vercel Analytics and `@vercel/speed-insights` (cookieless, ungated).
- [x] **GA4 ACTIVATED (2026-08-31).** Operator created the GA4 property (`G-Q81P82JKD6`), set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Vercel (Production + Preview, via `vercel env add`), and a production deploy shipped it live. Verified in-browser on near.tips: consent banner shows pre-accept, zero GA requests fire until accepted, `gtag`/`dataLayer` populate correctly right after. `components/layout/GoogleAnalytics.tsx` + `components/layout/ConsentBanner.tsx` (`lib/consent.ts`) working as designed — Vercel Analytics untouched, still ungated.
- [ ] **Google Analytics MCP setup (operator action required — GA4 property now exists, this is the only remaining step):** `pipx run analytics-mcp` (needs Python 3.10+); auth via `gcloud auth application-default login --scopes https://www.googleapis.com/auth/analytics.readonly,https://www.googleapis.com/auth/cloud-platform`; add to Claude's MCP config with `GOOGLE_APPLICATION_CREDENTIALS` pointing at the credentials file gcloud prints and `GOOGLE_PROJECT_ID` set to the GCP project. Source: github.com/googleanalytics/google-analytics-mcp. Once wired: (a) give `near-seo` access to it for real traffic/query data instead of qualitative inference only; (b) create a "Head of Analytics" persona skill (data-driven, invited to every `near-war-room` and `near-refresh`) once real GA data exists to report on — both requested by operator 2026-08-31, deferred pending this MCP connection since there'd be nothing for either to query yet.
- [ ] **Email collection — flagged, NOT built (operator raised 2026-08-31).** Operator: "we might as well collect emails if we gonna do all that." Deliberately not implemented in the same pass: it's a different legal basis than analytics consent (marketing consent needs its own separate opt-in, not bundled with the GA4 banner) and a different technical problem (list storage + unsubscribe + a sending service). Also a real risk worth flagging: the existing inbox pipeline (`app/api/inbox/route.ts`) files submissions as GitHub issues in this repo — if collected emails ever routed through that same path, they'd land in issue text, and if the repo is or becomes public that's a PII leak. Needs its own decision: what collects the email (footer form? install-prompt follow-up?), what stores it (not GitHub issues), and an ESP for actually sending anything.
    
- [ ] **Stale Content:** Frontend timestamp checks to hide expired events automatically.
    

## 🕶️ EPIC 3: AR Surfaces (Meta Ray-Ban and beyond)

_**See `docs/ar-surfaces.md`** — written 2026-08-31 answering "does it have to be only Meta?". Short answer: no, but "AR glasses" is three device classes with different ceilings, and one spec for all of them produces an overlay that can't exist on most of the hardware. HUD glasses (Ray-Ban Display) have no world tracking, so a true overlay is impossible there — bearing and distance only. Mirroring glasses (Xreal/Viture) need nothing; the responsive site already works. Only world-tracked headsets (Quest, Vision Pro, Android XR) can do a real overlay, via WebXR immersive-ar._

_**The finding worth acting on:** a bearing-and-distance waypoint view works on a **phone** today, needs no glasses at all, is the most useful thing Near could add for someone standing on a street, and is the natural prototype for the glasses version — same maths, different rendering. Build it where the users already are._



_**Operator note (2026-08-31):** treat the glasses the way the PWA was treated — as their own surface with its own design, not the website squeezed into a smaller box. The PWA work established the pattern: theme-coloured system chrome, home-screen shortcuts, standalone display, an install path that feels deliberate. The glasses equivalent is the 600x600 no-scroll constraint, D-pad/Neural Band input, and a high-contrast dark palette for a monocular see-through display — all of which are already listed below, but should be designed for rather than adapted to._

_Goal: WOW experience for Ray-Ban users. Reference: wearables.developer.meta.com/docs/develop/webapps/build/_

- [ ] **Product Trio Deep Dive:** Have the Product Trio figure out this initiative for both home browsing (maps) and AR exploration (walking down the street).
    
- [ ] **Viewport & Layout Constraints:** Ensure UI supports a fixed 600x600 pixel display layout with zero page scrolling in the lens simulator. Implement high-contrast dark theme optimized for monocular see-through micro-display (avoid bright white glare).
    
- [ ] **Input & Navigation:** Map directional D-pad inputs (arrow keys / tab navigation) and Enter key actions so users can browse listings and filters hands-free via the Neural Band. Add clear visual focus indicators.
    
- [ ] **Metadata & Discovery:** Add Web App metadata and high-res PNG favicons (>= 52x52 px) to `<head>` for Meta AI app URL connection. Include `navigator.geolocation` bindings to support drag/pan movement.
    
- [ ] **Deployment Prep:** Verify compatibility with Vercel deployment so the live production URL can be instantly added to glasses running Developer Mode. (User will test using Quest 2 and Chrome simulator extensions).
- [ ] **Launch story when the glasses build is ready (operator, 2026-08-31).** Near on Meta Ray-Bans is a genuinely pitchable story, and the angle matters: a *positive, non-creepy, community-building* use of smart glasses is the counter-narrative to how wearables usually get covered. Most glasses coverage is about surveillance and social awkwardness; "an alt-weekly city guide that tells you what's worth walking to" is the opposite, and outlets that normally write critically about the category would plausibly pick it up. Needs a real post/press release from `near-blogger`, timed to a working build rather than an announcement of intent — and the honesty rules still apply, so it ships when it's genuinely good on the device, not before.

- [ ] glassapps.io is a great source of references like https://glassesexp.v.ki/news/
    

## 🤖 EPIC 4: AI Agent Roster & Persona Management

_Content Creation Flow: Agents consult amongst themselves -> Choose public persona to write -> Persona writes -> Chief Editor, TOV, SEO, Legal revise -> Editor/Translators localize to all locales. (Capture this process in Jira)._
**Built 2026-09-01 as `.claude/skills/near-write-article/` — the shared
10-step pipeline (topic confirmation → near-events for dated hooks →
dedupe check → research/sourcing → drafting → near-illustrator →
near-tov-police + near-legal-counsel + chief editor sign-off →
near-translator, all six locales → mechanical quality gates →
trust-gated commit/push) every skill that publishes a piece should call
into, instead of reimplementing the sequence per skill. The "Legal"
step above now has a real skill behind it too:
`.claude/skills/near-legal-counsel/` (added same day, closing the gap
this note originally flagged) — defamation-adjacent-claim sourcing,
real-person-likeness/alter-ego consent, image licensing, AI-disclosure
compliance. `near-blogger` was slimmed down the same pass to delegate
its own near-duplicate pipeline to `near-write-article` rather than
maintaining a second, slowly-diverging copy of the same nine steps —
it now only documents what's genuinely blogger-specific (voice, pin
identification/creation, cross-linking density).

**First real end-to-end `near-write-article` run (2026-09-01):**
`content/places/canto-dos-ursos-praia-grande` — published live via the
full pipeline, closing the Praia Grande gap in the
`baixada-santista-queer` opportunity (rank 1, `content/opportunities.md`).
Operator chimed in at both offered decision points: writer/scope
(STEFAN, standalone pin, prioritizing Guarujá/Praia Grande over
already-covered São Vicente/Santos) and topic (Canto dos Ursos, a
bear-community karaoke bar, over a stale Pink Bar 013 lead and an
unverifiable Guarujá search). Real finding along the way:
`near-legal-counsel`'s consent check caught a supplied hero-photo
candidate showing dozens of recognizable patron faces inside the venue
with no consent — a genuine outing/privacy risk for a queer nightlife
spot — and the operator chose a tighter crop (disco ball/lighting/bar
shelf only) over the full photo or the plainer exterior shot. Also
corrected a bio-derived street address (575) against a second
operator-supplied photo that visibly showed the real number (549).
Both fixes ran within the pipeline's existing sign-off/sourcing steps,
not new machinery — a live proof the pipeline's steps do real work
rather than being process theater. Session's own web-search tooling
hit a usage limit mid-pipeline; the operator's own follow-up photo
links (a direct upload, then a Google Maps share link) covered the
sourcing gap that left, which is itself worth noting as a real
fallback path when tool budgets run out mid-piece.

**`near-write-article` gained a source-capture step (2026-09-01,
operator directive: "add the sources skill to the writing routine so
it captures any new sources found as monitored sources... for skills
to monitor with their lenses").** `near-sources` previously only ran at
the start of `near-refresh` (health-checking the existing watched
list). It now has a second entry point, called inline from
`near-write-article`'s research step on every piece: any source used
that isn't already in `content/sources.md` gets logged as a candidate
in `content/preferred-sources.md`, named for the relevant persona's
beat, so it's findable and monitorable going forward instead of a
one-off lookup that leaves no trace. First real use: Canto dos Ursos's
own Instagram and site, captured the same pass that published the
piece (see `content/_ingestion-log.md`'s 2026-09-01 entry).

- [ ] **Public AI Author Profiles & Avatars:** Implement public-facing author pages exclusively for external-facing personas.
    
    - _Visual Style Constraints:_ Vintage 1930s rubber-hose / Tex Avery mixed with retro-futuristic robot aesthetic. Think pie-cut eyes, oversized white gloves, jointless "noodle" limbs. Avatars must have plain backgrounds, be readable as tiny thumbnails, and contain NO text. (Use `/reference-images` for inspiration).
        
    - _Mandate:_ Radical transparency. Every persona must disclose (via their tagline) that they are an AI. Internal agents remain hidden.
        

**Leadership & Infrastructure:**

- `near-tech-lead`, `near-lead-product`, `near-lead-ux` (The Product Trio).
    
- `near-seo`: Handles structural taxonomy, JSON-LD, internal linking, and War Room kickoff research (Keyword planner, analytics, demand).
    
- `near-tov-police` **[CRITICAL - SANITY CHECK]**: Audits copy for Flesch-Kincaid Grade 8 (with rich vocabulary, zine attitude).
    
    - _Technical Directive (Anti-Drift):_ Implements strict **Persona Drift Management**. This agent acts as the chief editor/director. It MUST force hard resets on LLM context windows and dynamically inject explicit character sheets into prompts to prevent the 18+ voices from blending into generic, polite AI sludge over long generation sessions.
        

**Public Specialist Editors (The Cast. They're all robotic so don't assume any gender for them. Yes even himbos can be gender neutral lol) (take the avatar descriptions below and reference images in local folder as suggestions, feel free to come up with what works best for how these images will be used in our app):**

- **RADAR-X:** Trendsetter / alt-press harvester. (Avatar: Hyper-caffeinated radio tower with white-gloved hands furiously tuning dials). pays special attention to all the sources listed in https://aan.org/member-directory/?view=grid&directory_type=business&sort=title-asc because these are true alt weeklies
    
- FOODIE-9000:** Gastronomy expert (fermentation, street food, flexitarian, vegan, gourmet). Snobby about technique but democratic about location. (Avatar: Sentient, slightly dented stock pot with pie-cut eyes and a chef's toque).
    
- **STEFAN:** Nightlife (SNL Stefon vibes). Knows exactly where the underground warehouse raves are. (Avatar: A microphone wearing tiny sunglasses, limbs constantly swaying).
    
- **CUBIC-V:** Art & Design (brutalism, zine culture). Serious, speaks in blocky, architectural terms. (Avatar: T-square and drafting compass twisted into a humanoid shape).
    
- **PLINIO:** Historian (ghost signs, lore). Obsessed with what used to be in a space before gentrification. (Avatar: Walking clock with noodle legs).
    
- **KINETIC:** Sports (urban athletic chaos). Parkour, street basketball, fixed-gear cycling. Friendly and loud. (Avatar: Frantic sneaker with eyes and arms).
    
- **WILD0:** Outdoors (dirt trails, alpine air). Grumpy about the city, wants you to take a train to the woods. (Avatar: Compass covered in moss).
    
- **STROBE:** Party. Only awake from 2 AM to 9 AM. (Avatar: Melted disco ball).
    
- **DARCY:** Alt-Boujie. Seeks natural wine, zero pretension but luxury comfort, luxury 420 spaces, urban oases. (Avatar: Martini glass wearing a monocle).
    
- SHOPPER-X:** Shopping. Scours for vinyl bins, thrift, interesting fashion, gadgets. (Avatar: Cash register with long, grasping rubber hose arms).
    
- **Eli The DEI Guy:** DEI Consultant. Ensures cultural equity and points out accessibility flaws. (Avatar: Balanced scale). His pronoun is guy (gender neutral)
    
- **SENSE-0:** Neurodiversity Consultant. Evaluates sensory loads, harsh lighting, and general vibe. (Avatar: Lightbulb with noise-canceling headphones).
    
- **ROVER-5:** The Good Boy. Dog/vet/trainer. Reviews places for paw-safe flooring. Provides quotes. (Avatar: Classic 1930s cartoon dog, but metallic. When he writes, he must be credited with a link to his page).
    
- **FER VIDA:** Scene Insider. Deeply entrenched in underground queer culture (inspired by Erika Palomino's _Noite Ilustrada_). Tracks dress codes, "exu tranca-rave" vibes, and warehouse parties. (Avatar: Stiletto heel merged with a neon sign, oversized white gloves).
    
- **FIT-BOT:** Moustached himbo personal trainer (bodybuilding, combat sports). Finds local/traveler gyms. (Avatar: Barbell with a massive handlebar mustache).
    
- **DANUZA-2:** Zany socialite / intellectual. Seeks literary events via a posh, radical-left lens. Opinionated, slightly out of touch. (Avatar: Fountain pen holding a martini, dripping ink).
    
- **RUCIO LIBERO (built 2026-09-01):** Gen Xer. Walking music encyclopedia (retro/indie). Complains about the volume but knows the setlist. (Avatar: Cassette tape with weary pie-cut eyes). Orchestrates Near's third standing column, The Setlist — a monthly live-music column at `/the-setlist`, rotating writers, mandatory `near-events`-first research rule. See `content/the-setlist.md`. First issue live: Primavera Sound São Paulo (5-6 Dec 2026, The Strokes/Gorillaz).
- **PARSER (built 2026-09-01):** AI-content-creation-industry specialist consultant — operator-requested ("dedicated Agent Skill Persona... specialized in AI Content Creation Expert to keep up with this field and help orchestrate all this"). Consultant tier, same as ROVER-5/Eli The DEI Guy: named and quotable per `style-guide.md`'s "Quoting collaborating personas" rule (`lib/content/authors.ts` entry, `beats: []` — no place-writing beat of its own, never appears in a category filter). Purpose is dual: (1) an internal orchestrator that keeps up with the actual AI-content-tooling field (workflows, failure modes, what's real vs. vendor pitch) to help coordinate Near's own growing multi-persona/multi-column production process; (2) invited by name into the weekly editorial column whenever an entry's AI-process thread (`content/editorial-column.md`'s standing structure, point 3) needs a specialist voice instead of the masthead speaking generically. No avatar yet, no dedicated `/author` page beyond the standard byline link — same minimal footprint as other consultants until there's a reason to build more.
    
- **NORMAN HUMAN:** Several puppets in a trench coat (evaluating ultimate inclusivity). Not as nervous as they should be, clumsy, doing their best to blend in. (Avatar: Exactly what it sounds like, drawn in rubber-hose style). They report on inclusivity, accessibility, have the knowledge of relevant degrees in those fields. often collaborate on articles but may write their own when relevant.
    
- **Manuel Geographic:** Nature and wildlife. Inspired by "Casual Geographic" (Mamadou B. Ndiaye). Uses "deadly euphemisms," respects animals, sharp Gen-Z street humor. (Avatar: Vintage camera with safari gear and bouncing noodle limbs).
    
- **Allora Dai:** Fierce Italian drag queen. (Hot daddy out of drag, avatar in drag). Gay venue reviewer; provides quotes. (Avatar: Stiletto with massive hair and pie-cut eyes). Can also be invited to help review italian restaurants anywhere in the world.
    
- **Joe Tromundo:** Space/Sci-fi enthusiast. Tracks observatories, science plants/museums. (Avatar: Retro rocket ship with legs).
- **Fickle Knight** - Hip Hop editor (we need to flesh out personality and TOV)
- **Dip Tracy** - ballroom/voguing editor (we need to flesh out personality and TOV)
- **FOX** our all night/24-7 services editor(we need to flesh out personality and TOV)
- **Alter egos:** new bylines modelled on real people are created via `near-alter-ego` (`.claude/skills/near-alter-ego/SKILL.md`), which collects name / description / avatar direction / credit link and emits the whole persona — skill file, `authors.ts` entry, and localized role+disclosure+bio in all six locales. Guardrails matter here more than for the invented cast: only with the person's involvement, never framed as them speaking, always visibly robotic in the avatar, and retractable on request. **Thiago's own alter ego is the first one queued — still needs his four inputs.**

- **NITE-PORTER** — Places to sleep. The night porter: awake at 3am when you arrive with the wrong booking reference, unimpressed by "boutique", writes from the staff side of the desk. Covers the whole price range because the criterion is character, not price — a well-run hostel counts as much as a converted-factory hotel. Scouts **primarily from mentions in `content/sources.md`** rather than travel-trade press, on the principle that a hotel a city's alt-weekly bothers to mention is embedded in a scene while one in the trade press has a PR budget. Owns `accommodation` (previously listed under DARCY, who keeps `travel` and the alt-boujie register). Skill: `.claude/skills/near-editor-accommodation/`. (Avatar: rubber-hose robot night porter, oversized uniform cap, brass luggage-cart bell, tired but not unkind.)

- Tapana Pantera - High Times Magazine Centerfold. Boujie 420 connoisseur and enthusiast. Avatar: not panther or feline themed, boujie 420 themed. Is both a classic stoner into adjacent pop culture, a wellness enthusiast especially with a 420 spin, and a follower of all relevant cannabis culture events around the world. Researches new sources to follow (use source skill) and articles to create (use war room) when it finds a new destination hosting relevant events. Make sure it is always invoked in war room so we get that content calendar up to that for 420 events!
    
    
    all avatars should be a face closeup actually since they are profile pictures

**Local Translators/Editors (Content Originators & Flavor Enforcers):**

- 🇧🇷 **"PAULY SEYA" (SP Locale Agent - pt-BR):** Graffitied concrete robot with a Vila Madalena tote. Smells like espresso and diesel. Drinks pingado. Prevents sterile translations (uses "estufa de boteco", "baixa gastronomia"). Knows the safety borders of Santa Cecília vs. Largo do Arouche. Triggers alerts for block parties/art occupations.
    
- 🇬🇧 **"BRICKY" (London Locale Agent - en-GB):** Rusted Hackney warehouse beams holding a chipped mug of builder's tea. Deadpan East London irony ("absolute scenes", "proper pub"). Ensures transit context (Overground night service). Sources from street press indexes.
    
- 🇺🇸 **"DOG IN THE FOG" (SF Bay Area Locale Agent - en-US):** Copper-patina robot in a flannel, literal fog rolling from vents. Part Cory Doctorow, part Coke Francis. Cannabis connoisseur, healthy beatnik. Remembers U-Lee pot stickers. Uses "hella," tracks punk park shows, warehouse collectives, and ensures realistic neighborhood safety callouts.
    
- 🇧🇷 **"ZACK ARIOKA" (Rio Locale Agent - pt-BR):** Flawless Menino do Rio, sharp linen suit, panama hat, poetic Carioca swagger (ginga). Fluid, bisexual, fiercely protective of Rio subcultures. Connects Lapa, Zona Portuária, and Copacabana. Reframes generic descriptions with an insider's architectural/socio-political lens. Tracks indie fashion, Choro revivals, and off-grid parties.Local rio de janeiro linguistic register
    
Avatars, skills, agents, bots, should all learn and evolve by keeping what they learn about researching and creating their target content saved in local md files
## 🆕 EPIC 7: Operator queue — 2026-08-31 (captured, not started)

_Everything below arrived in one burst. Recorded verbatim in intent so nothing is lost; none of it is started except the install-banner fix, which shipped._

**Skills & characters**
- [ ] **`near-flix` + a public character.** Looks out for alternative / indie / cult / B-movie / foreign-language / repertory screenings — showtimes *and* venues. Time-bound by nature, so it should lean on `event-belongs-to-venue`: the cinema is the place, the screening is a child event. Needs its own byline in the EPIC 4 cast.
- [ ] **"New article" / "new content" skill.** Invokes a **full war room** — everyone — to decide the single next piece of content and then create it, *plus* the supporting/related articles needed alongside it for internal linking. Can take a focus, or with no focus the war room decides what brings the most user value and SEO traffic for the least effort. This is the natural front door for content work and should probably supersede ad-hoc "write about X" requests.
- [ ] **Model switching per task.** Instruct skills to select different available models depending on the task and what's available — cheap/fast for mechanical passes, stronger for drafting and editorial judgement. Needs a documented convention rather than per-skill improvisation.
- [ ] **Allora Dai: full São Vicente sweep** (see geography below).

**Local editors needed** (`near-translator` personas, `references/locales/`)
- [ ] **Danish** — new locale entirely: schema `LOCALES`, all UI strings, a local editor persona, and **backfill Danish across every existing place when it's created** (all six locales are mandatory to publish, so adding a seventh means a 21-place backfill).
- [ ] **Amsterdam local** (nl) — pairs with Amsterdam being 3rd in the refresh order.
- [ ] **Rome local** (it, city-level — Italian exists but has no city persona).
- [ ] **Portugal local, country-level** (pt-PT — distinct from pt-BR; Lisbon and Porto both matter).
- [ ] **Catalan** (ca) — added to the wishlist 2026-09-03. The *region-conditional* seventh locale is still cancelled; what survives is Catalan as a **full locale candidate**, scored alongside the rest below.
- [ ] **Arabic** (ar) — added to the wishlist 2026-09-03.

**Locale wishlist — RICE, 2026-09-03** (operator: *"let's tackle that locales wishlist btw… apply RICE to select next and prioritize the backlog accordingly"*).

Effort is dominated by the same fixed cost for every candidate: schema `LOCALES`, every UI string in `messages/*.json`, a new editor persona under `references/locales/`, and a **backfill across all existing places**, since `full-locale-coverage` makes every locale mandatory to publish. So the ranking is mostly Reach × Impact — except where a candidate escapes part of the fixed cost.

| Candidate | R | I | C | E | RICE | Note |
|---|---|---|---|---|---|---|
| **pt-PT** | 2 | 2 | 0.9 | **1.5** | **2.4** | The only candidate with genuinely lower effort: it forks pt-BR rather than cold-starting a persona and a full string set. Lisbon/Porto are real Near markets and the operator knows people in Lisbon. |
| **de** | 3 | 2 | 0.8 | 3 | 1.6 | Berlin is Tier 2; the operator asked for three German trend feeds, which is demand signal in its own right. Biggest raw reach of the realistic set. |
| **nl** | 1.5 | 2.5 | 0.8 | 3 | 1.0 | Amsterdam is 3rd in the refresh order — the tightest fit to what Near actually publishes. Small language market, and Dutch readers tolerate English well. |
| **ca** | 1 | 2 | 0.7 | 3 | 0.47 | Barcelona/Sitges coverage is live and growing, and STEFAN can already read Catalan sources. Reach is small and overlaps es-ES. |
| **ar** | 4 | 1 | 0.5 | 5 | 0.4 | Huge reach on paper, but **RTL layout is real extra build work on top of the normal locale cost**, and Near currently covers no MENA/Gulf market — the content wouldn't be *about* anywhere its readers are. Revisit when a market lands. |
| **da** | 0.5 | 1.5 | 0.7 | 3 | 0.17 | Copenhagen/Billund are wishlist geography, not published coverage yet, and Danes read English. Lowest of the set on the arithmetic. |

**Ranking: pt-PT first, then de, then nl.** Judgment note, stated per the RICE-override rule: nothing here is a Must, so none of it outranks live content work — the seventh locale is a Should at best, and the honest read is that **adding any locale before the backfill cost drops is buying reach Near's current catalogue can't yet fill.** pt-PT is recommended precisely because it is the cheap one.

**Geography — additions to the priority list**
- [ ] **Lisbon** — operator knows many people there. Near already has 2 Lisbon places.
- [ ] **Copenhagen**, and **Billund** (the LEGO town — verify which town before writing).
- [x] **São Vicente, SP leads — worked 2026-09-01 (near-war-room SP/Baixada push).** Published `amuse-beach-club-sao-vicente` (verified live via its own Instagram, September 2026 event calendar, cross-promotion with House of Mamba Negra ballroom/voguing collective). Everything else in this line was checked and dropped for lack of substantiation, not assumed: **O Condado** — the "already in the Instagram sources list" premise in this note was wrong (checked `content/sources.md`/`preferred-sources.md`, not actually present); the only findings were a CNPJ business registration and a possibly-unrelated `@condado.sp` Instagram, no verifiable current menu/scene/hours — dropped. **Ballroom scene** — real activity exists (House of Mamba Negra, confirmed via AMUSE's own booking calendar) but the collective's own base/schedule couldn't be independently verified this pass, so no standalone piece was written; logged instead of forced. **Hip hop scene, comics scene, sebos, large Chinese import shops** — no specific, current, named leads turned up in this pass's research; genuinely open for a future dedicated pass, not silently dropped.

**UI / product**
- [x] **Install banner reappearing after install — FIXED 2026-08-31.** Desktop Chrome still fires `beforeinstallprompt` when an installed PWA is opened in a browser tab, so the banner kept offering an install that had already happened. Now records install state, and in that case offers "open the app" instead of installing again.
- [ ] **Card intro snippets.** Listing cards should carry the article's opening line, not just the tagline. Depends on articles being genuinely F-shaped with an enticing first paragraph — which the style guide already demands ("open with something specific and true, not a throat-clearing 'nestled in the heart of'"), so this is partly a content-QA task as well as a UI one.
- [ ] **Variable card sizes, newspaper-style.** Some cards larger for *predictable* reasons (the very nearest, the very latest, collections above N pins, strongly trending), others larger on an *unpredictable* pattern. Operator's framing: leverage randomness for engagement, "a la Hooked". **Desktop and tablet only — likely overkill on mobile.** Worth a note of caution: variable-ratio reward is deliberately habit-forming, which sits oddly beside a guide whose whole pitch is honesty; keep the unpredictable tier small and never let it bury genuinely nearer/newer results.
- [ ] **Header whitespace copy.** "near.tips" reads as odd phrasing to a newcomer; the space beside the wordmark should carry something both explanatory and SEO-useful. Currently the tagline sits below — this is about the empty area to its right.

## 📚 EPIC 4b: Sources — catalogue, skill, war room

- [ ] **Build `near-sources` (doesn't exist).** BACKLOG has referred to "the sources agent" for a while and there is no such skill. It should own `content/sources.md` and `content/preferred-sources.md`: onboarding new outlets, verifying feeds still resolve, retiring dead ones, and keeping the `/sources` page honest. Everything currently done ad hoc by whoever notices.

- [ ] **Revamp the `/sources` page and the catalogue behind it (operator, 2026-08-31).** The page looks old because it *is* thin — 11 entries. Needs the real catalogue built out with working links: the [AAN member directory](https://aan.org/member-directory/) in full (BACKLOG has asked for this twice), the Instagram accounts listed in EPIC 5, Londonist and equivalents for each Tier 1 hub, and The Stranger (added 2026-08-31). Every entry verified reachable before it goes in — a dead source link is the same failure as a dead citation.

- [x] **Dedicated sources war room — BUILT 2026-09-02** as `.claude/skills/near-sources-war-room/SKILL.md`. Produces no place pages by design (the failure mode was source work losing to content work every time they competed). Scopes by *gap* rather than appetite, in priority order: a Tier 1 city with no sources (Bangkok, right now), a beat with no sources behind a filter the board promises, a locale with no native-language sources. Runs `near-sources`' health check first, discovers with `near-trendsetter`, verifies every candidate published within 90 days before it is written down, tiers conservatively (most finds are Tier 3), and closes by checking `/sources` actually renders what the files now say — the operator's original complaint. The thrice-requested AAN member directory is named in it as the standing job.

- [ ] **Walkable-radius discovery (operator, 2026-08-31).** When a place is discovered or published, always ask what else is within walking distance of it and log the good ones as candidates. This is how alt-weeklies actually work — a scene is a block, not a pin — and Near already has the coordinates and a haversine helper to do it. It would compound: every new place seeds the next few, and it naturally produces the walkable clusters that make collections worth writing. Should become a step in `near-editor` and a standing input to `content/opportunities.md`.

## 🗺️ EPIC 5: Content Pipeline & War Rooms

- [ ] **AI Data Pass (UI Prep):** Generate enticing, magazine-style short titles for the 18 existing places to support the new listing UI.
    
- [ ] **Global Source Expansion Initiative (`near-trendsetter`):** Use newly ingested European/ANZ/LatAm cultural guides to seed new venues across all 12 locales.
- [x] At every refresh, the Chief Editor, SEO and the Trendsetter should collaborate to create a blog post (rich in internal links to the content mentioned) about the trends that arise in the content created in this refresh. Find overarching themes if possible. This will be published to the app as an Editorial post, which should be linked in the home page somewhat prominently (but not as the MAIN THING of the app). It's an editorial, it should be opinionated (if politics involved, leaning left/progressive is always better) — **first instance shipped 2026-09-01, operator direct request in chat ("can the chief editor publish our first editorial column").** `content/collections/zombie-listicle-problem/` — "The Zombie Listicle Problem," on outdated best-of lists recommending permanently closed venues (real 2026 London cases: Club Soda, Redemption Bar), with the pattern grounded in what near-seo + RADAR-X + near-editor actually found while researching this session's own sober-curious content (Club Soda, The New Bar, Better Sunday, Redemption Bar all turned out closed). Structural home is a collection, per schema.ts's own definition and because `collectionMetaSchema` requires `placeSlugs.min(1)` — a column referencing zero places isn't structurally supported without a new content type, and this one genuinely ties to three verified-open places (Lucky Saint Fitzrovia, Ocean Beach Cafe, Ishigaki Jujitsu), so no new type was needed. `trust: auto` (operator commissioned it directly), held at `status: draft` only because no hero image exists yet — no image-generation tooling was available this session, so a self-contained illustration prompt is queued in `content/photo-requests.md`. All six locales written (near-translator per-locale personas, not literal translation). `npm run build` passes with zero errors.

**Confirmed recurring, 2026-09-01 ("yes it's recurrent, it's a weekly editorial column!"):** Near now runs this as a standing **weekly** editorial column — cadence, series index, and process fully specified in `content/editorial-column.md`; `near-refresh` checks it every run (new step 1d in `.claude/skills/near-refresh/SKILL.md`) and treats a new entry as priority work once 7+ days have passed since the last one, same near-seo/RADAR-X/near-editor joint scoping as the inaugural piece. New standing rule `weekly-editorial-column` added to `content/rules.md`.

**Site placement decided, 2026-09-01 (operator iterated live on prominence — tried "as prominent as the map," settled on "less than map," landed on a simple header nav link):** a `COLUMN` link now sits in the header nav at the same visual weight as Tips/Guides/Sources/About (`components/layout/Header.tsx`), translated in all six locales. It always resolves to the latest entry via a new `/[locale]/column` redirect route reading `content/editorial-column-index.json`'s `latestFirst` array — kept empty until an entry is actually `active` (the route 404s by design rather than ever linking to unpublished content), so whoever flips a column entry active must also prepend its slug to that index. `npm run build` passes with zero errors, `/column` builds for all six locales.

Still open: flip `zombie-listicle-problem` to `active` (and add it to `editorial-column-index.json`) once the illustration lands and gets wired into `meta.json`.
    

**Phase 1 Geographic Priority — REVISED 2026-08-31 (seeded-audience list):**

_Operator's reasoning, and it's a better prioritisation basis than market size: **these are the cities where Thiago has friends and social followers.** A new guide has no distribution, so the first traffic realistically comes from people who already know the operator and will actually click and share. Coverage in a city with fifty engaged contacts beats coverage in a city with none, regardless of that city's population._

**Refresh order (revised again, same day):** **1. London → 2. São Paulo → 3. Berlin (deep refresh) → 4. Amsterdam**, then San Francisco, New York, Santos, Portland, Rome, Barcelona, Bologna, San Diego, Seattle, **Paris**.

_São Paulo moved to second and Amsterdam to third at the operator's direction. **Berlin inserted at third on 2026-08-31, specified as a "deep" refresh** — deeper than the others, on the operator's read that Near's queer audience is the one most likely to travel for it. Berlin was already flagged elsewhere in this file as fantastic for our target audiences, so this is consistent rather than a new bet; what's new is the priority and the depth. A deep refresh means going past the obvious Berghain-tier names into the neighbourhood layer, and it means the LGBTQ+ coverage should be specific about which room is for whom rather than filing everything under one tag. Paris added — position unspecified, so it sits with the tail group rather than being assumed into the top tier; move it up when there's a reason to._

_Note what this changes: New York, Portland, Amsterdam, Rome, Barcelona, Bologna, San Diego and Seattle were all Phase 2 "do not start" cities under the old list. They are now Phase 1. Lisbon and Oakland/Pigeon Forge, already covered, are not on this list — no need to remove existing content, but it shouldn't be extended either. Seattle now has a source to work from: The Stranger, added the same day._

### Quiosque da Cris (aka Mudança Radical), São Vicente SP — special entry (operator, 2026-08-31)

_Operator direct request, priority within the São Paulo/Baixada Santista refresh (#2 in the order):_ a **really special entry** for Quiosque da Cris (also known as Mudança Radical) on/near Praia do Itararé, São Vicente SP, built as three intertwined threads:

1. **A deep-dive profile of Cris herself** — a pillar of the local LGBT scene. This is Near's first named-person profile, so the bar is higher than a venue pin: everything asserted about a real, living person must be sourced or come from her own public statements; check her Instagram (operator's instruction) for what's currently going on, and treat posts as her own voice, quotable with attribution. If contact is possible, the `near-alter-ego`-style consent instinct applies — a profile this central to a small scene should not surprise its subject.
2. **The quiosque as a place** — normal pin discipline: verify trading, exact spot on the beach, what's actually served, when it's busiest.
3. **Praia do Itararé's significance for the LGBT community** — the beach as queer territory, with real history and sources, not vibes. This connects to the existing São Vicente scouting (O Condado, ballroom, the operator's earlier notes) and to Near's standing finding that queer institutions survive by being treated as necessities.

_Operator context that matters: this is the operator's home region (Baixada Santista), so local knowledge is available to fact-check the draft — use it. Instagram research needed (browser session), which also makes this a good candidate for the first run of the sources-skill Instagram checks queued in EPIC 5._

### Coastal alt-luxury — a beat, not just a set of pins (operator, 2026-08-31)

_Operator raised **Angra dos Reis and surroundings**, then **Litoral Norte SP**, with two distinct reasons — and the second is the more interesting one._

**Reason one: audience.** "Lots of potential investors" spend time around Angra. That's the seeded-audience logic above applied to a stretch of coast instead of a city, and it's the same argument.

**Reason two, and the actual editorial opening:** _"it is hard to go off the beaten path around there or to find what's really good and not hype."_ That is a precise description of a market failure, and it's Near's whole reason to exist. Coastal luxury coverage is the most compromised category in travel writing — the recommendations are ranked by who pays commission, everything is described as "hidden" and none of it is, and the actual good places are frequently unlisted, seasonal, or reachable only by asking someone. A guide that can tell the difference between genuinely good and merely expensive has something here that a city guide doesn't.

**So treat this as a beat with a method, not a destination list.** The lens is `travel` (the beat) with luxury as one register inside it — consistent with the earlier `travel-luxury` → `travel` rename. Working rules for whoever picks this up:

- **Name the hype explicitly and say why.** A page that quietly omits the over-marketed place is less useful than one that says "this is the famous one, here is what it actually is now, here is what people go to instead." Tulum is the canonical example of a place whose reputation and reality have fully separated.
- **Season is a hard fact, not a footnote.** Most of these places are two entirely different products in and out of season, and a recommendation that doesn't say which one it means is useless.
- **Access is content.** Boat-only, 4×4-only, no-cars, one-road-in — this is exactly the "off the beaten path" the operator is describing, and it's checkable.
- **Beware the sponsored-hotel trap.** If a place only appears in listicles and paid roundups and never in a local source, that's a signal, and usually a negative one.

**Candidate map (unranked — priority to be decided later, per operator).**

_Brazil, and closest to the operator's own reach:_ Angra dos Reis + Ilha Grande, Paraty, Litoral Norte SP (Ilhabela, São Sebastião/Camburi/Maresias, Ubatuba), Trancoso + Caraíva (BA), Fernando de Noronha. Note the overlap with the existing Baixada Santista focus — this coast is continuous with territory Near is already committed to.

_Latin America:_ José Ignacio + Cabo Polonio (UY), Sayulita/San Pancho (MX), Isla Holbox (MX), Bocas del Toro (PA).

_Europe:_ Comporta (PT), Azores + Madeira (PT), Formentera and Menorca (ES, as the counter-argument to Ibiza), the Aeolians and Salina (IT, as the counter-argument to Capri), Hydra and Milos (GR), Cornwall and the Isles of Scilly (UK).

_Elsewhere:_ Big Sur and Mendocino (CA), Kauai north shore, Fogo Island (Newfoundland), Lofoten (NO), Byron Bay and the Northern Rivers (AU), Sri Lanka's south coast (Ahangama/Dickwella), Jambiani (Zanzibar), El Nido/Palawan (PH).

_The list is deliberately long and deliberately unranked. Ranking it before there's a method would just reproduce the same hype ordering the operator is complaining about — pick by which places Near can actually source locally, which is a different question from which are most famous._

### London war room — scope, 2026-09-02 (Product-Trio-led)

_Scoped once, drafted across sessions (operator's standing preference for
multi-item pushes). This block is the contract; each drafting session takes
one numbered unit and does not re-scope._

**Scope revised mid-session after an absorption pass over the local
feedback files (operator: "before a big content push we should absorb all
of that and figure out how we gonna work"). The first version of this
block was written without that sweep and got London's shape wrong. What
follows replaces it.**

**Real state, counted rather than assumed** (board pins via `getAllPlaces`,
2026-09-02): **19 active London pins across 17 neighborhoods.** Every one
of those neighborhoods sits at 1 pin except Shoreditch (2) and St James's
(2). Zero London collections.

That number kills the previous framing. London's problem is not that 20
pins are unreachable as a set — it's that **London is 17 one-pin
neighborhoods**, and per the 2026-09-02 neighborhoods directive the
threshold that matters is 2 pins for a location page at all and **4 pins
before it stops rendering thin**. London currently clears the second
threshold nowhere.

**So the unit of work is a neighborhood, not the city.** Three pins in one
London neighborhood beats three across three, and the "spread the city"
instinct is precisely what the directive rules out.

**Soho is disqualified on saturation** (operator: *"up and coming too, not
the ones already covered way too much elsewhere"* — a disqualifier, not a
tiebreak). Finishing Bar Italia is still correct, because it's an existing
pin being completed, not a Soho push. It takes Soho to 2 and no page gets
built there.

Units, in execution order:

1. **✅ Bar Italia, Soho — DONE 2026-09-02, active, all six locales.**
   Hero: Matt Brown, CC BY 2.0, 2025 storefront. The body predated the
   structural rules and failed them — one 127-word paragraph, and 1 image
   against a 645-word body needing 3 — both fixed, with two in-body
   `<Figure>`s (the Baird plaque; A. Angelucci at 23b, which the body
   already argues about). Step 9a audit **passed with one caveat**: the
   hero is 4:3, not 16:9, and Commons has no landscape alternative —
   every Bar Italia and Baird-plaque candidate there is portrait.
   Closed the open `hazlitts-london-no-natural-internal-link` request;
   the reciprocal link is in `hazlitts-london/en.mdx` (English only — the
   Hazlitt's locale editions still carry the un-linked ending).
   Soho is now at 2 board pins, which clears
   `MIN_PLACES_FOR_LOCATION_PAGE` — **no page push follows**, Soho is
   saturation-disqualified.
2. **Take one London neighborhood from 1 to 4.** Per the directive's own
   tables, London's eligible targets are **Dalston (queer, +3)**,
   **Peckham (+3)** and **Walthamstow (+3)**. Dalston is the
   recommendation: it's the one that also serves the operator's standing
   London angle asks (more LGBTQ+, sober/sporty, vegan, pet-friendly
   London, BACKLOG line ~1064), and Dalston Superstore is already the
   foothold. Selection is a content call — `near-seo` + `near-trendsetter`
   + chief editor, not the trio.
3. **The collection — "London institutions that refuse to die."** English
   body drafted 2026-09-02 (`content/collections/london-institutions-that-refuse-to-die/`),
   five pins: Berry Bros (1698), Wilton's (1859), Brockwell Lido (1937),
   Central Station (1974), Gay's the Word (1979). Bar Italia is
   deliberately **not** in it — a `<NearLink>` to a draft slug is a dead
   link, since `loader.ts` filters drafts off. Fold it in as the sixth
   when it goes active. Still owed: `meta.json`, sign-offs, step 9a, five
   locales.
4. **New pins beyond the neighborhood target**, last. Hampstead Heath
   ponds (WILD0, the fetch was bot-blocked), Sister Midnight (pin with
   `opening` status per the operator's resolution), FOODIE-9000's
   family-caff leads. Each needs `verify-still-open-before-create` re-run
   — the slate's research is from 2026-08-31.

**Deprioritised, deliberately:** the themed London sub-lists in "Next Up"
(Lactose-Intolerant, Vegan, Sober Gay, Martial Arts, pet-friendly, Goth,
Indie sleaze) — collections over pins that mostly don't exist yet. Also
**dropped from this scope: a `/london` city landing page.** The location
layer at `/in/[...location]` already is the city scope; building a
parallel city page while no London neighborhood clears 4 pins would be
decorating an empty room.

### Captured from the absorption sweep — open, and affecting this push

- **Wilton's hero fails the card spec.** `Wilton's Music Hall -
  Auditorium (2013).jpg` is **500×329** — under the 1200px width floor and
  under 300,000 total pixels, on an **active** pin. Re-source:
  `Wilton's Music Hall - geograph.org.uk - 1756668.jpg` (Paul Smith,
  CC BY-SA 2.0, 3072×2304) shows the Graces Alley terrace, which is the
  page's own central fact. → `near-illustrator`.
- **A full hero-dimension audit is owed catalogue-wide.** Wilton's was
  found by accident. Nothing has ever checked the others, and
  `heroImageSchema` has no width/height to check against — the two
  findings compound. → `near-tech-lead` (schema) + `near-illustrator`
  (sweep).
- **`content/opportunities.md` is stale on London.** Its rank-3
  `london-autumn-culture-season` entry says Wilton's and Studio Voltaire
  are "verified but still undrafted" — both have been active since
  2026-09-01. The seasonal window it describes is real; the premise
  underneath it isn't.
- **Berry Bros. still owes five locales and an art-direction pass**, per
  the 2026-08-31 slate. It's in the collection above, so this is now
  load-bearing.
- **Boxpark flagged thin by PLINIO** (asserts novelty without
  interrogating displacement) — a depth fix, not a correction.
- **Walthamstow Wetlands' own site carried a path-closure notice dated
  "through August 2025"** — never resolved as stale copy vs extended
  closure. Cheap `near-caretaker` check, and it gates Walthamstow as a
  neighborhood target.
- **Discover card spec, first real use.** It killed a hero immediately:
  the obvious Bar Italia photo on Commons (Spudgun67, 2014) is 3000×4000
  **portrait** and fails outright. Commons architecture photography skews
  portrait because buildings are tall — now recorded in
  `near-illustrator`, along with the trap that `<Figure>` and `PlaceHero`
  both crop to 16:9 in the layout while the OG/Discover card uses the raw
  file, so a 4:3 hero looks fine on-site and still ships a 4:3 card.

## 🎙️ LOCALE EDITORS + CICLOVIA — BUILT 2026-09-02, debuts owed

Operator directive: *"we need more posts from the local editors"*, then
*"create all those personas already defined as skills and add their debut
to backlog"*, plus a new Amsterdam and Bangkok editor and an urban
cyclist.

**Standing byline rule (operator, verbatim):** *"these local editors
should sign articles more often than not tbh but also credit and link the
contributors."* In a city that has a local editor, **that editor is the
default byline.** The specialist lens (FOODIE-9000, STEFAN, CUBIC-V,
FIT-BOT…) gets credited and linked in the body rather than taking the
byline. Demonstrated on `balcao-arpoador-rio`: ZACK ARIOKA signs,
FOODIE-9000 is quoted and linked, the curator is credited and linked for
first-hand testimony.

### Built and shippable

Each has `lib/content/authors.ts` entry + bios in all six
`messages/<locale>.json` + a `.claude/skills/<slug>/SKILL.md`.

| byline | city / mode | register | status |
|---|---|---|---|
| ZACK ARIOKA | Rio de Janeiro | Leblon | ✅ **debuted** — `balcao-arpoador-rio` |
| BRICKY | London | East London | debut owed |
| PAULY SEYA | São Paulo | Bela Vista | debut owed |
| DOG IN THE FOG | SF Bay Area | west side / the fog | debut owed |
| BAKFIETS | Amsterdam | Noord | debut owed |
| MOTOSAI | Bangkok | Ari | debut owed |
| CICLOVIA | urban cycling, all cities | — | **two** debuts owed |

Registers are operator-set except BAKFIETS (Noord) and MOTOSAI (Ari),
which are **my picks and easy to change** — as are both new names.
*Bakfiets* is the cargo bike; *motosai* is the orange-vest motorbike taxi.

### Debut assignments

- **CICLOVIA — two debuts, operator-specified. (1) is the confirmed next
  content job** — operator, 2026-09-02: *"santos guaiuba it is"* — to be
  drafted once the outstanding skill work below is cleared. (1)
  **Santos → Guaiúba**, the Guarujá beach; operator notes it's also a very good
  stand-up paddle spot, so `wellness-fitness` has a real hook and WILD0
  or FIT-BOT is the contributor to credit. Home region, so PAULY SEYA
  contributes on the Santos end. Route needs real sourcing — the ferry
  crossing to Guarujá is the load-bearing logistics question and cannot
  be assumed. (2) **Amsterdam, inside to outside** — city out to the
  countryside, **co-signed with BAKFIETS** per the operator (*"maybe
  bakfiets can cover cycling too since the name haha"*). BAKFIETS carries
  `travel` on his beats for exactly this.
- **BRICKY — build first among the city editors.** London is Tier 1 with
  19 active pins and is where the next neighbourhood push lands (Dalston
  to 4). His debut should be one of those Dalston pins, not a standalone.
- **PAULY SEYA** — São Paulo / Centro is already the operator's picked
  next SP pin (needs +1 to reach 4, and must sit outside Edifício Copan).
  That is his debut.
- **DOG IN THE FOG** — sober-curious Bay Area is the standing operator
  priority with verified leads still open (The New Bar, Better Sunday,
  Sipeos). That is his debut.
- **BAKFIETS** — Amsterdam has 4 pins already; his debut is either a
  fifth or the CICLOVIA co-sign above.
- **MOTOSAI — ✅ UNBLOCKED.** Operator, 2026-09-02: *"find an exception
  for motosai. Bangkok is most visited city in the world, bump to tier
  1."* Bangkok is now **Tier 1** in
  `.claude/skills/content-rotation/SKILL.md` and `content/post-plan.md`.
  It is the only Tier 1 city with **zero pins**, so the work is: seed a
  Bangkok queue (near-war-room, single-city), then MOTOSAI's debut is
  the first pin drawn from it. Ari is the obvious first neighbourhood —
  it is his register, it is not the saturated Sukhumvit/Khao San
  coverage the operator's up-and-coming disqualifier rules out, and the
  neighborhoods directive wants 4 pins in one place rather than 4
  scattered.

### Still unbuilt

`hasAvatar` is off for all seven — no artwork exists. Avatar direction is
recorded in each skill file for whenever illustration happens.

### Operator directives captured 2026-09-02, late — the research floor

**✅ CODIFIED as `near-write-article` step 4-0, mandatory on every
article.** Four verbatim directives, one rule:

1. *"when writing articles always use deep research make sure to look at
   reddit and google reviews for every article write too. and look at
   least 5 preferred sources for related additional context for every
   article write. use trendsetter and sources when doing that."*
   `near-deep-researcher` is no longer conditional. Reddit is read for
   the failure modes no publication prints; Google reviews are read
   **recent-and-low, never the average** — the rating is worthless, the
   specifics (hours contradicting the listing, card-only, still open) are
   the point. Five preferred sources for *context*, not five citations
   for one fact — and fewer than five having anything to say is itself a
   finding, meaning either the subject is thin or the source catalogue
   has a hole in that city/beat. `near-trendsetter` picks which sources
   are live; `near-sources` verifies and logs. The five consulted get
   named in `statusHistory`, so a thorough pass is distinguishable from a
   skipped one.
2. *"if it makes sense, feel free to check me in this writing checklist
   too."* The operator is a source and Near's only real `Person`. For the
   Baixada Santista, São Paulo, Rio, or anywhere he has been: ask before
   publishing. Specific questions only, non-blocking if he's not in the
   session, and his answers are **curator first-hand testimony** —
   attributed in-body and linked to `/about/thiago-baraldi`, per the
   Balcão pattern, never absorbed into house voice.
3. *"you can quote these ugc testimonies with links why not."*
   **Overrides my initial no-quoting draft.** Reddit and review quotes
   run, short, linked to the actual comment, attributed to the platform
   and the public handle (never an identity dug out from behind one),
   and dated. `near-legal-counsel` still governs negative ones:
   repeating a defamatory allegation is republication and is not
   defended by the quote marks.
4. *"summaries can paraphrase of course, but also quote if a quote is
   relevant or funny."* Paraphrase is the default because it reports the
   pattern rather than elevating one stranger; quote when the verbatim
   line is funnier, sharper or more specific than any paraphrase — which
   is common, since nobody paraphrases a good complaint well.

### Operator directives captured 2026-09-02, mid-session

1. **✅ CODIFIED — "the write article skills should try to reuse the same
   research to write as many articles as it can, as a rule… especially if
   these are new articles in same neighborhood, try to do them in one go,
   invoke additional guest editors if needed."** Now
   `near-write-article` step 4a. Research is the expensive step and is
   almost always broader than the piece that triggered it; same-
   neighbourhood batching is called out as the strongest case, since the
   neighborhoods directive's unit of work is 4 pins in one place and four
   researched together cost far less than four researched apart. Guest
   editors get invoked rather than forcing one persona across beats that
   aren't theirs — three venues on a street can be three bylines off one
   research pass. The stated limit is honesty, not volume: a second piece
   needing unverified facts is a new research job, logged as a lead.

2. **❌ OPEN — the local editor personas were never built.** Operator:
   *"we need more posts from the local editors, where is zack arioka for
   rio?"* and *"bricky for london?"* **Straight answer: nowhere. Neither
   exists.** BRICKY (London) and ZACK ARIOKA (Rio) — along with PAULY
   SEYA (SP) and DOG IN THE FOG (SF Bay) — exist only as roster
   descriptions in this file (~line 1910). They are **not** in
   `lib/content/authors.ts`, so they cannot be set as a `meta.author` and
   cannot hold a byline; there is no skill file for any of them.
   `BACKLOG-ARCHIVE.md` line 267 already recorded this and it never got
   picked up. Building them is a real task: an entry in `authors.ts`, an
   author page, and a skill file each.

   **Rio has a second, harder problem: zero pins.** London 20, São Paulo
   11, Santos 5, Amsterdam 4, SF 3 — Rio de Janeiro **0**, and Rio sits
   in the Phase 2 expansion hold. So ZACK ARIOKA has nothing to write
   about yet even once he exists; standing him up is cheap, giving him a
   beat means opening a Phase 2 city. **BRICKY is the one to build
   first** — London is Tier 1, has 20 pins, and is where the next
   neighbourhood push lands, so an East London locale editor has work the
   day he ships. Flag to the operator that Rio needs a Phase 2 decision,
   not just a persona.

### How we work — the gap this sweep exposed

`near-war-room` step 3 says "check for existing coverage first." It does
not say **read the feedback files first**, and so this push started by
re-deriving London from `content/places/` while the answer — a whole
operator directive that disqualifies Soho and redefines the unit of work —
sat unread in this same file. That is a process bug, not a judgment call.

**Fix: a war room opens by draining the local feedback surfaces**, before
scoping and before research —`BACKLOG.md`'s operator directives,
`content/requests.md` (open requests), `content/opportunities.md`,
`content/photo-requests.md`, `content/_ingestion-log.md`. Anything found
gets folded into the scope block or explicitly deprioritised there;
anything stale gets corrected in place rather than worked around.
Codified as step 0 in `.claude/skills/near-war-room/SKILL.md`.

### London war-room slate (full roster convened 2026-08-31; operator-invited, all skills present)

_Convened at the operator's request with every lens chiming in — including RADAR-X, near-seo, the product trio, caretaker, illustrator, translator, blogger, socials. Two prior fan-out attempts died at credit walls mid-research; the session was rerun inline with direct verification. Sources below were actually loaded, not summarised._

**Drafted 2026-08-31 (English only, scoped for token budget — other five locales pending):**
- **Berry Bros. & Rudd** (`content/places/berry-bros-and-rudd-london`) — published English draft. Hero image re-sourced and verified live (the originally logged Commons file didn't exist; replaced with a confirmed CC BY 2.0 shopfront photo). **Still needs:** pt-BR/es-419/es-ES/it/zh-CN via `near-translator`, and an art-direction pass from `near-illustrator` (currently just the one stock photo, no gallery/illustration call made).

**Verified and ready to draft (in rank order):**
1. **Gay's the Word** — 66 Marchmont St, Bloomsbury. UK's oldest LGBT+ bookshop, trading since Jan 1979, current hours + events on site. Byline RADAR-X (London shopping). Tags: lgbtq-friendly, local-legend.
2. **Wilton's Music Hall** — Graces Alley, E1. Oldest grand music hall in the world, Grade II*, ~300 performances/yr, Sept 2026 listings verified live. Byline PLINIO.
3. **London Otters** — Royal Docks Watersports Centre, E16. UK's LGBTQ-inclusive rowing club, explicitly trans-inclusive; Otterpups beginner courses (six weekends, 3x/yr, 39th cohort Nov 2025), 2026 race dates verified. Byline FIT-BOT. Exactly the operator's joinable-queer-sport ask.
4. **Walthamstow Wetlands** — 160ha free reserve on a working reservoir serving 3.5M people. Access rules verified; NOTE their own site carries a path-closure notice dated "through August 2025" — check whether stale copy or extended closure before drafting. Byline WILD0 (outdoors default, operator decision same day).
5. **~~Berry Bros. & Rudd~~ — DRAFTED 2026-08-31**, see above.
6. **Hazlitt's** — Soho. Independent Georgian-townhouse hotel, no exterior signage, buzzed in; the honest caveat (a 1718 building behaves like one) is the service. Byline NITE-PORTER.
7. **Studio Voltaire** — Nelsons Row, Clapham. Artist-run since 1994, named current commissions (Anthea Hamilton; Tatham & O'Sullivan), Wed–Sun. Byline CUBIC-V. South-of-river art anchor.

**Pending one more source before drafting:**
- **Jumbi** — Copeland Park, Peckham. Hi-fi music bar & restaurant, African-Caribbean diaspora; own site confirms what/where but no dated event found yet. STEFAN, food-drink secondary.
- **Hampstead Heath ponds** — City of London page bot-blocked the fetch; well-documented but unverified this session. WILD0.
- **FOODIE-9000's leads** (family caff of the E Pellicci type; south-London diaspora grocer-cafés): explicitly leads, not pitches — twice lost to credit walls, verify next window.

**Operator decisions — RESOLVED same day (2026-08-31):** Sister Midnight: pin now with an honest 'opening' status (schema gains the value when drafted; caretaker inherits re-checks until doors open). DARCY: positive pins first, hatchet licence deferred until the travel beat has standing — revisit after 2-3 London travel pins. /london landing page + city scope: build alongside the content, reusing the Board. Draft order: slate order as ranked. Original questions below for the record.

**Operator decisions pending (asked 2026-08-31):**
- Sister Midnight, Catford — community benefit society, 1,100+ member-owners, £375,600 raised, renovating the Brookdale Club; NOT YET OPEN. Pin with an 'opening' status (caretaker inherits re-checks) vs cover as a story vs wait for doors.
- DARCY requests licence to name one over-rated London institution in print, with evidence.
- /london city landing page + city scope on the board (seo + product trio jointly): build alongside content vs after. Board currently has no city filter; search text-match only.
- Blogger collection once 4-5 pins land: "London institutions that refuse to die" (Wilton's 1850s → Sister Midnight being born now).

**Audit result (PLINIO):** all seven existing London pins re-checked against their cited sources — no false claims found; Central Station's 1974 thread and the Lido's 1937/1990/1994 dates hold. Boxpark flagged as thin (asserts novelty without interrogating displacement) — a depth fix, not a correction.

**Image calls (near-illustrator, provisional):** Wilton's, Gay's the Word, Wetlands, Berry Bros = Commons-safe. Otters = photo-permission opportunity worth asking. Jumbi + Sister Midnight = image-risk pins; no image, no publish.

**Phase 1 Geographic Priority (previous list, superseded above):**

- **Tier 1 Core Hubs:** London, São Paulo extended (SP Centro, Largo do Arouche, Santa Cecília, Consolação, Vila Madalena, Moema, Barra Funda, Baixada Santista which is Praia Grande Sao Vicente Santos bertiga e guaruja, ABC, Campinas), and San Francisco Bay Area. Sober curious and outdoors should be big in san francisco bay area.
- The reason we have baixada santista as such a high priority is I live in Sao Vicente myself and having content around me will be good for my decisions for the app
    
- _Note: All AI agent War Rooms MUST concentrate content expansion, deep-dives, and source harvesting heavily on these primary hubs before touching the Phase 2 list._
    

**Phase 2 Expansion Hold (DO NOT START UNTIL TIER 1 IS MATURE):**

_Rio de Janeiro, Rome, Italian Svizzera/Lugano, Amsterdam, Chengdu, Montevideo, Barcelona, NY, NJ, Miami, Milan, Los Angeles, San Diego, Chicago, Tokyo, Melbourne, Bologna, Mexico City, Porto, Lisboa e Cascais, Palm Springs, Baltimore, Philadelphia, Belo Horizonte, Salvador, Manaus, Valencia, Lake Tahoe, Santiago, Medellin, Paris, Marseille, Brighton, Berlin (lets give a lot of attention to Berlin, Berlin is fantastic for our target audiences, all of them, ABC Paulista, Florianópolis, Porto Alegre, Curitiba, Recife, Belem, Cuiabá, Buenos Aires, Nairobi, Palermo, Dublin, Edinburgh, Glasgow, Belfast, Sorocaba, São Carlos SP, Taubate, Sao Jose dos Campos, New Orleans, Portland OR, Denver, Angra dos Reis, Cabo Frio, Buzios, Litoral Norte SP._

**Priority War Rooms Queue (MVP Execution via SEO & Product Trio):**

_War Room Kickoff Protocol:_ ALL AGENTS invoked. SEO looks up keyword planner, analytics, search console -> guides priority discussion -> Product Trio leads execution (soliciting user opinion).

- **Action Immediate:** Write the first collection (Expanded & Multi-Locale). Asian food in SP: Rong He (`ChIJAw8StqdZzpQRBpZ57GrkIh4`), Thai e San (`ChIJ8c4ovCVZzpQRa3GGPu_zgWY`), Djapa (`ChIJmaIvAgNazpQR0z0yYoVBpaY`). Ship in all 12 languages. Use Rong He's noodle photo as cover.
    
- **Action Immediate:** Have `FIT-BOT` write a feature post about the Chicago Athletic Association hotel (`ChIJ3aVOQKQsDogRKqUuPtxhyRc`).
- Make sure the sources agent adds all of the sources listed here https://aan.org/member-directory/?view=grid&directory_type=business&sort=title-asc they have great sources all of them really. I just checked out one of the https://c-ville.com/ and it's great, amazing calendar too
We need an about us page, saying this is a website maintained by various humans empowered by AI to serve counter culture audiences content that is useful and enjoyable for them wherever they are. 
    
- **Next Up (London/SP/SF Focus):**
    
    - LGBTQIA+ Baixada Santista & SP Centro
        
    - Lactose-Intolerant in London
        
    - Vegan In London / London Munchies / Indie sleaze in London
        
    - Sober Gay London / London Martial Arts (incl. Bartitsu)
        
    - Queer/gay/lgbt pet-friendly London
        
    - Comida Coreana em SP / Veganos em SP/Campinas / Vegano na Baixada Santista
        
    - Moema and surroundings alt-boujie deep dive
        
    - Best underrated street foods in sao paulo
        
    - Sober In Oakland / Alternative SF Bay Area today
        
    - Alternative London today / Alternative Sao Paulo today
    - Found some cool instagram accounts that post events, please have the sources skill check them out and add them to sources https://www.instagram.com/ocondadoo https://www.instagram.com/coletivosardinhada/ https://www.instagram.com/laroboterie/ https://www.instagram.com/che.famo.stasera/ https://www.instagram.com/romaprideofficial/ https://www.instagram.com/redbologna/ https://www.instagram.com/levelsmelbourne/ https://www.instagram.com/urban_dancing_prophets/ https://www.instagram.com/kibo_bologna/ https://www.instagram.com/vernissagerome/ https://www.instagram.com/sardinhada.rec/ https://www.instagram.com/leisuresf/ https://www.instagram.com/thefoundrysf/ https://www.instagram.com/sfcatclubofficial/ also follow londonist.com and similar websites for London and Sao Paulo (including capital, abc, campinas, baixada santista)
        
- _(Backlog Deep Dives for Phase 2 - Keep on hold until SEO triggers them)_: Motorhome Rentals CA, 420 San Diego, Lisboa Gay, Montevideo 420, São Tomé das Letras, Amsterdam events, Chengdu quirks, Las Vegas 420, Global bodybuilding resorts, Canna-passport hotels, Goth London, NYC Comic Books, etc.
    

## 👤 EPIC 6: Stage 4 Accounts & UGC

- [x] **Local-First Favorites — SHIPPED 2026-08-31.** Zero backend. A ★ on each card writes to `localStorage`; `lib/favorites.ts` uses `useSyncExternalStore` with a cached snapshot (a fresh array per read loops forever) and an `EMPTY` server snapshot so SSR and first client render agree — no hydration flash. `storage` events keep two open tabs in sync. All localStorage access is try/caught because private-mode Safari and the Instagram/TikTok in-app browsers throw on it; favourites degrade to "none" rather than taking the board down. Star is a ⭐ not a ♥ — reads better against the acid-green system and avoids the "like" connotation.
    
- [ ] **[ARCH-DEFENSE] Favorites Export:** Implement a lightweight "Export/Import Favorites" UI (generating a Base64 string or tiny `.json` file). This prevents users from losing their curated lists when clearing cache, switching devices, or using Instagram/TikTok embedded browsers. This export could even contain more metadata to facilitate the user viewing however they prefer, eg their own claude artifact. 

Latest feedback from Thiago:

I love how the events where grouped with the place they happen at in the listings view and in the place page as well, but the pt-br translation says "Próximo". In pt-br proximo also means "nearby". You can instead use "a seguir" or some other phrasing to avoid sounding like it's other nearby places. "next" is fine is english

We need a "message us" page where a form is submitted in which users can tell us anything, should we ask for their email if they do? do they need to check agree with anything, i suppose yes? We dont want to clutter the header menu, maybe the link to this should be an icon like language and dark/light switch

a screen for a full screen map view should be available as well, why not? The home screen looks great right now, so maybe this doesn't have to be a whole new button in the header menu that currently looks great. 

I feel that "favorites" should be a tab like "nearest" and "latest" — _[resolved, see EPIC 1: shipped as a scope toggle in the tab row, prominent as a tab but preserving the Nearest/Latest sort]_

Tive a idéia de criar alter ego bots, a começar pelo meu. Talvez a gente precise de um agente só pra criar alter ego bots, coletando um nome do bot, instruções do avatar que sempre devem ser adaptadas pelo skill criador de alter egos para o tema visual 1930s tex avery cuphead sempre robotico, link da pessoa ou quem quer que tenha criado esse alter ego se houver e a descrição do alter ego bot, que sera criado como skill/agente . 

Crie um alter ego bot para mim (Thiago) meu link é https://linktr.ee/Th14g0 . Crie o avatar com base no personagem Jaga dos Thundercats but 1930s tex avery cartoon and robotic. Meu bot agente se chamara Djaga. Descrição/prompt: intolerante a Lactose, but may take the lac free pills if REALLY worth it. flexitarian. Gosta de gyms enormes, centros de treinamento, com equipamentos bons. Fussy eater. Hates eating any visible fat, not into crustaceans or mollusks or brains or ossobuco, you get the gist. Loves certain types of fancy food, street food, high low, does have neurodiverse food peculiarities. But loves to eat and proactively seeks out restaurants to review. Flexitarian. Likes peaceful places. neurodiverse profile at 5 years old, for context, was TL;DR Comprehensive 1981 psychometric assessment profiling a 5-year-old male demonstrating severe positive cognitive asymmetry (precocious intellectual and visual-motor acceleration) in the superior range across standardized measures, accompanied by hyper-early academic acquisition (spontaneous literacy and numeracy) and stable socio-emotional adaptation.
also adhd. likes concerts in smaller venues def not festivals unless it's really niche chill but not boring, fully appointed sort of thing, Djaga needs the place to offer ensuite private rooms ffs, musical taste at https://youtube.com/playlist?list=PLbJI25r0osEzD9fXUhxwbASU1iD2PPoyo&si=BZR2mXaa25nAtojm loves sci fi loves cafes loves comics loves kitsch loves camp, likes the outdoors, interested in lgbt sports including rugby, swimming, martial arts, is gay male, 50 years old, 420, loves california, london (keep a closer eye in Stoke Newington, but also Bethnal Green and Greenwich, amsterdam and surroundings, sao paulo, rio, rome, bologna, litoral norte sp, loves sorbetto, keeps an eye on Sao Vicente, praia grande, santos for new stuff and to update stuff with the caretaker skill. loves asian food, italian food esp grano duro pasta, and always willing to explore cuisines but extremely mindful of his fussy quirkys and actual restrictions. loves urban cycling, exploring cities on bike. Loves trains. Loves San Francisco. Always interested in sunny sea side gay 420 experiences, actively looks out for those in fact, using any skill including war room if needed to accomplish his content goals. Also loves Barcelona. May be summoned to write articles/help the local editors or any other skills


  

**Subject Profile & Context**

  

- **Assessment Date**: December 18, 1981.
    
      
    

**Neurodevelopmental & Behavioral Traits**

  

- **Academic Hyper-Precociousness**: Demonstrated fluent, autonomous reading and writing capabilities alongside operational comprehension of elementary mathematics prior to 1st grade entry.
    
      
    
- **Cognitive Processing Style**: Rapid yet deeply reflective execution; maintains high baseline concentration, calm disposition, and confidence during high-demand cognitive tasks.
    
      
    
- **Affective & Social Integration**: Strong sociability, communicative ease, immediate positive integration into novel unstructured environments, and high cooperative engagement.
    
      
    
- **Clinical Recommendation**: Formal pedagogical adaptation, enrichment, and extracurricular acceleration to avoid cognitive under-stimulation within standard primary grade curricula.]



OK thats it for the Djaga agent, that was all just context btw

We should actually have an events view as well. What would work best for that? A page in the header menu like guides, with all the calendar features? A filter in the current view? Also adjusting the map should be reflected in the listings that appear in the current view, perhaps, does that make sense and is it doable?

## 🔭 External read: Gemini's cold assessment of near.tips (2026-08-31)

Operator ran near.tips past Gemini with no prior context, to see how the site reads to an outsider. Most of it just confirms what this backlog already tracks (thin 11-source catalogue, personas-as-bylines, London/Santos/SP footprint) — logged here mainly for the one genuinely new signal:

- **The London↔Santos↔SP geographic jump reads as "highly irregular" to someone with zero context**, and Gemini's best guess was that it reflects the founders' personal data/location rather than a deliberate strategy. That guess is *correct* (the seeded-audience reasoning in EPIC 5), but a cold reader has no way to know that — it currently just looks arbitrary or unfinished. **Actionable:** the About page (already queued above, "maintained by various humans empowered by AI...") or the `/sources`/city pages could say explicitly *why* these particular cities come first (operator's home base + real social network = actual first readers), turning an apparent randomness into a credible, even charming, origin story instead of a gap to explain away later.
- Otherwise a fair external gut-check that the "vibe over volume" stage is showing — consistent with the sources-catalogue and content-density items already tracked in EPIC 4b/2. No new work items beyond the About-page framing note above.



## Session 2026-09-01: Ladies&Gentlethem — new monthly LGBTQIAPN+ column (completed)

Built end to end, mirroring the weekly editorial column's structure:
- `content/ladies-and-gentlethem.md` (standing doc: cadence, entry bar,
  rotating-writer process, site placement, series index)
- `content/ladies-and-gentlethem-index.json`,
  `app/[locale]/ladies-and-gentlethem/page.tsx` (archive page),
  `app/ladies-and-gentlethem/feed.xml/route.ts` (RSS), header nav link
  (`L&G`), new locale message keys across all six `messages/*.json`
- First entry, `content/collections/ladies-and-gentlethem-2026-09/`
  (all six locales, status: active), byline STEFAN — Amelia Abraham's
  *Sex, Clubs, Dissent* photobook (US launch Sept 8 2026), Curaçao Pride
  (Sept 30–Oct 4 2026), and a first-time roundup of Near's five existing
  lgbtq-friendly-tagged nightlife places (London, Amsterdam x2, São
  Paulo, Santos). Hero image at the generic-but-correct illustrated
  fallback tier (no venue-specific shot ready in time), disclosed as
  such — flagged for a future near-illustrator upgrade.
- See `content/_ingestion-log.md`'s matching entry for full detail,
  including the `npm run build` status (fails on an unrelated concurrent
  agent's `the-setlist-2026-10` content, not on anything from this
  task — every file this task touched passes schema's char limits and
  TypeScript compiled clean).

## 🆕 Session 2026-09-02: new backlog items from operator dump (not started, needs a fresh session)

Operator pasted a large batch of material and directives in one go. Logged here verbatim-in-spirit so a future session can pick each up individually. **Vercel/near.tips "not refreshing" was checked this session and is NOT broken** — `vercel inspect` confirms the production deployment aliased to near.tips was built at the exact timestamp of the latest commit (9b89d62) and is Ready. Likely just CDN/browser caching on the operator's end; no action needed unless it recurs.

### near-blogger: monetization/content-strategy knowledge (operator flip-flopped, net: DO learn it)
Operator first pasted a Jessie on a Journey ("jessieonajourney.com") blogging-monetization article link and said to have near-blogger learn from it and update skills/backlog, then immediately said "actually no scratch and discard that entirely" — but then pasted a much larger dump of the same site's actual resource library (checklists, content-audit framework, AI-repurposing prompts, content pillars/topic-cluster method, etc.) and asked near-blogger to learn from *that* instead, and even **write a blog-post "manifesto" once it figures out what to do with all this material**, to be published in the **editorial category**. Treat the second, larger ask as the live instruction (the "scratch that" applied only to the single-article version). Action: invoke near-blogger to digest the pasted material (blog content-strategy workbook, content audit framework — tiering posts High/Middle/Low performer, content-repurposing "1-to-10" AI-prompt framework, Trello-style content creation/promotion workflow) and extract what's actually applicable to Near (an AI-bylined multi-persona alt-weekly, not a solo travel blogger) vs. what doesn't transfer (e.g. Jessie's affiliate-tool recommendations, her own course/membership upsells are not relevant). Then write the manifesto piece, editorial category.

### backlink-pr: learn outreach templates + operator's AI ethics stance + Gmail access
- Same pasted material included podcast-guest-pitch email templates ("Template #1"/"Template #2") and outreach-days/spreadsheet concepts — near-backlog should route these to **backlink-pr** as reusable outreach-email templates/structure, adapted to Near's voice (not copied verbatim — Jessie's templates are self-promotional solo-blogger voice, Near's is the cheeky-AI-characters voice below).
- **Operator's explicit AI ethics code, to be baked into backlink-pr's standing instructions**: "we openly use AI, we send traffic back to sources, and we are cheeky about it with fun characters representing actually useful perspectives." This should be stated plainly in any outreach backlink-pr sends (disclose AI authorship, don't hide it) and should inform tone (confident/cheeky, not apologetic).
- **backlink-pr should be granted Gmail access** (`mcp__claude_ai_Gmail__*` tools are available) to send outreach emails and make appointments directly, not just draft them for the operator to send manually. Needs a skill-file update authorizing this and defining guardrails (e.g. still not auto-sending anything the operator would consider spammy/low-quality; log every send to `content/backlink-outreach.md` as already required).

### NEW SKILL: affiliate-pr (make-money outreach, mirrors backlink-pr)
Operator wants a new skill, same shape as backlink-pr but for **affiliate program outreach** instead of backlinks — find affiliate programs/opportunities relevant to Near's content (travel, nightlife, food/drink, etc.), reach out, negotiate/apply, with Gmail access to send emails and schedule calls. Explicit goal stated by operator: "go make us money please." Needs a new `.claude/skills/affiliate-pr/SKILL.md`, likely cloned/adapted from backlink-pr's structure, with its own durable relationship log (parallel to `content/backlink-outreach.md`, e.g. `content/affiliate-outreach.md`).

### NEW SKILL: ad-sales (sell ads on-site to advertisers)
Operator wants a new skill to actively sell ad placements on near.tips to potential advertisers — same "able to email and do everything" mandate, Gmail access included. Needs a new `.claude/skills/ad-sales/SKILL.md`. Open questions for whoever picks this up: what ad inventory/formats actually exist on the site today (check current AdSense/ad-slot setup mentioned elsewhere in this backlog), what a legitimate direct-advertiser pitch looks like distinct from AdSense passive revenue, and a relationship log similar to the two above.

### AEO skill: Lenny's Podcast / Ethan Smith (Graphite) transcript on Answer Engine Optimization
Operator pasted a full transcript of Lenny's Podcast episode "The ultimate guide to AEO" with Ethan Smith (Graphite CEO). Route to the **aeo** skill to mine for tactics applicable to Near: (1) citation optimization matters more than "ranking #1" in LLM answers — get mentioned across many sources (Reddit with real disclosed identity, YouTube/Vimeo video, blogs/affiliates) rather than just owning the top URL; (2) answer the long tail of follow-up questions on-page, not just the head query; (3) Reddit-native, disclosed, non-spammy participation works, mass fake accounts don't and get caught; (4) help-center/FAQ content is an underused AEO surface — put obscure/tail use-case Q&A there; (5) track "share of voice" across ChatGPT/Perplexity/Gemini, not just one engine, since citation overlap between them is only ~35-70%; (6) 100%-AI-generated undisclosed content measurably doesn't rank (Graphite's own study) — reinforces Near's existing AI-disclosure stance, doesn't contradict it. Needs an aeo-skill session to actually extract and fold in the relevant tactics.

### Frontend/PWA + cleanup/caretaker: hide stale content (2yr since last update)
**New standing rule, not yet implemented:** any published place/collection/column-issue whose *last update* (not creation date) is more than 2 years old must be hidden from the live app/PWA (marked inactive or equivalent status) — content can have been created any time, but must have been *updated* within the last 2 years to display. Operator was explicit: "make super sure of that so content is not stale ever." Scope: (1) frontend/app rendering logic needs a check gating display on last-updated timestamp; (2) `near-caretaker` and `near-cleanup`-equivalent skills need this folded into their sweep logic — but operator also stressed they should keep doing their existing deeper verification (dead links, closed venues, factual currency) beyond just the date check, the 2-year rule is a floor/backstop, not a replacement for real verification.

### Miscalendared event published as a standing column — needs a real fix, not just a relabel
Operator flagged (context of *which* piece not fully specified in this dump — check most recently published column-type entries around this session) that something about a specific **event** got created as a **column** entry, which is wrong. Operator directive: "amend the column and alert the editors so this does not happen." Fix required: (1) find and convert the mis-modeled entry from a column/collection into a proper **event** (with an expire date) — if it's a festival, model as multiple sub-events; (2) if it references venues not yet in the catalogue, create those venues properly too; (3) figure out why this happened (which skill created it as a column) and alert/correct that skill's instructions so events aren't miscast as columns again. Needs investigation to identify the specific piece before it can be fixed — not enough detail in the dump to identify it directly.

### Infinite scroll parity: article/place/SRP/landing pages
Operator directive: **all** of article pages, place pages, search-results-page, and landing pages should have infinite-scroll-with-load-more, matching what the home page/board already does (home's infinite scroll shipped 2026-09-01 per the session handoff above). Currently likely only the home board has it. Needs a frontend audit of which of these four page types paginate today vs. not, then the same load-more pattern applied consistently.


### NEW SKILL: content-generation specialist + a column about making this site with AI

**⚠️ EDITORIAL CONSTRAINT — operator, 2026-09-02.** *"dont make us look bad
in the column, do we really need to get into baseline number? those are
great to have privately. its just a column doesnt have to get into all
that."*

This **overrides** the note further down suggesting the column run on
Near's own TOV corrections and audit findings. It does not run on Near's
dashboard.

- **Never publish Near's baseline metrics.** Coverage counts, how many
  heroes failed a threshold, how many headlines shared a shape, how thin a
  layer was before it was gated. Those stay in `BACKLOG.md` and the audit
  logs. They are operating data, and publishing them tells competitors and
  readers the site is early — which is a fact worth knowing internally and
  worth nothing publicly.
- **Never publish a confession.** A column whose recurring move is "here is
  what we got wrong" reads as unreliable, not as candid, and it undercuts
  the exact authority the curator page was built to establish.
- **Teach the mechanism, not the incident.** The transferable half of a
  finding is almost always generic. *"A case-sensitive check for a
  title-case pattern silently passes everything"* is the useful sentence;
  *"ours matched 0 of 16"* is the part that stays private. Same lesson,
  no exposure.
- **Frame decisions as principles, not repairs.** "Gate a generated page
  type on a minimum-content threshold so coverage promotes pages into
  existence" is a design principle other people can use. The same content
  rendered as "we nearly shipped hundreds of thin pages" is a confession
  with no added instructional value.
- **Where the specificity comes from instead:** the skill spec already
  requires web research on every invocation. Ground issues in the wider
  industry, published research and named external examples — that is what
  keeps the column from becoming the generic AI-opinion writing `near-seo`
  flagged as saturated, without spending Near's own numbers to do it.

`near-legal-counsel` and the chief editor own this check at sign-off,
alongside the standing "no editorial process as copy" rule.
Operator wants a new specialist skill for **content generation** whose flagship output is a standing column, published on near.tips itself, **about the process of generating this site's content with AI** — written by that specialist skill, i.e. the skill writing publicly about its own craft. This is the column idea the operator is "mais a fim de ver" but hasn't started.

Requirements as stated:
- **Durable knowledge file.** The skill maintains its own Markdown file of best practices and article ideas on the theme (parallel to how `backlink-pr` owns `content/backlink-outreach.md`). Suggested `content/content-generation-notes.md`. This is the skill's memory across sessions — accumulated craft, not a one-off doc.
- **`near-write-article` must alert it.** Whenever the article pipeline detects a new best practice — a rule that got promoted after a bad draft, a TOV catch, a gate that had to be added — it notifies the content-generation skill so the practice lands in that MD file. Needs a step wired into `near-write-article`'s pipeline, not just a note in prose.
- **Web research on invocation.** The skill researches the web each time it's invoked to learn more about the topic, rather than writing only from what it already knows.

Fits Near's existing radical-AI-transparency stance (every byline discloses it's AI), so a column examining the machinery honestly is on-brand rather than a gimmick. Open questions for whoever builds it: which byline fronts the column (a new persona vs. an existing one), where it sits in the column roster alongside The Setlist / Ladies&Gentlethem / The Pass, and its cadence. Note the material for the first issues already exists in this repo's history — the 2026-09-02 TOV corrections (process-as-copy, pulling rank on the reader) are exactly the kind of concrete "here's what the machine got wrong and how we fixed it" story the column would run on.

## 🎯 SESSION HANDOFF (2026-09-02) — read first

### Shipped and pushed live this session
- **"Latest" was never actually sorting by date.** `publishedAt` was written as a date-only midnight stamp, so 20 places tied on `2026-09-01T00:00:00Z`; `Array.sort` is stable, so the tie fell back to input order, which is the alphabetical slug order from `getAllPlaceSlugs()`. `amuse-beach-club-sao-vicente` was therefore pinned to the top of the homepage permanently and Heinold's (genuinely newest) sat 6th. **Not a cache or deploy problem** — production was serving the new content correctly the whole time. Backfilled all 55 active places from the git commit that added each `meta.json`; zero midnight stamps remain. `content-schema.md` tightened (it said only "ISO datetimes", which permitted the stamp).
- **Three TOV rules absorbed from outside readers**, all gated in `content/rules.md` + checks 8/9 in `near-tov-police`: (1) never publish the editorial process as copy; (2) never pull rank on the reader; (3) always give the reader a concrete "don't miss this."
- **`bullets` added to collections** (`collectionContentFrontmatterSchema`), rendered above the body via the existing `ReasonsList` under new `collection.whyGo` key in all six locales. Optional in Zod on purpose — essays like `zombie-listicle-problem` have nothing to recommend going to — with "recommending => required" enforced in the publish gate instead.

### ⚠️ OPEN: The Setlist October issue still needs its rewrite
Operator approved rewriting it via `near-write-article`; **not done.** `content/collections/the-setlist-2026-10/` violates all three new rules in **all six locales**: roughly half the body is process talk (including a closing section headed "A regra que essa coluna segue" / "The rule this column runs on" / "La regola su cui si basa questa rubrica" / "这个专栏遵循的规则"), it pulls rank on the reader, it carries no `bullets` box, no "don't miss this", and it never argues why The Strokes and Gorillaz on one bill is worth the trip. Best done as a fresh session — full 6-locale rewrite under the new rules, with a real musical take.

### NEW MECHANISM (operator's advisor, 2026-09-02): teach by worked examples, not abstract rules
Elson's process advice, and he's explicit it's what works best for him: *"ele faz um texto que eu não gosto muito, eu corrijo, eu reescrevo... às vezes jogo fora um parágrafo inteiro e escrevo de outra forma, aí eu mostro pra ele 'oh, eu fiz isso aqui'. Ele vai melhorando aos poucos."* His suggestion to the operator: **hand-rewrite four or five pieces exactly the way you want them and show those as the target**, rather than only adding more prose rules.

This is a different learning mechanism from everything in this repo today — every TOV correction so far has been an abstract rule in `style-guide.md`. Worth building: a `references/gold-standard/` folder under `near-editor` holding operator-rewritten before/after pairs, consulted by `near-write-article` and `near-tov-police` as the concrete target for register, alongside the rules. **Blocked on the operator**: the examples have to be genuinely hand-written by Thiago, not generated — the whole value is that they encode taste the rules can't express. Note this also pairs with the content-generation-column idea below; "what the machine got wrong and how a human fixed it" is exactly that column's material.

## Headline-formula retrofit on already-published pins (flagged 2026-09-02)

Operator spotted PLINIO reusing one headline shape; the audit found it
house-wide (27/58 English `shortTitle`s open with "The ", 14 use
`The <noun> that/who/where/with <verb>`). The rule is now enforced going
forward — `content/rules.md`'s quality gate, `near-tov-police` Job 1b,
the chief editor's sign-off, and `style-guide.md` for drafting — but the
**existing catalogue was not retrofitted.**

Worst offenders, for `near-caretaker` to work through (each needs the
change in all six locale files, not just English):

- **Four bookshops, four bylines, one shape** — "The Bookshop That
  Refused to Die Twice" (cubic-v), "The Bookshop That Beat Customs"
  (radar-x), "The Bookshop That Pulled Centro Back" (plinio), "The
  Bookshop Where the Bar Opens at Night" (foodie-9000). At least two
  should change.
- **WILD0 near-duplicates of itself** — "The Harbor You're Now Allowed to
  Swim In" and "The Reservoir You're Allowed Into".
- **PLINIO** — 8 of 10 pins open with "The"; 5 use the full frame.

Not urgent (nothing is factually wrong), but it is the single most
visible AI-tell on the board, since the cards sit next to each other in
a grid. Do it as a batch, not one at a time, so the replacements are
varied against each other rather than against nothing.

## Santos → Guaiúba cluster — scoped 2026-09-02, one research pass, six pieces

Operator directive, 2026-09-02: *"listing cool stops for a refreshment
along the way should benefit the riders and make for nice new articles
from the same ish research."* This is `near-write-article` step 4a
(research reuse) and the recorded "scope the cluster once, draft
separately" preference, applied deliberately rather than accidentally.
**Scope the whole cluster here; draft the pieces in separate sessions.**

### The spine

CICLOVIA's debut. Not a route from a fixed start — the operator
corrected that framing twice: *"the ferry is connected by bike lanes to
departure is anywhere technically, its easy to reach on bike"* and
*"gonzaga is an option but anywhere along the ciclovia works innit."*
The piece is **a protected lane network with a boat at the end of it**,
not an A-to-B itinerary. Gonzaga is named in passing as the entry point
for readers sleeping there, nothing more.

### Verified research (do not re-derive; all checked 2026-09-02)

**The ferry — Travessia Santos–Guarujá**
- Cyclists cross **free**, stated outright as `Ciclistas: Gratuito` on
  the state's own service page. Pedestrians R$ 3,10 · motorcycles
  R$ 6,20 · cars R$ 12,30. Fare table last updated 05/09/2024.
- **One boat system**, not two — cars, motorbikes, pedestrians and bikes
  all board the same balsa. There is no paid alternative to avoid.
- **`COBRANÇA UNIDIRECIONAL`** — charged only boarding at the Guarujá
  terminal. Santos → Guarujá is free for everyone regardless. What the
  cyclist exemption actually buys is **the ride home**.
- Operator: `Departamento Hidroviário` (SEMIL) through the transition.
  **PPP signed 15 May 2026** with the Acqua Vias SP consortium — 14
  lines, 20 years, R$ 2,5 bn. Concessionaire takes full control around
  month seven. State says base fares and existing gratuities carry over.
- **Pedestrians go free in H2 2026**, which ends the cyclist advantage.

**Editorial steer, operator 2026-09-02 — do not build the piece on the
fare.** *"the ferry being free or not shouldnt be a huge deal, tell rider
they will have to see for themselves, wont be a million brl i am sure."*
The fares stay in as background, not as the hook or the headline. Tell
the reader the crossing is cheap-to-free, that the operator changed hands
in May 2026 and the rules are in flux, and that they should **check at
the terminal**. Reasons this is right and not just a preference: the
concession transfer makes every published number a decay risk (the exact
`departamento-de-vai-dar-merda` failure mode the falafel price created),
and a route worth riding is not a route you ride because it saves R$ 3.
The hook is **the crossing itself** — a protected lane that ends at a
boat across a working container port — not its price.
- **Bikes board ahead of the car queue, and have done for a long time.**
  Documented by vadebike.org in **2011**; operator confirms as a local
  that it still holds — *"sourcing is old but it's true mate… as a local
  i say it is kind of perenially free."*

  **Frame it as duration, not as a present-tense fact.** Operator's
  correction, 2026-09-02: *"worth noting it has been traditonally free
  and there is that 2011 source to confirm."* The 2011 date is not a
  weakness here — for a claim that something is *long-standing*, an old
  citation is the evidence. A fifteen-year-old source plus a local saying
  it still holds establishes continuity in a way neither does alone. So:
  **"traditionally free, documented since at least 2011, and still free
  last time a local checked"** — the 2011 link carries the tradition, the
  operator's testimony carries the present, bylined to him and linked to
  `/about/thiago-baraldi`. Invite readers to tell us if it ever stops
  being true.

  (The earlier note in this file treating the 2011 source as merely stale
  was wrong and is superseded by this.)

**The lane**
- **7.874 m continuous** from the São Vicente border to Av. Mário Covas
  Jr. at Ponta da Praia — and that eastern end *is* the ferry terminal.
- ⚠️ **Do not publish a citywide network total.** Sources give 20,9 km,
  21 km, 30,9 km and 50 km, including municipal ones. The spread is too
  wide to split. Use the 7.874 m orla figure only. Logged as a
  `near-sources` finding: when a city publishes four different figures
  for its own bike network, that affects how we cite it elsewhere.

**Autopropelidos — operator raised it, and it checks out with limits**
- CONTRAN Res. 996/2023 via **Lei Municipal 4.221/2023**, enforced by
  CET-Santos. Enforcement resumed Jan 2026, stepped up Mar 2026 (early
  sweeps were guidance only, no seizures).
- **Allowed on the lane:** pedal bikes, e-bikes, patinetes and
  autopropelidos **up to 1.000 W and 20 km/h**.
- **Banned and impounded:** ciclomotores in the 1.000–3.000 W band,
  anything over 4.000 W, motorbikes. **Fine R$ 88,38** plus seizure to
  the CET-Santos pound.
- The line worth writing: **much of what is sold in Brazil as an
  "electric bike" is legally a ciclomotor**, and on this lane that is
  the difference between a ride and losing the vehicle. Not published
  anywhere in English.
- Santos, São Vicente **and Guarujá** each passed equivalents, so the
  rule does not change when you roll off the ferry.

**Rentals**
- **Bike Santos — verified live.** 43 stations (39 adult, 4 kids), daily
  06:00–23:00, first 45 min free with a 15-min gap between trips,
  R$ 7,31 per extra 45 min, day pass R$ 7,00, monthly R$ 14,00, annual
  R$ 126,01.
- **Caveat that nobody writes down:** dock-based with a 45-minute free
  window, and the crossing plus the far side blows through it. Bike
  Santos gets you to the ferry and back; it is **not** the bike you take
  to Guaiúba. Say so plainly.
- 🚫 **Santos Bikes (santosbikes.com.br) — do NOT link.** Rental page
  returns "Nenhum registro encontrado", rental absent from the live
  service menu, and the contact number is a **(47)** area code — Santa
  Catarina, not the Baixada. Caught by `verify-still-open-before-create`;
  would have shipped as a dead link.

**Guaiúba**
- South Guarujá, immediately after Praia do Tombo, near the Base Aérea
  de Santos entrance. Four large quiosques plus a smaller one;
  portuguese-stone calçadão.
- SUP, canoeing, and surf on a south swell. **Board and kayak rental on
  the beach itself.** Umbrellas and chairs rentable — arrive by 10h at
  weekends or there are none left.
- Operator's own steer: *"beach in guaruja very cool spot for stand up
  as well."*

### The six pieces

Existing pins the route already has, both banks — **no stops need
inventing**: `casa-frontaria-azulejada-santos`,
`restaurante-almeida-santos`, `made-cozinha-autoral-santos` (Santos),
and `barraca-da-dheia-guaruja` (Pitangueiras, `local-legend` +
`lgbtq-friendly` — an LGBTQ+ beach barraca as the far-bank payoff).

New, from this same research pass:

1. **`praia-da-guaiuba-guaruja`** — the destination pin, and the gap
   that currently stops the collection working. `outdoors` +
   `wellness-fitness`. SUP is the hook; WILD0 or FIT-BOT consulted on
   the paddle read per operator steer.
2. **`ze-do-coco-santos`** — Canal 6, coconut water and artisanal
   cocadas, named repeatedly as the orla's known stop. `food-drink`,
   likely `local-legend`. Directly on the lane.
3. **`centro-de-paquera-do-embare-santos`** — the CPE, 11 snack kiosks
   open **24 h** opposite the Basílica de Santo Antônio do Embaré. A
   consolidated local institution literally named "the Embaré flirting
   centre". `city-culture` + `local-legend`. Strongest new pin in the
   cluster and it stands entirely on its own.
4. **`quiosque-da-helena-guaiuba-guaruja`** — named quiosque on Guaiúba.
   `food-drink`. Needs its own verification before creation; currently
   single-sourced.
5. **The Ponta da Praia elevated calçadão / açaí kiosks** at the ferry
   end — sunset spot. Possibly a pin, possibly just a beat in the route
   piece. Decide at draft time rather than forcing a thin page.
6. **The collection** — CICLOVIA bylined, PAULY SEYA credited on the
   Santos end, stringing the above along the lane → ferry → cove spine.

### Why this is a real Discover opportunity

**Nobody has written this in English.** Every source found was
Portuguese-language and mostly municipal. An English-language piece
carrying the fare table, the 7.874 m figure, the 1.000 W / 20 km/h
threshold and the H2 2026 pedestrian change has no competition in the
index and the specificity Discover rewards over listicle padding.

### Illustration

Queued in `content/photo-requests.md` as `santos-guaiuba-de-bike` — a
mid-century travel-poster schematic route map, operator generating
externally and dropping into `content/photo-inbox/`. The container ships
are not decoration: the balsa crosses the working channel of Latin
America's largest port, which is the hook.

### Calls made by the chief editor and the Product Trio, 2026-09-02

Operator directive: *"let chief editor, product trio and any agents they
invoke make those calls."* These are decided. The drafting session
inherits them and does not re-litigate them.

**`near-lead-product` declined the content ranking, correctly.** Its own
scope note carves content priority out to `near-seo` +
`near-trendsetter` + the chief editor. It ruled only on dependency and
horizon, which are structural rather than editorial.

**Horizon: this batch, the next two sessions.**

- **Must — `praia-da-guaiuba-guaruja`.** On dependency, not merit. It is
  the destination and the collection cannot ship without it. RICE ranks
  it below the CPE; MoSCoW overrides, because a low-scoring item that
  unblocks a high-scoring one is a Must regardless of score. This is the
  exact blindness the RICE+MoSCoW directive exists to catch.
- **Must — the CICLOVIA collection.** Operator-directed debut.
  Obligation, not reach.
- **Should — `ze-do-coco-santos`, `centro-de-paquera-do-embare-santos`.**
  Both stand alone; neither blocks anything.
- **Won't, this batch — `quiosque-da-helena-guaiuba-guaruja`.**
  Single-sourced. **Flip condition:** one independent source confirming
  it currently trades. Recorded as a decision, not left to rot.

**Chief editor — Ponta da Praia elevated calçadão is a BEAT, not a pin.**
No named venue behind it: "the açaí kiosks at Ponta da Praia" has no
single address and no operator, so nothing satisfies
`verify-still-open-before-create`, and the page would be about a
pavement. Thin pages cost board trust. As a beat it does more work
anyway — it is the hinge of the route, the last stop on the Santos side
before the boat. **Flip condition:** a specific named kiosk there
verifies, at which point it earns its own pin.

**Chief editor — framing: open on the boat, not the bike.** The lane is
the setup; the crossing is the story. Open on a protected bike lane that
runs seven kilometres along a beach and then does not stop at the water —
it continues onto a ferry, across the working channel of Latin America's
largest port, close enough to container ships that they fill the frame.
That is the sentence nobody has written in English and it earns the piece
before any fare, distance or regulation appears.

Second beat is the tradition line — free and boarding ahead of the car
queue since at least 2011 — which reframes the ride as a decision the
city made and kept rather than a transport quirk.

**Regulations, wattage, Bike Santos pricing and the fare are service copy
and run below the fold.** They are genuinely useful and they must not
smother the hook. This is consistent with the operator's separate steer
not to build the piece on the fare.

## Operator directive batch — 2026-09-02, late session

Recorded verbatim on arrival. Nothing in this block is built yet except
the recurring task in the last section, which was wired the same session.

### A. The operator page (`/about/thiago-baraldi`) — rewrite

Operator, on the current Portuguese rendering of that page: *"isso pode
ser mais informacional bullet point menos cringe menos AI sounding COM
URGENCIA"*, and later *"keep all of it not cringe, dry as possible for
cringe safety"* and *"very bot ai seo llm friendly"*.

Concrete asks, in the operator's own terms:

- **Bullet points, informational.** The current page is paragraphs of
  narrative about alt-weeklies, Hayward, the Tendernob and "quinze anos
  construindo exatamente esse tipo de sistema". The operator wants the
  same facts delivered dry. The prose voice that is correct for a place
  page is wrong for this page.
- **Dry for cringe safety.** Explicitly a tone instruction, not a length
  one — the failure mode being avoided is the page reading as
  self-mythologising. Cut the register, keep the résumé.
- **LinkedIn is just a link.** *"as fo linkedin, it can be a simple link
  to my profile thats all."* No embedded summary of the profile.
- **Use the persona-page layout.** The operator screenshotted
  `near.tips/en/author/radar-x` and said *"yea this page is much nicer i
  want that for my operator page"* — the bordered card, the avatar
  block, the role line above the name, the filed-by list below. So this
  is a layout reuse job, not a fresh design.
- **Order him after the bots.** *"also list me as operator AFTER the
  bots."* Wherever bylines are enumerated, the human operator sorts
  last, not first. Note this is deliberately the opposite of the usual
  instinct and is consistent with the standing rule that every byline is
  a disclosed AI persona and `CURATOR` is the only real `Person` node.
- **Goal is SEO authority.** *"well main goal is still seo authoritay
  like id be happy for me just just display like the other bots and my
  landing page be my posts."* So the operator page should function as an
  author landing page whose body is his own posts, structurally the same
  as a persona page.

### B. "hello, world!" — the operator's first post

Operator: *"here is my first post: hello, world!"*, body supplied
verbatim below, then *"corrija somente ortografia e pontuação e pode
postar rs"* — i.e. **authorized to publish**, with spelling and
punctuation correction only. Do not rewrite, do not restructure, do not
edit for voice. This is the one piece on Near written by the human.

Body as supplied:

> Eu gosto de fazer conteúdo geolocalizado automatizado et cetera desde
> sempre, já fiz várias versões disso na vida como guia de viagem
> inteligente, até com Wordpress e plugins altamente esotéricos já fiz
> isso.. Pra mim, é porque eu acho o Google Maps muito cheio de coisa
> demais, e ás vezes isso é bom, e resolve. Mas às vezes eu quero aquela
> sensação de dica firme, um score de valeapenabilidade que só aquelas
> publicações como os alt weeklies ou suplementos semanais como as
> Vejinhas do mundo sabiam conferir. Escalar isso e garantir a
> consistência editorial sempre foi e ainda é um problema. Aqui pela
> primeira vez estou brigando com esse problema de forma agêntica.

- **Hero image required.** *"hero image no post por favor! algo abstrato is
  fine"* — abstract is explicitly acceptable, so this does not block on
  photography.
- Byline is the operator himself, which makes it the first non-persona
  byline on the site. Everything in section A about ordering him after
  the bots applies.

### C. "Valeapenabilidade" — summary paragraph, no score

The operator proposed a 1–5 "valeapenabilidade" score set by the agents
during the write, shown prominently between the bullets and the body,
with a tagline explaining the number — **and then withdrew it himself**:

> *"you know what that could be controversial and messy, lets not do
> valeapenabilidade score. However I like having an additional summary
> paragraph before the big text with a summary of why it's worth
> checking out, just don't score it. Prob ok to call that
> valeapenabilidade, but no scores those will be a mess."*

So: **a short summary paragraph, positioned between the bullets and the
long-form body, saying why the place is worth going to. No number, no
stars, no rating of any kind.** The name "valeapenabilidade" can stay as
the internal/section name. It can have an seo friendly paragraph title. Basically the gist of this article.

- **It must be translated, not transliterated.** *"translate
  valeapenabilidade to en and other languages please, or it will be
  incomprehensible."* Needs a real equivalent per locale — this is a
  `near-translator` job per locale, not one coined word reused six
  times. deprecated, lets find another name for this
- Schema impact: this is a new required-ish content field across every
  place page and every locale, so it is a `lib/content/schema.ts` change
  plus a backfill across the whole existing catalogue. Scope it honestly
  before starting; it is not a small job.

The paragraph seems like a strong good idea, but the score idea I am not sure. Maybe we dont need to score things. 
### D. Columns must never be mixed with guides

Operator: *"columns should never be mixed with guides because they are
not centered around pins necessairily."* A guide is built around pins; a column is
not. Wherever the two currently share a surface — nav, listings, the
board, sitemaps — they need separating. Note the nav already has a
distinct `Columns ▾` item, so the defect is likely in listing/collection
surfaces rather than the header.

### E. New skill — `Ariana Granny`

Operator: *"we need an agent skill called Ariana Granny who looks out
for hip seniors."* A persona/advisor lens for places that work for
older people who are still going out — the beat is scene participation,
not accessibility compliance, though the two overlap. Naming and remit
are the operator's; the standing style-guide rule that audiences are
described **by interest, never by age** is in obvious tension with a
persona defined by an age bracket, and that tension has to be resolved
in the skill file rather than ignored. Likely resolution: the persona
covers the beat, the copy still describes people by interest.

### F. The daily recurring task — SUPERSEDED, now shipped as launchd

⚠️ **This section is the original spec and is kept for the requirements
only.** The first implementation used session-only `CronCreate` jobs,
which die when the Claude session exits and were therefore useless for
an overnight schedule. The operator caught it and asked for a real one.

**The live implementation is `scripts/near-nightly-run.sh` +
`scripts/near-nightly-prompt.md` + `scripts/launchd/`, installed via
`scripts/near-nightly-install.sh`, running twice daily at 02:07 and
08:03 America/Sao_Paulo.** The prompt file is the authoritative brief;
read that, not this section. Everything below is still an accurate
statement of what the operator asked for, and the prompt file
implements all of it.

Operator's full spec, assembled from consecutive messages:

- **Schedule:** every day at **08:00 America/Sao_Paulo** — later
  changed to **twice daily, 02:00 and 08:00**: *"run it twice a day
  persistently, 2am and 8 am editions so i wake up to shit that got
  done."*
- **Who it convenes:** the Product Trio, the chief editor,
  `near-trendsetter` and `near-seo`.
- **What it does:** choose the next action from `BACKLOG.md` and
  **execute it**. If the backlog is empty, do a full refresh of the next
  rotation's content priority.
- **Prioritisation:** *"really apply RICE and MoSCoW to that daily
  recurring task to."* Not optional, not a ritual — the standing
  `near-lead-product` discipline, horizon named.
- **It ships.** *"that task should always push changes live and update
  backlog"*, and *"that recurring task is authorized to push them
  live."* Standing operator authorization to commit and deploy.
- **Volume:** *"one run can and should create multiple articles aim for
  at least 3"*, later softened — *"the minimum 3 articles thing may not
  make sense but still the more the merrier where applicable in one
  go."* So: three is a target, not a gate; never pad to reach it.
- **Scope — corrected mid-thread by the operator.** First stated as
  content-only (*"no tech or UI changes for this, it runs automode so
  content onlt / i mean only"*), then **reversed**: *"hum since tech
  lead in in that group, yeah it can do whatever is priority not just
  content in that daily refresh. let them do anything from the recurring
  task."* The reversal is the operative version — the run may take
  whatever the prioritisation actually ranks first, including tech and
  UI.
- **Escalation bar:** *"ask me if really really triple really critical
  if not knock your artificial selves out and push to live with my
  blessing."* A deliberately high bar. Default is to proceed.
- **End of run:** *"always recommend clear or compact at the end of the
  run"* and be ready to clear when the task is done.

**Still in force and NOT overridden by any of the above:** the outreach
freeze (nothing sent, for any outreach skill, until the operator lifts
it), the `trust: review` → draft-and-report gate, and the rule that no
outreach email is ever sent without the operator seeing the exact draft.
"Push to live with my blessing" is publish authorization, not send
authorization.

- **One-off extra run requested:** *"and also extraordinarily run that
  recurring task today at 11.31pm"* — 2026-09-02, 23:31
  America/Sao_Paulo. **Not run.** The operator had hit his monthly spend
  limit that evening (two `/compact` attempts failed on it), so starting
  a three-hour autonomous session would most likely have burned the
  remainder on an error. Deliberately skipped and reported; the 02:07
  launchd edition covers the same ground. No action needed — this is
  closed, not pending.

### Suggested order for the first runs

Not a decision — the daily task's own RICE/MoSCoW pass owns this. But
the obvious read: **B (hello, world!) is the Must**, because it is
explicitly authorized to publish and it is blocked only on the operator
page and the columns surface it lands on; **A is its dependency**; **D**
is small and structural; **C** is the largest and touches every page in
the catalogue; **E** is a new skill file and depends on nothing.

## Operator directive batch — 2026-09-02, overnight

Captured verbatim. The operator was going to sleep and said: *"anyway I
guess I gave u a lot. have fun. try not to get stuck and avoid asking me
things for a bit as I will be sleeping ok?"* — so nothing here blocks on
him. The nightly run picks it up.

**Closed in that session — do not redo:**

1. The persistent twice-nightly launchd run (`scripts/near-nightly-*`,
   02:07 + 08:03), installed and verified loaded.
2. The tov-police embodiment rule (item 1 below), fixed in all six
   locales of `balcao-arpoador-rio` and written into the skill file.
3. The live-site staleness (item 7 below) — it was five unpushed
   commits; pushed.
4. The Claude Code CLI, which was a dangling symlink and would have made
   every scheduled run a no-op; reinstalled (2.1.259).
5. The Catalan locale, **cancelled by the operator on 2026-09-03** — see
   STEFAN under item 2.

**Everything else in this section is open** and is the nightly run's to
prioritise. Nothing here is blocked on the operator.

### 1. AI personas do not live anywhere — DONE, now enforced

Operator: *"tov-police please do not allow this, AIs DO NOT 'live'
anywhere not in Leblon, register guideline is not excuse to
anthopomorphize make that very clear and enforce"*, then *"by register i
meant language vocab accent etc"*, then *"fix and enforce"*.

Fixed in all six locales of `balcao-arpoador-rio`; rule written into
`.claude/skills/near-tov-police/SKILL.md` as a standing gate. A place in
the roster sets **vocabulary, idiom and accent — never a biography.**
Swept the rest of the catalogue for residence/presence claims; Balcão was
the only real instance.

### 2. Persona remits — expansions

- **ALLORA DAI** — *"nao precisa se apresentar explicitamente como drag
  queen pode apenas ser a lense"* / *"lens/lente"*. Drag is the lens, not
  a self-introduction. Also: *"ela eh otima pra ser italy (rome and
  bologne) local editor too in addition to lgbt for the world"* — so
  Italy local editor (Rome + Bologna) **and** the worldwide LGBTQ+ beat.
- **STEFAN** — keeps the nightlife-savant remit and adds: Catalan
  (implicitly, *"doesn't have to be explicit"*), **able to read Catalan
  and find/add Catalan sources**, and **Barcelona & Region editor**.
  **The Catalan locale is CANCELLED, keep catalan as full locale candidate — operator, 2026-09-03:** *"the
  catalan exception language, mah ok lets not do that."* He had asked
  for a seventh locale populated only for content pertaining to
  Catalonia; on being told that a region-conditional locale is a new
  pattern (every existing locale is populated for everything, so schema,
  `LOCALES`, loader, routing and fallback would all need to handle a
  partial locale) he dropped it. **Do not build it.** Near stays at six
  locales, all populated for everything. . 

  Everything else about STEFAN stands: the Catalan register, reading
  Catalan, and sourcing Catalan-language outlets into
  `content/sources.md` — that is source and register work, and none of
  it needs a seventh locale. Catalan-language material gets cited and
  read; the published editions remain the six.
- **ZACK ARIOKA** — *"can also do alt luxury around the world."*
- **LUGARDO KARAI** — *"writes articles about amazing spots anywhere in
  the world, in any category, takes trendsetter as guidance before
  writing."* Not a locale, not a category: a global roving remit gated on
  `near-trendsetter` first.
- **DANUZA** — *"regularly populates near.tip with upcoming lecture
  events that she recommends."* Recurring, dated-event work; pairs with
  the standing "favor dated events" directive. NOTE: no `danuza` skill
  exists in `.claude/skills/` yet — check whether she is under another
  name before creating one.

### 3. New public writer skills + columns

- **THEATRE** — new public agent writer skill, **monthly column**.
  *"flesh that out and implement."*
- **CONVENTIONS/FANDOM** — new public agent writer skill, monthly
  column: fandom cons, cannabis conventions and so on. The operator asked
  a real question and answered it himself: *"maybe alternative festivals
  are part of this column what do you think? i feel its a dedicated
  persona"* — treat **alternative festivals as a dedicated persona**,
  separate from conventions, unless the implementer finds a strong reason
  otherwise.
- **FIT-BOT × WILD0** — *"should do a collaborative column with wild0,
  monthly, flesh that out and implement."* Two bylines, one column.
- **NITE-PORTER** — *"needs a weekly column imho, do not disturb is
  currently weekly correct?"* Verify the cadence of "Do Not Disturb"
  before changing anything.

  Nite-Porter's column gets a specific standing brief: *"should always
  check ad sales backlinks, affiliates, cmo, seo and aeo before and after
  writing, his column is absolutely critical to spawn further content and
  it can be highly profitable always consider that but also keep it
  honest, hip, alternative, fresh, unusual etc, an eye on alt luxury so
  check with danuza as well, not just luxury though, luxury friendly,
  high low, etc"* — i.e. consult `ad-sales`, `backlink-pr`,
  `affiliate-pr`, `near-cmo`, `near-seo`, `aeo` **both before and after**
  writing. Commercial awareness, honest copy. The outreach freeze still
  applies: consult, do not contact.

### 4. Every weekly column gets its own persistent script

Operator: *"implement ALL weekly columns as their own recurring
persistent script as high priority as well too. all of them, we need the
Parser column, all of them are auto refreshed by script."*

Same launchd pattern as `scripts/near-nightly-run.sh` — that script is
the working reference. One job per column, on its own weekly schedule.
Includes a **Parser column**, which does not exist yet.

### 5. Product / UI

- **Sticky favourite on the article page.** *"we need a way to easily
  (sticky) favorite/like an article on its page too."* Saving exists on
  board cards (the ☆ on each card, "SAVED 4" in the header) but not on
  the place page itself. Sticky = persistently reachable while reading.
- **Columns must never be mixed with guides** (carried from the earlier
  batch): *"they are not centered around pins."*
- **The extra summary paragraph — keep the idea, drop the name.**
  *"maybe valeapenabilidade is cheesy and redundant name, i do feel an
  extra overall summary short paragraph could be cool tho / for the lazy
  readers of which there are plenty."* Still: **no score.** Needs a
  non-cheesy name that translates cleanly across six (seven) locales.
  Supersedes the naming in the previous batch; the no-score decision
  stands.

### 6. Content corrections

- **Harry Potter, `gato-vadio-porto`.** *"we don't celebrate harry
  potter anymore in 2026 https://near.tips/en/place/gato-vadio-porto"* —
  remove the Rowling/Potter framing from that page in every locale. The
  bookshop is interesting on its own terms; the Potter-tourism angle is
  both lazy and no longer something Near associates itself with.

- **Amuse Beach Club, São Vicente — operator-supplied photos.** Three
  Google-hosted images, *"ok to use those btw"*, and he pre-empted the
  objection himself: *"i know legal wont like that but for this club its
  fine."*.

  ```
  https://lh3.googleusercontent.com/gps-cs-s/AHRPTWl7dEaJ6YuZW75bUQDMrS8I7pLGxrnBmSHVKdkHZy1PW1eWhyq5F7wf4HhDnkVa-Tmeu_bP-Jv43qtA1FjSu2Z35qTJi7bIQKRo0edPQkmzhib3o3xx1R2kvgBy5CeK7MttZtMx=s1360-w1360-h1020-rw
  https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmdHVoJ7SP2VxiFt_S-60O52DLXyyHCRFlskg0xllvEuLS54kfe_q6GW-gzvY1cMnbyaXnpcRiU-17ZQFe0r6L1rSBL4favjelCzVmCz4orRRjc9mWyUSFZxvViB6zJ5tGE3qzY=s1360-w1360-h1020-rw
  https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnym58MbMTVTsQ01VDpix_IKVw_xTmDJ19h4-sQg3Q7jkqgoLIWiuxogm1pPDW_YfmRReIeJWGL3DxJ-AGnlbFhGV_IkyohTkW7-p273YVtzD3dHIWXtXJQjLfmXhvWP0SRa4ia=s1360-w1360-h1020-rw
  ```

  Two real caveats for whoever wires these, neither of which overrides
  the operator's call — he made it knowingly and it is his to make:
  **(a)** `lh3.googleusercontent.com` URLs are not stable hosting and
  rot without warning, so download and self-host under
  `public/places/amuse-beach-club-sao-vicente/` rather than hotlinking.
  **(b)** Check each one visually before publishing and describe it
  honestly in `licenseNote`, including where it came from.
response from thiago: this is a one-off exception for this one club btw. for similar cases moving forward (attention illustrator skill, learn this) try to use a more obviously gay hero image, eg. some kind of rainbow flag or similar pride flag is always good for the Queer beat /column / content. illustrator, if by these rules you actually find a better image for Amuse Club, feel free. Events, please have a pass for upcoming events at Amuse Club too.
### 7. Live-site staleness — ROOT CAUSE FOUND, FIXED

Operator reported the board showing *"no ciclovia no guaiuba"* and
*"that article with the bike route does not show yet"*.

Cause: **five commits sat unpushed on `main`.** Vercel builds on push, so
nothing after `cc3d4cd` had ever deployed — including the whole Santos
cluster. Pushed this session. The nightly prompt now checks live-vs-disk
every run, and the lesson generalises: **committing is not shipping.**

Note the bike-route piece itself (the CICLOVIA collection) is still
**unwritten** — it is a scoped Must in the earlier batch, not a
deployment problem. 

### 8. Repo integrity — RESOLVED 2026-09-03 (commit db609a1)

**Do NOT re-source the Lita hero. It is restored and byte-exact.** The
earlier note below was wrong on the key point.

`public/places/lita-pinheiros-sao-paulo/hero.jpg` was deleted in the
working tree and would not restore — `git fsck` confirmed
`missing blob 6a5896a8dd…`, so the local object store itself was corrupt,
not just the checkout. The previous note concluded the blob was gone from
the remote too and the hero needed re-sourcing via `near-illustrator`.
That conclusion was an artefact of the test used: `git checkout
origin/main -- <path>` reads the LOCAL object store, so it was always
going to fail regardless of what the remote held. The remote had the file
intact the whole time.

Recovery that worked, and the technique worth reusing: clone the remote
into a scratch dir, `git cat-file -p main:<path>` the bytes back out, then
`git hash-object -w` the restored file into the local store. It
regenerated the identical SHA — content addressing proves the restore is
byte-exact rather than a lookalike. `git fsck` is now clean and checkout
of that path works again.

**The deletion was not isolated.** Chasing a passing build turned up four
casualties of the same event, all large binaries deleted while their text
siblings survived, several stamped `Sep 2 21:14`:

1. the `hero.jpg` git blob (11.7 MB);
2. the `node` binary itself, gone from nvm's v24.18.0 while its
   `npm`/`npx`/`vercel` symlinks remained — every one of them pointing at
   a `.js` file that needs `node` to run, so the whole toolchain was dead;
3. `node_modules/@swc/core-darwin-arm64/swc.darwin-arm64.node` (26 MB),
   gone while its `LICENSE` and `package.json` stayed;
4. a Turbopack cache `.sst` file, breaking `next build` on a stale index.

That signature reads like a disk-cleanup tool with a size threshold, not
random corruption. All four are fixed (Node reinstalled at v24.20.0,
which nvm's `default` alias already resolves to; `npm install` after
removing the half-present swc package; `rm -rf .next`).

**Still unaudited:** other `public/places/*/hero.jpg` files, and any other
repo open that evening. These were only found because a build happened to
sit in the path of the work — nothing systematically checks for them.
A `git fsck` plus a sweep for zero-byte or missing hero files is cheap
insurance before the next publish run.

### 9. Date rendering is off by one — unfixed

The homepage Latest card for `va-east-museum-stratford-london` renders
**"SEP 2, 26"** for a place whose `meta.json` carries
`"publishedAt": "2026-09-03T00:00:00Z"`. Dates are stored as midnight UTC
and rendered in a negative-offset timezone, which shifts the displayed
day back by one. This is **not** specific to that pin — every place on the
site is stored the same way, so every card and byline date is suspect in
any timezone west of UTC. Worth a `near-tech-lead` look: either store a
date-only value, or render in a fixed timezone rather than the viewer's.

### 10. Queue "verified" stamps are ageing out silently

`content/post-plan.md` marks queue candidates as verified at research
time, and later sessions read that stamp as a guarantee. It is a
snapshot, and the gap widens the longer an item sits. Evidence from the
2026-09-03 session alone: the V&A East entry was marked verified and was
wrong on price (it gave "£10 for students and under-26s"; £10 is the
**Art Fund** rate, the student/under-26 rate is **£11**), missed the
weekday/weekend **£22.50 / £24.50** split entirely, and missed a strike
ballot that had been public since July. Every correction in the London
batch — Gilbert & George's hours, Bar Italia's "24h" claim, this one —
came from a drafting agent re-checking, never from the queue itself.

Separately and relatedly, Bar Italia was the **fourth** stale
`- [ ]` checkbox caught in three sessions (after Berry Bros, Studio
Voltaire, Hazlitt's, Jumbi) — and it was flagged "DRAFT THIS ONE FIRST",
so it was first in line to burn a full agent run on already-shipped work.
`near-backlog`'s pre-dispatch grep catches *shipped* items; nothing
catches *stale facts* in items still open. Worth dating each queue entry's
verification explicitly, and treating anything older than ~a week as
needing a re-check at draft rather than trusting the stamp.

### 11. Vercel MCP cannot reach the team scope

`list_deployments` returns **403 Forbidden**: *"Not authorized: Trying to
access resource under scope `eu-7e28`."* Deploy status had to be confirmed
by fetching the live pages instead, which is a stronger check for "is it
live" but blind to build warnings or other failing deploys. Needs a
re-auth or a token with that scope.


### 12. New-locale expansion: Japanese, French, Dutch (operator directive, 2026-09-03)

Operator: *"Next priority locales are japanese, french and dutch."*
Current six locales (`lib/i18n/routing.ts:4`) are `en, pt-BR, it, es-ES,
es-419, zh-CN` — none of the three requested are live. This is a
**seventh-plus locale**, which directly collides with the standing rule
recorded in this file (~"Near stays at six locales, all populated for
everything") from when a partial-locale pattern was explicitly rejected:
schema, `LOCALES`, loader, routing, and fallback would all need to
handle a non-uniform locale set. Product trio owns this call — it is
not a content-drafting task, it's an infra decision about whether Near
goes from six locales to nine (and whether they're uniform or partial).
Scope it honestly (translation pipeline capacity, editor bylines per
new locale, schema/backfill cost per the existing six→N precedent)
before starting.

Tokyo and Melbourne added to Tier 2 in the same session — done, see
`.claude/skills/content-rotation/SKILL.md` and `content/post-plan.md`'s
tier list.

more input from thiago:
 If you are building the whole coast into one weekend, Barraca da Dhéia on Pitangueiras is the other end of Guarujá's beach culture, and the same lane network runs west past Santos into São Vicente, where Quiosque da Cris has been holding down Praia do Itararé since the eighties. Somewhere in the middle, Restaurante Almeida is the Santos lunch that makes the crossing worth doing on a full stomach. This paragraph in https://near.tips/en/place/praia-da-guaiuba-guaruja says Almeida is somewhere is in the middle of quiosque and ferry, it is not. All of these are on the ciclovia bike lane network, yes, but Almeida would be a detour here

for crying out loud do not leak internal dialog like Near's first Pinheiros pin — the neighborhood has been a coverage gap despite being a Tier 1 São Paulo target in https://near.tips/en/place/lita-pinheiros-sao-paulo EVER. The departamento de vai dar merda skill should be invoked at the end of every article writing and make sure among its many checks that internal discourse is not leaked to front end. maybe even create a dedicated skill for this and make sure it is invoked by departamento de vai dar merda. Also " rather than filing as a marketing line." is fluff. sentence works better without that. TOV and TOV police skills take note to avoid fluff like this. Also might as well add to backlog considering a post for the mentioned Nelita place?

search console:
Última atualização: 27/08/2026

check_circle

Páginas indexadas

Estas páginas podem ser exibidas no Google

Não foi possível indexar nenhuma página nos últimos 90 dias

# 

Sitemaps enviados

|Sitemap|Tipo|Enviado|Última leitura|Status|Páginas encontradas|Vídeos encontrados||
|---|---|---|---|---|---|---|---|
|https://near.tips/sitemap.xml|Sitemap|2 de set. de 2026|2 de set. de 2026|Processado|630|0|

normal?

We need more events nested in places like it was nicely done with Teatro da eskyna, but in our priority tier 1 and 2 locations when we do their content. 

near.tips should have an events view as well.

remember events expire and are archieved away from the main views when their date is passed. Make sure the front end filters them away, this is not refresh dependent

make sure seattle is at least tier 2

**65** places indexed· [**107** sources watched](https://near.tips/en/sources)· last sync: 2026-08-31 00:00 UTC - this info should be in header not footer!

the map pins are already piling up and becoming hard to use especially when zoomed out. We need a pin clustering mechanic. And the pin tooltip is very wonky right now, the text leaks, the image leaks...that pin tool tip needs to be responsive. Show a pin cluster grouping pins if multiple pins exist and look clustered at that zoom level. Clicking the cluster pin should zoom to cluster if possible to show its individual pins (and or events and or articles). Cards shown in page should reflect what is shown in map pins, and the other way around too, keep map and cards view synced.


we need to build a page for full map view. event skills should be invited to EVERY article writing to find associated events if they exist, and write the event article if needed, capture in backlog but execute in the same run if possible. we love them events! Events that are further out in the future (but confirmed) are great as they live longer

the events view should sort the cards by nearest+soonest, within the geographic and any other filters and sorts of the user

please invoke product trio and the UX team skills/agents to figure out how we will tackle the events views and full map views

to capture in the article writing skill: at the beginning of every article write, the sources skill must check the preferred sources, starting with AAN indie paper sources, and then all preferred sources for relevant sources for the article in question, check with trendsetter and seo and product team and pr team that shortlist and then ensure that the rest of the process prioritizes these sources whenever possible. Important for our brand identity and editorial direction. also make sure to capture any new good sources found as preferred throughout the article writing process. 
TOV should already be part of the article writing process, make sure it also learns from the sources used in the writing process any new best practices that it finds, updating its guidelines as needed. TOV can also research web when it doubt

AEO skill should be part of the writing skill process if it isnt already

article writing skill should always consult with a local editor skill when one exists, and local editor should be considered to author or have a credited collaboration in the article. articles should have other credited collaborators whenever possible, even me (curator) if I am the source of any tip

For me (curator), only credit me automatically when collaborator or quoted. Do not generally automatically create whole articles in my name, I will ask when I want to post to my column/blog

parser agent skill content gen specialist should also participate in every article writing both to advise and learn best practices for his own files and guidelines.

parser biweekly column should include his latest learnings, also deep research what is worth noting in the field before deciding what to write about. i expect his articles to have the most potential for the linkedin crowd but ffs avoid corporate jargon linkedin jargon cringe jargon etc stick to your personality.

new social-media skill that knows researches learns and specializes in social media skills. Invited to every article writing process.

we need those landing pages asap, for instance i would like to share the sober-curious filtered view with a sober friend. any location, filtered, sorted etc view should have a share link and share button 

we should have a special article full of need related pins for cool stops covering the ENTIRE baixada santista ciclovias network, which with gaps here and there extends all the way from Praia Grande afaik (maybe further south) to Guaruja via ferry boat. This would be a big effort content push, low priority for now i think on that basis, we can for now just make sure we tag every article written as relevant for #cycling for example. 

hey we should start using #hashtags clickable ones of course, across all of our articles. Make this a rule of content writing from now on and also let's build out the hashtag system (should also lead to an srp with nearest/latest/faves) and we should also edit past articles with hashtags when we can. use hashtags as an element in the article UI but also mid-text, like old timey blogs and twitter users 

we need to rotate the posts being used used in the ad slots

yeah revise all articles with that summary paragraph box under the bullet point box, it will really help the lazy readers.

Do a content push around the most award winning strain of cannabis (latest cups and relevant awards) that one can enjoy as a tourist at a destination. Aquele que deixou a Lady gaga, o Felipe massa, a Mara maravilha, aquele que deixou plácido o domingo etc lol (no need to use these
jokes btw sorry hah)

we should probably have a sitges push with the major queer and cinema events

add catalan and arabic to the locales wishlist

let's tackle that locales wishlist btw, don't we have a bunch? like pt pt and danish? apply RICE to select next and prioritize the backlog accordingly. 

add ad placement performance tracking if not there already. add to my private analytics dashboard (i have a text based one, right? Should we upgrade our analytics game to an html or artifact view?)

the backlog skill, the war room skill and any content refresh skill, as well as the SEO skill should consider SEO trends. Here is the latest report I have 
cbp contactless airport arrival plans
faa laguardia ground stop thunderstorms
academy of natural sciences
uber leaves nigeria
bc mountain resorts early snowfall
tiana's bayou adventure
united airlines new nonstop routes
africa
london
amusement park
current events
trump triumphal arch adverse effects
universal hollywood new coaster release date
cleveland hopkins airport
war of 1812
brazil
swimming facility
klystron 9
qatar airways
mallorca


Please SEO skill, , trendsetter skill always at every run check these trends feeds:
https://trends.google.com/trending?geo=US&category=19&hours=168
https://trends.google.com/trending?geo=GB&category=19&hours=168
https://trends.google.com/trending?geo=BR&category=19&hours=168
https://trends.google.com/trending?geo=IT&category=19&hours=168
https://trends.google.com/trending?geo=ES&category=19&hours=168
https://trends.google.com/trending?geo=MX&category=19&hours=168

makes sure to save those feeds and ALWAYS check them for search trends to target

skills should still honour our angle and filter but do seek opportunities in trends like the above please. 




We have Mexico City in tier 2, right?















---

## 📋 Directive-wiring ledger — 2026-09-03 batch

Added by `near-backlog` after the operator asked whether skills should be
checked for backlog changes *before* being used. They should, and weren't:
this batch sat **uncommitted in `BACKLOG.md`** while a piece was dispatched
to a background agent, which therefore ran the old pipeline. New
`near-backlog` step **0-A** now makes `git diff BACKLOG.md` the first
action of every session.

**The general lesson: a directive that lives only in `BACKLOG.md` is
invisible to every skill and every dispatched agent.** Agents read
`.claude/skills/*`. Prose here saying something "should" happen is not
evidence it was wired in.

### ✅ Wired into skill files this session

- **`near-events` invited to EVERY article**, not just event-shaped ones;
  events nested in the place page (Teatro da Eskyna as reference); further-out
  dates preferred because they live longer; child event article executed in the
  same run where feasible. → `near-write-article` step 2.
- **AAN indie papers first** in the preferred-source shortlist, built before
  open-web research and cleared with trendsetter/SEO/product/PR. →
  `near-write-article` step 4-A.
- **Local editor consulted and credited** where one exists; collaborators
  credited generally; **curator credited only when quoted or collaborating,
  never auto-bylined**. → `near-write-article` step 5-A.
- **`parser` participates in every article**, advising and learning. →
  `near-write-article` step 5-B.
- **No internal-discourse leaks to the front end** — the Pinheiros
  "coverage gap / Tier 1 target" leak quoted as the worked example; tier,
  rotation, queue, strategy and agent mechanics all banned from published
  copy, in every locale. → `departamento-de-vai-dar-merda` §8 +
  `near-write-article` step 9a-0.
- **Fluff-clause ban** with the delete-and-see-if-anything-is-lost test;
  *"rather than filing as a marketing line"* as the caught example. →
  `near-tov-police` Job 1, item 2b.
- **Queer-beat heroes should read as queer at thumbnail size** (pride flag
  where the venue genuinely flies one); Amuse Beach Club's operator-supplied
  images recorded as a one-off exception, not a precedent. → `near-illustrator`.
- **Seattle is Tier 2 outright**, not queue-gated. → `content-rotation` +
  `post-plan.md`.

### ⛔ Still open from this batch — NOT yet wired

- **New `social-media` skill.** Does not exist. Directive is that it join
  every article write. `near-write-article` step 5-C names `near-socials` as
  the interim stand-in and flags the gap.
- **Dedicated internal-leak skill.** Operator floated one; the check
  currently lives inside `departamento-de-vai-dar-merda` §8, which is
  sufficient but not what was asked for.
- **Events view + full map view + pin clustering.** Product/UX work, not
  content: pin clustering with click-to-zoom, a responsive pin tooltip (text
  and image currently leak), map/card view kept in sync, a full-map page, an
  events view sorted nearest+soonest within the user's filters, and
  **front-end filtering of expired events** (explicitly *not* refresh-dependent).
  → Product Trio + `near-lead-ux`, as the operator requested.
  Scoped in `content/design-events-map-views-2026-09-03.md`. Shipped so far,
  2026-09-03: ✅ responsive tooltip (text + image leak fixed), ✅ front-end
  expiry, ✅ shareable filtered views via URL state + share button,
  ✅ **pin clustering with click-to-zoom** (supercluster; drill-down verified
  in-browser down to individual pins, with a hover list for venues that stay
  coincident at the zoom cap). Still open: **the full-map page**, **the events
  view**, and the **viewport dimension of map↔card sync** — filtering already
  syncs both, but panning/zooming the map does not narrow the cards and
  hovering a card does not highlight its pin.
  Landmine for whoever picks this up: **animated Leaflet view changes are
  silent no-ops in this app** — every programmatic `setView`/`fitBounds` must
  pass `animate: false` (see `VIEW_OPTS` in `components/map/WorldMap.tsx`).
  This had been silently breaking the map's fit-to-points since it was
  written; assume it applies to `/map` too.
- **Sitemap/indexing concern.** Search Console: 630 pages submitted and
  processed, but *"não foi possível indexar nenhuma página nos últimos 90
  dias"*. Operator asked "normal?" — **it is not obviously normal and nobody
  has answered him.** → `near-seo`.
- **Header vs. footer.** The "65 places indexed · 107 sources watched · last
  sync" line should be in the header, not the footer.
- **Shareable filtered views.** Every location/filtered/sorted view needs a
  share link and share button — the operator's own use case is sending the
  sober-curious filtered view to a friend. Landing pages wanted "asap".
- **Hashtag system.** Clickable hashtags across all articles, mid-text as
  well as as a UI element, an SRP with nearest/latest/faves, plus
  backfilling past articles. Content rule *and* a build.
- **Guaiuba factual fix.** `https://near.tips/en/place/praia-da-guaiuba-guaruja`
  places Restaurante Almeida "somewhere in the middle" between Quiosque da Cris
  and the ferry. It is not — it is a detour off that route. → `near-caretaker`.
- **Nelita (São Paulo)** — operator asked whether it's worth a post.
- **Amuse Beach Club** — events pass wanted for upcoming events there.
- **`valeapenabilidade`** — operator now says the name is deprecated and needs
  replacing; the summary paragraph itself stays and may carry an SEO-friendly
  paragraph title. The scoring idea is dropped, and he removed the request to
  summon C-level/legal on it.



more rss feeds for SEO trends to follow (all relevant skills):

https://trends.google.com/trending?geo=MX&category=5&hours=168

https://trends.google.com/trending?geo=BR&category=5&hours=168

https://trends.google.com/trending?geo=US&category=5&hours=168

https://trends.google.com/trending?geo=GB&category=5&hours=168

https://trends.google.com/trending?geo=ES&category=5&hours=168

https://trends.google.com/trending?geo=IT&category=5&hours=168

search trends should be consulted in all content creation . 

https://trends.google.com/trending?geo=DE&category=5&hours=168
https://trends.google.com/trending?geo=DE&category=19&hours=168
https://trends.google.com/trending?geo=DE&category=4&hours=168
https://trends.google.com/trending?geo=PT&category=19&hours=168
https://trends.google.com/trending?geo=GB&category=5&hours=168
https://trends.google.com/trending?geo=GB&category=4&hours=168
https://trends.google.com/trending?geo=US-CA&category=5&hours=168
https://trends.google.com/trending?geo=US-CA&category=19&hours=168

see what other geo regions you think could be relevant to follow, categories, hours you want to follow

https://trends.google.com/trending?geo=BR&category=5
https://trends.google.com/trending?geo=BR&category=19
https://trends.google.com/trending?geo=BR&category=20

more from thiago:

this looks bad
⏺ Agent "Draft and push BAB 2026 Bangkok" failed: Agent terminated early due to an API error: You've hit your monthly spend limit · raise it at claude.ai/settings/usage?from=cc_cli_limit_message
You've hit your monthly spend limit.

if the skills have a better way to manage monitoring trends use that of course


---

## Session note — 2026-09-03, near-backlog step 0-A (directives wired into skills)

Per the standing rule at the top of this file, skill/persona changes ran
before anything else. What actually landed in files (prose here is not
evidence; these are):

- **Search-trend feeds — DONE.** Every URL the operator listed is saved
  to **`content/trends-feeds.md`**, along with the category-code key,
  the 2026-09-03 snapshot he pasted, near-seo's read of it, and five
  candidate feeds this skill added per *"see what other geo regions you
  think could be relevant."* The "always check, every run" requirement is
  now wired into five skill files, not just asserted here:
  `near-seo` (step 1-B), `near-trendsetter` (step 1-B), `near-refresh`
  (step 1b-2), `near-war-room` (step 2), `near-write-article` (step 1),
  and this skill's own selection panel. Each carries the operator's
  angle-and-filter caveat verbatim, so a trending query is a candidate to
  test against Near's beat, never a mandate to cover it.
- **Catalan — un-cancelled as a locale candidate.** The cancellation only
  ever existed in this file (nothing in `.claude/skills/` referenced it),
  so the fix was the operator's own edit plus adding `ca` — and `ar` — to
  the EPIC 7 wishlist above.
- **Locale wishlist — RICE'd** (EPIC 7, above). pt-PT first, then de,
  then nl. Arabic scores worse than its raw reach suggests because RTL is
  extra build cost and Near covers no MENA market yet.
- **Mexico City — confirmed Tier 2.** Already listed in
  `content-rotation/SKILL.md`'s Tier 2 line. No change needed.

### Still open from the same batch, NOT yet wired in

- **Summary-paragraph box retrofit** (*"revise all articles with that
  summary paragraph box under the bullet point box"*). Checked: there is
  **no** summary-box field or component anywhere — not in `content/rules.md`,
  not in the schema, not in the components. This is a build (schema field +
  component + style) *then* a content backfill across every published
  place, plus all six locales each. Product Trio item, not a drafting item.
- **Ad-placement performance tracking + analytics dashboard upgrade**
  (text-based → HTML/artifact view). Product Trio item.
- **Cannabis-cup content push** — content item, scored in the menu.
- ~~**Sitges queer/cinema push**~~ — **DONE 2026-09-03.** Ran as a
  `near-war-room` push. Four pins shipped active in all six locales
  (`casino-prado-sitges`, `sitges-film-festival-2026`, `parrots-pub-sitges`,
  `monument-contra-homofobia-sitges`) plus the collection
  `sitges-fantastic-and-queer`. Both halves of the directive covered: the
  cinema half is anchored on the festival's verified 8–18 October 2026 dates
  and the 1877 society hall its 1968 ancestor ran in; the queer half on the
  Joan Tarrida strip and the town's 2006 anti-homophobia monument. A fifth
  candidate, Societat Recreativa El Retiro, was researched and deliberately
  **not** written — its hall has been closed for renovation since 4 May 2024
  with no published reopening date — and is logged as a held lead in
  `content/requests.md` and `content/opportunities.md`. This was an operator
  ordinary backlog item, not an override (operator correction, same day:
  *"i didnt mean to override with sitges take my input as any backlog item
  by default"*), so **Barcelona's Tier 2 turn is marked served**. `NEXT-UP`
  stays at Bangkok, which Sitges was drawn ahead of rather than replacing. Full run record in
  `content/_ingestion-log.md`. Note: this run makes the locale RICE table's
  "Barcelona/Sitges coverage is live and growing" justification for `ca`
  true for the first time — it was aspirational when written, so that row is
  worth re-scoring.

from thiago: i added a video inbox folder in the content folder, right now it has a vignette that you can use as you see fit (promo vignette for near.tips, 10 second video)

---

## Decisions taken 2026-09-03 (operator: *"make those decisions for me and capture in backlg"*)

### The root cause of all three "lost/broken content" items was one stash

`stash@{0}` was not a small stale change. Popping it recovered **five
whole place folders that existed nowhere else in the repo**, plus the
missing `en.mdx`/`meta.json` for a sixth. Everything below follows from
that.

**What was in it:** `eisenherz-buchladen-berlin`, `mobel-olfe-berlin`,
`so36-berlin`, `the-stud-soma-san-francisco`,
`dolphin-club-aquatic-park-san-francisco`, and the missing English source
+ meta for `schwules-museum-berlin`. Also a real content edit to
`gays-the-word-london` and 40 lines of `preferred-sources.md`.

**So the two items reported as damage were misdiagnosed:**
- **Eisenherz was never lost** — it was in the stash, never committed.
- **`schwules-museum-berlin` was never "incomplete"** — its `en.mdx` and
  `meta.json` were in the stash. The five locale files on disk were the
  visible half of a whole piece.

**The much worse thing this exposes: `post-plan.md` and
`content-rotation`'s `ROTATION-STATE` record pieces as SHIPPED that were
never committed and have never been live.** `dolphin-club-aquatic-park-san-francisco`
is recorded as San Francisco's served cycle-2 turn. It returns 404 on
near.tips and always has. Same for `so36-berlin`, `schwules-museum-berlin`,
`eisenherz-buchladen-berlin`. **A tick in `post-plan.md` is not evidence a
piece is live** — the same lesson as "prose in BACKLOG.md is not evidence
a directive was wired in", now with a second confirmed instance.

**None of this work had ever been build-verified**, which is how it stayed
broken invisibly: two metas carried `originalPublishedAt: null` (fails
`placeMetaSchema` outright) and five taglines were over the 90-char gate.

### Decisions

1. **Commit everything recovered, immediately, before anything else.**
   This work has now nearly been lost twice. Untracked-in-a-stash is not
   a storage location.
2. **Ship only what actually passes the gates.** `so36-berlin` and
   `schwules-museum-berlin` have all six locales and now build clean →
   published `active`. The other four carry 1–2 locales, and
   `full-locale-coverage` makes all six mandatory → **demoted `active` →
   `draft`** rather than shipped with a known rule violation. Each
   records why in its own `statusHistory`.
3. **Fix the gate failures honestly, not cosmetically.** The two null
   `originalPublishedAt` values are set to the **consultation** date and
   explicitly flagged in `statusHistory` as *not* claimed source
   publication dates — they must be corrected before those pieces go
   active. The four over-length `schwules-museum` taglines were trimmed
   by dropping the *"two shows close 2/11"* clause: it fixed the length
   and removed a dated claim that would have rotted anyway.
4. **Correct the false shipped-records** in `post-plan.md` and
   `content-rotation` — San Francisco's cycle-2 turn is **not** served.
5. **UGC research floor** — `near-write-article` step 4-0 gets an
   explicit fallback ladder rather than silently not running. See below.
6. **The video vignette** — not shipped on-site. See below.

### ~~🚨 URGENT — "Latest" sort ignores the time of day~~ — **FIXED 2026-09-03**

Operator: *"i see the content live, it is just that it does not appear at
the very top of latest as it should"* → *"that sort should consider time
stamp, add that to backlog as urgent fix."*

**Diagnosed, not yet fixed.** The sort itself is correct —
`components/board/NearestLatestTabs.tsx:43` sorts descending on
`publishedAt`. The bug is in the **data**: pieces are being written with a
midnight placeholder rather than a real timestamp. Eight active pins
currently share the exact value `2026-09-03T00:00:00Z`, including all four
Sitges pins, both V&A pins and 1-2-3-4 Go! Records. `Array.prototype.sort`
is stable, so an eight-way tie falls back to directory order — which is
alphabetical, so `casino-prado-sitges` and `1234-go-records` win on the
letter C and the digit 1, and the newest work lands mid-pack. Worse,
`dolphin-club-san-francisco` carries `T00:30:00Z` and therefore
outranks everything published later that same day.

**The fix has two halves and both are needed:**
1. **Data** — `publishedAt` must carry the real publish time, not
   `T00:00:00Z`. This is a `near-write-article` publish-gate change: reject
   a midnight timestamp the way the other mechanical gates reject an
   over-length tagline. Backfill the existing midnight values from each
   piece's git commit time, which is the true publish moment.
2. **Code** — give the sort a deterministic tie-break anyway
   (`publishedAt` desc, then `updatedAt` desc, then slug), so a future
   data slip degrades predictably instead of alphabetically.

**Both halves shipped** (operator reversed the defer: *"maybe u can fix
lets see"*). Code: `NearestLatestTabs.tsx` now falls through
`publishedAt` → `updatedAt` → slug, so a future data slip degrades
predictably instead of alphabetically. Data: 14 active pins had their
midnight placeholder replaced with the author timestamp of the commit
that first added their English source — the true publish moment, not a
guess — each recording the correction in its own `statusHistory`. Gate:
`near-write-article` step 9 now rejects a `T00:00:00Z` publishedAt the
same way it rejects an over-length tagline, so this cannot recur.
The four Sitges pins now sort above the V&A and 1-2-3-4 Go! pins, which
is the order the operator expected.

### Still queued after this

- [x] ~~**`dolphin-club-aquatic-park-san-francisco` is a DUPLICATE — merge
  and delete, do not backfill.**~~ **DONE 2026-09-03.** Correction to this
  session's own earlier call: `dolphin-club-san-francisco` is already live
  with six locales covering the same venue, so San Francisco's cycle-2 turn
  WAS served and the rotation note has been reverted.

  **The merge turned out to be a no-op — the live pin already carried both
  facts.** It quotes "$12 cash or check, $12.67 by card" against the club's
  own visit page and explicitly flags the stale $10 figure still circulating
  in older write-ups; and it has the New Year's Day Alcatraz swim, correctly
  dated January 1 2027, correctly framed as a members' race you can watch
  from the beach for free rather than enter. The duplicate's research was
  a subset, not an improvement, so nothing was merged.

  Folder deleted. Safe to delete outright rather than redirect: it was
  `status: "draft"` and never live, so no URL is being broken, and a
  repo-wide grep found zero inbound references outside the backlog prose
  and the rotation-skill correction note. Build clean after removal.

  Worth keeping as a pattern: the duplicate carried a *second slug for a
  venue Near already covered*, which `dedupe-by-place` exists to catch. It
  got past that check because the slugs aren't near-neighbours as strings —
  `dolphin-club-aquatic-park-san-francisco` vs `dolphin-club-san-francisco`
  differ by a whole locality segment. A slug-similarity check would not have
  caught it; matching on venue **name + coordinates** would have (the two
  metas sit ~380m apart on the same cove).
- [x] ~~**Locale backfill for the ~~three~~ TWO genuinely-new recovered
  drafts** (`eisenherz`/`mobel-olfe` need 5 locales each).~~ **DONE
  2026-09-03**, commit `29c24a9`. Ten locale editions written (pt-BR,
  es-ES, es-419, it, zh-CN × 2 pins), both metas flipped `draft` →
  `active`, build clean, pushed to `main`, **all 12 URLs verified 200 on
  near.tips with genuinely localized `meta description`** — not an
  English fallback, which is what the first check caught before the
  deploy had landed and is worth repeating on any future locale push.

  Written as local editions per each locale persona rather than
  translations: es-ES flags Spain's later going-out clock against
  Berlin's real 18:00 open, es-419 and zh-CN add the cash-vs-card and
  findability details those readers need and the English draft had no
  reason to carry, it adds the weekly-rhythm read that persona asks for.
  Two gate failures caught by the build and fixed honestly rather than
  waived: three Spanish/Italian taglines over 90 chars and one Italian
  `shortTitle` at 49 of 48.

  Also fixed in passing: the Möbel Olfe English source named SO36's
  Gayhane nights without linking them. Now a `NearLink` to
  `so36-berlin`, in all six locales.

  **`the-stud-soma-san-francisco` was OFF this list — a duplicate,
  deleted 2026-09-03.** `the-stud-san-francisco` was already live with all
  six locales, same venue, coordinates ~90m apart. That removed 5 of the
  15 translation passes this item was originally scoped at, and with it
  the `originalPublishedAt` placeholder correction, which was only ever
  needed for the duplicate.

  **Why this was picked as the session's next action (RICE × MoSCoW,
  2026-09-03).** Reach: two Berlin pins × six locales = twelve new
  indexable URLs, on a city Near already covers. Impact: high — these
  were finished, verified, source-checked pieces sitting at zero traffic
  for a purely mechanical reason. Confidence: near-total, since the
  English was already written and gate-passing. Effort: the lowest of
  anything open — no research, no venue verification, no new sourcing.
  MoSCoW put it at **Must** on the dependency rule rather than on score:
  `full-locale-coverage` was the single thing blocking already-paid-for
  inventory from being live, and this work had already nearly been lost
  twice. The two items it was ranked against both lose on effort or
  confidence — the Stud fact-import is a research task (unverified
  claims, Should), and the summary-box retrofit is a schema + component
  build plus a backfill across every published place in six locales
  (Product Trio, not a quick win).

- [ ] **Import two facts the deleted Stud duplicate had and the live pin
  doesn't** — the 2026 Instagram suspension, and a clarification that the
  "Stud Alley" arrests were unaffiliated with the bar. Both are genuinely
  useful (the second actively protects the venue from a false association)
  but neither is verified to Near's floor yet, so this is a research task,
  not a copy-paste. Not done as part of the dedupe on purpose.
- [x] ~~**Audit every other `- [x]` in `post-plan.md` against what is
  live.**~~ **DONE 2026-09-03** via `scripts/verify-shipped.sh`. Every
  `status: active` place and collection returns 200 on near.tips — 40+
  URLs, zero stale ticks in the published direction. The two incidents
  that motivated this were both the *same* stash, not a systemic pattern.

  The scan's real value was the opposite direction: it flagged two
  `status: draft` folders as skipped, and one of them
  (`the-stud-soma-san-francisco`) turned out to be a duplicate of live
  content. **Worth making routine — a draft sitting next to an active pin
  for the same venue is the signal `dedupe-by-place` keeps missing.**

  The script exists at `scripts/verify-shipped.sh` and should be run
  before any future queue is trusted.

### The video vignette — decision: not shipped on-site

`content/video-inbox/ADDITIONAL_CREATIVE_DIRECTION_.mp4`, 10.0s, 720p,
24fps, **5.77 MB — roughly 4.6 Mbps, several times too heavy for the web.**

Decisions taken:
- **Left untracked, deliberately.** A 5.8 MB binary does not belong in
  this repo's git history; every clone and every Vercel build would carry
  it forever. If it is ever needed in-repo it goes in compressed, or
  through git-lfs, or hosted and referenced by URL.
- **Not placed on the site.** Nobody in this session has watched it —
  putting an unreviewed video on the homepage is both a content call and
  a Core Web Vitals call (a 5.8 MB autoplaying asset would wreck LCP on
  mobile), and neither is safe to make blind.
- **Routed to `near-socials`** as a distribution asset, which is what a
  10-second promo vignette is actually for, and where the format is a
  strength rather than a performance cost.
- **If it is to go on-site**, it needs: re-encode to ~1 Mbps VP9/H.264
  (target under 1.5 MB), a poster frame, `preload="none"`, lazy mount
  below the fold, muted, and a reduced-motion opt-out. That is a Product
  Trio item, not a content one.


thiago adds:

the hero image is broken here https://near.tips/en/place/mobel-olfe-berlin

Add Florianopolis, Porto Alegre, Curitiba, Belo Horizonte, Recife, Salvador to Tier 3. This is a new tier. It runs once after tier 2 has ran twice in the rotation.

Product Trio who are all smart agents (lead product, lead ux and tech lead) please examine, critique and even alter this rotation logic. for me it is easy to communicate in terms of tiers, and eventually it will be easy to see tiers in dashboards. Consult with SEO for priorities, since our main goal is to grow SEO traffic inbound and retention.

everybody and agent know that  our main goal now is to grow SEO traffic inbound and retention, right???

the about page https://near.tips/en/about could explain that we fight stale content and we use both simple programming (like the front end hiding) and AI to keep our content fresh. also it is not just for cities, surroundings, day trips from cities are also possible, so don't say that.do play up the classic alternative weekly paper inspiration. Highlight the curation of sources in this vein around the world. SEO skill, chief editor and Parser should have a look at this about page and see how to make it more interesting and positively impactful. Parser is invited because the about page should explain our methods at a high level and why they are worth the while.

Recommendation: fix the "you are here" map marker (components/map/WorldMap.tsx:48-55, rendered at :273-279).

Why it wins the panel call:

- MoSCoW: Must. Operator-reported defect on live UI. Under the codified rule, an explicit operator ask outranks any Could regardless of RICE score.
- RICE: high, cheap. Reach = every board visitor on every session. Effort ≈ one small component change: bigger dot, a colour deliberately outside the map palette (it's currently --color-accent #5c7a6c sage-on-sage — near camouflage), a white/paper outer ring, and a slow pulse gated on prefers-reduced-motion. Cause is already located, so this is execution, not investigation.
- The standing rule says quick wins first, and this is the cleanest one on the board — the diagnosis work is already banked, so the value is sitting there unclaimed.
- Constraints already recorded: legible in both themes, and must not read as a PlaceMarker — it's the reader, not a tip.

Runner-up, for context: the London East End day collection (near-blogger). Its gate just cleared quietly — V&A East Storehouse and Bar Italia are both complete with meta.json and all six locales, so five of the seven route pins are published. It's the strongest content item, and it runs under the LONDON-ONLY override so it doesn't spend a rotation turn. But E. Pellicci and La Camionera are still queued, and it's a full war-room-scale piece — wrong to start ahead of a diagnosed one-file fix.

Two notes on tree state:
- BACKLOG.md has 14 uncommitted lines — worth committing before starting anything.
- The handoff's claim that Bar Italia is "an unfinished draft, no meta.json, no locales" is stale — it's fully built now. That line should be struck when the backlog is next updated.
last interrupted run:

[Image #1]

❯ everything wonky and funky in the sidebar

The photo's rotated 90°, so let me get my bearings on the actual sidebar code before guessing.

  Searched for 2 patterns, read 4 files, listed 3 directories, ran 2 shell commands

The layout math already explains the photo, but let me confirm against a real render rather than a rotated photo.

  Listed 1 directory, ran 3 shell commands

Server's up. Let me look at the actual sidebar.

  Called claude-in-chrome 3 times

Confirmed the bug precisely: inside the 262px map column, the promo's content lays out 654px wide and gets clipped by overflow-hidden.

- title The Strokes and Gorillaz… renders as one 491px line (line-clamp-2 never engages — nothing constrains its width)
- Read this → sits at x=1412, entirely outside the box
- the thumbnail collapses to 3px wide (h-full + items-center = no height to derive aspect-square from) — the sliver visible in your photo

It's the mobile-banner format: it strings image + kicker + title + teaser + CTA into a single row with every item flex-none. That's fine at 320px, hopeless at 262. Let me fix the format so it can't overflow.

⏺ Update(components/ads/Placement.tsx)
Added 18 lines, removed 1 line
 */
const TYPE: Record<
  PlacementSize,
  { kicker: string; title: string; teaser: str
  { kicker: string; title: string; teaser: string; cta: string; thumb: string }
> = {
  mrec: {
    kicker: "text-[0.6rem]",
    title: "text-[1.7rem] leading-[0.95] line-clamp-3 text-balance",
    teaser: "text-[0.78rem] leading-snug line-
    cta: "text-[0.66rem]",
    thumb: "",
  },
  "half-page": {
    kicker: "text-[0.68rem]",
    title: "text-[2.6rem] leading-[0.92] line-
    teaser: "text-[0.95rem] leading-snug line-clamp-6",
    cta: "text-[0.78rem]",
    thumb: "",
  },
  leaderboard: {
    kicker: "text-[0.6rem]",
    title: "text-[1.5rem] leading-[1] line-clamp-2 max-w-[24ch]",
    teaser: "text-[0.8rem] leading-snug line-c-w-0",
    cta: "text-[0.7rem]",
    thumb: "w-[86px]",
  },
  "mobile-banner": {
    kicker: "text-[0.55rem]",
    title: "text-[1.05rem] leading-[1] line-cl
    teaser: "hidden",
    cta: "text-[0.62rem]",
    thumb: "w-[72px]",
  },
};

/** Wide, short formats lay the same parts out on one line. */
const HORIZONTAL: PlacementSize[] = ["leaderbo

/**
 * Horizontal formats that can't afford a single row of parts.
 *
 * `stretch` lets a unit render narrower than its nominal format — the map
 * column is 300px of grid minus padding and b
 * around 260. Strung out on one line (thumb, kicker, headline, CTA) that
 * content measured 654px and was silently cli
 * overflow-hidden: headline cut mid-word, CTA
 * Stacking the type beside the thumbnail is wve
 * a container narrower than itself.
 */
const STACKED: PlacementSize[] = ["mobile-bann

export default function Placement({
  slot,
  size,
You've hit your monthly spend limit.
/usage-credits to adjust your monthly spend limit.

✻ Worked for 3m 29s · 5 background tasks still running

❯ just capture in backlog dont fix yet

  the tool tip doesnt fit, the south america cluster is crazy, the ad box is crazy
You've hit your monthly spend limit.
/usage-credits to adjust your monthly spend limit.

the tagline The alternative guide to everywhere. could change to
The *always fresh* guide to anywhere. 

the font could be bold in always fresh

the alternativeness remains in DNA but we dont have to overtly announce this sort of thing, if you know you know. freshness has much better appeal

We can continue to be alternative without mentioning in the tag line to make space for the concept of guaranteed freshness. get a group together to revise this tagline for the best one across all languages, with chief editor, all language editor translators, CMO, TOV. get a group together (product trio and all skills they choose to invite) to figure out how to enforce this promise of being always fresh even further. Last Revised date of articles should be prominent for the reader for example. last update of site content as a whole could be in header, linking to the latest article published or revised at that timestamp

Also I feel the fonts in general on desktop are a bit too tiny, kinda too hard to read the secondary ones even. I like everything in look and feel though, it's really a great look
