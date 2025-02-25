import { AppResponseSuccess, AppResponseError } from '../app.types.ts';
import { PaginationResponse } from '../pagination/pagination.types.ts';

export type Comment = {
    id: string;
    user_id?: string;
    text: string;
    createdAt: string;
    deleteOn: string;
};

export type CommentDeleteRequest = {
    id: string;
};

export type CommentDeleteResponse = AppResponseSuccess;

export type CommentAddRequest = {
    text: string;
    deleteOn: string;
};

export type CommentEditRequest = CommentAddRequest & {
    id: string;
};

export type CommentAddResponse =
    | ({
          comment: Comment;
      } & AppResponseSuccess)
    | AppResponseError;

export type GetAllCommentsResponse =
    | (AppResponseSuccess & {
          comments: Comment[];
          pagination: PaginationResponse;
      })
    | AppResponseError;
