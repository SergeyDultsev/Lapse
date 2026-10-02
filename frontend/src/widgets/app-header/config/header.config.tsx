import React from 'react';
import { UIIcon } from '@shared/ui/ui-icon/ui/UIIcon';
import { INavbarItem } from '@shared/ui/ui-nav-item/ui/UINavItem';

export const createNavDropItems = (fn: {
    toggleTheme: () => void;
    logout: () => void;
}): INavbarItem[] => [
    {
        name: 'Настройки',
        url: '/settings',
        icon: <UIIcon name={'Settings'} />,
        openInNewTab: true,
    },
    {
        name: 'История',
        url: '/history',
        icon: <UIIcon name={'History'} />,
        openInNewTab: true,
    },
    {
        name: 'Лайки',
        icon: <UIIcon name={'DarkMode'} />,
        openInNewTab: true,
    },
    {
        name: 'Тема',
        icon: <UIIcon name={'Favorite'} />,
        onClick: fn.toggleTheme,
    },
    {
        name: 'Выход',
        icon: <UIIcon name={'Exit'} />,
        onClick: fn.logout,
    },
];

export const TOP_DROP_DOWN_MENU: number = 60;
export const RIGHT_DROP_DOWN_MENU: number = 0;