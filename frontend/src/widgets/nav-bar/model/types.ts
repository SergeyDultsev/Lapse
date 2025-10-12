import { ReactNode } from "react";

export default interface INavLink {
    name: string;
    icon: ReactNode | null;
    url?: string;
    isProtected?: boolean;
    isLogout?: boolean;
}