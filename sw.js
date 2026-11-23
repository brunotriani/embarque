// Guarda o app para funcionar offline. Troque a versão ao publicar mudanças.
const CACHE = "embarque-v4";
const FILES = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET") return;
  // Firebase e Google sempre pela rede
  if (/googleapis|gstatic|firebase/.test(url.host) && !/fonts/.test(url.host)) return;
  e.respondWith(
    fetch(e.request).then(r => {
      const copy = r.clone();
      if (r.ok && (url.origin === location.origin || /fonts/.test(url.host))) caches.open(CACHE).then(c => c.put(e.request, copy));
      return r;
    }).catch(() => caches.match(e.request).then(m => m || caches.match("./index.html")))
  );
});
