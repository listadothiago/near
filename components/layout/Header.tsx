import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import NearMark from "./NearMark";

export default function Header() {
  const t = useTranslations();

  return (
    <header className="border-b-[4px] border-ink pb-2 mb-1">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <Link href="/" className="inline-flex items-center gap-1.5 group">
          <NearMark className="w-4 h-4 text-ink flex-none" />
          <span className="font-display font-bold uppercase tracking-[-1px] text-[1.25rem] leading-none whitespace-nowrap group-hover:bg-accent transition-colors">
            NEAR.TIPS
          </span>
        </Link>

        <nav className="flex items-center gap-0 font-mono text-[0.72rem] uppercase tracking-wide">
          <Link
            href="/"
            className="border-[2px] border-ink px-2 py-1 hover:bg-accent hover:text-black transition-colors"
          >
            {t("nav.tips")}
          </Link>
          <Link
            href="/guides"
            className="border-[2px] border-l-0 border-ink px-2 py-1 hover:bg-accent hover:text-black transition-colors"
          >
            {t("collection.navLabel")}
          </Link>
          <Link
            href="/sources"
            className="border-[2px] border-l-0 border-ink px-2 py-1 hover:bg-accent hover:text-black transition-colors"
          >
            {t("sources.navLabel")}
          </Link>
          <Link
            href="/about"
            className="border-[2px] border-l-0 border-ink px-2 py-1 hover:bg-accent hover:text-black transition-colors"
          >
            {t("nav.about")}
          </Link>
        </nav>
      </div>

      <p className="mt-1.5 font-mono text-[0.74rem] text-muted">
        {t("app.tagline")}
      </p>
    </header>
  );
}
