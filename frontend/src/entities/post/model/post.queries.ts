import { useQuery, useMutation } from '@tanstack/react-query';
import { postKeys } from '@/entities/post/model/post.key';
import {
    getPostsUser,
    getPostsFeed,
    getPostsTopic,
    deletePostById,
    updatePostById,
    getPostById,
} from '@/entities/post/api/posts';

export const usePostsUser = (userId: string) => {
    return useQuery({
        queryKey: postKeys.user(),
        queryFn: () => getPostsUser(userId),
    });
};

export const usePostsFeed = () => {
    return useQuery({
        queryKey: postKeys.feed(),
        queryFn: getPostsFeed,
    });
};

export const usePostsTopic = () => {
    return useQuery({
        queryKey: postKeys.topic(),
        queryFn: getPostsTopic,
    });
};

export const usePost = (postId: string) => {
    return useQuery({
        queryKey: postKeys.detail(postId),
        queryFn: () => getPostById(postId),
    });
};

export const usePostCreate = () => {
    return useMutation({
        mutationFn: async ({ data }: { data: unknown }) => { console.log(data); },
    });
};

export const usePostDelete = () => {
    return useMutation({
        mutationFn: ({ postId }: { postId: string }) => 
            deletePostById(postId),
    });
};

export const usePostUpdate = () => {
    return useMutation({
        mutationFn: ({ postId, data }: { postId: string, data: unknown }) => 
            updatePostById(postId),
    });
};