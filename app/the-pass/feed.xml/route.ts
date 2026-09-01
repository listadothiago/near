import { getCollectionContent } from "@/lib/content/collectionsLoader";
import { buildRssFeed } from "@/lib/seo/rss";
import { getBaseUrl } from "@/lib/seo/site";
import thePassIndex from "@/content/the-pass-index.json";

export const revalidate = 3600;

// Dedicated feed for The Pass, Near's weekly gastronomic column (see
// content/gastronomic-column.md), orchestrated by FOODIE-9000 — separate
// from the site-wide /feed.xml and the other columns' feeds, same
// reasoning: a reader who wants just the food-and-drink beat can
// subscribe to just this feed. Mirrors app/the-setlist/feed.xml/route.ts
// and app/ladies-and-gentlethem/feed.xml/route.ts.
export async function GET() {
  const base = getBaseUrl();

  const items = thePassIndex.slugs
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
    title: "Near's The Pass",
    description:
      "Near's weekly gastronomic column, orchestrated by FOODIE-9000 — real, current food-and-drink stories, written by whichever Near byline fits that week's material.",
    path: "/the-pass/feed.xml",
    items,
  });

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
