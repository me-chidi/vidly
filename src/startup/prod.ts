import type { Application } from '#types/index';

import helmet from 'helmet';
import compression from 'compression';

export default function prodSettings(app: Application): void{
    app.use(helmet());
    app.use(compression());
}