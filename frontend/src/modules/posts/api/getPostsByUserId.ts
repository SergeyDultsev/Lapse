import { apiFetch, IPagination } from '@shared/api';
import { IPost } from '@modules/posts/model/types';

export const getPostsByUserId = (userId: string) =>
    apiFetch<IPagination<IPost[]>>(`/posts/users/${userId}`);
