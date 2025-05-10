import React from "react";
import styles from "./UserItem.module.scss"
import IUser from "@/entities/user/model/types/iUser";

interface iUserProps{
    user: IUser;
}

const UserItem: React.FC<iUserProps> = ({ user }) => {
    return (
        <article className={styles["user-item"]}>
            {user.avatar_url && (
                <img className={styles["user-item__img"]}
                    src={user.avatar_url}
                    alt="avatar" 
                    loading="lazy" />
            )}
            <h2 className={styles["user-item__username"]}>{user.full_name}</h2>
        </article>
    )
};

export default UserItem;