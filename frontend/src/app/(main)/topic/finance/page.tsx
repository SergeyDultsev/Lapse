import type { Metadata } from 'next';
import TopicPage from '@/pages/topic-page/TopicPage';

export const metadata: Metadata = {
    title: 'Финансы',
    description: 'Тема про финансы',
};

export default function Finance() {
    return (
        <TopicPage
            id={'finance'}
            title={'Финансы'}
            description={'Тема про финансы'}
            countPosts={12000}
            countReaders={100}
        />
    );
}
