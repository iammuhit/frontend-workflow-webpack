import BrowserSyncWebpackPlugin from 'browser-sync-webpack-plugin';
import $ from '../../libraries/Loader';

const constants = $.config('constants');
const { env }   = $.helper('general');

export default new BrowserSyncWebpackPlugin({
    server: {
        baseDir  : constants.PATH_DIST,
        directory: false,
        index    : 'index.html'
    },
    host  : env('SERVER_HOST', 'localhost'),
    port  : env('SERVER_PORT', 9000),
    https : env('SERVER_HTTPS', false),
    open  : env('BROWSER_SYNC_OPEN', true),
    notify: env('BROWSER_SYNC_NOTIFY', true),
});
