import { makeAutoObservable, action } from "mobx";

class PinCodeStore {
    otpCode: string[] = ['', '', '', ''];

    constructor() {
        makeAutoObservable(this, {
            setOtpCode: action
        });
    }

    setOtpCode(idx: number, code: string): void {
        if (!/^\d?$/.test(code)) return; 
        const codeItem = code.length > 1 ? code[1] : code;
        this.otpCode[idx] = codeItem;
        this.otpCode = [...this.otpCode]
    }
}

export default new PinCodeStore;