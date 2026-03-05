const { Queue } = require('bullmq');

const userQueue = new Queue('userQueue', {
    connection: {
        host: 'localhost',
        port: 6379
    }
});

module.exports = userQueue;