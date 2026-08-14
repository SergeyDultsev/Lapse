import React from 'react';
import { INavbarItem } from '@shared/ui/nav/model/INavItem';

import {
    SettingsIcon,
    DarkModeIcon,
    ExitIcon,
} from 'shared';

export const createNavDropItems = (fn: {
    toggleTheme: () => void;
    logout: () => void;
}): INavbarItem[] => [
    {
        name: 'Настройки',
        url: '/settings',
        icon: <SettingsIcon />,
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