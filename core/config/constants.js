import path from 'path';
import dotenv from 'dotenv';

const env = dotenv.config().parsed;

export const ENV_DEVELOPMENT = process.env.ENV_DEVELOPMENT = 'development';
export const ENV_PRODUCTION  = process.env.ENV_PRODUCTION  = 'production';

export const NODE_ENV = ([ENV_DEVELOPMENT, ENV_PRODUCTION].includes(process.env.NODE_ENV)) ? process.env.NODE_ENV : env.APP_MODE;

export const APP_MODE    = process.env.APP_MODE    = process.env.NODE_ENV = NODE_ENV ?? ENV_DEVELOPMENT;
export const APP_VERSION = process.env.APP_VERSION = env.APP_VERSION ?? process.env.npm_package_version;

export const PATH_BASE        = path.resolve(path.dirname(path.dirname(__dirname)));
export const PATH_CORE        = path.resolve(PATH_BASE, 'core');
export const PATH_APP         = path.resolve(PATH_BASE, 'src');
export const PATH_COMPONENTS  = path.resolve(PATH_BASE, 'src/components');
export const PATH_RESOURCES   = path.resolve(PATH_BASE, 'src/resources');
export const PATH_DIST        = path.resolve(PATH_BASE, env.PATH_DIST ?? 'public');
export const PATH_DIST_ASSETS = path.resolve(PATH_BASE, env.PATH_DIST ?? 'public/assets');
