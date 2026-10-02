import { apiClient, IResponse } from '@shared/api';
import { IUser } from '@modules/users/model/types';

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