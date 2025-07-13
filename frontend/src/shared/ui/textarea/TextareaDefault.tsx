import React from "react";
import styles from "./TextareaDefault.module.scss";

interface ITextareaDefault {
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextareaDefault: React.FC<ITextareaDefault> = ({ placeholder, value, onChange }) => {
    return (
        <textarea 
            className={styles["form__textarea"]} 
            placeholder={placeholder} 
            value={value}
            onChange={onChange}
        />
    );
};

export default TextareaDefault;