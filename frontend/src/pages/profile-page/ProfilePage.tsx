'use client';

import React from 'react';

import PostList from '@/entities/post/ui/post-list/PostList';
import { LoaderBase } from '@/shared';
import { usePostsUser } from '@/entities/post/model/post.queries';
import { ProfileBar } from '@/widgets';

const ProfilePage: React.FC = () => {
    const { data, isPending } = usePostsUser();

    if (isPending) {
        return (
            <section className="loader-spinner__block">
                <LoaderBase />
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
            <ProfileBar />
            <PostList posts={data} />
        </main>
    );
};

export default ProfilePage;
