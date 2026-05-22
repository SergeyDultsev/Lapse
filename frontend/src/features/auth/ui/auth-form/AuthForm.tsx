'use client';

import styles from './AuthForm.module.scss';
import { ButtonBase, InputBase } from '@/shared';
import { useState } from 'react';
import { tCredentialsForm, config } from '@features/auth/config/auth.configs';

const AuthForm: React.FC<{
    mode: tCredentialsForm
}> = ({ mode }) => {
    const [credentialsForm, setCredentialsForm] = useState<tCredentialsForm>(mode);
    const currentConfig = config[credentialsForm];

    return (
        <div className={styles['auth-form']}>

            {credentialsForm === 'login' ?
                (
                    <div className={styles['auth-form__header']}>
                        <h2 className={styles['auth-form__header__title']}>
                            { currentConfig.title }
                        </h2>
                    </div>
                ) : (
                    <div className={styles['auth-form__header']}>
                        <h2 className={styles['auth-form__header__title']}>
                            {currentConfig.title }
                        </h2>
                    </div>
                )
            }

            {credentialsForm === 'login' ?
                (
                    <div className={styles['auth-form__inputs']}>
                        <InputBase typeInput={'auth'} placeholder={'Почта'} />
                        <InputBase typeInput={'auth'} placeholder={'Пароль'} />
                    </div>
                ) : (

                    <div className={styles['auth-form__inputs']}>
                        <InputBase typeInput={'auth'} placeholder={'Имя пользвотеля'} />
                        <InputBase typeInput={'auth'} placeholder={'Почта'} />
                        <InputBase typeInput={'auth'} placeholder={'Пароль'} />
                        <InputBase typeInput={'auth'} placeholder={'Повтор пароля'} />
                    </div>
                )
            }

            {credentialsForm === 'login' ?
                (
                    <ButtonBase
                        size={'lg'}
                        variant={'secondary'}
                    >
                        { currentConfig.button }
                    </ButtonBase>
                ) : (
                    <ButtonBase
                        size={'lg'}
                        variant={'secondary'}
                    >
                        { currentConfig.button }
                    </ButtonBase>
                )
            }

            {credentialsForm === 'login' ?
                (
                    <div className={styles['auth-form__footer']}>
                        <p className={styles['auth-form__footer__description']}>Первый раз на сайте?</p>
                        <p
                            className={styles['auth-form__footer__link']}
                            onClick={() => setCredentialsForm('register')}
                        >
                            { currentConfig.footer }
                        </p>
                    </div>
                ) : (
                    <div className={styles['auth-form__footer']}>
                        <p className={styles['auth-form__footer__description']}>Уже есть аккаунт?</p>
                        <p
                            className={styles['auth-form__footer__link']}
                            onClick={() => setCredentialsForm('login')}
                        >
                            { currentConfig.footer }
                        </p>
                    </div>
                )
            }
        </div>
    );
};

export default AuthForm;