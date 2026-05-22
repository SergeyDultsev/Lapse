'use client';

import React from 'react';
import styles from './NavBar.module.scss';
import NavItem from '@/widgets/nav-bar/ui/nav-item/NavItem';
import { navbarItems } from '../config/navbar.config';

import {
     useToggleTheme,
} from 'providers';

import { TagIcon } from "@/shared";

const NavBar: React.FC = () => {
    const toggleTheme = useToggleTheme();

    return (
        <nav className={styles['nav-bar']}>
            {navbarItems
                .filter(item => item.layer !== 'secondary')
                .map((item) => (
                <NavItem key={item.name} {...item} />
            ))}

             <hr className={styles['nav-border']} />

            <NavItem
                name={'Тег'}
                layer={'secondary'}
                url={'/topic'}
                icon={<TagIcon />}
            />

            <hr className={styles['nav-border']} />

            {navbarItems
                .filter(item => item.layer !== 'main')
                .map((item) => (
                    <NavItem
                        key={item.name}
                        {...item}
                        onClick={item.name === 'Тема' ? toggleTheme : item.onClick}
                    />
                ))
            }
        </nav>
    );
};

export default NavBar;