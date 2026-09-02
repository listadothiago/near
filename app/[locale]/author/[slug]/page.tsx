import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/lib/i18n/routing";
import { getAllAuthorSlugs, getAuthor } from "@/lib/content/authors";
import { buildAlternates } from "@/lib/seo/alternates";
import { CURATOR } from "@/lib/content/curator";
import { Link } from "@/lib/i18n/navigation";
import { getAllPlaces, getStats } from "@/lib/content/loader";
import type { ContentLocale } from "@/lib/content/schema";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackLink from "@/components/layout/BackLink";
import AuthorAvatar from "@/components/layout/AuthorAvatar";
import PlaceCards from "@/components/board/PlaceCards";

export const revalidate = 3600;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllAuthorSlugs().map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const author = getAuthor(slug);
  if (!author) return {};
  const tA = await getTranslations({ locale, namespace: `authors.${slug}` });
  return {
    title: author.handle,
    description: `${tA("role")} — ${tA("disclosure")}`,
    alternates: buildAlternates(locale, `/author/${slug}`),
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const author = getAuthor(slug);
  if (!author) notFound();

  const places = getAllPlaces(locale as ContentLocale).filter(
    (p) => p.meta.author === slug,
  );
  const stats = getStats();
  const t = await getTranslations({ locale, namespace: "author" });
  const tA = await getTranslations({ locale, namespace: `authors.${slug}` });
  const tCur = await getTranslations({ locale, namespace: "curator" });

  return (
    <>
      <Header />
      <div className="mt-6">
        <BackLink />
      </div>
      <article className="mt-4 border-[3px] border-ink bg-surface p-5 shadow-[var(--shadow)]">
        <div className="flex items-center gap-4">
          <AuthorAvatar author={author} size={96} />
          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-wide text-muted">
              {tA("role")}
            </p>
            <h1 className="mt-1 text-[clamp(2rem,5vw,3rem)]">{author.handle}</h1>
          </div>
        </div>
        <p className="mt-3 inline-block bg-accent text-black border-[3px] border-ink px-2 py-1 font-mono text-[0.72rem] uppercase tracking-wide">
          {t("aiLabel")}
        </p>
        <p className="mt-4 max-w-[60ch] text-[0.95rem] leading-relaxed">
          {tA("disclosure")}
        </p>
        <p className="mt-3 max-w-[60ch] text-[0.95rem] leading-relaxed text-muted">
          {tA("bio")}
        </p>
        {/* The trust chain, made walkable. This byline is a declared AI
            persona and never a Person in structured data; the link points
            at the one human who is actually accountable for it. Without
            this, a reader landing on an author page has no route to a
            responsible party at all. */}
        <p className="mt-5 border-t-[length:var(--stroke)] border-[var(--ink)] pt-3 max-w-[60ch] font-mono text-[0.75rem] text-muted">
          {tCur("oversightNote")}{" "}
          <Link
            href={`/about/${CURATOR.slug}`}
            className="underline underline-offset-4 text-ink"
          >
            {CURATOR.name}
          </Link>
        </p>
      </article>

      <section className="mt-8">
        <h2 className="text-[1.3rem] mb-4">{t("filedBy", { handle: author.handle })}</h2>
        {places.length === 0 ? (
          <p className="font-mono text-[0.85rem] text-muted">{t("noPieces")}</p>
        ) : (
          <PlaceCards places={places} />
        )}
      </section>
      <Footer stats={stats} />
    </>
  );
}
