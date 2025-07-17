'use client'

import React from "react";
import {observer} from "mobx-react-lite";
import styles from "./HeaderApp.module.scss";
import { DefaultButton } from '@shared';

const HeaderApp: React.FC = observer(() => {
    return (
        <header className={styles['header']}>
            <input type="search" placeholder="Поиск"/>
            <DefaultButton
                description={'Написать пост'}
            />
        </header>
    );
});

export default HeaderApp;