import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./style/AuthorizeForm.module.scss";
import ButtonDefault from "@/shared/ui/button/ButtonDefault";
import InputDefault from "@/shared/ui/input/InputDefault";
import UserStore from "@/entities/user/model/store/UserStore";
import LoginOrRegisterFormModel from "@/features/user/authorize/model/LoginOrRegisterFormModel";
import useRouterToPage from "@/shared/utils/useRouterToPage.tx";


const OtpForm: React.FC = observer(() => {
    const navigateTo = useRouterToPage();

    const handleAuthorize = async (): Promise<void> => {
        await UserStore.loginOrRegisterUser();
        console.log("Страница OTP", UserStore.userAuthorized);
        navigateTo('/profile');
    }

    const sendOtpCodeRepeat = async (): Promise<void> => {
        await UserStore.getOtpCode();
    }

    return (
        <form className={styles["form"]} onSubmit={e => e.preventDefault()}>
            <h2 className={styles['form-title']}>Подтвердите вход по Email</h2>
            <p className={styles['form-descr']}>Код подтверждения отправлен вам на почту</p>
            <div className={styles['form-input__items']}>
                <InputDefault
                    placeholder={"Код подтверждения"}
                    type={'text'}
                    value={LoginOrRegisterFormModel.dataForm.otp_code}
                    onChange={(event) => LoginOrRegisterFormModel.setFormData('otp_code', event.target.value)}
                    maxlength={4}
                    minlength={4}
                />
            </div>
            <ButtonDefault
                onClick={handleAuthorize}
                style={{width: "100%"}}
                active={true}
                type="submit"
            >
                Подтвердить
            </ButtonDefault>
            <p className={styles["form-notice"]} onClick={sendOtpCodeRepeat}>
                <span className={styles['form-notice__span']}>
                    Отправить повторно
                </span>
            </p>
        </form>
    );
})

export default OtpForm;