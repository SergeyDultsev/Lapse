'use client';

import Link from 'next/link';
import React from 'react';
import styles from './Header.module.scss';
import Logo from '@assets/img/Logo';
import { ButtonBase } from '@/shared';
import { AuthModal } from '@features';
import { useMe } from '@entities/auth';
import { globalConfig } from '@shared/configs/global.config';
import { RIGHT_DROP_DOWN_MENU, TOP_DROP_DOWN_MENU } from '@widgets/header/config/header.config';
import useHeader from '@widgets/header/hooks/useHeader';
import DropMenu from '@shared/ui/nav/ui/drop-menu/DropMenu';

const Header: React.FC = () => {
    const {
        isDrop,
        openModal,
        setDrop,
        items,
    } = useHeader();

    const { data: me } = useMe();

    const isOpenModal = () => openModal(<AuthModal mode={'register'} />);

    return (
        <header
            className={styles['header']}
            style={{ maxWidth: `${globalConfig.containerWidth}px` }}
        >
            <Link href='/'>
                <div className={styles['header-right']}>
                    <Logo />
                </div>
            </Link>

            <div className={styles['header-left']}>

                <div className={styles['header-left__buttons']}>
                    {!me && (
                        <ButtonBase
                            onClick={isOpenModal}
                            variant={'primary'}
                            size={'sm'}
                        >
                            Авторизация
                        </ButtonBase>
                    )}

                    {me && (
                        <ButtonBase
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

export default Header;