import {makeAutoObservable, runInAction} from "mobx";
import iPost from "../types/iPost";
import getPostsUser from "@/entities/post/model/api/getPostsUser";

class PostStore{
    postsData:iPost[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async getPostsByUserId(user_id: string) {
        const response = await getPostsUser(user_id);
        console.log(response)
        try {
            runInAction(() => {
                this.postsData = response?.data || [];
            });
        } catch (error) {
            this.postsData = [];
        }
    }
}

export default new PostStore;