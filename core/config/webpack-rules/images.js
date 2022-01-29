import path from 'path';
import * as constants from '../constants';

export default {
    test: /\.(png|svg|jpg|jpeg|gif)(\?v=\w+)?$/i,
    type: 'asset/resource',
    generator: {
        filename: (pathData) => {
            let context = path.resolve(constants.PATH_ASSETS);
            let resourcePath = pathData.module.resource;

            if(/node_modules/.test(resourcePath)) {
                context = path.resolve(__dirname, 'node_modules');
            }

            if(/jquery-ui-dist/.test(resourcePath)) {
                resourcePath = resourcePath.replace('jquery-ui-dist/images', 'img/jquery-ui');
            }

            return path.relative(context, resourcePath).replace(/\\/g, '/');
        },
    },
};
