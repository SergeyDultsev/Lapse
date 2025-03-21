import React from "react";
import styles from "./InputDefault.module.scss";

interface IInputDefault {
    id?: string,
    name?: string,
    placeholder?: string,
    type?: string,
    value?: string | number
}

const InputDefault: React.FC<IInputDefault> = ({id, name, placeholder, type, value}) => {
    return (
        <input className={styles['form__input']} id={id} name={name} placeholder={placeholder} type={type} value={value}/>
    );
}

export default InputDefault;