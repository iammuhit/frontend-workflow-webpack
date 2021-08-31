import path from 'path';
import fsExtra from 'fs-extra';
import requireDir from 'require-dir';
import env from '../config/env';

export default class Loader {

    config(config) {
        return config === undefined ? this._autoload('config') : this._load('config', config);
    }

    helper(helper) {
        return helper === undefined ? this._autoload('helpers') : this._load('helpers', helper);
    }

    library(library) {
        return library === undefined ? this._autoload('libraries') : this._load('libraries', library);
    }

    task(task) {
        return task === undefined ? this._autoload('tasks') : this._load('tasks', task);
    }

    _load(dirname, filename) {
        let extname = '.js';
        let filepath = path.resolve(env.PATH_CORE, dirname, filename + extname);

        if(fsExtra.existsSync(filepath)) {
            return require(filepath);
        } else {
            console.error('Unable to load the requested file: ' + dirname + '/' + filename + extname);
        }
    }

    _autoload(dirname, options = { recurse: true }) {
        let directory = path.resolve(env.PATH_CORE, dirname);

        if(fsExtra.existsSync(directory)) {
            return requireDir(directory, options);
        } else {
            console.error('Unable to load the requested directory: ' + dirname);
        }
    }

}