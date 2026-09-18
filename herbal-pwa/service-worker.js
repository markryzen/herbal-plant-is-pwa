const CACHE_NAME = "herbal-is-cache-v2"; // bumped so the new strategy takes over cleanly
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-192.png",
  "./icons/icon-maskable-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Large data files (the bundled ~13MB training-data.json) get their own
// stale-while-revalidate handling: serve the cached copy instantly if we
// have one (so repeat visits never pay the 13MB download again), while
// quietly re-fetching in the background to keep the cache fresh for next
// time. Only the very first-ever load has to wait on the network.
function isLargeDataFile(url) {
  return /training-data\.json$/.test(url.pathname);
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  // Only handle GET requests for our own app files — let everything else
  // (Firestore/Firebase API calls, POST requests, etc.) go straight to the network.
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  if (isLargeDataFile(url)) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(req);
        const networkFetch = fetch(req)
          .then((res) => {
            if (res && res.ok) cache.put(req, res.clone());
            return res;
          })
          .catch(() => null);
        // Serve cached immediately if present; otherwise wait for network
        // (first load only).
        return cached || (await networkFetch) || new Response(null, { status: 504 });
      })
    );
    return;
  }

  // Network-first for navigation requests, cache-first for static assets
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).catch(() => caches.match("./index.html"))
    );
    return;
  }
  event.respondWith(
    caches.match(req).then((cached) => {
      return (
        cached ||
        fetch(req).then((res) => {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          return res;
        }).catch(() => cached)
      );
    })
  );
});
