import React from "react";
import styles from "./navigation.module.scss";
import HomeIcon from "@/assets/icon/HomeIcon";
import ProfileIcon from "@/assets/icon/ProfileIcon";
import SearchIcon from "@/assets/icon/SearchIcon";
import AddIcon from "@/assets/icon/AddIcon";
import SaveIcon from "@/assets/icon/SaveIcon";
import SettingsIcon from "@/assets/icon/SettingsIcon";
import ExitIcon from "@/assets/icon/ExitIcon";

const Navigation: React.FC = () => {
    return (
        <nav className={styles["nav"]}>
            <div className={styles["nav-item"]}>
                <HomeIcon/>
                <p className={styles["nav-item__descr"]}>Главная</p>
            </div>
            <div className={styles["nav-item"]}>
                <ProfileIcon/>
                <p className={styles["nav-item__descr"]}>Профиль</p>
            </div>
            <div className={styles["nav-item"]}>
                <SearchIcon/>
                <p className={styles["nav-item__descr"]}>Поиск</p>
            </div>
            <div className={styles["nav-item"]}>
                <AddIcon/>
                <p className={styles["nav-item__descr"]}>Создать</p>
            </div>
            <div className={styles["nav-item"]}>
                <SaveIcon/>
                <p className={styles["nav-item__descr"]}>Избранное</p>
            </div>
            <div className={styles["nav-item"]}>
                <SettingsIcon/>
                <p className={styles["nav-item__descr"]}>Настройки</p>
            </div>
            <div className={styles["nav-item"]}>
                <ExitIcon/>
                <p className={styles["nav-item__descr"]}>Выход</p>
            </div>
        </nav>
    );
}

export default Navigation;