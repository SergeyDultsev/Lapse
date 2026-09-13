import React from 'react';
import { INavbarItem } from '@shared/ui/nav';

import ExploreIcon from '@assets/icons/ExploreIcon';
import ProfileIcon from '@assets/icons/ProfileIcon';

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