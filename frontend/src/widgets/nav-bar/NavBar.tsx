'use client';

import React from 'react';
import styles from './NavBar.module.scss';
import NavItem from '@/widgets/nav-bar/ui/nav-item/NavItem';

import { useToggleTheme } from 'providers';

import {
    ProfileIcon,
    ExploreIcon,
    SettingsIcon,
    ExitIcon,
    PaletteIcon,
    PetsIcon,
    MemoryIcon,
    DarkModeIcon,
    SportIcon,
    MusicIcon,
    FlightIcon,
    MoneyIcon,
    SaveIcon,
    UserAdd,
    AddIcon,
} from 'shared';

import Logo from '@/assets/img/Logo';

const NavBar: React.FC = () => {
    const toggleTheme = useToggleTheme();

    return (
        <nav className={styles['nav-bar']}>
            <div
                className={styles['nav-logo']}
            >
                  <Logo  />
            </div>

            <NavItem
                name={'Авторизация'}
                url={'/auth/login'}
                icon={<ProfileIcon />}
            />
            <NavItem
                name={'Регистрация'}
                url={'/auth/register'}
                icon={<UserAdd />}
            />
            <NavItem
                name={'Создать пост'}
                url={'/create'}
                icon={<AddIcon />}
            />
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
                name={'Творчество'}
                url={'/topic/creation'}
                icon={<PaletteIcon />}
            />
            <NavItem
                name={'Животные'}
                url={'/topic/animals'}
                icon={<PetsIcon />}
            />
            <NavItem
                name={'Технологии'}
                url={'/topic/technologies'}
                icon={<MemoryIcon />}
            />
            <NavItem
                name={'Спорт'}
                url={'/topic/sport'}
                icon={<SportIcon />}
            />
            <NavItem
                name={'Финансы'}
                url={'/topic/finance'}
                icon={<MoneyIcon />}
            />
            <NavItem
                name={'Музыка'}
                url={'/topic/music'}
                icon={<MusicIcon />}
            />
            <NavItem
                name={'Путешествия'}
                url={'/topic/trips'}
                icon={<FlightIcon />}
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