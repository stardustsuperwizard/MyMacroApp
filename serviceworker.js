// https://medium.com/dev-channel/learn-how-to-build-a-pwa-in-under-5-minutes-c860ad406ed


// prod key: c8ef5177-993c-401f-bab6-8733afedf104

let cacheName = 'mymacroapp';
let filesToCache = [
    '/',
    '/css/halfmoon-variables.min.css',
    '/favicon.ico',
    '/index.html',
    '/js/halfmoon.min.js'
];
let cacheIDs = [ cacheName ];

self.addEventListener('install', function(event) {
    console.log('[ServiceWorker] Install');
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});


// https://gomakethings.com/how-to-update-a-service-worker/
self.addEventListener('activate', function(event) {
    event.waitUntil(caches.keys().then(function (keys) {
        return Promise.all(keys.filter(function(key) {
            return !cacheIDs.includes(key);
        }).map(function(key) {
            return caches.delete(key);
        }));
    }).then(function () {
        return self.clients.claim();
    }));
});


self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request, {ignoreSearch:true}).then(response => {
            return response || fetch(event.request);
        })
    );
});