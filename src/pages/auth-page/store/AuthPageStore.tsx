import { makeAutoObservable, action } from "mobx";

class AuthPageStore{
    stateForm: string = "auth";

    constructor () {
        makeAutoObservable(this, {
            changeFormState: action
        })
    }

    changeFormState(newState: string): void {
        this.stateForm = newState;
    }
}

export default new AuthPageStore;