import ProfilePage from '@/pages/profile-page/ProfilePage';
import { getUser } from '@entities/user';
import { getPostsByUserId } from '@entities/post';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { LoaderBase } from '@/shared';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    const user = await getUser(id);

    return {
        title: user?.username ?? 'Пользователь',
        description: user?.bio ?? 'Профиль пользователя',
    };
}

async function ProfileContent({ id }: { id: string }) {
    const [userData, userPosts] = await Promise.all([
        getUser(id),
        getPostsByUserId(id),
    ]);

    if (!userData) {
        notFound();
    }

    return (
        <ProfilePage
            userId={id}
            user={userData}
            posts={userPosts || []}
        />
    );
}

export default async function Profile({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    return (
        <Suspense fallback={<LoaderBase />}>
            <ProfileContent id={id} />
        </Suspense>
    );
}
