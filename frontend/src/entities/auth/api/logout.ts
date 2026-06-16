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

    const responseData: IResponse<IUser> = await response.json();

    if (responseData.statusCode != 200) return null;

    return responseData.data || null;
};