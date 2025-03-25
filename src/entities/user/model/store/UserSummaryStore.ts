import {makeAutoObservable} from "mobx";
import iUserSummary from "../types/iUserSummary";

class UserSummaryStore{
    usersSummaryData:iUserSummary[] = [];

    constructor() {
        makeAutoObservable(this);
    }
}

export default new UserSummaryStore;