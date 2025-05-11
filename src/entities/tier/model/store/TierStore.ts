import {action, makeAutoObservable, runInAction} from "mobx";
import iTier from "@/entities/tier/model/types/iTier";
import getTierUser from "@entities/tier/model/api/getTierUser";

class TierStore{
    tierData: iTier[] = [];

    constructor(){
        makeAutoObservable(this,{
            getTiers: action
        });
    }

    async getTiers(user_id: string): Promise<void> {
        try {
            const response: iTier = await getTierUser(user_id);
            if(response) {
                runInAction(() => {
                    this.tierData = response.data;
                })
            }
        } catch (error) {
            this.tierData = [];
        }
    }
}

export default new TierStore;