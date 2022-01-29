import BrowserSyncWebpackPlugin from 'browser-sync-webpack-plugin';
import $ from '../../libraries/Loader';

const constants = $.config('constants');
const { env }   = $.helper('general');

export default new BrowserSyncWebpackPlugin({
    proxy : env('BROWSER_SYNC_PROXY', 'local.mayarun.se'),
    host  : env('BROWSER_SYNC_HOST', 'local.muhit.me'),
    port  : env('BROWSER_SYNC_PORT', 9000),
    https : env('BROWSER_SYNC_HTTPS', false),
    open  : env('BROWSER_SYNC_OPEN', true),
    notify: env('BROWSER_SYNC_NOTIFY', true),
});
