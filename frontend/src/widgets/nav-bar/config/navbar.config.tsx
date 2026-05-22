import React, { ReactNode } from 'react';

import {
    ProfileIcon,
    ExploreIcon,
    SettingsIcon,
    ExitIcon,
    DarkModeIcon,
    SaveIcon,
} from 'shared';

export interface INavbarItems {
    name: string;
    isHidden?: boolean;
    layer: 'main' | 'secondary';
    url?: string;
    icon?: ReactNode;
    onClick?: () => void;
    keyFun?: string;
}

export const navbarItems: INavbarItems[] = [
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
        name: 'Тема',
        layer: 'secondary',
        icon: <DarkModeIcon />,
        keyFun: 'theme',
    },
    {
        name: 'Настройки',
        layer: 'secondary',
        url: '/settings',
        icon: <SettingsIcon />,
    },
    {
        name: 'Выход',
        layer: 'secondary',
        icon: <ExitIcon />,
        onClick: () => {},
        keyFun: 'logout',
    },
];