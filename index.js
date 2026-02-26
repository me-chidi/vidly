const logger = require('./startup/logging');
const express = require('express');
const app = express();

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);  // might want to conditionally load this module
require('./workers/customerWorker');


// Promise.reject(new Error('Something failed misreably'));
// throw new Error('Something failed during startup');

const port = process.env.PORT || 5000;
const server = app.listen(port, () => logger.info(`Listening on ${port}...`));

module.exports = server;