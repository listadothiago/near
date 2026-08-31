# Near — analytics dashboard (text)

A working reference for the operator, kept in the repo rather than built
as a page. Nothing here ships to readers.

Numbers live in **Vercel Analytics → near.tips → Events**. This file
explains what each number means, what to compare it against, and what to
do when it moves. Read it before reading the graphs — most of the
mistakes available here are interpretation mistakes, not measurement
ones.

Everything is **cookieless**, via `@vercel/analytics`. That's the whole
reason near.tips carries no consent banner, and it's a constraint, not a
detail: no event may ever carry personal data. Slugs and slot names
only — no coordinates, no free text, no identifiers. `lib/analytics.ts`
is the single place events are declared, and it says the same thing.

## The funnel

Near has no checkout, so the funnel isn't a purchase path — it's depth
of relationship. Each rung is roughly an order of magnitude rarer than
the one above it, and that's expected.

| Rung | Event | What it means |
|---|---|---|
| Reach | *(pageviews, built in)* | Someone arrived. Mostly a measure of search luck. |
| Engage | `engaged_session` | Someone actually read. |
| Return | `favorite_added` / `favorite_removed` | Intent to come back, with no login asked for. |
| Commit | `install_accepted` / `install_dismissed` | The home-screen icon. Primary goal. |
| Advocate | `share_native` / `share_copied` | The only acquisition Near doesn't pay for. |

Plus two that are not funnel rungs:

- `placement_view` / `placement_click` — house-promo performance.
- `favorites_exported` — diagnostic. Rare by nature; mostly says
  someone is about to change device.

### `engaged_session`, precisely

Fires once per article page, when the reader has been there **30 seconds
AND scrolled past a quarter of the page**. Both halves are required:
time alone counts an abandoned tab, scroll alone counts a thumb flick.

The name says "session" but it is per-article — read it as *engaged
read*. It is deliberately conservative, so the number is small and true
rather than large and flattering. Implemented in
`components/layout/EngagedRead.tsx`, mounted on place pages.

### `install_accepted`, and why it's the primary goal

Not for retention, and the operator has been explicit about this: the
reason to push the PWA is that **Near looks like a real app when
installed**, and that's the product's best face. Retention is the happy
side effect. So judge the install prompt on accept rate, but judge the
*installed experience* on whether it looks right — that part isn't a
metric.

Both outcomes are recorded. `install_dismissed` climbing faster than
`install_accepted` means the prompt is firing at the wrong moment, not
that the app is unwanted.

## Placement inventory

Every unit is Near's own content today, labelled "From Near" — never
dressed as third-party advertising. The `slot` name is the stable
analytics key and **must survive** the switch to real inventory, or the
history breaks.

| Slot | Where | Format | Notes |
|---|---|---|---|
| `board-inline` | Home board, 6th cell of the card grid | mrec 300×250, stretched | Also fills a hole left by the double-width feature cards. |
| `place-in-article` | Below the article body on a place page | mrec 300×250 | Excludes the page it's on — never promote a reader to where they already are. |

What each placement promotes is decided in
`components/ads/HousePromo.tsx`: collections first (a guide is worth more
per click than a single pin, and guides are the hardest thing on the site
to stumble across), falling back to a place. The pick is a hash of the
slot name — **deterministic on purpose**, so the same page doesn't
promote something different on every request and make the click-through
rate unreadable.

**As the refresh produces better articles, promote them.** That's an
editorial decision, not an automatic one: when a city refresh lands
something genuinely strong, it should become the thing the placements
point at. Record the swap here with a date, so a jump in
`placement_click` can be attributed to the change rather than mistaken
for a trend.

_Promotion log:_
- 2026-08-31 — Only one collection exists (`asian-food-sao-paulo`), so
  both slots resolve to it. First entry to update once the London and
  São Paulo refreshes produce collections of their own.

### Reading placement numbers

**CTR is the number the operator actually wants**, so it's worth being
precise about how to compute it and what can corrupt it.

- **CTR = `placement_click` / `placement_view`.** Views are counted at
  50% viewability via IntersectionObserver, roughly the way an ad server
  counts them — so this CTR is comparable to a real one, and a house CTR
  under ~0.5% is a weak unit, not a weak audience.
- Both events carry `slot`, `size` **and `creative`**, so CTR splits
  three ways: by position, by format, and by artwork treatment.
  `creative` is one of:
  - `poster` — full-bleed hero photo with the type over a scrim (tall
    formats)
  - `thumb` — square image beside the type (wide, short formats)
  - `text` — no image available for the promoted article
  Without that third dimension, changing the artwork and changing the
  promoted article look identical in the data. **Always compare like
  creative to like creative**, and when both change at once, treat the
  result as uninterpretable rather than guessing which caused it.
- One caution on `poster` vs `text`: a poster unit will almost certainly
  win, and that is only partly a design finding. It also means the
  promoted article *has* a usable hero, which correlates with it being
  better sourced. Don't read the gap as pure creative lift.
- A high `placement_view` with near-zero clicks in one slot and not the
  other is a **placement** problem, not a creative problem.
- Never put a CSS filter on an ad iframe. It reads as click manipulation
  and gets AdSense accounts banned — this is also why the site-wide
  grayscale treatment was removed outright rather than scoped around ads.

## What to check, and how often

**Weekly, five minutes:**
1. `engaged_session` ÷ pageviews. This is the health of the writing. If
   traffic climbs while this ratio falls, the new traffic is the wrong
   traffic.
2. `install_accepted` vs `install_dismissed`.
3. CTR per slot.

**Per refresh (London → São Paulo → Berlin → Amsterdam):** compare
engaged reads per article for the refreshed city against its
pre-refresh baseline. This is the only way to tell whether a refresh was
worth the tokens, so **write the baseline down before starting a city**,
not after.

**Per new article:** nothing. A single article's numbers on a site this
size are noise, and reading them as signal will make bad editorial
decisions. Look at cities and cohorts, not pages.

## Known blind spots

Worth writing down, because a dashboard that doesn't state its own gaps
gets over-trusted:

- **No cross-device or cross-session identity.** Cookieless means a
  returning reader is a new reader as far as this data is concerned.
  Retention is genuinely not measurable here — `install_accepted` is a
  proxy for it, not a measurement of it.
- **No referrer-level attribution for shares.** `share_copied` records
  that a link left the site, never whether anyone followed it.
- **Locale isn't on the events.** Six locales, and the events can't
  currently tell you which one converted. Worth adding as a prop when
  there's enough volume for the split to mean anything; it isn't yet.
- **Ad-blockers suppress everything here**, and Near's readership skews
  exactly the way that suppresses hardest. Treat every absolute number
  as a floor, and prefer ratios over counts.
