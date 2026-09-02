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

/**
 * The curator's `Person` node — the only one on the site.
 *
 * Near's bylines are AI personas and are marked `Organization` wherever
 * they appear (see `buildPlaceJsonLd`). That is a correctness rule, not a
 * modesty one: telling a search engine a generated persona is a human
 * being is a lie it is specifically built to detect. So exactly one real
 * human is declared here, as the publisher's founder, and every claim in
 * it is checkable against a public profile.
 */
export function buildCuratorJsonLd({
  url,
  siteUrl,
  name,
  jobTitle,
  description,
  sameAs,
  degree,
  worksFor,
}: {
  url: string;
  siteUrl: string;
  name: string;
  jobTitle: string;
  description: string;
  sameAs: readonly string[];
  degree: { name: string; institution: string };
  worksFor: readonly { org: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${url}#person`,
        name,
        jobTitle,
        description,
        url,
        sameAs: [...sameAs],
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: degree.institution,
        },
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "degree",
          name: degree.name,
        },
        knowsAbout: worksFor.map((w) => w.org),
        founderOf: { "@id": `${siteUrl}#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}#organization`,
        name: "Near",
        url: siteUrl,
        founder: { "@id": `${url}#person` },
      },
    ],
  };
}
