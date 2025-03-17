import { ApiProperty } from '@nestjs/swagger';
import {IsInt} from "class-validator";

export class PaginationResDto {
    @ApiProperty()
    @IsInt()
    totalPages!: number;
    @ApiProperty()
    @IsInt()
    currentPage!: number;
}
