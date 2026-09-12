import React from 'react';
import { INavbarItem } from '@shared/ui/nav';

import {
    ExploreIcon,
    ProfileIcon,
} from '@shared/ui/icon';

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
];