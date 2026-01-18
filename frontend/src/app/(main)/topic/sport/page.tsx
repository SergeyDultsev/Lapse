import type { Metadata } from "next";
import TopicPage from "@/pages/topic-page/TopicPage";

export const metadata: Metadata = {
    title: 'Спорт',
    description: 'Тема про спорт',
};

export default function Sport() {
    return (
        <TopicPage
            id={'sport'}
            title={'Спорт'}
            description={'Тема про спорт'}
            countPosts={100}
            countReaders={100}
        />
    );
}
