import { getBaseUrl } from "./site";

// WhatsApp's link-preview scraper silently drops an og:image over roughly
// 600KB — no card image, no error, just a bare text bubble. Near's heroes
// are mostly full-size originals off Wikimedia and venue sites (one was
// 11MB), so nearly every share was landing without a picture.
//
// Rather than re-encode 468 source URLs, point og:image at an image proxy
// that downscales on demand and — because a scraper sends no
// `image/webp` in Accept — hands back JPEG. The 3.6MB AMUSE hero comes
// back at well under 200KB through this path.
const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 675; // 16:9 — Google Discover's image requirement.
const OG_IMAGE_QUALITY = 75;

/**
 * Build an absolute, scraper-safe og:image entry from a hero/cover URL.
 *
 * Returns an empty array when there is no image, so callers can spread it
 * straight into `openGraph.images`.
 *
 * BACKLOG P2.14 (`discover-view` skill QA, 2026-09-07): Next's own
 * `/_next/image` optimizer preserves each source's original aspect ratio
 * — it never crops — so a real per-image check found 38 of the first 40
 * catalogue heroes failing Discover's 16:9 image requirement, mostly on
 * aspect ratio rather than width. A prior pass patched the handful of
 * `lh3.googleusercontent.com` heroes with Google's own crop-via-URL
 * suffix (`=w1200-h675-c`), which only that one host supports. This
 * routes every *external* hero/cover through images.weserv.nl instead —
 * a public image proxy that can crop-to-fill any source URL regardless
 * of host — fixing the other ~460 catalogue photos (Wix, editmysite,
 * Wikimedia, …) in one place rather than per-file. Near's own local
 * assets (a relative path, e.g. the OAuth logo below) stay on Next's own
 * optimizer: weserv fetches independently over the public internet, so a
 * relative URL would resolve against nothing, and `localhost` isn't
 * publicly reachable for it to fetch during local dev either.
 */
export function buildOgImages(
  image: { url: string } | null | undefined,
  alt?: string,
) {
  if (!image?.url) return [];

  const isAbsolute = /^https?:\/\//.test(image.url);
  // Google's lh3.googleusercontent.com CDN already gets the `=w1200-h675-c`
  // crop suffix applied at authoring time (see the comment above), and
  // weserv 400s fetching these specific URLs back-to-back — its own
  // request to Google for this host comes back 400, turned into a
  // weserv-side 404 (confirmed directly: the same URL fetches 200 on its
  // own but 404 through weserv). Serve it as-is instead of double-proxying.
  const isPreCroppedGoogleHost =
    isAbsolute && /^https?:\/\/lh3\.googleusercontent\.com\//.test(image.url);

  if (isPreCroppedGoogleHost) {
    return [
      {
        url: image.url,
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        type: "image/jpeg",
        ...(alt ? { alt } : {}),
      },
    ];
  }

  const optimized = isAbsolute
    ? new URL("https://images.weserv.nl/")
    : new URL("/_next/image", getBaseUrl());

  if (isAbsolute) {
    // weserv wants the target URL without its own protocol prefix.
    optimized.searchParams.set("url", image.url.replace(/^https?:\/\//, ""));
    optimized.searchParams.set("w", String(OG_IMAGE_WIDTH));
    optimized.searchParams.set("h", String(OG_IMAGE_HEIGHT));
    optimized.searchParams.set("fit", "cover");
    optimized.searchParams.set("a", "attention"); // smart-crop toward the salient region rather than a blind center crop.
    optimized.searchParams.set("output", "jpg");
    optimized.searchParams.set("q", String(OG_IMAGE_QUALITY));
  } else {
    optimized.searchParams.set("url", image.url);
    optimized.searchParams.set("w", String(OG_IMAGE_WIDTH));
    optimized.searchParams.set("q", String(OG_IMAGE_QUALITY));
  }

  return [
    {
      url: optimized.toString(),
      width: OG_IMAGE_WIDTH,
      ...(isAbsolute ? { height: OG_IMAGE_HEIGHT } : {}),
      type: "image/jpeg",
      ...(alt ? { alt } : {}),
    },
  ];
}
