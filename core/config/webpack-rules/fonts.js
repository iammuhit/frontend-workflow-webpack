import path from 'path';
import * as constants from '../constants';

export default {
    test: /\.(woff|woff2|eot|ttf|oft|svg)(\?v=\w+)?$/i,
    type: 'asset/resource',
    generator: {
        filename: (pathData) => {
            let context = path.resolve(constants.PATH_ASSETS);
            let resourcePath = pathData.module.resource;

            if(/node_modules/.test(resourcePath)) {
                context = path.resolve(constants.PATH_BASE, 'node_modules');
            }

            if(/fontawesome-free[\\/]webfonts/.test(resourcePath)) {
                resourcePath = resourcePath.replace(/@fortawesome[\\/]fontawesome-free[\\/]webfonts/, 'fonts/fontawesome');
            }

            if(/fontello[\\/]font/.test(resourcePath)) {
                resourcePath = resourcePath.replace(/fontello[\\/]font/, 'fonts/fontello');
            }

            if(/slick-carousel[\\/]slick[\\/]fonts/.test(resourcePath)) {
                resourcePath = resourcePath.replace(/slick-carousel[\\/]slick[\\/]fonts/, 'fonts/slick');
            }

            return path.relative(context, resourcePath).replace(/\\/g, '/');
        },
    },
};
