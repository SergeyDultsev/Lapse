import React from "react";
import styles from  "./UserList.module.scss";
import UserItem from "@/entities/user/ui/user-item/UserItem";
import iUserBrief from "@/entities/user/model/types/iUserBrief";

interface iUserProps{
    users: iUserBrief[];
}

const UserList: React.FC<iUserProps> = ({users}) => {
    return (
        <section className={styles["user-list"]}>
            {users.map((user, index) => 
                <UserItem user={user} key={index}/>  
            )}
        </section>
    )
};

export default UserList;