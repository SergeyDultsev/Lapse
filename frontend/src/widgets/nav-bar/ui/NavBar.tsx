'use client';

import React from 'react';
import styles from './NavBar.module.scss';
import { NavItem } from '@/shared';
import { createNavBarItems } from '../config/navbar.config';
import { useMe } from '@entities/auth';

const NavBar: React.FC = () => {
    const { data: me } = useMe();

    const items = createNavBarItems(me?.id);

    return (
        <nav className={styles['nav-bar']}>
            {items
            .filter((item) => item.isVisible).map((item) => (
                <NavItem key={item.name} {...item} />
            ))}
        </nav>
    );
};

export default NavBar;