'use client'

import React from "react";
import styles from "./AuthorizeForm.module.scss";
import { observer } from "mobx-react-lite";
import AuthStore from "@/features/user/authorize/model/AuthStore";
import AuthPageStore from "@/pages/auth-page/store/AuthPageStore";
import InputDefault from "@/shared/ui/input/InputDefault";
import ButtonDefault from "@/shared/ui/button/ButtonDefault";

const AuthForm: React.FC = observer(() => {

    const handleAuthorize = (): void => {
        AuthPageStore.changeFormState('confirm');
    }

    return (
        <form className={styles["form"]}>
            <h2 className={styles['form-title']}>Авторизация</h2>
            <div className={styles['form-input__items']}>
            <InputDefault 
                placeholder={"Почта"} 
                type={'text'}
                value={AuthStore.email}
                onChange={(event) => AuthStore.setEmail(event.target.value)}
            />

            <InputDefault 
                placeholder={"Пароль"} 
                type={'password'}
                value={AuthStore.password}
                onChange={(event) => AuthStore.setPassword(event.target.value)}
            />
            </div>
            <ButtonDefault
                onClick={handleAuthorize}
                style={{ width: "100%" }} 
                active={true} 
                type="button" 
            >
                Авторизироваться
            </ButtonDefault>

            <p className={styles["form-notice"]}>
                Первый раз на сайте? 
                <span 
                    className={styles['form-notice__span']}
                    onClick={() => AuthPageStore.changeFormState("register")}
                >
                    Регистрация
                </span>
            </p>
        </form>
    );
})

export default AuthForm;