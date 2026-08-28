import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";
import ThemeToggle from "./ThemeToggle";
import NearMark from "./NearMark";
import type { NearStats } from "@/lib/content/loader";

export default function Header({ stats }: { stats: NearStats }) {
  const t = useTranslations();

  return (
    <header className="pb-4 border-b border-border">
      <div className="flex flex-wrap justify-between items-start gap-x-4 gap-y-3">
        <div className="max-w-2xl flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <Link href="/" className="inline-flex items-center gap-1.5">
            <NearMark className="w-3.5 h-3.5 text-accent flex-none" />
            <span className="font-serif italic font-semibold text-[1.05rem] text-ink tracking-tight leading-none whitespace-nowrap">
              {t("app.wordmark")}
            </span>
          </Link>
          <span className="text-muted text-[0.92rem]">
            — {t("app.tagline")}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-1.5 lg:gap-2 flex-none">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </div>

      <div className="mt-3 font-mono text-[0.78rem] text-muted flex flex-wrap gap-x-1.5 gap-y-1">
        <span className="whitespace-nowrap">
          <strong className="text-ink font-semibold">
            {stats.placesIndexed}
          </strong>{" "}
          {t("status.articlesIndexed")}
        </span>
        <span className="whitespace-nowrap">
          ·{" "}
          <Link href="/sources" className="hover:text-accent-ink underline decoration-muted/40 underline-offset-2">
            <strong className="text-ink font-semibold">
              {stats.sourcesWatched}
            </strong>{" "}
            {t("status.sourcesWatched")}
          </Link>
        </span>
        <span className="whitespace-nowrap">
          · {t("status.lastSync")}:{" "}
          {new Date(stats.lastSyncAt).toISOString().slice(0, 16).replace("T", " ")} UTC
        </span>
      </div>
    </header>
  );
}
