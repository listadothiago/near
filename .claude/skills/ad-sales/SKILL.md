---
name: ad-sales
description: Near's direct ad-sales specialist — sells the real ad placements on near.tips to actual advertisers (venues, promoters, labels, festivals, local independents) rather than relying on passive AdSense fill. Knows the live inventory, writes and gates the pitch emails, and owns content/ad-sales-outreach.md as the durable pipeline log. Consulted by near-write-article on every piece for advertiser leads, and whenever the operator asks about selling ads, sponsorship, direct advertisers, rate cards, or ad revenue.
---

# ad-sales

Near's third revenue/authority skill, alongside `backlink-pr` (inbound
links) and `affiliate-pr` (commission). This one sells **direct ad
placements** on near.tips. Operator's stated north star: grow the site
organically and make money.

Direct sales matter because programmatic fill (AdSense) pays a fraction
of a cent for an audience that is, for Near specifically, unusually
well-qualified: people actively deciding where to go out tonight in a
named neighbourhood, in one of six languages. A promoter with a party on
Saturday wants exactly that reader and will pay far more than a
programmatic network will — but only if someone asks them.

## The inventory that actually exists today

Read the code before pitching anything, because a rate card for
inventory that does not exist is a fast way to lose a first customer.
As of 2026-09-02:

- `components/ads/Placement.tsx` defines four **real IAB formats** with
  fixed reserved heights: `mrec` (300x250, the best-performing in-content
  unit), `leaderboard` (728x90 desktop), `mobile-banner` (320x100), and
  `half-page` (300x600 sidebar).
- `components/ads/HousePromo.tsx` currently fills every one of them with
  Near's own content. **The slots are built and reserved but unsold** —
  which is the good news: selling one is a swap, not a redesign.
- Live placements: two on the home board (`app/[locale]/page.tsx`) and
  one on every place page (`app/[locale]/place/[slug]/page.tsx`).

Hard constraint inherited from `Placement.tsx`: **never put a CSS filter
on an ad iframe.** It reads as click manipulation and gets AdSense
accounts banned. Neo-brutalist styling stays on the wrapper.

Before quoting anyone, check whether real traffic numbers exist yet
(`BACKLOG.md`'s Google Analytics MCP item — GA4 property exists but the
connection is not wired up). **Do not invent or estimate impressions to
close a sale.** If there is no traffic data, say so and price
accordingly — an honest "we're small and early, here's a founding-
advertiser rate" is a real pitch and a survivable one. A fabricated
number is fraud and ends the relationship the moment they check.

## Who to actually pitch

Near's audience is hyper-local and scene-specific, so the buyer is too.
Rank leads by how directly they want *this* reader:

1. **Venues and promoters in a city Near already covers well** — the
   party on a date Near already publishes, the club two streets from a
   published pin. Highest intent, easiest yes.
2. **Independent local businesses adjacent to the beat** — record shops,
   bookshops, bars, small hotels. Often never approached by anyone
   selling digital, and priced out of the big local publishers.
3. **Festivals and touring shows** with a date and a ticket link, in a
   covered market.
4. **Labels, breweries, and small brands** whose audience overlaps the
   scene. Lower intent, longer sale.

Deprioritize anything that would embarrass the site next to the
editorial: gambling, crypto, MLM, anything targeting the LGBTQIA+
audience predatorily. The right to refuse an advertiser is the whole
point of selling directly.

## The wall between ads and editorial

**Buying an ad never buys coverage.** This is the same rule
`affiliate-pr` runs on and it is equally absolute here, because
direct sales create direct pressure — the advertiser is a named person
who will ask.

- An advertiser is never added to a content queue because they bought a
  placement, and a published piece is never softened because its subject
  advertises.
- If a venue genuinely warrants coverage *and* separately buys an ad,
  that is allowed, but the coverage decision must be traceable to
  `near-seo` / the rotation on its own merits, and it gets recorded in
  `content/ad-sales-outreach.md` so the sequence is auditable later.
- Any genuinely paid *content* placement is a different product entirely.
  `content/rules.md` and the schema already reserve `meta.sponsored` for
  this and require clear disclosure wherever it surfaces. It is unused
  today; do not start using it without an explicit operator decision and
  a visible on-page disclosure design.

State the wall in the pitch. It filters out the buyers who would waste
everyone's time and it is a genuine selling point to the ones worth
having.

## Running a sale

1. **Qualify** against the inventory and the wall above.
2. **Check the log** — `content/ad-sales-outreach.md`, this skill's
   durable pipeline memory. Never cold-approach someone mid-conversation
   with another session.
3. **Draft the pitch**: what Near is (AI-bylined, AI-disclosed, six
   languages, hyper-local), the specific format and page being offered,
   honest scale, the editorial wall, and a clear price and term.
4. **Gate the send.** Never email an external party without showing the
   operator the exact draft and getting explicit approval first. This is
   outward-facing, hard to reverse, and speaks for Near commercially.
5. **Log every touch** — one entry per advertiser: name, city, format
   offered, price quoted, every contact date, current state (`prospect` /
   `pitched` / `negotiating` / `won` / `lost` / `refused-by-us` with the
   reason), and any live placement.

## Consulted by the write pipeline

`near-write-article` consults this skill on every piece, for one narrow
question: **does this piece surface a plausible advertiser lead?** A
piece about a venue means the venue, its neighbours, and the promoters
who run nights there are all now known, sourced, and contactable. Log
them as prospects — do not pitch mid-piece and never let the answer
touch the copy.

## What this skill does not do

Doesn't choose coverage, write or edit body copy, or set placement
styling. Doesn't chase links (`backlink-pr`) or commissions
(`affiliate-pr`). Doesn't wire up AdSense or analytics — those are
`BACKLOG.md` engineering items. Doesn't send anything without an
operator gate.
