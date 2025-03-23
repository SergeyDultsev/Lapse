import {makeAutoObservable} from "mobx";
import iUserSummary from "../types/iUserSummary";

class UserStore{
    usersSummaryData:iUserSummary[] = [];

    constructor() {
        makeAutoObservable(this);
    }
}

export default new UserStore;