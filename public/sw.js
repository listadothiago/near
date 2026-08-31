/*
 * Near's service worker. Exists for two reasons: Chrome won't offer an
 * install prompt without one that has a fetch handler, and a guide you
 * opened on wifi should still be readable when you're standing outside
 * the place with no signal.
 *
 * Deliberately network-first for pages. A cache-first content site
 * serves stale articles to returning readers, which for a guide that
 * corrects itself when places close is the wrong failure mode — see
 * near-caretaker. The cache is a fallback, not a source of truth.
 */
const VERSION = "near-v1";
const PAGES = `${VERSION}-pages`;
const ASSETS = `${VERSION}-assets`;

self.addEventListener("install", (event) => {
  // Take over promptly; there's no long-lived client state to protect.
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Drop caches from previous versions so a deploy can't strand
      // anyone on old content indefinitely.
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // leave tiles/images alone

  // Next's build output is content-hashed and immutable — cache-first is
  // safe here and is what makes a repeat visit feel instant.
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(
      caches.open(ASSETS).then(async (cache) => {
        const hit = await cache.match(request);
        if (hit) return hit;
        const res = await fetch(request);
        if (res.ok) cache.put(request, res.clone());
        return res;
      }),
    );
    return;
  }

  // Pages: network first, cache as a fallback for offline.
  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const res = await fetch(request);
          if (res.ok) {
            const cache = await caches.open(PAGES);
            cache.put(request, res.clone());
          }
          return res;
        } catch {
          const cached = await caches.match(request);
          if (cached) return cached;
          return new Response(
            "<!doctype html><meta charset=utf-8><title>Offline</title>" +
              "<body style=\"font-family:monospace;padding:2rem\">" +
              "<h1>Offline</h1><p>This page hasn't been opened on this device yet, " +
              "so there's nothing cached to show. Reconnect and try again.</p>",
            { headers: { "Content-Type": "text/html; charset=utf-8" }, status: 503 },
          );
        }
      })(),
    );
  }
});
