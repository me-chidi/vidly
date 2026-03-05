const mongoose = require('mongoose');
const logger = require('./logging');
const config = require('config');

module.exports = function() {
    const db = config.get('db'); 
    mongoose.connect(db)
        .then(() => logger.info(`Connected to ${db}...`))
        .catch((err) => logger.error('Could not connect to MongoDB...', err));
    mongoose.set('transactionAsyncLocalStorage', true);
}