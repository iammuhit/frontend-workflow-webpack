import path from 'path';

const config = {};

config.rules = require(path.resolve(__dirname, 'rules'));

export const rules = [
    config.rules.babel,
    config.rules.javascript,
    config.rules.scss,
    config.rules.less,
    config.rules.images,
    config.rules.videos,
    config.rules.docs,
    config.rules.fonts,
    config.rules.twig,
];

export default { rules };
