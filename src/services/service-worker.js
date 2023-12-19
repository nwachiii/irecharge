import {precacheAndRoute} from 'workbox-precaching';
import {registerRoute, setDefaultHandler} from 'workbox-routing';
import {StaleWhileRevalidate} from 'workbox-strategies';

// Precache essential assets
precacheAndRoute(self.__WB_MANIFEST);

// Cache API responses
registerRoute(
	({request}) => request.url.startsWith('https://api.weatherstack.com/'),
	new StaleWhileRevalidate({
		cacheName: 'api-cache',
	})
);

// Default handler for offline support
setDefaultHandler(new StaleWhileRevalidate());
