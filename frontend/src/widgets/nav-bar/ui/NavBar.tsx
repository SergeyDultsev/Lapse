'use client'

import React from "react";
import {observer} from "mobx-react-lite";
import {usePathname} from "next/navigation";
import styles from "./NavBar.module.scss";
import NavLinks from "@widgets/nav-bar/model/navLinks";

const NavBar: React.FC = observer(() => {
    const currentRoute: string | null = usePathname();

    return (
        <nav className={styles['nav-bar']}>
            <ul className={styles['nav-list']}>
                {NavLinks.map(({name, icon, url, isProtected}) => (
                    <li
                        className={`${currentRoute === url ? styles["nav-item__active"] : styles["nav-item"]}`}
                        key={name}
                    >
                            <span className={styles['nav-item__icon']}>
                                {icon}
                            </span>
                        <p className={styles['nav-item__description']}> {name} </p>
                    </li>
                ))}
            </ul>
        </nav>
    );
});

export default NavBar;