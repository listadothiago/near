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

  const url = new URL("https://images.weserv.nl/");
  url.searchParams.set("url", src.replace(/^https?:\/\//, ""));
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));
  return url.toString();
}
