import React from 'react';
import { INavbarItem } from '@shared/ui/nav/model/INavItem';

import {
    ExploreIcon,
    ProfileIcon,
    FavoriteIcon,
    HistoryIcon,
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
        name: 'История',
        url: '/history',
        icon: <HistoryIcon />,
        isVisible: userId !== undefined,
    },
    {
        name: 'Лайки',
        url: '/favorite',
        icon: <FavoriteIcon />,
        isVisible: userId !== undefined,
    },
];