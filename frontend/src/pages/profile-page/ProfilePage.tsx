'use client';

import React from 'react';

import Profile from '@/features/profile/ui/Profile';
import PostList from '@/entities/post/ui/post-list/PostList';
import { LoaderSpinner } from '@/shared';
import { usePostsUser } from '@/entities/post/model/post.queries';

const ProfilePage: React.FC = () => {
    const { data, isPending } = usePostsUser();

    if (isPending) {
        return (
            <section className="main">
                <LoaderSpinner />
            </section>
        );
    }

    if (!data) {
        return (
            <section className="main">
                <div>Нет данных</div>
            </section>
        );
    }
    
    return (
        <main className="main">
            <Profile />
            <PostList posts={data} />
        </main>
    );
};

export default ProfilePage;