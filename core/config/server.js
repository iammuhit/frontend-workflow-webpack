import path from 'path';
import $ from '../libraries/Loader';

const constants = $.config('constants');
const { env }   = $.helper('general');

module.exports = {
    static: {
        directory: path.resolve(constants.PATH_DIST),
        publicPath: '',
        serveIndex: false,
        watch: true,
    },
    host      : env('SERVER_HOST', 'local.mayarun.se'),
    port      : env('SERVER_PORT', 9000),
    https     : Boolean(env('SERVER_HTTPS', false)),
    open      : Boolean(env('SERVER_OPEN', true)),
    liveReload: Boolean(env('SERVER_LIVE_RELOAD', true)),
    hot       : Boolean(env('SERVER_HOT', false)),
    compress  : Boolean(env('SERVER_COMPRESS', true)),
};
