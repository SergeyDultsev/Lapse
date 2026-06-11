import { useState } from 'react';
import { useLogin, useRegister } from '@entities/auth/model/auth.queries';
import { ILogin, IRegister } from '@entities/auth/model/types';
import { config, tCredentialsForm } from '@features/auth/config/auth.configs';

const useAuth = (mode: tCredentialsForm) => {
    const loginMutation = useLogin();
    const registerMutation = useRegister();
    const [credentialsForm, setCredentialsForm] = useState<tCredentialsForm>(mode);
    const currentConfig = config[credentialsForm];

    const [authData, setAuthData] = useState({
        username: '',
        email: '',
        password: '',
        repeatPassword: '',
    });

    const login = (data: ILogin) => {
        return loginMutation.mutate(data);
    };

    const register = (data: IRegister) => {
        return registerMutation.mutate(data);
    };

    const setForm = (fieldName: string, value: string | number) => {
        setAuthData(prevData => ({
            ...prevData,
            [fieldName]: value,
        }));
    };
    
    return {
        login,
        register,
        credentialsForm,
        authData,
        currentConfig,
        setCredentialsForm,
        setForm,
    };
};

export default useAuth;