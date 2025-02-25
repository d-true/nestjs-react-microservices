import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { ProfileDto } from '../api/profile/dto/profile.dto';

export const User = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest<Request>();
        const user = request['user'] as ProfileDto; // request['user'] is set in the AuthGuard

        if (data && user[data]) {
            return user[data as keyof ProfileDto];
        } else {
            return user;
        }
    },
);
