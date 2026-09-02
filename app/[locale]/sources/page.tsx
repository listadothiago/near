import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/lib/i18n/routing";
import { getSourceCatalog } from "@/lib/content/sourcesCatalog";
import { getStats } from "@/lib/content/loader";
import { CATEGORIES, CATEGORY_COLOR_VAR } from "@/lib/content/categories";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SubmitForm from "@/components/inbox/SubmitForm";
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
  const t = await getTranslations({ locale, namespace: "sources" });
  // Without this the page inherits the root default and every route
  // shows the same title.
  return { title: t("navLabel"), alternates: buildAlternates(locale, "/sources") };
}

export default async function SourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const sources = getSourceCatalog();
  const stats = getStats();
  const t = await getTranslations({ locale, namespace: "sources" });
  const tCat = await getTranslations({ locale, namespace: "categories" });

  return (
    <>
      <Header />
      <section className="mt-8">
        <h1 className="text-[clamp(1.8rem,5vw,2.6rem)] mb-1">
          {t("title")}
        </h1>
        <p className="text-muted max-w-[64ch] text-[0.94rem] mb-5">
          {t("intro", { count: sources.length })}
        </p>

        <div className="grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
          {CATEGORIES.map((cat) => {
            const group = sources.filter((s) => s.category === cat);
            if (group.length === 0) return null;
            return (
              <div
                key={cat}
                className="bg-surface border-[3px] border-ink shadow-[var(--shadow-sm)] px-4 py-3.5"
              >
                <h3 className="flex items-center gap-2 text-[0.86rem] font-bold uppercase tracking-wide mb-2.5">
                  <span
                    className="w-[9px] h-[9px] border border-ink"
                    style={{ background: `var(${CATEGORY_COLOR_VAR[cat]})` }}
                  />
                  {tCat(cat)}
                </h3>
                {group.map((s) => (
                  <div
                    key={s.id}
                    className="py-2 border-t border-ink/25 first:border-t-0 first:pt-0"
                  >
                    <div className="text-[0.86rem] font-semibold">
                      {s.name}{" "}
                      <span className="ml-1.5 text-[0.68rem] px-1.5 py-0.5 bg-surface-2 border border-ink text-muted align-middle font-mono">
                        {s.trust === "auto" ? t("trustAuto") : t("trustReview")}
                      </span>
                      {s.feedType === "html-extract" && (
                        <span className="ml-1.5 text-[0.68rem] px-1.5 py-0.5 bg-surface-2 border border-ink text-muted align-middle font-mono">
                          no direct feed
                        </span>
                      )}
                    </div>
                    <div className="text-[0.74rem] text-muted mt-0.5">
                      {s.region}
                    </div>
                    {s.feedUrl && (
                      <a
                        href={s.feedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block mt-0.5 text-[0.72rem] font-mono text-muted hover:text-accent-ink break-all"
                      >
                        {s.feedUrl}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
        <SubmitForm />
      </section>
      <Footer stats={stats} />
    </>
  );
}
