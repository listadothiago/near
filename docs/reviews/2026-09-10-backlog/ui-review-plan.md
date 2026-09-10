# Near whole-UI review plan

Date: 2026-09-10
Status: first implementation slice complete; live validation pending deployment

## Brief

Modernize Near enough that its freshness is immediately credible without losing
the current newsprint palette, acid-green accent, heavy rules, hard shadows,
uppercase display voice or badge-led alternative-press character. Flipboard web
is a hierarchy and navigation reference, not a visual template. There is no page
flip effect and no custom AR viewer in scope.

## Research findings

The current interface communicates a strong point of view, but three system-level
choices make it feel older and harder to read than the content deserves:

1. Courier Prime is the global body face as well as the metadata face. At the
   small sizes used on cards and long-form pages, this makes prose slower to scan
   and visually collapses editorial copy into utility labels.
2. A global `border-radius: 0 !important` rule prevents components from expressing
   hierarchy. Cards, inputs, tabs, map panels and badges all have the same hard
   silhouette, so the page reads as a dense document rather than a current app.
3. The board exposes good information but gives every signal nearly equal visual
   weight. Search, navigation, filters, badges, sources and excerpt copy compete
   before the reader reaches the actual place headline.

The existing strengths should remain: the palette works in both themes; distance
and recency are valuable prominent signals; the header is compact and functional;
the card photography, category labels and hard shadows make Near recognizable.

## Design proposal

### Type roles

- Use Space Grotesk for body and editorial copy. It is already shipped through
  `next/font`, supports the six-locale UI strategy already in production, and
  avoids adding another font payload while this direction is validated.
- Keep uppercase Space Grotesk display headings unchanged for brand continuity.
- Keep Courier Prime only for labels, dates, sources, badges, locations and other
  compact editorial metadata.
- Set long-form copy around 19 px at the current root scale, 1.8 line-height and a
  65-character measure. Card excerpts move to a readable sans size and looser
  leading while retaining their current clamps.

### Shape roles

- Panels/cards: 14 px radius, still with 3 px borders and offset hard shadows.
- Controls: 8 px radius and at least the existing touch target.
- Badges/metadata: 4 px radius so they remain deliberately more mechanical than
  the containing card.
- Do not round layout rules, image content itself, or map markers. Containers clip
  media to their own radius.

### Hierarchy and interaction

- Keep the sticky header, universal search, locale/theme controls and existing
  compact-on-scroll behavior.
- Keep distance and recency badges always visible. Reduce competition from source
  metadata and supporting prose through type role and spacing rather than hiding
  useful information.
- Preserve hover translation and hard-shadow growth on cards; add a visible focus
  treatment as the design system is expanded.
- Mobile remains a single-column reading surface. Filters continue to collapse;
  no desktop-only interaction becomes necessary to browse.

## Product Trio decision

Ship the readability and core-surface pass first because it reaches every reader,
has high confidence from direct operator feedback, and does not alter data,
routing, SEO or consent behavior. Use the existing font files and tokens, which
keeps CLS and technical risk low. Validate the direction before rounding every
minor legacy component or adding a new font family.

For this first slice:

- Must: body typography, long-form typography, board cards, search/filter
  controls, map panel, primary editorial panels, light/dark parity, desktop/mobile
  checks, typecheck and production build.
- Should: collection/column cards and common feedback/promotional panels.
- Could: secondary account/admin surfaces and a later typeface comparison if
  Space Grotesk does not feel warm enough in real reading.
- Won't now: page flipping, custom AR viewer, new color palette, notification or
  email preference collection, and broad navigation restructuring.

## Follow-up phases

1. Complete a component inventory and migrate remaining legacy `font-mono` prose
   to the body role without changing genuine metadata.
2. Review article hero, ad rail and supporting modules together at 320, 390, 768
   and 1440 px plus 200% zoom.
3. Simplify icon-led navigation only where labels remain clear to first-time
   readers; avoid mystery icons.
4. Separately design the install and communication-preference flow. It must offer
   accept/customize/decline, remain editable, and clearly separate remembered
   interests, email choice, browser permission and an operational push
   subscription. Browsing remains fully usable when declined; no preference data
   is collected until durable consent storage and withdrawal are implemented.

## Acceptance checks

- Body copy is sans and readable without zoom; mono is visibly reserved for
  metadata.
- Main cards and controls are modestly rounded while badges still feel like Near.
- No palette or semantic-information regression in light or dark mode.
- Header and board do not overflow at 320/390 px; long-form measure remains
  comfortable at desktop width and at 200% zoom.
- Keyboard focus, reduced motion, build and type checks pass.

## First-slice result

Implemented on 2026-09-10: Space Grotesk is now the default body and long-form
face; Courier Prime is retained for editorial metadata. Long-form copy, card
taglines/excerpts and common explanatory panels received larger sans sizing and
looser leading. Core cards, search/filter controls, article imagery, map panels
and common editorial panels now use the panel/control/badge radius scale while
retaining Near's borders, palette and hard shadows. TypeScript passed and the
webpack production build generated all 1,185 static pages. Turbopack's build path
could not bind its local helper port in the execution environment, so the
supported webpack fallback supplied the production-build verdict.
