import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${getBaseUrl()}/sitemap.xml`,
  };
}

/**
 * `max-image-preview:large` is NOT a Discover eligibility gate — content is
 * eligible once it's indexed and meets Discover's content policies, with no
 * special tag required (verified against Google's "Get on Discover" doc,
 * 2026-09-02, not from training data).
 *
 * What it does control is whether Google may render a large image preview,
 * which is exactly what a Discover card and a rich Search result are. Near's
 * hero-image standard is already built for that treatment, so without this
 * directive the site was opting itself down to a thumbnail.
 *
 * `max-snippet:-1` and `max-video-preview:-1` remove the equivalent
 * self-imposed caps on text and video previews. All three are set as page
 * metadata in the root layout rather than in robots.txt, since the robots
 * *meta tag* is the per-page mechanism Google documents for them.
 */
export const ROBOTS_PREVIEW_DIRECTIVES = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
} as const;
