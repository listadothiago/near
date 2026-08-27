import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations();
  return (
    <footer className="mt-10 pt-4 border-t border-border font-mono text-[0.76rem] text-muted flex justify-between flex-wrap gap-2">
      <span>{t("footer.tagline")}</span>
    </footer>
  );
}
