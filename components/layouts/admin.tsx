import { LayoutProps } from '@/models/common';
import React from 'react';
import Link from 'next/link';
import { Auth } from '../common';
import { useAuth } from 'hooks';
import { useRouter } from 'next/dist/client/router';

export function AdminLayout({ children }: LayoutProps) {
    const router = useRouter();
    const { profile, logout } = useAuth();
    const handleLogoutClick = async () => {
        try {
            await logout();
            router.push('/login');
        } catch (error) {
            console.log('error login', error);
        }
    };
    return (
        <Auth>
            <h1>Admin Layout</h1>
            <div>Sidebar</div>

            <p>Profile: {JSON.stringify(profile)}</p>

            <button onClick={handleLogoutClick}>Logout</button>
            <Link href="/">
                <a>Home</a>
            </Link>
            <Link href="/about">
                <a>About</a>
            </Link>
            <div>{children}</div>
        </Auth>
    );
}
