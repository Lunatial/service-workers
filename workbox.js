importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

const cacheAssets = [
    '/',
    '/css/style.css',
    '/js/main.js',

];

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);

    workbox.routing.registerRoute(
        new RegExp('.*\.js'),
        workbox.strategies.staleWhileRevalidate({
            // Use a custom cache name
            cacheName: 'js-cache',
        })
    );

    workbox.routing.registerRoute(
        // Cache css & fonts files
        /.*\.(otf|css|ttf)/,
        // Use cache but update in the background ASAP
        workbox.strategies.staleWhileRevalidate({
            // Use a custom cache name
            cacheName: 'fonts-css-cache',
        })
    );

    workbox.routing.registerRoute(
        // Cache image files
        /.*\.(png|jpg|jpeg|svg|gif)/,
        // Use the cache if it's available
        workbox.strategies.staleWhileRevalidate({
            // Use a custom cache name
            cacheName: 'image-cache',
        })
    );

    workbox.precaching.precache(cacheAssets);


// Add Precache Route
    workbox.precaching.addRoute();

} else {
    console.log(`Boo! Workbox didn't load 😬`);
}