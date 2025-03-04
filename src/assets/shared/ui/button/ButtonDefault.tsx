import React from "react";
import styles from "./ButtonDefault.module.scss"

interface IButtonDefault {
    children: React.ReactNode;
    name: string | "",
    type: "button" | "reset" | "submit",
    disabled: boolean,
    active: boolean
}

const ButtonDefault: React.FC<IButtonDefault> = ({ children, name, type, active }) => {
    return (
        <button 
        className={`${active ? styles["btn__active"] : styles["btn"]}`}
        name={name}
        type={type}  
        disabled
        >{ children }</button>
    );
}

export default ButtonDefault;