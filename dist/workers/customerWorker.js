"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("#startup/db");
const logging_1 = __importDefault(require("#startup/logging"));
const customer_model_1 = require("#customer/customer.model");
const bullmq_1 = require("bullmq");
function setUpCustomerWorker() {
    const worker = new bullmq_1.Worker('userQueue', async (job) => {
        if (job.name === 'userCreated') {
            await customer_model_1.Customer.create({
                userId: job.data._id,
                name: job.data.name,
            });
        }
    }, { connection: db_1.connection });
    worker.on('error', (err) => {
        logging_1.default.error('Worker error:', err);
    });
    worker.on('completed', (job) => {
        logging_1.default.info(`Job [${job.name}:${job.id}] has completed!`);
    });
    worker.on('failed', (job, err) => {
        logging_1.default.error(`Job [${job?.name}:${job?.id}] has failed with error:: ${err.message}`);
    });
}
exports.default = setUpCustomerWorker;
