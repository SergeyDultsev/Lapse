import React from "react";
import styles from "./UserItem.module.scss"
import IUserSummary from "../../model/types/iUser";

interface iUserProps{
    user: IUserSummary;
}

const UserItem: React.FC<iUserProps> = ({ user }) => {
    return (
        <article className={styles["user-item"]}>
            {user.avatar && (
                <img className={styles["user-item__img"]}
                    src={user.avatar} 
                    alt="avatar" 
                    loading="lazy" />
            )}
            <h2 className={styles["user-item__username"]}>{user.username}</h2>
        </article>
    )
};

export default UserItem;