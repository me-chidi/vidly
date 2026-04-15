"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
exports.default = db;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
const logging_1 = __importDefault(require("./logging"));
function db() {
    const db = config_1.default.get('db');
    const connectWithRetry = function () {
        // logger.info('Attempting to connect to MongoDB Replica Set...');
        mongoose_1.default.connect(db, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            family: 4,
        })
            .then(() => {
            logging_1.default.info(`Connected to ${db}...`);
        })
            .catch((err) => {
            logging_1.default.error(`MongoDB connection unsuccessful, retrying in 5 seconds...\nmessage: ${err.message}`);
            setTimeout(connectWithRetry, 5000);
        });
    };
    connectWithRetry();
    mongoose_1.default.set('transactionAsyncLocalStorage', true);
}
exports.connection = {
    host: config_1.default.get('redisHost'),
    port: parseInt(config_1.default.get('redisPort'))
};
