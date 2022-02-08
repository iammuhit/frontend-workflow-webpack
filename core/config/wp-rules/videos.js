export default {
    test: /\.(mp4|avi|webm|wmv)(\?v=\w+)?$/i,
    type: 'asset/resource',
    generator: {
        filename: 'videos/[name][ext][query]',
    },
};
