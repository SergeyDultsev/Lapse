"use client";

import React from "react";
import CartInfo from "@/widgets/cart-info/CartInfo";
import PostList from "@/widgets/post-list/ui/PostList";
import UserList from "@/widgets/cart-info/ui/user-list/UserList";
import iPost from "@/entities/post/model/types/iPost";
import iUserBrief from "@/entities/user/model/types/iUserBrief";
import postStore from "@/entities/post/model/PostStore";
import userStore from "@/entities/user/model/UserStore";
import AlertBlock from "@/widgets/alert-block/AlertBlock";

const MainPage: React.FC = (() => {
    const postsData: iPost[] = postStore?.postsData || [];
    const users: iUserBrief[] = userStore?.usersData || [];

    return (
        <main className="main">
            {users.length > 0 &&
                <PostList posts={postsData}/>
            }

            {users.length > 0 &&
                <aside className="aside">
                    <CartInfo nameCart={"Подписки"} children={
                        <UserList users={users}/>
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
