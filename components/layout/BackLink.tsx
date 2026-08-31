"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/lib/i18n/navigation";

// Place/collection pages can be a session's first screen (opened from a
// share link, search result, or the installed PWA icon) with no history to
// pop — history.length is 1 in that case. router.back() would then hand
// the browser/PWA chrome nothing to do, which on Android reads as the
// whole app closing. Falling back to home keeps this control always live.
export default function BackLink() {
  const t = useTranslations("place");
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined" && window.history.length > 1) {
          router.back();
        } else {
          router.push("/");
        }
      }}
      className="mb-3 inline-flex items-center gap-1 text-[0.82rem] font-mono text-muted hover:text-accent-ink transition-colors"
    >
      <span aria-hidden="true">←</span>
      {t("back")}
    </button>
  );
}
