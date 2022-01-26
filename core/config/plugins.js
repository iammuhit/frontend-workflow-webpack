import path from 'path';
import * as constants from './constants';
import { env } from '../helpers/general';

module.exports.html = (file) => {
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

module.exports.prettyHtml = {
    end_with_newline: true,
    indent_size: 4,
    indent_with_tabs: true,
    indent_inner_html: true,
    preserve_newlines: true,
};

module.exports.browserSync = {
    server: {
        baseDir: constants.PATH_DIST,
        directory: false,
        index: 'index.html'
    },
    host: 'local.muhit.me',
    port: 8080,
    https: false,
    open: true,
    notify: true
};

module.exports.webpackManifest = {
    fileName: 'manifest.json',
    basePath: '',
    publicPath: ''
};

module.exports.webpackNotifier = {
    alwaysNotify: true
};

module.exports.webpackProvider = {
    jQuery: 'jquery',
    $: 'jquery'
};

module.exports.webpackCopy = {
    patterns: [
        {
            from: '**/*',
            to: 'img/',
            context: path.resolve(constants.PATH_ASSETS, 'img')
        }
    ]
};

module.exports.saveRemoteFile = require(path.resolve(constants.PATH_BASE, 'remote.config'));

module.exports.fontello = {
    config: require(path.resolve(constants.PATH_BASE, 'fontello.config.json')),
    output: {
        css: 'css/[name].css',
        font: 'fonts/[name].[ext]'
    }
};

module.exports.miniCssExtract = {
    filename: 'css/[name].css',
    chunkFilename: '[id].css'
};

module.exports.webpackClean = {
    cleanOnceBeforeBuildPatterns: [
        path.join(constants.PATH_DIST, '**/*'),
        path.join('!', constants.PATH_DIST, '**/.gitignore')
    ],
    verbose: true,
    dry: false
};

module.exports.workbox = {
    generateSW: require(path.resolve(__dirname, 'workbox'))
};

module.exports.favicons = {
    logo: path.resolve(constants.PATH_ASSETS, 'img/favicon.png'),
    prefix: 'img/favicons/',
    cache: true
};