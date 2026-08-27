import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";
import ThemeToggle from "./ThemeToggle";
import type { NearStats } from "@/lib/content/loader";

export default function Header({ stats }: { stats: NearStats }) {
  const t = useTranslations();

  return (
    <header className="pb-4 border-b border-border">
      <div className="flex flex-wrap justify-between items-start gap-x-4 gap-y-3">
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

        <div className="flex items-center gap-2 flex-none">
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
