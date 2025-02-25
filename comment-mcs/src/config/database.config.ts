import { registerAs } from '@nestjs/config';
import { DatabaseConfig } from './config.type';

export default registerAs<DatabaseConfig>('database', () => {
    console.info(`Register DatabaseConfig from environment variables`);

    return {
        type: process.env.DATABASE_TYPE || 'postgres',
        host: process.env.DATABASE_HOST || 'localhost',
        port: Number(process.env.DATABASE_PORT) || 5432,
        username: process.env.DATABASE_USERNAME || 'postgres',
        password: process.env.DATABASE_PASSWORD || '',
        name: process.env.DATABASE_NAME || 'comment-mcs',
        maxConnections: Number(process.env.DATABASE_MAX_CONNECTIONS) || 100,
    };
});
