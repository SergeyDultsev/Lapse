import { ILogin } from '@entities/auth/model/types';
import { IResponse } from '@/shared';
import { IUser } from '@entities/user';

export const login = async (loginData: ILogin) => {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const response  = await fetch(`${url}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(loginData),
    });

    const responseData: IResponse<IUser> = await response.json();

    if (!response.ok) {
        throw new Error(
            Array.isArray(responseData.message)
                ? responseData.message.join(', ')
                : responseData.message
        );
    }

    return responseData.data || null;
};