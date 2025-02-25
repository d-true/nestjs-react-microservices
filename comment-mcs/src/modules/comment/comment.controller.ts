import { Controller } from '@nestjs/common';
import { CommentService } from './comment.service';
import { MessagePattern } from '@nestjs/microservices';
import { AppErrorResDto } from '../../dto/app.res.dto';
import { AddCommentReqDto } from './dto/addComment.req.dto';
import { AddCommentResDto } from './dto/addComment.res.dto';
import { GetAllCommentsResDto } from './dto/getAllComments.res.dto';
import { GetAllCommentsReqDto } from './dto/getAllComments.req.dto';
import { EditCommentReqDto } from './dto/editComment.req.dto';
import { DeleteCommentResDto } from './dto/deleteComment.res.dto';
import { DeleteCommentReqDto } from './dto/deleteComment.req.dto';

@Controller()
export class CommentController {
    constructor(private readonly commentService: CommentService) {}
    @MessagePattern('add_comment')
    async addComment(
        reqDto: AddCommentReqDto,
    ): Promise<AddCommentResDto | AppErrorResDto> {
        return this.commentService.addComment(reqDto);
    }

    @MessagePattern('edit_comment')
    async editComment(
        reqDto: EditCommentReqDto,
    ): Promise<AddCommentResDto | AppErrorResDto> {
        return this.commentService.editComment(reqDto);
    }

    @MessagePattern('delete_comment')
    async deleteComment(
        reqDto: DeleteCommentReqDto,
    ): Promise<DeleteCommentResDto | AppErrorResDto> {
        return this.commentService.deleteComment(reqDto);
    }

    @MessagePattern('get_all_comments')
    async getAllComments(
        reqDto: GetAllCommentsReqDto,
    ): Promise<GetAllCommentsResDto | AppErrorResDto> {
        return this.commentService.getAllComments(reqDto);
    }
}
