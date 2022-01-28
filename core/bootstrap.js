import path from 'path';
import Loader from './libraries/Loader';
import Exceptions from './libraries/Exceptions';

export const load      = new Loader;
export const constants = load.config('constants');
export const pkg       = require(path.resolve(process.env.npm_package_json));
export const errors    = new Exceptions;

export const config  = filename => load.config(filename);
export const helper  = filename => load.helper(filename);
export const library = filename => load.library(filename);
export const plugin  = filename => load.plugin(filename);

export const run = () => require(path.resolve(constants.PATH_CORE, 'config/environments', constants.APP_MODE));

export default { load, constants, pkg, errors, config, helper, library, plugin, run };
