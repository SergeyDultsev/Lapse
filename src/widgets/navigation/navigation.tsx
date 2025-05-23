'use client'

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import UserStore from "@entities/user/model/store/UserStore";
import styles from "./navigation.module.scss";
import HomeIcon from "@/assets/icon/HomeIcon";
import ProfileIcon from "@/assets/icon/ProfileIcon";
import SearchIcon from "@/assets/icon/SearchIcon";
import AddIcon from "@/assets/icon/AddIcon";
import SaveIcon from "@/assets/icon/SaveIcon";
import SettingsIcon from "@/assets/icon/SettingsIcon";
import ExitIcon from "@/assets/icon/ExitIcon";
import Link from "next/link";
import {observer} from "mobx-react-lite";


const Navigation: React.FC = observer(() => {
    const router = useRouter();
    const currentRoute = usePathname();

    const logoutHandle = (): void => {
        UserStore.logout();
        router.push('/authorize');
    }

    const toAuthorization = (): void => {
        router.push('/authorize');
    }

    return (
        <section className={styles["nav"]}>
            {UserStore.isAuth ? (
                <nav className={styles["nav-list"]}>
                    <Link href="/"
                          className={`${currentRoute === '/' ? styles["nav-item__active"] : styles["nav-item"]}`}>
                        <HomeIcon/>
                        <p className={styles["nav-item__descr"]}>Главная</p>
                    </Link>
                    <Link href="/profile"
                          className={`${currentRoute === '/profile' ? styles["nav-item__active"] : styles["nav-item"]}`}>
                        <ProfileIcon/>
                        <p className={styles["nav-item__descr"]}>Профиль</p>
                    </Link>
                    <Link href="/search"
                          className={`${currentRoute === '/search' ? styles["nav-item__active"] : styles["nav-item"]}`}>
                        <SearchIcon/>
                        <p className={styles["nav-item__descr"]}>Поиск</p>
                    </Link>
                    <Link href="/create"
                          className={`${currentRoute === '/create' ? styles["nav-item__active"] : styles["nav-item"]}`}>
                        <AddIcon/>
                        <p className={styles["nav-item__descr"]}>Создать</p>
                    </Link>
                    <Link href="/favorites"
                          className={`${currentRoute === '/favorites' ? styles["nav-item__active"] : styles["nav-item"]}`}>
                        <SaveIcon/>
                        <p className={styles["nav-item__descr"]}>Избранное</p>
                    </Link>
                    <Link href="/settings"
                          className={`${currentRoute === '/settings' ? styles["nav-item__active"] : styles["nav-item"]}`}>
                        <SettingsIcon/>
                        <p className={styles["nav-item__descr"]}>Настройки</p>
                    </Link>
                    <div className={styles["nav-item"]} onClick={logoutHandle}>
                        <ExitIcon/>
                        <p className={styles["nav-item__descr"]}>Выход</p>
                    </div>
                </nav>
            ) : (
                <nav className={styles["nav-list"]}>
                    <Link href="/"
                          className={`${currentRoute === '/' ? styles["nav-item__active"] : styles["nav-item"]}`}>
                        <HomeIcon/>
                        <p className={styles["nav-item__descr"]}>Главная</p>
                    </Link>
                    <Link href="/search"
                          className={`${currentRoute === '/search' ? styles["nav-item__active"] : styles["nav-item"]}`}>
                        <SearchIcon/>
                        <p className={styles["nav-item__descr"]}>Поиск</p>
                    </Link>
                    <div className={styles["nav-item"]} onClick={toAuthorization}>
                        <ExitIcon/>
                        <p className={styles["nav-item__descr"]}>Авторизация</p>
                    </div>
                </nav>
            )}
        </section>
    );
});

export default Navigation;