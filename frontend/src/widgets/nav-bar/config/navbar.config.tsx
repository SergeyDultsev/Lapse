import React from 'react';
import { INavbarItem } from '@shared/ui/nav/model/INavItem';

import {
    ExploreIcon,
    ProfileIcon,
    SaveIcon,
} from 'shared';

export const createNavBarItems = (): INavbarItem[] => [
    {
        name: 'Лента',
        url: '/',
        icon: <ExploreIcon />,
    },
    {
        name: 'Профиль',
        url: '/profile',
        icon: <ProfileIcon />,
    },
    {
        name: 'Избранное',
        url: '/favorite',
        icon: <SaveIcon />,
    },
];