import ProfilePage from '@/pages/profile-page/ProfilePage';
import { getUser } from '@entities/user';
import { IPost } from '@entities/post';

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

export default async function Profile({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const userPosts: IPost[] | [] = [];

    return (
        <ProfilePage
            id={id}
            userPosts={userPosts}
        />
    );
}
