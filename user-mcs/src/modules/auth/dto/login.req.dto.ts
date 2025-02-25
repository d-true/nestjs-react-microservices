import { IsString, IsEmail } from 'class-validator';

export class LoginReqDto {
    @IsEmail()
    email!: string;
    // strong password validates on gateway api
    @IsString()
    password!: string;
}
