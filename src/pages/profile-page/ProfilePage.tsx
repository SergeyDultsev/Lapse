"use client";

import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import iPost from "@/entities/post/model/types/iPost";
import iTier from "@/entities/tier/model/types/iTier";
import IUser from "@/entities/user/model/types/iUser";
import UserStore from "@entities/user/model/store/UserStore";
import PostStore from "@/entities/post/model/store/PostStore";
import TierStore from "@/entities/tier/model/store/TierStore";
import PostList from "@/widgets/post-list/ui/PostList";
import ProfileInfo from "./ui/profile-info/ProfileInfo";
import TierList from "@/widgets/cart-info/tier-list/TierList"
import AlertBlock from "@/widgets/alert-block/AlertBlock";
import CartInfo from "@/widgets/cart-info/CartInfo";

const ProfilePage: React.FC = observer(() => {
    const userData: IUser | null = toJS(UserStore.userAuthorized);
    const postsData: iPost[] = toJS(PostStore?.postsData) || [];
    const tierData: iTier[] = TierStore?.tierData || [];

    useEffect(() => {
        UserStore.authorizationCheck()
        if(userData?.user_id) PostStore.getPostsByUserId(userData?.user_id);
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
                                children={<TierList tiers={TierStore.tierData}/>}
                            />
                        )}
                    </aside>
                </>
            )}
        </main>
    );
});

export default ProfilePage;
