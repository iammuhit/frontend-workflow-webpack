module.exports.generateSW = {
    swDest: 'sw.js',
    importScripts: [
        'workbox-catch-handler.js'
    ],
    exclude: [
        /\.(png|jpe?g|gif|svg|webp)$/i,
        /\.map$/,
        /^manifest.*\\.js(?:on)?$/,
    ],
    offlineGoogleAnalytics: true,
    runtimeCaching: [
        {
            urlPattern: /\.(?:png|jpg|jpeg|svg|webp)$/,
            handler: 'CacheFirst',
            options: {
                cacheName: 'images',
                expiration: {
                    maxEntries: 20
                }
            }
        }
    ]
};