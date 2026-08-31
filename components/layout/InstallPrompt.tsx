"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { nearTrack } from "@/lib/analytics";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISSED = "near-install-dismissed";
const INSTALLED = "near-installed";

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
  const [alreadyInstalled, setAlreadyInstalled] = useState(false);

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

    // Running inside the installed app — nothing to offer.
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as { standalone?: boolean }).standalone === true;
    if (standalone) {
      // Also record it: a visit from inside the app is proof of install,
      // which we can then honour later in a browser tab.
      localStorage.setItem(INSTALLED, "1");
      return;
    }

    // Installed, but opened in a browser tab instead. This is the case
    // that was broken: desktop Chrome still fires beforeinstallprompt
    // here, so the banner kept offering an install that had already
    // happened. Offer to open the app instead of installing it again.
    if (localStorage.getItem(INSTALLED)) {
      setAlreadyInstalled(true);
      return;
    }

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
    setAlreadyInstalled(false);
  }

  async function install() {
    if (!deferred) return;
    await deferred.prompt();
    const { outcome } = await deferred.userChoice;
    if (outcome === "accepted") localStorage.setItem(INSTALLED, "1");
    // Primary conversion goal — see lib/analytics.ts.
    nearTrack(outcome === "accepted" ? "install_accepted" : "install_dismissed");
    // Either way it shouldn't ask again — accepted means installed,
    // dismissed means they said no once already.
    dismiss();
  }

  if (!deferred && !iosHint && !alreadyInstalled) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t-[4px] border-ink bg-accent text-black">
      <div className="max-w-[1180px] mx-auto px-[22px] py-2.5 flex flex-wrap items-center gap-x-3 gap-y-2">
        <p className="font-mono text-[0.78rem] leading-snug flex-1 min-w-[16ch]">
          {alreadyInstalled
            ? t("installedBlurb")
            : iosHint
              ? t("iosHint")
              : t("blurb")}
        </p>
        {alreadyInstalled && (
          <button
            type="button"
            onClick={dismiss}
            className="border-[3px] border-ink bg-surface text-ink px-3 py-1 font-mono text-[0.75rem] uppercase tracking-wide hover:bg-black hover:text-accent transition-colors"
          >
            {t("gotIt")}
          </button>
        )}
        {deferred && !alreadyInstalled && (
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
