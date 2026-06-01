import { useLogin, useRegister } from '@entities/auth/model/auth.queries';
import { ILogin, IRegister } from '@entities/auth/model/types';

const useAuth = () => {
    const loginMutation = useLogin();
    const registerMutation = useRegister();
    
    const login = (data: ILogin) => {
        return loginMutation.mutate(data);
    };

    const register = (data: IRegister) => {
        return registerMutation.mutate(data);
    };
    
    return {
        login,
        register,
    };
};

export default useAuth;