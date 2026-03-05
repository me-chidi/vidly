const logger = require('../../startup/logging');
const _ = require('lodash');
const { QueueEvents, Job } = require('bullmq');
const { Customer } = require('../../models/customer');
const { User } = require('../../models/user');
const userQueue = require('../../queues/userQueue');
const worker = require('../../workers/customerWorker');

jest.setTimeout(20000);

describe('on userCreated', () => {
    let user;
    let userEvents;
    let jobId;

    beforeEach(async () => {
        require('../../startup/db')();
        await userQueue.waitUntilReady();
        logger.info('userQueue is ready');

        user = await User.insertOne({
            name: 'user1',
            email: 'user1@domain.com',
            password: 'password',
        });
        userEvents = new QueueEvents('userQueue');

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
        const job = await Job.fromId(userQueue, jobId);
        expect(job).toBeDefined();
        
        await job.waitUntilFinished(userEvents, 20000);

        const customer = await Customer.findOne({ userId: user._id, name: user.name });
        expect(customer).not.toBeNull();
    });
});