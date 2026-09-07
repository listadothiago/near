import { getBaseUrl } from "./site";

// WhatsApp's link-preview scraper silently drops an og:image over roughly
// 600KB — no card image, no error, just a bare text bubble. Near's heroes
// are mostly full-size originals off Wikimedia and venue sites (one was
// 11MB), so nearly every share was landing without a picture.
//
// Rather than re-encode 468 source URLs, point og:image at Next's own
// image optimizer, which downscales on demand and — because a scraper
// sends no `image/webp` in Accept — hands back JPEG. The 3.6MB AMUSE hero
// comes back at 113KB through this path.
//
// The optimizer only accepts a `w` from `deviceSizes` and, since Next 16,
// only a `q` from the configured `qualities` list, which defaults to just
// [75]. `q=70` returns 400 INVALID_IMAGE_OPTIMIZE_REQUEST, so leave these
// two constants alone unless next.config.ts grows matching entries.
const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_QUALITY = 75;

/**
 * Build an absolute, scraper-safe og:image entry from a hero/cover URL.
 *
 * Returns an empty array when there is no image, so callers can spread it
 * straight into `openGraph.images`.
 *
 * Height is deliberately omitted: the optimizer preserves each source's
 * own aspect ratio and nothing in `heroImageSchema` records it, so any
 * `og:image:height` here would be invented. Width and type are declared
 * because both are known to be true of what the optimizer returns.
 */
export function buildOgImages(
  image: { url: string } | null | undefined,
  alt?: string,
) {
  if (!image?.url) return [];

  const optimized = new URL("/_next/image", getBaseUrl());
  optimized.searchParams.set("url", image.url);
  optimized.searchParams.set("w", String(OG_IMAGE_WIDTH));
  optimized.searchParams.set("q", String(OG_IMAGE_QUALITY));

  return [
    {
      url: optimized.toString(),
      width: OG_IMAGE_WIDTH,
      type: "image/jpeg",
      ...(alt ? { alt } : {}),
    },
  ];
}
