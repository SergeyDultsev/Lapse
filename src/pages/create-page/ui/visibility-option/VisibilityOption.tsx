import React from "react";
import styles from "./VisibilityOption.module.scss"
import RadioDefault from "@/shared/ui/radio/RadioDefault";

const VisibilityOption: React.FC = () => {
    return (
        <form className={styles["visibility-option"]}>
            <div className={styles["visibility-option__radio-btns"]}>
                <RadioDefault id={"open"} placeholder={"Для всех"} value={"open"}/>
                <RadioDefault id={"byTier"} placeholder={"По подписке"} value={"byTier"}/>
            </div>
        </form>
    );
}

export default VisibilityOption;