import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, CustomClientOptions } from '@nestjs/microservices';
import { USER_SERVICE } from '../../constants/app.constants';

@Module({
    imports: [],
    controllers: [UserController],
    providers: [
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
export class UserModule {}
