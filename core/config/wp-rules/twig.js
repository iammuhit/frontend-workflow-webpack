import path from 'path';
import merge from 'webpack-merge';
import fsExtra from 'fs-extra';
import * as constants from '../constants';
import { env, url } from '../../helpers/general';

export default {
    test: /\.twig$/i,
    use: [
        { loader: 'html-loader' },
        { loader: 'twig-html-loader',
            options: {
                namespaces: {
                    'templates': path.resolve(constants.PATH_TEMPLATES),
                    'layouts'  : path.resolve(constants.PATH_APP, 'views/layouts'),
                    'blocks'   : path.resolve(constants.PATH_APP, 'views/blocks'),
                },
                functions: {
                    site_url (uri, query, fragment) {
                        return url.build(env('APP_URL'), uri, query, fragment);
                    },
                    api_url (endpoint, query) {
                        return url.build(env('API_URL'), endpoint, query);
                    },
                },
                data: (context) => {
                    const filename = path.dirname(path.relative(constants.PATH_TEMPLATES, context.resourcePath));
                    const data_global = path.resolve(constants.PATH_LANGUAGES, constants.APP_LANG, 'global.json');
                    const data_template = path.resolve(constants.PATH_LANGUAGES, constants.APP_LANG, filename + '.json');

                    let data = {};

                    if(fsExtra.existsSync(data_global)) {
                        context.addDependency(data_global); // Force webpack to watch file
                        data = merge(data, context.fs.readJsonSync(data_global, { throws: false }) || {});
                    }

                    if(fsExtra.existsSync(data_template)) {
                        context.addDependency(data_template); // Force webpack to watch file
                        data = merge(data, context.fs.readJsonSync(data_template, { throws: false }) || {});
                    }

                    return data;
                },
            },
        },
    ],
};
