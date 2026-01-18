import type { Metadata } from "next";
import LayoutWrapper from "@app/(main)/layout-wrapper";

export const metadata: Metadata = {
    title: "Настройки",
};

export default function Settings() {
    return (
        <LayoutWrapper>
            <div>Настройки</div>
        </LayoutWrapper>
    );
}
