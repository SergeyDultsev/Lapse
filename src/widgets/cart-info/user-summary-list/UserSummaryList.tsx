import React from "react";
import styles from "./UserSummaryList.module.scss";
import UserItem from "@/entities/user/ui/user-item/UserItem";
import iUser from "@/entities/user/model/types/iUser";

interface iUserProps{
    users: iUser[];
}

const UserSummaryList: React.FC<iUserProps> = ({users}) => {
    return (
        <section className={styles["user-list"]}>
            {users.map((user: iUser ) =>
                <UserItem user={user} key={user.user_id}/>
            )}
        </section>
    )
};

export default UserSummaryList;