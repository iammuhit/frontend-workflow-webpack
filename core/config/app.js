import path from 'path';
import env from './env';

module.exports.entry = {
    jquery: ['jquery', 'jquery-migrate'],
    bootstrap: { import: 'bootstrap', dependOn: 'jquery' },
    lodash: { import: 'lodash', dependOn: 'jquery' },
    app: { import: path.resolve(env.PATH_APP, 'app.js'), dependOn: ['jquery', 'bootstrap', 'lodash'] },
    custom: { import: path.resolve(env.PATH_RESOURCES, 'js/custom.js'), dependOn: ['app'] },
    components: path.resolve(env.PATH_COMPONENTS, 'index.js')
};

module.exports.output = {
    filename: 'js/[name].min.js',
    path: path.resolve(env.PATH_DIST, 'assets'),
    // publicPath: '/',
    hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
    hotUpdateMainFilename: 'hot/[hash].hot-update.json',
    // clean: { keep: /\.gitignore/ }
};

module.exports.optimization = {
    nodeEnv: env.APP_ENV,
    minimize: true,
    runtimeChunk: 'single',
};

module.exports.resolve = {
    alias: {
        'mayarun': env.PATH_APP,
        'mayarun/core': env.PATH_CORE
    }
};