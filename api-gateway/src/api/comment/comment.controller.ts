import {
    Controller,
    Post,
    HttpCode,
    HttpStatus,
    Inject,
    Body,
    UseGuards,
    Get,
    Query,
    Put,
    Delete,
} from '@nestjs/common';
import { AddCommentResDto } from './dto/addComment.res.dto';
import { ApiExtraModels, ApiOkResponse, refs } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { COMMENT_SERVICE } from '../../constants/app.constants';
import { AppErrorResDto } from '../../dto/app.res.dto';
import { AuthGuard } from '../../guards/auth.guard';
import { AddCommentReqDto } from './dto/addComment.req.dto';
import { User } from '../../decorators/user.decorator';
import { GetAllCommentsReqDto } from './dto/getAllComments.req.dto';
import { EditCommentReqDto } from './dto/editComment.req.dto';
import { EditCommentResDto } from './dto/editComment.res.dto';
import { DeleteCommentReqDto } from './dto/deleteComment.req.dto';
import { GetAllCommentsResDto } from './dto/getAllComments.res.dto';
import { ValidationPipe } from '@nestjs/common';

@Controller('comment')
@ApiExtraModels(
    AppErrorResDto,
    AddCommentResDto,
    EditCommentReqDto,
    GetAllCommentsReqDto,
    DeleteCommentReqDto,
)
@UseGuards(AuthGuard)
export class CommentController {
    constructor(
        @Inject(COMMENT_SERVICE)
        private readonly commentServiceClient: ClientProxy,
    ) {}

    @Post()
    @ApiOkResponse({
        schema: { anyOf: refs(AddCommentResDto, AppErrorResDto) },
    })
    @HttpCode(HttpStatus.CREATED)
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
    @ApiOkResponse({
        schema: { anyOf: refs(EditCommentReqDto, AppErrorResDto) },
    })
    @HttpCode(HttpStatus.OK)
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
    @ApiOkResponse({
        schema: { anyOf: refs(DeleteCommentReqDto, AppErrorResDto) },
    })
    @HttpCode(HttpStatus.OK)
    async deleteComment(
        @Body() reqDto: DeleteCommentReqDto,
        @User('id') userId: string,
    ): Promise<DeleteCommentReqDto | AppErrorResDto> {
        return firstValueFrom(
            this.commentServiceClient.send('delete_comment', {
                userId: userId,
                ...reqDto,
            }),
        );
    }

    @Get()
    @ApiOkResponse({
        schema: { anyOf: refs(GetAllCommentsResDto, AppErrorResDto) },
    })
    @HttpCode(HttpStatus.OK)
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
