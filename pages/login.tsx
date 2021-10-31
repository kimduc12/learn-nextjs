import { authApi } from '@/api/auth-api';
import { useAuth } from 'hooks';
import { useRouter } from 'next/dist/client/router';
import React from 'react';

const LoginPage = () => {
    const router = useRouter();
    const { profile, login, logout } = useAuth({
        revalidateOnMount: false,
    });

    const handleLoginClick = async () => {
        try {
            await login();
            router.push('/about');
        } catch (error) {
            console.log('error login', error);
        }
    };

    const handleGetProfileClick = async () => {
        try {
            const res = profile();
        } catch (error) {
            console.log('error login', error);
        }
    };

    const handleLogoutClick = async () => {
        try {
            await logout();
        } catch (error) {
            console.log('error login', error);
        }
    };

    return (
        <div>
            <h1>Login Page</h1>
            <p>Profile: {JSON.stringify(profile || {}, null, 4)}</p>
            <button onClick={handleLoginClick}>Login</button>
            <button onClick={handleGetProfileClick}>Get Profile</button>
            <button onClick={handleLogoutClick}>Logout</button>
        </div>
    );
};

export default LoginPage;
