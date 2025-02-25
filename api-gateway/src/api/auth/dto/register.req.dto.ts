import {
    IsString,
    IsEmail,
    IsStrongPassword,
    MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterReqDto {
    @ApiProperty()
    @IsEmail()
    email!: string;
    @ApiProperty()
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
    @ApiProperty()
    @MinLength(3)
    @IsString()
    name!: string;
}
