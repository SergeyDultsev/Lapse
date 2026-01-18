import ProfilePage from "@/pages/profile-page/ProfilePage";
import type { Metadata } from "next";
import LayoutWrapper from "@app/(main)/layout-wrapper";

export const metadata: Metadata = {
    title: "Профиль",
    description: "Ваша страница",
};

export default function Profile() {
    return (
        <LayoutWrapper>
            <ProfilePage />
        </LayoutWrapper>
    );
}
