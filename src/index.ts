import routes from '#startup/routes';
import db from '#startup/db';
import validateConfig from '#startup/config';
import prodSettings from '#startup/prod';
import logger from '#startup/logging';
import setUpCustomerWorker from '#workers/customerWorker';
import express from 'express';
const app = express();

routes(app);
db();
validateConfig();
prodSettings(app);
setUpCustomerWorker();

const port = process.env.PORT || 5000;
const server = app.listen(port, () => logger.info(`Listening on ${port}...`));

export default server;