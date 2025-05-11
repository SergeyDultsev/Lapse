import {action, makeAutoObservable, runInAction} from "mobx";
import iTier from "@/entities/tier/model/types/iTier";
import getTierUser from "@entities/tier/model/api/getTierUser";
import deleteTier from "@entities/tier/model/api/deleteTier";

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

    async deleteTierById(tier_id: string): Promise<void> {
        const response: iTier = await deleteTier(tier_id);
        if(response) {
            runInAction(() => {
                this.tierData = this.tierData.filter((tier) => tier.tier_id !== tier_id);
            })
        }
    }
}

export default new TierStore;