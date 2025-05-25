import {action, makeAutoObservable, runInAction} from "mobx";
import IUser from "@/entities/user/model/types/iUser";
import subscribe from "@entities/user/model/api/subscribe";
import UserStore from "@entities/user/model/store/UserStore";
import getSubscribers from "@entities/subscription/api/getSubscription";
import getTarget from "@entities/subscription/api/getTarget";

class SubscriptionStore{
    usersSubscriptions:IUser[] = [];
    usersTarget:IUser[] = [];

    constructor() {
        makeAutoObservable(this, {
            subscribe: action,
            getUsersSubscribers: action,
            getUsersTarget: action
        });
    }

    async subscribe(user_id: string): Promise<void> {
        const response = await subscribe(user_id);
        console.log(response.data)
        if (response.data) {
            runInAction(() => {
                UserStore.userData = response?.data;
            })
        }
    }

    async getUsersSubscribers(user_id: string): Promise<void> {
        try {
            const response = await getSubscribers(user_id);
            runInAction(() => {
                this.usersSubscriptions = response?.data;
            })
        } catch (error) {
            runInAction(() => {
                this.usersSubscriptions = [];
            })
        }
    }

    async getUsersTarget(user_id: string): Promise<void> {
        const response = await getTarget(user_id);
        if (response?.data) {
            runInAction(() => {
                this.usersTarget = response?.data;
            })
        } else {
            runInAction(() => {
                this.usersTarget = [];
            })
        }
    }
}

export default new SubscriptionStore;