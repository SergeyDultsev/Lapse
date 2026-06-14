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

    const data: IResponse<IUser> = await response.json();

    if (data.statusCode === 401) return null;

    return data;
};