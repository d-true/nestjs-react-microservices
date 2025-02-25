import { registerAs } from '@nestjs/config';
import { Environment } from '../constants/app.constants';
import { AppConfig } from './config.type';
import * as process from 'node:process';

export default registerAs<AppConfig>('app', () => {
    console.info(`Register AppConfig from environment variables`);
    const port = Number(process.env.APP_PORT) || 3010;
    const host = process.env.APP_HOST || 'localhost';
    return {
        nodeEnv: process.env.NODE_ENV || Environment.DEVELOPMENT,
        name: process.env.APP_NAME || 'users-mcs',
        host,
        port,
        url: process.env.APP_URL || `${host}:${port}`,
        debug: process.env.APP_DEBUG === 'true',

        authTokenAccessSecret: process.env.APP_AUTH_TOKEN_ACCESS_SECRET,
        authTokenAccessExpire: process.env.APP_AUTH_TOKEN_ACCESS_EXPIRE
            ? Number(process.env.APP_AUTH_TOKEN_EXPIRE)
            : 1000 * 60 * 60,
        authTokenRefreshSecret: process.env.APP_AUTH_TOKEN_REFRESH_SECRET,
        authTokenRefreshExpire: process.env.APP_AUTH_TOKEN_REFRESH_EXPIRE
            ? Number(process.env.APP_AUTH_TOKEN_EXPIRE)
            : 1000 * 60 * 60 * 24 * 30,
        uploadFilePath: process.env.APP_UPLOAD_FILE_PATH,

        logLevel: process.env.APP_LOG_LEVEL || 'warn',
        logFile: process.env.APP_LOG_FILE === 'true',
        logFilePath: process.env.APP_LOG_FILE_PATH,
        logFileSize: process.env.APP_LOG_FILE_SIZE || '1m',
        logFileLimit: process.env.APP_LOG_FILE_LIMIT
            ? Number(process.env.APP_LOG_FILE_LIMIT)
            : 100,
    };
});
