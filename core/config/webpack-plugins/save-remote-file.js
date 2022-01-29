import path from 'path';
import fs from 'fs-extra';
import SaveRemoteFileWebpackPlugin from 'save-remote-file-webpack-plugin';
import $ from '../../libraries/Loader';

const constants = $.config('constants');

const userOptionsFile = path.resolve(constants.PATH_APP, 'config/save-remote-file.js');
const userOptions = fs.existsSync(userOptionsFile) ? require(userOptionsFile) : [];

export default new SaveRemoteFileWebpackPlugin(userOptions);
