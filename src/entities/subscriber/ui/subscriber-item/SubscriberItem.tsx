import React from "react";
import styles from "./SubscriberItem.module.scss"

interface ISubscriber {
    user: {
        avatar: string | null;
        username: string;
    };
}

const SubscriberItem: React.FC<ISubscriber> = ({ user }) => {
    return (
        <article className={styles["subscriber-item"]}>
            {user.avatar && (
                <img className={styles["subscriber-item__item"]}
                    src={user.avatar} 
                    alt="avatar" 
                    loading="lazy" />
            )}
            <h2 className={styles["subscriber-item__username"]}>{user.username}</h2>
        </article>
    )
};

export default SubscriberItem;