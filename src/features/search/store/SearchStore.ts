import {action, makeAutoObservable, runInAction} from "mobx";
import iUser from "@entities/user/model/types/iUser";
import searchUser from "@features/search/api/searchUser";

class SearchStore{
    query: string = "";
    searchUserData: iUser[] = [];

    constructor() {
        makeAutoObservable(this, {
            setQuery: action,
            getSearchData: action
        })
    }

    setQuery(value: string): void {
        this.query = value;
    }

    async getSearchData(): Promise<void> {
        try {
            const response = await searchUser(this.query);
            runInAction(() => {
                if (response?.data) this.searchUserData = response.data;
            });
        } catch (error) {
            this.searchUserData = [];
        }
    }
}

export default new SearchStore;