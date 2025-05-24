import {action, makeAutoObservable, runInAction} from "mobx";
import iUser from "@entities/user/model/types/iUser";
import getFeed from "@pages/feed-page/model/api/getFeed";
import postStore from "@entities/post/model/store/PostStore";

class FeedPageStore{
    usersRecommendations:iUser[] = [];
    usersSubscriptions:iUser[] = [];

    constructor() {
        makeAutoObservable(this, {
            getFeedData: action
        });
    }

    async getFeedData (): Promise<void> {
        try {
            const response = await getFeed();
            runInAction(() => {
                this.usersRecommendations = response?.data.recommendations;
                this.usersSubscriptions = response?.data.subscriptions;
                postStore.postsData = response?.data.posts;
            });
        } catch (error) {
            runInAction(() => {
                this.usersRecommendations = [];
                this.usersSubscriptions = [];
                postStore.postsData = [];
            });
        }
    }
}

export default new FeedPageStore;