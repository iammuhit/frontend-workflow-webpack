import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default {
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
