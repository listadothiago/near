import { getCollectionContent } from "@/lib/content/collectionsLoader";
import { buildRssFeed } from "@/lib/seo/rss";
import { getBaseUrl } from "@/lib/seo/site";
import editorialColumnIndex from "@/content/editorial-column-index.json";

export const revalidate = 3600;

// Dedicated feed for Near's weekly editorial column (see
// content/editorial-column.md) — separate from the site-wide /feed.xml
// so a reader who only wants the column's opinion pieces, not every new
// place, can subscribe to just that.
export async function GET() {
  const base = getBaseUrl();

  const items = editorialColumnIndex.slugs
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
    title: "Near's Weekly Column",
    description:
      "Near's recurring editorial column — the masthead's own opinionated take, published weekly.",
    path: "/column/feed.xml",
    items,
  });

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
