"use client";

import React from "react";
import CartInfo from "@/widgets/cart-info/CartInfo";
import PostList from "@/widgets/post-list/ui/PostList";
import UserSummaryList from "@/widgets/cart-info/user-summary-list/UserSummaryList";
import iPost from "@/entities/post/model/types/iPost";
import IUser from "@/entities/user/model/types/iUser";
import postStore from "@/entities/post/model/store/PostStore";
import userStore from "@/entities/user/model/store/UserStore";
import AlertBlock from "@/widgets/alert-block/AlertBlock";
import {useRouterMiddleware} from "@/middleware/useRouterMiddleware";
import {toJS} from "mobx";
import UserStore from "@entities/user/model/store/UserStore";

const FeedPage: React.FC = (() => {
    const isAuth: Boolean = toJS(UserStore.isAuth);
    const postsData: iPost[] = postStore?.postsData || [];
    const users: IUser[] = userStore?.usersData || [];

    if (!isAuth) useRouterMiddleware();

    return (
        <main className="main">
            {users.length > 0 &&
                <PostList posts={postsData}/>
            }

            {users.length > 0 &&
                <aside className="aside">
                    <CartInfo nameCart={"Подписки"} children={
                        <UserSummaryList users={users}/>
                    }/>
                </aside>
            }

            {users.length === 0 &&
                <AlertBlock
                    alertTitle={"У вас нету подписок"}
                    alertDescr={"Воспользуйтесь поиском, чтобы подписаться на других пользователей."}
                />
            }
        </main>
    );
});

export default FeedPage;
