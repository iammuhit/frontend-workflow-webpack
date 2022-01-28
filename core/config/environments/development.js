import $ from '../../libraries/Loader';

const helper = $.helper();
const config = $.config();

module.exports = {
    mode: config.app.APP_MODE,
    performance: config.app.performance,
    entry: config.app.entry,
    output: config.app.output,
    target: config.app.target,
    optimization: config.app.optimization,
    devtool: config.app.devtool,
    // devServer: config.server.development,
    resolve: config.app.resolve,
    module: {
        rules: Object.values(config.module.rules),
    },
    plugins: [
        config.plugins.webpack.provider,
        config.plugins.browserSync,
        config.plugins.clean,
        config.plugins.manifest,
        config.plugins.notifier,
        config.plugins.saveRemoteFile,
        config.plugins.prettyHtml,
        config.plugins.miniCssExtract,
        config.plugins.favicons,
        // config.plugins.fontello,
        // config.plugins.workbox.generateSW,
        // config.plugins.webpack.hotModuleReplacement,
        config.plugins.dashboard,
    ].concat(config.plugins.html)
};
