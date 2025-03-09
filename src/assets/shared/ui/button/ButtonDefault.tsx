import React from "react";
import styles from "./ButtonDefault.module.scss"

interface IButtonDefault {
    children: React.ReactNode,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    name: string | "",
    type: "button" | "reset" | "submit",
    disabled?: boolean,
    active: boolean
}

const ButtonDefault: React.FC<IButtonDefault> = ({ children, onClick, name, type, disabled, active }) => {
    return (
        <button 
        className={`${active ? styles["btn__active"] : styles["btn"]}`}
        onClick={onClick}
        name={name}
        type={type}
        disabled={disabled}
        >{ children }</button>
    );
}

export default ButtonDefault;