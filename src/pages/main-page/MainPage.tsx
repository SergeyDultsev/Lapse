"use client";

import React from "react";
import CartInfo from "@/widgets/cart-info/CartInfo";
import PostList from "@/widgets/post-list/ui/PostList";
import UserSummaryList from "@/widgets/cart-info/user-summary-list/UserBriefList";
import iPost from "@/entities/post/model/types/iPost";
import IUserSummary from "@/entities/user/model/types/iUserSummary";
import postStore from "@/entities/post/model/PostStore";
import userStore from "@/entities/user/model/UserStore";
import AlertBlock from "@/widgets/alert-block/AlertBlock";

const MainPage: React.FC = (() => {
    const postsData: iPost[] = postStore?.postsData || [];
    const users: IUserSummary[] = userStore?.usersSummaryData || [];

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

export default MainPage;
