import { AppResponseError, AppResponseSuccess } from '../app.types.ts';
import { PaginationResponse } from '../pagination/pagination.types.ts';

export type User = {
    id: string;
    name: string;
    createdAt: string;
};

export type GetAllUsersResponse =
    | (AppResponseSuccess & {
          users: User[];
          pagination: PaginationResponse;
      })
    | AppResponseError;
