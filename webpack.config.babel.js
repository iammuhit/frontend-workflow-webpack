import webpack from 'webpack';
import path from 'path';
import fsExtra from 'fs-extra';
import dotEnv from 'dotenv';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackNotifierPlugin from 'webpack-notifier';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import SaveRemoteFileWebpackPlugin from 'save-remote-file-webpack-plugin';
// import FontelloWebpackPlugin from 'fontello-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

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
}

const views = dirWalker('./src/views/pages');
const htmlWebpackPlugins = views.map(
    file => new HtmlWebpackPlugin({
        filename: file.replace('src/views/pages/', '').replace('.twig', '.html'),
        template: path.resolve(__dirname, file),
        hash: false
    })
);

module.exports = {
    mode: ENV_MODE,
    entry: {
        app: {
            import: './src/assets/js/app.js',
            dependOn: 'shared'
        },
        custom: {
            import: './src/assets/js/custom.js',
            dependOn: 'shared'
        },
        shared: 'lodash'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './assets/js/[name].js',
        clean: { keep: /\.gitignore/ }
    },
    optimization: {
        nodeEnv: ENV_MODE,
        minimize: true,
        runtimeChunk: 'single'
    },
    devtool: ENV_MODE == ENV_DEVELOPMENT ? 'source-map' : false,
    devServer: {
        contentBase: path.resolve(__dirname, 'dist')
    },
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
                test: /\.(png|svg|jpe?g|gif|webp)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?v=[contenthash]',
                    outputPath: (url, resourcePath, context) => {
                        let relativePath = path.relative(context, resourcePath).replace('src/', '');

                        if(/fontello/.test(relativePath)) {
                            return relativePath.replace('assets/fontello/font', 'assets/fonts/fontello');
                        }

                        return relativePath;
                    }
                }
            },
            {
                test: /\.(ttf|eot|woff2?)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?v=[contenthash]',
                    outputPath: (url, resourcePath, context) => {
                        let relativePath = path.relative(context, resourcePath).replace('src/', '');

                        if(/fontello/.test(relativePath)) {
                            return relativePath.replace('assets/fontello/font', 'assets/fonts/fontello');
                        }

                        return relativePath;
                    }
                }
            },
            {
                test: /\.twig$/i,
                use: [
                    { loader: 'raw-loader' },
                    { loader: 'twig-html-loader',
                        options: {
                            namespaces: {
                                'layouts': path.join(process.cwd(), 'src', 'views', 'layouts'),
                                'partials': path.join(process.cwd(), 'src', 'views', 'partials')
                            },
                            data: (context) => {
                                const data = path.join(__dirname, 'src', 'data', 'app.json');
                                context.addDependency(data); // Force webpack to watch file
                                return context.fs.readJsonSync(data, { throws: false }) || {};
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new WebpackNotifierPlugin({ alwaysNotify: true }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery'
        }),
        new SaveRemoteFileWebpackPlugin(require('./remote.config')),
        // new FontelloWebpackPlugin({
        //     config: require('./fontello.config.json'),
        //     output: {
        //         css: 'assets/css/[name].css',
        //         font: 'assets/fonts/[name].[ext]'
        //     }
        // }),
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].css',
            chunkFilename: '[id].css'
        })
    ].concat(htmlWebpackPlugins)
};