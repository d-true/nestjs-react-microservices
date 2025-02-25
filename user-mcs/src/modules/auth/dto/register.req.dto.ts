import { IsString, IsEmail } from 'class-validator';

export class RegisterReqDto {
    @IsEmail()
    email!: string;
    @IsString()
    password!: string;
    @IsString()
    name!: string;
}
