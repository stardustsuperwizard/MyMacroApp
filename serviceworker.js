// https://medium.com/dev-channel/learn-how-to-build-a-pwa-in-under-5-minutes-c860ad406ed


let cacheName = 'hello-world-page';
let filesToCache = [
    '/',
    '/css/halfmoon-variables.min.css',
    '/favicon.ico',
    '/index.html',
    '/js/halfmoon.min.js',
    '/page2.html'
];


self.addEventListener('install', function(event) {
    console.log('[ServiceWorkder] Install');
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});


self.addEventListener('active', event => {
    event.waitUntil(self.clients.claim());
});


self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request, {ignoreSearch:true}).then(response => {
            return response || fetch(event.request);
        })
    );
});