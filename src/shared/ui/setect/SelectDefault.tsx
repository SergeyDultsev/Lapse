import React, { useEffect } from "react";
import { observer } from "mobx-react-lite"; // Нужно для MobX
import styles from "./SelectDefault.module.scss";
import SelectStore from "./store/SelectStore";

interface ISelectDefault {
    label: string;
    options: { id: string; title: string; price: number }[];
}

const SelectDefault: React.FC<ISelectDefault> = observer(({ label, options }) => {
    useEffect(() => {
        SelectStore.setSelected(options[0]);
    }, [options]);

    return (
        <div className={styles["select-default"]}>
            <label className={styles["select-default__label"]}>{label}</label>
            <div
                className={`${styles["select-default__control"]} ${SelectStore.isOpen ? styles["select-default__control__open"] : ""}`}
                onClick={() => SelectStore.setIsOpen(!SelectStore.isOpen)}
            >
                <p className={`${styles["select-default__control__title"]}`}>{SelectStore.selected.title}</p>
                <p className={`${styles["select-default__control__price"]}`}>{SelectStore.selected.price} рублей в месяц</p>
            </div>

            {SelectStore.isOpen && (
                <div className={styles["select-default__option"]}>
                    {options.map((option) => (
                        <div
                            key={option.id}
                            className={styles["select-default__item"]}
                            onClick={() => {
                                SelectStore.setSelected(option);
                                SelectStore.setIsOpen(false);
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

export default SelectDefault;