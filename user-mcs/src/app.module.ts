import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { DbModule } from './database/database.module';
import { LogModule } from './logger/logger.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [appConfig, databaseConfig],
            envFilePath: ['.env'],
        }),
        UserModule,
        AuthModule,
        DbModule,
        LogModule,
    ],
})
export class AppModule {}
