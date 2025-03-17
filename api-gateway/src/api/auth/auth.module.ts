import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, CustomClientOptions } from '@nestjs/microservices';
import { USER_SERVICE } from '../../common/constants/app.constants';
import { AuthService } from './auth.service';

@Module({
    imports: [],
    controllers: [AuthController],
    providers: [
        AuthService,
        {
            provide: USER_SERVICE,
            useFactory: (configService: ConfigService) => {
                const userServiceOptions =
                    configService.getOrThrow<CustomClientOptions>(
                        'microservices.userService',
                    );
                return ClientProxyFactory.create(userServiceOptions);
            },
            inject: [ConfigService],
        },
    ],
})
export class AuthModule {}
