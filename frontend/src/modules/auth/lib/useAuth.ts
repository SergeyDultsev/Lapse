import { useState, useEffect } from 'react';

import { config, tCredentialsForm } from '@shared/config/auth.configs';
import { useLogin, useLogout, useRegister } from '@modules/auth/model/auth.queries';
import { ILogin, IRegister } from '@modules/auth/model/types';

const useAuth = (mode?: tCredentialsForm) => {
    const loginMutation = useLogin();
    const registerMutation = useRegister();
    const logoutMutation = useLogout();

    const [credentialsForm, setCredentialsForm] = useState<tCredentialsForm | null>(mode ?? null);
    const currentConfig = credentialsForm ? config[credentialsForm] : undefined;

    const [authData, setAuthData] = useState({
        username: '',
        email: '',
        password: '',
        repeatPassword: '',
    });

    const login = (data: ILogin) => {
        return loginMutation.mutateAsync(data);
    };

    const register = (data: IRegister) => {
        return registerMutation.mutateAsync(data);
    };

    const logout = () => {
        window.location.reload();
        return logoutMutation.mutate();
    };

    const setForm = (fieldName: string, value: string | number) => {
        setAuthData(prevData => ({
            ...prevData,
            [fieldName]: value,
        }));
    };

    useEffect(() => {
        setCredentialsForm(mode ?? null);
    }, [mode]);

    const passwordMatch = authData.password === authData.repeatPassword;
    
    return {
        login,
        register,
        logout,
        credentialsForm,
        authData,
        currentConfig,
        passwordMatch,

        setCredentialsForm,
        setForm,
    };
};

export default useAuth;