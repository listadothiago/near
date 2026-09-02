import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/lib/i18n/routing";
import { getAllPlaces, getStats } from "@/lib/content/loader";
import { CURATOR, getCuratorCoverage } from "@/lib/content/curator";
import type { ContentLocale } from "@/lib/content/schema";
import { buildCuratorJsonLd } from "@/lib/seo/jsonld";
import { buildAlternates } from "@/lib/seo/alternates";
import { getBaseUrl } from "@/lib/seo/site";
import { Link } from "@/lib/i18n/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackLink from "@/components/layout/BackLink";

export const revalidate = 3600;

const PATH = `/about/${CURATOR.slug}`;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "curator" });
  return {
    title: t("metaTitle", { name: CURATOR.name }),
    description: t("metaDescription", { name: CURATOR.name }),
    alternates: buildAlternates(locale, PATH),
  };
}

export default async function CuratorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "curator" });
  const places = getAllPlaces(locale as ContentLocale);

  // Counted, not asserted. The claim "Near covers the cities I've lived
  // in" is only worth making if the number is real and moves on its own
  // as coverage changes.
  const pinsByCity = new Map<string, number>();
  for (const p of places) {
    const c = p.meta.place.city;
    pinsByCity.set(c, (pinsByCity.get(c) ?? 0) + 1);
  }
  const coverage = getCuratorCoverage(pinsByCity);
  const covered = coverage.filter((c) => c.pins > 0);
  const pinsInLivedCities = covered.reduce((n, c) => n + c.pins, 0);

  const siteUrl = getBaseUrl();
  const url = `${siteUrl}/${locale}${PATH}`;

  const jsonLd = buildCuratorJsonLd({
    url,
    siteUrl,
    name: CURATOR.name,
    jobTitle: t("jobTitle"),
    description: t("metaDescription", { name: CURATOR.name }),
    sameAs: CURATOR.sameAs,
    degree: CURATOR.degree,
    worksFor: CURATOR.career.map((c) => ({ org: c.org })),
  });

  return (
    <>
      <Header />
      <BackLink />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mt-6 max-w-[68ch]">
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-[var(--muted)] mb-2">
          {t("eyebrow")}
        </p>
        <h1 className="text-[clamp(1.9rem,5vw,2.8rem)] leading-[1.05] mb-3">
          {CURATOR.name}
        </h1>
        <p className="text-[1.1rem] leading-[1.55] mb-4">{t("lede")}</p>
        <p className="leading-[1.6] mb-6">{t("origin")}</p>

        <h2 className="text-[1.15rem] mt-8 mb-2">{t("whyHeading")}</h2>
        <p className="leading-[1.6] mb-3">{t("whyBody")}</p>

        <h2 className="text-[1.15rem] mt-8 mb-2">{t("workHeading")}</h2>
        <ul className="list-none p-0 m-0 flex flex-col gap-3">
          {CURATOR.career.map((role) => (
            <li
              key={role.key}
              className="border-l-[length:var(--stroke)] border-[var(--ink)] pl-3"
            >
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-[var(--muted)]">
                {role.org} · {role.city} · {role.years}
              </p>
              <p className="leading-[1.55]">{t(`roles.${role.key}`)}</p>
            </li>
          ))}
        </ul>
        <p className="font-mono text-[0.75rem] text-[var(--muted)] mt-4">
          {t("degree", {
            degree: CURATOR.degree.name,
            institution: CURATOR.degree.institution,
          })}
        </p>

        <h2 className="text-[1.15rem] mt-8 mb-2">{t("citiesHeading")}</h2>
        <p className="leading-[1.6] mb-3">
          {t("citiesBody", { pins: pinsInLivedCities, cities: covered.length })}
        </p>
        <ul className="list-none p-0 m-0 flex flex-wrap gap-2">
          {coverage.map((c) => (
            <li
              key={c.city}
              className="border-[length:var(--stroke)] border-[var(--ink)] px-2.5 py-1 text-[0.85rem]"
            >
              {c.city}
              {/* The neighbourhood is the part that proves it was lived in
                  rather than passed through — Garbatella, not "Rome". */}
              {c.region && (
                <span className="text-[0.8rem] text-[var(--muted)]">
                  {" "}
                  · {c.region}
                </span>
              )}{" "}
              <span className="font-mono text-[0.7rem] text-[var(--muted)]">
                {c.pins > 0 ? t("pinCount", { count: c.pins }) : t("notYet")}
              </span>
            </li>
          ))}
        </ul>

        {/* Disclosed, not neutralised. A curator page claiming no taste
            would be less trustworthy than one naming its slant. */}
        <p className="leading-[1.6] mt-4">{t("bias")}</p>

        <h2 className="text-[1.15rem] mt-8 mb-2">{t("languagesHeading")}</h2>
        {/* The gap is stated, not buried. A curator page implying oversight
            of six locales when the curator reads five would be the exact
            unearned authority claim this page exists to avoid. */}
        <p className="leading-[1.6]">{t("languagesBody")}</p>

        <h2 className="text-[1.15rem] mt-8 mb-2">{t("aiHeading")}</h2>
        <p className="leading-[1.6] mb-3">{t("aiBody")}</p>

        <p className="mt-8 border-t-[length:var(--stroke)] border-[var(--ink)] pt-4 font-mono text-[0.8rem]">
          <a
            href={CURATOR.sameAs[0]}
            rel="me noopener"
            className="underline underline-offset-4"
          >
            {t("linkedin")}
          </a>
          {" · "}
          <Link href="/about" className="underline underline-offset-4">
            {t("aboutLink")}
          </Link>
          {" · "}
          <Link href="/sources" className="underline underline-offset-4">
            {t("sourcesLink")}
          </Link>
        </p>
      </article>

      <Footer stats={getStats()} />
    </>
  );
}
