import path from 'path';
import dotenv from 'dotenv';

const ENV             = dotenv.config();
const ENV_DEVELOPMENT = process.env.ENV_DEVELOPMENT = 'development';
const ENV_PRODUCTION  = process.env.ENV_PRODUCTION  = 'production';

const NODE_ENV  = ([ENV_DEVELOPMENT, ENV_PRODUCTION].includes(process.env.NODE_ENV)) ? process.env.NODE_ENV : process.env.APP_MODE;
const APP_MODE  = process.env.APP_MODE = process.env.NODE_ENV = (NODE_ENV !== undefined) ? NODE_ENV : ENV_DEVELOPMENT;
const PATH_BASE = path.resolve(path.dirname(path.dirname(__dirname)));

process.env.PATH_BASE        = PATH_BASE;
process.env.PATH_CORE        = path.resolve(PATH_BASE, 'core');
process.env.PATH_APP         = path.resolve(PATH_BASE, 'src');
process.env.PATH_COMPONENTS  = path.resolve(PATH_BASE, 'src/components');
process.env.PATH_RESOURCES   = path.resolve(PATH_BASE, 'src/resources');
process.env.PATH_DIST        = path.resolve(PATH_BASE, 'public');
process.env.PATH_DIST_ASSETS = path.resolve(PATH_BASE, 'public/assets');

module.exports = process.env;
