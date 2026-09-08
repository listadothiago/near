import type {
  CollectionContentFrontmatter,
  CollectionMeta,
  PlaceContentFrontmatter,
  PlaceMeta,
} from "@/lib/content/schema";

/**
 * The home page's `WebSite` + `Organization` nodes — the one piece of
 * site-wide structured data Near was missing entirely (BACKLOG P1.18,
 * agent-usability audit). `WebSite`'s `SearchAction` is what makes a
 * Google sitelinks search box (and any agent reading schema.org to find
 * "how do I search this site") possible; without it there is no
 * machine-readable statement that the board's `?q=` param is a search
 * interface at all. `Organization` is Near-the-publisher, distinct from
 * `buildCuratorJsonLd`'s human-founder `Person` node.
 */
export function buildWebsiteJsonLd({
  baseUrl,
  locale,
  name,
  description,
}: {
  baseUrl: string;
  locale: string;
  name: string;
  description: string;
}) {
  const siteUrl = `${baseUrl}/${locale}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        name,
        description,
        url: siteUrl,
        inLanguage: locale,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteUrl}?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
        publisher: { "@id": `${baseUrl}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name,
        url: baseUrl,
        logo: `${baseUrl}/icons/icon-maskable.png`,
      },
    ],
  };
}

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
 * The `/columns` landing page: a `CollectionPage` whose `ItemList` links
 * each standing column's own archive, plus a `PeriodicalSeries` node per
 * column so search engines can tell these are recurring publications with
 * their own cadence, not five unrelated one-off pages.
 */
export function buildColumnsIndexJsonLd({
  url,
  title,
  description,
  columns,
}: {
  url: string;
  title: string;
  description: string;
  columns: { name: string; description: string; url: string; feedUrl: string }[];
}) {
  const itemListNode = {
    "@type": "ItemList",
    "@id": `${url}#itemlist`,
    itemListElement: columns.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      url: c.url,
    })),
  };

  const collectionPageNode = {
    "@type": "CollectionPage",
    "@id": `${url}#page`,
    name: title,
    description,
    url,
    mainEntity: { "@id": `${url}#itemlist` },
  };

  const seriesNodes = columns.map((c) => ({
    "@type": "PeriodicalSeries",
    "@id": `${c.url}#series`,
    name: c.name,
    description: c.description,
    url: c.url,
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [collectionPageNode, itemListNode, ...seriesNodes],
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
