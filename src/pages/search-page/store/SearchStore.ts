import {action, makeAutoObservable} from "mobx";
import iUser from "@/entities/user/model/types/iUser";

class SearchStore{
    query: string = "";
    searchUserData: iUser[] = [];

    constructor() {
        makeAutoObservable(this, {
            getSearchData: action
        })
    }

    async getSearchData(): Promise<void> {

    }
}

export default new SearchStore;