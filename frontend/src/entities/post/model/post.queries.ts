import { useMutation, useQuery } from '@tanstack/react-query';
import { postKeys } from '@/entities/post/model/post.key';
import { getPostById, getPostsByUserId } from '@entities/post';
import { createPost } from '@entities/post/api/createPost';

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

export const useSendPost = () => {
    return useMutation({
        mutationFn: createPost,
    });
};