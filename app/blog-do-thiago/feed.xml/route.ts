import { getCollectionContent } from "@/lib/content/collectionsLoader";
import { buildRssFeed } from "@/lib/seo/rss";
import { getBaseUrl } from "@/lib/seo/site";
import blogDoThiagoIndex from "@/content/blog-do-thiago-index.json";

export const revalidate = 3600;

// "blog do thiago" (see content/blog-do-thiago.md) is Near's one
// operator-authored column — credited to the real human curator, not a
// disclosed AI persona. Same feed shape as the other five standing
// columns (mirrors app/the-pass/feed.xml/route.ts); low, irregular
// cadence is the column's own nature, not a reason to skip a feed.
export async function GET() {
  const base = getBaseUrl();

  const items = blogDoThiagoIndex.slugs
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
    title: "blog do thiago",
    description:
      "Near's operator-authored column — Thiago Baraldi, in his own voice, credited by name rather than a disclosed AI persona.",
    path: "/blog-do-thiago/feed.xml",
    items,
  });

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
