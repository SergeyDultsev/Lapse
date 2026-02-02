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

export const feedPosts = (): Promise<IPost[]> => {
    return new Promise<IPost[]>(resolve => {
        setTimeout(() => {
            resolve(postsFeed);
        }, 1000);
    });
};

export const getPost = (id: string): Promise<IPost> =>  {

};

export const deletePost = (id: string): Promise<IPost> =>  {

};

export const updatePost = (id: string): Promise<IPost> =>  {

};