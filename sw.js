const CACHE_NAME = 'ms-fly-v2.2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
  // Nota: Le librerie PDF sono esterne (CDN). 
  // Per averle offline al 100% andrebbero scaricate localmente.
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});