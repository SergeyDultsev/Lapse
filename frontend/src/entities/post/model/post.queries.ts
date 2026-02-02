import { useQuery } from '@tanstack/react-query';
import { postKeys } from '@/entities/post/model/post.key';
import { 
    feedPosts, 
    getPosts, 
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
        queryFn: feedPosts,
    });
};