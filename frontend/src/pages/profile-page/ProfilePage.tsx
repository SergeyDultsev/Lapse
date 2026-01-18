'use client';

import React from 'react';

import Profile from '@/widgets/profile/Profile';
import PostList from "@/entities/post/ui/post-list/PostList";

const ProfilePage: React.FC = () => {
    return (
        <main className="main">
            <Profile />
            <PostList />
        </main>
    );
}

export default ProfilePage;