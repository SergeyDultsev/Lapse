'use client';

import React from 'react';
import styles from './NavBar.module.scss';
import { NavItem } from '@/shared';
import { createNavBarItems } from '../config/navbar.config';
import { useMe } from '@entities/auth';

const NavBar: React.FC = () => {
    const { data: me } = useMe();

    const items = createNavBarItems(me?.userId);

    return (
        <nav className={styles['nav-bar']}>
            {items
                .filter((item) => item.isVisible).map((item) => (
                    <NavItem key={item.name} {...item} />
                ))}
            <div className={styles['nav-border']} />
        </nav>
    );
};

export default NavBar;