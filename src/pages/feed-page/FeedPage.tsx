"use client";

import React, {useEffect} from "react";
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";
import { useRouterMiddleware } from "@/middleware/useRouterMiddleware";
import CartInfo from "@/widgets/cart-info/CartInfo";
import PostList from "@/widgets/post-list/ui/PostList";
import UserList from "@widgets/cart-info/user-list/UserList";
import IUser from "@/entities/user/model/types/iUser";
import IPost from "@/entities/post/model/types/iPost";
import AlertBlock from "@/widgets/alert-block/AlertBlock";
import postStore from "@entities/post/model/store/PostStore";
import FeedPageStore from "@pages/feed-page/model/store/FeedPageStore";
import SubscriptionStore from "@entities/subscription/model/store/SubscriptionStore";
import UserStore from "@entities/user/model/store/UserStore";

const FeedPage: React.FC = observer(() => {
    const usersSubscriptions: IUser[] = SubscriptionStore?.usersSubscriptions || [];
    const usersRecommendations: IUser[] = FeedPageStore?.usersRecommendations || [];
    const feedPosts: IPost[] = postStore?.postsData || [];

    useEffect(() => {
        FeedPageStore.getFeedData();
        if(UserStore.userAuthorized?.user_id) SubscriptionStore.getUsersSubscribers(UserStore.userAuthorized?.user_id);
    }, [UserStore.userAuthorized?.user_id]);

    return (
        <main className="main">
            {usersSubscriptions.length > 0 &&
                <PostList posts={feedPosts}/>
            }

            {usersSubscriptions.length > 0 &&
                <aside className="aside">
                    <CartInfo nameCart={"Подписки"} children={
                        <UserList users={usersSubscriptions}/>
                    }/>

                    <CartInfo nameCart={"Рекомендации"} children={
                        <UserList users={usersRecommendations}/>
                    }/>
                </aside>
            }

            {usersSubscriptions.length === 0 &&
                <AlertBlock
                    alertTitle={"У вас нету подписок"}
                    alertDescr={"Воспользуйтесь поиском, чтобы подписаться на других пользователей."}
                />
            }
        </main>
    );
});

export default useRouterMiddleware(FeedPage);
