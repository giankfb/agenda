const CACHE_NAME = 'agenda-fotografia-v1';

const urlsToCache = [

  '/',

  '/index.html',

  '/css/style.css',

  '/js/api/api.js',

  '/js/components/modal.js',

  '/js/components/cards.js',

  '/js/components/calendar.js',

  '/js/modules/eventos.js',

  '/js/modules/dashboard.js'

];

self.addEventListener('install', event => {

  event.waitUntil(

    caches.open(CACHE_NAME)
      .then(cache => {

        return cache.addAll(urlsToCache);

      })

  );

});

self.addEventListener('fetch', event => {

  event.respondWith(

    caches.match(event.request)
      .then(response => {

        return response || fetch(event.request);

      })

  );

});