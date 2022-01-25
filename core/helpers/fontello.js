import path from 'path';
import merge from 'webpack-merge';
import fsExtra from 'fs-extra';
import { exec } from 'child_process';

const constants = require(path.resolve(path.dirname(__dirname), 'config/constants'));
const fontelloConfig = {
    config: path.resolve(constants.PATH_BASE, 'fontello.config.json'),
    output: {
        css: path.resolve(constants.PATH_ASSETS, 'fontello/css'),
        font: path.resolve(constants.PATH_ASSETS, 'fontello/font')
    }
};

export const install = (fontelloOptions) => {
    const options = merge(fontelloConfig, fontelloOptions);
    const action = `fontello-cli install --config ${options.config} --css ${options.output.css} --font ${options.output.font}`;
    const sessionFile = path.resolve(constants.PATH_BASE, '.fontello-session');

    if(fsExtra.existsSync(sessionFile)) {
        fsExtra.unlinkSync(sessionFile, (error) => {
            if(error) { console.error(error); }
        });
    }

    exec(action, (error, stdout, stderr) => {
        console.info('\nFontello:\n');

        if(error) { console.error(error); }
        if(stderr) { console.error(stderr); }
    
        console.log(stdout);
    });
};

export default { install };