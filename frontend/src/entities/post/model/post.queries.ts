import { useQuery } from '@tanstack/react-query';
import { postKeys } from '@/entities/post/model/post.key';
import {
    deletePostById,
    feedPosts, getPostById,
    getPosts, getPostsFeed, updatePostById,
} from '@/entities/post/api/posts';

export const usePostsUser = () => {
    return useQuery({
        queryKey: postKeys.user(),
        queryFn: getPosts,
    });
};

export const usePostsFeed = () => {
    return useQuery({
        queryKey: postKeys.feed(),
        queryFn: getPostsFeed,
    });
};

export const usePost = (userId: string ) => {
    return useQuery({
        queryKey: postKeys.feed(),
        queryFn: getPostById(userId),
    });
};

export const usePostDelete = (postId: string ) => {
    return useQuery({
        queryKey: postKeys.feed(),
        queryFn: deletePostById(postId),
    });
};

export const usePostUpdate = (postId: string ) => {
    return useQuery({
        queryKey: postKeys.feed(),
        queryFn: updatePostById(postId),
    });
};