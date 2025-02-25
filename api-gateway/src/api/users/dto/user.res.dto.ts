import { ApiProperty } from '@nestjs/swagger';

export class UserResDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    id: string;
    @ApiProperty()
    createdAt: Date;
}
