# External SEO/GEO audit of near.tips — 2026-09-02

**Status: INPUT, not policy.** Delivered to the operator by ChatGPT on
2026-09-02, working from the pasted `sitemap.xml` plus backlog excerpts.
Nothing here has been adopted. Saved so the argument survives the session.

Read alongside `docs/chatgpt-three-year-strategy-2026-09.md` (same external
voice, broader scope) and the location-URL operator directive at the top of
`BACKLOG.md`.

---

## 1. What the audit says

Its own scorecard: sitemap basics 8/10, URL architecture 8/10, i18n 7/10,
local SEO 6/10, programmatic SEO 4/10, GEO/AEO 6/10, internal linking 7/10,
content architecture 8/10, future potential 9/10.

Its headline, which is the useful part:

> "I wouldn't radically change the sitemap now. I'd change the architecture
> so the sitemap can grow from ~300 URLs to tens of thousands without
> becoming garbage."

The recommendations, condensed:

- **Five URL layers.** Entity (`/place/…`) → Location (`/in/…`) →
  Intent (`/london/vegan`) → Editorial (`/collection/…`) → Guides.
  Layers 1, 4, 5 exist. Layer 2 is the next build. **Layer 3 is dangerous**
  and must be driven by real Search Console data, never by imagination —
  otherwise it's `vegan + Shoreditch` with three restaurants, fifty times.
- **`/in/[location]` as a real route**, not `replaceState`. Keep `/in/` as a
  universal structural segment across locales (`/en/in/london`,
  `/pt-BR/in/londres`, `/it/in/londra`) rather than translating the segment
  itself. This matches option 1 already on the table in `BACKLOG.md`.
- **Do not ship it as a card grid with an H1.** The audit independently
  reaches the same conclusion `near-lead-ux` already ruled: that would be a
  programmatic listicle farm.
- **Drop `<priority>` from the sitemap.** Not a modern ranking mechanism.
- **Fix `lastmod` semantics.** It should mean *the indexable representation
  of this URL changed*, not *some internal field moved*. A daily-churning
  `lastmod` trains Google to expect nothing.
- **Split the sitemap into an index** (core / places / locations / guides /
  collections / editorial) — *not now at ~390 URLs, but before ~50k*.
- **Verify hreflang + canonical explicitly.** Don't trust the framework to
  have done it. Six locales sharing a slug is not the same as six locales
  declared as alternates of one entity.
- **Density first, but not London-only.** Deep authority in London, Santos/
  Baixada and São Paulo; strategic seeds elsewhere, so Google doesn't file
  Near as "a London directory".

## 2. Near-side reaction — what's verified, what's wrong

Checked against the repo and the live site on 2026-09-02, so later sessions
don't rebuild on a false premise.

**Wrong: "the crawler can't reach near.tips / the sitemap can't be fetched."**
Live check: `https://near.tips/sitemap.xml` → `200 application/xml`, 137ms,
56.9 KB, **390 `<loc>` entries**. `robots.txt` → `200`, `allow: /`, sitemap
declared. `/` → `307` to `/en` (locale redirect, expected). The Search
Console "não foi possível buscar o sitemap / 0 páginas" is a **stale read
from submission time**, not a defect. Action is *resubmit and wait*, not
*debug*.

**Wrong: the "future `lastmod`" alarm.** The timestamps flagged as being
ahead of the current date are build-time UTC stamps from
`app/sitemap.ts`, which passes `new Date()` for the three static pages per
locale. Not a timezone bug.

**Right, and worth fixing anyway:** that same `new Date()` is a genuine
`lastmod` correctness problem for a different reason — the homepage,
`/sources` and `/guides` claim to have changed on **every single build**,
which is precisely the "come back every day for nothing" signal the audit
warns about. Place and collection entries are correct (they use
`meta.updatedAt`). Fix is small and local to `app/sitemap.ts:14-32`.

**Right:** `<priority>` is present and pointless (`app/sitemap.ts`). Removing
it is a few lines and costs nothing.

**Right, and already house position:** `/in/[location]` as a real route, and
the ruling that it must not be a card grid. Both were already in `BACKLOG.md`
before this audit arrived. The audit is corroboration, not new direction.

**Unverified, and the real P0:** canonical and hreflang. Nobody has actually
inspected the rendered `<head>` of a place page across the six locales. The
audit is right that this should be confirmed before layering a second page
type on top.

**Contested:** the density-vs-breadth call. The audit says London first. The
operator lives in the Baixada Santista, and Santos/São Vicente/São Paulo
already outrank other focus cities in the content backlog for reasons that
are not SEO reasons. That tension is the operator's to resolve, not this
document's.

## 3. What this becomes

Nothing, until the Strategy Summit (`BACKLOG.md`) rules on it. The candidate
extractions, in the order they'd be worth doing:

- **P0** — audit canonical/hreflang/metadata on a place page across all six
  locales; resubmit the sitemap in Search Console.
- **P0** — `app/sitemap.ts`: drop `priority`, fix `lastmod` on the three
  static per-locale entries.
- **P1** — `/[locale]/in/[location]`, blocked on `near-ux-designer`'s
  aggregation-page pattern (thin-coverage state designed first).
- **P2** — sitemap index split. Not before volume justifies it.
- **P3** — Layer 3 intent URLs. **Only** on real Search Console data.
  `near-seo` still has no access to that data; until it does, this stays shut.
