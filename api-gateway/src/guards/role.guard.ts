import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { Roles } from '../common/decorators/role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const role = this.reflector.get(Roles, context.getHandler());
        const request: Request = context.switchToHttp().getRequest();

        if (!role) {
            return true;
        }

        return !(!request['user'] || request['user'].role !== role);
    }
}
