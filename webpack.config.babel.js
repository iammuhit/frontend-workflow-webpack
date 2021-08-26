import webpack from 'webpack';
import path from 'path';
import fsExtra from 'fs-extra';
import dotEnv from 'dotenv';

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

const envConfig = dotEnv.config();

const ENV_PRODUCTION = 'production';
const ENV_DEVELOPMENT = 'development';
const ENV_MODE = process.env.APP_MODE == ENV_DEVELOPMENT ? ENV_DEVELOPMENT : ENV_PRODUCTION;

const dirWalker = (dir) => {
    let files = [];
    
    fsExtra.readdirSync(dir).forEach(filename => {
        const file = path.join(dir, filename);
        const status = fsExtra.statSync(file);

        if(status && status.isDirectory() && path.basename(file).indexOf('_') !== 0) {
            files = files.concat(dirWalker(file));
        } else if(status && !status.isDirectory() && path.extname(file) === '.twig' && path.basename(file).indexOf('_') !== 0) {
            files.push(file);
        }
    });

    return files;
};

const pages = dirWalker(path.join('src/views', 'pages'));
const htmlWebpackPlugins = pages.map(
    file => new HtmlWebpackPlugin({
        filename: file.replace(/\\/g, '/').replace('src/views/pages/', '../').replace('.twig', '.html'),
        template: path.resolve(__dirname, file),
        inject: true,
        minify: false,
        cache: true,
        hash: false
    })
);

module.exports = {
    mode: ENV_MODE,
    entry: {
        app: {
            import: path.resolve('src/assets/js', 'app.js'),
            dependOn: 'shared'
        },
        custom: {
            import: path.resolve('src/assets/js', 'custom.js'),
            dependOn: 'shared'
        },
        shared: 'lodash',
        twig: path.resolve('src/assets/js', 'twig.js')
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist/assets'),
        // publicPath: '/',
        hotUpdateChunkFilename: 'hot/[id].hot-update.js',
        hotUpdateMainFilename: 'hot/main.hot-update.json',
        // clean: { keep: /\.gitignore/ }
    },
    optimization: {
        nodeEnv: ENV_MODE,
        minimize: true,
        runtimeChunk: false
    },
    devtool: ENV_MODE == ENV_DEVELOPMENT ? 'source-map' : false,
    // devServer: {
    //     public: 'http://local.muhit.me:8080',
    //     host: 'local.muhit.me',
    //     port: 8080,
    //     https: false,
    //     open: true,
    //     liveReload: true,
    //     disableHostCheck: true,
    //     hot: true,
    //     overlay: true,
    //     contentBase: path.resolve(__dirname, 'dist'),
    //     watchContentBase: true,
    //     watchOptions: {
    //         poll: true,
    //         ignored: /node_modules/,
    //     },
    //     headers: { 'Access-Control-Allow-Origin': '*' },
    //     writeToDisk: true,
    //     compress: false,
    // },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /(node_modules|bower_components)/,
                use: [ 'babel-loader' ]
            },
            {
                test: /\.(css|scss)$/i,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {},
                    },
                    'css-loader',
                    'sass-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(png|svg|jpe?g|gif|webp|ttf|eot|woff2?)$/i,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]?v=[contenthash]',
                    context: path.resolve(__dirname, 'src/assets'),
                    outputPath: (url, resourcePath, context) => {
                        let relativePath = path.relative(context, resourcePath).replace(/\\/g, '/');
                    
                        if(/fontello/.test(relativePath)) {
                            return relativePath.replace('fontello/font', 'fonts/fontello');
                        }
                    
                        return relativePath;
                    }
                }
            },
            {
                test: /\.twig$/i,
                use: [
                    { loader: 'raw-loader' },
                    // {
                    //     loader: 'file-loader',
                    //     options: {
                    //         context: path.resolve('src/views/pages'),
                    //         name: '[name].html',
                    //     },
                    // },
                    { loader: 'twig-html-loader',
                        options: {
                            namespaces: {
                                'layouts': path.join(process.cwd(), 'src/views/layouts'),
                                'partials': path.join(process.cwd(), 'src/views/partials')
                            },
                            data: (context) => {
                                const data = path.join(__dirname, 'src/data/app.json');
                                context.addDependency(data); // Force webpack to watch file
                                return context.fs.readJsonSync(data, { throws: false }) || {};
                            }
                        }
                    },
                    // { loader: 'extract-loader', options: {
                    //     publicPath: 'assets/'
                    // } },
                    // { loader: 'html-loader', options: {
                    //     esModule: false
                    // }},
                ]
            },
        ]
    },
    plugins: [
        new WebpackNotifierPlugin({ alwaysNotify: true }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: '**/*',
                    to: 'img/',
                    context: path.resolve(__dirname, 'src/assets/img')
                }
            ]
        }),
        new SaveRemoteFileWebpackPlugin(require('./remote.config')),
        // new FontelloWebpackPlugin({
        //     config: require('./fontello.config.json'),
        //     output: {
        //         css: path.join('assets/css', '[name].css'),
        //         font: path.join('assets/fonts', '[name].[ext]')
        //     }
        // }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: '[id].css'
        }),
        new WebpackManifestPlugin({
            fileName: 'manifest.json',
            basePath: '',
            publicPath: ''
        }),
        new webpack.HotModuleReplacementPlugin(),
        new WebpackDashboardPlugin(),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [ '**/*', '!.gitignore' ],
            verbose: true,
            dry: false
        }),
        // new WorkboxWebpackPlugin.GenerateSW({
        //     swDest: 'sw.js',
        //     importScripts: [
        //         'workbox-catch-handler.js'
        //     ],
        //     exclude: [
        //         /\.(png|jpe?g|gif|svg|webp)$/i,
        //         /\.map$/,
        //         /^manifest.*\\.js(?:on)?$/,
        //     ],
        //     offlineGoogleAnalytics: true,
        //     runtimeCaching: [
        //         {
        //             urlPattern: /\.(?:png|jpg|jpeg|svg|webp)$/,
        //             handler: 'CacheFirst',
        //             options: {
        //                 cacheName: 'images',
        //                 expiration: {
        //                     maxEntries: 20
        //                 }
        //             }
        //         }
        //     ]
        // }),
        new FaviconsWebpackPlugin({
            logo: path.resolve('src/assets/img/favicon.png'),
            prefix: 'img/favicons/',
            cache: true
        }),
        new BrowserSyncWebpackPlugin({
            server: {
                baseDir: path.resolve(__dirname, 'dist'),
                directory: false,
                index: 'index.html'
            },
            host: 'local.muhit.me',
            port: 8080,
            https: false,
            open: true,
            notify: true
        })
    ].concat(htmlWebpackPlugins)
};