import { ApiProperty, PartialType } from '@nestjs/swagger';
import { AppResponse } from '../../../common/constants/app.constants';
import { TokenResDto } from './token.res.dto';
import { UserAuthResDto } from './user.auth.res.dto';
import { ApiEnumType } from '../../../common/decorators/field.decorators';
import {Type} from "class-transformer";

export class RefreshTokenResDto extends PartialType(TokenResDto) {
    @ApiEnumType(AppResponse.SUCCESS)
    message!: AppResponse.SUCCESS;
    @ApiProperty({
        nullable: true,
        type: UserAuthResDto,
    })
    @Type(() => UserAuthResDto)
    user!: UserAuthResDto | null;
}
