'use client';

import React from 'react';

import { IPost, PostList, usePostsUser } from '@/entities/post';
import { IUser } from '@entities/user';
import { ProfileBar } from '@/widgets';

interface IProfilePageProps {
    userId: string;
    user: IUser;
    posts: IPost[];
}

const ProfilePage: React.FC<IProfilePageProps> = ({ user, posts, userId }) => {
    const { data: updatedPosts, isLoading } = usePostsUser(userId);

    const displayPosts = updatedPosts || posts;

    return (
        <main className="main">
            <ProfileBar {...user} />
            <PostList posts={displayPosts} isLoading={isLoading} />
        </main>
    );
};

export default ProfilePage;
