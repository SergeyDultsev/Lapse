'use client';

import styles from './Header.module.scss';
import Logo from '@assets/img/Logo';
import { ButtonBase } from '@/shared';
import { AuthModal } from '@features';
import useHeader from '@widgets/header/hooks/useHeader';
import DropMenu from '@shared/ui/nav/ui/drop-menu/DropMenu';
import { UserWidget } from '@entities/user';

const Header: React.FC = () => {
    const {
        isDrop,
        openModal,
        setDrop,
        items,
    } = useHeader();

    const isOpenModal = () => openModal(<AuthModal mode={'register'} />);

    return (
        <header className={styles['header']}>
            <div className={styles['header-right']}>
                <Logo />
            </div>

            <div className={styles['header-left']}>

                <div className={styles['header-left__buttons']}>
                    <ButtonBase
                        onClick={isOpenModal}
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

                <div
                    className={styles['header-left__avatar']}
                    onClick={() => setDrop(!isDrop)}
                >

                </div>

                <DropMenu
                    header={<UserWidget />}
                    navItems={items}
                    isVisible={isDrop}
                />
            </div>
        </header>
    );
};

export default Header;