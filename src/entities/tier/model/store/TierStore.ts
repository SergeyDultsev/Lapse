import {action, makeAutoObservable} from "mobx";
import iTier from "@/entities/tier/model/types/iTier";

class TierStore{
    tierData: iTier[] = [];

    constructor(){
        makeAutoObservable(this);
    }
}

export default new TierStore;