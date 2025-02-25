import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './typeorm-config.service';
import { DataSource, DataSourceOptions } from 'typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmConfigService,
            dataSourceFactory: async (options: DataSourceOptions) => {
                if (!options) {
                    throw new Error('Invalid options passed');
                }
                return new DataSource(options).initialize();
            },
        }),
    ],
})
export class DbModule {}
