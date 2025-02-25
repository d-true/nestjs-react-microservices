// import { DatabaseConfig } from './database.config.type';
// import { RedisConfig } from './redis.config.type';

import { Transport } from '@nestjs/microservices';

export type AllConfigType = {
    app: AppConfig;
    microservices: MicroservicesConfig;
};

export type AppConfig = {
    nodeEnv: string;
    name: string;
    url: string;
    port: number;
    debug: boolean;
    apiPrefix: string;
    logLevel: string;
    logFile: boolean;
    logFilePath?: string;
    logFileLimit: number;
    logFileSize: string;
    corsOrigin: boolean | string | RegExp | (string | RegExp)[];
};

export type MicroservicesConfig = {
    userService: MicroserviceConfig;
    commentService: MicroserviceConfig;
};

export type MicroserviceConfig = {
    options: {
        host: string;
        port: number;
    };
    transport: Transport;
};
