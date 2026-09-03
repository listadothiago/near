# Events views & full map view — Product Trio + UX scoping

**Date:** 2026-09-03
**Requested by:** operator, verbatim in `BACKLOG.md:3541` — *"please invoke
product trio and the UX team skills/agents to figure out how we will tackle
the events views and full map views"*
**Convened:** `near-lead-product`, `near-tech-lead`, `near-lead-ux` (Product
Trio) + `near-ux-researcher`, `near-ux-designer` (UX team), with `near-events`
consulted on the content type and `near-ceo` called once to break a real
deadlock.
**Status:** scoping and design only. No code, schema or component was changed
in producing this document.

---

## 0. TL;DR

1. **The tooltip bug is a two-line CSS omission plus a fixed-pixel width.**
   Root cause is `white-space: nowrap` inherited from `leaflet.css:584` and
   never reset in `app/globals.css:231-238`. Cheapest, highest-RICE item on
   the board. Ship it first, alone.
2. **Events are already first-class in the schema.** No schema change, no
   backfill, no migration. `placeMetaSchema` (`lib/content/schema.ts:110-112`)
   already carries `parentPlace`, `eventStartsAt`, `eventEndsAt`, and
   `getUpcomingEventsByParent` (`lib/content/loader.ts:151-186`) already does
   the query an events view needs. **The events view is cheap to build.**
3. **…and that is the problem.** The catalogue holds **68 places and exactly
   one real hosted event**, which expires on **2026-09-12**. An `/events` page
   shipped this week is an empty page next week. The bottleneck is content,
   not code.
4. **Shareable filter state is the same piece of work as the views**, and it
   is the *foundation* of them, not a sibling. It is URL-state design, and it
   collides head-on with a deliberate design decision recorded in
   `lib/board/controls.tsx:33-35`. Next 16's documented `replaceState`
   integration resolves that collision cleanly.
5. **Expiry must move to render time.** It is currently a server-side
   `new Date()` inside `getAllPlaces` (`lib/content/loader.ts:129-131`), gated
   behind `export const revalidate = 3600`. That is exactly the
   refresh-dependence the operator called out.

---

## 1. What is actually there today — ground truth

Read before opining, per `near-tech-lead`'s remit.

### 1.1 The map

`components/map/WorldMap.tsx`, 283 lines, one component. Leaflet 1.9 +
`react-leaflet` ^5.0.0. No clustering library is installed (`package.json`
dependencies confirmed).

- Every place becomes one `<Marker>`, rendered in a flat `points.map(...)`
  at `WorldMap.tsx:271-273`. There is no aggregation layer of any kind.
- Each marker is a `L.divIcon` teardrop SVG (`dotIcon`, `WorldMap.tsx:31-49`),
  coloured by `CATEGORY_COLOR_VAR[point.category]`.
