import ProfilePage from '@/pages/profile-page/ProfilePage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Профиль',
    description: 'Ваша страница',
};

export default function Profile() {
    return (
        <ProfilePage />
    );
}
