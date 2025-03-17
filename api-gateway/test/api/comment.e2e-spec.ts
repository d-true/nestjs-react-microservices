import * as request from 'supertest';
import * as process from 'node:process';
import { LoginResDto } from '../../src/api/auth/dto/login.res.dto';
import { AddCommentReqDto } from '../../src/api/comment/dto/addComment.req.dto';
import { AddCommentResDto } from '../../src/api/comment/dto/addComment.res.dto';
import { EditCommentResDto } from '../../src/api/comment/dto/editComment.res.dto';
import { DeleteCommentResDto } from '../../src/api/comment/dto/deleteComment.res.dto';
import { AppResponse } from '../../src/common/constants/app.constants';

describe('API Comment Module', () => {
    const app = process.env.APP_URL as string;
    const userEmail = `admin@admin.com`;
    const userPassword = `12345678`;

    const comment: AddCommentReqDto = {
        text: 'text',
        deleteOn: '1h',
    };

    describe('Profile actions', () => {
        let accessToken: LoginResDto['accessToken'];
        let commentId: string;

        beforeAll(async () => {
            await request(app)
                .post('/api/auth/login')
                .send({ email: userEmail, password: userPassword })
                .then(({ body }: { body: LoginResDto }) => {
                    accessToken = body.accessToken;
                });
        });

        it('should add comment: /api/profile (POST)', () => {
            return request(app)
                .post('/api/comment')
                .auth(accessToken, {
                    type: 'bearer',
                })
                .send(comment)
                .then(({ body: { comment } }: { body: AddCommentResDto }) => {
                    commentId = comment.id;
                    expect(comment.id).toBeDefined();
                    expect(comment.userId).toBeDefined();
                    expect(comment.text).toBeDefined();
                    expect(comment.createdAt).toBeDefined();
                    expect(comment.deleteOn).toBeDefined();
                });
        });

        it('should update comment: /api/profile (POST)', () => {
            return request(app)
                .put('/api/comment')
                .auth(accessToken, {
                    type: 'bearer',
                })
                .send({ ...comment, id: commentId })
                .then(({ body: { comment } }: { body: EditCommentResDto }) => {
                    expect(comment.id).toBeDefined();
                    expect(comment.userId).toBeDefined();
                    expect(comment.text).toBeDefined();
                    expect(comment.createdAt).toBeDefined();
                    expect(comment.deleteOn).toBeDefined();
                });
        });

        it('should delete comment: /api/profile (POST)', () => {
            return request(app)
                .delete('/api/comment')
                .auth(accessToken, {
                    type: 'bearer',
                })
                .send({ id: commentId })
                .then(({ body }: { body: DeleteCommentResDto }) => {
                    expect(body.message).toBe(AppResponse.SUCCESS);
                });
        });
    });
});
