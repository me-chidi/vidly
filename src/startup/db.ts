import mongoose from 'mongoose';
import config from 'config';
import logger from './logging';

export default function db(): void {
    const db: string = config.get('db'); 
    const connectWithRetry = function() {
        // logger.info('Attempting to connect to MongoDB Replica Set...');
        mongoose.connect(db, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            family: 4,
        })
        .then(() => {
            logger.info(`Connected to ${db}...`);
        })
        .catch((err: Error) => {
            logger.error(`MongoDB connection unsuccessful, retrying in 5 seconds...\nmessage: ${err.message}`);
            setTimeout(connectWithRetry, 5000);
        });
    };

    connectWithRetry();
    mongoose.set('transactionAsyncLocalStorage', true);
}

export const connection: RedisConnection = {
    host: config.get('redisHost'),
    port: parseInt(config.get('redisPort'))
};

interface RedisConnection {
    host: string;
    port: number;
}