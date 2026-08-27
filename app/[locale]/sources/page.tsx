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

export const revalidate = 3600;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
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
      <Header stats={stats} />
      <section className="mt-8">
        <h1 className="font-serif font-medium text-[1.4rem] mb-1">
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
                className="bg-surface border border-border rounded-xl px-4 py-3.5"
              >
                <h3 className="flex items-center gap-2 text-[0.86rem] font-bold uppercase tracking-wide mb-2.5">
                  <span
                    className="w-[9px] h-[9px] rounded-full"
                    style={{ background: `var(${CATEGORY_COLOR_VAR[cat]})` }}
                  />
                  {tCat(cat)}
                </h3>
                {group.map((s) => (
                  <div
                    key={s.id}
                    className="py-2 border-t border-border first:border-t-0 first:pt-0"
                  >
                    <div className="text-[0.86rem] font-semibold">
                      {s.name}{" "}
                      <span className="ml-1.5 text-[0.68rem] px-1.5 py-0.5 rounded-full bg-surface-2 border border-border text-muted align-middle">
                        {s.trust === "auto" ? t("trustAuto") : t("trustReview")}
                      </span>
                      {s.feedType === "html-extract" && (
                        <span className="ml-1.5 text-[0.68rem] px-1.5 py-0.5 rounded-full bg-surface-2 border border-border text-muted align-middle">
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
      <Footer />
    </>
  );
}
