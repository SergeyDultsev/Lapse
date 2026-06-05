import { ILogin } from '@entities/auth/model/types';

export const login = async (data: ILogin) => {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const response  = await fetch(`${url}auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
    });

    if (!response.ok || response.statusCode !== 201) {
        console.error(response);
    }

    return response.json();
};