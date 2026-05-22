import type { Metadata } from 'next';
import TopicPage from '@/pages/topic-page/TopicPage';

export const metadata: Metadata = {
    title: 'Животные',
    description: 'Тема про животных',
};

export default function Topic() {
    return (
        <TopicPage
            id={'id'}
            title={'Название'}
            description={'Описание'}
            countPosts={2000}
            countReaders={100}
        />
    );
}
