import { PaginationReqDto } from '../../../dto/pagination.req.dto';
import { IsString, IsOptional, IsInt } from 'class-validator';

export class GetAllCommentsReqDto extends PaginationReqDto {
    @IsString()
    userId: string;
    @IsOptional()
    @IsInt()
    roleId: number;
}
