import path from 'path';
import fs from 'fs-extra';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import $ from '../../libraries/Loader';

const constants = $.config('constants');
const { env }   = $.helper('general');

const defaultOptions = {
    logo    : path.resolve(constants.PATH_ASSETS, 'images/favicon.png'),
    prefix  : 'images/favicons/',
    cache   : constants.APP_MODE === constants.ENV_PRODUCTION,
    mode    : env('FAVICONS_MODE', 'auto'),
    inject  : env('FAVICONS_INJECT', false),
    favicons: {
        appName       : env('APP_NAME', ''),
        appDescription: env('APP_DESCRIPTION', ''),
        developerName : env('COMPANY_NAME', ''),
        developerURL  : env('COMPANY_WEBSITE', ''),
        background    : env('FAVICONS_BACKGROUND', '#ddd'),
        theme_color   : env('FAVICONS_THEME_COLOR', '#333'),
        version       : env('APP_VERSION', ''),
        icons         : {
            favicons    : env('FAVICONS_ICONS', true),
            android     : env('FAVICONS_ANDROID', false),
            appleIcon   : env('FAVICONS_APPLE_ICON', false),
            appleStartup: env('FAVICONS_APPLE_STARTUP', false),
            windows     : env('FAVICONS_WINDOWS', false),
            coast       : env('FAVICONS_COAST', false),
            yandex      : env('FAVICONS_YANDEX', false),
        },
    },
};
const userOptionsFile = path.resolve(constants.PATH_APP, 'config/favicons.js');
const userOptions = fs.existsSync(userOptionsFile) ? require(userOptionsFile) : {};
const options = Object.keys(defaultOptions).reduce((a, key) => ({ ...a, [key]: userOptions[key] }), {});

export default new FaviconsWebpackPlugin(options);
