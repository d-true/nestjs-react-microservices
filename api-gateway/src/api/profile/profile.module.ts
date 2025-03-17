import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, CustomClientOptions } from '@nestjs/microservices';
import { USER_SERVICE } from '../../common/constants/app.constants';
import { ProfileController } from './profile.controller';

@Module({
    imports: [],
    controllers: [ProfileController],
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
export class ProfileModule {}
