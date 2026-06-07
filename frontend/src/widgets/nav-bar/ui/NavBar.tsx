'use client';

import React, { useMemo } from 'react';
import styles from './NavBar.module.scss';
import { NavItem } from '@/shared';
import { createNavBarItems } from '../config/navbar.config';

const NavBar: React.FC = () => {
    const items = useMemo(
        () => createNavBarItems(),
        []
    );

    return (
        <nav className={styles['nav-bar']}>
            {items
                .map((item) => (
                <NavItem key={item.name} {...item} />
            ))}

             <hr className={styles['nav-border']} />
        </nav>
    );
};

export default NavBar;