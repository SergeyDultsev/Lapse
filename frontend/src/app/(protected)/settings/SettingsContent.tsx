'use client';

import styles from './SettingsPage.module.scss';
import { UIButton } from '@shared/ui/ui-button/ui/UIButton';
import React from 'react';
import { useMe } from '@modules/auth/model/auth.queries';
import { createSettingsActions, createSettingsBarItems } from '@shared/config/settings.config';
import { useTheme } from '@/providers/ThemeProvider';

export default function SettingsContent() {
    const { data: me } = useMe();

    const { theme, toggleTheme } = useTheme();

    const settingItems = createSettingsBarItems(me ?? null, theme);
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
                                <p className={styles['settings-item__description']}>
                                    {item.description}
                                </p>
                            </div>
                            <UIButton
                                variant={item.buttonVariant}
                                type={item.buttonType}
                                size={item.buttonSize}
                                onClick={item.action ? settingActions[item.action] : undefined}
                            >
                                {item.buttonText}
                            </UIButton>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
