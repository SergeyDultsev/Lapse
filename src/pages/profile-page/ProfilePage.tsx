"use client";

import React from "react";
import iPost from "@/entities/post/model/types/iPost";
import iTier from "@/entities/tier/model/types/iTier";
import postStore from "@/entities/post/model/PostStore";
import tierStore from "@/entities/tier/model/TierStore";
import ProfileInfo from "./ui/profile-info/ProfileInfo";
import PostList from "@/widgets/post-list/ui/PostList";
import TierList from "@/widgets/cart-info/tier-list/TierList"
import AlertBlock from "@/widgets/alert-block/AlertBlock";
import CartInfo from "@/widgets/cart-info/CartInfo";

const ProfilePage: React.FC = (() => {
    const postsData: iPost[] = postStore?.postsData || [];
    const tierData: iTier[] = tierStore?.tierData || [];

    return (
        <main className="main">
            {postsData.length > 0 &&
                <PostList posts={postsData}/>
            }

            {postsData.length === 0 &&
                <AlertBlock
                    alertTitle={"Вы ещё не публиковали посты"}
                    alertDescr={"Добавьте пост и он отобразиться тут."}
                />
            }

            <aside className="aside">
                <ProfileInfo/>

                {tierData.length === 0 ? (
                    <AlertBlock
                        alertTitle={"Вы ещё не добавили свои VIP-подпсики"}
                        alertDescr={"VIP-подпсики будут отображаться тут."}
                    />
                ) : (
                    <CartInfo
                        nameCart={"Уровни подписок"}
                        children={<TierList tiers={tierData}/>}
                    />
                )}
            </aside>
        </main>
    );
});

export default ProfilePage;
