"use client";

import React, {useEffect} from "react";
import { useRouterMiddleware } from "@/middleware/useRouterMiddleware";
import CartInfo from "@/widgets/cart-info/CartInfo";
import PostList from "@/widgets/post-list/ui/PostList";
import UserSummaryList from "@/widgets/cart-info/user-summary-list/UserSummaryList";
import IUser from "@/entities/user/model/types/iUser";
import IPost from "@/entities/post/model/types/iPost";
import feedPageStore from "@pages/feed-page/model/store/FeedPageStore";
import AlertBlock from "@/widgets/alert-block/AlertBlock";
import {observer} from "mobx-react-lite";
import postStore from "@entities/post/model/store/PostStore";

const FeedPage: React.FC = observer(() => {
    const usersSubscriptions: IUser[] = feedPageStore?.usersSubscriptions || [];
    const usersRecommendations: IUser[] = feedPageStore?.usersRecommendations || [];
    const feedPosts: IPost[] = postStore?.postsData || [];

    useEffect(() => {
        feedPageStore.getFeedData();
    }, []);

    return (
        <main className="main">
            {usersSubscriptions.length > 0 &&
                <PostList posts={feedPosts}/>
            }

            {usersSubscriptions.length > 0 &&
                <aside className="aside">
                    <CartInfo nameCart={"Подписки"} children={
                        <UserSummaryList users={usersSubscriptions}/>
                    }/>

                    <CartInfo nameCart={"Рекомендации"} children={
                        <UserSummaryList users={usersRecommendations}/>
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
