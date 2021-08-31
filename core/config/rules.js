import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import env from './env';

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
        context: env.PATH_RESOURCES,
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
        //         context: path.resolve(env.PATH_COMPONENTS, 'pages'),
        //         name: '[name].html',
        //     },
        // },
        { loader: 'twig-html-loader',
            options: {
                namespaces: {
                    'layouts': path.join(env.PATH_COMPONENTS, 'layouts'),
                    'partials': path.join(env.PATH_COMPONENTS, 'partials')
                },
                data: (context) => {
                    const data = path.join(env.PATH_COMPONENTS, 'data/app.json');
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
};