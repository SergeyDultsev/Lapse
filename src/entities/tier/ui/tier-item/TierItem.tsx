import React from "react";
import styles from "./TierItem.module.scss"
import ButtonDefault from "@/shared/ui/button/ButtonDefault";
import iTier from "../../model/types/iTier";

const TierItem: React.FC<iTier> = ({title, price, description}) => {
    return (
        <article className={styles["tier-item"]}>
            <h2 className={styles["tier-item__title"]}>{title}</h2>
            <p className={styles["tier-item__price"]}>{price} рублей в месяц</p>
            <p className={styles["tier-item__descr"]}>{description}</p>

            <ButtonDefault
                style={{ padding: "11px 29px" }}
                children={"Купить VIP-подписку"}
                type={"button"}
                active={false}/>
        </article>
    );
}

export default TierItem;