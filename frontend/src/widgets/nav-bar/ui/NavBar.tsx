'use client';

import React, { useMemo } from 'react';
import styles from './NavBar.module.scss';
import NavItem from '@/widgets/nav-bar/ui/nav-item/NavItem';
import { createNavbarItems } from '../config/navbar.config';

import {
    useToggleTheme,
} from 'providers';

const NavBar: React.FC = () => {
    const toggleTheme = useToggleTheme();

    const items = useMemo(
        () => createNavbarItems({ toggleTheme }),
        [toggleTheme]
    );

    return (
        <nav className={styles['nav-bar']}>
            {items
                .filter(item => item.layer !== 'secondary')
                .map((item) => (
                <NavItem key={item.name} {...item} />
            ))}

             <hr className={styles['nav-border']} />

            {items
                .filter(item => item.layer !== 'main')
                .map((item) => (
                    <NavItem
                        key={item.name}
                        {...item}
                    />
                ))
            }
        </nav>
    );
};

export default NavBar;