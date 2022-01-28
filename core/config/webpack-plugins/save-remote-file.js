import path from 'path';
import SaveRemoteFileWebpackPlugin from 'save-remote-file-webpack-plugin';
import $ from '../../libraries/Loader';

const constants = $.config('constants');

export default new SaveRemoteFileWebpackPlugin(require(path.resolve(constants.PATH_APP, 'config/save-remote-file')));
