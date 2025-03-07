import {makeAutoObservable} from "mobx";
import iPost from "./types/iPost";

class Post{
    postsData:iPost[] = [];

    constructor() {
        makeAutoObservable(this);
    }
}

export default new Post;