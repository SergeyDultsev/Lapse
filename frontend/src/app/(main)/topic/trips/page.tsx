import type { Metadata } from "next";
import TopicPage from "@pages/topic-page/TopicPage";

export const metadata: Metadata = {
    title: 'Путешествия',
};

export default function Trips() {
    return (
        <TopicPage
            id={'trips'}
            title={'Путешествия'}
            description={'Тема про путешествия'}
            countPosts={1100}
            countReaders={100}
        />
    );
}
