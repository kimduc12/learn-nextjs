import { useAuth } from 'hooks';
import { useRouter } from 'next/dist/client/router';
import React, { ReactElement } from 'react';

export interface IAuthProps {
    children: any;
}

export function Auth({ children }: IAuthProps) {
    const router = useRouter();
    const { profile, firstLoading } = useAuth();

    React.useEffect(() => {
        if (!firstLoading && profile?.username) {
            router.push('/login');
        }
    }, [router, profile, firstLoading]);

    if (!profile?.username) return <p>Loading...</p>;
    return <div>{children}</div>;
}
