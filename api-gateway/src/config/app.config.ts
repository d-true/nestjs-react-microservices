import { registerAs } from '@nestjs/config';
import { Environment } from '../constants/app.constants';
import { AppConfig } from './config.type';
import * as process from 'node:process';

export default registerAs<AppConfig>('app', () => {
    console.info(`Register AppConfig from environment variables`);
    const port = Number(process.env.APP_PORT) || 3000;
    return {
        nodeEnv: process.env.NODE_ENV || Environment.DEVELOPMENT,
        name: process.env.APP_NAME || 'app',
        url: process.env.APP_URL || `http://localhost:${port}`,
        port,
        debug: process.env.APP_DEBUG === 'true',
        apiPrefix: process.env.API_PREFIX || 'api',
        logLevel: process.env.APP_LOG_LEVEL || 'warn',
        logFile: process.env.APP_LOG_FILE === 'true',
        logFilePath: process.env.APP_LOG_FILE_PATH,
        logFileSize: process.env.APP_LOG_FILE_SIZE || '1m',
        logFileLimit: process.env.APP_LOG_FILE_LIMIT
            ? Number(process.env.APP_LOG_FILE_LIMIT)
            : 100,
        corsOrigin: getCorsOrigin(),
    };
});

function getCorsOrigin() {
    const corsOrigin = process.env.APP_CORS_ORIGIN || 'http://localhost:5173';
    if (corsOrigin === 'true') return true;
    if (corsOrigin === '*') return '*';
    if (!corsOrigin || corsOrigin === 'false') return false;

    return corsOrigin.split(',').map((origin) => origin.trim());
}
