"use client";

import React from "react";
import iPost from "@/entities/post/model/types/iPost";
import iTier from "@/entities/tier/model/types/iTier";
import postStore from "@/entities/post/model/store/PostStore";
import tierStore from "@/entities/tier/model/store/TierStore";
import ProfileInfo from "./ui/profile-info/ProfileInfo";
import PostList from "@/widgets/post-list/ui/PostList";
import TierList from "@/widgets/cart-info/tier-list/TierList"
import AlertBlock from "@/widgets/alert-block/AlertBlock";
import CartInfo from "@/widgets/cart-info/CartInfo";

const UserPage: React.FC = (() => {
    const postsData: iPost[] = postStore?.postsData || [];
    const tierData: iTier[] = tierStore?.tierData || [];

    return (
        <main className="main">
            {postsData.length > 0 &&
                <PostList posts={postsData}/>
            }

            {postsData.length === 0 &&
                <AlertBlock
                    alertTitle={"Пользователь ещё не публиковали посты"}
                    alertDescr={null}
                />
            }

            <aside className="aside">
                <ProfileInfo full_name={'Сергей Дульцев'} followers={20} readers={20} about={'Мое описание'}/>

                {tierData.length === 0 ? (
                    <AlertBlock
                        alertTitle={"Пользователь ещё не добавили свои VIP-подпсики"}
                        alertDescr={null}
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

export default UserPage;
