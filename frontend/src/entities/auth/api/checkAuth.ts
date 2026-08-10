import { IResponse } from '@/shared';
import { IUser } from '@entities/user';
import { apiClient } from '@/shared';

export const checkAuth = async () => {
    const response = await apiClient('/auth/me');

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