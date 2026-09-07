import { IUser } from '@/entities/user';

export interface IPost {
    userId: string;
    postId: string,
    title: string,
    textContent: string,
    author: IUser
    meta: {
        countLike: number,
        countComment: number
        countView: number,
    }
}

export interface IPostList {
    posts: IPost[];
    isLoading: boolean;
}