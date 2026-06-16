import { IResponse } from '@/shared';
import { IUser } from '@entities/user';

export const getUser = async (id: string) => {
    const isServer = typeof window === 'undefined';

    const baseUrl = isServer
        ? process.env.API_URL || 'http://backend:3000'
        : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

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
    }
};