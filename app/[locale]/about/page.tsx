import type { Metadata } from "next";
import Image from "next/image";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/lib/i18n/routing";
import { getStats } from "@/lib/content/loader";
import { AUTHORS } from "@/lib/content/authors";
import { CURATOR } from "@/lib/content/curator";
import { Link } from "@/lib/i18n/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuthorCard from "@/components/layout/AuthorCard";
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
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title"), description: t("lead"), alternates: buildAlternates(locale, "/about") };
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

        {/* The cast is the AI bylines; this is the one human accountable
            for them. It sits above the cast deliberately — the page reads
            as "a person, and the machines they run", not the reverse. */}
        <section className="mt-10">
          <h2 className="text-[1.3rem] mb-4">{t("curatorHeading")}</h2>
          <Link
            href={`/about/${CURATOR.slug}`}
            className="flex items-center gap-3 border-[3px] border-ink bg-surface p-3 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all max-w-[62ch]"
          >
            <Image
              src={CURATOR.photo}
              alt=""
              width={56}
              height={56}
              className="flex-none border-[2px] border-ink object-cover"
            />
            <div>
              <h3 className="text-[1rem]">{CURATOR.name}</h3>
              <p className="mt-0.5 font-mono text-[0.7rem] leading-snug text-muted">
                {t("curatorBlurb")}
              </p>
            </div>
          </Link>
        </section>

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
