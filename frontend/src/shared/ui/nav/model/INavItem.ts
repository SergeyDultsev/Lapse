import { ReactNode } from 'react';

export interface INavbarItem {
    name: string;
    isHidden?: boolean;
    url?: string;
    icon?: ReactNode;
    onClick?: () => void;
}