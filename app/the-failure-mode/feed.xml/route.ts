import { getCollectionContent } from "@/lib/content/collectionsLoader";
import { buildRssFeed } from "@/lib/seo/rss";
import { getBaseUrl } from "@/lib/seo/site";
import theFailureModeIndex from "@/content/the-failure-mode-index.json";

export const revalidate = 3600;

// Dedicated feed for The Failure Mode, Near's AI-content-practice column
// (see content/the-failure-mode.md), standing byline PARSER — separate
// from the site-wide /feed.xml and the other columns' feeds, same
// reasoning: a reader who only wants the AI-content beat can subscribe
// to just this feed. Mirrors app/the-setlist/feed.xml/route.ts and
// app/column/feed.xml/route.ts.
export async function GET() {
  const base = getBaseUrl();

  const items = theFailureModeIndex.slugs
    .map((slug) => {
      const content = getCollectionContent(slug, "en");
      if (!content || content.meta.status !== "active") return null;
      return {
        title: content.frontmatter.title,
        link: `${base}/en/collection/${slug}`,
        guid: `${base}/en/collection/${slug}`,
        description: content.frontmatter.seoDescription,
        pubDate: new Date(content.meta.publishedAt).toUTCString(),
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const xml = buildRssFeed({
    title: "Near's The Failure Mode",
    description:
      "Near's AI-content-practice column, written by PARSER — the tooling, the failure modes, and the difference between a real workflow and a vendor's pitch deck.",
    path: "/the-failure-mode/feed.xml",
    items,
  });

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
