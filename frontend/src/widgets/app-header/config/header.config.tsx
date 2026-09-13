import React from 'react';
import { INavbarItem } from '@shared/ui/nav';

import Icon from "@shared/ui/icon/ui/Icon";

export const createNavDropItems = (fn: {
    toggleTheme: () => void;
    logout: () => void;
}): INavbarItem[] => [
    {
        name: 'Настройки',
        url: '/settings',
        icon: <Icon name={'Settings'} />,
        openInNewTab: true,
    },
    {
        name: 'История',
        url: '/history',
        icon: <Icon name={'History'} />,
        openInNewTab: true,
    },
    {
        name: 'Лайки',
        icon: <Icon name={'DarkMode'} />,
        openInNewTab: true,
    },
    {
        name: 'Тема',
        icon: <Icon name={'Exit'} />,
        onClick: fn.toggleTheme,
    },
    {
        name: 'Выход',
        icon: <Icon name={'Favorite'} />,
        onClick: fn.logout,
    },
];

export const TOP_DROP_DOWN_MENU: number = 60;
export const RIGHT_DROP_DOWN_MENU: number = 0;