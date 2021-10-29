import { authApi } from '@/api/auth-api';
import React from 'react';

const LoginPage = () => {
    const handleLoginClick = async () => {
        try {
            const res = await authApi.login({
                username: 'test',
                password: '123456a',
            });
        } catch (error) {
            console.log('error login', error);
        }
    };

    const handleGetProfileClick = async () => {
        try {
            const res = await authApi.getProfile();
        } catch (error) {
            console.log('error login', error);
        }
    };

    const handleLogoutClick = async () => {
        try {
            const res = await authApi.logout();
        } catch (error) {
            console.log('error login', error);
        }
    };

    return (
        <div>
            <h1>Login Page</h1>

            <button onClick={handleLoginClick}>Login</button>
            <button onClick={handleGetProfileClick}>Get Profile</button>
            <button onClick={handleLogoutClick}>Logout</button>
        </div>
    );
};

export default LoginPage;
