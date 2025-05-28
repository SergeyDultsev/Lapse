import { makeAutoObservable, action } from "mobx";

class CreatePageStore {
    stateCreateForm: string = "post";
    stateVisibility: string = "open";

    constructor () {
        makeAutoObservable(this, {
            changeFormState: action,
            changeVisibility: action
        })
    }

    changeFormState(state: string): void {
        this.stateCreateForm = state;
    }

    changeVisibility(state: string): void {
        this.stateVisibility = state;
    }
}

export default new CreatePageStore;