import { IUser } from "@/entities/user/types";

export interface IPost {
    id: string,
    title: string,
    body: string,
    author: IUser
    meta: {
        countLike: number,
        countComment: number
        countView: number,
    }
}