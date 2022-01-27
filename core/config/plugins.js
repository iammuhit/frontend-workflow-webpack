import path from 'path';
import * as constants from './constants';
import { env } from '../helpers/general';

export const html = (file) => {
    return {
        filename: () => {
            const context = path.resolve(constants.PATH_TEMPLATES);
            const relativePath = path.relative(context, file).replace('.twig', '');
            const segments = relativePath.split(path.sep);
            if (segments.slice(-1).pop() === 'index') segments.pop();
            return segments.join('-').concat('.html').replace(/^/, '../');
        },
        template     : path.resolve(file),
        inject       : env('PLUGIN_HTML_INJECT', 'body'),
        scriptLoading: env('PLUGIN_HTML_SCRIPT', 'defer'),
        favicon      : env('PLUGIN_HTML_FAVICON') ? path.join(constants.PATH_APP, env('PLUGIN_HTML_FAVICON')): '',
        cache        : env('PLUGIN_HTML_CACHE', false),
        hash         : env('PLUGIN_HTML_HASH', false),
        excludeChunks: ['components']
    };
};

export const prettyHtml = {
    end_with_newline : true,
    indent_size      : 4,
    indent_with_tabs : true,
    indent_inner_html: false,
    preserve_newlines: true,
};

export const browserSync = {
    server: {
        baseDir  : constants.PATH_DIST,
        directory: false,
        index    : 'index.html'
    },
    host  : env('SERVER_HOST', 'localhost'),
    port  : env('SERVER_PORT', 9000),
    https : env('SERVER_HTTPS', false),
    open  : env('BROWSER_SYNC_OPEN', true),
    notify: env('BROWSER_SYNC_NOTIFY', true),
};

export const webpackManifest = {
    fileName  : path.resolve(constants.PATH_DIST, 'manifest.json'),
    basePath  : '',
    publicPath: 'assets/',
    map: (file) => {
        const resourcePath = 'assets/';

        if(/(jquery|bootstrap|core|standard|runtime)\.(min\.)?(js|css)(\.map)?$/i.test(file.name)) {
            const ext = path.extname(file.name).slice(1);
            const folder = ext === 'map' ? path.extname(file.name.slice(0, -4)).slice(1) : ext;
            file.name = resourcePath + folder + '/' + file.name;
        } else if(/\.html$/i.test(file.name)) {
            file.name = file.name.replace('../', '');
            file.path = file.path.replace(resourcePath + '../', '');
        } else {
            file.name = resourcePath + file.name;
        }

        return file;
    },
};

export const webpackNotifier = {
    alwaysNotify: true
};

export const webpackProvider = {
    $     : require.resolve('jquery'),
    jQuery: require.resolve('jquery'),
};

export const saveRemoteFile = require(path.resolve(constants.PATH_BASE, 'remote.config'));

export const fontello = {
    config: require(path.resolve(constants.PATH_APP, 'vendors/fontello/config.json')),
    output: {
        css: 'css/[name].css',
        font: 'fonts/[name].[ext]'
    }
};

export const miniCssExtract = {
    filename: 'css/[name].min.css',
    chunkFilename: '[id].css'
};

export const webpackClean = {
    dry: false,
    verbose: true,
    cleanStaleWebpackAssets: true,
    protectWebpackAssets: true,
    cleanOnceBeforeBuildPatterns: [
        path.resolve(constants.PATH_DIST, '*'),
        ('!').concat(path.resolve(constants.PATH_DIST, '**/.gitignore')),
    ],
    cleanAfterEveryBuildPatterns: [],
    dangerouslyAllowCleanPatternsOutsideProject: false,
};

export const workbox = {
    generateSW: require(path.resolve(__dirname, 'workbox'))
};

export const favicons = {
    logo    : path.resolve(constants.PATH_ASSETS, 'img/favicon.png'),
    prefix  : 'img/favicons/',
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
