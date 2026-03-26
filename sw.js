const CACHE_NAME = 'marku-cache-v1';
const urlsToCache = [
  './index.html',
  './styles.css',
  './app.js',
  './skills-data.js',
  './logo.jpg',
  './manifest.json',
  './assets/icon.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
