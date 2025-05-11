import React from "react";
import styles from "./TierList.module.scss";
import iTier from "@/entities/tier/model/types/iTier";
import TierItem from "@/entities/tier/ui/tier-item/TierItem";

const TierList: React.FC<{ tiers: iTier[] }> = ({ tiers }) => {
    return (
        <section className={styles['tier-list']}>
            {tiers.map((tier: iTier) => (
                <TierItem
                    tierId={tier.tierId}
                    userId={tier.userId}
                    title={tier.title}
                    price={tier.price}
                    description={tier.description}
                    key={tier.tierId}
                />
            ))}
        </section>
    );
}

export default TierList;