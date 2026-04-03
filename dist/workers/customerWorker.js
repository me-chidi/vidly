"use strict";
const { connection } = require('../startup/db');
const logger = require('../startup/logging');
const { Worker } = require('bullmq');
const { Customer } = require('../models/customer');
const worker = new Worker('userQueue', async (job) => {
    if (job.name === 'userCreated') {
        await Customer.insertOne({
            userId: job.data._id,
            name: job.data.name,
        });
    }
}, { connection });
worker.on('error', err => {
    logger.error('Worker error:', err);
});
worker.on('completed', job => {
    logger.info(`Job [${job.name}:${job.id}] has completed!`);
});
worker.on('failed', (job, err) => {
    logger.error(`Job [${job.name}:${job.id}] has failed with error:: ${err.message}`);
});
module.exports = worker;
//# sourceMappingURL=customerWorker.js.map