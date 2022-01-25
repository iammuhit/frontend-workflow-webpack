import path from 'path';
import fsExtra from 'fs-extra';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as constants from './constants';

module.exports.babel = {
    test: /\.(js)$/,
    exclude: /(node_modules|bower_components)/,
    use: [ 'babel-loader' ]
};

module.exports.scss = {
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
};

module.exports.file = {
    test: /\.(png|svg|jpe?g|gif|webp|ttf|eot|woff2?)$/i,
    loader: 'file-loader',
    options: {
        name: '[path][name].[ext]?v=[contenthash]',
        context: constants.PATH_RESOURCES,
        outputPath: (url, resourcePath, context) => {
            let relativePath = path.relative(context, resourcePath).replace(/\\/g, '/');
        
            if(/fontello/.test(relativePath)) {
                return relativePath.replace('fontello/font', 'fonts/fontello');
            }
        
            return relativePath;
        }
    }
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