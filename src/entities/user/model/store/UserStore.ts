import {action, makeAutoObservable, runInAction} from "mobx";
import iUser from "../types/iUser";
import getAuthOtpCode from "@/features/user/authorize/model/api/getAuthOtpCode";
import loginOrRegister from "@/features/user/authorize/model/api/loginOrRegister";
import authCheck from "@/features/user/authorize/model/api/authCheck";
import getUser from "@/entities/user/model/api/getUser";

class UserStore{
    usersData:iUser[] = [];
    userData:iUser | null = null;
    userAuthorized:iUser | null = null;

    userIsAuth:boolean = false;

    constructor() {
        makeAutoObservable(this, {
            getOtpCode: action,
            loginOrRegisterUser: action,
            getUsersData: action,
            getUserData: action,
        });

        this.authorizationCheck();
    }

    async getOtpCode(): Promise<void> {
        await getAuthOtpCode();
    }

    async loginOrRegisterUser(): Promise<void> {
        const response: boolean = await loginOrRegister();
        runInAction(() => {
            if (response) this.userIsAuth = true;
        });
    }

    async authorizationCheck(): Promise<void> {
        try {
            const response = await authCheck();
            runInAction(() => {
                this.userAuthorized = response.data;
                this.userIsAuth = true;
            });
        } catch (error) {
            runInAction(() => {
                this.userIsAuth = false;
            });
        }
    }

    async getUsersData(): Promise<void> {
        //
    }

    async getUserData(user_id: string): Promise<void> {
        try {
            const response = await getUser(user_id);
            runInAction(() => {
                if (response?.data) this.userData = response.data;
            });
        } catch (error) {
            this.userData = null;
        }
    }
}

export default new UserStore;