"use client";

import React from "react";
import iPost from "@/entities/post/model/types/iPost";
import postStore from "@/entities/post/model/PostStore";
import ProfileInfo from "./ui/profile-info/ProfileInfo";
import PostList from "@/widgets/post-list/ui/PostList";
import AlertBlock from "@/widgets/alert-block/AlertBlock";

const ProfilePage: React.FC = (() => {
    const postsData: iPost[] = postStore?.postsData || [];

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
            
            <ProfileInfo />
        </main>
    );
});

export default ProfilePage;
