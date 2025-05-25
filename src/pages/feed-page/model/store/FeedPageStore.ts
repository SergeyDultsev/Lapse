import {action, makeAutoObservable, runInAction} from "mobx";
import getFeed from "@pages/feed-page/model/api/getFeed";
import postStore from "@entities/post/model/store/PostStore";
import subscribe from "@entities/user/model/api/subscribe";
import IUser from "@entities/user/model/types/iUser";

class FeedPageStore{
    usersRecommendations:IUser[] = [];
    usersSubscriptions:IUser[] = [];

    constructor() {
        makeAutoObservable(this, {
            getFeedData: action,
            subscribeToUser: action
        });
    }

    async getFeedData (): Promise<void> {
        try {
            const response = await getFeed();
            runInAction(() => {
                this.usersRecommendations = response?.data.recommendations;
                postStore.postsData = response?.data.posts;
            });
        } catch (error) {
            runInAction(() => {
                this.usersRecommendations = [];
                postStore.postsData = [];
            });
        }
    }

    async subscribeToUser(user_id: string): Promise<void> {
        try {
            const response = await subscribe(user_id);
            const updatedUser = response?.user;
            if (response?.user && response?.user.is_follow === true) {
                runInAction(() => {
                    this.usersRecommendations = this.usersRecommendations.filter((user: IUser) => user.user_id !== user_id);
                    this.usersSubscriptions.push(updatedUser);
                })
            }
        } catch (error) {
            runInAction(() => {
                this.usersSubscriptions = this.usersSubscriptions.filter((user: IUser) => user.user_id !== user_id);
            })
        }
    }
}

export default new FeedPageStore;