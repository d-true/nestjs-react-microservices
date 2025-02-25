import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const Cookies = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest();

        if (data) {
            if (request.cookies?.[data]) {
                return (request.cookies as Record<string, string>)[data];
            } else {
                return null;
            }
        } else {
            return request.cookies;
        }
    },
);
