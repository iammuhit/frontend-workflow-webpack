import path from 'path';
import fs from 'fs-extra';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import $ from '../../libraries/Loader';

const constants = $.config('constants');
const { env }   = $.helper('general');

const defaultOptions = {
    dry: false,
    verbose: env('APP_MODE') !== constants.ENV_PRODUCTION,
    cleanStaleWebpackAssets: false,
    protectWebpackAssets: true,
    cleanOnceBeforeBuildPatterns: [
        path.resolve(constants.PATH_DIST, '*'),
        ('!').concat(path.resolve(constants.PATH_DIST, '**/.gitignore')),
    ],
    cleanAfterEveryBuildPatterns: [],
    dangerouslyAllowCleanPatternsOutsideProject: false,
};

if (env('SERVER_PROXY', false)) {
    defaultOptions.cleanAfterEveryBuildPatterns.push(path.resolve(process.env.PATH_BASE, process.env.THEME_PATH, 'assets/**/*.map'));
    defaultOptions.dangerouslyAllowCleanPatternsOutsideProject = true;
}

const userOptionsFile = path.resolve(constants.PATH_APP, 'config/clean.js');
const userOptions = fs.existsSync(userOptionsFile) ? require(userOptionsFile) : {};
const options = Object.keys(defaultOptions).reduce((a, key) => ({ ...a, [key]: userOptions[key] }), {});

export default new CleanWebpackPlugin(defaultOptions);
