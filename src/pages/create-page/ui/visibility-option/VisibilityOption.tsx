import React from "react";
import styles from "./VisibilityOption.module.scss"
import CreatePageStore from "@/pages/create-page/store/CreatePageStore";
import RadioDefault from "@/shared/ui/radio/RadioDefault";
import { observer } from "mobx-react-lite";

const VisibilityOption: React.FC = observer(() => {
    let stateVisibility = CreatePageStore.stateVisibility;

    return (
        <form className={styles["visibility-option"]}>

            <div className={styles["visibility-option__radio-btns"]}>
                <RadioDefault 
                    id={"open"} 
                    placeholder={"Для всех"} 
                    value={"open"}
                    onChange={() => CreatePageStore.changeVisibility("open")}
                    checked={stateVisibility === "open"} 
                />
                <RadioDefault 
                    id={"byTier"} 
                    placeholder={"По подписке"} 
                    value={"byTier"} 
                    onChange={() => CreatePageStore.changeVisibility("byTier")}
                    checked={stateVisibility === "byTier"}/>
            </div>

            {stateVisibility === "byTier" && (
                <form className={styles["visibility-option__tiers"]}>
                    <div className={styles["visibility-option__tiers-title"]}>Уровни</div>
                    
                </form>
            )}
        </form>
    );
});

export default VisibilityOption;