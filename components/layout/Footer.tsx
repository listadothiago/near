import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import type { NearStats } from "@/lib/content/loader";

// Index/sync counters and secondary links. Language and theme moved to
// the header — down here they were unreachable on a phone, which is the
// same reason the board is paginated rather than infinite-scrolled.
export default function Footer({ stats }: { stats: NearStats }) {
  const t = useTranslations();

  return (
    <footer className="mt-12 pt-4 border-t-[4px] border-ink font-mono text-[0.72rem] text-muted flex flex-col gap-3">
      <div className="flex flex-wrap gap-x-1.5 gap-y-1">
        <span className="whitespace-nowrap">
          <strong className="text-ink font-semibold">
            {stats.placesIndexed}
          </strong>{" "}
          {t("status.articlesIndexed")}
        </span>
        <span className="whitespace-nowrap">
          ·{" "}
          <Link
            href="/sources"
            className="hover:text-accent-ink underline decoration-muted/40 underline-offset-2"
          >
            <strong className="text-ink font-semibold">
              {stats.sourcesWatched}
            </strong>{" "}
            {t("status.sourcesWatched")}
          </Link>
        </span>
        <span className="whitespace-nowrap">
          · {t("status.lastSync")}:{" "}
          {new Date(stats.lastSyncAt)
            .toISOString()
            .slice(0, 16)
            .replace("T", " ")}{" "}
          UTC
        </span>
      </div>

      <div className="flex justify-between flex-wrap gap-2 uppercase tracking-wide">
        <span>{t("app.wordmark")}</span>
        <span className="flex gap-3">
          <Link href="/guides" className="hover:bg-accent hover:text-black">
            {t("collection.navLabel")}
          </Link>
          <Link href="/sources" className="hover:bg-accent hover:text-black">
            {t("sources.navLabel")}
          </Link>
          <Link href="/about" className="hover:bg-accent hover:text-black">
            {t("nav.about")}
          </Link>
          {/* The site's only human node. Site-wide because credibility
              claims are worthless on a page nobody has a route to. */}
          <Link
            href="/about/thiago-baraldi"
            className="hover:bg-accent hover:text-black"
          >
            {t("curator.navLabel")}
          </Link>
          <Link href="/privacy" className="hover:bg-accent hover:text-black">
            {t("nav.privacy")}
          </Link>
          <Link href="/terms" className="hover:bg-accent hover:text-black">
            {t("nav.terms")}
          </Link>
          {/* Feeds already existed as invisible <link rel="alternate"> head
              tags (app/[locale]/layout.tsx) and as visible links on /columns
              -- neither reaches a reader who isn't already on that one page.
              Site-wide, visible link to the main feed so every page has one.
              Per-column feeds stay discoverable via /columns. Operator,
              2026-09-10: "our pages should have visible rss feed links
              somewhere." */}
          <a
            href="/feed.xml"
            className="hover:bg-accent hover:text-black"
            title="RSS"
          >
            {t("nav.rss")}
          </a>
        </span>
      </div>
    </footer>
  );
}
