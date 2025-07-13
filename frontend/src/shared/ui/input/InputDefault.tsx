import React, {CSSProperties} from "react";
import clsx from "clsx";
import styles from "./InputDefault.module.scss";

interface IInputDefault {
    id?: string,
    style?: CSSProperties
    className?: string; 
    name?: string,
    placeholder?: string,
    type?: string,
    value?: string | number,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    maxlength?: number,
    minlength?: number
}

const InputDefault: React.FC<IInputDefault> = ({id, style, className, name, placeholder, type, value, onChange, maxlength, minlength}) => {
    return (
        <input 
            className={clsx(styles['form__input'], className)}
            style={style}
            id={id} 
            name={name} 
            placeholder={placeholder} 
            type={type} value={value} 
            onChange={onChange}
            maxLength={maxlength}
            minLength={minlength}
        />
    );
}

export default InputDefault;