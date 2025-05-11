import {action, makeAutoObservable} from "mobx";
import iPost from "@/entities/post/model/types/iPost";

class PostFilterStore{
    filteredPosts: iPost[] = [];
    filteredFlag: string | boolean = "allPost";

    constructor() {
        makeAutoObservable(this, {
            filterPosts: action,
        });
    }

    /*
    *  Метод фильтрации постов
    */
    filterPosts(postsData: iPost[], methodFilter: boolean | string): void {
        this.filteredFlag = methodFilter;

        if (methodFilter === "allPost") {
            this.filteredPosts = postsData;
        } else {
            this.filteredPosts = postsData.filter((postItem: iPost): boolean => postItem.is_open === methodFilter);
        }
    }

}

export default new PostFilterStore;