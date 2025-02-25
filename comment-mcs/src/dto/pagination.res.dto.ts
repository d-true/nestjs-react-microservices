import { ApiProperty } from '@nestjs/swagger';

export class PaginationResDto {
    totalPages: number;
    currentPage: number;
}
