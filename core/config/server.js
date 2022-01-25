import * as constants from './constants';

module.exports.development = {
    public: 'http://local.muhit.me:8080',
    host: 'local.muhit.me',
    port: 8080,
    https: false,
    open: true,
    liveReload: true,
    disableHostCheck: true,
    hot: true,
    overlay: true,
    contentBase: constants.PATH_DIST,
    watchContentBase: true,
    watchOptions: {
        poll: true,
        ignored: /node_modules/,
    },
    headers: { 'Access-Control-Allow-Origin': '*' },
    writeToDisk: true,
    compress: false,
};