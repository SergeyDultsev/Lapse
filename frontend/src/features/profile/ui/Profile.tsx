'use client';

import React from 'react';

import styles from './Profile.module.scss';
import BaseButton from '@shared/ui/buttons/base-button/BaseButton';
import { shortyNumber } from '@/shared';

const Profile: React.FC = () => {
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
                <BaseButton description={'Редактирование профиля'} className={styles['profile__btn']} />
                <BaseButton description={'Подписаться'} className={styles['profile__btn']} />
            </div>
        </section>
    );
};

export default Profile;