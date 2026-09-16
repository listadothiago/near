"use client";

/**
 * Custom next/image loader routing through images.weserv.nl instead of
 * Vercel's built-in Image Optimization API.
 *
 * Vercel's optimizer is metered and the project exhausted its quota
 * (`/_next/image` started returning 402 OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED
 * for every hero on the site, 2026-09-08 — reported first by a real user,
 * "Annix", as missing/blank images and initially misdiagnosed as a stale
 * PWA cache before the 402 was found directly with curl). weserv is
 * already trusted for og:image generation (see lib/seo/ogImage.ts) and is
 * free/unmetered, so this reuses the same proxy for the on-page
 * `next/image` component instead of paying Vercel per optimized image.
 *
 * Local/relative assets (no http(s) prefix) skip the proxy — weserv fetches
 * over the public internet and can't reach a relative path or localhost.
 */
export default function weservLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const isAbsolute = /^https?:\/\//.test(src);
  if (!isAbsolute) {
    return `${src}${src.includes("?") ? "&" : "?"}w=${width}&q=${quality ?? 75}`;
  }

  // Wikimedia rate-limits weserv's shared fetching IPs hard enough that
  // proxied requests come back 429 → weserv turns that into a 404 (found
  // 2026-09-08 on the-setlist-2026-10's hero). Wikimedia's own CDN is
  // built for direct hotlinking, so skip the proxy for it entirely.
  if (/^https?:\/\/upload\.wikimedia\.org\//.test(src)) {
    return src;
  }

  // Google's Maps/Photos CDN (lh3.googleusercontent.com — the domain
  // every Google Maps contributor-photo heroImage.url uses per rules.md's
  // HERO IMAGE TIERS policy) rejects weserv's shared fetching IPs with a
  // 400, which weserv turns into a 404 — same failure shape as the
  // Wikimedia case above, found 2026-09-10 on black-bird-bookstore's hero
  // (blank/gray card; the same URL curls 200 directly, confirming it's
  // weserv's fetch that's blocked, not a dead/expired link). Google's CDN
  // is built for direct hotlinking (it's how Maps itself embeds these
  // photos), so skip the proxy for it too.
  if (/^https?:\/\/lh3\.googleusercontent\.com\//.test(src)) {
    return src;
  }

  const url = new URL("https://images.weserv.nl/");
  url.searchParams.set("url", src.replace(/^https?:\/\//, ""));
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));
  // weserv's own default is a 1-year Cache-Control, fronted by Cloudflare's
  // edge — so once a given (url, width, quality) combo is cached, swapping
  // the file at the same near.tips URL (e.g. a hero-image fix) can stay
  // invisible at already-warmed edge PoPs for up to a year, with no purge
  // API available to us. Found 2026-09-16: a corrected Restaurante Drina
  // hero was live and byte-correct at the origin, and even a fresh
  // large-width weserv request showed the fix, but the small width the
  // feed card actually requests was still serving the old cached image.
  // Cap same-origin (near.tips) images to a 1-hour edge TTL so a content
  // fix propagates within the hour instead of silently waiting out a
  // year-long cache — matches this content's own revalidate=3600 cadence.
  if (/^https?:\/\/near\.tips\//.test(src)) {
    url.searchParams.set("maxage", "1h");
  }
  return url.toString();
}
