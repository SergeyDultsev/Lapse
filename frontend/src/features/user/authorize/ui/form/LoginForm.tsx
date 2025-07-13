'use client'

import React from "react";
import styles from "./style/AuthorizeForm.module.scss";
import { observer } from "mobx-react-lite";
import LoginOrRegisterFormModel from "@features/user/authorize/LoginOrRegisterFormModel";
import AuthorizePageModel from '@/pages/auth-page/model/AuthorizePageModel';
import InputDefault from "@/shared/ui/input/InputDefault";
import ButtonDefault from "@/shared/ui/button/ButtonDefault";
import UserStore from "@/entities/user/model/store/UserStore";

const LoginForm: React.FC = observer(() => {
    const handleGetOtpCode = (): void => {
        UserStore.getOtpCode();
        AuthorizePageModel.changeFormState('confirm');
    }

    return (
        <form className={styles["form"]}>
            <h2 className={styles['form-title']}>Авторизация</h2>
            <div className={styles['form-input__items']}>
                <InputDefault
                    placeholder={"Почта"}
                    type={'text'}
                    value={LoginOrRegisterFormModel.dataForm.email}
                    onChange={(event) => LoginOrRegisterFormModel.setFormData('email', event.target.value)}
                />

                <InputDefault
                    placeholder={"Пароль"}
                    type={'password'}
                    value={LoginOrRegisterFormModel.dataForm.password}
                    onChange={(event) => LoginOrRegisterFormModel.setFormData('password', event.target.value)}
                />
            </div>
            <ButtonDefault
                onClick={handleGetOtpCode}
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