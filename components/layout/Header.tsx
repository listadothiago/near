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
        {/* Sits inline with the wordmark when it fits and wraps onto its
            own line when it doesn't — never truncated. */}
        <span className="text-muted text-[0.76rem] sm:text-[0.92rem]">
          {t("app.tagline")}
        </span>
      </div>
    </header>
  );
}
