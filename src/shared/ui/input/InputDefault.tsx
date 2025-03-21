import React from "react";
import styles from "./InputDefault.module.scss";

interface IInputDefault {
    placeholder?: string,
    type?: string,
}

const InputDefault: React.FC<IInputDefault> = ({placeholder, type}) => {
    return (
        <input className={styles['input__item']} placeholder={placeholder} type={type}/>
    );
}

export default InputDefault;