import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { postKeys } from './post.key';
import { getPostById } from '../api/getPostById';
import { getPostsByUserId } from '../api/getPostsByUserId';
import { createPost } from '../api/createPost';
import { IPost } from './types';

export const usePostsUser = (userId: string) => {
    return useQuery({
        queryKey: postKeys.user(userId),
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
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createPost,
        onSuccess: (post) => {
            if (!post) return;

            queryClient.setQueryData<IPost[]>(
                postKeys.user(post.userId),
                (old) => [post, ...(old ?? [])],
            );
        },
    });
};