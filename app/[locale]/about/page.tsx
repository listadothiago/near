import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/lib/i18n/routing";
import { getStats } from "@/lib/content/loader";
import { AUTHORS } from "@/lib/content/authors";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuthorCard from "@/components/layout/AuthorCard";

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
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title"), description: t("lead") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const stats = getStats();
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <>
      <Header />
      <article className="mt-8">
        <h1 className="text-[clamp(2rem,5.5vw,3.2rem)]">{t("title")}</h1>
        <div className="mt-5 max-w-[62ch] font-mono text-[0.95rem] leading-relaxed flex flex-col gap-4">
          <p>{t("lead")}</p>
          <p>{t("humans")}</p>
          <p>{t("transparency")}</p>
        </div>

        <section className="mt-10">
          <h2 className="text-[1.3rem] mb-4">{t("theCast")}</h2>
          <div className="grid gap-3 [grid-template-columns:repeat(auto-fill,minmax(240px,1fr))]">
            {AUTHORS.map((author) => (
              <AuthorCard key={author.slug} author={author} />
            ))}
          </div>
        </section>
      </article>
      <Footer stats={stats} />
    </>
  );
}
