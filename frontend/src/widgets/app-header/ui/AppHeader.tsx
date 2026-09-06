'use client';

import Link from 'next/link';
import React from 'react';
import styles from './AppHeader.module.scss';
import Logo from '@assets/img/Logo';
import { ButtonBase } from '@/shared';
import { AuthModal, PostCreateModal } from '@features';
import { useMe } from '@entities/auth';
import { globalConfig } from '@shared/configs/global.config';
import { RIGHT_DROP_DOWN_MENU, TOP_DROP_DOWN_MENU } from '@widgets/app-header/config/header.config';
import useHeader from '@widgets/app-header/hooks/useHeader';
import DropMenu from '@shared/ui/nav/ui/drop-menu/DropMenu';

const AppHeader: React.FC = () => {
    const {
        isDrop,
        openModal,
        setDrop,
        items,
    } = useHeader();

    const { data: me } = useMe();

    const isOpenAuthModal = () => openModal(<AuthModal mode={'register'} />);
    const isOpenPostCreateModal = () => openModal(<PostCreateModal />);
    
    return (
        <header
            className={styles['header']}
            style={{ maxWidth: `${globalConfig.containerWidth}px` }}
        >
            <Link href='/frontend/public'>
                <div className={styles['header-right']}>
                    <Logo />
                </div>
            </Link>

            <div className={styles['header-left']}>

                <div className={styles['header-left__buttons']}>
                    {!me && (
                        <ButtonBase
                            onClick={isOpenAuthModal}
                            variant={'primary'}
                            size={'sm'}
                        >
                            Авторизация
                        </ButtonBase>
                    )}

                    {me && (
                        <ButtonBase
                            onClick={isOpenPostCreateModal}
                            variant={'primary'}
                            size={'sm'}
                        >
                            Написать пост
                        </ButtonBase>
                    )}
                </div>

                {me && (
                    <div
                        className={styles['header-left__avatar']}
                        onClick={() => setDrop(!isDrop)}
                    >
                    </div>
                )}

                <DropMenu
                    navItems={items}
                    isVisible={isDrop}
                    onClose={() => setDrop(false)}
                    top={TOP_DROP_DOWN_MENU}
                    right={RIGHT_DROP_DOWN_MENU}
                />
            </div>
        </header>
    );
};

export default AppHeader;