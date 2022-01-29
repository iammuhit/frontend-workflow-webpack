import path from 'path';
import fs from 'fs-extra';
import PrettyHtmlWebpackPlugin from '../../plugins/PrettyHtml';
import $ from '../../libraries/Loader';

const constants = $.config('constants');

const defaultOptions = {
    end_with_newline : true,
    indent_size      : 4,
    indent_with_tabs : false,
    indent_inner_html: false,
    preserve_newlines: false,
};
const userOptionsFile = path.resolve(constants.PATH_APP, 'config/pretty-html.js');
const userOptions = fs.existsSync(userOptionsFile) ? require(userOptionsFile) : {};
const options = Object.keys(defaultOptions).reduce((a, key) => ({ ...a, [key]: userOptions[key] }), {});

export default new PrettyHtmlWebpackPlugin(options);
