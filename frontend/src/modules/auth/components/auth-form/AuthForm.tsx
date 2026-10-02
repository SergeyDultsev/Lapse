'use client';

import styles from './AuthForm.module.scss';
import { UIButton } from '@shared/ui/ui-button/ui/UIButton';
import UIInput from '@shared/ui/ui-input/ui/UIInput';
import { tCredentialsForm } from '@shared/config/auth.configs';
import useAuth from '@modules/auth/lib/useAuth';
import { useModal } from '@/providers/ModalProvider';

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

    const modal = useModal();

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            if (credentialsForm === 'login') {
                await login({
                    email: authData.email,
                    password: authData.password,
                });
            } else {
                await register({
                    username: authData.username,
                    email: authData.email,
                    password: authData.password,
                    repeatPassword: authData.repeatPassword,
                });
            }

            modal?.closeModal();
        } catch (e) { console.error(e); }
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
                            { currentConfig.title }
                        </h2>
                    </div>
                )
            }

            {credentialsForm === 'login' ?
                (
                    <div className={styles['auth-form__inputs']}>
                        <UIInput
                            name="email"
                            typeInput={'auth'}
                            type={'email'}
                            placeholder={'Почта'}
                            required={true}
                            value={authData['email']}
                            onChange={setForm}
                        />
                        <UIInput
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
                        <UIInput
                            name="username"
                            typeInput={'auth'}
                            type={'text'}
                            placeholder={'Имя пользователя'}
                            required={true}
                            value={authData['username']}
                            onChange={setForm}
                        />
                        <UIInput
                            name="email"
                            typeInput={'auth'}
                            type={'email'}
                            placeholder={'Почта'}
                            required={true}
                            value={authData['email']}
                            onChange={setForm}
                        />
                        <UIInput
                            name="password"
                            typeInput={'auth'}
                            type={'password'}
                            placeholder={'Пароль'}
                            required={true}
                            value={authData['password']}
                            onChange={setForm}
                        />
                        <UIInput
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
                    <UIButton
                        size={'lg'}
                        variant={'secondary'}
                        type="submit"
                    >
                        { currentConfig.button }
                    </UIButton>
                ) : (
                    <UIButton
                        size={'lg'}
                        variant={'secondary'}
                        type="submit"
                    >
                        { currentConfig.button }
                    </UIButton>
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