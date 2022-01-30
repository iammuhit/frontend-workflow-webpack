export const fonts = {
    test: /\.(woff|woff2|eot|ttf|oft)(\?v=\w+)?$/i,
    type: 'asset/resource',
    generator: {
        filename: 'fonts/[name][ext][query]',
    },
};

export const fontawesome = {
    test: /fontawesome-free[\\/]webfonts[\\/].*\.(woff|woff2|eot|ttf|oft|svg)(\?v=\w+)?$/i,
    type: 'asset/resource',
    generator: {
        filename: 'fonts/fontawesome/[name][ext][query]',
    },
};

export const fontello = {
    test: /fontello[\\/]font[\\/].*\.(woff|woff2|eot|ttf|oft|svg)(\?v=\w+)?$/i,
    type: 'asset/resource',
    generator: {
        filename: 'fonts/fontello/[name][ext][query]',
    },
};

export const slick = {
    test: /slick-carousel[\\/]slick[\\/]fonts[\\/].*\.(woff|woff2|eot|ttf|oft|svg)(\?v=\w+)?$/i,
    type: 'asset/resource',
    generator: {
        filename: 'fonts/slick/[name][ext][query]',
    },
};

export default { fonts, fontawesome, fontello, slick };
