import { getUserById } from '@modules/users/api/getUserById';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';
import UILoader from '@shared/ui/ui-loader/ui/UILoader';
import ProfileBar from '@modules/users/components/profile-bar/ProfileBar';
import PostFeed from '@modules/posts/components/post-feed/PostFeed';
import { getPostsByUserId } from '@modules/posts/api/getPostsByUserId';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    const user = await getUserById(id);

    return {
        title: user?.username ?? 'Пользователь',
        description: user?.bio ?? 'Профиль пользователя',
    };
}

async function ProfileContent({ id }: { id: string }) {
    const [user, posts] = await Promise.all([
        getUserById(id),
        getPostsByUserId(id),
    ]);

    if (!user) {
        notFound();
    }

    return (
        <main className="main">
            <ProfileBar { ...user} />
            <PostFeed posts={posts?.data ?? []} />
        </main>
    );
}

export default async function Profile({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    return (
        <Suspense fallback={<UILoader />}>
            <ProfileContent id={id} />
        </Suspense>
    );
}