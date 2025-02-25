import { ApiProperty } from '@nestjs/swagger';

export class AppErrorResDto {
    @ApiProperty()
    message: 'ERROR';
    @ApiProperty()
    error: string;
}
