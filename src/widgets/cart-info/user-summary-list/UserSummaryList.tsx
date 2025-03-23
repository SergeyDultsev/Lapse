import React from "react";
import styles from "./UserSummaryList.module.scss";
import UserItem from "@/entities/user/ui/user-item/UserItem";
import IUserSummary from "@/entities/user/model/types/iUserSummary";

interface iUserProps{
    users: IUserSummary[];
}

const UserSummaryList: React.FC<iUserProps> = ({users}) => {
    return (
        <section className={styles["user-list"]}>
            {users.map((user: IUserSummary ) =>
                <UserItem user={user} key={user.userId}/>
            )}
        </section>
    )
};

export default UserSummaryList;