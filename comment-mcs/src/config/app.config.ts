import { registerAs } from '@nestjs/config';
import { Environment } from '../constants/app.constants';
import { AppConfig } from './config.type';
import * as process from 'node:process';

export default registerAs<AppConfig>('app', () => {
    console.info(`Register AppConfig from environment variables`);
    const port = Number(process.env.APP_PORT) || 3011;
    const host = process.env.APP_HOST || 'localhost';
    return {
        nodeEnv: process.env.NODE_ENV || Environment.DEVELOPMENT,
        name: process.env.APP_NAME || 'comment-mcs',
        host,
        port,
        url: process.env.APP_URL || `${host}:${port}`,
        debug: process.env.APP_DEBUG === 'true',

        logLevel: process.env.APP_LOG_LEVEL || 'warn',
        logFile: process.env.APP_LOG_FILE === 'true',
        logFilePath: process.env.APP_LOG_FILE_PATH,
        logFileSize: process.env.APP_LOG_FILE_SIZE || '1m',
        logFileLimit: process.env.APP_LOG_FILE_LIMIT
            ? Number(process.env.APP_LOG_FILE_LIMIT)
            : 100,
    };
});
