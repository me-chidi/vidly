process.env.ALLOW_CONFIG_MUTATIONS = 'true';

import config, { IConfig } from 'config';

interface VidlyConfig extends IConfig {
  db?: string | undefined;
}

const vidlyConfig = config as VidlyConfig;
vidlyConfig.db = process.env.MONGO_URI_TEST;
