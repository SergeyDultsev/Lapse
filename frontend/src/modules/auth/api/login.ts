import { ILogin } from '../model/types';
import { apiClient, IResponse } from '@shared/api';
import { IUser } from '@modules/users/model/types';

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