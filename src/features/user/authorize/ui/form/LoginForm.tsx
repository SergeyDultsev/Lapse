'use client'

import React from "react";
import styles from "./style/AuthorizeForm.module.scss";
import { observer } from "mobx-react-lite";
import LoginFormModel from "@/features/user/authorize/model/LoginFormModel";
import AuthorizePageModel from '@/pages/auth-page/model/AuthorizePageModel';
import InputDefault from "@/shared/ui/input/InputDefault";
import ButtonDefault from "@/shared/ui/button/ButtonDefault";

const LoginForm: React.FC = observer(() => {

    const handleAuthorize = (): void => {
        AuthorizePageModel.changeFormState('confirm');
        LoginFormModel.cleanLoginForm();
    }

    return (
        <form className={styles["form"]}>
            <h2 className={styles['form-title']}>Авторизация</h2>
            <div className={styles['form-input__items']}>
                <InputDefault
                    placeholder={"Почта"}
                    type={'text'}
                    value={LoginFormModel.loginForm.email}
                    onChange={(event) => LoginFormModel.setLoginEmail(event.target.value)}
                />

                <InputDefault
                    placeholder={"Пароль"}
                    type={'password'}
                    value={LoginFormModel.loginForm.password}
                    onChange={(event) => LoginFormModel.setLoginPassword(event.target.value)}
                />
            </div>
            <ButtonDefault
                onClick={handleAuthorize}
                style={{width: "100%"}}
                active={true}
                type="button"
            >
                Авторизироваться
            </ButtonDefault>

            <p className={styles["form-notice"]}>
                Первый раз на сайте?
                <span
                    className={styles['form-notice__span']}
                    onClick={() => AuthorizePageModel.changeFormState("register")}
                >
                    Регистрация
                </span>
            </p>
            <p className={styles["form-notice"]}>
                <span
                    className={styles['form-notice__span']}
                    onClick={() => AuthorizePageModel.changeFormState("forgot")}
                >
                    Забыли пароль?
                </span>
            </p>
        </form>
    );
})

export default LoginForm;