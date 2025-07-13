'use client'

import React from "react";
import styles from "./style/AuthorizeForm.module.scss";
import { observer } from "mobx-react-lite";
import AuthorizePageModel from "@/pages/auth-page/model/AuthorizePageModel";
import InputDefault from "@/shared/ui/input/InputDefault";
import ButtonDefault from "@/shared/ui/button/ButtonDefault";
import LoginOrRegisterFormModel from "@features/user/authorize/LoginOrRegisterFormModel";

const RegisterForm: React.FC = observer(() => {

    const handleRegister = (): void => {
        AuthorizePageModel.changeFormState('confirm');
        LoginOrRegisterFormModel.cleanForm();
    }

    return (
        <form className={styles["form"]}>
            <h2 className={styles['form-title']}>Регистрация</h2>
            <div className={styles['form-input__items']}>
            <InputDefault 
                placeholder={"Имя"} 
                type={'text'}
                value={LoginOrRegisterFormModel.dataForm.name}
                onChange={(e) => LoginOrRegisterFormModel.setFormData('name', e.target.value)}
            />
            <InputDefault 
                placeholder={"Фамилия"} 
                type={'text'}
                value={LoginOrRegisterFormModel.dataForm.surname}
                onChange={(e) => LoginOrRegisterFormModel.setFormData('surname', e.target.value)}
            />
            <InputDefault 
                placeholder={"Почта"}
                type={'text'}
                value={LoginOrRegisterFormModel.dataForm.email}
                onChange={(e) => LoginOrRegisterFormModel.setFormData('email', e.target.value)}
            />
            <InputDefault 
                placeholder={"Пароль"} 
                type={'password'}
                value={LoginOrRegisterFormModel.dataForm.password}
                onChange={(e) => LoginOrRegisterFormModel.setFormData('password', e.target.value)}
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