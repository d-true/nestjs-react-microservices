import { ApiProperty, PartialType } from '@nestjs/swagger';
import { AppResponse } from '../../../constants/app.constants';
import { TokenResDto } from './token.res.dto';
import { UserAuthResDto } from './user.auth.res.dto';

export class RefreshTokenResDto extends PartialType(TokenResDto) {
    @ApiProperty()
    message!: AppResponse.SUCCESS;
    @ApiProperty()
    user!: UserAuthResDto | null;
}
