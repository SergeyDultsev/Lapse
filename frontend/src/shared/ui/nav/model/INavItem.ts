import { ReactNode } from 'react';

export interface INavbarItem {
    name: string;
    isVisible?: boolean;
    url?: string;
    icon?: ReactNode;
    onClick?: () => void;
}