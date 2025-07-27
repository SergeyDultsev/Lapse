'use client'

import React from "react";
import styles from "./HeaderApp.module.scss";
import { BaseButton, BaseInput } from '@shared';
import { SwitcherTheme } from "@features";

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
                <BaseButton
                    className={styles['header__write-post']}
                    description={'Написать пост'}
                />
            </div>
        </header>
    );
};

export default HeaderApp;