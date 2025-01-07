const CACHE_NAME = "task-manager-cache-v1";
const ASSETS = [
    "./index.html",
    "./styles.css",
    "./app.js",
    "./manifest.json",
    "./icon-192x192.png",
    "./icon-512x512.png"
];

// インストールイベント
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

// フェッチイベント
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// アクティベートイベント
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
