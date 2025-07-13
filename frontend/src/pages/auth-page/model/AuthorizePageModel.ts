import { makeAutoObservable, action } from "mobx";

class AuthorizePageModel {
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

export default new AuthorizePageModel;