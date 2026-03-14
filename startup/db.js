const mongoose = require('mongoose');
const logger = require('./logging');
const config = require('config');

module.exports.db = function() {
    const db = config.get('db'); 
    const connectWithRetry = function() {
        logger.info('Attempting to connect to MongoDB Replica Set...');
        
        mongoose.connect(db, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4,
        })
        .then(() => {
            logger.info(`Connected to ${db}...`);
        })
        .catch((err) => {
            logger.error(`MongoDB connection unsuccessful, retrying in 5 seconds...\nmessage: ${err.message}`);
            setTimeout(connectWithRetry, 5000);
        });
    };

    connectWithRetry();
    mongoose.set('transactionAsyncLocalStorage', true);
}

module.exports.connection = {
    host: config.get('redisHost'),
    port: parseInt(config.get('redisPort'))
};