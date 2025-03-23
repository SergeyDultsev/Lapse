import React from "react";
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

    /*
    * Метод меняет сотояние формы на странице "Создать"
    */
    changeFormState(state: string): void {
        this.stateCreateForm = state;
    }

    /*
    * Метод меняет сотояние формы видимости поста (радиокнопки)
    */
    changeVisibility(state: string): void {
        this.stateVisibility = state;
    }
}

export default new CreatePageStore;