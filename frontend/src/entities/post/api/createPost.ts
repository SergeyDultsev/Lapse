import { IPost } from '@entities/post';
import { apiClient, IResponse } from '@/shared';

export const createPost = async (data: IPost) => {
    try {
        const response = await apiClient('/posts/create', {
            method: 'POST',
            body: JSON.stringify(data),
        });
        
        const responseData: IResponse<IPost> = response.json();
        return responseData.data;
    } catch (e) {
        console.error(e);
    }
};