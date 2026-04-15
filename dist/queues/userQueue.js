"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("#startup/db");
const bullmq_1 = require("bullmq");
const userQueue = new bullmq_1.Queue('userQueue', { connection: db_1.connection });
exports.default = userQueue;
