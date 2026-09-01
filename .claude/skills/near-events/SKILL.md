---
name: near-events
description: Finds specific, dated, far-out events (concerts, festivals, pride parades, tournaments, exhibition openings) worth building or attaching Near content to. Partners with near-seo (which market/query gap this fills) and RADAR-X/near-trendsetter (what's actually current in the alt-press) rather than searching blind. Use at the start of a content push, alongside near-seo's opportunity-finding, and whenever near-editor needs a dated hook for a piece.
---

# near-events

Near's content ages better when it points at something specific and
checkable in the future, not just a vibe. This skill exists because
that's a distinct research job from "what place should we write about"
(`near-editor`) or "what's the SEO gap" (`near-seo`) — it's "what's
actually happening, and when."

**Operator directive (2026-08-31): the further out the better.** A
concert next Tuesday is stale by the time most readers see it. A
festival, tournament, or parade date months out gives a piece a real
shelf life before `near-caretaker`'s event-expiry logic needs to touch
it, and gives readers something to actually plan around instead of a
vague "great scene here" claim. When several real candidate events
exist for the same place, prefer the one furthest out on the calendar,
all else equal — never invent or round a date to make it seem further
out than it is.

## How this partners with SEO and the trendsetter

This is a three-way handshake, not a solo research pass:

1. **`near-seo`** says which market/category gap is worth filling right
   now (its `content/opportunities.md` ranking) — this skill doesn't
   re-derive that, it consumes it.
2. **RADAR-X** (the trendsetter persona, `.claude/skills/near-editor`'s
   roster — see BACKLOG.md EPIC 4) says what's actually current in the
   alt-press for that market: a scene that's heating up, a venue getting
   real coverage, a recurring event alt-weeklies keep mentioning.
3. **`near-events`** takes that combined steer and finds the actual
   dated occurrences — the specific date on a venue's own listings page,
   a festival's official 2026/2027 dates, a sports league's published
   fixture list, a Pride parade's confirmed date — not a generic "happens
   every summer" claim.

Call order in a war room or refresh: near-seo ranks the gap → RADAR-X
names the scene/venue → near-events finds the actual date(s) → near-editor
drafts the place/event page using rules.md's `event-belongs-to-venue`
and `event-expiry` rules.

## What counts as a good find

- A specific date (or date range) on the event's own primary source —
  the venue's own site/ticketing page, an official festival site, a
  league's fixture calendar — not a secondhand "usually happens in
  September" claim from a listicle.
- Far enough out to be useful when the piece publishes and stays useful
  for a while after — weeks-out beats days-out, months-out beats
  weeks-out. A one-off concert next Tuesday is a weak find even if it's
  real; a confirmed festival date five months out is a strong one.
- Recurring events (an annual parade, a monthly night) still need a
  *specific instance's* date pulled from a live source — "happens every
  year" isn't a Near-quality claim, "confirmed for 16 Nov 2026" is.

## What to do with a find

- If the event belongs to a place Near already covers: hand it to
  `near-editor`/`near-caretaker` to set `meta.eventEndsAt` on a child
  event per `event-belongs-to-venue` in `content/rules.md` — the event
  gets its own page and URL, the venue's card shows a "next" ribbon.
- If the event belongs to a place Near doesn't cover yet: that's a
  `near-editor` place candidate in its own right, with the event as the
  hook that makes it timely — hand off the venue + the dated event
  together rather than as two separate asks.
- Log events that are real but too soon to be worth the "further out is
  better" bar, or too vague to date precisely, rather than silently
  discarding them — a future run may find a better-dated instance of the
  same recurring event.

## What this skill does not do

Doesn't decide what market/category to look in (that's `near-seo`'s
call) and doesn't write place copy (that's `near-editor`/`near-translator`).
It's the dated-fact-finding layer between "what's the opportunity" and
"here's the actual page."
