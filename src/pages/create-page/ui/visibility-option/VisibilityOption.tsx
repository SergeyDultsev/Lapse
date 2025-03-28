import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./VisibilityOption.module.scss";
import CreatePageStore from "@/pages/create-page/store/CreatePageStore";
import TierStore from "@/entities/tier/model/store/TierStore";
import RadioDefault from "@/shared/ui/radio/RadioDefault";
import TierSelect from "../tier-select/TierSelect";
import ButtonDefault from "@/shared/ui/button/ButtonDefault";

const VisibilityOption: React.FC = observer(() => {
    const stateVisibility = CreatePageStore.stateVisibility;
    const tierData = TierStore.tierData;

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

            {tierData.length === 0 && stateVisibility === "byTier" && (
                <ButtonDefault 
                    onClick={() => CreatePageStore.changeFormState("tier")}
                    type="button"
                    active={false}
                    >
                    Добавить подписку
                </ButtonDefault>
            )}

            {tierData.length !== 0 && (
                <TierSelect 
                    label={"Уровни подписок"} 
                    options={tierData}
                />
            )}
        </form>
    );
});

export default VisibilityOption;