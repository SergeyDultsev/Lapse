import React from "react";
import styles from "./VisibilityOption.module.scss"
import CreatePageStore from "@/features/post/create-post/model/store/CreatePageStore";
import RadioDefault from "@/shared/ui/radio/RadioDefault";
import { observer } from "mobx-react-lite";

const VisibilityOption: React.FC = observer(() => {
    return (
        <form className={styles["visibility-option"]}>
            <div className={styles["visibility-option__radio-btns"]}>
                <RadioDefault 
                    id={"open"} 
                    placeholder={"Для всех"} 
                    value={"open"}
                    onChange={() => CreatePageStore.changeVisibility("open")}
                    checked={CreatePageStore.stateVisibility === "open"} 
                />
                <RadioDefault 
                    id={"byTier"} 
                    placeholder={"По подписке"} 
                    value={"byTier"} 
                    onChange={() => CreatePageStore.changeVisibility("byTier")}
                    checked={CreatePageStore.stateVisibility === "byTier"}/>
            </div>
        </form>
    );
});

export default VisibilityOption;