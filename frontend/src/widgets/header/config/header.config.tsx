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