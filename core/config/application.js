import path from 'path';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import * as constants from './constants';
import { env } from '../helpers/general';

const APP_MODE = env('APP_MODE', constants.ENV_DEVELOPMENT);
const config   = {};
const plugins  = [];

config.server  = require('./server');
config.module  = require('./module');
config.plugins = require('./plugins');

plugins.push(config.plugins.webpack.provider);
plugins.push(config.plugins.manifest);
plugins.push(config.plugins.notifier);
plugins.push(config.plugins.saveRemoteFile);
plugins.push(config.plugins.prettyHtml);
plugins.push(config.plugins.miniCssExtract);
plugins.push(config.plugins.favicons);
plugins.push(config.plugins.dashboard);
// plugins.push(config.plugins.fontello);
// plugins.push(config.plugins.workbox.generateSW);
// plugins.push(config.plugins.webpack.hotModuleReplacement);

if (process.env.WEBPACK_SERVE !== 'true') {
    plugins.push(config.plugins.browserSync);
    plugins.push(config.plugins.clean);
}

if (process.env.npm_config_clean === 'true') {
    plugins.push(config.plugins.clean);
}

if (process.env.npm_config_copy_assets === 'true') {
    plugins.push(config.plugins.filemanager);
}

module.exports = {
    mode: APP_MODE,
    performance: {
        hints: false,
        maxEntrypointSize: 1024,
        maxAssetSize: 1024,
    },
    entry: {
        jquery: ['jquery', 'jquery-migrate'],
        core  : { import: path.resolve(constants.PATH_APP, 'vendors'),     dependOn: ['jquery'] },
        app   : { import: path.resolve(constants.PATH_APP, 'application'), dependOn: ['core'] },
        blocks: { import: path.resolve(constants.PATH_APP, 'templates'),   dependOn: ['app'] },
    },
    output: {
        path    : path.resolve(constants.PATH_DIST, 'assets'),
        filename: 'js/[name].min.js',
        // clean   : { keep: /\.gitignore/ }
    },
    target: 'web',
    optimization: {
        runtimeChunk: 'single',
        minimize    : APP_MODE === constants.ENV_PRODUCTION,
        minimizer   : [
            '...',
            new CssMinimizerPlugin(),
        ],
    },
    devtool: APP_MODE !== constants.ENV_PRODUCTION ? 'source-map' : false,
    devServer: config.server,
    resolve: {
        alias: {
            '@mayarun'     : path.resolve(constants.PATH_APP),
            '@mayarun/core': path.resolve(constants.PATH_CORE),
            'jquery-ui'    : path.resolve(constants.PATH_NODE_MODULES, 'jquery-ui-dist/jquery-ui.js'),
        },
    },
    module: {
        rules: config.module.rules,
    },
    plugins: plugins.concat(config.plugins.html),
};
