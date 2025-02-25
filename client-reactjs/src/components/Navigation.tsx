import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/configure-store.ts';
import { logOut } from '../features/auth/auth.service.ts';
import { UserRoles } from '../features/app.types.ts';

export default function Navigation() {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <div className="mt-4 text-center navigation">
            {user?.roleId === UserRoles.ADMIN ? (
                <Link to="/users">All users</Link>
            ) : null}
            {user ? (
                <>
                    <Link to="/comments">Comments</Link>
                    <Link to="/profile">Profile</Link>
                    <Link to="#" onClick={() => logOut({ dispatch })}>
                        Logout
                    </Link>
                </>
            ) : (
                <>
                    <Link to="/auth/login">Login</Link>
                </>
            )}
        </div>
    );
}
