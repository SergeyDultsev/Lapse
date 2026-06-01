import { useState } from 'react';
import { config, tCredentialsForm } from '@features/auth/config/auth.configs';

const useAuthForm = (mode: tCredentialsForm) => {
    const [credentialsForm, setCredentialsForm] = useState<tCredentialsForm>(mode);
    const currentConfig = config[credentialsForm];

    const [authData, setAuthData] = useState({
        username: '',
        email: '',
        password: '',
        repeatPassword: '',
    });

    const setForm = (fieldName: string, value: string | number) => {
        setAuthData(prevData => ({
            ...prevData,
            [fieldName]: value,
        }));
    };
    
    return {
        credentialsForm,
        authData,
        currentConfig,
        setCredentialsForm,
        setForm,
    };
};

export default useAuthForm;