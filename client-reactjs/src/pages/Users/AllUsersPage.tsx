import { useEffect, useState } from 'react';
import { getAllUsers } from '../../features/user/user.service.ts';
import { User } from '../../features/user/user.types.ts';
import { useLocation, useSearchParams } from 'react-router';
import { PaginationResponse } from '../../features/pagination/pagination.types.ts';
import Pagination from '../../components/Pagination.tsx';

export default function AllUsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [pagination, setPagination] = useState<PaginationResponse | null>(
        null,
    );
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [triggerRefresh, setTriggerRefresh] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            await getAllUsers({ setUsers, setPagination, searchParams });
        })();
    }, [location]);

    useEffect(() => {
        if (triggerRefresh) {
            setTriggerRefresh(false);
        }
    }, [triggerRefresh]);

    return (
        <>
            <div className="mt-4 text-center">
                <p>All registered users:</p>

                <ol>
                    {users.map((user) => (
                        <li key={user.id}>{JSON.stringify(user)}</li>
                    ))}
                </ol>
            </div>
            <Pagination
                setTriggerRefresh={setTriggerRefresh}
                pagination={pagination}
                setSearchParams={setSearchParams}
            />
        </>
    );
}
