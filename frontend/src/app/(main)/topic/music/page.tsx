import type { Metadata } from "next";
import TopicPage from "@pages/topic-page/TopicPage";

export const metadata: Metadata = {
    title: 'Музыка',
    description: 'Тема про музыку',
};

export default function Music() {
    return (
        <TopicPage
            id={'music'}
            title={'Музыка'}
            description={'Тема про музыку'}
            countPosts={1200}
            countReaders={100}
        />
    );
}
