import {action, makeAutoObservable, runInAction} from "mobx";
import getFeed from "@pages/feed-page/model/api/getFeed";
import postStore from "@entities/post/model/store/PostStore";

class FeedPageStore{
    constructor() {
        makeAutoObservable(this, {
            getFeedData: action,
        });
    }

    async getFeedData (): Promise<void> {
        try {
            const response = await getFeed();
            runInAction(() => {
                postStore.postsData = response?.data;
            });
        } catch (error) {
            runInAction(() => {
                postStore.postsData = [];
            });
        }
    }
}

export default new FeedPageStore;