import { registerAs } from '@nestjs/config';
import * as process from 'node:process';
import { MicroservicesConfig } from './config.type';
import { Transport } from '@nestjs/microservices';

export default registerAs<MicroservicesConfig>('microservices', () => {
    console.info(`Register MicroserviceConfig from environment variables`);
    return {
        userService: {
            options: {
                host: process.env.USER_SERVICE_HOST || 'localhost',
                port: process.env.USER_SERVICE_PORT
                    ? Number(process.env.USER_SERVICE_PORT)
                    : 3010,
            },
            transport: Transport.TCP,
        },
        commentService: {
            options: {
                host: process.env.COMMENT_SERVICE_HOST || 'localhost',
                port: process.env.COMMENT_SERVICE_PORT
                    ? Number(process.env.COMMENT_SERVICE_PORT)
                    : 3011,
            },
            transport: Transport.TCP,
        },
    };
});
