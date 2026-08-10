'use client';

import styles from './Header.module.scss';
import Logo from '@assets/img/Logo';
import { ButtonBase } from '@/shared';
import { AuthModal } from '@features';
import useHeader from '@widgets/header/hooks/useHeader';
import DropMenu from '@shared/ui/nav/ui/drop-menu/DropMenu';
import { UserWidget } from '@entities/user';
import { useMe } from '@entities/auth';
import { globalConfig } from '@shared/configs/global.config';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React from 'react';

const Header: React.FC = () => {
    const {
        isDrop,
        openModal,
        setDrop,
        items,
    } = useHeader();

    const { data: me } = useMe();

    const isOpenModal = () => openModal(<AuthModal mode={'register'} />);

    const currentRoute = usePathname();

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
                    // header={<UserWidget />}
                    navItems={items}
                    isVisible={isDrop}
                />
            </div>
        </header>
    );
};

export default Header;