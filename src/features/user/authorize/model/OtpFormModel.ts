import { makeAutoObservable } from "mobx";

class OtpFormModel {
    wasSubmit: boolean = false;

    otpForm: string = '';

    constructor() {
        makeAutoObservable(this);
    }

    setOtpCode(code: string): void {
        this.otpForm = code;
    }

    cleanOtpForm(): void {
        this.otpForm = '';
        this.wasSubmit = false;
    }
}

export default new OtpFormModel;