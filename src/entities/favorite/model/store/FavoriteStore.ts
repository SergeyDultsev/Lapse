import {action, makeAutoObservable, runInAction} from "mobx";
import iPost from "@entities/post/model/types/iPost";
import favorite from "@entities/favorite/model/api/favorite";
import getFavorite from "@entities/favorite/model/api/getFavorite";
import PostStore from "@entities/post/model/store/PostStore";
import FeedPageStore from "@pages/feed-page/model/store/FeedPageStore";

class FavoriteStore{
    favoritesData:iPost[] = [];

    constructor() {
        makeAutoObservable(this, {
            isFavoriteById: action,
            getFavoriteById: action
        });
    }

    async isFavoriteById (post_id: string): Promise<void> {
        const response = await favorite(post_id);
        if (response.data) {
            const postFromFavoritesData = this.favoritesData.find((post: iPost) => post.post_id === post_id);
            const postFromPostsData = PostStore.postsData.find((post: iPost) => post.post_id === post_id);
            const postFromFeedData = FeedPageStore.feedPosts.find((post: iPost) => post.post_id === post_id);

            if (postFromFavoritesData) {
                runInAction(() => {
                    postFromFavoritesData.is_favorite = response.data.is_favorite;
                    postFromFavoritesData.save_count = response.data.save_count;
                });
            }

            if (postFromPostsData) {
                runInAction(() => {
                    postFromPostsData.is_favorite = response.data.is_favorite;
                    postFromPostsData.save_count = response.data.save_count;
                });
            }

            if (postFromFeedData) {
                runInAction(() => {
                    postFromFeedData.is_favorite = response.data.is_favorite;
                    postFromFeedData.save_count = response.data.save_count;
                });
            }
        }
    }

    async getFavoriteById (): Promise<void>  {
        const response = await getFavorite();
        try {
            runInAction(() => {
                this.favoritesData = response.data || [];
            })
        } catch (error) {
            runInAction(() => {
                this.favoritesData = [];
            })
        }
    }
}

export default new FavoriteStore;