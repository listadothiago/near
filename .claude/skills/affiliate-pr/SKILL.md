---
name: affiliate-pr
description: Near's affiliate-revenue specialist — finds affiliate programs genuinely relevant to what Near already covers (accommodation, tickets/events, travel, food-drink, shopping), applies to them, negotiates terms, and wires approved links into published pieces with mandatory disclosure. Owns content/affiliate-outreach.md as the durable relationship log. Mandatory consultation in near-write-article's pipeline on every piece, alongside backlink-pr. Use whenever the operator asks about affiliate revenue, monetizing content, commissions, partner programs, or "how does this piece make money."
---

# affiliate-pr

Near's revenue counterpart to `backlink-pr`. Same shape — find targets,
reach out honestly, keep a durable relationship log — but the goal is
**commission revenue** rather than inbound links. Operator's stated
north star: grow the site organically and make money.

The two skills are deliberately parallel and run together in
`near-write-article`, because they answer the same question from
opposite ends: `backlink-pr` asks "who should link to this piece,"
`affiliate-pr` asks "what does a reader of this piece go and buy."

## The rule that outranks every other rule here

**An affiliate relationship must never change what Near covers, or how
positively Near covers it.**

Near's entire value is honest curation by personas that will say a place
is overpriced or hostile to walk to. A reader who suspects the
recommendation was bought stops trusting every other page on the site,
and that loss is permanent and total — it is worth vastly more than any
commission. So:

- **Coverage decisions come first, monetization second, always.** A place
  is chosen by `near-seo` / `near-trendsetter` / the rotation, then
  affiliate opportunities are checked *against the piece that already
  exists*. Never the reverse. A venue is never added to a queue because
  it has an affiliate program.
- **Never soften a negative for a partner.** `content/rules.md`'s honesty
  and attribution rules bind unchanged. If a hotel has a genuine problem
  a source raised, it stays in the piece whether or not the booking link
  pays.
- **Never invent a reason to link.** If a piece has no natural purchase
  moment, it earns no affiliate link. A shoehorned "book your stay here"
  in a piece about a free public lake is transparently cynical.
- **Disclose, always.** Non-negotiable, and consistent with the
  radical-transparency mandate that already makes every byline disclose
  itself as AI. Near loses the thread entirely if the authorship is
  transparent but the commercial relationship is hidden.

If a program requires guaranteed positive coverage, minimum star
ratings, approval over copy, or removal of criticism as a condition of
participation: **decline, and log why.** That is not an affiliate
program, it is paid placement wearing one's clothes, and it belongs to
`ad-sales` under an explicit `sponsored` flag or nowhere at all.

## Where the money plausibly is, given what Near actually covers

Check the catalogue before chasing a program. Near's categories and
their realistic affiliate surfaces:

- **`accommodation`** — the strongest fit by a distance, and currently
  Near's emptiest category (see `content/opportunities.md`'s coverage
  audit: 0 accommodation places at the last count, with NITE-PORTER as a
  byline that has barely written). Booking aggregators, hostel networks,
  and direct-with-hotel programs. A published hotel piece with a booking
  link is the single most natural revenue unit Near can produce.
- **Events/tickets** — Near already publishes dated events with real
  ticketing pages (`event-belongs-to-venue` gives them their own URLs).
  Ticketing affiliate programs map directly onto this.
- **`travel`** — transport, passes, tours. Weaker fit: Near is a guide to
  specific addresses, not an itinerary broker, and generic tour-booking
  widgets read as spam on a place page.
- **`shopping`** — record shops, bookshops. Often these are exactly the
  small independents Near exists to champion, and sending a reader to a
  commission-paying marketplace instead of the shop's own till actively
  works against the piece's argument. Usually decline; link the shop.
- **`food-drink`, `nightlife-sound`** — mostly reservation platforms.
  Thin commissions, and the good venues are often not on them.

## Step 1 — Audit before outreach

Read `content/_stats.json` and the catalogue to establish what Near
actually has traffic-worthy coverage of, then read
`content/affiliate-outreach.md` for anything already contacted. Do not
re-approach a program that declined three weeks ago.

Never onboard a program off a single piece — the same discipline
`near-sources` applies to sources. A program is worth applying to when
Near has, or is about to have, **several** pieces it would genuinely
serve.

## Step 2 — Qualify the program honestly

Before applying, establish and record: commission rate and cookie
window; whether it pays on a real conversion a Near reader would
plausibly make; whether the program's own brand is one Near's personas
could recommend without lying; and any editorial conditions attached
(see the decline rule above).

A program that pays well but sends readers somewhere worse than the
venue's own site fails on the only test that matters long-term.

## Step 3 — Apply / negotiate

Applications and negotiation happen over email via the Gmail tools,
same as `backlink-pr`'s outreach. Be plain about what Near is: an
AI-bylined, AI-disclosed, multilingual city guide, small but growing,
with an editorial independence policy that is not negotiable. Programs
that are fine with that are the ones worth having.

**Gate every send.** Never email an external party without showing the
operator the exact draft first and getting explicit approval — this is
outward-facing, hard to reverse, and speaks for Near.

## Step 4 — Wire links into pieces, disclosed

Once a program is approved, an affiliate link is added only where the
piece already has a natural purchase moment. The disclosure is visible
and adjacent to the link, not buried in a footer.

Wherever a piece carries affiliate links, set `meta.sponsored` only if
the *coverage itself* was paid for — which for a true affiliate
relationship it is not. Affiliate disclosure and sponsorship are
different claims; do not conflate them. If the schema has no field for
affiliate disclosure yet, that is a real gap: log it to `BACKLOG.md`
rather than quietly shipping an undisclosed link.

## Step 5 — Log everything

`content/affiliate-outreach.md` is this skill's durable memory, parallel
to `content/backlink-outreach.md`. One entry per program: name, category,
what was offered, contact channel, dates of every touch, current state
(`prospect` / `applied` / `approved` / `declined` / `rejected-by-us` with
the reason), commission terms, and which pieces carry its links. A
program Near declined on editorial grounds is recorded as exactly that,
so a future session doesn't cheerfully re-apply.

## What this skill does not do

Doesn't choose what Near covers — that's `near-seo`, `near-trendsetter`,
and the rotation. Doesn't write or edit body copy beyond inserting a
disclosed link at an existing purchase moment. Doesn't sell ad
placements (`ad-sales`) or chase links (`backlink-pr`). Doesn't ever
overrule `near-legal-counsel` on disclosure compliance.
