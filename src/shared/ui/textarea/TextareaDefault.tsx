import React from "react";
import styles from "./TextareaDefault.module.scss";

interface ITextareaDefault {
    placeholder?: string,
    type?: string,
}

const TextareaDefault: React.FC<ITextareaDefault> = ({placeholder}) => {
    return (
        <textarea className={styles["form__textarea"]} placeholder={placeholder}/>
    );
}

export default TextareaDefault;