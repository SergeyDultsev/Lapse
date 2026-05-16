'use client';

import React from 'react';

import styles from './ProfileBar.module.scss';
import ButtonBase from '@shared/ui/button/button-base/ButtonBase';
import { shortyNumber } from '@/shared';

const ProfileBar: React.FC = () => {
    return (
        <section className={styles['profile']}>
            <div className={styles['profile-info']}>
                <div className={styles['profile-info__image']}></div>
                <div className={styles['profile-info__content']}>
                    <h2 className={styles['profile-info__content__name']}>Сергей Дульцев</h2>
                    <p className={styles['profile-info__content__data']}>CEO и основатель платформы.</p>
                    <p className={styles['profile-info__content__data']}> { shortyNumber(15470) } подписчиков</p>
                </div>
            </div>
            <div className={styles['profile__btns']}>
                <ButtonBase variant={'primary'} size={'md'}>
                    Редактирование профиля
                </ButtonBase>
                <ButtonBase variant={'primary'} size={'md'} >
                    Подписаться
                </ButtonBase>
            </div>
        </section>
    );
};

export default ProfileBar;