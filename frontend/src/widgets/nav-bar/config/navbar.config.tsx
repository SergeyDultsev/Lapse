import React, { ReactNode } from 'react';

import {
    ProfileIcon,
    ExploreIcon,
    SettingsIcon,
    ExitIcon,
    DarkModeIcon,
    SaveIcon,
} from 'shared';

export interface INavbarItem {
    name: string;
    isHidden?: boolean;
    layer: 'main' | 'secondary';
    url?: string;
    icon?: ReactNode;
    onClick?: () => void;
}

export const createNavbarItems = (fun: {
    toggleTheme: () => void;
}): INavbarItem[] => [
    {
        name: 'Лента',
        layer: 'main',
        url: '/',
        icon: <ExploreIcon />,
    },
    {
        name: 'Профиль',
        layer: 'main',
        url: '/profile',
        icon: <ProfileIcon />,
    },
    {
        name: 'Избранное',
        layer: 'main',
        url: '/favorite',
        icon: <SaveIcon />,
    },
    {
        name: 'Настройки',
        layer: 'secondary',
        url: '/settings',
        icon: <SettingsIcon />,
    },
    {
        name: 'Тема',
        layer: 'secondary',
        icon: <DarkModeIcon />,
        onClick: fun.toggleTheme,
    },
    {
        name: 'Выход',
        layer: 'secondary',
        icon: <ExitIcon />,
    },
];