import { ILogin } from '@entities/auth/model/types';
import { IResponse } from '@/shared';
import { IUser } from '@entities/user';
import { apiClient } from '@/shared';

export const login = async (loginData: ILogin) => {
    const response = await apiClient('/auth/login', {
        method: 'POST',
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