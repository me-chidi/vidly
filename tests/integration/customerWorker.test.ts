import type { UserDocument } from '#types/index';

import logger from '#startup/logging';
import { Customer } from '#models/customer';
import { User } from '#models/user';
import userQueue from '#queues/userQueue';
import worker from '#workers/customerWorker';
import db from '#startup/db';
import _ from 'lodash';
import config from 'config';
import { QueueEvents, Job } from 'bullmq';

jest.setTimeout(20000);

describe('on userCreated', () => {
    let user: UserDocument;
    let userEvents: QueueEvents;
    let jobId: string | undefined;

    beforeEach(async () => {
        db();
        await userQueue.waitUntilReady();
        logger.info('userQueue is ready');

        user = await User.create({
            name: 'user1',
            email: 'user1@domain.com',
            password: 'password',
        });
        userEvents = new QueueEvents('userQueue', { connection: {
            host: config.get('redisHost'),
            port: parseInt(config.get('redisPort'))
        }});

        const addedJob = await userQueue.add('userCreated', _.pick(user, ['_id', 'name']));
        jobId = addedJob.id;
    });
    afterEach(async () => {
        await worker.close();
        await userQueue.close();
        await User.deleteMany({});
        await Customer.deleteMany({});
    });

    it('should create a new customer with the given users ID', async () => {
        const job = await Job.fromId(userQueue, jobId as string);
        expect(job).toBeDefined();
        
        await job?.waitUntilFinished(userEvents, 20000);

        const customer = await Customer.findOne({ userId: user._id, name: user.name });
        expect(customer).not.toBeNull();
    });
});
