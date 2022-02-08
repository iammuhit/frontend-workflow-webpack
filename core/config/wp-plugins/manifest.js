import path from 'path';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import $ from '../../libraries/Loader';

const constants = $.config('constants');

export default new WebpackManifestPlugin({
    fileName  : path.resolve(constants.PATH_DIST, 'manifest.json'),
    basePath  : '',
    publicPath: 'assets/',
    map: (file) => {
        const resourcePath = 'assets/';

        if(/(jquery|bootstrap|core|standard|runtime)\.(min\.)?(js|css)(\.map)?$/i.test(file.name)) {
            const ext = path.extname(file.name).slice(1);
            const folder = ext === 'map' ? path.extname(file.name.slice(0, -4)).slice(1) : ext;
            file.name = resourcePath + folder + '/' + file.name;
        } else if(/\.html$/i.test(file.name)) {
            file.name = file.name.replace('../', '');
            file.path = file.path.replace(resourcePath + '../', '');
        } else {
            file.name = resourcePath + file.name;
        }

        return file;
    },
});
