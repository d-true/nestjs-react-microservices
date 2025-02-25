import { PaginationReqDto } from '../dto/pagination.req.dto';
import {
    DEFAULT_CURRENT_PAGE,
    DEFAULT_PAGE_LIMIT,
    MAX_PAGINATION_LIMIT,
    Order,
} from '../constants/app.constants';
import { PaginationResDto } from '../dto/pagination.res.dto';
import { UnprocessableEntityException } from '@nestjs/common';

export function preparePaginationQuery(
    paginationDto: PaginationReqDto,
): PaginationReqDto {
    paginationDto.order =
        paginationDto.order === Order.ASC ? Order.ASC : Order.DESC;
    paginationDto.page ??= DEFAULT_CURRENT_PAGE;
    paginationDto.limit ??= DEFAULT_PAGE_LIMIT;
    if (paginationDto.limit > MAX_PAGINATION_LIMIT) {
        paginationDto.limit = DEFAULT_CURRENT_PAGE;
    }
    paginationDto.offset = (paginationDto.page - 1) * paginationDto.limit;
    return paginationDto;
}

export function addPaginationInfo(
    paginationDto: PaginationReqDto,
    count: number,
): PaginationResDto {
    if (!paginationDto.limit) {
        throw new UnprocessableEntityException();
    }

    return {
        currentPage: Number(paginationDto.page),
        totalPages:
            paginationDto.limit > 0
                ? Math.ceil(count / paginationDto.limit)
                : 0,
    };
}
