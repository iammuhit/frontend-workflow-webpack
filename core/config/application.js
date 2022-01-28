import path from 'path';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import * as constants from './constants';
import { env } from '../helpers/general';

const APP_MODE = env('APP_MODE', constants.ENV_DEVELOPMENT);
const config   = {};
const module   = {};
const plugins  = [];

config.module  = require('./module');
config.plugins = require('./plugins');

module.rules = Object.values(config.module.rules);

plugins.push(config.plugins.webpack.provider);
plugins.push(config.plugins.browserSync);
plugins.push(config.plugins.clean);
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

if (env('THEME_PATH') !== undefined && APP_MODE === constants.ENV_PRODUCTION) {
    plugins.push(config.plugins.filemanager.copyAssets);
}

export default {
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
        clean   : { keep: /\.gitignore/ }
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
    // devServer: config.server.development,
    resolve: {
        alias: {
            '@mayarun'     : path.resolve(constants.PATH_APP),
            '@mayarun/core': path.resolve(constants.PATH_CORE),
            'jquery-ui'    : path.resolve(constants.PATH_NODE_MODULES, 'jquery-ui-dist/jquery-ui.js'),
        },
    },
    module: module,
    plugins: plugins.concat(config.plugins.html),
};
