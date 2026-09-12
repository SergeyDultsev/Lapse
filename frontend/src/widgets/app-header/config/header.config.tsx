import React from 'react';
import { INavbarItem } from '@shared/ui/nav';

import {
    SettingsIcon,
    DarkModeIcon,
    ExitIcon, HistoryIcon, FavoriteIcon,
} from '@shared/ui/icon';

export const createNavDropItems = (fn: {
    toggleTheme: () => void;
    logout: () => void;
}): INavbarItem[] => [
    {
        name: 'Настройки',
        url: '/settings',
        icon: <SettingsIcon />,
        openInNewTab: true,
    },
    {
        name: 'История',
        url: '/history',
        icon: <HistoryIcon />,
        openInNewTab: true,
    },
    {
        name: 'Лайки',
        url: '/favorite',
        icon: <FavoriteIcon />,
        openInNewTab: true,
    },
    {
        name: 'Тема',
        icon: <DarkModeIcon />,
        onClick: fn.toggleTheme,
    },
    {
        name: 'Выход',
        icon: <ExitIcon />,
        onClick: fn.logout,
    },
];

export const TOP_DROP_DOWN_MENU: number = 60;
export const RIGHT_DROP_DOWN_MENU: number = 0;