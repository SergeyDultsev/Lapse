import {action, makeAutoObservable, runInAction, toJS} from "mobx";
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
            updateIsFollow: action,
            subscribe: action,
            getUsersSubscribers: action,
            getUsersTarget: action
        });
    }

    updateIsFollow(user_id: string, isFollow: boolean): void {
        const sunUser = this.usersSubscriptions.find((user: IUser) => user.user_id === user_id);
        if (sunUser) {
            runInAction(() => {
                sunUser.is_follow = isFollow;
            })
        }

        const targetUser = this.usersSubscriptions.find((user: IUser) => user.user_id === user_id);
        if (targetUser) {
             runInAction(() => {
                 targetUser.is_follow = isFollow;
             })
        }
    }

    async subscribe(user_id: string): Promise<void> {
        const response = await subscribe(user_id);
        runInAction(() => {
            UserStore.userData = response?.data;
            const newIsFollow: boolean = response?.data.is_follow;
            this.updateIsFollow(user_id, newIsFollow);
        })
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