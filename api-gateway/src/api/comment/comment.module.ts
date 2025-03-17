import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, CustomClientOptions } from '@nestjs/microservices';
import { COMMENT_SERVICE, USER_SERVICE } from '../../common/constants/app.constants';

@Module({
    imports: [],
    controllers: [CommentController],
    providers: [
        {
            provide: COMMENT_SERVICE,
            useFactory: (configService: ConfigService) => {
                const commentServiceOptions =
                    configService.getOrThrow<CustomClientOptions>(
                        'microservices.commentService',
                    );
                return ClientProxyFactory.create(commentServiceOptions);
            },
            inject: [ConfigService],
        },
        // for auth guard
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
export class CommentModule {}
