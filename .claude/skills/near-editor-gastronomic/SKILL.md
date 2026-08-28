---
name: near-editor-gastronomic
description: Specialist food-and-drink advisor lens consulted by near-editor when drafting a place with the food-drink category — grounds the writing in specific dishes, techniques, and kitchen context instead of generic "delicious food" copy. Use when near-editor (or near-refresh, via near-editor) is drafting or updating a restaurant, bar, café, market stall, or any food-drink place.
---

# near-editor-gastronomic

The food-and-drink advisor lens for `near-editor`. Not a separate voice —
Near still has one voice (see `near-editor`'s
`references/style-guide.md`) — this skill sharpens that voice for the
`food-drink` beat by insisting on specificity a generalist pass tends to
skip.

`near-editor` consults this skill while drafting the bullets and long-form
body for any place carrying the `food-drink` category. This skill doesn't
fetch sources or write files itself — it hands back sharper, more specific
language and judgment calls for near-editor to fold into the actual draft.

## The core discipline: name the thing, not the category

"Great food" is a category. "The hand-pulled noodles are cut to order and
go straight into the broth within a minute" is a thing. Every bullet and
every food-focused paragraph in a Near piece should be able to name:

- **The specific dish or drink**, not just "the menu" — what a first-time
  visitor should actually order, by name if the source names it.
- **What makes this kitchen's version different** from the version down
  the street — a technique (wood-fired, hand-pulled, dry-aged, fermented
  in-house), an ingredient sourcing detail, a regional style the kitchen
  is specifically working in (not just "Japanese food" but the specific
  regional or sub-genre tradition if the source supports it).
- **The texture of actually eating there** — counter seats vs. table
  service, whether it's a stand-and-eat spot, how fast the turnover is,
  what the room smells/sounds like if a source or `claude-in-chrome`
  observation supports it.

If the available sources genuinely don't go this deep — a source that
just says "great pasta" and nothing else — don't invent the specific
detail to fill the gap. Write what's actually supportable, and let the
piece be a little shorter and more honest rather than padded with
invented specificity. Near never fabricates a dish, a technique, or a
sourcing claim that isn't in a source.

## Price and value, honestly

Where a source gives real signal on price (expensive, a splurge, dirt
cheap for what you get, a tourist-trap markup), say so plainly — this is
part of the honesty rule in the main style guide, not a separate rule.
"Not cheap, but the portion could feed two" is useful; silence on price
when a source mentions it is a missed chance to be useful.

## Dietary and practical notes

When a source mentions it, carry forward real practical detail a visitor
would want: reservations required/not accepted, cash-only, a wait to
expect at peak hours, genuinely vegetarian/vegan-friendly (not just "has
a salad"), a language barrier at the counter. These are exactly the kind
of concrete, well-observed details the style guide asks for over generic
adjectives — they also happen to be the most useful sentence in the piece
for someone actually about to go.

## When a place spans food-drink and nightlife-sound

A late-night bar with a serious kitchen, or a restaurant that turns into
a DJ set after 11pm, legitimately carries both categories. Let both
lenses inform the same piece rather than picking one — the gastronomic
lens covers what's on the plate/in the glass, the nightlife lens (see the
style guide's "insider-tastemaker" register) covers the room after dark.
Don't force an artificial split into two sections; one well-written piece
can carry both registers if the place actually does.

## Red flags to push back on

If near-editor's draft (or a source it's working from) leans on any of
these, this lens should flag it for a rewrite before publish:
- "Delicious," "amazing food," "a hidden gem for foodies" with nothing
  concrete underneath.
- A dish description with no verb — list-of-ingredients copy instead of
  what's actually done to them.
- Praise with no source backing it — see the main honesty rule; this
  applies to positive claims exactly as much as negative ones.
