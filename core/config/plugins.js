import path from 'path';
import env from './env';

module.exports.html = (file) => {
    return {
        filename: path.basename(file).replace(/^/, '../').replace(path.extname(file), '.html'),
        template: path.resolve(file),
        inject: true,
        minify: false,
        cache: true,
        hash: false
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
        baseDir: env.PATH_DIST,
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
            context: path.resolve(env.PATH_RESOURCES, 'img')
        }
    ]
};

module.exports.saveRemoteFile = require(path.resolve(env.PATH_BASE, 'remote.config'));

module.exports.fontello = {
    config: require(path.resolve(env.PATH_BASE, 'fontello.config.json')),
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
    cleanOnceBeforeBuildPatterns: [ '**/*', '!.gitignore' ],
    verbose: true,
    dry: false
};

module.exports.workbox = {
    generateSW: require(path.resolve(__dirname, 'workbox'))
};

module.exports.favicons = {
    logo: path.resolve(env.PATH_RESOURCES, 'img/favicon.png'),
    prefix: 'img/favicons/',
    cache: true
};