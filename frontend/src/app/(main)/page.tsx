import FeedPage from "@pages/feed-page/FeedPage";
import type { Metadata } from "next";
import LayoutWrapper from "@/app/(main)/layout-wrapper";

export const metadata: Metadata = {
    title: "Главная",
    description: "Главная страница",
};

export default function Home() {
    return (
        <LayoutWrapper>
            <FeedPage />
        </LayoutWrapper>
    );
}
