import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./style/AuthorizeForm.module.scss";
import ButtonDefault from "@/shared/ui/button/ButtonDefault";
import InputDefault from "@/shared/ui/input/InputDefault";
import OtpFormModel from "@/features/user/authorize/model/OtpFormModel";


const OtpForm: React.FC = observer(() => {
    const handleOtp = (): void => {
        //
    }

    return (
        <form className={styles["form"]} onSubmit={e => e.preventDefault()}>
            <h2 className={styles['form-title']}>Подтвердите вход по Email</h2>
            <p className={styles['form-descr']}>Код подтверждения отправлен вам на почту</p>
            <div className={styles['form-input__items']}>
                <InputDefault
                    placeholder={"Код подтверждения"}
                    type={'text'}
                    value={OtpFormModel.otpForm}
                    onChange={(event) => OtpFormModel.setOtpCode(event.target.value)}
                    maxlength={4}
                    minlength={4}
                />
            </div>
            <ButtonDefault
                onClick={handleOtp}
                style={{width: "100%"}}
                active={true}
                type="submit"
            >
                Подтвердить
            </ButtonDefault>
            <p className={styles["form-notice"]}>
                <span className={styles['form-notice__span']}>
                    Отправить повторно
                </span>
            </p>
        </form>
    );
})

export default OtpForm;