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
    
    const [authData, setAuthData] = useState({
        username: '',
        email: '',
        password: '',
        repeatPassword: '',
    });

    const setForm = (fieldName: string, value: string | number) => {
        setAuthData(prevData => ({
          ...prevData,
          [fieldName]: value,
      }));
    };

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
                        <InputBase
                            name="email"
                            typeInput={'auth'}
                            placeholder={'Почта'}
                            required={true}
                            onChange={setForm}
                        />
                        <InputBase
                            name="password"
                            typeInput={'auth'}
                            placeholder={'Пароль'}
                            required={true}
                            onChange={setForm}
                        />
                    </div>
                ) : (
                    <div className={styles['auth-form__inputs']}>
                        <InputBase
                            name="username"
                            typeInput={'auth'}
                            placeholder={'Имя пользователя'}
                            required={true}
                            onChange={setForm}
                        />
                        <InputBase
                            name="email"
                            typeInput={'auth'}
                            placeholder={'Почта'}
                            required={true}
                            onChange={setForm}
                        />
                        <InputBase
                            name="password"
                            typeInput={'auth'}
                            placeholder={'Пароль'}
                            required={true}
                            onChange={setForm}
                        />
                        <InputBase
                            name="repeatPassword"
                            typeInput={'auth'}
                            placeholder={'Повтор пароля'}
                            required={true}
                            onChange={setForm}
                        />
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