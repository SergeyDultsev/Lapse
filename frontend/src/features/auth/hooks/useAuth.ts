import { useState, useEffect } from 'react';
import { useLogin, useRegister, ILogin, IRegister, useLogout } from '@entities/auth';
import { config, tCredentialsForm } from '@features/auth/config/auth.configs';

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
        return loginMutation.mutate(data);
    };

    const register = (data: IRegister) => {
        return registerMutation.mutate(data);
    };

    const logout = () => {
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