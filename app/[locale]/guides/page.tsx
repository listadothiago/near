import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/lib/i18n/routing";
import { getAllCollections } from "@/lib/content/collectionsLoader";
import { getStats } from "@/lib/content/loader";
import type { ContentLocale } from "@/lib/content/schema";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CollectionCards from "@/components/collection/CollectionCards";

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
  const t = await getTranslations({ locale, namespace: "collection" });
  // Without this the page inherits the root default and every route
  // shows the same title.
  return { title: t("navLabel") };
}

export default async function GuidesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const collections = getAllCollections(locale as ContentLocale);
  const stats = getStats();
  const t = await getTranslations({ locale, namespace: "collection" });

  return (
    <>
      <Header />
      <section className="mt-8">
        <h1 className="text-[clamp(1.8rem,5vw,2.6rem)] mb-5">
          {t("navLabel")}
        </h1>
        {collections.length === 0 ? (
          <p className="max-w-[55ch] font-mono text-[0.85rem] text-muted">
            {t("empty")}
          </p>
        ) : (
          <CollectionCards collections={collections} />
        )}
      </section>
      <Footer stats={stats} />
    </>
  );
}
