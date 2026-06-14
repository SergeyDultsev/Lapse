import React from 'react';
import { INavbarItem } from '@shared/ui/nav/model/INavItem';

import {
    ExploreIcon,
    ProfileIcon,
    SaveIcon,
} from 'shared';

export const createNavBarItems = (
    userId?: string
): INavbarItem[] => [
    {
        name: 'Лента',
        url: '/',
        icon: <ExploreIcon />,
        isVisible: true,
    },
    {
        name: 'Профиль',
        url: userId ? `/profile/${userId}` : '/profile',
        icon: <ProfileIcon />,
        isVisible: userId !== undefined,
    },
    {
        name: 'Избранное',
        url: '/favorite',
        icon: <SaveIcon />,
        isVisible: userId !== undefined,
    },
];