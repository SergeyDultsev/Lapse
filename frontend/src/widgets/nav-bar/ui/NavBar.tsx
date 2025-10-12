'use client'

import React from "react";
import { usePathname } from "next/navigation";
import styles from "./NavBar.module.scss";
import navLinkGroups from "@widgets/nav-bar/model/navLinks";
import Link from "next/link";

const NavBar: React.FC = () => {
    const currentRoute: string | null = usePathname();

    return (
        <nav className={styles['nav-bar']}>
            {navLinkGroups.map((group, idx) => (
                <ul className={styles['nav-list']} key={idx}>
                    {group.links.map(({ name, icon, url, isLogout, isProtected}) => (
                        isLogout ? (
                            <li className={styles["nav-item"]} key={name}>
                                <span className={styles['nav-item__icon']}>{icon}</span>
                                <p className={styles['nav-item__description']}> {name} </p>
                            </li>
                        ) : (
                            <Link href={url} key={name}>
                                <li
                                    className={`${currentRoute === url
                                        ? styles["nav-item__active"]
                                        : styles["nav-item"]
                                    }`}
                                >
                                    <span className={styles['nav-item__icon']}>{icon}</span>
                                    <p className={styles['nav-item__description']}>{name}</p>
                                </li>
                            </Link>
                        )
                    ))}
                    {idx !== navLinkGroups.length - 1 && (<hr className={styles["nav-border"]} />)}
                </ul>
            ))}
        </nav>
    );
};

export default NavBar;