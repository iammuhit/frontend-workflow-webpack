import path from 'path';
import FileManagerPlugin from 'filemanager-webpack-plugin';
import $ from '../../libraries/Loader';

const constants = $.config('constants');
const { env } = $.helper('general');

let copyAssets;

if (env('THEME_PATH') !== undefined) {
    copyAssets = new FileManagerPlugin({
        events: {
            onEnd: {
                copy: [
                    {
                        source : path.resolve(constants.PATH_DIST_ASSETS),
                        destination : path.resolve(env('THEME_PATH'), 'assets'),
                        options: {
                            flat: false,
                            preserveTimestamps: true,
                            overwite: true,
                        },
                        globOptions: {
                            dot: false,
                        },
                    }
                ]
            },
        },
    });
}

export default { copyAssets };
