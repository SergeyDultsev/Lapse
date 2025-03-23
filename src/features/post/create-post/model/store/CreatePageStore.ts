import React from "react";
import { makeAutoObservable, action } from "mobx";

class CreatePageStore {
    stateForm: string = "post";

    constructor () {
        makeAutoObservable(this, {
            changeFormState: action,
        })
    }

    /*
    * Метод меняет сотояние формы на странице "Создать"
    */
    changeFormState(state: string): void {
        this.stateForm = state;
    }
}

export default new CreatePageStore;