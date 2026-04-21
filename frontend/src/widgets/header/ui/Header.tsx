'use client';

import styles from './Header.module.scss';
import Logo from '@assets/img/Logo';
import { BaseButton } from '@/shared';
import { useSetModal } from '@/providers';

const Header: React.FC = () => {
    const setModal = useSetModal();

    const showAuthModal = () => setModal('auth');

    return (
        <header className={styles['header']}>
            <div className={styles['header-right']}>
                <Logo />
            </div>

            <div className={styles['header-left']}>
                <BaseButton
                    onClick={showAuthModal}
                    variant={'primary'}
                    size={'sm'}
                >
                    Авторизация
                </BaseButton>
                <BaseButton
                    onClick={showAuthModal}
                    variant={'primary'}
                    size={'sm'}
                >
                    Написать пост
                </BaseButton>
            </div>
        </header>
    );
};

export default Header;