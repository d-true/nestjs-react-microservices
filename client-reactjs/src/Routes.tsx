import LoginPage from './pages/Auth/LoginPage.tsx';
import RegisterPage from './pages/Auth/RegisterPage.tsx';
import NotFoundPage from './pages/404.tsx';
import AuthProvider from './AuthProvider.tsx';
import ProfilePage from './pages/Profile/ProfilePage.tsx';
import AuthPage from './pages/Auth/AuthPage.tsx';
import AllUsersPage from './pages/Users/AllUsersPage.tsx';
import Navigation from './components/Navigation.tsx';
import { Routes, Route, Navigate } from 'react-router';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store/configure-store.ts';
import CommentsPage from './pages/Comments/CommentsPage.tsx';
import { UserRoles } from './features/app.types.ts';

export function AppRoutes() {
    return (
        <>
            <AuthProvider>
                <Navigation />
                <Routes>
                    <Route path="/" element={<Navigate to="/auth/login" />} />
                    <Route path="*" element={<NotFoundPage />} />
                    <Route
                        path="auth"
                        element={
                            <AuthRedirectRoutes>
                                <AuthPage />
                            </AuthRedirectRoutes>
                        }
                    >
                        <Route path="login" element={<LoginPage />} />
                        <Route path="register" element={<RegisterPage />} />
                    </Route>
                    <Route
                        path="profile"
                        element={
                            <ProtectedRoute>
                                <ProfilePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="comments"
                        element={
                            <ProtectedRoute>
                                <CommentsPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="users"
                        element={
                            <ProtectedRouteAdmin>
                                <AllUsersPage />
                            </ProtectedRouteAdmin>
                        }
                    />
                </Routes>
            </AuthProvider>
        </>
    );
}

const ProtectedRouteAdmin = ({ children }: { children: React.ReactNode }) => {
    const user = useSelector((state: RootState) => state.auth.user);

    if (!user) {
        return <Navigate to="/auth/login" replace />;
    }

    if (user && user.roleId !== UserRoles.ADMIN) {
        return <Navigate to="/profile" replace />;
    }

    return children;
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const user = useSelector((state: RootState) => state.auth.user);

    if (!user) {
        return <Navigate to="/auth/login" replace />;
    }
    return children;
};

const AuthRedirectRoutes = ({ children }: { children: React.ReactNode }) => {
    const user = useSelector((state: RootState) => state.auth.user);

    if (user) {
        return <Navigate to="/profile" replace />;
    }
    return children;
};
