import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import styles from "./TierSelect.module.scss";
import TierSelectStore from "../../store/TierSelectStore";
import ITier from "@/entities/tier/model/types/iTier";

interface ITierSelect {
    label: string;
    options: ITier[];
}

const TierSelect: React.FC<ITierSelect> = observer(({ label, options }) => {
    const store = TierSelectStore;

    useEffect(() => {
        TierSelectStore.setSelected(options[0]);
    }, [options]);

    return (
        <div className={styles["select-default"]}>
            <label className={styles["select-default__label"]}>{label}</label>
            <div
                className={`${styles["select-default__control"]} ${store.isOpen ? styles["select-default__control__open"] : ""}`}
                onClick={() => store.setIsOpen(!store.isOpen)}
            >
                <p className={`${styles["select-default__control__title"]}`}>{store.selected.title}</p>
                <p className={`${styles["select-default__control__price"]}`}>{store.selected.price} рублей в месяц</p>
            </div>

            {store.isOpen && (
                <div className={styles["select-default__option"]}>
                    {options.map((option) => (
                        <div
                            key={option.tierId}
                            className={styles["select-default__item"]}
                            onClick={() => {
                                store.setSelected(option);
                                store.setIsOpen(false);
                            }}
                        >
                            <p className={`${styles["select-default__item__title"]}`}>{option.title}</p>
                            <p className={`${styles["select-default__item__price"]}`}>{option.price} рублей в месяц</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
});

export default TierSelect;