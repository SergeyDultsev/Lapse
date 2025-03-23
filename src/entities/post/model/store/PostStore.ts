import {makeAutoObservable} from "mobx";
import iPost from "../types/iPost";

class PostStore{
    postsData:iPost[] = [];

    constructor() {
        makeAutoObservable(this);
    }
}

export default new PostStore;