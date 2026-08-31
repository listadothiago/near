"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

// Installing the PWA hides the URL bar, which quietly removes the main
// way anyone shared a page. Near's URLs are readable and SEO-shaped, so
// losing access to them is a real cost — this puts them back.
//
// navigator.share where it exists (mobile, installed PWA) gets the OS
// sheet with WhatsApp/Signal/etc. Everywhere else falls back to copying.
export default function ShareButton({
  title,
  dek,
}: {
  title: string;
  dek?: string;
}) {
  const t = useTranslations("share");
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function onShare() {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, text: dek, url });
        return;
      } catch {
        // AbortError just means they closed the sheet — fall through to
        // copy rather than treating a cancel as a failure.
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setState("copied");
      setTimeout(() => setState("idle"), 2000);
    } catch {
      setState("failed");
      setTimeout(() => setState("idle"), 3000);
    }
  }

  return (
    <button
      type="button"
      onClick={onShare}
      className="inline-flex items-center gap-1.5 border-[3px] border-ink bg-surface px-2 py-1 font-mono text-[0.72rem] uppercase tracking-wide hover:bg-accent hover:text-black transition-colors"
    >
      <span aria-hidden="true">↗</span>
      {state === "copied" ? t("copied") : state === "failed" ? t("failed") : t("action")}
    </button>
  );
}
