import path from 'path';
import webpack from 'webpack';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackNotifierPlugin from 'webpack-notifier';
import WebpackDashboardPlugin from 'webpack-dashboard/plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import WorkboxWebpackPlugin from 'workbox-webpack-plugin';
import BrowserSyncWebpackPlugin from 'browser-sync-webpack-plugin';
import SaveRemoteFileWebpackPlugin from 'save-remote-file-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
// import FontelloWebpackPlugin from 'fontello-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import app from './core/bootstrap/app';

const helper = app.load.helper();
const config = app.load.config();

const pages = helper.file.dirWalker(path.join(config.env.PATH_COMPONENTS, 'pages'), '.twig');
const htmlWebpackPlugins = pages.map(
    file => new HtmlWebpackPlugin(config.plugins.html(file))
);
const PrettyHtmlWebpackPlugin = app.load.plugin('PrettyHtml');

if(helper.general.env('FONTELLO_INSTALL', true)) {
    helper.fontello.install({
        config: path.resolve(config.env.PATH_BASE, 'fontello.config.json'),
        output: {
            css: path.resolve(config.env.PATH_RESOURCES, 'fontello/css'),
            font: path.resolve(config.env.PATH_RESOURCES, 'fontello/font')
        }
    });
}

module.exports = {
    mode: config.env.APP_ENV,
    entry: config.app.entry,
    output: config.app.output,
    optimization: config.app.optimization,
    devtool: config.env.APP_ENV == config.env.ENV_DEVELOPMENT ? 'source-map' : false,
    // devServer: config.server.development,
    resolve: {
        alias: config.app.resolve.alias
    },
    module: {
        rules: [
            config.module.rules.babel,
            config.module.rules.scss,
            config.module.rules.file,
            config.module.rules.twig
        ]
    },
    plugins: [
        new webpack.ProvidePlugin(config.plugins.webpackProvider),
        new BrowserSyncWebpackPlugin(config.plugins.browserSync),
        new CleanWebpackPlugin(config.plugins.webpackClean),
        new WebpackManifestPlugin(config.plugins.webpackManifest),
        new WebpackNotifierPlugin(config.plugins.webpackNotifier),
        new CopyWebpackPlugin(config.plugins.webpackCopy),
        new SaveRemoteFileWebpackPlugin(config.plugins.saveRemoteFile),
        new PrettyHtmlWebpackPlugin(config.plugins.PrettyHtml),
        new MiniCssExtractPlugin(config.plugins.miniCssExtract),
        new FaviconsWebpackPlugin(config.plugins.favicons),
        // new FontelloWebpackPlugin(config.plugins.fontello),
        // new WorkboxWebpackPlugin.GenerateSW(config.plugins.workbox.generateSW),
        new webpack.HotModuleReplacementPlugin(),
        new WebpackDashboardPlugin()
    ].concat(htmlWebpackPlugins)
};