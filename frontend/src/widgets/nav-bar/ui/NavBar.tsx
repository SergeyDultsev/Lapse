'use client';

import React from 'react';
import styles from './NavBar.module.scss';
import NavItem from '@/widgets/nav-bar/ui/nav-item/NavItem';
import { navbarItems } from '../config/navbar.config';

import { useNavCallbaks } from '@widgets/nav-bar/hooks/useNavCallbaks';

const NavBar: React.FC = () => {
    const { getCallback } = useNavCallbaks();

    return (
        <nav className={styles['nav-bar']}>
            {navbarItems
                .filter(item => item.layer !== 'secondary')
                .map((item) => (
                <NavItem key={item.name} {...item} />
            ))}

             <hr className={styles['nav-border']} />

            {navbarItems
                .filter(item => item.layer !== 'main')
                .map((item) => (
                    <NavItem
                        key={item.name}
                        {...item}
                        onClick={item.onClick || getCallback(item.keyFun)}
                    />
                ))
            }
        </nav>
    );
};

export default NavBar;