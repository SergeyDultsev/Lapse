'use client'

import React from "react";
import PostList from "@/entities/post/ui/post-list/PostList";

const FeedPage: React.FC = () => {
    return (
        <main className="main">
            <PostList />
        </main>
    );
};

export default FeedPage;
