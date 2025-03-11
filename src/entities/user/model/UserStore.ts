import {makeAutoObservable} from "mobx";
import iUserBrief from "./types/iUserBrief";

class UserStore{
    usersData:iUserBrief[] = [];

    constructor() {
        makeAutoObservable(this);
    }
}

export default new UserStore;