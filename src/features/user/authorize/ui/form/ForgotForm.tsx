import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./style/AuthorizeForm.module.scss";
import ButtonDefault from "@/shared/ui/button/ButtonDefault";
import InputDefault from "@/shared/ui/input/InputDefault";
import ForgotFormModel from "@/features/user/authorize/model/ForgotFormModel";

const ForgotForm: React.FC = observer(() => {
    const handleForgot = (): void => {
        //
    }

    return (
        <form className={styles["form"]}>
            <h2 className={styles['form-title']}>Введите email</h2>
            <InputDefault
                placeholder={"Почта"}
                type={'text'}
                value={ForgotFormModel.forgotForm.email}
                onChange={(event) => ForgotFormModel.setForgotEmail(event.target.value)}
            />
            <ButtonDefault
                onClick={handleForgot}
                style={{ width: "100%" }}
                active={true}
                type="button"
            >
                Отправить
            </ButtonDefault>
        </form>
    );
})

export default ForgotForm;