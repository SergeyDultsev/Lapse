import ProfilePage from '@/pages/profile-page/ProfilePage';
import { getUserById } from '@entities/user';
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

    const user = await getUserById(id);

    return {
        title: user?.username ?? 'Пользователь',
        description: user?.bio ?? 'Профиль пользователя',
    };
}

async function ProfileContent({ id }: { id: string }) {
    const [userData, userPosts] = await Promise.all([
        getUserById(id),
        getPostsByUserId(id),
    ]);

    if (!userData) {
        notFound();
    }

    const postList = userPosts.posts;
    console.log(postList);

    return (
        <ProfilePage
            userId={id}
            user={userData}
            posts={postList || []}
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
