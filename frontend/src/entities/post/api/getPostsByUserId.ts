import { IPost } from '@entities/post';
import { apiClient, IResponse } from '@/shared';

export const getPostsByUserId = async (userId: string): Promise<IPost[]> => {
    const isServer = typeof window === 'undefined';
    if (isServer) {
        const baseUrl = process.env.API_URL || 'http://backend:3000';
        const url = `${baseUrl}/posts/${userId}`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const responseData: IResponse<IPost[]> = await response.json();

            if (responseData.statusCode !== 200) return null;

            return responseData.data;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    try {
        const response = await apiClient(`/posts/${userId}`);

        const responseData: IResponse<IPost[]> = await response.json();

        if (responseData.statusCode !== 200) return null;

        return responseData.data;
    } catch (e) {
        console.error(e);
        return null;
    }
};