import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../config/config.type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService<AllConfigType>) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: this.configService.get('database.type', { infer: true }),
            host: this.configService.get('database.host', { infer: true }),
            port: this.configService.get('database.port', { infer: true }),
            username: this.configService.get('database.username', {
                infer: true,
            }),
            password: this.configService.get('database.password', {
                infer: true,
            }),
            database: this.configService.get('database.name', { infer: true }),
            dropSchema: false,
            keepConnectionAlive: true,
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
            migrationsTableName: 'migrations',
            poolSize: this.configService.get('database.maxConnections', {
                infer: true,
            }),
            synchronize: false,
            logging: true,
        } as TypeOrmModuleOptions;
    }
}
