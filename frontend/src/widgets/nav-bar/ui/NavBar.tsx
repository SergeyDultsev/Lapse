'use client'

import React from "react";
import {usePathname} from "next/navigation";
import styles from "./NavBar.module.scss";
import NavLinks from "@widgets/nav-bar/model/navLinks";
import Link from "next/link";

const NavBar: React.FC = () => {
    const currentRoute: string | null = usePathname();

    return (
        <nav className={styles['nav-bar']}>
            <ul className={styles['nav-list']}>
                {NavLinks.map(({name, icon, url, isProtected}) => (
                    <Link href={url} key={name}>
                        <li
                            className={`${currentRoute === url ? styles["nav-item__active"] : styles["nav-item"]}`}
                            key={name}
                        >
                            <span className={styles['nav-item__icon']}>
                                {icon}
                            </span>
                            <p className={styles['nav-item__description']}> {name} </p>
                        </li>
                    </Link>
                ))}
            </ul>
        </nav>
    );
};

export default NavBar;