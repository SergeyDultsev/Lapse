"use client";

import React, {useEffect} from "react";
import { useParams } from 'next/navigation';
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import iPost from "@/entities/post/model/types/iPost";
import iTier from "@/entities/tier/model/types/iTier";
import postStore from "@/entities/post/model/store/PostStore";
import tierStore from "@/entities/tier/model/store/TierStore";
import ProfileInfo from "./ui/profile-info/ProfileInfo";
import PostList from "@/widgets/post-list/ui/PostList";
import TierList from "@/widgets/cart-info/tier-list/TierList"
import AlertBlock from "@/widgets/alert-block/AlertBlock";
import CartInfo from "@/widgets/cart-info/CartInfo";
import PostStore from "@/entities/post/model/store/PostStore";
import TierStore from "@/entities/tier/model/store/TierStore";
import IUser from "@/entities/user/model/types/iUser";
import useRouterToPage from "@/shared/utils/useRouterToPage.tx";
import { useUserStore } from "@/providers/UserStoreContext";

const UserPage: React.FC = observer(() => {
    const navigateTo = useRouterToPage();
    const UserStore = useUserStore();
    const { user_id } = useParams();
    const userData: IUser | null = toJS(UserStore.userData);
    const postsData: iPost[] = postStore?.postsData || [];
    const tierData: iTier[] = tierStore?.tierData || [];

    if (UserStore.userAuthorized?.userId === user_id) navigateTo('/profile');
    console.log(UserStore.userAuthorized?.userId);

    useEffect(() => {
        if(user_id) UserStore.getUserData(user_id);
    }, [user_id]);

    return (
        <main className="main">
            {!userData ? (
                <>Загрузка данных пользователя...</>
            ) : (
                <>
                    {postsData.length > 0 ? (
                        <PostList posts={PostStore.postsData}/>
                    ) : (
                        <AlertBlock
                            alertTitle={"Вы ещё не публиковали посты"}
                            alertDescr={"Добавьте пост и он отобразится тут."}
                        />
                    )}

                    <aside className="aside">
                        <ProfileInfo
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

export default UserPage;