- `MapView` (`WorldMap.tsx:83-160`) is a single effect that owns *every*
  view change — a deliberate, documented anti-race design ("two separate
  effects each calling setView/fitBounds can race and stomp on each other's
  result"). **Any clustering work must extend this effect, not add a second
  one.** This is a real cost-to-reverse comment in `near-backlog`'s sense.
- Precedence today: `locationKey` (an active location search) beats
  `focusUserSignal` (focus-on-me) beats fit-all-points. Clustering adds a
  fourth: *zoom-to-cluster*. It must slot into the same switch.
- Map is 340px tall, fixed (`WorldMap.tsx:251`), and lives in a 300px sidebar
  column on desktop (`Board.tsx` grid `md:grid-cols-[1fr_300px]`).

### 1.2 The cards

`components/board/Board.tsx` → `NearestLatestTabs` → `PlaceCards` →
`PlaceCard`. Filtering happens once, in `Board.tsx`'s `filtered` memo
(`Board.tsx:88-136`), and the **same `filtered` array already feeds both the
card list and the map** (`Board.tsx` passes `filtered` to `NearestLatestTabs`
and maps it into `points` for `WorldMap`).

**This is important and good news:** requirement 4 ("cards shown in page
should reflect what is shown in map pins") is *already true* for the filter
dimension. What is missing is the **viewport** dimension — panning/zooming the
map does not narrow the card list, and hovering a card does not highlight a
pin. So requirement 4 is a smaller build than it reads.

Sorting lives in `NearestLatestTabs.tsx:36-62` — `latest` by `publishedAt`,
`nearest` by `haversineKm` from `userCoords`. Paging is `PAGE_SIZE = 12` with
`InfiniteLoad`, which deliberately caps auto-loads to keep the footer
reachable.

### 1.3 The controls, and the load-bearing comment

`lib/board/controls.tsx` holds query + category + tag filters in React context
above both the sticky header and the board. Lines 33-35, verbatim:

> *"Deliberately not URL params: typing into the search field would push a
> history entry per keystroke and wreck the back button, which this session
> has already had to repair once."*

This is the single most consequential line in this whole scoping pass. Every
share-link requirement runs straight into it.

### 1.4 Events

`lib/content/schema.ts:100-112` — events are **not** nested inside place pages
as a sub-object. They are full `PlaceMeta` records with three extra fields:

```
parentPlace?: string          // the venue's slug
eventStartsAt?: string | null
eventEndsAt: string | null
```

`content/rules.md`'s `event-belongs-to-venue` (line 227) and `event-expiry`
(line 260) rules govern them. A child event keeps its own slug/page/URL but is
removed from the board and map by `getAllPlaces`'s `parentPlace` check
(`lib/content/loader.ts:135`), and resurfaces via `getUpcomingEventsByParent`
as a "next event" ribbon on the venue card (`PlaceCard.tsx:99-109`) and a
"coming up here" list on the venue page (`UpcomingEvents.tsx`).

**The actual corpus, measured 2026-09-03:**

| Metric | Count |
|---|---|
| Place directories in `content/places/` | 68 |
| With a non-null `eventEndsAt` | **2** |
| With `parentPlace` set (i.e. true hosted events) | **1** |

The two:

- `cabaret-latino-teatro-eskyna-santos` — the only genuine child event.
  `parentPlace: teatro-clube-da-eskyna-santos`, `eventStartsAt`
  2026-09-11T21:00-03:00, `eventEndsAt` 2026-09-12T05:00-03:00. **Expires in
  nine days.**
- `va-east-museum-stratford-london` — a *venue* carrying an exhibition run's
  dates (`eventStartsAt` 2026-04-18, `eventEndsAt` 2027-01-10) with **no**
  `parentPlace`. It is therefore a normal board card and map pin that will
  silently vanish from the entire site on 2027-01-10 because of
  `getAllPlaces`'s unconditional `eventEndsAt` check. This is the
  `eventEndsAt` build trap already logged in commit `e850066`, still present
  in the data. Flagged to `near-caretaker`; not this pass's fix, but it is a
  live time bomb and it is evidence that `eventEndsAt`-without-`parentPlace`
  needs either a schema refinement or a lint.

### 1.5 Expiry is refresh-dependent today — confirmed

`lib/content/loader.ts:129-131`:

```ts
if (p.meta.eventEndsAt && new Date(p.meta.eventEndsAt) < new Date()) {
  return false;
}
```

This runs **on the server**, during static generation or ISR revalidation. The
home page carries `export const revalidate = 3600` (`app/[locale]/page.tsx:22`)
with a comment explicitly claiming this is what makes events drop off "without
requiring a new commit/deploy". `app/[locale]/in/[...location]/page.tsx:25`
carries the same.

So an expired event can sit on the board for up to an hour, and on any route
without `revalidate` it sits there until the next deploy. **The operator is
correct and the current comment is over-claiming.** Requirement 8 is a real
defect, not a nice-to-have.

---

## 2. The tooltip bug — root cause, with file:line

**Operator:** *"the pin tooltip is very wonky right now, the text leaks, the
image leaks…that pin tool tip needs to be responsive."*

Two independent causes producing one symptom. Both confirmed by reading the
CSS, not guessed.

### Cause A — `white-space: nowrap` is never reset (the text leak)

`node_modules/leaflet/dist/leaflet.css:577-591` sets, on `.leaflet-tooltip`:

```css
.leaflet-tooltip {
  position: absolute;
  padding: 6px;
  background-color: #fff;
  border: 1px solid #fff;
  border-radius: 3px;
  color: #222;
  white-space: nowrap;   /* ← line 584 */
  ...
}
```

Near's override, `app/globals.css:231-238`, resets background, border,
box-shadow, padding and margin — **but not `white-space`**:

```css
.near-map-tooltip {
  pointer-events: auto !important;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  padding: 0 !important;
  margin: 0 !important;
}
```

`white-space` is an inherited property. It cascades into the tooltip's whole
subtree, so the venue name (`WorldMap.tsx:216-218`) and the tagline
(`WorldMap.tsx:219-221`) each render as a **single unbroken line**. The
wrapping `<a>` is `w-52 … overflow-hidden` (`WorldMap.tsx:196-199`), so
anything past 208px is hard-clipped mid-word. Taglines are schema-capped at 90
characters (`placeContentFrontmatterSchema`, `schema.ts:129`) — roughly 4-5×
the width available. Practically every tooltip is truncated mid-word with no
ellipsis.

### Cause B — a fixed 208px card inside `overflow-hidden` ancestors (the image leak)

The tooltip content is `w-52` — a hard 208px (`WorldMap.tsx:197`), with no
viewport-relative constraint. Leaflet centres a `direction="top"` tooltip
horizontally over the marker and, **unlike a `Popup`, a `Tooltip` has no
`autoPan` and no `keepInView`** — it will not nudge itself back inside the map.

The map is 340px tall in a **300px** desktop sidebar column
(`Board.tsx` grid `md:grid-cols-[1fr_300px]`). A 208px card centred on a pin
anywhere except dead-centre already overhangs the map frame. That frame is
`overflow-hidden` on mobile and `md:overflow-x-hidden` on desktop — the
`<section>` in `Board.tsx` — so the overhang is **sliced by the ancestor**, not
flipped. The hero image (`WorldMap.tsx:202-212`, a `next/image` `fill` in a
`relative w-full h-24` box) is the most visible casualty because it is the only
solid block of colour: the reader sees a photo cut vertically in half at the
map edge. That is the "image leaks".

`margin: 0 !important` (globals.css:237) compounds it slightly by cancelling
leaflet's `.leaflet-tooltip-top { margin-top: -6px }` (leaflet.css:612-614),
so the card sits 6px lower than the arrow geometry assumes — harmless alone,
but it means the `::before` suppression at globals.css:240-242 is doing real
work and must not be removed.

### The trivially safe fix (describe, do not apply — per this pass's constraint)

`near-tech-lead` and `near-ux-designer` both sign off on this as low-risk:

1. **`app/globals.css:231-238`** — add to the `.near-map-tooltip` block:
   ```
   white-space: normal !important;
   overflow-wrap: anywhere;
   ```
   That alone fixes the text leak. It is two declarations and cannot affect
   anything outside `.near-map-tooltip`.
2. **`components/map/WorldMap.tsx:197`** — replace the fixed `w-52` with a
   clamped, viewport-aware width, e.g.
   `w-[min(13rem,calc(100vw-3rem))] max-w-[13rem]`. Keeps the desktop look
   identical, stops the phone case overhanging.
3. **`components/map/WorldMap.tsx:219-221`** — cap the tagline at two lines
   (`line-clamp-2`) so a 90-character tagline can't make the card taller than
   the 340px map.
4. **Edge behaviour (slightly larger, still contained):** switch the touch
   path from `openTooltip()` (`WorldMap.tsx:184`) to a `<Popup>`, which *does*
   support `autoPan`. `near-lead-ux`'s call: do (1)-(3) as the cheap fix and
   evaluate (4) separately, because swapping Tooltip→Popup changes the
   dismiss interaction (popups need an explicit close) and that is a UX
   decision, not a bug fix.

**Do not** simply widen the map or remove the ancestor `overflow-hidden`: that
`overflow-hidden` is load-bearing. `Board.tsx`'s own comment explains it exists
so Leaflet's z-index ~1000 panes stay inside the box instead of painting over
the sticky header on phones. Reversing it re-opens a fixed bug.

---

## 3. Events-schema verdict: **cheap in code, expensive in content**

`near-tech-lead`'s read, stated plainly because the task asked for honesty
rather than optimism:

**No schema change is required. No backfill is required.** The task brief
raised the possibility that `near-write-article` "nests events in place pages
(step 2)", creating a mismatch with a dedicated events view. That mismatch
**does not exist in the data model**. What `near-write-article` step 2 means by
"nesting" is the *presentation* rule from `content/rules.md`'s
`event-belongs-to-venue` — an event is surfaced on its venue's card and page.
Structurally it is a separate `content/places/<slug>/` directory with its own
`meta.json` and six locale files, pointing at the venue via `parentPlace`.

An events view therefore needs:

```
getAllPlaceSlugs()
  → getPlaceSummary()
  → filter(p => p.meta.eventEndsAt && p.meta.eventStartsAt)
  → filter(not expired)
  → sort(nearest + soonest)
```

That is `getUpcomingEventsByParent` (`loader.ts:151-186`) with the
`parentPlace` requirement dropped and a distance term added. Perhaps **60 lines
of new loader code plus a route**. Call it half a session.

**The expensive half is that there is nothing to show.** One real hosted event,
expiring 2026-09-12. `near-events`' own standing directive (2026-08-31, in its
SKILL.md) — *"the further out the better"* — is the right instinct and is
being followed by exactly one pin. The operator's own directive at
`BACKLOG.md:3524` already names this: *"We need more events nested in places
like it was nicely done with Teatro da eskyna, but in our priority tier 1 and 2
locations when we do their content."*

So the correct sequencing is **content-first**: run `near-events` across Tier 1
and Tier 2 cities to build a real corpus, *then* ship the view onto a corpus
that justifies a nav entry. Building the view first produces a header link to
an empty page, which is worse than no link.

There is precedent for exactly this judgement in the codebase:
`MIN_PLACES_FOR_LOCATION_PAGE = 2` (`lib/content/locationPages.ts:32`) exists
because *"a page that restates one pin is not an aggregation page."* An events
page with one event is the same failure. **`near-lead-product` proposes the
same gate: `/events` gets a header nav entry at ≥ 8 non-expired events across
≥ 3 cities; below that it is a lens on the board, not a destination.**

### One schema *refinement* worth capturing (not required, not now)

The V&A East case shows `eventEndsAt` is currently overloaded: it means both
"this happening is over, delist it" (a child event) and "this exhibition run
ends" (a venue that should survive). Either add an explicit
`kind: "venue" | "event"` discriminant, or make the delist rule conditional on
`parentPlace` being present. `near-tech-lead` prefers the latter — it is a
one-line predicate change, no schema migration, and it fixes a real live time
bomb. Logged here; routed to `near-caretaker` + the Trio, not folded into this
plan's critical path.

---

## 4. Interaction design (`near-ux-designer`)

All of this works inside Near's existing system: tokens from
`app/globals.css` (`--paper`/`--surface`/`--ink`/`--muted`/`--accent`, the
per-category `--cat-*` vars, `--shadow-sm`), the `border-[3px] border-ink`
+ hard offset-shadow card idiom, the global no-radius rule, and the
`:root` → `@media (prefers-color-scheme: dark)` → `:root[data-theme="dark"]`
triple. Type is display for headings, mono for labels/metadata — note for the
record that the `near-ux-designer` SKILL.md still describes a
Fraunces/Manrope/Plex Mono stack, whereas `app/globals.css` actually resolves
`--font-display`/`--font-sans` to **Space Grotesk** and `--font-mono` to
**Courier Prime**. Design to the CSS, not to the skill file; the skill file
needs correcting separately.

### 4.1 Cluster pin

**Visual.** Reuse the teardrop silhouette from `dotIcon`
(`WorldMap.tsx:31-49`) rather than inventing a second pin language — a cluster
is a pin that contains pins, and the reader should not have to learn two
shapes. Changes for the cluster variant:

- Same 26×34 teardrop, but scaled by count in three fixed steps —
  **26×34 (2-9), 32×42 (10-49), 38×50 (50+)**. Fixed steps, not a continuous
  scale, so the size is readable as a category rather than a guess.
- The inner white circle (`WorldMap.tsx:38`) becomes the **count badge**: the
  number in `--font-mono`, `--color-ink`, bold, centred.
- Fill uses the **dominant category colour** of the cluster's members, at full
  saturation, with a 2px `--color-surface` ring — so a cluster still carries
  the category signal the individual pins carry. When no category holds a
  strict plurality, fall back to `--color-accent` (acid green), which is
  already the site's "no single answer" fill.
- Keep the existing `drop-shadow` and the existing `stroke: var(--color-surface)`
  so clusters and pins share one physical treatment in both themes.

**Rejected:** the default `leaflet.markercluster` look (soft circular haloes
with border-radius and translucent fills). It violates the no-radius rule at
`globals.css:150-156`, which is enforced globally with `!important` — the
plugin's own CSS would be silently flattened into squares and look broken.

**Hover/focus:** cluster hover shows a mono-type tooltip reading
`N PLACES · TOP CATEGORY` — reusing the fixed `.near-map-tooltip` box, not a
new one.

### 4.2 Cluster zoom behaviour

Requirement 3: *"Clicking the cluster pin should zoom to cluster if possible to
show its individual pins."*

- **Click → `fitBounds` on the cluster's member bounds**, `padding: [36, 36]`,
  matching the existing fit calls in `MapView` exactly. Animated
  (`{ animate: true, duration: 0.35 }`), and hard-disabled under
  `prefers-reduced-motion` — `globals.css:170-174` already kills transitions
  globally there, and map animation must respect the same intent.
- **The unsplittable case.** Pins at identical or near-identical coordinates
  (a venue and its own child event, once child events start appearing on the
  full map) cannot be separated by zooming. When the cluster's bounds are
  smaller than ~40px at max zoom, do **not** zoom; instead open a
  **"stacked list" panel** — the same 208px bordered card as the tooltip, but
  listing each member as a row (name + category dot). This is the case
  `leaflet.markercluster`'s "spiderfy" solves with curved leader lines; those
  are decorative curves in a design system with no curves, so a list is both
  more on-brand and more accessible.
- **Keyboard:** cluster markers get `keyboard: true` and Enter/Space triggers
  the same handler as click. Individual markers are already reachable; today
  their only affordance is a `window.location.href` assignment
  (`WorldMap.tsx:186`) which is not keyboard-reachable — worth fixing in the
  same pass.

### 4.3 Map ↔ card sync

Requirement 4 has two halves, and `near-ux-researcher` and `near-ux-designer`
disagreed about the second (see §6.2).

**Half one — highlight sync (uncontested, ship it).**
- Hovering/focusing a `PlaceCard` raises its pin: the pin scales to 1.15 and
  gains a `--color-accent` ring. If the pin is inside a cluster, the *cluster*
  highlights instead.
- Hovering a pin outlines the matching card with the accent border already used
  for the active tab state in `NearestLatestTabs.tsx`.
- Implementation is a single `hoveredSlug` in the same context that already
  holds the filters. No new state plumbing.

**Half two — viewport-driven listing.** See §6.2 for the resolution. The
shipped design is:
- **On the board (sidebar map, 300px):** a manual **"Search this area"**
  button that appears over the map after the reader pans or zooms, styled as
  the existing accent chip (`bg-accent text-black border-[2px] border-ink`,
  the "use my location" idiom at `Board.tsx`'s map header). Nothing changes
  until it is pressed. A dismissable "showing N of M" line replaces the
  existing `mapCaption`.
- **On `/map` (full-screen):** automatic. The map is the primary surface
  there, the reader's mental model is a map app, and the list is explicitly
  subordinate — the real-estate-site pattern `near-ux-designer`'s SKILL.md
  already names as a backlog item.

### 4.4 `/[locale]/map` — the full map view

- **Layout.** Map fills the viewport below the existing sticky `Header`
  (`h-[calc(100dvh-var(--header-h))]`; `dvh` not `vh`, for mobile browser
  chrome). A **card rail** docks right at 380px on `lg`, collapses to a
  bottom sheet on mobile with three snap points (peek ~88px showing a count +
  the first card's title, half, full). Bottom sheet, not a modal — the reader
  must be able to see the map and the list at once, which is the entire point.
- **Chrome reuse.** The same `Header` with its sticky search + category/tag
  filter panel. No second filter UI. `BoardControlsProvider` wraps the route
  identically, so filters behave the same and share the same URL params.
- **The rail** renders `PlaceCards` in a single column (the existing
  `PlaceCard` at narrow width — it already handles the 300px-ish case) sorted
  by the same nearest/latest tabs.
- **Empty state:** "No pins in this view" + a "Zoom out to everything" button
  that calls the existing fit-all-points branch of `MapView`.
- **Ads:** the board's `mapPromo` slot has no equivalent here. `near-cfo` is
  not in this convening; flagged as an open revenue question rather than
  designed speculatively.
- **SEO:** `/map` is a client-interactive view of data that already has
  crawlable homes (`/in/*` location pages, place pages). It should render a
  server-side `<ul>` of the current place set for crawlers and carry a
  canonical to itself with no params. It is **not** a replacement for the
  `/in/*` pages and must not cannibalise them.

### 4.5 The events view

**Phase A — a lens on the existing board (ships first).** A third tab
alongside `NEAREST` / `LATEST` in `NearestLatestTabs.tsx:117-135`, labelled
`SOON`, visible only when the filtered set contains ≥1 upcoming event. Reuses
the tab component exactly. This gets the operator the capability with zero new
routes and no empty-page risk.

**Phase B — `/[locale]/events` as a nav destination** once the corpus clears
the gate in §3.

- **Card.** The existing `PlaceCard` with the date promoted from the current
  small "next event" ribbon (`PlaceCard.tsx:99-109`) to a **left date rail**:
  a fixed-width bordered block carrying `SEP` / `11` stacked, in
  `--font-display` on `--color-accent`, black text — the one place on Near
  where accent-as-fill is already sanctioned. Below it, the venue name as a
  secondary line, since an event's *where* is as load-bearing as its *when*.
- **Grouping.** Cards group under sticky mono-type date headers
  (`THIS WEEK` / `SEP 2026` / `OCT 2026`), matching the category grouping
  already used on location pages (`GROUP_FROM = 4`,
  `app/[locale]/in/[...location]/page.tsx:78`). Below 4 events, render flat —
  same threshold, same reasoning.
- **Empty state** must be honest and useful, not apologetic: "Nothing dated in
  <scope> yet" + a link to the widest scope that does have something.
- **Countdown/expiry:** an event whose `eventStartsAt` is within 48h gets a
  `TONIGHT` / `TOMORROW` mono label instead of a date. An event that expires
  while the tab is open disappears at the next client tick (§5.2) — with no
  layout jump, because the list re-sorts rather than leaving a hole.

### 4.6 The nearest + soonest sort

Requirement 7: *"sort the cards by nearest+soonest, within the geographic and
any other filters and sorts of the user."*

`near-ux-researcher`'s finding, which changes the design: **"nearest+soonest"
is not one sort, and a naive weighted score of km and hours is unexplainable to
a reader.** "Why is this Tuesday thing above that Saturday thing?" has no good
answer if the answer is a hidden coefficient. Two defensible readings:

- **(a) Filter by near, sort by soon.** Geography is a *scope* (the filters
  and the map viewport already establish it); within that scope, order purely
  by `eventStartsAt` ascending. Explainable in one sentence, and it matches how
  the existing code already treats favourites — a scope, not a sort
  (`NearestLatestTabs.tsx:76-81`, and its comment says exactly this).
- **(b) Bucket by time, sort by distance inside each bucket.** Group into
  TONIGHT / THIS WEEK / THIS MONTH / LATER, and within each group sort by
  `haversineKm`. Also explainable, and it means the closest thing happening
  tonight is the first card — which is the actual job-to-be-done.

**`near-lead-ux` calls (b)**, because it satisfies both words of the operator's
phrase without inventing a hidden weight, and because the date grouping in §4.5
already produces the buckets, so the "sort" is free. **(a) is the fallback when
the reader has no location fix** — `userCoords` is null more often than not
(geolocation is prompted proactively at `Board.tsx:180-192` and is routinely
declined), and the existing code's own defensive posture ("fall back
immediately, never show a blank list") applies. Without coordinates, buckets
sort by start time within themselves.

### 4.7 Share link + share button

Requirement 9. The operator's use case — sending the sober-curious filtered
view to a friend — is a `tag=sober-curious` URL and a button.

- **A `SHARE` chip** in the header's filter bar, appearing only when
  `activeFilterCount > 0` or a location scope is active. Mono type, the
  existing `border-[2px] border-ink` chip idiom. Not accent-filled — accent is
  reserved for the primary action in a view, and here that is still the
  content.
- **Behaviour:** `navigator.share()` where available (mobile, and it is a PWA
  — `app/manifest.ts` exists), falling back to `navigator.clipboard.writeText`
  with the existing toast pattern (`FavoriteToast.tsx`) confirming "Link
  copied". No custom share-sheet UI, no per-network buttons.
- **What gets shared:** the canonical, human-readable URL. Prefer the existing
  `/in/<location>` route when the only active scope is a location — those are
  already real, crawlable landing pages and the better thing to send. Fall back
  to the current path plus params otherwise.
- **Landing behaviour is the part that makes this worth doing:** arriving on a
  filtered URL must show the filters *visibly applied* (chips lit) and a
  one-line scope banner, reusing the existing location banner at
  `Board.tsx:198-207`. A share link that silently applies invisible filters is
  a bug report waiting to happen.
- **OG image:** out of scope for the first pass, but the `/place/[slug]`
  route already has `opengraph-image.tsx` — a filtered-view OG generator is the
  obvious follow-up and would make the shared link look like something.

---

## 5. Technical plan (`near-tech-lead`)

### 5.1 Clustering: `supercluster`, not `leaflet.markercluster`

Three reasons, in order of weight:

1. **Compatibility.** `react-leaflet` is at ^5.0.0. `react-leaflet-cluster`,
   the usual wrapper for `leaflet.markercluster`, targets v4 and is not
   maintained against v5's context API. Wiring the raw plugin means reaching
   around React into imperative layer management — precisely the kind of thing
   `MapView`'s existing single-effect discipline was written to avoid.
2. **The map↔card sync falls out for free.** `supercluster` is a pure index:
   `load(points)` then `getClusters(bbox, zoom)`. That returns **exactly the
   set the map is showing**, in plain data, in React state — which is the same
   array the card list needs for requirement 4. With the DOM plugin, the
   clustered set lives inside Leaflet and has to be read back out. Choosing
   supercluster makes requirements 1, 3 and 4 one build instead of two.
3. **Styling.** No plugin CSS to fight with the global no-radius rule.

Cost: we render cluster markers ourselves as `divIcon`s, which is ~40 lines and
is code we want to own anyway given the custom teardrop.

Scale check: 68 places today, low hundreds within a year. supercluster handles
that without noticing; performance is not the reason for any of these choices,
correctness and maintainability are.

### 5.2 Render-time event expiry (requirement 8)

The rule: **the server filter stays, a client filter is added on top.** Not
replaced.

- Keeping `getAllPlaces`'s check (`loader.ts:129-131`) means the SSR/ISR HTML
  is at worst one hour stale — which matters for what Google indexes and for
  the first paint. Removing it would ship expired events into crawlable HTML.
- The client filter is what makes it non-refresh-dependent. Mechanism:
  1. `eventStartsAt` / `eventEndsAt` are already inside `PlaceMeta`, so they
     are **already serialised to the client** in the `places` prop. No new
     data plumbing.
  2. A `useNow()` hook: state initialised to `null`, set to `Date.now()` in a
     mount effect, then updated on a 60s interval **and** on
     `visibilitychange` (a phone left on the board overnight must be correct
     when picked up, not 8 hours stale).
  3. While `now === null` — i.e. the first client render — apply **no** client
     filter. This is mandatory. `Board.tsx:59-63` already documents this exact
     trap for the nearest/latest tab: a client value that differs from the
     server's makes React throw away and re-render the whole board. Same
     discipline, same reason.
  4. Filter in the single `filtered` memo in `Board.tsx:88-136`, so map and
     cards inherit it together and cannot diverge.
- **Also fix `getUpcomingEventsByParent`'s output** the same way: the "next
  event" ribbon on a venue card (`PlaceCard.tsx:99-109`) has the identical
  staleness bug and the identical fix.
- The over-claiming comment at `app/[locale]/page.tsx:20-21` should be
  corrected in the same commit.

### 5.3 URL state — and the `controls.tsx` objection

The comment at `lib/board/controls.tsx:33-35` is correct about `pushState` and
was written after a real regression. It is not correct that URL params are
therefore off the table.

`node_modules/next/dist/docs/01-app/02-guides/single-page-applications.md:225-227`
documents that **both** `window.history.pushState` and
`window.history.replaceState` integrate with the Next router and stay in sync
with `usePathname` / `useSearchParams`. `replaceState` **does not create a
history entry**. So:

| State | Mechanism | History entry |
|---|---|---|
| Search text (per keystroke) | `replaceState`, debounced ~300ms | none |
| Category / tag toggles | `replaceState` | none |
| Tab (nearest/latest/soon) | `replaceState` | none |
| Map viewport on `/map` | `replaceState`, debounced on `moveend` | none |
| Explicit navigation (clicking through to `/in/london`) | `Link` | yes, correctly |

The back button is untouched. The original defect cannot recur, because the
thing that caused it is not used.

**Param shape** (short, stable, human-readable — these become shared links and
must survive):
`?q=` `&cat=food-drink,nightlife-sound` `&tag=sober-curious` `&tab=soon`
`&bbox=` `&z=`. Comma-separated, not repeated keys, because the operator will
sometimes type these by hand.

**Where the change lands:** entirely inside `BoardControlsProvider`
(`lib/board/controls.tsx`). The context's public API — `query`, `activeCats`,
`toggleCat`, … — does not change shape. Every consumer keeps working. This is
the single highest-leverage refactor in the plan and it is genuinely contained.

**Caveat `near-tech-lead` flags:** `useSearchParams` forces a client boundary
and requires a `<Suspense>` wrapper in the App Router. `BoardControlsProvider`
is already `"use client"`, but wherever it is mounted needs checking against
the Next 16 docs before the build, not after.

### 5.4 Dependency graph

```
                    ┌─────────────────────────┐
                    │ P0-a  tooltip CSS fix   │  independent
                    └─────────────────────────┘
                    ┌─────────────────────────┐
                    │ P0-b  render-time expiry│  independent
                    └─────────────────────────┘
                                 │
   ┌───────────────────────────────────────────────────┐
   │ P1  URL state in controls.tsx  +  share button    │
   └───────────────────────────────────────────────────┘
                    │                       │
        ┌───────────┴─────────┐             │
        │ P2  supercluster    │             │
        │     + card↔pin sync │             │
        └───────────┬─────────┘             │
                    │                       │
        ┌───────────┴─────────┐   ┌─────────┴─────────┐
        │ P3  /map full page  │   │ P4a SOON tab      │
        └─────────────────────┘   └─────────┬─────────┘
                                            │
   ┌────────────────────────┐     ┌─────────┴─────────┐
   │ C1 near-events corpus  │────▶│ P4b /events route │
   │    (content track)     │     └───────────────────┘
   └────────────────────────┘
```

- P0-a and P0-b depend on nothing and on each other not at all. Ship
  separately.
- **P1 gates everything downstream.** The full map page needs `bbox`/`z` in the
  URL to be shareable at all; the events view needs `tab=soon` for the same
  reason; the share button is the requirement that motivates it. Doing P1 first
  is what stops three features each inventing their own state plumbing.
- P2 before P3: `/map` without clustering is the current problem at full
  screen.
- **C1 runs in parallel on the content track and is the real gate on P4b.**

---

## 6. Where the room actually disagreed

Recorded rather than blended, per the convening instruction.

### 6.1 Ship `/events` now, or gate it on content? — **genuine deadlock, escalated**

**`near-lead-ux`:** The operator asked for it by name, twice
(`BACKLOG.md:3526`, `:3539`). It is cheap. Shipping it now means it exists when
the events arrive, and an empty state is a normal thing for a young site to
have. Withholding a directly requested feature on a judgement call about
content volume is the Trio second-guessing the operator.

**`near-lead-product`:** A header nav entry to a page with one card that expires
on 2026-09-12 is a broken promise on every locale's global navigation — six
crawlable URLs that are near-empty, in a site whose own strategy doc
(`locationPages.ts:20-32`) rejected exactly this shape at exactly this scale.
The operator's *other* directive on the same page (`BACKLOG.md:3524`, "we need
more events nested in places… in our priority tier 1 and 2 locations") says the
content gap is his own stated concern. The ask is real; the *route* is not the
whole of the ask.

**`near-tech-lead`:** Neutral on the call. Notes only that the two options cost
almost the same to build, so cost cannot break the tie — which is why it did
not.

**`near-ceo` ruling (invoked per `near-backlog` step 0: two functions disagree,
neither owns the call).** Both are right about different halves, and the
sequencing is the answer, not a winner:

> Ship the **capability** immediately as a `SOON` tab on the existing board
> (P4a) — the operator gets the sorted-by-soonest events view this week, in the
> surface he already uses, with zero empty-page exposure. Ship the
> **destination** (`/events`, header nav, six locales) when the corpus clears
> the gate: **≥ 8 non-expired events across ≥ 3 cities**, mirroring the
> `MIN_PLACES_FOR_LOCATION_PAGE` precedent the codebase already set. What is
> being deprioritised, explicitly: a nav-level events destination in September.
> The condition that flips it is a number, not a mood, and `near-events`
> running against Tier 1/2 is what moves it.
>
> This is a recommendation to the operator, not a decision over him. If he
> wants the route live this week regardless, that stands — it is his site and
> the ruling reverses on one word.

### 6.2 Automatic viewport-driven listing, or a "Search this area" button?

**`near-ux-researcher`:** Automatic bidirectional sync is disorienting on the
board's 340px sidebar map. Every pan mutates the list the reader is reading;
the list is paginated at 12 with `InfiniteLoad`, so a pan silently resets their
scroll position and their loaded page — `NearestLatestTabs.tsx:87-99` resets
`visibleCount` whenever the list identity changes, and map panning would change
it constantly. Momentum scrolling on a phone would fire this dozens of times.
The requested behaviour, implemented literally, produces a list that will not
hold still.

**`near-ux-designer`:** But the operator asked for it in both directions, and
"Search this area" is a well-worn compromise that reads as sluggish on a map
that *is* the primary surface. On a full-screen map, waiting for a button press
after every pan is the wrong friction.

**`near-lead-ux` decides**, and it is a split by surface rather than a
compromise on both: **manual on the board, automatic on `/map`.** The
distinguishing variable is which element is primary. On the board the list is
primary and the map is a 300px sidebar — the list must not move under the
reader. On `/map` the map is primary and the rail is subordinate — there, a
list that tracks the viewport is the expected behaviour and the reader's scroll
position in the rail is cheap to lose. Requirement 4's "keep map and cards view
synced" is satisfied in both, because the *filter* dimension is already synced
today (§1.2) and the highlight dimension ships in both (§4.3).

### 6.3 Does the deliberate `controls.tsx` comment block URL state?

**`near-tech-lead`** opened defensive: the comment records a real regression
this codebase already paid for once, and `near-backlog`'s method is explicit
that a deliberate design comment is a real cost to reversing, not nothing.

**`near-lead-ux`** countered that the requirement is not negotiable — a
filtered view that cannot be shared is the operator's stated blocker, and it is
wanted "asap".

**Resolved, not overruled.** Reading the Next 16 docs
(`single-page-applications.md:225-227`) showed the comment's *premise* is
narrower than its conclusion: it is true of `pushState` and false of
`replaceState`. The safeguard is preserved rather than discarded — the same
outcome as the infinite-scroll pass that kept the footer-reachability guard.
**The comment should be rewritten, not deleted**, to record why `replaceState`
is used and that `pushState` must not be reintroduced for filter state. That
sentence is the guardrail; losing it is how the bug comes back in six months.

### 6.4 Noted, not a disagreement

`near-events` had no objection to any of the above and one addition: whatever
ships must make the *further-out* event more prominent, not less. A view sorted
soonest-first structurally buries the nine-months-out festival that has the most
shelf life. The date-bucket design (§4.6b) with a `LATER` group is what keeps
those visible rather than pushing them to page four.

---

## 7. Sequenced plan — RICE + MoSCoW

RICE per `near-lead-product`'s definition:
`(Reach × Impact × Confidence) / Effort`. Reach = rough share of sessions
touched. Impact = 3 high / 2 medium / 1 low. Confidence = 0-1. Effort = session
units. **MoSCoW horizon: the next three working sessions.**

| # | Item | R | I | C | E | RICE | MoSCoW | Depends on |
|---|---|---|---|---|---|---|---|---|
| P0-a | **Tooltip: reset `white-space`, clamp width, line-clamp tagline** | 0.9 | 2 | 1.0 | 0.25 | **7.20** | **Must** | — |
| P0-b | **Render-time event expiry (client `useNow` filter)** | 0.15 | 3 | 1.0 | 0.3 | **1.50** | **Must** | — |
| P2 | **supercluster clustering + click-to-zoom + stacked-list fallback** | 0.9 | 2 | 0.9 | 1.0 | **1.62** | **Must** | P1 |
| P1 | **URL state in `controls.tsx` (`replaceState`) + SHARE button** | 0.35 | 2.5 | 0.8 | 0.8 | **0.88** | **Must** | — |
| P3 | **`/[locale]/map` full map page** | 0.20 | 2 | 0.8 | 0.6 | **0.53** | Should | P1, P2 |
| P4a | **`SOON` tab on the board (events lens)** | 0.12 | 2 | 0.7 | 0.4 | **0.42** | Should | P0-b |
| Sync | **Card↔pin highlight sync** | 0.5 | 1 | 0.8 | 0.4 | **1.00** | Should | P2 |
| Sync2 | **Viewport-driven listing ("Search this area" / auto on /map)** | 0.5 | 2 | 0.6 | 1.0 | **0.60** | Could | P1, P2, P3 |
| C1 | **`near-events` corpus build across Tier 1/2** | 0.10 | 3 | 0.9 | 3.0 | **0.09** | **Must** | — |
| P4b | **`/[locale]/events` route + header nav, six locales** | 0.10 | 1 | 0.5 | 0.8 | **0.06** | Won't (this horizon) | C1 gate |
| X | **`eventEndsAt`-without-`parentPlace` guard (V&A East time bomb)** | 0.02 | 3 | 1.0 | 0.2 | **0.30** | Should | — |

### Where judgement overrides the arithmetic — stated, per the method

- **P1 is a Must at RICE 0.88**, below three items ranked above it, because it
  is a dependency: P3, P4a/b, Sync2 and the share requirement all consume it,
  and building any of them first means building the state plumbing twice. RICE
  is structurally blind to this; MoSCoW is the instrument that catches it.
- **P0-b is a Must at RICE 1.50** on obligation, not score. It is an explicit
  operator directive and a correctness defect on live content. Its reach is a
  rounding error today precisely *because* there is one event — which is
  exactly the situation C1 is about to change, so fixing it before the corpus
  grows is cheaper than fixing it after.
- **C1 is a Must at RICE 0.09.** The score is honestly terrible and honestly
  irrelevant: it is the gate on P4b, it is the operator's own directive at
  `BACKLOG.md:3524`, and it is a *content* item that belongs to `near-events` +
  `near-seo` + `near-trendsetter`, not the Trio. It runs on a parallel track
  and does not consume Trio session budget. Flagged here only so the
  dependency is visible.
- **P4b is a recorded Won't for this horizon**, with the flip condition written
  down (§6.1): ≥ 8 non-expired events across ≥ 3 cities. It is not rotting; it
  is waiting on a number.

### Phasing

**Phase 0 — this session or the next, ~0.5 sessions.**
P0-a and P0-b, as **two separate commits**. Both are contained, both are
independently verifiable, neither touches the other's files. P0-a is the
operator's most visible complaint and the cheapest thing on the list — there is
no argument for bundling it with anything.

**Phase 1 — the foundation, ~1 session.**
P1 alone. `controls.tsx` moves to `replaceState`-backed URL params; the SHARE
chip ships with it because it is the visible proof the refactor worked. Rewrite
the `controls.tsx:33-35` comment rather than deleting it. `npx next build`
(not `npm run build` — the postbuild IndexNow ping) must pass before push.

**Phase 2 — the map, ~1.5 sessions.**
P2 (supercluster + cluster pins + zoom-to-cluster + stacked-list fallback),
then Sync (highlight). Ship the board's clustering before the full-map page —
if clustering is wrong, it is wrong in a 340px box rather than full screen.

**Phase 3 — the destination, ~1 session.**
P3 (`/map`) with Sync2's automatic viewport listing scoped to that route only,
and the "Search this area" button back-ported to the board.

**Phase 4 — events, gated.**
P4a (`SOON` tab) can ship any time after Phase 0. P4b waits on C1.

---

## 8. Risks and trade-offs on the record

1. **`MapView`'s single-effect invariant** (`WorldMap.tsx:83-97`) is a
   documented anti-race design. Zoom-to-cluster is a fourth view-change source
   and **must** be folded into that effect's decision chain, not added as a
   parallel effect. Getting this wrong reintroduces a race the codebase has
   already paid to fix once.
2. **`Board.tsx`'s `overflow-hidden`** on the map section is load-bearing — it
   keeps Leaflet's ~1000 z-index panes from painting over the sticky header on
   phones. The tooltip fix must work *within* it. Do not "fix" the tooltip by
   removing the clip.
3. **`InfiniteLoad`'s footer-reachability cap** must survive viewport-driven
   listing. Its auto-load cap exists so the footer stays reachable; a list that
   re-renders on every map move interacts badly with the `listKey` reset at
   `NearestLatestTabs.tsx:87-99`. Debounce hard, and reset visible count only
   on *committed* viewport changes, never during a pan.
4. **Hydration.** The client `now` filter and any URL-derived initial state
   must not differ from the server's first render. `Board.tsx:59-63` documents
   exactly this class of bug and exactly the fix (`hydrated` gate). Apply the
   same pattern; do not invent a second one.
5. **SEO.** `/map` and `/events` are aggregation views over data that already
   has crawlable homes in `/in/*` and `/place/*`. They must carry
   `buildAlternates` and self-canonicals, and must not be allowed to
   cannibalise the location pages — which are, per the strategy doc, the more
   valuable surface. Route this past `near-seo` before P3 ships, especially
   given the open, still-unanswered Search Console question at
   `BACKLOG.md:3637` (630 pages processed, nothing indexed in 90 days). Adding
   twelve more locale-multiplied URLs into an indexing problem nobody has
   diagnosed yet is a real risk, and it is an argument for doing C1/P4b *after*
   `near-seo` answers that question.
6. **Six-locale tax.** P4b is six routes plus six sets of UI strings in
   `messages/`. P0-a, P1, P2 and Sync are locale-free. This is a large part of
   why the phasing puts the locale-free work first.
7. **`near-ux-designer`'s SKILL.md is stale on typography** — it names
   Fraunces/Manrope/Plex Mono; `app/globals.css:106-114` resolves to Space
   Grotesk and Courier Prime. Anyone designing from the skill file will specify
   the wrong faces. Worth a one-line correction to that SKILL.md, separately.
8. **The V&A East data bomb** (§3, item X): a venue delisting itself on
   2027-01-10 because of an overloaded `eventEndsAt`. Cheap to guard, easy to
   forget, and it will look like a mystery bug in fifteen months.

---

## 9. What was deliberately not decided here

- Whether `/map` carries ad inventory (`near-cfo` not convened).
- The hashtag system (`BACKLOG.md:3646`), which shares the URL-state
  infrastructure of P1 and should be scoped *after* P1 lands, so it inherits
  the same param design rather than inventing a parallel one.
- The header-vs-footer stats line (`BACKLOG.md:3643`) — unrelated, cheap,
  belongs in a different pass.
- Any change to `content/rules.md`'s `event-belongs-to-venue` or
  `event-expiry`. Both survive this plan intact; only their *implementation*
  moves from server-only to server-plus-client.

---

## Addendum — the indexing risk named above is RESOLVED (added by near-backlog, same day)

This doc flags, as an open risk, that `/map` and `/events` would add
locale-multiplied URLs "into an indexing problem nobody has diagnosed
(630 processed / 0 indexed in 90 days)". **That was diagnosed in a
parallel session on 2026-09-03 and is a false alarm** — see
`content/seo-indexing-audit-2026-09-03.md`.

Summary: the Search Console indexing panel was stamped 27/08/2026, which
is the date of the repo's first commit, while the sitemap was not
submitted until 02/09. The panel refreshed before the site had content
and before Google knew about the sitemap, so 83 of its 90-day window
predate the domain having pages. Site-side health is clean — sitemap
valid at 726 URLs, `robots.txt` `Allow: /`, every sampled page
`index, follow`, no `X-Robots-Tag`, canonicals and hreflang correct.

**The recommendation to route new routes past `near-seo` still stands** —
locale-multiplied thin pages are a genuine SEO concern on their own
merits, and the `MIN_PLACES_FOR_LOCATION_PAGE` precedent this doc leans on
exists for exactly that reason. But it is no longer gated behind an
undiagnosed outage, and should not be scoped as if the site were failing
to index.

That audit did find two real feed defects worth folding into this plan's
Phase 3/4, since they touch the same surfaces: **five of six locales have
no RSS feed at all** (`/pt-BR/feed.xml`, `/es-419/feed.xml`,
`/zh-CN/feed.xml` all 404 — `app/feed.xml/` has no `[locale]` segment),
and there is **no RSS autodiscovery `<link>` in the head**.

---

## Addendum 2 — Phase 2 (clustering) shipped, and the bug it exposed

Phase 2 landed as specified in §5.1: `supercluster`, not
`leaflet.markercluster`. `ClusterLayer` in `components/map/WorldMap.tsx`
holds the index, re-reads the viewport on `moveend`/`zoomend`, and renders
whatever `getClusters(bbox, zoom)` returns — clusters as square `divIcon`s
sized by count, singles as the existing teardrop `PlaceMarker`.

Two things this plan got wrong, both found by clicking the thing rather
than by reading it:

**1. `getClusterExpansionZoom` is the wrong function for click-to-zoom.**
It returns the zoom at which a cluster *first* splits, which is frequently
one level up. Clicking the 32-pin Europe cluster at zoom 1 returned 2 — one
step, still a 32-pin cluster. Fixed by fitting the cluster's actual member
bounds (`getLeaves`), capped at `TILE_MAX_ZOOM - 3` so coincident venues
don't slam to street level. Drill-down now runs 27 → 23 → 21 → 8 → 2 across
zooms 5, 8, 10, 12, 16 and resolves into individual pins.

**2. Animated Leaflet view changes have never worked on this map — a
pre-existing bug this plan did not know about.** `setZoom(6)` and an
animated `fitBounds` are both silent no-ops in this container; the same
calls with `animate: false` land correctly. Wheel zoom takes a different
code path and always worked, which is why nothing looked broken.

The consequence is bigger than clustering: **`MapView`'s fit-to-points has
been failing silently since it was written**, which is why the board's map
always opened on the whole world instead of framed on its pins. Every
programmatic view call now goes through a documented `VIEW_OPTS =
{ animate: false }`.

Anyone building `/map` (P3) should assume this constraint holds there too —
it is a property of how Leaflet animates inside this layout, not of the
340px board column.

The stacked-list fallback is doing real work already, not just guarding a
hypothetical: Bar Italia and Hazlitt's sit metres apart in Soho and stay
clustered at the zoom cap. Hovering the cluster lists both as links.
