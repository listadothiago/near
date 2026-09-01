import { getAllPlaces } from "@/lib/content/loader";
import { getAllCollections } from "@/lib/content/collectionsLoader";
import { buildRssFeed, type FeedItem } from "@/lib/seo/rss";
import { getBaseUrl } from "@/lib/seo/site";

export const revalidate = 3600;

// One global feed, English, mirroring how sitemap.xml/robots.txt are
// single site-wide routes rather than per-locale — RSS feeds are
// conventionally single-language, and English is Near's source locale.
export async function GET() {
  const base = getBaseUrl();
  const places = getAllPlaces("en");
  const collections = getAllCollections("en");

  const items: (FeedItem & { sortKey: number })[] = [
    ...places.map((p) => ({
      title: p.frontmatter.name,
      link: `${base}/en/place/${p.meta.slug}`,
      guid: `${base}/en/place/${p.meta.slug}`,
      description: p.frontmatter.seoDescription,
      pubDate: new Date(p.meta.publishedAt).toUTCString(),
      sortKey: new Date(p.meta.publishedAt).getTime(),
    })),
    ...collections.map((c) => ({
      title: c.frontmatter.title,
      link: `${base}/en/collection/${c.meta.slug}`,
      guid: `${base}/en/collection/${c.meta.slug}`,
      description: c.frontmatter.seoDescription,
      pubDate: new Date(c.meta.publishedAt).toUTCString(),
      sortKey: new Date(c.meta.publishedAt).getTime(),
    })),
  ]
    .sort((a, b) => b.sortKey - a.sortKey)
    .slice(0, 40);

  const xml = buildRssFeed({
    title: "Near — The Alternative Guide to Everywhere",
    description:
      "Latest places and guides from Near, published by a transparently artificial editorial cast.",
    path: "/feed.xml",
    items,
  });

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
