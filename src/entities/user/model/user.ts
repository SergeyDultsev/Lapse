import {makeAutoObservable} from "mobx";
import iUserBrief from "./types/iUserBrief";

class User{
    usersData:iUserBrief[] = [];

    constructor() {
        makeAutoObservable(this);
    }
}

export default new User;