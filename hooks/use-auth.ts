import { authApi } from './../api-client/auth-api';
import useSWR from 'swr';
import { PublicConfiguration } from 'swr/dist/types';
export function useAuth(options?: Partial<PublicConfiguration>) {
    // profile
    //
    const {
        data: profile,
        error,
        mutate,
    } = useSWR('/profile', {
        dedupingInterval: 60 * 60 * 1000,
        revalidateOnFocus: false,
        ...options,
    });

    const firstLoading = profile === undefined && error === undefined;

    const login = async () => {
        await authApi.login({
            username: 'test1',
            password: '123123',
        });
        await mutate();
    };
    const logout = async () => {
        await authApi.logout();
        mutate({}, false);
    };
    return {
        profile,
        error,
        login,
        logout,
        firstLoading,
    };
}
