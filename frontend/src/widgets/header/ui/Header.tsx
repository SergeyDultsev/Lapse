'use client';

import styles from './Header.module.scss';
import Logo from '@assets/img/Logo';
import { ButtonBase } from '@/shared';
import { useOpenModal } from '@providers/modal/model/modal.store';
import { AuthModal } from '@features';

const Header: React.FC = () => {
    const openModal = useOpenModal();
    const showLoginModal = () => openModal(<AuthModal mode={'login'} />);

    return (
        <header className={styles['header']}>
            <div className={styles['header-right']}>
                <Logo />
            </div>

            <div className={styles['header-left']}>

                <div className={styles['header-left__buttons']}>
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

                <div className={styles['header-left__avatar']}>

                </div>

            </div>
        </header>
    );
};

export default Header;