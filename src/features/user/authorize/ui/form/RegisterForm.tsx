'use client'

import React from "react";
import styles from "./AuthorizeForm.module.scss";
import { observer } from "mobx-react-lite"; 
import AuthStore from "@/features/user/authorize/model/AuthStore";
import AuthPageStore from "@/pages/auth-page/store/AuthPageStore";
import InputDefault from "@/shared/ui/input/InputDefault";
import ButtonDefault from "@/shared/ui/button/ButtonDefault";

const RegisterForm: React.FC = observer(() => {

    const handleRegister = (): void => {
        AuthPageStore.changeFormState('confirm');
    }

    return (
        <form className={styles["form"]}>
            <h2 className={styles['form-title']}>Регистрация</h2>
            <div className={styles['form-input__items']}>
            <InputDefault 
                placeholder={"Имя"} 
                type={'text'}
                value={AuthStore.firstName}
                onChange={(e) => AuthStore.setFirstName(e.target.value)}
            />
            <InputDefault 
                placeholder={"Фамилия"} 
                type={'text'}
                value={AuthStore.lastName}
                onChange={(e) => AuthStore.setLastName(e.target.value)}
            />
            <InputDefault 
                placeholder={"Почта"} 
                type={'text'}
                value={AuthStore.email}
                onChange={(e) => AuthStore.setEmail(e.target.value)}
            />
            <InputDefault 
                placeholder={"Пароль"} 
                type={'password'}
                value={AuthStore.password}
                onChange={(e) => AuthStore.setPassword(e.target.value)}
            />
            <InputDefault 
                placeholder={"Повтор пароля"} 
                type={'password'}
                value={AuthStore.repeatPassword}
                onChange={(e) => AuthStore.setRepeatPassword(e.target.value)}
            />
            </div>
            <ButtonDefault
                onClick={handleRegister}
                style={{ width: "100%" }} 
                active={true} 
                type="button" 
                >
                    Зарегистрироваться
            </ButtonDefault>
            <p className={styles["form-notice"]}>Уже есть аккаунт? 
                <span 
                    className={styles['form-notice__span']}
                    onClick={() => AuthPageStore.changeFormState("auth")}>

                    Авторизация
                </span>
            </p>
        </form>
    );
})

export default RegisterForm;