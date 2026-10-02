import { IRegister } from '../model/types';
import { apiClient, IResponse } from '@shared/api';
import { IUser } from '@modules/users/model/types';

export const register = async (registerData: IRegister) => {
    const response = await apiClient('/auth/register', {
        method: 'POST',
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