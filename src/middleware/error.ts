import type { ErrorRequestHandler } from '#types/index';

import logger from '#startup/logging';


const error: ErrorRequestHandler = function (err, req, res, next) {
    logger.error(err.message, err);

    res.status(500).json({ error: 'Something went wrong!' });
}

export default error;