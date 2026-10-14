import { apiFetch } from '@shared/api';
import { IPost } from '@modules/posts/model/types';

interface ICreatePostData {
    title: string;
    textContent: string;
    image?: string;
}

export const createPost = (data: ICreatePostData) =>
    apiFetch<IPost>('/posts/create', { method: 'POST', body: data });
