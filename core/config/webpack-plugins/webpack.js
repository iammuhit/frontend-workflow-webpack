import webpack from 'webpack';

export const provider = new webpack.ProvidePlugin({
    $     : require.resolve('jquery'),
    jQuery: require.resolve('jquery'),
});

export const hotModuleReplacement = new webpack.HotModuleReplacementPlugin();

export default { provider, hotModuleReplacement };
