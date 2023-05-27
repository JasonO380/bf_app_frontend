self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("my-cache").then((cache) => {
            return cache.addAll([
                "/",
                "/index.html",
                // include other files you want cached
            ]);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
