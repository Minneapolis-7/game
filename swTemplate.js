import { setCacheNameDetails, skipWaiting, clientsClaim } from 'workbox-core';
import { registerRoute, setCatchHandler } from 'workbox-routing';
import { precacheAndRoute, getCacheKeyForURL } from 'workbox-precaching';
import { NetworkOnly } from 'workbox-strategies';

setCacheNameDetails({ prefix: 'game' });
skipWaiting();
clientsClaim();
// eslint-disable-next-line no-restricted-globals, no-undef
precacheAndRoute(self.__WB_MANIFEST);
registerRoute(({ event }) => event.request.destination === 'document', new NetworkOnly());
setCatchHandler(({ event }) => {
  if (event.request.destination === 'document') {
    // eslint-disable-next-line no-undef
    return caches.match(getCacheKeyForURL('/offline.html'));
  }

  // eslint-disable-next-line no-undef
  return Response.error();
});
