import { connection } from '#startup/db';
import logger from '#startup/logging';
import { Customer } from '#models/customer';
import { Worker, Job } from 'bullmq';

function setUpCustomerWorker() {
    const worker = new Worker('userQueue', async (job: Job) => {
        if (job.name === 'userCreated') {
            await Customer.create({
                userId: job.data._id,
                name: job.data.name,
            });
        }
    }, { connection });

    worker.on('error', (err: Error) => {
        logger.error('Worker error:', err);
    });

    worker.on('completed', (job: Job) => {
        logger.info(`Job [${job.name}:${job.id}] has completed!`);
    });

    worker.on('failed', (job: Job<any, void, string> | undefined, err: Error) => {
        logger.error(`Job [${job?.name}:${job?.id}] has failed with error:: ${err.message}`);
    });
}

export default setUpCustomerWorker;