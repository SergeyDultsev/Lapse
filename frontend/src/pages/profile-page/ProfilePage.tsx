'use client';

import React from 'react';

import { IPost, usePostsUser } from '@/entities/post';
import { IUser } from '@entities/user';
import { PostFeed } from '@widgets/post-feed';
import { ProfileBar } from '@widgets/profile-bar';

interface IProfilePageProps {
    userId: string;
    user: IUser;
    posts: IPost[];
}

const ProfilePage: React.FC<IProfilePageProps> = ({ user, posts, userId }) => {
    const { data: updatedPosts, isLoading } = usePostsUser(userId);

    const displayPosts = updatedPosts?.posts ?? posts ?? [];

    return (
        <main className="main">
            <ProfileBar {...user} />
            <PostFeed posts={displayPosts} isLoading={isLoading} />
        </main>
    );
};

export default ProfilePage;
