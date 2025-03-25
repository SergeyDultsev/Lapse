import { makeAutoObservable, action } from "mobx";

class CreateTierStore {
    constructor () {
        makeAutoObservable(this, {})
    }
}

export default new CreateTierStore;