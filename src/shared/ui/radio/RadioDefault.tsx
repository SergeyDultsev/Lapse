import React from "react";
import styles from "./RadioDefault.module.scss";
import InputDefault from "../input/InputDefault";

interface IRadioDefault {
    id: string | number,
    placeholder?: string,
    value: string | number
}

const RadioDefault: React.FC<IRadioDefault> = ({id, placeholder, value}) => {
    const stringId = String(id); 

    return (
        <div className={styles["form__radio"]}>
            <InputDefault id={stringId} type="radio" name="radio" value={value}/>
            <label className={styles["form__radio-label"]} htmlFor={stringId}>{placeholder} </label>
        </div>
    );
}

export default RadioDefault;