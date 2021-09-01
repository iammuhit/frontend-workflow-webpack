import path from 'path';
import Loader from '../libraries/Loader';
import Exceptions from '../libraries/Exceptions';

export const load = new Loader;

export const env = load.config('env');
export const pkg = require(path.resolve(env.PATH_BASE, 'package.json'));
export const errors = new Exceptions;

export const config = (config) => load.config(config);
export const helper = (helper) => load.helper(helper);
export const library = (library) => load.library(library);
export const plugin = (plugin) => load.plugin(plugin);

export default { load, env, pkg, errors, config, helper, library, plugin };