import { getUserById } from '@modules/users/api/getUserById';
import { isApiError } from '@shared/api';
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

    try {
        const user = await getUserById(id);

        return {
            title: user?.username ?? 'Пользователь',
            description: user?.bio ?? 'Профиль пользователя',
        };
    } catch {
        return {
            title: 'Пользователь',
            description: 'Профиль пользователя',
        };
    }
}

async function ProfileContent({ id }: { id: string }) {
    let user;

    try {
        user = await getUserById(id);
    } catch (error) {
        if (isApiError(error, 404)) {
            notFound();
        }
        throw error;
    }

    const posts = await getPostsByUserId(id).catch(() => null);

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
