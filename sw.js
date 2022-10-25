// 'use strict';

// importScripts('sw-toolbox.js');

// toolbox.precache(["index.html","style/style.css"]);

// toolbox.router.get('/images/*', toolbox.cacheFirst);

// toolbox.router.get('/*', toolbox.networkFirst, {
//   networkTimeoutSeconds: 5
// });


// WORKING 
'use strict';

function hndlEventFetch(e) { }

self.addEventListener('fetch', hndlEventFetch);

//END

self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
});

const cacheName = 'FilmsOnline'
const appShellFiles = [
  '/',
  '/index.html',
  '/app.js',
  'js/script.js',
  '/css/style.css',
  '/img/favicon.ico',
  '/img/wcls-logo-512.png',
  '/img/android-icon-36x36.png',
  '/img/android-icon-48x48.png',
  '/img/android-icon-72x72.png',
  '/img/android-icon-96x96.png',
  '/img/android-icon-144x144.png',
  '/img/android-icon-192x192.png'
]

const contentToCache = appShellFiles

self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    console.log('[Service Worker] Caching all: app shell and content');
    await cache.addAll(contentToCache);
  })());
});

