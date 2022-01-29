import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default {
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
