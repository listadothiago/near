import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";

export default function Footer() {
  const t = useTranslations();
  return (
    <footer className="mt-10 pt-4 border-t border-border font-mono text-[0.76rem] text-muted flex justify-between flex-wrap gap-2">
      <span>{t("app.wordmark")}</span>
      <span className="flex gap-3">
        <Link href="/guides" className="hover:text-accent-ink">
          {t("collection.navLabel")}
        </Link>
        <Link href="/sources" className="hover:text-accent-ink">
          {t("sources.navLabel")}
        </Link>
      </span>
    </footer>
  );
}
