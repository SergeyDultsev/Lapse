'use client';

import styles from './AuthForm.module.scss';
import { ButtonBase, InputBase } from '@/shared';
import { tCredentialsForm } from '@features/auth/config/auth.configs';
import useAuth from '@features/auth/hooks/useAuth';

const AuthForm: React.FC<{
    mode: tCredentialsForm
}> = ({ mode }) => {
    const {
        login,
        register,
        credentialsForm,
        authData,
        currentConfig,
        setForm,
        setCredentialsForm,
    } = useAuth(mode);

    const onSubmit = (e) => {
        e.preventDefault();

        if (credentialsForm === 'login') {
            login({
                email: authData.email,
                password: authData.password,
            });
        } else {
            register({
                username: authData.username,
                email: authData.email,
                password: authData.password,
                repeatPassword: authData.repeatPassword,
            });
        }
    };
    
    return (
        <form className={styles['auth-form']} onSubmit={onSubmit}>

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
                            type={'email'}
                            placeholder={'Почта'}
                            required={true}
                            value={authData['email']}
                            onChange={setForm}
                        />
                        <InputBase
                            name="password"
                            typeInput={'auth'}
                            type={'password'}
                            placeholder={'Пароль'}
                            required={true}
                            value={authData['password']}
                            onChange={setForm}
                        />
                    </div>
                ) : (
                    <div className={styles['auth-form__inputs']}>
                        <InputBase
                            name="username"
                            typeInput={'auth'}
                            type={'text'}
                            placeholder={'Имя пользователя'}
                            required={true}
                            value={authData['username']}
                            onChange={setForm}
                        />
                        <InputBase
                            name="email"
                            typeInput={'auth'}
                            type={'email'}
                            placeholder={'Почта'}
                            required={true}
                            value={authData['email']}
                            onChange={setForm}
                        />
                        <InputBase
                            name="password"
                            typeInput={'auth'}
                            type={'password'}
                            placeholder={'Пароль'}
                            required={true}
                            value={authData['password']}
                            onChange={setForm}
                        />
                        <InputBase
                            name="repeatPassword"
                            typeInput={'auth'}
                            type={'password'}
                            placeholder={'Повтор пароля'}
                            required={true}
                            value={authData['repeatPassword']}
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
                        type="submit"
                    >
                        { currentConfig.button }
                    </ButtonBase>
                ) : (
                    <ButtonBase
                        size={'lg'}
                        variant={'secondary'}
                        type="submit"
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
        </form>
    );
};

export default AuthForm;