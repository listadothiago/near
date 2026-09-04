
/**
 * Pure, client-safe half of the freshness feature — no `node:fs`, because
 * Header (a "use client" component) renders the site-wide stamp and would
 * drag the filesystem scan into the browser bundle otherwise. The scan
 * itself lives in ./siteFreshness.ts, server-only.
 *
 * Freshness is a promise the site now makes out loud — the tagline reads
 * "The *always fresh* guide to anywhere." Until this module existed,
 * `updatedAt` was consumed only by machines (`dateModified` in JSON-LD,
 * `lastmod` in the sitemap) and never shown to a reader, so a piece
 * published in June and corrected last week displayed June. Google knew
 * about the correction; the person reading it did not.
 *
 * Nothing here invents a date. If a piece's `updatedAt` equals its
 * `publishedAt`, that is the truth and it renders as a publish date only.
 */

/**
 * Whether a piece's `updatedAt` is a revision worth showing a reader
 * separately from its publish date.
 *
 * Two conditions, and both are needed. Each alone was tried against the
 * real corpus and each alone was wrong:
 *
 * 1. **At least 24 hours later.** Under a day is the piece still being
 *    published — a locale backfill, a hero swap, a typo pass. Badging
 *    those as "Revised" makes the signal universal and therefore
 *    meaningless.
 * 2. **A different rendered calendar day (UTC).** These dates print to
 *    day precision, so if both sides render the same string, showing
 *    "Published 3 Sep · Revised 3 Sep" is pure noise.
 *
 * Why not condition 1 alone at a comfortable length: a week-long
 * settling period was the first rule written here, and against the
 * actual corpus — 81 places and collections, 50 of them with `updatedAt`
 * identical to `publishedAt`, largest real gap four days — it matched
 * *nothing*. It would have shipped a feature that rendered on zero
 * pages.
 *
 * Why not condition 2 alone: ten pieces have an `updatedAt` on a later
 * calendar day, but several of those gaps are a few minutes that happen
 * to straddle UTC midnight (23:13 → 00:00). A five-minute edit is not a
 * revision no matter which side of midnight it lands on.
 *
 * Together they select the seven pieces with a genuine two-to-four-day
 * gap, which is what a revision on this site currently looks like.
 *
 * Nothing here invents a date. Where `updatedAt` equals `publishedAt` —
 * the majority case — that is the truth, and the piece shows a publish
 * date alone.
 */
export function isRevised(publishedAt: string, updatedAt: string): boolean {
  const published = new Date(publishedAt);
  const updated = new Date(updatedAt);
  const p = published.getTime();
  const u = updated.getTime();
  if (Number.isNaN(p) || Number.isNaN(u)) return false;
  // Some meta files carry an `updatedAt` *earlier* than `publishedAt`
  // (a publish date set ahead of the edit that created the file). That
  // is not a revision and must never render as one.
  if (u - p < 24 * 60 * 60 * 1000) return false;
  return utcDay(updated) > utcDay(published);
}

/** Days since epoch, UTC — the unit formatContentDate actually prints. */
function utcDay(d: Date): number {
  return Math.floor(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) / 86400000,
  );
}

/**
 * The one date formatter for reader-facing content dates.
 *
 * `timeZone: "UTC"` is load-bearing, not decoration. These components
 * render on the server (Node, TZ=UTC on Vercel) and again in the browser
 * (the reader's own zone), and a timestamp near midnight would otherwise
 * resolve to different calendar days on each side — a hydration mismatch
 * that appears only for some readers, at some hours, which is the classic
 * way this feature ships broken. Pinning the zone makes both sides agree.
 * Absolute dates rather than "3 days ago" for the same reason: relative
 * time is wrong the moment a static page outlives its build.
 */
export function formatContentDate(iso: string, locale: string): string {
  return new Date(iso).toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export type SiteFreshness = {
  /** ISO timestamp of the most recent publish-or-revision on the site. */
  at: string;
  /** Path (locale-relative) of the piece carrying that timestamp. */
  href: string;
  /** Whether that timestamp is the piece's publication or its revision. */
  kind: "published" | "revised";
};
