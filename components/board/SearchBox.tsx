"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

/** The long placeholder only fits from the `sm` breakpoint up. */
function useWidePlaceholder() {
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return wide;
}

export default function SearchBox({
  value,
  onChange,
  onSubmit,
}: {
  value: string;
  onChange: (value: string) => void;
  /** Only needed off the board: takes the reader to the results. */
  onSubmit?: () => void;
}) {
  const t = useTranslations("board");
  const placeholder = t(
    useWidePlaceholder() ? "searchPlaceholder" : "searchPlaceholderShort",
  );

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
      className="contents"
    >
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={t("searchPlaceholder")}
        className="flex-1 min-w-0 sm:flex-none sm:w-72 md:w-96 bg-surface border-[3px] border-ink px-2.5 py-1 font-mono text-[0.78rem] placeholder:text-muted focus:outline-none focus:bg-accent focus:text-black focus:placeholder:text-black/60"
      />
    </form>
  );
}
