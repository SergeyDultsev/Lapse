import { IResponse, apiClient } from '@/shared';
import { IUser } from '@entities/user';

export const getUser = async (id: string) => {
    const isServer = typeof window === 'undefined';
    if (isServer) {
        const baseUrl = process.env.API_URL || 'http://backend:3000';
        const url = `${baseUrl}/users/${id}`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const responseData: IResponse<IUser> = await response.json();

            if (responseData.statusCode !== 200) return null;

            return responseData.data;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    try {
        const response = await apiClient(`/users/${id}`);

        const responseData: IResponse<IUser> = await response.json();

        if (responseData.statusCode !== 200) return null;

        return responseData.data;
    } catch (e) {
        console.error(e);
        return null;
    }
};