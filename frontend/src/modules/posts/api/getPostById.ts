import { apiFetch } from '@shared/api';
import { IPost } from '@modules/posts/model/types';

export const getPostById = (postId: string) =>
    apiFetch<IPost>(`/posts/${postId}`);
