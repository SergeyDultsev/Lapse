import ProfilePage from '@/pages/profile-page/ProfilePage';
import type { Metadata } from 'next';
import { getUser } from '@entities/user/api/getUser';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Профиль',
    description: 'Ваша страница',
};

export default async function Profile({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    const user = getUser(id);
    
    return (
        <ProfilePage />
    );
}
