import {action, makeAutoObservable, runInAction} from "mobx";
import getFeed from "@pages/feed-page/model/api/getFeed";
import iPost from "@entities/post/model/types/iPost";

class FeedPageStore{
    feedPosts: iPost[] = [];

    constructor() {
        makeAutoObservable(this, {
            getFeedData: action,
        });
    }

    async getFeedData (): Promise<void> {
        try {
            const response = await getFeed();
            runInAction(() => {
                this.feedPosts = response?.data;
            });
        } catch (error) {
            runInAction(() => {
                this.feedPosts = [];
            });
        }
    }
}

export default new FeedPageStore;