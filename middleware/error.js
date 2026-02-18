const logger = require('../startup/logging');

module.exports = function (err, req, res, next) {
    // Log the exception
    logger.error(err.message, err);

    res.status(500).send('Something went wrong!');
}