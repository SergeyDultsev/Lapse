import React from "react";
import styles from  "./SubscriberList.module.scss";
import SubscriberItem from "@/entities/subscriber/ui/subscriber-item/SubscriberItem";

interface ISubscriberList {
    subscribers: object[],
}

const SubscriberList: React.FC<ISubscriberList> = ({subscribers}) => {
    return (
        <section className={styles["subscriber-list"]}>
            {subscribers.map((user, index) => 
                <SubscriberItem user={user} key={index}/>  
            )}
        </section>
    )
};

export default SubscriberList;