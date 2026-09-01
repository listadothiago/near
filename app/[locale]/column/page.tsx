import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/lib/i18n/routing";
import { redirect } from "@/lib/i18n/navigation";
import editorialColumnIndex from "@/content/editorial-column-index.json";

// Near's recurring weekly editorial column has no dedicated content type
// of its own — each entry is a regular collection (see
// content/editorial-column.md for the standing decision). This route is
// the one stable link the header nav can point at: it always resolves to
// whichever entry is currently latest, read from
// content/editorial-column-index.json (kept in sync by near-editor/
// near-refresh whenever a new entry publishes), so the nav link never
// needs to change by hand.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ColumnRedirectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const latestSlug = editorialColumnIndex.slugs[0];
  if (!latestSlug) notFound();

  redirect({ href: `/collection/${latestSlug}`, locale });
}
