/* global self, caches */
// The earlier linkist.ai app registered a service worker at this address. This one retires it for
// returning visitors: it clears the old caches and unregisters itself, and never handles requests (D72).
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();
    })(),
  );
});
