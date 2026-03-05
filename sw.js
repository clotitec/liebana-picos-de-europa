/* ============================================================
   SW.JS — Service Worker
   Liebana Picos de Europa - Offline support
   ============================================================ */

const CACHE_NAME = 'liebana-v1';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/app.js',
    '/data.js',
    '/pois.js',
    '/services.js',
    '/weather.js',
    '/styles.css',
    '/manifest.json'
];

// Install: cache static assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(STATIC_ASSETS))
            .then(() => self.skipWaiting())
    );
});

// Activate: clean old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

// Fetch: network-first for APIs, cache-first for static
self.addEventListener('fetch', event => {
    const url = event.request.url;

    // Network-first for APIs
    if (url.includes('api.open-meteo.com') ||
        url.includes('overpass-api.de') ||
        url.includes('nominatim.openstreetmap.org')) {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                    return response;
                })
                .catch(() => caches.match(event.request))
        );
        return;
    }

    // Cache-first for map tiles
    if (url.includes('basemaps.cartocdn.com') ||
        url.includes('arcgisonline.com') ||
        url.includes('elevation-tiles-prod')) {
        event.respondWith(
            caches.match(event.request).then(cached => {
                if (cached) return cached;
                return fetch(event.request).then(response => {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                    return response;
                });
            })
        );
        return;
    }

    // Cache-first for static assets
    event.respondWith(
        caches.match(event.request).then(cached => cached || fetch(event.request))
    );
});
