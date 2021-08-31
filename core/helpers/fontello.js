import path from 'path';
import merge from 'webpack-merge';
import fsExtra from 'fs-extra';
import { exec } from 'child_process';

const env = require(path.resolve(path.dirname(__dirname), 'config/env'));
const fontelloConfig = {
    config: path.resolve(env.PATH_BASE, 'fontello.config.json'),
    output: {
        css: path.resolve(env.PATH_RESOURCES, 'fontello/css'),
        font: path.resolve(env.PATH_RESOURCES, 'fontello/font')
    }
};

export const install = (fontelloOptions) => {
    const options = merge(fontelloConfig, fontelloOptions);
    const action = `fontello-cli install --config ${options.config} --css ${options.output.css} --font ${options.output.font}`;

    fsExtra.unlinkSync(path.resolve(env.PATH_BASE, '.fontello-session'), (error) => {
        if(error) { console.error(error); }
    });

    exec(action, (error, stdout, stderr) => {
        console.info('\nFontello:\n');

        if(error) { console.error(error); }
        if(stderr) { console.error(stderr); }
    
        console.log(stdout);
    });
};

export default { install };