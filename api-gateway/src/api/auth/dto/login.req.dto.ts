import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginReqDto {
    @IsString()
    @ApiProperty()
    email!: string;
    @IsString()
    @ApiProperty()
    password!: string;
}
