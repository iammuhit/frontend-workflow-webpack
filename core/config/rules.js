import path from 'path';
import fsExtra from 'fs-extra';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as constants from './constants';

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
    test: /fontello[\\/]font[\\/].*\.(woff|woff2|eot|ttf|oft)(\?v=\w+)?$/i,
    type: 'asset/resource',
    generator: {
        filename: 'fonts/fontello/[name][ext][query]',
    },
};

module.exports.twig = {
    test: /\.twig$/i,
    use: [
        { loader: 'raw-loader' },
        // {
        //     loader: 'file-loader',
        //     options: {
        //         context: path.resolve(constants.PATH_COMPONENTS, 'pages'),
        //         name: '[name].html',
        //     },
        // },
        { loader: 'twig-html-loader',
            options: {
                namespaces: {
                    'layouts': path.join(constants.PATH_COMPONENTS, 'layouts'),
                    'partials': path.join(constants.PATH_COMPONENTS, 'partials')
                },
                data: (context) => {
                    const filename = path.basename(context.resourcePath).replace('.twig', '.json');
                    const data = path.join(constants.PATH_COMPONENTS, 'data', filename);

                    if(fsExtra.existsSync(data)) {
                        context.addDependency(data); // Force webpack to watch file
                        return context.fs.readJsonSync(data, { throws: false }) || {};
                    }

                    return {};
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
};