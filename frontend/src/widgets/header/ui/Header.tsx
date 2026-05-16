'use client';

import styles from './Header.module.scss';
import Logo from '@assets/img/Logo';
import { ButtonBase } from '@/shared';
import { useSetModal } from '@/providers';

const Header: React.FC = () => {
    const setModal = useSetModal();

    const showLoginModal = () => setModal('login');

    return (
        <header className={styles['header']}>
            <div className={styles['header-right']}>
                <Logo />
            </div>

            <div className={styles['header-left']}>
                <ButtonBase
                    onClick={showLoginModal}
                    variant={'primary'}
                    size={'sm'}
                >
                    Авторизация
                </ButtonBase>
                <ButtonBase
                    variant={'primary'}
                    size={'sm'}
                >
                    Написать пост
                </ButtonBase>
            </div>
        </header>
    );
};

export default Header;