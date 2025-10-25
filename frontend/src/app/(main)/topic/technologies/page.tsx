import type { Metadata } from "next";
import TopicPage from "@pages/topic-page/TopicPage";

export const metadata: Metadata = {
    title: 'Технологии',
    description: 'Тема про технологии'
};

export default function Technologies() {
    return (
        <TopicPage
            id={'technologies'}
            title={'Технологии'}
            description={'Тема про технологии'}
            countPosts={1100}
            countReaders={100}
        />
    );
}
