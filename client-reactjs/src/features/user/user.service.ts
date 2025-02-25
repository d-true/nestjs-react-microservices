import fetchRequest from '../fetch/fetch-request.ts';
import React, { SetStateAction } from 'react';
import { GetAllUsersResponse, User } from './user.types.ts';
import fetchErrorHandler from '../fetch/fetch-error-handler.ts';
import { PaginationResponse } from '../pagination/pagination.types.ts';

export async function getAllUsers({
    setUsers,
    setPagination,
    searchParams,
}: {
    setUsers: React.Dispatch<SetStateAction<User[]>>;
    setPagination: React.Dispatch<SetStateAction<PaginationResponse | null>>;
    searchParams: URLSearchParams;
}) {
    try {
        const result = await fetchRequest<GetAllUsersResponse>(
            '/user' +
                (searchParams.size > 0 ? '?' + searchParams.toString() : ''),
            {
                method: 'GET',
            },
        );

        if (result.message === 'OK') {
            setUsers(result.users);
            setPagination(result.pagination);
        } else {
            fetchErrorHandler(result);
        }
    } catch (e) {
        fetchErrorHandler(e);
    }
}
