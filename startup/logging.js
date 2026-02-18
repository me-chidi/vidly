const winston = require('winston');
require('winston-mongodb');

const logger = winston.createLogger({
    level: 'info',
    transports: [
        // new winston.transports.Console({ level: 'info' }),
        new winston.transports.File({ filename: 'logfile.log', level: 'error' }),
        new winston.transports.MongoDB({
            db: 'mongodb://admin:ownerisme@localhost:27018/vidly?authSource=admin',
            level: 'error'
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'uncaughtExceptions.log' })
    ],
    rejectionHandlers: [
        new winston.transports.File({ filename: 'unhandledRejections.log' })
    ]
});

process.on('uncaughtException', (ex) => {
    console.log('WE GOT AN UNCAUGHT EXCEPTION', { msg: ex.message });
    logger.info(ex.message, ex);
});
process.on('unhandledRejection', (ex) => {
    console.log('WE GOT AN UNHANDLED REJECTION', { msg: ex.message });
    logger.error(ex.message, ex);
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({ format: winston.format.simple() }));
    // format.simple includes the stack trace we dont want that
    // remove it on your next grind
}

module.exports = logger;