'use client';

import React from 'react';
import styles from './SettingsPage.module.scss';
import { useMe } from '@entities/auth';
import { useTheme, useToggleTheme } from '@/providers';
import { ButtonBase } from '@/shared';
import { createSettingsBarItems, createSettingsActions } from '@pages/settings-page/config/settings.config';

const SettingsPage: React.FC = () => {
    const { data: me } = useMe();

    const theme = useTheme();
    const toggleTheme = useToggleTheme();

    const settingItems = createSettingsBarItems(me, theme);
    const settingActions = createSettingsActions(toggleTheme);

    return (
        <main className="main">
            <section className={styles['settings-bar']}>
                <h3 className={styles['settings-title']}>
                    Настройки
                </h3>

                <hr className={styles['border']} />

                <div className={styles['settings-list']}>
                    {settingItems.map((item) => (
                        <div className={styles['settings-item']} key={item.id}>
                            <div className={styles['settings-item__info']}>
                                <h4 className={styles['settings-item__title']}>
                                    {item.title}
                                </h4>
                                <p className={styles['settings-item__descr']}>
                                    {item.description}
                                </p>
                            </div>
                            <ButtonBase
                                variant={item.buttonVariant}
                                type={item.buttonType}
                                size={item.buttonSize}
                                onClick={item.action ? settingActions[item.action] : undefined}
                            >
                                {item.buttonText}
                            </ButtonBase>
                        </div>
                    ))}
                </div>

            </section>
        </main>
    );
};

export default SettingsPage;
