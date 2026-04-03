"use strict";
const { connection } = require('../startup/db');
const { Queue } = require('bullmq');
const userQueue = new Queue('userQueue', { connection });
module.exports = userQueue;
//# sourceMappingURL=userQueue.js.map