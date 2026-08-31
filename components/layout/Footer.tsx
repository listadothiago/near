import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";
import ThemeToggle from "./ThemeToggle";
import type { NearStats } from "@/lib/content/loader";

// Language, theme, and the index/sync counters all live down here rather
// than in the header, so the top of the page is just the wordmark, the
// search field, and the content itself.
export default function Footer({ stats }: { stats: NearStats }) {
  const t = useTranslations();

  return (
    <footer className="mt-12 pt-4 border-t-[4px] border-ink font-mono text-[0.72rem] text-muted flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <LocaleSwitcher dropUp />
        <ThemeToggle />
      </div>

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
        </span>
      </div>
    </footer>
  );
}
