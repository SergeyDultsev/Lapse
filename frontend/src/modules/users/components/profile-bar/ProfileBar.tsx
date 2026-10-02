'use client';

import React from 'react';

import styles from './ProfileBar.module.scss';
import { useProfileBar } from '@modules/users/lib/useProfileBar';
import { IUser } from '@modules/users/model/types';
import { UIButton } from '@shared/ui/ui-button/ui/UIButton';
import { useShortyNumber } from '@shared/utils/useShortyNumber';

const ProfileBar: React.FC<IUser> = (user: IUser) => {
    const { buttonMe, buttonUser, me } = useProfileBar(user.userId);

    return (
        <section className={styles['profile']}>
            <div className={styles['profile-info']}>
                <div className={styles['profile-info__image']}></div>
                <div className={styles['profile-info__content']}>
                    <h2 className={styles['profile-info__content__name']}>{ user.username }</h2>
                    <p className={styles['profile-info__content__data']}>{ user.bio }</p>
                    <p className={styles['profile-info__content__data']}>{ useShortyNumber(user.meta.countFollowers) } подписчиков</p>
                    <p className={styles['profile-info__content__data']}>{ useShortyNumber(user.meta.countSubscriptions) } подписок</p>
                </div>
            </div>
            <div className={styles['profile__btns']}>
                {me?.userId === user.userId ? (
                    buttonMe.map((button) => (
                        <UIButton variant={button.variant} size={button.size} key={button.children}>
                            { button.children }
                        </UIButton>
                    ))
                ): (
                    buttonUser.map((button) => (
                        <UIButton variant={button.variant} size={button.size} key={button.children}>
                            { button.children }
                        </UIButton>
                    ))
                )}
            </div>
        </section>
    );
};

export default ProfileBar;