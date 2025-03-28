import {makeAutoObservable} from "mobx";
import iUser from "../types/iUser";

class UserStore{
    usersData:iUser[] = [];

    constructor() {
        makeAutoObservable(this);
    }
}

export default new UserStore;