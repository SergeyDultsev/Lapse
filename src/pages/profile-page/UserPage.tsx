"use client";

import React, {useEffect} from "react";
import { useParams } from 'next/navigation';
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useRouterMiddleware } from "@/middleware/useRouterMiddleware";
import iUser from "@/entities/user/model/types/iUser";
import iPost from "@/entities/post/model/types/iPost";
import iTier from "@/entities/tier/model/types/iTier";
import UserStore from "@entities/user/model/store/UserStore";
import PostStore from "@/entities/post/model/store/PostStore";
import TierStore from "@/entities/tier/model/store/TierStore";
import ProfileInfo from "./ui/profile-info/ProfileInfo";
import PostList from "@/widgets/post-list/ui/PostList";
import TierList from "@/widgets/cart-info/tier-list/TierList"
import AlertBlock from "@/widgets/alert-block/AlertBlock";
import CartInfo from "@/widgets/cart-info/CartInfo";

const UserPage: React.FC = observer(() => {
    const { user_id } = useParams();
    const userData: iUser | null = toJS(UserStore.userData);
    const postsData: iPost[] = PostStore?.postsData || [];
    const tierData: iTier[] = TierStore?.tierData || [];

    useEffect(() => {
        if (user_id) {
            UserStore.getUserData(user_id);
            PostStore.getPostsByUserId(user_id);
            TierStore.getTiersById(user_id);
        }
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
                            user_id={userData.user_id}
                            avatar={userData.avatar_url}
                            full_name={userData.full_name}
                            subscriber_count={userData.subscriber_count}
                            subscriptions_count={userData.subscriptions_count}
                            about={userData.about}
                            is_self={userData.is_self}
                            is_follow={userData.is_follow}
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

export default useRouterMiddleware(UserPage);
