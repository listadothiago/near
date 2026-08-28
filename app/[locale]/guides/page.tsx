import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { routing } from "@/lib/i18n/routing";
import { getAllCollections } from "@/lib/content/collectionsLoader";
import { getStats } from "@/lib/content/loader";
import type { ContentLocale } from "@/lib/content/schema";
import { Link } from "@/lib/i18n/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const revalidate = 3600;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
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
        <h1 className="font-serif font-medium text-[1.4rem] mb-5">
          {t("navLabel")}
        </h1>
        <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          {collections.map((c) => (
            <Link
              key={c.meta.slug}
              href={`/collection/${c.meta.slug}`}
              className="block bg-surface border border-border rounded-2xl overflow-hidden group"
            >
              {c.meta.coverImage && (
                <div className="relative w-full aspect-[16/9] bg-surface-2">
                  <Image
                    src={c.meta.coverImage.url}
                    alt={c.frontmatter.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <p className="text-[0.72rem] font-mono text-muted uppercase tracking-wide">
                  {t("placesCount", { count: c.meta.placeSlugs.length })}
                </p>
                <h2 className="mt-1 font-serif italic font-medium text-[1.2rem] group-hover:text-accent-ink transition-colors">
                  {c.frontmatter.title}
                </h2>
                <p className="mt-1 text-[0.88rem] text-muted">
                  {c.frontmatter.dek}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Footer stats={stats} />
    </>
  );
}
