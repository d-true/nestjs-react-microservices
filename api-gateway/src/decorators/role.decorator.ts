import { Reflector } from '@nestjs/core';
import { UserRoles } from '../constants/app.constants';

export const Roles = Reflector.createDecorator<UserRoles>();
