"use client";

import { useTranslations } from "next-intl";

export default function SearchBox({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const t = useTranslations("board");

  return (
    <div className="mt-5 relative max-w-md">
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t("searchPlaceholder")}
        aria-label={t("searchPlaceholder")}
        className="w-full bg-surface border border-border rounded-full pl-4 pr-4 py-2 text-[0.9rem] placeholder:text-muted focus:outline-none focus:border-accent"
      />
    </div>
  );
}
