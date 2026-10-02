'use client';

import React from 'react';
import styles from './NavBar.module.scss';
import { createNavBarItems } from '../config/navbar.config';
import { useMe } from '@modules/auth/model/auth.queries';
import UINavItem from '@shared/ui/ui-nav-item/ui/UINavItem';

const NavBar: React.FC = () => {
    const { data: me } = useMe();

    const items = createNavBarItems(me?.userId);

    return (
        <nav className={styles['nav-bar']}>
            {items
                .filter((item) => item.isVisible).map((item) => (
                    <UINavItem key={item.name} {...item} />
                ))}
            <div className={styles['nav-border']} />
        </nav>
    );
};

export default NavBar;