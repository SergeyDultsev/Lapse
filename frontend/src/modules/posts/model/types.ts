import { IUser } from '@modules/users/model/types';

export interface IPost {
    userId: string;
    postId: string,
    title: string,
    textContent: string,
    meta: {
        countLike: number,
        countComment: number
        countView: number,
        createdAt?: string,
        updatedAt?: string,
        author: IUser
    }
}
