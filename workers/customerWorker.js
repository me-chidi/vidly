const logger = require('../startup/logging');
const { Worker } = require('bullmq');
const { Customer } = require('../models/customer');

const worker = new Worker('userEvents', async job => {
    if (job.name === 'userCreated') {
        await Customer.insertOne({
            userId: job.data._id,
            name: job.data.name,
        });
    }
}, { connection: { host: 'localhost', port: 6379 } });

worker.on('error', err => {
    logger.error('Worker error:', err);
});

worker.on('completed', job => {
    logger.info(`Job [${job.name}:${job.id}] has completed!`);
});

worker.on('failed', (job, err) => {
    logger.error(`Job [${job.name}:${job.id}] has failed with error:: ${err.message}`);
});