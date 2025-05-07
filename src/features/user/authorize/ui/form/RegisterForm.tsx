'use client'

import React from "react";
import styles from "./style/AuthorizeForm.module.scss";
import { observer } from "mobx-react-lite"; 
import RegisterFormModel from "@/features/user/authorize/model/RegisterFormModel";
import AuthorizePageModel from "@/pages/auth-page/model/AuthorizePageModel";
import InputDefault from "@/shared/ui/input/InputDefault";
import ButtonDefault from "@/shared/ui/button/ButtonDefault";

const RegisterForm: React.FC = observer(() => {

    const handleRegister = (): void => {
        AuthorizePageModel.changeFormState('confirm');
        RegisterFormModel.cleanRegisterForm();
    }

    return (
        <form className={styles["form"]}>
            <h2 className={styles['form-title']}>Регистрация</h2>
            <div className={styles['form-input__items']}>
            <InputDefault 
                placeholder={"Имя"} 
                type={'text'}
                value={RegisterFormModel.registerForm.name}
                onChange={(e) => RegisterFormModel.setRegisterName(e.target.value)}
            />
            <InputDefault 
                placeholder={"Фамилия"} 
                type={'text'}
                value={RegisterFormModel.registerForm.surname}
                onChange={(e) => RegisterFormModel.setRegisterSurname(e.target.value)}
            />
            <InputDefault 
                placeholder={"Почта"} 
                type={'text'}
                value={RegisterFormModel.registerForm.email}
                onChange={(e) => RegisterFormModel.setRegisterEmail(e.target.value)}
            />
            <InputDefault 
                placeholder={"Пароль"} 
                type={'password'}
                value={RegisterFormModel.registerForm.password}
                onChange={(e) => RegisterFormModel.setRegisterPassword(e.target.value)}
            />
            <InputDefault
                placeholder={"Повтор пароля"} 
                type={'password'}
                value={RegisterFormModel.registerForm.repeatPassword}
                onChange={(e) => RegisterFormModel.setRegisterRepeatPassword(e.target.value)}
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
                    onClick={() => AuthorizePageModel.changeFormState("auth")}
                >
                    Авторизация
                </span>
            </p>
        </form>
    );
})

export default RegisterForm;