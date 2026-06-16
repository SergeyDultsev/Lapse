'use client';

import React from 'react';

import { IPost, PostList } from '@/entities/post';
import { ProfileBar } from '@/widgets';
import { IUser } from '@entities/user';

interface IProfilePageProps {
    userData: IUser;
    userPosts: IPost[];
}

const ProfilePage: React.FC<IProfilePageProps> = ({ userData, userPosts }) => {
    return (
        <main className="main">
            <ProfileBar {...userData} />
            <PostList posts={userPosts} />
        </main>
    );
};

export default ProfilePage;
