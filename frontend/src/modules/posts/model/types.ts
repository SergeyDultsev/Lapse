import { IUser } from '@modules/users/model/types';

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