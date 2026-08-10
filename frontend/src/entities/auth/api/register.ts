import { IRegister } from '@entities/auth';
import { IResponse, apiClient } from '@/shared';
import { IUser } from '@entities/user';

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