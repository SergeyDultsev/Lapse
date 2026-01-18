import type { Metadata } from "next";
import TopicPage from "@/pages/topic-page/TopicPage";

export const metadata: Metadata = {
    title: 'Творчество',
    description: 'Тема про творчество',
};

export default function Creation() {
    return (
        <TopicPage
            id={'creation'}
            title={'Творчество'}
            description={'Тема про творчество'}
            countPosts={300}
            countReaders={100}
        />
    );
}
