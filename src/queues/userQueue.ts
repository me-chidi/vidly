import { connection } from '#startup/db';
import { Queue } from 'bullmq';

const userQueue = new Queue('userQueue', { connection });

export default userQueue;