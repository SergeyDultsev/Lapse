import { IPost } from '@entities/post';
import { apiClient, IResponse } from '@/shared';

export const createPost = async (data: IPost) => {
    const baseUrl = process.env.API_URL;
    const url = `${baseUrl}/posts/create`;

    try {
        const response = await apiClient(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        const responseData: IResponse<IPost> = response.json();
        return responseData.data;
    } catch (e) {
        console.error(e);
    }
};