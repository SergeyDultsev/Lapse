'use client';

import React from 'react';

import { IPost, PostList } from '@/entities/post';
import { ProfileBar } from '@/widgets';
import { IUser, useUser } from '@entities/user';

interface IProfilePageProps {
    id: string;
    userPosts: IPost[];
}

const ProfilePage: React.FC<IProfilePageProps> = ({ id, userPosts }) => {
    const { data: userData, isLoading } = useUser(id);

    if (isLoading) {
        return <main className="main"><div>Загрузка...</div></main>;
    }

    if (!userData) {
        return <main className="main"><div>Пользователь не найден</div></main>;
    }

    return (
        <main className="main">
            <ProfileBar {...userData} />
            <PostList posts={userPosts} />
        </main>
    );
};

export default ProfilePage;
