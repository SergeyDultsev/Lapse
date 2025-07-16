'use client'

import React from "react";
import {observer} from "mobx-react-lite";
import styles from "./NavBar.module.scss";
import NavLinks from "@widgets/nav-bar/model/navLinks";

const NavBar: React.FC = observer(() => {
    return (
        <nav className={styles['nav-bar']}>
            <ul className={styles['nav-list']}>
                {NavLinks.map(({name, icon, url, isProtected}) => (
                    <li className={styles['nav-item']} key={name}>
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