#!/usr/bin/env node
/**
 * IndexNow — pings Bing/Yandex (and any other IndexNow-participating
 * engine) with the site's current URL list on every production deploy.
 *
 * Near publishes by git push, not a CMS action, so there's no single
 * "this page changed" event to hook into cleanly. Submitting the full
 * URL list each production build is the simple, honest alternative:
 * IndexNow's own docs say re-submitting unchanged URLs is harmless
 * (engines de-dupe), and the site is small enough (~50 places, a
 * handful of collections, six locales) that this stays a cheap request
 * rather than something that needs per-page diffing.
 *
 * Runs only when VERCEL_ENV === "production" (set as postbuild) so
 * preview deploys and local builds never submit real URLs. Fails soft
 * — a network hiccup here should never fail the actual site build.
 *
 * Note: this runs as part of the build that's about to become the new
 * deployment, so fetching /sitemap.xml here still hits the *previous*
 * live deployment, not the one currently building — a brand-new page
 * added in this exact push won't be in the list it submits. It'll be
 * caught by the next production build's submission instead. Given how
 * often this repo pushes in small batches, that's at most a short lag,
 * not a real gap — not worth the complexity of generating the URL list
 * from source content in a plain Node script instead.
 */

const KEY = "d4d4090b7ec2515cf8af4c7776d486ce";

async function main() {
  if (process.env.VERCEL_ENV !== "production") {
    console.log("[indexnow] skipping — not a production build");
    return;
  }

  const host = "near.tips";
  const keyLocation = `https://${host}/${KEY}.txt`;

  let urls;
  try {
    const res = await fetch(`https://${host}/sitemap.xml`);
    const xml = await res.text();
    urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  } catch (err) {
    console.warn("[indexnow] couldn't fetch sitemap, skipping:", err.message);
    return;
  }

  if (urls.length === 0) {
    console.warn("[indexnow] sitemap returned no URLs, skipping");
    return;
  }

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host, key: KEY, keyLocation, urlList: urls }),
    });
    console.log(
      `[indexnow] submitted ${urls.length} URLs — status ${res.status}`,
    );
  } catch (err) {
    console.warn("[indexnow] submission failed, not fatal:", err.message);
  }
}

main();
