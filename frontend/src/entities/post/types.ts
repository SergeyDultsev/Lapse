export interface IPost {
    id: string,
    title: string,
    body: string,
    meta: {
        countLike: number,
        countComment: number
        countView: number,
    }
}