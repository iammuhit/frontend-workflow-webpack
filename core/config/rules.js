import path from 'path';
import merge from 'webpack-merge';
import fsExtra from 'fs-extra';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as constants from './constants';
import { env, url } from '../helpers/general';

export const babel = {
    test: /\.m?js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
        loader: 'babel-loader',
        options: {},
    },
};

export const js = {
    test: /assets[\\/]js[\\/].*\.js$/i,
    type: 'asset/resource',
    generator: {
        filename: 'js/[name][ext][query]',
    },
};

export const scss = {
    test: /\.(css|scss)$/i,
    exclude: /(node_modules|bower_components)/,
    use: [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {},
        },
        'css-loader',
        'sass-loader',
        'postcss-loader',
    ],
};

export const less = {
    test: /\.less$/i,
    exclude: /(node_modules|bower_components)/,
    use: [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                esModule: false,
            },
        },
        'css-loader',
        'less-loader',
        'postcss-loader',
    ],
};

export const images = {
    test: /\.(png|svg|jpg|jpeg|gif)(\?v=\w+)?$/i,
    type: 'asset/resource',
    generator: {
        filename: (pathData) => {
            let context = path.resolve(constants.PATH_ASSETS);
            let resourcePath = pathData.module.resource;

            if(/node_modules/.test(resourcePath)) {
                context = path.resolve(__dirname, 'node_modules');
            }

            if(/jquery-ui-dist/.test(resourcePath)) {
                resourcePath = resourcePath.replace('jquery-ui-dist/images', 'img/jquery-ui');
            }

            return path.relative(context, resourcePath).replace(/\\/g, '/');
        },
    },
};

export const fonts = {
    test: /\.(woff|woff2|eot|ttf|oft)(\?v=\w+)?$/i,
    type: 'asset/resource',
    generator: {
        filename: 'fonts/[name][ext][query]',
    },
};

export const svgFonts = {
    test: /(fonts|webfonts)[\\/].*\.(svg)(\?v=\w+)?$/i,
    type: 'asset/resource',
    generator: {
        filename: 'fonts/[name][ext][query]',
    },
};

export const fontelloFonts = {
    test: /fontello[\\/]font[\\/].*\.(woff|woff2|eot|ttf|oft|svg)(\?v=\w+)?$/i,
    type: 'asset/resource',
    generator: {
        filename: 'fonts/fontello/[name][ext][query]',
    },
};

export const twig = {
    test: /\.twig$/i,
    use: [
        { loader: 'html-loader' },
        { loader: 'twig-html-loader',
            options: {
                namespaces: {
                    'templates': path.resolve(constants.PATH_TEMPLATES),
                    'layouts'  : path.resolve(constants.PATH_APP, 'views/layouts'),
                    'blocks'   : path.resolve(constants.PATH_APP, 'views/blocks'),
                },
                functions: {
                    site_url (uri, query, fragment) {
                        return url.build(env('APP_URL'), uri, query, fragment);
                    },
                    api_url (endpoint, query) {
                        return url.build(env('API_URL'), endpoint, query);
                    },
                },
                data: (context) => {
                    const filename = path.dirname(path.relative(constants.PATH_TEMPLATES, context.resourcePath));
                    const data_global = path.resolve(constants.PATH_LANGUAGES, constants.APP_LANG, 'global.json');
                    const data_template = path.resolve(constants.PATH_LANGUAGES, constants.APP_LANG, filename + '.json');

                    let data = {};

                    if(fsExtra.existsSync(data_global)) {
                        context.addDependency(data_global); // Force webpack to watch file
                        data = merge(data, context.fs.readJsonSync(data_global, { throws: false }) || {});
                    }

                    if(fsExtra.existsSync(data_template)) {
                        context.addDependency(data_template); // Force webpack to watch file
                        data = merge(data, context.fs.readJsonSync(data_template, { throws: false }) || {});
                    }

                    console.log(data);

                    return data;
                },
            },
        },
    ],
};
