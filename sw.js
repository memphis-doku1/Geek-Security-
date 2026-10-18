const CACHE_NAME = 'geek-security-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon88.png'
];

// Installation du Service Worker et mise en cache des fichiers
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache ouvert');
        return cache.addAll(urlsToCache);
      })
  );
});

// Écoute des requêtes et retour du cache si disponible
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retourne la version en cache si elle existe, sinon fait la requête réseau
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Nettoyage des anciens caches lors de la mise à jour du Service Worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
