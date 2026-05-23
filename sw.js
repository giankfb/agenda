const CACHE_NAME =
  `agenda-${APP_VERSION}`;

const urlsToCache = [

  './',
  './index.html',

  './manifest.json',

  './css/style.css',

  './js/api/api.js',

  './js/components/modal.js',
  './js/components/cards.js',
  './js/components/calendar.js',
  './js/components/toast.js',

  './js/modules/clientes.js',
  './js/modules/eventos.js',
  './js/modules/dashboard.js',

  './js/utils/helpers.js',
  './js/utils/format.js',
  './js/utils/validators.js',
  './js/utils/masks.js',
  './js/utils/config.js',

  './icons/icon-192.png',
  './icons/icon-512.png'  

];



/* =========================================
    INSTALL
========================================= */
self.addEventListener('install', event => {

  self.skipWaiting();

  event.waitUntil(

    caches.open(CACHE_NAME)
      .then(cache => {

        return cache.addAll(urlsToCache);

      })

  );

});


/* =========================================
    ACTIVATE
========================================= */
self.addEventListener('activate', event => {

  event.waitUntil(

    caches.keys().then(keys => {

      return Promise.all(

        keys.map(key => {

          if(key !== CACHE_NAME){

            return caches.delete(key);

          }

        })

      );

    })

  );

  self.clients.claim();

});


/* =========================================
    FETCH
========================================= */
self.addEventListener('fetch', event => {

  if(
    event.request.method !== 'GET'
  ){
    return;
  }

  event.respondWith(

    fetch(event.request)

      .then(response => {

        const responseClone =
          response.clone();

        caches.open(CACHE_NAME)
          .then(cache => {

            if(
              event.request.url.startsWith(
                self.location.origin
              )
            ){
              cache.put(
                event.request,
                responseClone
              );
            }

          });

        return response;

      })

      .catch(() => {

        return caches.match(
          event.request
        );

      })

  );

});