self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('v1').then(cache => {
        return cache.addAll([
          '/',
          '/index.php',
          '/css/style.css',
          '/js/script.js',
          '/manifest.json',
          '/assets/sounds/sound1.mp3',
          '/assets/sounds/sound2.mp3',
          // Füge alle anderen Töne und benötigte Dateien hinzu
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  });
  