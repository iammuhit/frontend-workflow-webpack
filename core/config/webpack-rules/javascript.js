export default {
    test: /assets[\\/]js[\\/].*\.js$/i,
    type: 'asset/resource',
    generator: {
        filename: 'js/[name][ext][query]',
    },
};
