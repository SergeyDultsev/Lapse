import {makeAutoObservable, runInAction} from "mobx";
import iPost from "../types/iPost";
import getPostsUser from "@/entities/post/model/api/getPostsUser";
import deletePost from "@entities/post/model/api/deletePost";

class PostStore{
    postsData:iPost[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async getPostsByUserId(user_id: string): Promise<void> {
        const response = await getPostsUser(user_id);
        try {
            runInAction(() => {
                this.postsData = response?.data || [];
            });
        } catch (error) {
            this.postsData = [];
        }
    }

    async deletePostById(post_id: string): Promise<void> {
        try {
            const response = await deletePost(post_id);
            if(response.data) {
                runInAction(() => {
                    this.postsData = this.postsData.filter((post: iPost) => post.post_id !== post_id);
                })
            }
        } catch (error) {
            runInAction(() => {
                this.postsData = [];
            })
        }
    }
}

export default new PostStore;