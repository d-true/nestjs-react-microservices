import fetchRequest from '../fetch/fetch-request.ts';
import fetchErrorHandler from '../fetch/fetch-error-handler.ts';
import {
    Comment,
    CommentAddRequest,
    CommentAddResponse,
    GetAllCommentsResponse,
    CommentDeleteRequest,
    CommentDeleteResponse,
} from './comment.types.ts';
import React, { SetStateAction } from 'react';

import { PaginationResponse } from '../pagination/pagination.types.ts';

export async function getAllComments({
    setComments,
    setPagination,
    searchParams,
}: {
    setComments: React.Dispatch<SetStateAction<Comment[]>>;
    setPagination: React.Dispatch<SetStateAction<PaginationResponse | null>>;
    searchParams: URLSearchParams;
}) {
    try {
        const result = await fetchRequest<GetAllCommentsResponse>(
            '/comment' +
                (searchParams.size > 0 ? '?' + searchParams.toString() : ''),
            {
                method: 'GET',
            },
        );

        if (result.message === 'OK') {
            setComments(result.comments);
            setPagination(result.pagination);
        } else {
            fetchErrorHandler(result);
        }
    } catch (e) {
        fetchErrorHandler(e);
    }
}

export async function addComment({
    data,
    setTriggerRefresh,
}: {
    data: CommentAddRequest;
    setTriggerRefresh: React.Dispatch<SetStateAction<boolean>>;
}): Promise<void> {
    try {
        const result = await fetchRequest<CommentAddResponse>('/comment', {
            method: 'POST',
            body: JSON.stringify(data),
        });

        if (result.message === 'OK') {
            setTriggerRefresh(true);
        } else {
            fetchErrorHandler(result);
        }
    } catch (e) {
        fetchErrorHandler(e);
    }
}

export async function editComment({
    data,
    setTriggerRefresh,
}: {
    data: CommentAddRequest;
    setTriggerRefresh: React.Dispatch<SetStateAction<boolean>>;
}): Promise<void> {
    try {
        const result = await fetchRequest<CommentAddResponse>('/comment', {
            method: 'PUT',
            body: JSON.stringify(data),
        });

        if (result.message === 'OK') {
            setTriggerRefresh(true);
        } else {
            fetchErrorHandler(result);
        }
    } catch (e) {
        fetchErrorHandler(e);
    }
}

export async function deleteComment({
    data,
    setTriggerRefresh,
}: {
    data: CommentDeleteRequest;
    setTriggerRefresh: React.Dispatch<SetStateAction<boolean>>;
}): Promise<void> {
    try {
        const result = await fetchRequest<CommentDeleteResponse>('/comment', {
            method: 'DELETE',
            body: JSON.stringify(data),
        });

        if (result.message === 'OK') {
            setTriggerRefresh(true);
            // await getAllComments({ setComments, setPagination, searchParams });
        } else {
            fetchErrorHandler(result);
        }
    } catch (e) {
        fetchErrorHandler(e);
    }
}
