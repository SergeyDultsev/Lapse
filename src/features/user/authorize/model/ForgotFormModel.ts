import { makeAutoObservable } from "mobx";

class ForgotFormModel {
    wasSubmit: boolean = false;

    forgotForm = {
        email: '',
    };

    constructor() {
        makeAutoObservable(this);
    }

    setForgotEmail(email: string) {
        this.forgotForm.email = email;
    }

    cleanForgotForm() {
        this.forgotForm.email = '';
        this.wasSubmit = false;
    }
}

export default new ForgotFormModel;