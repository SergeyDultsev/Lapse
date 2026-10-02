'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import styles from './AppHeader.module.scss';
import Logo from '../../../../public/Logo';
import { globalConfig } from '@shared/config/global.config';
import AuthModal from '@modules/auth/components/auth-modal/AuthModal';
import PostCreateModal from '@modules/posts/components/post-create-modal/PostCreateModal';
import { useMe } from '@modules/auth/model/auth.queries';
import { UIButton } from '@shared/ui/ui-button/ui/UIButton';
import { useModal } from '@/providers/ModalProvider';
import { UIDrop } from '@shared/ui/ui-drop/ui/UIDrop';
import { RIGHT_DROP_DOWN_MENU, TOP_DROP_DOWN_MENU } from '@widgets/app-header/config/header.config';
import useHeader from '@widgets/app-header/lib/useHeader';

const AppHeader: React.FC = () => {
    const { items } = useHeader();
    const { data: me } = useMe();
    const modal = useModal();

    const [isDrop, setDrop] = useState(false);

    const openAuthModal = () => {
        modal?.openModal(<AuthModal mode={'register'} />);
    };

    const openPostCreateModal = () => {
        modal?.openModal(<PostCreateModal />);
    };
    
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
                        <UIButton
                            onClick={openAuthModal}
                            variant={'primary'}
                            size={'sm'}
                        >
                            Авторизация
                        </UIButton>
                    )}

                    {me && (
                        <UIButton
                            onClick={openPostCreateModal}
                            variant={'primary'}
                            size={'sm'}
                        >
                            Написать пост
                        </UIButton>
                    )}
                </div>

                {me && (
                    <div
                        className={styles['header-left__avatar']}
                        onClick={() => setDrop(!isDrop)}
                    >
                    </div>
                )}

                <UIDrop
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