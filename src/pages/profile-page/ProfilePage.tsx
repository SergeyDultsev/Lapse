"use client";

import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { useRouterMiddleware } from "@/middleware/useRouterMiddleware";
import iPost from "@/entities/post/model/types/iPost";
import iTier from "@/entities/tier/model/types/iTier";
import IUser from "@/entities/user/model/types/iUser";
import userStore from "@entities/user/model/store/UserStore";
import postStore from "@/entities/post/model/store/PostStore";
import tierStore from "@/entities/tier/model/store/TierStore";
import PostList from "@/widgets/post-list/ui/PostList";
import ProfileInfo from "./ui/profile-info/ProfileInfo";
import TierList from "@/widgets/cart-info/tier-list/TierList"
import AlertBlock from "@/widgets/alert-block/AlertBlock";
import CartInfo from "@/widgets/cart-info/CartInfo";

const ProfilePage: React.FC = observer(() => {
    const userData: IUser | null = toJS(userStore.userAuthorized);
    const postsData: iPost[] = toJS(postStore?.postsData) || [];
    const tierData: iTier[] = tierStore?.tierData || [];

    useEffect(() => {
        if(userData?.user_id) {
            postStore.getPostsByUserId(userData?.user_id);
            tierStore.getTiers(userData?.user_id);
        }
    }, [userData?.user_id])

    return (
        <main className="main">
            {!userData ? (
                <>Загрузка данных пользователя...</>
            ) : (
                <>
                    {postsData.length > 0 ? (
                        <PostList posts={postsData}/>
                    ) : (
                        <AlertBlock
                            alertTitle={"Вы ещё не публиковали посты"}
                            alertDescr={"Добавьте пост и он отобразится тут."}
                        />
                    )}

                    <aside className="aside">
                        <ProfileInfo
                            user_id={userData.user_id}
                            avatar={userData.avatar_url}
                            full_name={userData.full_name}
                            subscriber={userData.subscriber_count}
                            subscriptions={userData.subscriptions_count}
                            about={userData.about}
                        />

                        {tierData.length === 0 ? (
                            <AlertBlock
                                alertTitle={"Вы ещё не добавили свои VIP-подписки"}
                                alertDescr={"VIP-подписки будут отображаться тут."}
                            />
                        ) : (
                            <CartInfo
                                nameCart={"Уровни подписок"}
                                children={<TierList tiers={toJS(tierStore.tierData)}/>}
                            />
                        )}
                    </aside>
                </>
            )}
        </main>
    );
});

export default useRouterMiddleware(ProfilePage);
