import { makeAutoObservable, action } from "mobx";

class CreatePostStore {
    constructor () {
        makeAutoObservable(this, {})
    }
}

export default new CreatePostStore;