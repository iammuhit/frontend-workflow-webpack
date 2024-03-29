import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import $ from '../../libraries/Loader';

const constants = $.config('constants');
const { env } = $.helper('general');

export default new CopyWebpackPlugin({
    patterns: [
        {
            from   : '**/*',
            to     : path.resolve(env('THEME_PATH'), 'assets'),
            context: path.resolve(constants.PATH_DIST_ASSETS),
            force  : true,
        },
    ],
});
