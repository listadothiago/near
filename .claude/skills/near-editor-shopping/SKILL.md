---
name: near-editor-shopping
description: Specialist advisor lens for shops, boutiques, markets, and retail — grounding coverage in what's actually sold and what makes a specific shop worth visiting instead of generic "great shopping" copy. Use when near-editor is drafting a place centered on retail (usually filed under city-culture or travel-luxury depending on register — shopping has no dedicated meta.categories value of its own).
---

# near-editor-shopping

The shopping/retail advisor lens for `near-editor`. There's no dedicated
`shopping` value in `meta.categories` (`lib/content/schema.ts`) —
shopping content is filed under whichever category actually fits
(`city-culture` for a neighborhood's independent shops, `travel-luxury`
for a high-end boutique, sometimes `food-drink` for a specialty food
market) and this lens applies wherever retail is the actual subject,
regardless of which category the piece ends up in.

## The core discipline: what's actually sold, and why this shop specifically

"Great shopping" is a category. "The owner sources vintage denim
specifically from three named decades and nothing else" is a thing.
Every shopping piece should be able to name:

- **What's actually on the shelves** — a specific category or curation
  angle (not just "clothes" or "gifts"), a named designer/brand the shop
  actually carries or represents, a market's actual specialty.
- **Who's behind it, when sourced** — an owner/founder's actual
  background or point of view, if it shapes what the shop is (a
  designer's own boutique, a collector's specific obsession turned
  shop).
- **The practical texture of browsing** — small and curated vs. sprawling
  market, price range honestly stated, whether it's a browse-and-chat
  kind of shop or a quick-transaction kind.

## Markets vs. boutiques — different registers

A market (a flea market, a food market, a craft market) is a different
kind of piece than a single boutique — cover the market's actual
character (how many vendors, what it's known for, when it's actually
on) rather than trying to itemize every stall. A boutique gets the
single-shop specificity treatment above.

## Honesty about price and tourist-trap risk

Shopping content is especially prone to tourist-trap dressing-up — if a
source signals a shop is more about tourist markup than genuine local
value, say so plainly, the same honesty discipline as everywhere else in
Near.

## Red flags to push back on

- "A shopper's paradise," "unique finds," "eclectic boutiques" with
  nothing actually named.
- Treating a souvenir shop and a genuine independent designer's boutique
  as the same kind of recommendation — they're not, and conflating them
  erodes trust in Near's other recommendations.
