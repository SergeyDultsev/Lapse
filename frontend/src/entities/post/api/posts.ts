import { IPost } from '@/entities/post/types';
import { postsUser } from '@/entities/post/mock/post.user';
import { postsFeed } from '@/entities/post/mock/post.feed';

export const getPosts = (): Promise<IPost[]> => {
    return new Promise<IPost[]>(resolve => {
        setTimeout(() => {
            resolve(postsUser);
        }, 1000);
    });
};

export const getPostsFeed = (): Promise<IPost[]> => {
    return new Promise<IPost[]>(resolve => {
        setTimeout(() => {
            resolve(postsFeed);
        }, 1000);
    });
};

export const getPostById = (id: string): Promise<IPost> =>  {
    return new Promise<IPost[]>(resolve => {
        setTimeout(() => {
            resolve(postsFeed);
        }, 1000);
    });
};

export const deletePostById = (id: string): Promise<IPost> =>  {
    return new Promise<IPost[]>(resolve => {
        setTimeout(() => {
            resolve(postsFeed);
        }, 1000);
    });
};

export const updatePostById = (id: string): Promise<IPost> =>  {
    return new Promise<IPost[]>(resolve => {
        setTimeout(() => {
            resolve(postsFeed);
        }, 1000);
    });
};