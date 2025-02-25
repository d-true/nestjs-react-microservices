import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserAuthResDto {
    @ApiProperty()
    @IsString()
    id: string;
    @ApiProperty()
    @IsInt()
    roleId: number;
}
