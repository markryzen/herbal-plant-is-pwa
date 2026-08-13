const CACHE_NAME = "herbal-is-cache-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-192.png",
  "./icons/icon-maskable-512.png"
];

// Bundled AI training sample photos — precached on install so the "auto-train"
// step (see index.html) works fully offline on the very first run too.
const TRAINING_SAMPLE_ASSETS = [
  "./training-samples/1-lagundi/1.jpg",
  "./training-samples/1-lagundi/2.jpg",
  "./training-samples/1-lagundi/3.jpg",
  "./training-samples/1-lagundi/4.jpg",
  "./training-samples/1-lagundi/5.jpg",
  "./training-samples/2-sambong/1.jpg",
  "./training-samples/2-sambong/2.jpg",
  "./training-samples/2-sambong/3.jpg",
  "./training-samples/2-sambong/4.jpg",
  "./training-samples/2-sambong/5.jpg",
  "./training-samples/3-ampalaya/1.jpg",
  "./training-samples/3-ampalaya/2.jpg",
  "./training-samples/3-ampalaya/3.jpg",
  "./training-samples/3-ampalaya/4.jpg",
  "./training-samples/3-ampalaya/5.jpg",
  "./training-samples/4-bayabas/1.jpg",
  "./training-samples/4-bayabas/2.jpg",
  "./training-samples/4-bayabas/3.jpg",
  "./training-samples/4-bayabas/4.jpg",
  "./training-samples/4-bayabas/5.jpg",
  "./training-samples/5-akapulko/1.jpg",
  "./training-samples/5-akapulko/2.jpg",
  "./training-samples/5-akapulko/3.jpg",
  "./training-samples/5-akapulko/4.jpg",
  "./training-samples/5-akapulko/5.jpg",
  "./training-samples/6-bawang/1.jpg",
  "./training-samples/6-bawang/2.jpg",
  "./training-samples/6-bawang/3.jpg",
  "./training-samples/6-bawang/4.jpg",
  "./training-samples/6-bawang/5.jpg",
  "./training-samples/7-niyog-niyogan/1.jpg",
  "./training-samples/7-niyog-niyogan/2.jpg",
  "./training-samples/7-niyog-niyogan/3.jpg",
  "./training-samples/7-niyog-niyogan/4.jpg",
  "./training-samples/7-niyog-niyogan/5.jpg",
  "./training-samples/8-tsaang-gubat/1.jpg",
  "./training-samples/8-tsaang-gubat/2.jpg",
  "./training-samples/8-tsaang-gubat/3.jpg",
  "./training-samples/8-tsaang-gubat/4.jpg",
  "./training-samples/8-tsaang-gubat/5.jpg",
  "./training-samples/9-ulasimang-bato/1.jpg",
  "./training-samples/9-ulasimang-bato/2.jpg",
  "./training-samples/9-ulasimang-bato/3.jpg",
  "./training-samples/9-ulasimang-bato/4.jpg",
  "./training-samples/9-ulasimang-bato/5.jpg",
  "./training-samples/10-yerba-buena/1.jpg",
  "./training-samples/10-yerba-buena/2.jpg",
  "./training-samples/10-yerba-buena/3.jpg",
  "./training-samples/10-yerba-buena/4.jpg",
  "./training-samples/10-yerba-buena/5.jpg",
  "./training-samples/11-malunggay/1.jpg",
  "./training-samples/11-malunggay/2.jpg",
  "./training-samples/11-malunggay/3.jpg",
  "./training-samples/11-malunggay/4.jpg",
  "./training-samples/11-malunggay/5.jpg",
  "./training-samples/12-luya/1.jpg",
  "./training-samples/12-luya/2.jpg",
  "./training-samples/12-luya/3.jpg",
  "./training-samples/12-luya/4.jpg",
  "./training-samples/12-luya/5.jpg",
  "./training-samples/13-banaba/1.jpg",
  "./training-samples/13-banaba/2.jpg",
  "./training-samples/13-banaba/3.jpg",
  "./training-samples/13-banaba/4.jpg",
  "./training-samples/13-banaba/5.jpg",
  "./training-samples/14-oregano/1.jpg",
  "./training-samples/14-oregano/2.jpg",
  "./training-samples/14-oregano/3.jpg",
  "./training-samples/14-oregano/4.jpg",
  "./training-samples/14-oregano/5.jpg",
  "./training-samples/15-sabila/1.jpg",
  "./training-samples/15-sabila/2.jpg",
  "./training-samples/15-sabila/3.jpg",
  "./training-samples/15-sabila/4.jpg",
  "./training-samples/15-sabila/5.jpg",
  "./training-samples/16-mayana/1.jpg",
  "./training-samples/16-mayana/2.jpg",
  "./training-samples/16-mayana/3.jpg",
  "./training-samples/16-mayana/4.jpg",
  "./training-samples/16-mayana/5.jpg",
  "./training-samples/17-damong-maria/1.jpg",
  "./training-samples/17-damong-maria/2.jpg",
  "./training-samples/17-damong-maria/3.jpg",
  "./training-samples/17-damong-maria/4.jpg",
  "./training-samples/17-damong-maria/5.jpg",
  "./training-samples/18-makabuhay/1.jpg",
  "./training-samples/18-makabuhay/2.jpg",
  "./training-samples/18-makabuhay/3.jpg",
  "./training-samples/18-makabuhay/4.jpg",
  "./training-samples/18-makabuhay/5.jpg",
  "./training-samples/19-pandan/1.jpg",
  "./training-samples/19-pandan/2.jpg",
  "./training-samples/19-pandan/3.jpg",
  "./training-samples/19-pandan/4.jpg",
  "./training-samples/19-pandan/5.jpg",
  "./training-samples/20-gumamela/1.jpg",
  "./training-samples/20-gumamela/2.jpg",
  "./training-samples/20-gumamela/3.jpg",
  "./training-samples/20-gumamela/4.jpg",
  "./training-samples/20-gumamela/5.jpg",
  "./training-samples/21-papaya/1.jpg",
  "./training-samples/21-papaya/2.jpg",
  "./training-samples/21-papaya/3.jpg",
  "./training-samples/21-papaya/4.jpg",
  "./training-samples/21-papaya/5.jpg",
  "./training-samples/22-guyabano/1.jpg",
  "./training-samples/22-guyabano/2.jpg",
  "./training-samples/22-guyabano/3.jpg",
  "./training-samples/22-guyabano/4.jpg",
  "./training-samples/22-guyabano/5.jpg",
  "./training-samples/23-avocado/1.jpg",
  "./training-samples/23-avocado/2.jpg",
  "./training-samples/23-avocado/3.jpg",
  "./training-samples/23-avocado/4.jpg",
  "./training-samples/23-avocado/5.jpg",
  "./training-samples/24-kalamansi/1.jpg",
  "./training-samples/24-kalamansi/2.jpg",
  "./training-samples/24-kalamansi/3.jpg",
  "./training-samples/24-kalamansi/4.jpg",
  "./training-samples/24-kalamansi/5.jpg",
  "./training-samples/25-ikmo/1.jpg",
  "./training-samples/25-ikmo/2.jpg",
  "./training-samples/25-ikmo/3.jpg",
  "./training-samples/25-ikmo/4.jpg",
  "./training-samples/25-ikmo/5.jpg",
  "./training-samples/26-kamias/1.jpg",
  "./training-samples/26-kamias/2.jpg",
  "./training-samples/26-kamias/3.jpg",
  "./training-samples/26-kamias/4.jpg",
  "./training-samples/26-kamias/5.jpg",
  "./training-samples/27-balanoy/1.jpg",
  "./training-samples/27-balanoy/2.jpg",
  "./training-samples/27-balanoy/3.jpg",
  "./training-samples/27-balanoy/4.jpg",
  "./training-samples/27-balanoy/5.jpg",
  "./training-samples/28-kataka-taka/1.jpg",
  "./training-samples/28-kataka-taka/2.jpg",
  "./training-samples/28-kataka-taka/3.jpg",
  "./training-samples/28-kataka-taka/4.jpg",
  "./training-samples/28-kataka-taka/5.jpg",
  "./training-samples/29-kamote-tops/1.jpg",
  "./training-samples/29-kamote-tops/2.jpg",
  "./training-samples/29-kamote-tops/3.jpg",
  "./training-samples/29-kamote-tops/4.jpg",
  "./training-samples/29-kamote-tops/5.jpg",
  "./training-samples/30-sibuyas/1.jpg",
  "./training-samples/30-sibuyas/2.jpg",
  "./training-samples/30-sibuyas/3.jpg",
  "./training-samples/30-sibuyas/4.jpg",
  "./training-samples/30-sibuyas/5.jpg",
  "./training-samples/31-alagaw/1.jpg",
  "./training-samples/31-alagaw/2.jpg",
  "./training-samples/31-alagaw/3.jpg",
  "./training-samples/31-alagaw/4.jpg",
  "./training-samples/31-alagaw/5.jpg",
  "./training-samples/32-bignay/1.jpg",
  "./training-samples/32-bignay/2.jpg",
  "./training-samples/32-bignay/3.jpg",
  "./training-samples/32-bignay/4.jpg",
  "./training-samples/32-bignay/5.jpg",
  "./training-samples/33-duhat/1.jpg",
  "./training-samples/33-duhat/2.jpg",
  "./training-samples/33-duhat/3.jpg",
  "./training-samples/33-duhat/4.jpg",
  "./training-samples/33-duhat/5.jpg",
  "./training-samples/34-wansoy/1.jpg",
  "./training-samples/34-wansoy/2.jpg",
  "./training-samples/34-wansoy/3.jpg",
  "./training-samples/34-wansoy/4.jpg",
  "./training-samples/34-wansoy/5.jpg",
  "./training-samples/35-sampalok/1.jpg",
  "./training-samples/35-sampalok/2.jpg",
  "./training-samples/35-sampalok/3.jpg",
  "./training-samples/35-sampalok/4.jpg",
  "./training-samples/35-sampalok/5.jpg",
  "./training-samples/36-saluyot/1.jpg",
  "./training-samples/36-saluyot/2.jpg",
  "./training-samples/36-saluyot/3.jpg",
  "./training-samples/36-saluyot/4.jpg",
  "./training-samples/36-saluyot/5.jpg",
  "./training-samples/37-alugbati/1.jpg",
  "./training-samples/37-alugbati/2.jpg",
  "./training-samples/37-alugbati/3.jpg",
  "./training-samples/37-alugbati/4.jpg",
  "./training-samples/37-alugbati/5.jpg",
  "./training-samples/38-kamantigi/1.jpg",
  "./training-samples/38-kamantigi/2.jpg",
  "./training-samples/38-kamantigi/3.jpg",
  "./training-samples/38-kamantigi/4.jpg",
  "./training-samples/38-kamantigi/5.jpg",
  "./training-samples/39-rosal/1.jpg",
  "./training-samples/39-rosal/2.jpg",
  "./training-samples/39-rosal/3.jpg",
  "./training-samples/39-rosal/4.jpg",
  "./training-samples/39-rosal/5.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await cache.addAll(ASSETS);
      // Cache training sample photos too, but don't fail install if some are
      // missing/slow — the fetch handler below will cache them on-demand anyway.
      try{ await cache.addAll(TRAINING_SAMPLE_ASSETS); }
      catch(e){ console.warn("Some training samples failed to precache:", e); }
    })
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

self.addEventListener("fetch", (event) => {
  const req = event.request;
  // Only handle GET requests for our own app files — let everything else
  // (Firestore/Firebase API calls, POST requests, etc.) go straight to the network.
  if (req.method !== "GET") return;

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
