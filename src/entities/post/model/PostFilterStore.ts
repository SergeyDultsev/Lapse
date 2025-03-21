import {action, makeAutoObservable} from "mobx";
import iPost from "@/entities/post/model/types/iPost";

class PostFilterStore{
    filteredPosts: iPost[] = [];
    filteredFlag: string = "allPost";

    constructor() {
        makeAutoObservable(this, {
            filterPosts: action,
        });
    }

    /*
    *  Метод фильтрации постов
    */
    filterPosts(postsData: iPost[], methodFilter: string): void {
        this.filteredFlag = methodFilter;

        if (methodFilter === "allPost") {
            this.filteredPosts = postsData;
        } else {
            this.filteredPosts = postsData.filter((postItem: iPost): boolean => postItem.post.status === methodFilter);
        }
    }

}

export default new PostFilterStore;