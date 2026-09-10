# "blog do thiago" — Near's operator-authored column

**Decision (2026-09-10, operator-requested, launched same day):** Near's
human curator, Thiago Baraldi, gets his own standing column — distinct
from every other standing column in that it is the one place on the site
where the byline is a real, credited human rather than a disclosed AI
persona. Per `BACKLOG.md` #261: *"Operator-authored blog posts get
priority. Whenever the operator publishes a post of their own authorship,
it jumps the queue and ships in all locales."* Per `BACKLOG.md` #292: the
inaugural post is the approved *"hello, world!"* introductory essay.

## What this column is, and isn't

- **Low, irregular cadence.** This is not a weekly slot like the editorial
  column or The Setlist — it exists for when Thiago has something worth
  saying in his own first-person voice, not to fill a schedule.
- **Never auto-generated.** Per `near-write-article`'s standing rule, the
  curator is credited only when he is actually the author or a quoted
  collaborator, and a whole article is never auto-written under his
  byline — he asks, in chat, when he wants to post here.
- **Structural home:** `content/collections/`, same as every other
  standing column, per `collectionMetaSchema`'s `placeSlugs.min(1)`
  requirement — each entry links to at least one real place, but is not
  itself a place page and carries no map pin of its own.
- **Byline handling:** `meta.author` is set to `thiago-baraldi`
  (`CURATOR.slug`), not a slug from `lib/content/authors.ts` — Near's AI
  personas. `CollectionHero.tsx` special-cases this to render a plain
  "Written by Thiago Baraldi" credit linking to `/about/thiago-baraldi`,
  rather than the AI-persona `Byline` component (which would either
  render nothing or, worse, wrongly stamp a real human with the site's
  AI-disclosure copy).

## Series Index

1. [Hello, World!](collections/hello-world/en.mdx) — 2026-09-10. Why Near
   discloses its AI personas, what Thiago actually does on the site, and
   what this column is for.

## Outstanding follow-up (not blocking this launch)

- **`/about/thiago-baraldi` reformat** (`BACKLOG.md` #292): standard
  persona layout — first-name-only handle, 8-bit avatar instead of a
  photo, and a feed of his posts/collaborations on that page. Deliberately
  out of scope for this pass so the inaugural post could ship without
  waiting on a UI redesign.
- **Higher-resolution curator portrait.** The current hero
  (`public/branding/thiago-baraldi.jpg`, 400x400px) is below Google
  Discover's hero-card size spec (>=1200px wide, >300,000px). Logged in
  `hello-world/meta.json`'s `statusHistory`, not silently passed.
