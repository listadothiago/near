import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import NearMark from "./NearMark";

export default function Header() {
  const t = useTranslations();

  return (
    <header className="pb-3 border-b border-border">
      <div className="max-w-2xl flex flex-wrap items-baseline gap-x-2">
        <Link href="/" className="inline-flex items-center gap-1.5">
          <NearMark className="w-3.5 h-3.5 text-accent flex-none" />
          <span className="font-serif italic font-semibold text-[1.05rem] text-ink tracking-tight leading-none whitespace-nowrap">
            {t("app.wordmark")}
          </span>
        </Link>
        {/* Kept to a single line at every width — the dash prefix and the
            larger mobile size both pushed this onto a second row. */}
        <span className="min-w-0 truncate text-muted text-[0.76rem] sm:text-[0.92rem]">
          {t("app.tagline")}
        </span>
      </div>
    </header>
  );
}
