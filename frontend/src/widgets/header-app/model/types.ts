import { ReactNode } from "react";

export default interface IMenuItem {
    name: string;
    icon: ReactNode | null;
    url?: string;
    event?: () => void;
}