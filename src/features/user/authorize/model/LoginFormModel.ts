import { makeAutoObservable } from "mobx";

class LoginFormModel {
    wasSubmit: boolean = false;

    loginForm = {
        email: '',
        password: '',
    };

    constructor() {
        makeAutoObservable(this);
    }

    setLoginEmail(email: string) {
        this.loginForm.email = email;
    }

    setLoginPassword(password: string) {
        this.loginForm.password = password;
    }

    cleanLoginForm() {
        this.loginForm.email = '';
        this.loginForm.password = '';
        this.wasSubmit = false;
    }
}

export default new LoginFormModel;