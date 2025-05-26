import {action, makeAutoObservable, runInAction} from "mobx";
import iPost from "../types/iPost";
import getPostsUser from "@/entities/post/model/api/getPostsUser";
import deletePost from "@features/post/delete-post/api/deletePost";

class PostStore{
    postsData:iPost[] = [];
    filteredFlag: string | boolean = "allPost";

    constructor() {
        makeAutoObservable(this, {
            changeFilteredFlag: action,
            getPostsByUserId: action,
            deletePostById: action
        });
    }

    changeFilteredFlag(newMethodFilter: boolean | string): void {
        this.filteredFlag = newMethodFilter;
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