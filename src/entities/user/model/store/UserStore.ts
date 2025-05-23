import {action, makeAutoObservable, runInAction} from "mobx";
import iUser from "../types/iUser";
import getAuthOtpCode from "@/features/user/authorize/model/api/getAuthOtpCode";
import loginOrRegister from "@/features/user/authorize/model/api/loginOrRegister";
import authCheck from "@/features/user/authorize/model/api/authCheck";
import getUser from "@/entities/user/model/api/getUser";
import logout from "@entities/user/model/api/logout";

class UserStore{
    userData:iUser | null = null;
    usersSubscribers:iUser[] = [];
    usersTarget:iUser[] = [];
    userAuthorized:iUser | null = null;

    isAuth:boolean = false;
    isLoadingAuth:boolean = true;

    constructor() {
        makeAutoObservable(this, {
            getOtpCode: action,
            loginOrRegisterUser: action,
            authorizationCheck: action,
            logout: action,
            getUsersSubscribers: action,
            getUsersTarget: action,
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
            if (response) this.isAuth = true;
        });
    }

    async authorizationCheck(): Promise<void> {
        try {
            const response = await authCheck();
            if(response?.data.status === 401) {
                runInAction(() => {
                    this.userAuthorized = null;
                    this.isAuth = false;
                });
            } else {
                runInAction(() => {
                    this.userAuthorized = response?.data.data;
                    this.isAuth = true;
                });
            }
        } catch (error) {
            runInAction(() => {
                this.userAuthorized = null;
                this.isAuth = false;
            });
        } finally {
            runInAction(() => {
                this.isLoadingAuth = false;
            });
        }
    }

    async logout(): Promise<void> {
        try {
            const response = await logout();
            runInAction(() => {
                this.userAuthorized = null;
                this.isAuth = false;
            });
        } catch (error) {
            runInAction(() => {
                this.isAuth = false;
            });
        }
    }

    async getUsersSubscribers(): Promise<void> {
        //
    }

    async getUsersTarget(): Promise<void> {
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