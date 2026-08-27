import type { MetadataRoute } from "next";
import { routing } from "@/lib/i18n/routing";
import { getAllPlaces } from "@/lib/content/loader";
import type { ContentLocale } from "@/lib/content/schema";
import { getBaseUrl } from "@/lib/seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getBaseUrl();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    entries.push({
      url: `${base}/${locale}`,
      lastModified: new Date(),
      priority: 1,
    });

    const places = getAllPlaces(locale as ContentLocale, {
      includeArchived: true,
    });
    for (const place of places) {
      entries.push({
        url: `${base}/${locale}/place/${place.meta.slug}`,
        lastModified: new Date(place.meta.updatedAt),
        priority: place.meta.status === "archived" ? 0.3 : 0.8,
      });
    }
  }

  return entries;
}
