import type {
  CollectionContentFrontmatter,
  CollectionMeta,
  PlaceContentFrontmatter,
  PlaceMeta,
} from "@/lib/content/schema";

export function buildPlaceJsonLd({
  meta,
  frontmatter,
  url,
}: {
  meta: PlaceMeta;
  frontmatter: PlaceContentFrontmatter;
  url: string;
}) {
  const placeNode = {
    "@type": "Place",
    "@id": `${url}#place`,
    name: frontmatter.name,
    address: {
      "@type": "PostalAddress",
      addressLocality: meta.place.city,
      addressRegion: meta.place.region,
      addressCountry: meta.place.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: meta.coordinates.lat,
      longitude: meta.coordinates.lng,
    },
  };

  const articleNode = {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: frontmatter.name,
    description: frontmatter.seoDescription,
    author: { "@type": "Organization", name: "Near" },
    datePublished: meta.publishedAt,
    dateModified: meta.updatedAt,
    image: meta.heroImage?.url,
    about: { "@id": `${url}#place` },
    mainEntityOfPage: url,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [placeNode, articleNode],
  };
}

export function buildCollectionJsonLd({
  meta,
  frontmatter,
  url,
  places,
  isNewsArticle = false,
}: {
  meta: CollectionMeta;
  frontmatter: CollectionContentFrontmatter;
  url: string;
  places: { name: string; url: string }[];
  /** Editorial column entries are timely commentary, not an evergreen
      guide — NewsArticle (rather than the generic Article) is the
      schema.org type Google Discover actually looks for on that kind
      of piece. Every other collection type stays Article. */
  isNewsArticle?: boolean;
}) {
  const itemListNode = {
    "@type": "ItemList",
    "@id": `${url}#itemlist`,
    itemListElement: places.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      url: p.url,
    })),
  };

  const articleNode = {
    "@type": isNewsArticle ? "NewsArticle" : "Article",
    "@id": `${url}#article`,
    headline: frontmatter.title,
    description: frontmatter.seoDescription,
    author: { "@type": "Organization", name: "Near" },
    datePublished: meta.publishedAt,
    dateModified: meta.updatedAt,
    image: meta.coverImage?.url,
    mainEntityOfPage: url,
    mentions: places.map((p) => ({ "@type": "Place", name: p.name })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [itemListNode, articleNode],
  };
}
