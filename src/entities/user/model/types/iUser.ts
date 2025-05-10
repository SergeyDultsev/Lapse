interface IUser {
    user_id: string,
    avatar_url: string,
    full_name: string,
    email: string,
    about: string,
    subscriptions_count: number,
    subscriber_count: number,
    stateSubscribe?: boolean,
    isAuth?: boolean
}

export default IUser;