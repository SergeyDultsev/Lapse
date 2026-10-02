export interface IUser {
    userId: string,
    username: string,
    email: string,
    bio: string,
    meta: {
        countFollowers: number,
        countSubscriptions: number,
        createdAt: Date,
        updatedAt: Date,
    }
}