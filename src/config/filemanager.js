import path from 'path';

module.exports = {
    copy   : [
        {
            source : path.resolve(process.env.PATH_DIST_ASSETS),
            destination : path.resolve(process.env.THEME_PATH, 'assets'),
            options: {
                flat: false,
                preserveTimestamps: true,
                overwite: true,
            },
            globOptions: {
                dot: false,
            },
        },
        {
            source: path.resolve(process.env.PATH_DIST, '*.html'),
            destination: path.resolve(process.env.THEME_PATH, 'templates')
        }
    ],
};
