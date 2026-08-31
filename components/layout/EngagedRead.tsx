"use client";

import { useEffect } from "react";
import { nearTrack } from "@/lib/analytics";

/**
 * Fires `engaged_session` once when a reader has actually read something.
 *
 * A pageview counts arrivals, which for a guide is mostly a measure of
 * search luck. The number that matters is whether anyone stays — that's
 * what the placements are there to improve and what an advertiser would
 * eventually be buying.
 *
 * "Engaged" is defined deliberately conservatively: **30 seconds on the
 * page AND scrolled past a quarter of it.** Time alone counts an
 * abandoned tab; scroll alone counts a flick of the thumb. Requiring
 * both means a firing is a real read, and it's better for the number to
 * be honest and small than flattering and meaningless.
 *
 * Fires at most once per mount, and carries no identifiers.
 */
export default function EngagedRead({ slug }: { slug?: string }) {
  useEffect(() => {
    let scrolled = false;
    let dwelled = false;
    let done = false;

    function maybeFire() {
      if (done || !scrolled || !dwelled) return;
      done = true;
      nearTrack("engaged_session", slug ? { slug } : undefined);
      window.removeEventListener("scroll", onScroll);
    }

    function onScroll() {
      const reach = window.scrollY + window.innerHeight;
      if (reach >= document.documentElement.scrollHeight * 0.25) {
        scrolled = true;
        maybeFire();
      }
    }

    const timer = setTimeout(() => {
      dwelled = true;
      maybeFire();
    }, 30_000);

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // short pages can already satisfy the scroll half

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [slug]);

  return null;
}
