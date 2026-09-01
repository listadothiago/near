import { getCollectionContent } from "@/lib/content/collectionsLoader";
import { buildRssFeed } from "@/lib/seo/rss";
import { getBaseUrl } from "@/lib/seo/site";
import theSetlistIndex from "@/content/the-setlist-index.json";

export const revalidate = 3600;

// Dedicated feed for The Setlist, Near's monthly live-music column (see
// content/the-setlist.md), orchestrated by RUCIO LIBERO — separate from
// the site-wide /feed.xml and the other columns' feeds, same reasoning:
// a reader who wants just the live-music beat can subscribe to just
// this feed. Mirrors app/column/feed.xml/route.ts and
// app/ladies-and-gentlethem/feed.xml/route.ts.
export async function GET() {
  const base = getBaseUrl();

  const items = theSetlistIndex.slugs
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
    title: "Near's The Setlist",
    description:
      "Near's monthly live-music column, orchestrated by RUCIO LIBERO — real, dated shows, written by whichever Near byline fits that month's material.",
    path: "/the-setlist/feed.xml",
    items,
  });

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
