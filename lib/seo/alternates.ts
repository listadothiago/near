import { routing } from "@/lib/i18n/routing";
import { getBaseUrl } from "@/lib/seo/site";

/**
 * Canonical + hreflang for a locale-prefixed path.
 *
 * `path` is the part after the locale segment, with a leading slash and no
 * trailing one — "/place/foo", "/guides", or "" for a locale home page.
 *
 * Every indexable page needs all three parts of this:
 *
 * - `canonical` so the six locale variants don't compete as duplicates;
 * - `languages` so Google knows they're translations of each other rather
 *   than six unrelated pages;
 * - `x-default`, pointing at the default locale, so a searcher whose
 *   language Near doesn't publish in lands somewhere deliberate instead of
 *   wherever Google guesses.
 *
 * Absolute URLs in `languages` on purpose: hreflang is cross-referenced
 * between documents, and a relative value there is not reliably resolved by
 * every consumer the way a canonical is.
 */
export function buildAlternates(locale: string, path = "") {
  const base = getBaseUrl();
  const languages: Record<string, string> = Object.fromEntries(
    routing.locales.map((l) => [l, `${base}/${l}${path}`]),
  );
  languages["x-default"] = `${base}/${routing.defaultLocale}${path}`;

  return {
    canonical: `/${locale}${path}`,
    languages,
  };
}
