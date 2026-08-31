"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISSED = "near-install-dismissed";

// Registers the service worker (which is what actually makes the app
// installable — the manifest alone isn't enough for Chrome) and offers a
// custom install banner via beforeinstallprompt.
//
// iOS gets a separate path: Safari never fires beforeinstallprompt, so
// the only route is Share -> Add to Home Screen, and the banner has to
// say so rather than showing a button that can't work.
export default function InstallPrompt() {
  const t = useTranslations("install");
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [iosHint, setIosHint] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      if (process.env.NODE_ENV === "production") {
        navigator.serviceWorker.register("/sw.js").catch(() => {
          // A failed registration costs offline support and the install
          // prompt, not the site. Nothing to do but carry on.
        });
      } else {
        // Never run the SW in development. Its /_next/static/ rule is
        // cache-first, which is right in production (those URLs are
        // content-hashed and immutable) and actively harmful in dev,
        // where chunk names are reused across rebuilds — it serves stale
        // JS and you end up debugging code you already fixed. Actively
        // unregister, since a worker installed by an earlier dev session
        // outlives the decision to stop registering one.
        navigator.serviceWorker
          .getRegistrations()
          .then((rs) => rs.forEach((r) => r.unregister()))
          .catch(() => {});
        caches?.keys().then((ks) => ks.forEach((k) => caches.delete(k))).catch(() => {});
      }
    }

    if (localStorage.getItem(DISMISSED)) return;

    // Already installed — standalone display mode, or iOS's own flag.
    const installed =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as { standalone?: boolean }).standalone === true;
    if (installed) return;

    const onPrompt = (e: Event) => {
      e.preventDefault(); // stop Chrome's own mini-infobar
      setDeferred(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);

    const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isSafari = /safari/i.test(navigator.userAgent) && !/crios|fxios/i.test(navigator.userAgent);
    if (isIos && isSafari) setIosHint(true);

    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  function dismiss() {
    localStorage.setItem(DISMISSED, "1");
    setDeferred(null);
    setIosHint(false);
  }

  async function install() {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    // Either way it shouldn't ask again — accepted means installed,
    // dismissed means they said no once already.
    dismiss();
  }

  if (!deferred && !iosHint) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t-[4px] border-ink bg-accent text-black">
      <div className="max-w-[1180px] mx-auto px-[22px] py-2.5 flex flex-wrap items-center gap-x-3 gap-y-2">
        <p className="font-mono text-[0.78rem] leading-snug flex-1 min-w-[16ch]">
          {iosHint ? t("iosHint") : t("blurb")}
        </p>
        {deferred && (
          <button
            type="button"
            onClick={install}
            className="border-[3px] border-ink bg-surface text-ink px-3 py-1 font-mono text-[0.75rem] uppercase tracking-wide hover:bg-black hover:text-accent transition-colors"
          >
            {t("action")}
          </button>
        )}
        <button
          type="button"
          onClick={dismiss}
          aria-label={t("dismiss")}
          className="border-[3px] border-ink px-2 py-1 font-mono text-[0.75rem] hover:bg-black hover:text-accent transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
