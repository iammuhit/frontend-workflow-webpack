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
    jquery: ['jquery', 'jquery-migrate'],
    bootstrap: { import: 'bootstrap', dependOn: 'jquery' },
    lodash: { import: 'lodash', dependOn: 'jquery' },
    app: { import: path.resolve(constants.PATH_APP, 'app.js'), dependOn: ['jquery', 'bootstrap', 'lodash'] },
    custom: { import: path.resolve(constants.PATH_RESOURCES, 'js/custom.js'), dependOn: ['app'] },
    components: path.resolve(constants.PATH_COMPONENTS, 'index.js')
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

export const resolve = {
    alias: {
        'mayarun': constants.PATH_APP,
        'mayarun/core': constants.PATH_CORE
    }
};
