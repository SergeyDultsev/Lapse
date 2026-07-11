'use client';

import React from 'react';

import styles from './ProfileBar.module.scss';
import ButtonBase from '@shared/ui/button/button-base/ButtonBase';
import { shortyNumber } from '@/shared';
import { IUser } from '@entities/user';
import { useProfileBar } from '@widgets/profile-bar/hooks/useProfileBar';

const ProfileBar: React.FC<IUser> = (
    {
        id,
        username,
        bio,
        countFollowers,
        countSubscriptions,
    }) => {

    const { buttonMe, buttonUser, me } = useProfileBar(id);

    return (
        <section className={styles['profile']}>
            <div className={styles['profile-info']}>
                <div className={styles['profile-info__image']}></div>
                <div className={styles['profile-info__content']}>
                    <h2 className={styles['profile-info__content__name']}>{ username }</h2>
                    <p className={styles['profile-info__content__data']}>{ bio }</p>
                    <p className={styles['profile-info__content__data']}>{ shortyNumber(countFollowers) } подписчиков</p>
                    <p className={styles['profile-info__content__data']}>{ shortyNumber(countSubscriptions) } подписок</p>
                </div>
            </div>
            <div className={styles['profile__btns']}>
                {me?.id === id ? (
                    buttonMe.map((button) => (
                        <ButtonBase variant={button.variant} size={button.size} key={button.children}>
                            { button.children }
                        </ButtonBase>
                    ))
                ): (
                    buttonUser.map((button) => (
                        <ButtonBase variant={button.variant} size={button.size} key={button.children}>
                            { button.children }
                        </ButtonBase>
                    ))
                )}
            </div>
        </section>
    );
};

export default ProfileBar;