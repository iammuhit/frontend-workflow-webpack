import path from 'path';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import * as constants from './constants';
import { env } from '../helpers/general';

export const APP_MODE = env('APP_MODE', constants.ENV_DEVELOPMENT);

export const performance = {
    hints: false,
    maxEntrypointSize: 1024,
    maxAssetSize: 1024,
};

export const entry = {
    jquery : ['jquery', 'jquery-migrate'],
    vendors: { import: path.resolve(constants.PATH_APP, 'vendors'),     dependOn: ['jquery'] },
    app    : { import: path.resolve(constants.PATH_APP, 'application'), dependOn: ['vendors'] },
    blocks : { import: path.resolve(constants.PATH_APP, 'components'),  dependOn: ['app'] },
};

export const output = {
    path    : path.resolve(constants.PATH_DIST, 'assets'),
    filename: 'js/[name].min.js',
    // clean   : { keep: /\.gitignore/ }
};

export const target = 'web';

export const optimization = {
    runtimeChunk: 'single',
    minimize    : APP_MODE === constants.ENV_PRODUCTION,
    minimizer   : [
        '...',
        new CssMinimizerPlugin(),
    ],
};

export const devtool = APP_MODE !== constants.ENV_PRODUCTION ? 'source-map' : false;

export const resolve = {
    alias: {
        '@mayarun'     : path.resolve(constants.PATH_APP),
        '@mayarun/core': path.resolve(constants.PATH_CORE),
        'jquery-ui'    : path.resolve(constants.PATH_NODE_MODULES, 'jquery-ui-dist/jquery-ui.js'),
    },
};
