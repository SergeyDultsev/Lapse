import { useMutation, useQueryClient } from '@tanstack/react-query';

import { login } from '@entities/auth/api/login';
import { register } from '@entities/auth/api/register';
import { authKey } from '@entities/auth/model/auth.key';

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