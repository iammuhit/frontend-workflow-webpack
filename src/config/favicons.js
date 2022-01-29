import path from 'path';

module.exports = {
    logo    : path.resolve(process.env.PATH_ASSETS, 'images/favicon.png'),
    prefix  : 'images/favicons/',
    cache   : process.env.APP_MODE === process.env.ENV_PRODUCTION,
    mode    : 'webapp',
    inject  : true,
    favicons: {
        appName       : process.env.APP_NAME,
        appDescription: process.env.APP_DESCRIPTION,
        developerName : process.env.COMPANY_NAME,
        developerURL  : process.env.COMPANY_WEBSITE,
        background    : '#ddd',
        theme_color   : '#333',
        version       : process.env.APP_VERSION,
        icons         : {
            favicons    : true,
            android     : false,
            appleIcon   : false,
            appleStartup: false,
            windows     : false,
            coast       : false,
            yandex      : false,
        },
    },
};
