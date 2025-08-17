'use client'

import React from "react";
import styles from "./HeaderApp.module.scss";
import { BaseButton, BaseInput } from '@shared';
import { SwitcherTheme } from "@features";
import MenuItems from "@widgets/header-app/model/menuItems";
import Link from "next/link";
import DropdownMenu from "@widgets/dropdown-menu/DropdownMenu";

const HeaderApp: React.FC = () => {
    return (
        <header className={styles['header']}>
            <div className={styles['header__left']}></div>

            <BaseInput
                className={styles['header__search']}
                type={"search"}
                placeholder={"Поиск"}
            />

            <div className={styles['header__right']}>
                <SwitcherTheme />

                <Link href={'/create-post'}>
                    <BaseButton
                        className={styles['header__write-post']}
                        description={'Написать пост'}
                    />
                </Link>

                <div className={styles['header__avatar']}>

                </div>
            </div>

            <DropdownMenu className={styles['header_dropdown__menu']} visible={true} menu={MenuItems}/>
        </header>
    );
};

export default HeaderApp;