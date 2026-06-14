'use client';

import React from 'react';

import { PostList, usePostsUser } from '@/entities/post';
import { LoaderBase } from '@/shared';
import { ProfileBar } from '@/widgets';
import { IUser } from '@entities/user';

const ProfilePage: React.FC<string> = (id) => {
    const { data, isPending } = usePostsUser(id);

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
                Нет данных
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
