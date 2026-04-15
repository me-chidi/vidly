"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const logger = winston_1.default.createLogger({
    level: 'info',
    transports: [
        new winston_1.default.transports.Console({ format: winston_1.default.format.simple() }),
        new winston_1.default.transports.File({ filename: '../../logfile.log', level: 'error' })
    ],
    exceptionHandlers: [
        new winston_1.default.transports.File({ filename: '../../uncaughtExceptions.log' })
    ],
    rejectionHandlers: [
        new winston_1.default.transports.File({ filename: '../../unhandledRejections.log' })
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
    // logger.add(new winston.transports.Console({ format: winston.format.simple() }));
    // format.simple includes the stack trace we dont want that
    // remove it on your next grind
}
exports.default = logger;
