'use client'

import React from "react";
import styles from "./NavBar.module.scss";
import NavItem from "@widgets/nav-bar/ui/nav-item/NavItem";

import HomeIcon from "@/assets/icon/HomeIcon";
import ProfileIcon from "@/assets/icon/ProfileIcon";
import SearchIcon from "@assets/icon/SearchIcon";
import NotificationIcon from "@assets/icon/NotificationIcon";
import HistoryIcon from "@assets/icon/HistoryIcon";
import TagsIcon from "@assets/icon/TagsIcon";
import SettingsIcon from "@assets/icon/SettingsIcon";
import ExitIcon from "@assets/icon/ExitIcon";

const NavBar: React.FC = () => {
    return (
        <nav className={styles['nav-bar']}>
            <NavItem
                name={'Главная'}
                url={'/'}
                icon={<HomeIcon />}
            />
            <NavItem
                name={'Профиль'}
                url={'/profile'}
                icon={<ProfileIcon />}
            />
            <NavItem
                name={'Поиск'}
                url={'/search'}
                icon={<SearchIcon />}
            />

            <hr className={styles["nav-border"]} />

            <NavItem
                name={'Уведомления'}
                url={'/notifications'}
                icon={<NotificationIcon />}
            />
            <NavItem
                name={'Истории'}
                url={'/history'}
                icon={<HistoryIcon />}
            />
            <NavItem
                name={'Теги'}
                url={'/tags'}
                icon={<TagsIcon />}
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