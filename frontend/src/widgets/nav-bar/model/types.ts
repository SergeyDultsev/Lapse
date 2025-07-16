import { ReactNode } from "react";

export default interface INavLinks {
    name: string;
    icon: ReactNode | null;
    url?: string;
    isProtected?: boolean;
}