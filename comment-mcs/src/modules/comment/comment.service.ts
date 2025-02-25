import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { Repository } from 'typeorm';
import { AddCommentReqDto } from './dto/addComment.req.dto';
import { AppErrorResDto } from '../../dto/app.res.dto';
import {
    AppResponse,
    CommentDeleteOnOptions,
    UserRoles,
} from '../../constants/app.constants';
import { AddCommentResDto } from './dto/addComment.res.dto';
import {
    addPaginationInfo,
    preparePaginationQuery,
} from '../../utils/pagination.utils';
import { GetAllCommentsReqDto } from './dto/getAllComments.req.dto';
import { GetAllCommentsResDto } from './dto/getAllComments.res.dto';
import { EditCommentReqDto } from './dto/editComment.req.dto';
import { EditCommentResDto } from './dto/editComment.res.dto';
import { appResponseError } from '../../utils/app-response.util';
import { ERROR_RESPONSES } from '../../constants/errors.constants';
import { DeleteCommentResDto } from './dto/deleteComment.res.dto';
import { DeleteCommentReqDto } from './dto/deleteComment.req.dto';

@Injectable()
export class CommentService {
    private readonly logger = new Logger('CommentService');
    constructor(
        @InjectRepository(CommentEntity)
        private readonly commentRepository: Repository<CommentEntity>,
    ) {}

    async getAllComments(
        reqDto: GetAllCommentsReqDto,
    ): Promise<GetAllCommentsResDto | AppErrorResDto> {
        const preparedQuery = preparePaginationQuery(reqDto);
        const query = this.commentRepository.createQueryBuilder('comment');
        if (reqDto.roleId !== (UserRoles.ADMIN as number)) {
            query.where('comment.userId = :userId', { userId: reqDto.userId });
        }
        query.orderBy('comment.createdAt', preparedQuery.order);
        query.skip(preparedQuery.offset).take(preparedQuery.limit);
        const [comments, count] = await Promise.all([
            query
                .select([
                    'comment.id',
                    'comment.text',
                    'comment.createdAt',
                    'comment.deleteOn',
                    'comment.userId',
                ])
                .getMany(),
            query.getCount(),
        ]);
        const pagination = addPaginationInfo(preparedQuery, count);
        return {
            message: AppResponse.SUCCESS,
            comments,
            pagination,
        };
    }

    async addComment(
        reqDto: AddCommentReqDto,
    ): Promise<AppErrorResDto | AddCommentResDto> {
        const deleteOn = this.generateDeleteOnDate(reqDto.deleteOn);
        const comment = await this.commentRepository
            .create({ ...reqDto, deleteOn: deleteOn })
            .save();

        return {
            message: AppResponse.SUCCESS,
            comment: {
                id: comment.id,
                deleteOn: comment.deleteOn,
                createdAt: comment.createdAt,
                text: comment.text,
                userId: comment.userId,
            },
        };
    }

    async deleteComment(
        reqDto: DeleteCommentReqDto,
    ): Promise<DeleteCommentResDto | AppErrorResDto> {
        await this.commentRepository.delete({
            id: reqDto.id,
            userId: reqDto.userId,
        });

        return { message: AppResponse.SUCCESS };
    }

    async editComment(
        reqDto: EditCommentReqDto,
    ): Promise<AppErrorResDto | EditCommentResDto> {
        // first get comment, for initial createdAt and check userId
        const comment = await this.commentRepository.findOne({
            where: { id: reqDto.id },
            select: ['createdAt', 'userId', 'id'],
        });

        if (!comment) {
            return appResponseError(ERROR_RESPONSES.COMMENT.NO_COMMENT_FOUND);
        }

        if (reqDto.userId !== comment.userId) {
            return appResponseError(ERROR_RESPONSES.COMMENT.FORBIDDEN);
        }

        const deleteOn = this.generateDeleteOnDate(
            reqDto.deleteOn,
            comment.createdAt,
        );

        await this.commentRepository.update(
            { id: reqDto.id },
            { deleteOn: deleteOn, text: reqDto.text },
        );

        return {
            message: AppResponse.SUCCESS,
            comment: { ...comment, text: reqDto.text, deleteOn },
        };
    }

    private generateDeleteOnDate(
        deleteOn: (typeof CommentDeleteOnOptions)[number],
        initDate?: Date,
    ): Date | undefined {
        let deleteOnDate: Date | undefined = initDate ?? new Date();
        switch (deleteOn) {
            case '1h':
                deleteOnDate = new Date(
                    deleteOnDate.setHours(deleteOnDate.getHours() + 1),
                );
                break;
            case '1d':
                deleteOnDate = new Date(
                    deleteOnDate.setDate(deleteOnDate.getDate() + 1),
                );
                break;
            case '1w':
                deleteOnDate = new Date(
                    deleteOnDate.setDate(deleteOnDate.getDate() + 7),
                );
                break;
            case 'disabled':
                deleteOnDate = undefined;
                break;
            default:
                deleteOnDate = undefined;
        }
        return deleteOnDate;
    }
}
