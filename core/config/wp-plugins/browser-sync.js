import path from 'path';
import BrowserSyncWebpackPlugin from 'browser-sync-webpack-plugin';
import $ from '../../libraries/Loader';

const constants = $.config('constants');
const { env }   = $.helper('general');

const options = {
    host  : env('SERVER_HOST', 'local.muhit.me'),
    port  : env('SERVER_PORT', 9000),
    https : Boolean(env('SERVER_HTTPS', false)),
    open  : Boolean(env('SERVER_OPEN', true)),
    notify: Boolean(env('SERVER_NOTIFY', true)),
};

if (env('SERVER_PROXY')) {
    options.proxy = env('SERVER_PROXY', '');
    options.files = [path.resolve(process.env.PATH_BASE, process.env.THEME_PATH)];
} else {
    options.server = {
        baseDir  : constants.PATH_DIST,
        directory: false,
        index    : 'index.html'
    };
}

export default new BrowserSyncWebpackPlugin(options, { reload: process.env.WEBPACK_SERVE !== 'true' });
