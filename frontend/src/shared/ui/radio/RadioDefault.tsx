import React from "react";
import styles from "./RadioDefault.module.scss";
import InputDefault from "../input/InputDefault";

interface IRadioDefault {
    id: string | number,
    placeholder?: string,
    value: string | number,
    onChange: () => void;
    checked?: boolean
}

const RadioDefault: React.FC<IRadioDefault> = ({id, placeholder, value, onChange, checked}) => {
    const stringId = String(id); 

    return (
        <div className={styles["form__radio"]}>
            <input 
                id={stringId} 
                type="radio" 
                name="radio" 
                value={value} 
                className={styles["radio-input"]} 
                onChange={onChange}
                checked={checked}
            />
            <label 
            className={styles["form__radio-label"]} 
            htmlFor={stringId}>
                {placeholder} 
            </label>
        </div>
    );
}

export default RadioDefault;