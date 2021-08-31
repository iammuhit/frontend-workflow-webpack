import path from 'path';
import env from './env';

module.exports.entry = {
    app: {
        import: path.resolve(env.PATH_RESOURCES, 'js/app.js'),
        dependOn: 'shared'
    },
    custom: {
        import: path.resolve(env.PATH_RESOURCES, 'js/custom.js'),
        dependOn: 'shared'
    },
    shared: 'lodash',
    components: path.resolve(env.PATH_COMPONENTS, 'index.js')
};

module.exports.output = {
    filename: 'js/[name].js',
    path: path.resolve(env.PATH_DIST, 'assets'),
    // publicPath: '/',
    hotUpdateChunkFilename: 'hot/[id].hot-update.js',
    hotUpdateMainFilename: 'hot/main.hot-update.json',
    // clean: { keep: /\.gitignore/ }
};

module.exports.optimization = {
    nodeEnv: env.APP_ENV,
    minimize: true,
    runtimeChunk: false
};

module.exports.resolve = {
    alias: {
        'mayarun/core': env.PATH_CORE,
        'mayarun/components': env.PATH_COMPONENTS,
        'mayarun/resources': env.PATH_RESOURCES
    }
};