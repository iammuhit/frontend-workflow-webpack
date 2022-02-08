import path from 'path';
import fs from 'fs-extra';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import $ from '../../libraries/Loader';

const constants     = $.config('constants');
const { dirWalker } = $.helper('file');
const { env }       = $.helper('general');

const pages = dirWalker(constants.PATH_TEMPLATES, '.twig');
const defaultOptions = {
    inject       : env('WEBPACK_HTML_INJECT', 'body'),
    scriptLoading: env('WEBPACK_HTML_SCRIPT', 'defer'),
    favicon      : env('WEBPACK_HTML_FAVICON') ? path.join(constants.PATH_APP, env('WEBPACK_HTML_FAVICON')): '',
    cache        : env('WEBPACK_HTML_CACHE', false),
    hash         : env('WEBPACK_HTML_HASH', false),
    excludeChunks: ['components']
};
const userOptionsFile = path.resolve(constants.PATH_APP, 'config/template.js');
const userOptions = fs.existsSync(userOptionsFile) ? require(userOptionsFile) : {};
const options = Object.keys(defaultOptions).reduce((a, key) => ({ ...a, [key]: userOptions[key] }), {});

export default pages.map(file => new HtmlWebpackPlugin({ ...options,
    filename: () => {
        const context = path.resolve(constants.PATH_TEMPLATES);
        const relativePath = path.relative(context, file).replace('.twig', '');
        const segments = relativePath.split(path.sep);
        if (segments.slice(-1).pop() === 'index') segments.pop();
        return segments.join('-').concat(userOptions.fileext || '.html').replace(/^/, '../');
    },
    template     : path.resolve(file),
}));
