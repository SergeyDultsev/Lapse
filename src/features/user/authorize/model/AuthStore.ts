import { makeAutoObservable, action } from "mobx";

class AuthStore {
    email: string = "";
    password: string = "";
    firstName: string = "";
    lastName: string = "";
    repeatPassword: string = "";

    otpCode: string[] = ['', '', '', ''];

    constructor() {
        makeAutoObservable(this, {
            setEmail: action,
            setPassword: action,
            setRepeatPassword: action,
            setFirstName: action,
            setLastName: action,
            setOtpCode: action
        });
    }

    setEmail(email: string) {
        this.email = email;
    }

    setPassword(password: string) {
        this.password = password;
    }

    setRepeatPassword(repeatPassword: string) {
        this.repeatPassword = repeatPassword;
    }

    setFirstName(firstName: string) {
        this.firstName = firstName;
    }

    setLastName(lastName: string) {
        this.lastName = lastName;
    }

    setOtpCode(code: string[]): void {
        while (code.length < 4) {
            code.push('');
        }
        this.otpCode = [...code];
    }
}

export default new AuthStore;