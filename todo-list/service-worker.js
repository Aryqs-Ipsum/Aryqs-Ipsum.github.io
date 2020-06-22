self.addEventListener('fetch', function(event) {

    // CODELAB: Add list of files to cache here.
    const CACHE_NAME = 'todo_cache'
    const FILES_TO_CACHE = [
        '/index.html',
        '/app/main.js',
        '/app/main.css',
        '/app/alpine.js'
    ];

    // CODELAB: Precache static resources here.
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[ServiceWorker] Pre-caching offline page');
            return cache.addAll(FILES_TO_CACHE);
        })
    );

    // CODELAB: Remove previous cached data from disk.
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);  
                }
            }));
        })
    );

    // CODELAB: Add fetch event handler here.
    event.respondWith(
        fetch(event.request)
            .catch(() => {
            return caches.open(CACHE_NAME)
                .then((cache) => {
                    return cache.match(event.request);
                });
            })
    );
});