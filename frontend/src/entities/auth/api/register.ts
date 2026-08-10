import { IRegister } from '@entities/auth';
import { IResponse } from '@/shared';
import { IUser } from '@entities/user';

export const register = async (registerData: IRegister) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/register`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(registerData),
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