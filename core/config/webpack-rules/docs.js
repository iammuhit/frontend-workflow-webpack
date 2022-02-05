export default {
    test: /\.(doc|docx|pdf)(\?v=\w+)?$/i,
    type: 'asset/resource',
    generator: {
        filename: 'docs/[name][ext][query]',
    },
};
