import fancyLog from 'fancy-log';

export class Exceptions {

    errorHandler(err) {
        fancyLog.error(err);
    }

}

export default new Exceptions;
