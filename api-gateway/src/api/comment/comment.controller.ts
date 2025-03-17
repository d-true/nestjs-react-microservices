import {
    Controller,
    Post,
    Inject,
    Body,
    UseGuards,
    Get,
    Query,
    Put,
    Delete,
} from '@nestjs/common';
import { AddCommentResDto } from './dto/addComment.res.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { COMMENT_SERVICE } from '../../common/constants/app.constants';
import { AppErrorResDto } from '../../common/dto/app.res.dto';
import { AuthGuard } from '../../guards/auth.guard';
import { AddCommentReqDto } from './dto/addComment.req.dto';
import { User } from '../../common/decorators/user.decorator';
import { GetAllCommentsReqDto } from './dto/getAllComments.req.dto';
import { EditCommentReqDto } from './dto/editComment.req.dto';
import { EditCommentResDto } from './dto/editComment.res.dto';
import { DeleteCommentReqDto } from './dto/deleteComment.req.dto';
import { GetAllCommentsResDto } from './dto/getAllComments.res.dto';
import {DeleteCommentResDto} from "./dto/deleteComment.res.dto";
import {CreatedResponseType, OkResponseType} from "../../common/decorators/field.decorators";

@Controller('comment')
@UseGuards(AuthGuard)
export class CommentController {
    constructor(
        @Inject(COMMENT_SERVICE)
        private readonly commentServiceClient: ClientProxy,
    ) {}

    @Post()
    @CreatedResponseType(AddCommentResDto, AppErrorResDto)
    async addComment(
        @Body() reqDto: AddCommentReqDto,
        @User('id') userId: string,
    ): Promise<AddCommentResDto | AppErrorResDto> {
        return firstValueFrom(
            this.commentServiceClient.send('add_comment', {
                userId: userId,
                ...reqDto,
            }),
        );
    }

    @Put()
    @OkResponseType(EditCommentReqDto, AppErrorResDto)
    async editComment(
        @Body() reqDto: EditCommentReqDto,
        @User('id') userId: string,
    ): Promise<EditCommentResDto | AppErrorResDto> {
        return firstValueFrom(
            this.commentServiceClient.send('edit_comment', {
                userId: userId,
                ...reqDto,
            }),
        );
    }

    @Delete()
    @OkResponseType(DeleteCommentResDto, AppErrorResDto)
    async deleteComment(
        @Body() reqDto: DeleteCommentReqDto,
        @User('id') userId: string,
    ): Promise<DeleteCommentResDto | AppErrorResDto> {
        return firstValueFrom(
            this.commentServiceClient.send('delete_comment', {
                userId: userId,
                ...reqDto,
            }),
        );
    }

    @Get()
    @OkResponseType(GetAllCommentsResDto, AppErrorResDto)
    async getAllComments(
        @Query() reqDto: GetAllCommentsReqDto,
        @User('role') roleId: number,
        @User('id') userId: string,
    ): Promise<GetAllCommentsResDto | AppErrorResDto> {
        return firstValueFrom(
            this.commentServiceClient.send('get_all_comments', {
                userId,
                roleId,
                ...reqDto,
            }),
        );
    }
}
