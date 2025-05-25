import {action, makeAutoObservable} from "mobx";

class LoginOrRegisterFormModel {
    wasSubmit: boolean = false;

    dataForm = {
        name: '',
        surname: '',
        email: '',
        password: '',
        otp_code: '',
    };

    constructor() {
        makeAutoObservable(this, {
            setFormData: action,
            cleanForm: action
        });
    }

    setFormData(key: string, value: string) {
        this.dataForm[key] = value;
    }

    cleanForm() {
        this.dataForm.name = '';
        this.dataForm.surname = '';
        this.dataForm.email = '';
        this.dataForm.password = '';
        this.dataForm.otp_code = '';
        this.wasSubmit = false;
    }
}

export default new LoginOrRegisterFormModel;