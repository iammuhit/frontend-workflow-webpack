import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default new MiniCssExtractPlugin({
    filename: 'css/[name].min.css',
    chunkFilename: '[id].css'
});
