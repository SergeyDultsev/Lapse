import {action, makeAutoObservable} from "mobx";

class SettingsModel {
    wasSubmit: boolean = false;

    dataForm = {
        name: '',
        surname: '',
        email: '',
        abort: '',
        avatar_url: '',
    };

    constructor() {
        makeAutoObservable(this,  {
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
        this.dataForm.abort = '';
        this.dataForm.avatar_url = '';
        this.wasSubmit = false;
    }
}

export default new SettingsModel;