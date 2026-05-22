'use client';

import React from 'react';
import styles from './NavBar.module.scss';
import NavItem from '@/widgets/nav-bar/ui/nav-item/NavItem';

import {
     useToggleTheme,
} from 'providers';

import {
    ProfileIcon,
    ExploreIcon,
    SettingsIcon,
    ExitIcon,
    DarkModeIcon,
    SaveIcon,
    TagIcon,
} from 'shared';

const NavBar: React.FC = () => {
    const toggleTheme = useToggleTheme();

    return (
        <nav className={styles['nav-bar']}>
            <NavItem
                name={'Лента'}
                url={'/'}
                icon={<ExploreIcon />}
            />
            <NavItem
                name={'Профиль'}
                url={'/profile'}
                icon={<ProfileIcon />}
            />
            <NavItem
                name={'Избранное'}
                url={'/favorite'}
                icon={<SaveIcon />}
            />

             <hr className={styles['nav-border']} />

            <NavItem
                name={'Тема'}
                url={'/topic'}
                icon={<TagIcon />}
            />

            <hr className={styles['nav-border']} />

            <NavItem
                onClick={toggleTheme}
                name={'Тема'}
                icon={<DarkModeIcon />}
            />
            <NavItem
                name={'Настройки'}
                url={'/settings'}
                icon={<SettingsIcon />}
            />
            <NavItem
                name={'Выход'}
                icon={<ExitIcon />}
            />
        </nav>
    );
};

export default NavBar;