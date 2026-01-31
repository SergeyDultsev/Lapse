import type { Metadata } from 'next';
import TopicPage from '@/pages/topic-page/TopicPage';

export const metadata: Metadata = {
    title: 'Животные',
    description: 'Тема про животных',
};

export default function Animals() {
    return (
        <TopicPage
            id={'animals'}
            title={'Животные'}
            description={'Тема про животных'}
            countPosts={2000}
            countReaders={100}
        />
    );
}
