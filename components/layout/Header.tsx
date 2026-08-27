import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";
import ThemeToggle from "./ThemeToggle";
import type { NearStats } from "@/lib/content/loader";

export default function Header({ stats }: { stats: NearStats }) {
  const t = useTranslations();

  return (
    <header className="flex flex-wrap justify-between items-end gap-4 pb-4 border-b border-border">
      <div className="max-w-xl">
        <Link href="/" className="block">
          <span className="font-serif italic font-medium text-[clamp(2.1rem,5vw,3rem)] tracking-tight leading-none">
            {t("app.wordmark")}
          </span>
        </Link>
        <p className="mt-1.5 text-muted text-[0.98rem] max-w-[46ch]">
          {t("app.tagline")}
        </p>
      </div>

      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center gap-3">
          <Link
            href="/sources"
            className="font-mono text-[0.78rem] text-muted hover:text-accent-ink"
          >
            {t("sources.title")}
          </Link>
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
        <div className="font-mono text-[0.78rem] text-muted flex gap-2 items-baseline flex-wrap justify-end">
          <span>
            <strong className="text-ink font-semibold">
              {stats.placesIndexed}
            </strong>{" "}
            {t("status.articlesIndexed")}
          </span>
          <span className="opacity-50">·</span>
          <span>
            <strong className="text-ink font-semibold">
              {stats.sourcesWatched}
            </strong>{" "}
            {t("status.sourcesWatched")}
          </span>
          <span className="opacity-50">·</span>
          <span>
            {t("status.lastSync")}:{" "}
            <span className="font-mono">
              {new Date(stats.lastSyncAt).toISOString().slice(0, 16).replace("T", " ")} UTC
            </span>
          </span>
        </div>
      </div>
    </header>
  );
}
