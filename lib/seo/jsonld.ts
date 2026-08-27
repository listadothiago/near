import type { PlaceContentFrontmatter, PlaceMeta } from "@/lib/content/schema";

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
