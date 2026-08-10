import { IResponse, apiClient } from '@/shared';
import { IUser } from '@entities/user';

export const logout = async () => {
    const response = await apiClient('/auth/logout', {
        method: 'POST',
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