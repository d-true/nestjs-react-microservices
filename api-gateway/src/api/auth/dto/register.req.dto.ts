import {
    IsString,
    IsEmail,
    IsStrongPassword,
    MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {ApiCommonType} from "../../../common/decorators/field.decorators";

export class RegisterReqDto {
    @ApiCommonType(IsEmail())
    email!: string;
    @ApiProperty({
        minLength: 8,
    })
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 0,
        minNumbers: 0,
        minSymbols: 0,
        minUppercase: 0,
        // minLowercase: 1,
        // minNumbers: 1,
        // minSymbols: 1,
        // minUppercase: 1
    })
    password!: string;
    @ApiProperty({
        minLength: 3,
    })
    @MinLength(3)
    @IsString()
    name!: string;
}
