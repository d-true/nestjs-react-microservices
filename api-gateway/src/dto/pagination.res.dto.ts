import { ApiProperty } from '@nestjs/swagger';

export class PaginationResDto {
    @ApiProperty()
    totalPages: number;
    @ApiProperty()
    currentPage: number;
}
