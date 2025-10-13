'use client'

import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import styles from "./NavItem.module.scss";
import Link from "next/link";

interface NavItemProps {
    name: string;
    url?: string;
    icon: ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ name, url, icon }) => {
    const currentRoute = usePathname();

    if (!url) {
        return (
            <li className={styles["nav-item"]}>
                <span className={styles['nav-item__icon']}>{icon}</span>
                <p className={styles['nav-item__description']}>{name}</p>
            </li>
        );
    }

    return (
        <Link href={url}>
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
    );
};

export default NavItem;