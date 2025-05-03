import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./AuthorizeForm.module.scss";
import ButtonDefault from "@/shared/ui/button/ButtonDefault";
import PinCode from "@/widgets/pin-code/PinCode";

const ConfirmForm: React.FC = observer(() => {
    return (
        <form className={styles["form"]}>
            <h2 className={styles['form-title']}>Подтвердите вход по смс</h2>
            <p className={styles['form-descr']}>Код подтверждения отправлен вам на почту</p>
            <PinCode/>
            <ButtonDefault
                style={{ width: "100%" }} 
                active={true} 
                type="button" 
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

export default ConfirmForm;