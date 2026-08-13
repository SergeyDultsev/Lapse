import { useQuery } from '@tanstack/react-query';
import { postKeys } from '@/entities/post/model/post.key';
import { getPostById, getPostsByUserId } from '@entities/post';

export const usePostsUser = (userId: string) => {
    return useQuery({
        queryKey: postKeys.user(),
        queryFn: () => getPostsByUserId(userId),
    });
};

export const usePost = (postId: string) => {
    return useQuery({
        queryKey: postKeys.detail(postId),
        queryFn: () => getPostById(postId),
    });
};