'use client'

import React from "react";
import styles from "./NavBar.module.scss";
import NavItem from "@/widgets/nav-bar/ui/nav-item/NavItem";

import ProfileIcon from "@/assets/icon/ProfileIcon";
import ExploreIcon from "@/assets/icon/ExploreIcon";
import SettingsIcon from "@/assets/icon/SettingsIcon";
import ExitIcon from "@/assets/icon/ExitIcon";
import PaletteIcon from "@/assets/icon/PaletteIcon";
import PetsIcon from "@/assets/icon/PetsIcon";
import MemoryIcon from "@/assets/icon/MemoryIcon";
import DarkModeIcon from "@/assets/icon/DarkModeIcon";
import SportIcon from "@/assets/icon/SportIcon";
import MusicIcon from "@/assets/icon/MusicIcon.";
import FlightIcon from "@/assets/icon/FlightIcon";
import MoneyIcon from "@/assets/icon/MoneyIcon";

import { useThemeStore } from "@/features";

import Logo from "@/assets/img/Logo";

const NavBar: React.FC = () => {
    const storeTheme = useThemeStore();

    return (
        <nav className={styles['nav-bar']}>
            <div
                className={styles['nav-logo']}
            >
                  <Logo  />
            </div>

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
                 onClick={storeTheme.toggleTheme}
                 name={'Тема'}
                 icon={<DarkModeIcon />}
             />

            <hr className={styles["nav-border"]} />

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

            <hr className={styles["nav-border"]} />

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