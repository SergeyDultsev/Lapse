import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authKey } from './auth.key';
import { login } from '../api/login';
import { register } from '../api/register';
import { logout } from '../api/logout';
import { checkAuth } from '../api/checkAuth';

export const useLogin = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: authKey.me(),
            });
        },
    });
};

export const useRegister  = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: register,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: authKey.me(),
            });
        },
    });
};

export const useLogout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logout,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: authKey.me(),
            });
        },
    });
};

export const useMe = () => {
    return useQuery({
       queryKey: authKey.me(),
       queryFn: checkAuth,
       staleTime: 1000 * 60 * 1000,
       retry: false,
    });
};