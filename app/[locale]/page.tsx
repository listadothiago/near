import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/lib/i18n/routing";
import { getAllPlaces, getStats } from "@/lib/content/loader";
import { getAllCollections } from "@/lib/content/collectionsLoader";
import type { ContentLocale } from "@/lib/content/schema";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Board from "@/components/board/Board";
import GuidesStrip from "@/components/collection/GuidesStrip";

// Revalidate periodically so events that have passed their eventEndsAt
// drop off the board without requiring a new commit/deploy.
export const revalidate = 3600;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const places = getAllPlaces(locale as ContentLocale);
  const stats = getStats();
  const collections = getAllCollections(locale as ContentLocale);

  return (
    <>
      <Header />
      <Board places={places} />
      <GuidesStrip collections={collections} />
      <Footer stats={stats} />
    </>
  );
}
