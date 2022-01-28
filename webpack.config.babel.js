import path from 'path';
import app from './core/bootstrap';

const constants = app.load.config('constants');
const fontello  = app.load.helper('fontello');
const { env }   = app.load.helper('general');

if(env('FONTELLO_INSTALL', true)) {
    fontello.install({
        config: path.resolve(constants.PATH_APP, 'vendors/fontello/config.json'),
        output: {
            css: path.resolve(constants.PATH_APP, 'vendors/fontello/css'),
            font: path.resolve(constants.PATH_APP, 'vendors/fontello/font')
        }
    });
}

module.exports = app.run();
