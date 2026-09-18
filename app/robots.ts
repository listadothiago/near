import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/seo/site";

/**
 * Crawl-delay only, never disallow — these bots scrape for model training,
 * not live answers, so they send Near no referral traffic back. They're also
 * numerous enough that unthrottled crawling of a growing, revalidate-heavy
 * catalog directly drives Vercel Fluid CPU cost with zero SEO/AEO benefit.
 * Crawl-delay is respected by some of these (not all — it's a courtesy
 * signal, not enforcement) and costs nothing if ignored.
 *
 * Bots that can plausibly cite Near in a live chat answer (ChatGPT-User,
 * OAI-SearchBot, PerplexityBot, ClaudeBot, Applebot) are deliberately left
 * out of this list — that traffic is worth the crawl.
 */
const TRAINING_ONLY_BOTS = [
  "GPTBot",
  "CCBot",
  "Bytespider",
  "Google-Extended",
  "Meta-ExternalAgent",
  "Diffbot",
  "ImagesiftBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: TRAINING_ONLY_BOTS,
        allow: "/",
        crawlDelay: 10,
      },
    ],
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
