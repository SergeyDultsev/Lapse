import ITier from "@/entities/tier/model/types/iTier";
import { makeAutoObservable, action } from "mobx";

class TierSelectStore {
    isOpen: boolean = false;
    selected: ITier = { tier_id: '', user_id: '', title: '', price: 0, description: '' };

    constructor () {
        makeAutoObservable(this, {
            setIsOpen: action,
            setSelected: action
        })
    }

    setIsOpen(state: boolean) {
        this.isOpen = state;
    }

    setSelected(newSelected: ITier): void {
        this.selected = newSelected;
    }
}

export default new TierSelectStore;