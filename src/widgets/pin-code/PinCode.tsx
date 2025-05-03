import React, {useEffect} from "react";
import styles from "./PinCode.module.scss"
import {observer} from "mobx-react-lite";
import PinCodeStore from "./store/PinCodeStore";
import InputDefault from "@/shared/ui/input/InputDefault";
import AuthStore from "@/features/user/authorize/model/AuthStore";

const PinCode: React.FC = observer(() => {
    const otpCode = PinCodeStore.otpCode;

    return (
        <form className={styles["pin-code__list"]}>
        <InputDefault 
            className={styles["pin-code__item"]}
            value={otpCode[0] || ''}
            onChange={(e) => PinCodeStore.setOtpCode(0, e.target.value)} 
        />
        <InputDefault 
            className={styles["pin-code__item"]}
            value={otpCode[1] || ''}
            onChange={(e) => PinCodeStore.setOtpCode(1, e.target.value)} 
        />
        <InputDefault 
            className={styles["pin-code__item"]}
            value={otpCode[2] || ''}
            onChange={(e) => PinCodeStore.setOtpCode(2, e.target.value)} 
        />
        <InputDefault 
            className={styles["pin-code__item"]}
            value={otpCode[3] || ''}
            onChange={(e) => PinCodeStore.setOtpCode(3, e.target.value)} 
        />
        </form>
    );
});

export default PinCode;