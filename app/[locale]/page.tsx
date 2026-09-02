import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/seo/alternates";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/lib/i18n/routing";
import {
  getAllPlaces,
  getStats,
  getUpcomingEventsByParent,
} from "@/lib/content/loader";
import { getAllCollections } from "@/lib/content/collectionsLoader";
import HousePromo from "@/components/ads/HousePromo";
import type { ContentLocale } from "@/lib/content/schema";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Board from "@/components/board/Board";
import GuidesStrip from "@/components/collection/GuidesStrip";

// Revalidate periodically so events that have passed their eventEndsAt
// drop off the board without requiring a new commit/deploy.
export const revalidate = 3600;

// The six locale home pages are the most-crawled URLs on the site and were
// shipping with neither a canonical nor an hreflang set — six near-identical
// boards competing with each other. Title/description stay inherited from
// the root layout; only the alternates are declared here.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: buildAlternates(locale) };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const places = getAllPlaces(locale as ContentLocale);
  const eventsByParent = getUpcomingEventsByParent(locale as ContentLocale);
  const stats = getStats();
  const collections = getAllCollections(locale as ContentLocale);

  return (
    <>
      <Header
        availableCats={[...new Set(places.flatMap((p) => p.meta.categories))]}
        availableTags={[...new Set(places.flatMap((p) => p.meta.tags))]}
      />
      <Board
        places={places}
        eventsByParent={eventsByParent}
        promo={
          <HousePromo
            locale={locale as ContentLocale}
            slot="board-inline"
            size="mrec"
            stretch
          />
        }
        mapPromo={
          /* 320x100 rather than a 300x250 mrec: this unit sits inside the
             sticky map column, whose combined height (map + caption + ad)
             can already exceed the viewport — see Board.tsx's note on the
             max-h/overflow workaround. A short format buys back 150px of
             that budget and makes the column behave at more heights.
             mobile-banner, not leaderboard, because the column is a fixed
             300px: a 728x90 sold into 300px would misrepresent the
             inventory to whoever buys it. */
          <HousePromo
            locale={locale as ContentLocale}
            slot="board-map"
            size="mobile-banner"
            stretch
          />
        }
      />
      <GuidesStrip collections={collections} />
      <Footer stats={stats} />
    </>
  );
}
