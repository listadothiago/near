import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/lib/i18n/routing";
import { getAllPlaces, getStats } from "@/lib/content/loader";
import {
  getLocationPages,
  findLocationPage,
  getAncestors,
  getChildren,
  summarizeFreshness,
} from "@/lib/content/locationPages";
import type { Category, ContentLocale, PlaceSummary } from "@/lib/content/schema";
import { buildAlternates } from "@/lib/seo/alternates";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackLink from "@/components/layout/BackLink";
import PlaceCards from "@/components/board/PlaceCards";
import LocationLadder from "@/components/location/LocationLadder";
import LocationFreshness from "@/components/location/LocationFreshness";
import { Link } from "@/lib/i18n/navigation";

export const revalidate = 3600;

/**
 * Addressable location pages — the crawlable half of "location-filtered
 * views must be shareable by link".
 *
 * A catch-all because neighborhoods are city-scoped
 * (/in/sao-paulo/pinheiros) while the coarser levels are flat (/in/london).
 * See lib/content/locationPages.ts for why that asymmetry is load-bearing
 * rather than cosmetic.
 */
export function generateStaticParams() {
  // The set of published locations is locale-independent — place metadata
  // is shared across translations — so building it once from `en` and
  // reusing it for every locale is correct, not a shortcut.
  const pages = getLocationPages(getAllPlaces("en"));
  return routing.locales.flatMap((locale) =>
    pages.map((p) => ({ locale, location: p.segments })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; location: string[] }>;
}): Promise<Metadata> {
  const { locale, location } = await params;
  const places = getAllPlaces(locale as ContentLocale);
  const page = findLocationPage(places, location);
  if (!page) return {};

  const t = await getTranslations({ locale, namespace: "location" });
  const path = `/in/${page.segments.join("/")}`;
  const title = page.parentCity
    ? `${page.label}, ${page.parentCity}`
    : page.label;

  return {
    title: t("metaTitle", { location: title }),
    description: t("metaDescription", {
      location: title,
      count: page.places.length,
    }),
    alternates: buildAlternates(locale, path),
  };
}

/**
 * Places grouped by their first category, largest group first.
 *
 * A uniform grid of N cards reads as a database dump; the grouping is what
 * makes a page of pins read as a *place*. Below the grouping threshold the
 * groups would be one card each, which is noisier than no grouping at all,
 * so the thin case renders flat.
 */
const GROUP_FROM = 4;

function groupByCategory(places: PlaceSummary[]) {
  const groups = new Map<Category, PlaceSummary[]>();
  for (const place of places) {
    const key = place.meta.categories[0];
    if (!key) continue;
    const list = groups.get(key);
    if (list) list.push(place);
    else groups.set(key, [place]);
  }
  return [...groups.entries()].sort((a, b) => b[1].length - a[1].length);
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ locale: string; location: string[] }>;
}) {
  const { locale, location } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const allPlaces = getAllPlaces(locale as ContentLocale);
  const page = findLocationPage(allPlaces, location);
  if (!page) notFound();

  const allPages = getLocationPages(allPlaces);
  const ancestors = getAncestors(page, allPages);
  const descendants = getChildren(page, allPages);

  const t = await getTranslations({ locale, namespace: "location" });
  const tc = await getTranslations({ locale, namespace: "categories" });

  // Thin coverage is the common case, not the edge case: measured
  // 2026-09-02, most locations that clear the floor clear it barely. The
  // honest treatment beats the padded one — say what Near covers, say
  // plainly that it's early, make the next step obvious. A location with
  // two pins should look deliberate, not abandoned.
  const freshness = summarizeFreshness(page.places);
  const isThin = page.places.length < GROUP_FROM;
  const grouped = isThin ? [] : groupByCategory(page.places);

  return (
    <>
      <Header />
      <BackLink />

      <article className="mt-6">
        <header>
          <h1 className="text-[clamp(1.8rem,5vw,2.6rem)] leading-[1.05] mb-1">
            {t("heading", { location: page.label })}
          </h1>
          {page.parentCity && (
            <p className="font-mono text-[0.75rem] uppercase tracking-[0.08em] text-[var(--muted)] mb-3">
              {page.parentCity}
            </p>
          )}
        </header>

        {/*
          No written editorial take is rendered here, and that is deliberate.
          None exist yet, and auto-generating one to fill the slot is exactly
          the "publish the process as copy" failure the September TOV rules
          ban. The structural summary below is honest about what this page
          is; when a human-directed lede exists for a location, it belongs
          here and this comment goes.
        */}
        <p className="max-w-[65ch] text-[1.05rem] leading-[1.55] mb-5">
          {isThin
            ? t("thinLede", {
                count: page.places.length,
                location: page.label,
              })
            : t("lede", { count: page.places.length, location: page.label })}
        </p>

        {freshness && (
          <LocationFreshness
            stats={freshness}
            labels={{
              places: (n) => t("statPlaces", { count: n }),
              checked: (n) => t("statChecked", { count: n }),
              newestToday: t("statNewestToday"),
              newest: (n) => t("statNewest", { count: n }),
            }}
          />
        )}

        <LocationLadder
          ancestors={ancestors}
          descendants={descendants}
          countLabel={(n) => t("countBadge", { count: n })}
        />

        {isThin ? (
          <PlaceCards places={page.places} tab="latest" />
        ) : (
          grouped.map(([category, places]) => (
            <section key={category} className="mb-8">
              <h2
                className="text-[0.8rem] font-mono uppercase tracking-[0.1em] mb-3 inline-block px-2 py-1 border-[length:var(--stroke)] border-[var(--ink)]"
                style={{ background: `var(--cat-${category})`, color: "var(--paper)" }}
              >
                {tc(category)}{" "}
                <span className="opacity-80">{places.length}</span>
              </h2>
              <PlaceCards places={places} tab="latest" />
            </section>
          ))
        )}

        {isThin && (
          // The next step, made obvious rather than left as a dead end.
          <p className="max-w-[65ch] mt-6 border-t-[length:var(--stroke)] border-[var(--ink)] pt-4 text-[0.95rem] leading-[1.55] text-[var(--muted)]">
            {t.rich("thinNextStep", {
              sources: (chunks) => (
                <Link
                  href="/sources"
                  className="underline underline-offset-4 text-[var(--ink)]"
                >
                  {chunks}
                </Link>
              ),
            })}
          </p>
        )}
      </article>

      <Footer stats={getStats()} />
    </>
  );
}
