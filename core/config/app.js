import path from 'path';
import * as constants from './constants';
import { env } from '../helpers/general';

export const APP_MODE = env('APP_MODE', constants.ENV_DEVELOPMENT);

export const entry = {
    jquery: ['jquery', 'jquery-migrate'],
    bootstrap: { import: 'bootstrap', dependOn: 'jquery' },
    lodash: { import: 'lodash', dependOn: 'jquery' },
    app: { import: path.resolve(constants.PATH_APP, 'app.js'), dependOn: ['jquery', 'bootstrap', 'lodash'] },
    custom: { import: path.resolve(constants.PATH_RESOURCES, 'js/custom.js'), dependOn: ['app'] },
    components: path.resolve(constants.PATH_COMPONENTS, 'index.js')
};

export const output = {
    filename: 'js/[name].min.js',
    path: path.resolve(constants.PATH_DIST, 'assets'),
    // publicPath: '/',
    hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
    hotUpdateMainFilename: 'hot/[hash].hot-update.json',
    // clean: { keep: /\.gitignore/ }
};

export const optimization = {
    nodeEnv: APP_MODE,
    minimize: true,
    runtimeChunk: 'single',
};

export const resolve = {
    alias: {
        'mayarun': constants.PATH_APP,
        'mayarun/core': constants.PATH_CORE
    }
};
