import path from 'path';
import fsExtra from 'fs-extra';

export const dirWalker = (dir, ext = '.twig') => {
    let files = [];

    fsExtra.readdirSync(dir).forEach(filename => {
        const file = path.join(dir, filename);
        const status = fsExtra.statSync(file);

        if(
            status
            && status.isDirectory()
            && path.basename(file) !== 'blocks'
            && path.basename(file).indexOf('_') !== 0
        ) {
            files = files.concat(dirWalker(file));
        } else if(
            status
            && !status.isDirectory()
            && path.extname(file) === ext
            && path.basename(file).indexOf('_') !== 0
        ) {
            files.push(file);
        }
    });

    return files;
};

export default { dirWalker };
