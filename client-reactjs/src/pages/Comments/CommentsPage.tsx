import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router';
import {
    Comment,
    CommentAddRequest,
    CommentEditRequest,
} from '../../features/comment/comment.types.ts';
import Form from '../../components/Form.tsx';
import {
    addComment,
    getAllComments,
    editComment,
    deleteComment,
} from '../../features/comment/comment.service.ts';
import Pagination from '../../components/Pagination.tsx';
import { PaginationResponse } from '../../features/pagination/pagination.types.ts';

export default function CommentsPage() {
    const [comments, setComments] = useState<Comment[]>([]);
    const [pagination, setPagination] = useState<PaginationResponse | null>(
        null,
    );
    const [searchParams, setSearchParams] = useSearchParams();
    const [triggerRefresh, setTriggerRefresh] = useState<boolean>(false);
    const [updateFields, setUpdateFields] = useState<{
        fields: Comment;
        idField: string;
        skipFields: string[];
    } | null>(null);

    const scrollRef = useRef<HTMLDivElement | null>(null);
    const executeScroll = () => scrollRef.current?.scrollIntoView();

    useEffect(() => {
        (async () => {
            await getAllComments({ setComments, setPagination, searchParams });
        })();
    }, []);

    useEffect(() => {
        if (triggerRefresh) {
            setTriggerRefresh(false);
        }
    }, [triggerRefresh]);

    useEffect(() => {
        (async () => {
            if (triggerRefresh) {
                await getAllComments({
                    setComments,
                    setPagination,
                    searchParams,
                });
            }
        })();
    }, [triggerRefresh]);

    const handleUpdateFields = (comment: Comment) => {
        if (comment) {
            setUpdateFields({
                idField: 'id',
                fields: comment,
                skipFields: ['deleteOn'],
            });
            executeScroll();
        }
    };

    const handleDeleteComment = async (commentId: string) => {
        const isDelete: boolean = confirm(
            'Are you sure you want to delete this comment?',
        );
        if (isDelete) {
            await deleteComment({
                data: { id: commentId },
                setTriggerRefresh,
            });
        }
    };

    return (
        <>
            <div className="mt-4 text-center">
                <p>Comments:</p>
                <ol>
                    {comments.map((comment) => (
                        <li key={comment.id}>
                            <p>{JSON.stringify(comment)}</p>
                            <p>
                                <span
                                    onClick={() => handleUpdateFields(comment)}
                                    className="comment-actions"
                                >
                                    Update
                                </span>
                                <span
                                    onClick={() =>
                                        handleDeleteComment(comment.id)
                                    }
                                    className="comment-actions"
                                >
                                    Delete
                                </span>
                            </p>
                        </li>
                    ))}
                </ol>
            </div>
            <Pagination
                pagination={pagination}
                setSearchParams={setSearchParams}
                setTriggerRefresh={setTriggerRefresh}
            />
            <section>
                <div className="" ref={scrollRef}>
                    <Form
                        updateFields={updateFields}
                        buttonText="Add Comment"
                        onSubmit={(data: CommentAddRequest) =>
                            addComment({ data, setTriggerRefresh })
                        }
                        onSubmitUpdate={(data: CommentEditRequest) =>
                            editComment({ data, setTriggerRefresh })
                        }
                        formFields={[
                            {
                                type: 'textarea',
                                name: 'text',
                                options: { required: true },
                            },
                            {
                                type: 'select',
                                name: 'deleteOn',
                                selectOptions: [
                                    {
                                        text: 'Auto delete disabled',
                                        value: 'disabled',
                                    },
                                    {
                                        text: 'Auto delete on 1 hour',
                                        value: '1h',
                                    },
                                    {
                                        text: 'Auto delete on 1 day',
                                        value: '1d',
                                    },
                                    {
                                        text: 'Auto delete on 1 week',
                                        value: '1w',
                                    },
                                ],
                                options: { required: true },
                            },
                        ]}
                    />
                </div>
                <div className="text-center mb-4">
                    <p>Max length: 5000 symbols</p>
                </div>
            </section>
        </>
    );
}
