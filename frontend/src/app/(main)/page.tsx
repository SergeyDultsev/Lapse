import FeedPage from '@pages/feed-page/FeedPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Главная',
    description: 'Главная страница',
};

export default function Home() {
    return (
        <FeedPage />
    );
}
