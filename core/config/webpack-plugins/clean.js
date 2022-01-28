import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import $ from '../../libraries/Loader';

const constants = $.config('constants');

export default new CleanWebpackPlugin({
    dry: false,
    verbose: true,
    cleanStaleWebpackAssets: true,
    protectWebpackAssets: true,
    cleanOnceBeforeBuildPatterns: [
        path.resolve(constants.PATH_DIST, '*'),
        ('!').concat(path.resolve(constants.PATH_DIST, '**/.gitignore')),
    ],
    cleanAfterEveryBuildPatterns: [],
    dangerouslyAllowCleanPatternsOutsideProject: false,
});
