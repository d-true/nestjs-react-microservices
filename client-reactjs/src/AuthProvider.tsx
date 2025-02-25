import { useDispatch } from 'react-redux';
import React, { useEffect, useState, useRef } from 'react';
import { refreshToken } from './features/auth/auth.service.ts';

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // since we carry logic with set cookies and so on,
    // we must be sure, that useeffect will render only once
    // in strict mode too
    const checkOnlyOneRender = useRef(false);

    useEffect(() => {
        if (!checkOnlyOneRender.current) {
            (async () => {
                await refreshToken({ dispatch });
                setIsLoading(false);
            })();
        }
        return () => {
            checkOnlyOneRender.current = true;
        };
    }, []);

    return <>{isLoading ? <div>Loading</div> : children}</>;
}
