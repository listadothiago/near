import { getCollectionContent } from "@/lib/content/collectionsLoader";
import { buildRssFeed } from "@/lib/seo/rss";
import { getBaseUrl } from "@/lib/seo/site";
import ladiesAndGentlethemIndex from "@/content/ladies-and-gentlethem-index.json";

export const revalidate = 3600;

// Dedicated feed for Ladies&Gentlethem, Near's monthly LGBTQIAPN+ roundup
// (see content/ladies-and-gentlethem.md) — separate from the site-wide
// /feed.xml and from /column/feed.xml, same reasoning: a reader who
// wants just this column can subscribe to just this feed. Mirrors
// app/column/feed.xml/route.ts exactly.
export async function GET() {
  const base = getBaseUrl();

  const items = ladiesAndGentlethemIndex.slugs
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
    title: "Near's Ladies&Gentlethem",
    description:
      "Near's monthly LGBTQIAPN+ roundup — new content, events, and trends, written by whichever Near persona fits that month's material.",
    path: "/ladies-and-gentlethem/feed.xml",
    items,
  });

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
