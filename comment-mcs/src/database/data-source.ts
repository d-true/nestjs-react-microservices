import { DataSource } from 'typeorm';
import { DataSourceOptions } from 'typeorm';

export const AppDataSource = new DataSource({
    type: process.env.DATABASE_TYPE || 'postgres',
    url: process.env.DATABASE_URL,
    host: process.env.DATABASE_HOST || 'localhost',
    port: Number(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || 'comment-mcs',
    synchronize: false,
    dropSchema: false,
    keepConnectionAlive: true,
    logging: true,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    migrationsTableName: 'migrations',
    poolSize: Number(process.env.DATABASE_MAX_CONNECTIONS) || 100,
    seeds: [__dirname + '/seeds/**/*{.ts,.js}'],
    seedTracking: true,
    factories: [__dirname + '/factories/**/*{.ts,.js}'],
} as DataSourceOptions);
