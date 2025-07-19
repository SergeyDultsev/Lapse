'use client'

import React from "react";
import {observer} from "mobx-react-lite";
import styles from "./HeaderApp.module.scss";
import { BaseButton, BaseInput } from '@shared';

const HeaderApp: React.FC = observer(() => {
    return (
        <header className={styles['header']}>
            <div></div>
            <BaseInput
                className={styles['header__search']}
                type={"search"}
                placeholder={"Поиск"}
            />
            <BaseButton
                className={styles['header__write-post']}
                description={'Написать пост'}
            />
        </header>
    );
});

export default HeaderApp;