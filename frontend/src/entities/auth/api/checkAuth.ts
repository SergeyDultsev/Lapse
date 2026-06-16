import { IResponse } from '@/shared';
import { IUser } from '@entities/user';

export const checkAuth = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}auth/me`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    // Проверьте, есть ли cookie в браузере
    console.log('Document cookie:', document.cookie);

    const data = await response.json();
    console.log('Response data:', data);

    if (data.statusCode === 401) return null;

    return data;
};