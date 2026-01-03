const CACHE_NAME = 'ms-fly-v3.1'; // Ho alzato la versione per forzare l'update
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// INSTALLAZIONE: Scarica i file e forza l'attesa a zero
self.addEventListener('install', (e) => {
  self.skipWaiting(); // <--- QUESTO COMANDO OBBLIGA L'AGGIORNAMENTO
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

// ATTIVAZIONE: Prendi il controllo subito e pulisci il vecchio
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim(); // <--- PRENDE IL CONTROLLO IMMEDIATO
});

// GESTIONE RICHIESTE: Usa la cache, se c'è
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});