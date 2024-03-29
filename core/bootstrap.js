import path from 'path';
import fs from 'fs-extra';
import merge from 'webpack-merge';
import { Loader } from './libraries/Loader';
import { Exceptions } from './libraries/Exceptions';

process.removeAllListeners('warning'); // disable showing warnings on terminal

export const load      = new Loader;
export const constants = load.config('constants');
export const pkg       = require(path.resolve(process.env.npm_package_json));
export const errors    = new Exceptions;

export const config  = filename => load.config(filename);
export const helper  = filename => load.helper(filename);
export const library = filename => load.library(filename);
export const plugin  = filename => load.plugin(filename);

export const run = () => {
    const fontello  = helper('fontello');
    const { env }   = helper('general');

    let appConfig = config('application');
    let appEnvironmentConfig = config('environments/' + constants.APP_MODE);
    let customEnvironmentConfig = {};
    let customEnvironmentFile = path.resolve(constants.PATH_APP, 'config/environments', constants.APP_MODE);

    if (fs.existsSync(customEnvironmentFile.concat('.js'))) {
        customEnvironmentConfig = require(customEnvironmentFile);
    }

    if(env('FONTELLO_INSTALL', true)) {
        fontello.install({
            config: path.resolve(constants.PATH_APP, 'vendors/fontello/config.json'),
            output: {
                css: path.resolve(constants.PATH_APP, 'vendors/fontello/css'),
                font: path.resolve(constants.PATH_APP, 'vendors/fontello/font')
            }
        });
    }

    return merge(appConfig, appEnvironmentConfig, customEnvironmentConfig);
};

export default { load, constants, pkg, errors, config, helper, library, plugin, run };
