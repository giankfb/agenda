const CACHE_NAME = 'agenda-v1';

const urlsToCache = [

  './',

  './index.html',

  './manifest.json',

  './css/style.css',

  './js/api/api.js',

  './js/components/modal.js',

  './js/components/cards.js',

  './js/components/calendar.js',

  './js/modules/eventos.js',

  './js/modules/dashboard.js',

  './icons/icon-192.png',

  './icons/icon-512.png'

];

self.addEventListener('install', event => {

  event.waitUntil(

    caches.open(CACHE_NAME)

      .then(cache => {

        return Promise.all(

          urlsToCache.map(url => {

            return cache.add(url)

              .catch(err => {

                console.error(
                  'Erro cache:',
                  url,
                  err
                );

              });

          })

        );

      })

  );

});

self.addEventListener('fetch', event => {

  event.respondWith(

    caches.match(event.request)

      .then(response => {

        return response ||
          fetch(event.request);

      })

  );

});