import React from "react";
import styles from "./TierItem.module.scss"
import ButtonDefault from "@/shared/ui/button/ButtonDefault";
import iTier from "../../model/types/iTier";
import UserStore from "@entities/user/model/store/UserStore";
import TierStore from "@entities/tier/model/store/TierStore";

const TierItem: React.FC<iTier> = ({user_id, tier_id, title, price, description}) => {
    return (
        <article className={styles["tier-item"]}>
            <h2 className={styles["tier-item__title"]}>{title}</h2>
            <p className={styles["tier-item__price"]}>{price} рублей в месяц</p>
            <p className={styles["tier-item__descr"]}>{description}</p>

            {UserStore.userAuthorized?.user_id !== user_id ? (
                <ButtonDefault
                    style={{ padding: "11px 29px" }}
                    children={"Купить VIP-подписку"}
                    type={"button"}
                    active={false}
                />
            ) : (
                <div className={styles['tier-item__btns']}>
                    <ButtonDefault
                        style={{ padding: "11px 29px" }}
                        children={"Редактировать"}
                        type={"button"}
                        active={false}
                    />
                    <ButtonDefault
                        onClick={() => TierStore.deleteTierById(tier_id)}
                        style={{ padding: "11px 29px" }}
                        children={"Удалить"}
                        type={"button"}
                        active={false}
                    />
                </div>
            )}
        </article>
    );
}

export default TierItem;