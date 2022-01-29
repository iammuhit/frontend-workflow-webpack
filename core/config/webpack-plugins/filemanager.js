import path from 'path';
import fs from 'fs-extra';
import FileManagerPlugin from 'filemanager-webpack-plugin';
import $ from '../../libraries/Loader';

const constants = $.config('constants');
const { env } = $.helper('general');

const defaultOptions = {
    copy   : [],
    move   : [],
    delete : [],
    archive: [],
};
const userOptionsFile = path.resolve(constants.PATH_APP, 'config/filemanager.js');
const userOptions = fs.existsSync(userOptionsFile) ? require(userOptionsFile) : {};
const options = Object.keys(defaultOptions).reduce((a, key) => ({ ...a, [key]: userOptions[key] }), {});

export default new FileManagerPlugin({
    events: {
        onEnd: {
            copy: options.copy instanceof Array ? options.copy : [],
        },
    },
});
