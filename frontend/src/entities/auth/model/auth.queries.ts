import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authKey, login, register, logout, checkAuth } from '@entities/auth';

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
    });
};