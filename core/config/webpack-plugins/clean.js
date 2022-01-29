import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import $ from '../../libraries/Loader';

const constants = $.config('constants');
const { env }   = $.helper('general');

export default new CleanWebpackPlugin({
    dry: false,
    verbose: env('APP_MODE') !== constants.ENV_PRODUCTION,
    cleanStaleWebpackAssets: true,
    protectWebpackAssets: true,
    cleanOnceBeforeBuildPatterns: [
        path.resolve(constants.PATH_DIST, '*'),
        ('!').concat(path.resolve(constants.PATH_DIST, '**/.gitignore')),
    ],
    cleanAfterEveryBuildPatterns: [],
    dangerouslyAllowCleanPatternsOutsideProject: false,
});
