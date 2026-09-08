import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/lib/i18n/routing";
import { getAllPlaces, getStats } from "@/lib/content/loader";
import type { ContentLocale } from "@/lib/content/schema";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MapPageClient from "@/components/map/MapPageClient";
import { buildAlternates } from "@/lib/seo/alternates";

export const revalidate = 3600;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "board" });
  return { title: t("map"), alternates: buildAlternates(locale, "/map") };
}

export default async function MapPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const places = getAllPlaces(locale as ContentLocale);
  const stats = getStats();

  return (
    <>
      <Header />
      <div className="mt-3 border-[3px] border-ink shadow-[var(--shadow-sm)] overflow-hidden">
        <MapPageClient places={places} />
      </div>
      <Footer stats={stats} />
    </>
  );
}
