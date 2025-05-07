import { makeAutoObservable } from "mobx";

class RegisterFormModel {
    wasSubmit: boolean = false;

    registerForm = {
        name: '',
        surname: '',
        email: '',
        password: '',
        repeatPassword: '',
    };

    constructor() {
        makeAutoObservable(this);
    }

    setRegisterName(name: string) {
        this.registerForm.name = name;
    }

    setRegisterSurname(surname: string) {
        this.registerForm.surname = surname;
    }

    setRegisterEmail(email: string) {
        this.registerForm.email = email;
    }

    setRegisterPassword(password: string) {
        this.registerForm.password = password;
    }

    setRegisterRepeatPassword(repeatPassword: string) {
        this.registerForm.email = repeatPassword;
    }

    cleanRegisterForm() {
        this.registerForm.name = '';
        this.registerForm.surname = '';
        this.registerForm.email = '';
        this.registerForm.password = '';
        this.registerForm.repeatPassword = '';
        this.wasSubmit = false;
    }
}

export default new RegisterFormModel;