process.env.ALLOW_CONFIG_MUTATIONS = 'true';

const config = require('config');

config.db = process.env.MONGO_URI_TEST;