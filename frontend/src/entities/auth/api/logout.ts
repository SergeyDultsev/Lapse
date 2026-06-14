import { IResponse } from '@/shared';
import { IUser } from '@entities/user';

export const logout = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}auth/logout`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
    });

    const data: IResponse<IUser> = await response.json();

    if (data.statusCode != 200) return null;

    return data;
};